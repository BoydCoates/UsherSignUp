import {
  a as h,
  b as p,
  f as w
} from "./_deps/FGP3W67J.js";
import "./_deps/RDJV3XJM.js";
import {
  a as m,
  b as u
} from "./_deps/IY6LFNRE.js";
import {
  a as d,
  e as r
} from "./_deps/KCTIKFDW.js";

// convex/public.js
function f(e, i) {
  let s = /* @__PURE__ */ new Map();
  for (let n of i) {
    let t = s.get(n.positionId) || [];
    t.push(n.name), s.set(n.positionId, t);
  }
  return {
    title: e.title,
    serviceDate: e.serviceDate,
    serviceTime: e.serviceTime,
    instructions: e.instructions,
    status: e.status,
    categories: e.categories.map((n) => ({
      id: n.id,
      name: n.name,
      order: n.order,
      positions: n.positions.map((t) => {
        let l = s.get(t.id) || [];
        return { id: t.id, name: t.name, capacity: t.capacity, order: t.order, names: l, filled: l.length, remaining: Math.max(0, t.capacity - l.length) };
      })
    }))
  };
}
d(f, "publicView");
var v = m({ args: { publicId: r.string() }, handler: /* @__PURE__ */ d(async (e, { publicId: i }) => {
  if (!i || i.length > 100) return null;
  let s = await e.db.query("schedules").withIndex("publicId", (t) => t.eq("publicId", i)).unique();
  if (!s || !["published", "closed", "completed"].includes(s.status)) return null;
  let n = await e.db.query("signups").withIndex("scheduleId", (t) => t.eq("scheduleId", s._id)).collect();
  return f(s, n);
}, "handler") }), E = u({ args: { publicId: r.string(), positionId: r.string(), name: r.string(), cancellationHash: r.string(), requestId: r.string() }, handler: /* @__PURE__ */ d(async (e, i) => {
  if (!/^[a-f0-9]{64}$/i.test(i.cancellationHash)) throw new Error("Could not create a secure cancellation link. Please try again.");
  if (!/^[0-9a-f-]{36}$/i.test(i.requestId)) throw new Error("Invalid sign-up request. Please refresh and try again.");
  let s = p(i.name), n = h(s), t = await e.db.query("signups").withIndex("requestId", (a) => a.eq("requestId", i.requestId)).unique();
  if (t) {
    if ((await e.db.get(t.scheduleId))?.publicId === i.publicId && t.positionId === i.positionId && t.normalizedName === n) return { name: t.name };
    throw new Error("This sign-up request was already used. Refresh the schedule and try again.");
  }
  if (await e.db.query("signups").withIndex("cancellationHash", (a) => a.eq("cancellationHash", i.cancellationHash)).first()) throw new Error("Could not create a unique cancellation link. Please try again.");
  let o = await e.db.query("schedules").withIndex("publicId", (a) => a.eq("publicId", i.publicId)).unique();
  if (!o || o.status !== "published") throw new Error("Sign-ups for this service are closed. Refresh the schedule to see its latest status.");
  let c = w(o.categories).find((a) => a.id === i.positionId);
  if (!c) throw new Error("That position is no longer available. Refresh the schedule and choose another.");
  if (await e.db.query("signups").withIndex("scheduleAndName", (a) => a.eq("scheduleId", o._id).eq("normalizedName", n)).first()) throw new Error("That name already has a position for this service. If this is a different usher with the same name, ask the team leader to help.");
  if ((await e.db.query("signups").withIndex("scheduleId", (a) => a.eq("scheduleId", o._id)).collect()).filter((a) => a.positionId === c.id).length >= c.capacity) throw new Error("That position just filled. Refresh the schedule to see the latest openings.");
  return await e.db.insert("signups", { scheduleId: o._id, positionId: c.id, name: s, normalizedName: n, cancellationHash: i.cancellationHash, requestId: i.requestId, createdAt: Date.now() }), { name: s };
}, "handler") }), H = u({ args: { cancellationHash: r.string() }, handler: /* @__PURE__ */ d(async (e, { cancellationHash: i }) => {
  if (!/^[a-f0-9]{64}$/i.test(i)) throw new Error("This cancellation link is invalid or has already been used.");
  let s = await e.db.query("signups").withIndex("cancellationHash", (t) => t.eq("cancellationHash", i)).unique();
  if (!s) throw new Error("This cancellation link is invalid or has already been used.");
  let n = await e.db.get(s.scheduleId);
  if (!n || n.status !== "published") throw new Error("Cancellations are currently closed for this service. Contact the team leader for help.");
  return await e.db.delete(s._id), { name: s.name, scheduleTitle: n.title, serviceDate: n.serviceDate };
}, "handler") });
export {
  H as cancelSignup,
  E as createSignup,
  v as schedule
};
