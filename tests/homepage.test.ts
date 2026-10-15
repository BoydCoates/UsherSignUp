import { convexTest } from 'convex-test';
import { expect, test } from 'vitest';
import schema from '../convex/schema';
import { api } from '../convex/_generated/api';
import { homeDefaults } from '../shared/homeContent';
const modules = import.meta.glob('../convex/**/*.{ts,js}');
test('visitors read defaults but cannot edit or generate upload URLs', async () => {
  const t = convexTest(schema, modules);
  expect((await t.query(api.homepage.get, {})).content).toEqual(homeDefaults);
  await expect(t.query(api.homepage.edit, {})).rejects.toThrow();
  await expect(t.mutation(api.homepage.uploadUrl, {})).rejects.toThrow();
  await expect(t.mutation(api.homepage.save, { content: homeDefaults, photoId: null, version: 0 })).rejects.toThrow();
  expect(await t.run(ctx => ctx.db.query('homepage').collect())).toHaveLength(0);
});
test('an authenticated non-admin cannot edit the home page', async () => {
  const t = convexTest(schema, modules);
  const id = await t.run(ctx => ctx.db.insert('users', { username: 'Visitor' }));
  await expect(t.withIdentity({ subject: `${id}|session` }).mutation(api.homepage.save, { content: homeDefaults, photoId: null, version: 0 })).rejects.toThrow();
});
test('admins publish content and photos; stale saves are rejected; removal deletes the old file', async () => {
  const t = convexTest(schema, modules);
  const id = await t.run(ctx => ctx.db.insert('users', { username: 'BoydCoates', role: 'admin' }));
  const admin = t.withIdentity({ subject: `${id}|session` });
  const photoId = await t.run(ctx => ctx.storage.store(new Blob(['test-image'], { type: 'image/png' })));
  // convex-test omits MIME metadata when storing a Blob; model the upload API's metadata.
  await t.run(ctx => ctx.db.patch(photoId as any, { contentType: 'image/png' } as any));
  const content = { ...homeDefaults, spotlightName: 'Example Usher', spotlightMonth: 'October 2026', spotlightPhotoAlt: 'Portrait of the featured usher' };
  await admin.mutation(api.homepage.save, { content, photoId, version: 0 });
  const published = await t.query(api.homepage.get, {});
  expect(published.content.spotlightName).toBe('Example Usher');
  expect(published.photoUrl).toBeTruthy();
  await expect(admin.mutation(api.homepage.save, { content, photoId: null, version: 0 })).rejects.toThrow('Another admin');
  await admin.mutation(api.homepage.save, { content, photoId: null, version: 1 });
  expect((await t.query(api.homepage.get, {})).photoUrl).toBeNull();
  expect(await t.run(ctx => ctx.storage.getUrl(photoId))).toBeNull();
});
test('invalid uploads and oversized text are rejected before publishing', async () => {
  const t = convexTest(schema, modules);
  const id = await t.run(ctx => ctx.db.insert('users', { username: 'WillSmith', role: 'admin' }));
  const admin = t.withIdentity({ subject: `${id}|session` });
  const photoId = await t.run(ctx => ctx.storage.store(new Blob(['<svg/>'], { type: 'image/svg+xml' })));
  await expect(admin.mutation(api.homepage.save, { content: homeDefaults, photoId, version: 0 })).rejects.toThrow('JPG');
  await expect(admin.mutation(api.homepage.save, { content: { ...homeDefaults, heroTitle: 'x'.repeat(201) }, photoId: null, version: 0 })).rejects.toThrow('shorten');
  expect(await t.run(ctx => ctx.db.query('homepage').collect())).toHaveLength(0);
});
