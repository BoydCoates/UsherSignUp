import {
  a as I,
  b,
  d as y,
  e as c,
  f as w
} from "./_deps/FGP3W67J.js";
import {
  d as q
} from "./_deps/RDJV3XJM.js";
import {
  a as g,
  b as h
} from "./_deps/IY6LFNRE.js";
import {
  a as r,
  e as i
} from "./_deps/KCTIKFDW.js";

// convex/admin.js
var E = i.object({ id: i.string(), name: i.string(), order: i.number(), positions: i.array(i.object({ id: i.string(), name: i.string(), capacity: i.number(), order: i.number() })) }), T = i.union(i.literal("draft"), i.literal("published"), i.literal("closed"), i.literal("completed"), i.literal("unpublished")), z = g({ args: {}, handler: /* @__PURE__ */ r(async (t) => {
  let e = await q(t);
  if (!e) return null;
  let o = await t.db.get(e);
  return o?.role === "admin" ? { username: o.username || o.name || o.email || "Admin" } : null;
}, "handler") }), P = g({ args: {}, handler: /* @__PURE__ */ r(async (t) => {
  await c(t);
  let e = await t.db.query("schedules").withIndex("serviceDate").order("desc").collect();
  return await Promise.all(e.map(async (o) => {
    let n = await t.db.query("signups").withIndex("scheduleId", (a) => a.eq("scheduleId", o._id)).collect(), s = w(o.categories);
    return { ...o, signupCount: n.length, fullCount: s.filter((a) => n.filter((d) => d.positionId === a.id).length >= a.capacity).length, openCount: s.filter((a) => n.filter((d) => d.positionId === a.id).length < a.capacity).length };
  }));
}, "handler") }), B = g({ args: {}, handler: /* @__PURE__ */ r(async (t) => (await c(t), await t.db.query("templates").withIndex("updatedAt").order("desc").collect()), "handler") }), C = g({ args: { scheduleId: i.id("schedules") }, handler: /* @__PURE__ */ r(async (t, { scheduleId: e }) => {
  await c(t);
  let o = await t.db.get(e);
  if (!o) return null;
  let n = await t.db.query("signups").withIndex("scheduleId", (s) => s.eq("scheduleId", e)).collect();
  return { schedule: o, signups: n.map(({ _id: s, positionId: a, name: d, createdAt: m }) => ({ _id: s, positionId: a, name: d, createdAt: m })) };
}, "handler") }), M = h({ args: { id: i.optional(i.id("templates")), name: i.string(), description: i.string(), categories: i.array(E) }, handler: /* @__PURE__ */ r(async (t, e) => {
  let o = await c(t), n = y(e.categories), s = e.name.trim();
  if (!s || s.length > 100) throw new Error("Template name is required (up to 100 characters).");
  let a = Date.now(), d = { name: s, description: e.description.trim().slice(0, 1e3), categories: n, updatedAt: a };
  if (e.id) {
    if (!await t.db.get(e.id)) throw new Error("Template not found.");
    return await t.db.patch(e.id, d), e.id;
  }
  return await t.db.insert("templates", { ...d, createdAt: a, createdBy: o._id });
}, "handler") }), j = h({ args: { id: i.id("templates") }, handler: /* @__PURE__ */ r(async (t, { id: e }) => {
  let o = await c(t), n = await t.db.get(e);
  if (!n) throw new Error("Template not found.");
  let s = Date.now();
  return await t.db.insert("templates", { name: `${n.name} copy`, description: n.description, categories: n.categories, createdAt: s, updatedAt: s, createdBy: o._id });
}, "handler") }), V = h({ args: { id: i.id("templates") }, handler: /* @__PURE__ */ r(async (t, { id: e }) => {
  if (await c(t), !await t.db.get(e)) throw new Error("Template not found.");
  await t.db.delete(e);
}, "handler") }), O = h({ args: { id: i.optional(i.id("schedules")), title: i.string(), serviceDate: i.string(), serviceTime: i.optional(i.string()), instructions: i.string(), categories: i.array(E), status: T, sourceTemplateId: i.optional(i.id("templates")) }, handler: /* @__PURE__ */ r(async (t, e) => {
  let o = await c(t), n = y(e.categories);
  if (e.status === "published" && w(n).length === 0) throw new Error("Add at least one position before publishing this schedule.");
  let s = /* @__PURE__ */ new Date(`${e.serviceDate}T00:00:00.000Z`);
  if (!e.title.trim() || e.title.length > 120 || !/^\d{4}-\d{2}-\d{2}$/.test(e.serviceDate) || Number.isNaN(s.getTime()) || s.toISOString().slice(0, 10) !== e.serviceDate) throw new Error("Enter a schedule title and valid service date.");
  let a = Date.now(), d = { title: e.title.trim(), serviceDate: e.serviceDate, serviceTime: e.serviceTime?.trim() || void 0, instructions: e.instructions.trim().slice(0, 3e3), categories: n, status: e.status, updatedAt: a };
  if (e.id) {
    let l = await t.db.get(e.id);
    if (!l) throw new Error("Schedule not found.");
    let u = await t.db.query("signups").withIndex("scheduleId", (p) => p.eq("scheduleId", e.id)).collect(), D = new Map(w(l.categories).map((p) => [p.id, p])), A = new Map(w(n).map((p) => [p.id, p]));
    for (let p of u) {
      let f = A.get(p.positionId);
      if (!f) throw new Error(`\u201C${D.get(p.positionId)?.name || "A position"}\u201D has sign-ups. Move or remove those sign-ups before removing the position.`);
      let v = u.filter((S) => S.positionId === p.positionId).length;
      if (f.capacity < v) throw new Error(`Capacity for \u201C${f.name}\u201D cannot be lower than its ${v} current sign-ups.`);
    }
    return await t.db.patch(e.id, d), e.id;
  }
  return await t.db.insert("schedules", { ...d, publicId: crypto.randomUUID(), createdAt: a, createdBy: o._id, sourceTemplateId: e.sourceTemplateId });
}, "handler") }), Z = h({ args: { id: i.id("schedules"), status: T }, handler: /* @__PURE__ */ r(async (t, { id: e, status: o }) => {
  await c(t);
  let n = await t.db.get(e);
  if (!n) throw new Error("Schedule not found.");
  if (o === "published" && w(n.categories).length === 0) throw new Error("Add at least one position before publishing this schedule.");
  await t.db.patch(e, { status: o, updatedAt: Date.now() });
}, "handler") }), k = h({ args: { id: i.id("schedules") }, handler: /* @__PURE__ */ r(async (t, { id: e }) => {
  let o = await c(t), n = await t.db.get(e);
  if (!n) throw new Error("Schedule not found.");
  let s = Date.now();
  return await t.db.insert("schedules", { title: `${n.title} copy`, serviceDate: n.serviceDate, serviceTime: n.serviceTime, instructions: n.instructions, categories: n.categories, status: "draft", publicId: crypto.randomUUID(), sourceTemplateId: n.sourceTemplateId, createdAt: s, updatedAt: s, createdBy: o._id });
}, "handler") }), F = h({ args: { id: i.id("schedules") }, handler: /* @__PURE__ */ r(async (t, { id: e }) => {
  if (await c(t), !await t.db.get(e)) throw new Error("Schedule not found.");
  let n = await t.db.query("signups").withIndex("scheduleId", (s) => s.eq("scheduleId", e)).collect();
  for (let s of n) await t.db.delete(s._id);
  await t.db.delete(e);
}, "handler") }), G = h({ args: { scheduleId: i.id("schedules"), positionId: i.string(), name: i.string() }, handler: /* @__PURE__ */ r(async (t, e) => {
  await c(t);
  let o = await t.db.get(e.scheduleId);
  if (!o) throw new Error("Schedule not found.");
  let n = w(o.categories).find((l) => l.id === e.positionId);
  if (!n) throw new Error("Position not found.");
  let s = b(e.name), a = I(s);
  if (await t.db.query("signups").withIndex("scheduleAndName", (l) => l.eq("scheduleId", e.scheduleId).eq("normalizedName", a)).first()) throw new Error("That name already has a position for this service.");
  if ((await t.db.query("signups").withIndex("scheduleId", (l) => l.eq("scheduleId", e.scheduleId)).collect()).filter((l) => l.positionId === e.positionId).length >= n.capacity) throw new Error("That position is full.");
  await t.db.insert("signups", { scheduleId: e.scheduleId, positionId: e.positionId, name: s, normalizedName: a, requestId: crypto.randomUUID(), createdAt: Date.now() });
}, "handler") }), H = h({ args: { id: i.id("signups"), name: i.string(), positionId: i.string() }, handler: /* @__PURE__ */ r(async (t, e) => {
  await c(t);
  let o = await t.db.get(e.id);
  if (!o) throw new Error("Sign-up not found.");
  let n = b(e.name), s = I(n), a = await t.db.get(o.scheduleId);
  if (!a) throw new Error("Schedule not found.");
  let d = w(a.categories).find((u) => u.id === e.positionId);
  if (!d) throw new Error("Position not found.");
  if ((await t.db.query("signups").withIndex("scheduleAndName", (u) => u.eq("scheduleId", o.scheduleId).eq("normalizedName", s)).collect()).some((u) => u._id !== o._id)) throw new Error("That name already has a position for this service.");
  let l = await t.db.query("signups").withIndex("scheduleId", (u) => u.eq("scheduleId", o.scheduleId)).collect();
  if (e.positionId !== o.positionId && l.filter((u) => u.positionId === e.positionId).length >= d.capacity) throw new Error("That position is full.");
  await t.db.patch(o._id, { name: n, normalizedName: s, positionId: e.positionId });
}, "handler") }), J = h({ args: { id: i.id("signups") }, handler: /* @__PURE__ */ r(async (t, { id: e }) => {
  if (await c(t), !await t.db.get(e)) throw new Error("Sign-up not found.");
  await t.db.delete(e);
}, "handler") });
export {
  G as addSignup,
  Z as changeStatus,
  P as dashboard,
  F as deleteSchedule,
  V as deleteTemplate,
  k as duplicateSchedule,
  j as duplicateTemplate,
  z as me,
  J as removeSignup,
  C as roster,
  O as saveSchedule,
  M as saveTemplate,
  B as templates,
  H as updateSignup
};
