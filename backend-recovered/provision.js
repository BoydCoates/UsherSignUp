import {
  c as o
} from "./_deps/IY6LFNRE.js";
import {
  a as n,
  e as t
} from "./_deps/KCTIKFDW.js";

// convex/provision.js
var a = o({
  args: { username: t.optional(t.union(t.literal("WillSmith"), t.literal("BoydCoates"))) },
  handler: /* @__PURE__ */ n(async () => {
    throw new Error("Admin accounts are managed through the existing Convex Auth setup.");
  }, "handler")
});
export {
  a as admin
};
