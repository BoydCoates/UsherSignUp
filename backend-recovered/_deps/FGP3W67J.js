import {
  d as o
} from "./RDJV3XJM.js";
import {
  a
} from "./KCTIKFDW.js";

// convex/_lib.js
function c(n) {
  return n.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-US");
}
a(c, "normalizeName");
function m(n) {
  let e = n.trim().replace(/\s+/g, " ");
  if (e.length < 2 || e.length > 80 || !/^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u.test(e)) throw new Error("Enter a name between 2 and 80 characters using letters, spaces, apostrophes, periods, or hyphens.");
  return e;
}
a(m, "validateName");
function s(n) {
  if (!Array.isArray(n) || n.length > 30) throw new Error("A schedule can have up to 30 categories.");
  let e = /* @__PURE__ */ new Set();
  for (let r of n) {
    if (!r.id || e.has(r.id) || !r.name.trim() || r.name.length > 80) throw new Error("Each category needs a unique ID and a name.");
    if (e.add(r.id), !Array.isArray(r.positions) || r.positions.length > 60) throw new Error("A category can have up to 60 positions.");
    for (let t of r.positions) {
      if (!t.id || e.has(t.id) || !t.name.trim() || t.name.length > 80 || !Number.isInteger(t.capacity) || t.capacity < 1 || t.capacity > 100) throw new Error("Each position needs a unique ID, name, and capacity from 1 to 100.");
      e.add(t.id);
    }
  }
}
a(s, "validateStructure");
function d(n) {
  return s(n), n.map((e, r) => ({
    ...e,
    name: e.name.trim(),
    order: r,
    positions: e.positions.map((t, i) => ({ ...t, name: t.name.trim(), order: i }))
  }));
}
a(d, "normalizeStructure");
async function u(n) {
  let e = await o(n);
  if (!e) throw new Error("Admin sign-in required.");
  let r = await n.db.get(e);
  if (!r || r.role !== "admin") throw new Error("Admin access required.");
  return r;
}
a(u, "requireAdmin");
function h(n) {
  return n.flatMap((e) => e.positions.map((r) => ({ ...r, categoryName: e.name })));
}
a(h, "flattenPositions");

export {
  c as a,
  m as b,
  s as c,
  d,
  u as e,
  h as f
};
