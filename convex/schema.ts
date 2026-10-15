import { authTables } from '@convex-dev/auth/server';
import { defineSchema, defineTable as f } from 'convex/server';
import { v as r } from 'convex/values';
import { contentValidator } from './homepageFields';
const be = r.object({ id: r.string(), name: r.string(), order: r.number(), positions: r.array(r.object({ id: r.string(), name: r.string(), capacity: r.number(), order: r.number() })) });
export default defineSchema({
...authTables,
users: f({ ...authTables.users.validator.fields, role: r.optional(r.literal('admin')), username: r.optional(r.string()) }).index('email',['email']).index('phone',['phone']).index('username',['username']),
homepage: f({ key: r.literal('home'), content: contentValidator, photoId: r.optional(r.id('_storage')), version: r.number(), updatedBy: r.id('users') }).index('key',['key']),
  templates: f({ name: r.string(), description: r.string(), categories: r.array(be), createdAt: r.number(), updatedAt: r.number(), createdBy: r.id("users") }).index("updatedAt", ["updatedAt"]),
  schedules: f({ title: r.string(), serviceDate: r.string(), serviceTime: r.optional(r.string()), instructions: r.string(), categories: r.array(be), status: r.union(r.literal("draft"), r.literal("published"), r.literal("closed"), r.literal("completed"), r.literal("unpublished")), publicId: r.string(), sourceTemplateId: r.optional(r.id("templates")), createdAt: r.number(), updatedAt: r.number(), createdBy: r.id("users") }).index("publicId", ["publicId"]).index("serviceDate", ["serviceDate"]).index("status", ["status"]),
  signups: f({ scheduleId: r.id("schedules"), positionId: r.string(), name: r.string(), normalizedName: r.string(), cancellationHash: r.optional(r.string()), requestId: r.string(), createdAt: r.number() }).index("scheduleId", ["scheduleId"]).index("scheduleAndName", ["scheduleId", "normalizedName"]).index("cancellationHash", ["cancellationHash"]).index("requestId", ["requestId"])
});
