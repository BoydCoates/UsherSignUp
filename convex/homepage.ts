import { v, ConvexError } from 'convex/values';
import { query, mutation } from './_generated/server';
import { requireAdmin } from './admin';
import { homeDefaults, homeFieldNames } from '../shared/homeContent';

import { contentValidator } from './homepageFields';
export const get = query({ args: {}, handler: async ctx => {
  const page = await ctx.db.query('homepage').withIndex('key', q => q.eq('key', 'home')).unique();
  return { content: page?.content ?? homeDefaults, photoUrl: page?.photoId ? await ctx.storage.getUrl(page.photoId) : null };
}});
export const edit = query({ args: {}, handler: async ctx => {
  await requireAdmin(ctx);
  const page = await ctx.db.query('homepage').withIndex('key', q => q.eq('key', 'home')).unique();
  return { content: page?.content ?? homeDefaults, photoId: page?.photoId ?? null, photoUrl: page?.photoId ? await ctx.storage.getUrl(page.photoId) : null, version: page?.version ?? 0 };
}});
export const uploadUrl = mutation({ args: {}, handler: async ctx => { await requireAdmin(ctx); return ctx.storage.generateUploadUrl(); }});
export const save = mutation({ args: { content: contentValidator, photoId: v.union(v.id('_storage'), v.null()), version: v.number() }, handler: async (ctx, args) => {
  const admin = await requireAdmin(ctx);
  const page = await ctx.db.query('homepage').withIndex('key', q => q.eq('key', 'home')).unique();
  if ((page?.version ?? 0) !== args.version) throw new ConvexError('Another admin updated the home page. Close and reopen the editor before saving.');
  const content = { ...args.content };
  for (const key of homeFieldNames) {
    content[key] = content[key].trim();
    if (content[key].length > (key.endsWith('Description') ? 2000 : 200)) throw new ConvexError('Please shorten the text before saving.');
  }
  if (!content.heroTitle || !content.ministryTitle || !content.nextTitle || !content.spotlightLabel) throw new ConvexError('Please complete the section headings.');
  if (args.photoId) {
    const file = await ctx.db.system.get(args.photoId);
    if (!file || !['image/jpeg', 'image/png', 'image/webp'].includes(file.contentType ?? '') || file.size > 8 * 1024 * 1024) throw new ConvexError('Choose a JPG, PNG, or WebP photo under 8 MB.');
    if (!content.spotlightPhotoAlt) throw new ConvexError('Add a description for the photo.');
  }
  const values = { key: 'home' as const, content, photoId: args.photoId ?? undefined, version: args.version + 1, updatedBy: admin._id };
  if (page) await ctx.db.replace(page._id, values); else await ctx.db.insert('homepage', values);
  if (page?.photoId && page.photoId !== args.photoId) await ctx.storage.delete(page.photoId);
  return { version: values.version };
}});
export const discardUpload = mutation({ args: { photoId: v.id('_storage') }, handler: async (ctx, args) => {
  await requireAdmin(ctx);
  const page = await ctx.db.query('homepage').withIndex('key', q => q.eq('key', 'home')).unique();
  if (page?.photoId !== args.photoId) await ctx.storage.delete(args.photoId);
}});
