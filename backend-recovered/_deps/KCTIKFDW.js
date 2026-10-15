var kt = Object.create;
var K = Object.defineProperty;
var Lt = Object.getOwnPropertyDescriptor;
var Dt = Object.getOwnPropertyNames;
var Qt = Object.getPrototypeOf, Ht = Object.prototype.hasOwnProperty;
var n = (t, e) => K(t, "name", { value: e, configurable: !0 });
var an = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports), cn = (t, e) => {
  for (var r in e)
    K(t, r, { get: e[r], enumerable: !0 });
}, zt = (t, e, r, o) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let s of Dt(e))
      !Ht.call(t, s) && s !== r && K(t, s, { get: () => e[s], enumerable: !(o = Lt(e, s)) || o.enumerable });
  return t;
};
var un = (t, e, r) => (r = t != null ? kt(Qt(t)) : {}, zt(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  e || !t || !t.__esModule ? K(r, "default", { value: t, enumerable: !0 }) : r,
  t
));

// node_modules/convex/dist/esm/values/base64.js
var T = [], v = [], Wt = Uint8Array, _e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (_ = 0, tt = _e.length; _ < tt; ++_)
  T[_] = _e[_], v[_e.charCodeAt(_)] = _;
var _, tt;
v[45] = 62;
v[95] = 63;
function Gt(t) {
  var e = t.length;
  if (e % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var r = t.indexOf("=");
  r === -1 && (r = e);
  var o = r === e ? 0 : 4 - r % 4;
  return [r, o];
}
n(Gt, "getLens");
function Xt(t, e, r) {
  return (e + r) * 3 / 4 - r;
}
n(Xt, "_byteLength");
function V(t) {
  var e, r = Gt(t), o = r[0], s = r[1], a = new Wt(Xt(t, o, s)), i = 0, l = s > 0 ? o - 4 : o, p;
  for (p = 0; p < l; p += 4)
    e = v[t.charCodeAt(p)] << 18 | v[t.charCodeAt(p + 1)] << 12 | v[t.charCodeAt(p + 2)] << 6 | v[t.charCodeAt(p + 3)], a[i++] = e >> 16 & 255, a[i++] = e >> 8 & 255, a[i++] = e & 255;
  return s === 2 && (e = v[t.charCodeAt(p)] << 2 | v[t.charCodeAt(p + 1)] >> 4, a[i++] = e & 255), s === 1 && (e = v[t.charCodeAt(p)] << 10 | v[t.charCodeAt(p + 1)] << 4 | v[t.charCodeAt(p + 2)] >> 2, a[i++] = e >> 8 & 255, a[i++] = e & 255), a;
}
n(V, "toByteArray");
function Yt(t) {
  return T[t >> 18 & 63] + T[t >> 12 & 63] + T[t >> 6 & 63] + T[t & 63];
}
n(Yt, "tripletToBase64");
function Kt(t, e, r) {
  for (var o, s = [], a = e; a < r; a += 3)
    o = (t[a] << 16 & 16711680) + (t[a + 1] << 8 & 65280) + (t[a + 2] & 255), s.push(Yt(o));
  return s.join("");
}
n(Kt, "encodeChunk");
function J(t) {
  for (var e, r = t.length, o = r % 3, s = [], a = 16383, i = 0, l = r - o; i < l; i += a)
    s.push(
      Kt(
        t,
        i,
        i + a > l ? l : i + a
      )
    );
  return o === 1 ? (e = t[r - 1], s.push(T[e >> 2] + T[e << 4 & 63] + "==")) : o === 2 && (e = (t[r - 2] << 8) + t[r - 1], s.push(
    T[e >> 10] + T[e >> 4 & 63] + T[e << 2 & 63] + "="
  )), s.join("");
}
n(J, "fromByteArray");

// node_modules/convex/dist/esm/common/index.js
function O(t) {
  if (t === void 0)
    return {};
  if (!Z(t))
    throw new Error(
      `The arguments to a Convex function must be an object. Received: ${t}`
    );
  return t;
}
n(O, "parseArgs");
function Z(t) {
  let e = typeof t == "object", r = Object.getPrototypeOf(t), o = r === null || r === Object.prototype || // Objects generated from other contexts (e.g. across Node.js `vm` modules) will not satisfy the previous
  // conditions but are still simple objects.
  r?.constructor?.name === "Object";
  return e && o;
}
n(Z, "isSimpleObject");

// node_modules/convex/dist/esm/values/value.js
var st = !0, j = BigInt("-9223372036854775808"), ee = BigInt("9223372036854775807"), Ce = BigInt("0"), Zt = BigInt("8"), er = BigInt("256"), Ie = "This commit timestamp is unresolved: its value is assigned when the mutation commits. Read the document after the mutation completes to get its value.", $ = class {
  static {
    n(this, "CommitTsPlaceholder");
  }
  [Symbol.toPrimitive](e) {
    if (e === "string")
      return this.toString();
    throw new Error(Ie);
  }
  valueOf() {
    throw new Error(Ie);
  }
  toJSON() {
    throw new Error(Ie);
  }
  toString() {
    return "[unresolved commit timestamp]";
  }
}, Ne = new $();
function it(t) {
  return Number.isNaN(t) || !Number.isFinite(t) || Object.is(t, -0);
}
n(it, "isSpecial");
function tr(t) {
  t < Ce && (t -= j + j);
  let e = t.toString(16);
  e.length % 2 === 1 && (e = "0" + e);
  let r = new Uint8Array(new ArrayBuffer(8)), o = 0;
  for (let s of e.match(/.{2}/g).reverse())
    r.set([parseInt(s, 16)], o++), t >>= Zt;
  return J(r);
}
n(tr, "slowBigIntToBase64");
function rr(t) {
  let e = V(t);
  if (e.byteLength !== 8)
    throw new Error(
      `Received ${e.byteLength} bytes, expected 8 for $integer`
    );
  let r = Ce, o = Ce;
  for (let s of e)
    r += BigInt(s) * er ** o, o++;
  return r > ee && (r += j + j), r;
}
n(rr, "slowBase64ToBigInt");
function nr(t) {
  if (t < j || ee < t)
    throw new Error(
      `BigInt ${t} does not fit into a 64-bit signed integer.`
    );
  let e = new ArrayBuffer(8);
  return new DataView(e).setBigInt64(0, t, !0), J(new Uint8Array(e));
}
n(nr, "modernBigIntToBase64");
function or(t) {
  let e = V(t);
  if (e.byteLength !== 8)
    throw new Error(
      `Received ${e.byteLength} bytes, expected 8 for $integer`
    );
  return new DataView(e.buffer).getBigInt64(0, !0);
}
n(or, "modernBase64ToBigInt");
var sr = DataView.prototype.setBigInt64 ? nr : tr, ir = DataView.prototype.getBigInt64 ? or : rr, nt = 1024;
function Pe(t) {
  if (t.length > nt)
    throw new Error(
      `Field name ${t} exceeds maximum field name length ${nt}.`
    );
  if (t.startsWith("$"))
    throw new Error(`Field name ${t} starts with a '$', which is reserved.`);
  for (let e = 0; e < t.length; e += 1) {
    let r = t.charCodeAt(e);
    if (r < 32 || r >= 127)
      throw new Error(
        `Field name ${t} has invalid character '${t[e]}': Field names can only contain non-control ASCII characters`
      );
  }
}
n(Pe, "validateObjectField");
function h(t) {
  if (t === null || typeof t == "boolean" || typeof t == "number" || typeof t == "string")
    return t;
  if (Array.isArray(t))
    return t.map((o) => h(o));
  if (typeof t != "object")
    throw new Error(`Unexpected type of ${t}`);
  let e = Object.entries(t);
  if (e.length === 1) {
    let o = e[0][0];
    if (o === "$bytes") {
      if (typeof t.$bytes != "string")
        throw new Error(`Malformed $bytes field on ${t}`);
      return V(t.$bytes).buffer;
    }
    if (o === "$integer") {
      if (typeof t.$integer != "string")
        throw new Error(`Malformed $integer field on ${t}`);
      return ir(t.$integer);
    }
    if (o === "$float") {
      if (typeof t.$float != "string")
        throw new Error(`Malformed $float field on ${t}`);
      let s = V(t.$float);
      if (s.byteLength !== 8)
        throw new Error(
          `Received ${s.byteLength} bytes, expected 8 for $float`
        );
      let i = new DataView(s.buffer).getFloat64(0, st);
      if (!it(i))
        throw new Error(`Float ${i} should be encoded as a number`);
      return i;
    }
    if (o === "$commitTs") {
      if (t.$commitTs !== null)
        throw new Error(`Malformed $commitTs field on ${t}`);
      return Ne;
    }
    if (o === "$set")
      throw new Error(
        "Received a Set which is no longer supported as a Convex type."
      );
    if (o === "$map")
      throw new Error(
        "Received a Map which is no longer supported as a Convex type."
      );
  }
  let r = {};
  for (let [o, s] of Object.entries(t))
    Pe(o), r[o] = h(s);
  return r;
}
n(h, "jsonToConvex");
var ot = 16384;
function I(t) {
  let e = JSON.stringify(t, (r, o) => o === void 0 ? "undefined" : typeof o == "bigint" ? `${o.toString()}n` : o);
  if (e.length > ot) {
    let r = "[...truncated]", o = ot - r.length, s = e.codePointAt(o - 1);
    return s !== void 0 && s > 65535 && (o -= 1), e.substring(0, o) + r;
  }
  return e;
}
n(I, "stringifyValueForError");
function k(t, e, r, o) {
  if (t === void 0) {
    let i = r && ` (present at path ${r} in original object ${I(
      e
    )})`;
    throw new Error(
      `undefined is not a valid Convex value${i}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`
    );
  }
  if (t === null)
    return t;
  if (typeof t == "bigint") {
    if (t < j || ee < t)
      throw new Error(
        `BigInt ${t} does not fit into a 64-bit signed integer.`
      );
    return { $integer: sr(t) };
  }
  if (typeof t == "number")
    if (it(t)) {
      let i = new ArrayBuffer(8);
      return new DataView(i).setFloat64(0, t, st), { $float: J(new Uint8Array(i)) };
    } else
      return t;
  if (typeof t == "boolean" || typeof t == "string")
    return t;
  if (t instanceof ArrayBuffer)
    return { $bytes: J(new Uint8Array(t)) };
  if (t instanceof $)
    return { $commitTs: null };
  if (Array.isArray(t))
    return t.map(
      (i, l) => k(i, e, r + `[${l}]`, !1)
    );
  if (t instanceof Set)
    throw new Error(
      $e(r, "Set", [...t], e)
    );
  if (t instanceof Map)
    throw new Error(
      $e(r, "Map", [...t], e)
    );
  if (!Z(t)) {
    let i = t?.constructor?.name, l = i ? `${i} ` : "";
    throw new Error(
      $e(r, l, t, e)
    );
  }
  let s = {}, a = Object.entries(t);
  a.sort(([i, l], [p, x]) => i === p ? 0 : i < p ? -1 : 1);
  for (let [i, l] of a)
    l !== void 0 ? (Pe(i), s[i] = k(l, e, r + `.${i}`, !1)) : o && (Pe(i), s[i] = at(
      l,
      e,
      r + `.${i}`
    ));
  return s;
}
n(k, "convexToJsonInternal");
function $e(t, e, r, o) {
  return t ? `${e}${I(
    r
  )} is not a supported Convex type (present at path ${t} in original object ${I(
    o
  )}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.` : `${e}${I(
    r
  )} is not a supported Convex type.`;
}
n($e, "errorMessageForUnsupportedType");
function at(t, e, r) {
  if (t === void 0)
    return { $undefined: null };
  if (e === void 0)
    throw new Error(
      `Programming error. Current value is ${I(
        t
      )} but original value is undefined`
    );
  return k(t, e, r, !1);
}
n(at, "convexOrUndefinedToJsonInternal");
function y(t) {
  return k(t, t, "", !1);
}
n(y, "convexToJson");
function E(t) {
  return at(t, t, "");
}
n(E, "convexOrUndefinedToJson");
function ct(t) {
  return k(t, t, "", !0);
}
n(ct, "patchValueToJson");

// node_modules/convex/dist/esm/values/validators.js
var ar = Object.defineProperty, cr = /* @__PURE__ */ n((t, e, r) => e in t ? ar(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, "__defNormalProp"), m = /* @__PURE__ */ n((t, e, r) => cr(t, typeof e != "symbol" ? e + "" : e, r), "__publicField"), ur = "https://docs.convex.dev/error#undefined-validator";
function L(t, e) {
  let r = e !== void 0 ? ` for field "${e}"` : "";
  throw new Error(
    `A validator is undefined${r} in ${t}. This is often caused by circular imports. See ${ur} for details.`
  );
}
n(L, "throwUndefinedValidatorError");
var b = class {
  static {
    n(this, "BaseValidator");
  }
  constructor({ isOptional: e }) {
    m(this, "type"), m(this, "fieldPaths"), m(this, "isOptional"), m(this, "isConvexValidator"), this.isOptional = e, this.isConvexValidator = !0;
  }
}, te = class t extends b {
  static {
    n(this, "VId");
  }
  /**
   * Usually you'd use `v.id(tableName)` instead.
   */
  constructor({
    isOptional: e,
    tableName: r
  }) {
    if (super({ isOptional: e }), m(this, "tableName"), m(this, "kind", "id"), typeof r != "string")
      throw new Error("v.id(tableName) requires a string");
    this.tableName = r;
  }
  /** @internal */
  get json() {
    return { type: "id", tableName: this.tableName };
  }
  /** Allow this field to be validated as absent. */
  optional() {
    return new t({
      isOptional: "optional",
      tableName: this.tableName
    });
  }
  /** @internal */
  asOptional() {
    return this.optional();
  }
}, D = class t extends b {
  static {
    n(this, "VFloat64");
  }
  constructor() {
    super(...arguments), m(this, "kind", "float64");
  }
  /** @internal */
  get json() {
    return { type: "number" };
  }
  /** Allow this field to be validated as absent. */
  optional() {
    return new t({
      isOptional: "optional"
    });
  }
  /** @internal */
  asOptional() {
    return this.optional();
  }
}, Q = class t extends b {
  static {
    n(this, "VInt64");
  }
  constructor() {
    super(...arguments), m(this, "kind", "int64");
  }
  /** @internal */
  get json() {
    return { type: "bigint" };
  }
  /** Allow this validated field to be absent. */
  optional() {
    return new t({ isOptional: "optional" });
  }
  /** @internal */
  asOptional() {
    return this.optional();
  }
}, re = class t extends b {
  static {
    n(this, "VCommitTs");
  }
  constructor() {
    super(...arguments), m(this, "kind", "commitTs");
  }
  /** @internal */
  get json() {
    return { type: this.kind };
  }
  /** Allow this validated field to be absent. */
  optional() {
    return new t({
      isOptional: "optional"
    });
  }
  /** @internal */
  asOptional() {
    return this.optional();
  }
}, ne = class t extends b {
  static {
    n(this, "VBoolean");
  }
  constructor() {
    super(...arguments), m(this, "kind", "boolean");
  }
  /** @internal */
  get json() {
    return { type: this.kind };
  }
  /** Allow this validated field to be absent. */
  optional() {
    return new t({
      isOptional: "optional"
    });
  }
  /** @internal */
  asOptional() {
    return this.optional();
  }
}, oe = class t extends b {
  static {
    n(this, "VBytes");
  }
  constructor() {
    super(...arguments), m(this, "kind", "bytes");
  }
  /** @internal */
  get json() {
    return { type: this.kind };
  }
  /** Allow this validated field to be absent. */
  optional() {
    return new t({ isOptional: "optional" });
  }
  /** @internal */
  asOptional() {
    return this.optional();
  }
}, se = class t extends b {
  static {
    n(this, "VString");
  }
  constructor() {
    super(...arguments), m(this, "kind", "string");
  }
  /** @internal */
  get json() {
    return { type: this.kind };
  }
  /** Allow this validated field to be absent. */
  optional() {
    return new t({
      isOptional: "optional"
    });
  }
  /** @internal */
  asOptional() {
    return this.optional();
  }
}, ie = class t extends b {
  static {
    n(this, "VNull");
  }
  constructor() {
    super(...arguments), m(this, "kind", "null");
  }
  /** @internal */
  get json() {
    return { type: this.kind };
  }
  /** Allow this validated field to be absent. */
  optional() {
    return new t({ isOptional: "optional" });
  }
  /** @internal */
  asOptional() {
    return this.optional();
  }
}, ae = class t extends b {
  static {
    n(this, "VAny");
  }
  constructor() {
    super(...arguments), m(this, "kind", "any");
  }
  /** @internal */
  get json() {
    return {
      type: this.kind
    };
  }
  /** Allow this validated field to be absent. */
  optional() {
    return new t({
      isOptional: "optional"
    });
  }
  /** @internal */
  asOptional() {
    return this.optional();
  }
}, ce = class t extends b {
  static {
    n(this, "VObject");
  }
  /**
   * Usually you'd use `v.object({ ... })` instead.
   */
  constructor({
    isOptional: e,
    fields: r
  }) {
    super({ isOptional: e }), m(this, "fields"), m(this, "kind", "object"), globalThis.Object.entries(r).forEach(([o, s]) => {
      if (s === void 0 && L("v.object()", o), !s.isConvexValidator)
        throw new Error("v.object() entries must be validators");
    }), this.fields = r;
  }
  /** @internal */
  get json() {
    return {
      type: this.kind,
      value: globalThis.Object.fromEntries(
        globalThis.Object.entries(this.fields).map(([e, r]) => [
          e,
          {
            fieldType: r.json,
            optional: r.isOptional === "optional"
          }
        ])
      )
    };
  }
  /** Allow this validated field to be absent. */
  optional() {
    return new t({
      isOptional: "optional",
      fields: this.fields
    });
  }
  /** @internal */
  asOptional() {
    return this.optional();
  }
  /**
   * Create a new VObject with the specified fields omitted.
   * @param fields The field names to omit from this VObject.
   */
  omit(...e) {
    let r = { ...this.fields };
    for (let o of e)
      delete r[o];
    return new t({
      isOptional: this.isOptional,
      fields: r
    });
  }
  /**
   * Create a new VObject with only the specified fields.
   * @param fields The field names to pick from this VObject.
   */
  pick(...e) {
    let r = {};
    for (let o of e)
      r[o] = this.fields[o];
    return new t({
      isOptional: this.isOptional,
      fields: r
    });
  }
  /**
   * Create a new VObject with all fields marked as optional.
   */
  partial() {
    let e = {};
    for (let [r, o] of globalThis.Object.entries(this.fields))
      e[r] = o.asOptional();
    return new t({
      isOptional: this.isOptional,
      fields: e
    });
  }
  /**
   * Create a new VObject with additional fields merged in.
   * @param fields An object with additional validators to merge into this VObject.
   */
  extend(e) {
    return new t({
      isOptional: this.isOptional,
      fields: { ...this.fields, ...e }
    });
  }
}, ue = class t extends b {
  static {
    n(this, "VLiteral");
  }
  /**
   * Usually you'd use `v.literal(value)` instead.
   */
  constructor({ isOptional: e, value: r }) {
    if (super({ isOptional: e }), m(this, "value"), m(this, "kind", "literal"), typeof r != "string" && typeof r != "boolean" && typeof r != "number" && typeof r != "bigint")
      throw new Error("v.literal(value) must be a string, number, or boolean");
    this.value = r;
  }
  /** @internal */
  get json() {
    return {
      type: this.kind,
      value: y(this.value)
    };
  }
  /** Allow this validated field to be absent. */
  optional() {
    return new t({
      isOptional: "optional",
      value: this.value
    });
  }
  /** @internal */
  asOptional() {
    return this.optional();
  }
}, le = class t extends b {
  static {
    n(this, "VArray");
  }
  /**
   * Usually you'd use `v.array(element)` instead.
   */
  constructor({
    isOptional: e,
    element: r
  }) {
    super({ isOptional: e }), m(this, "element"), m(this, "kind", "array"), r === void 0 && L("v.array()"), this.element = r;
  }
  /** @internal */
  get json() {
    return {
      type: this.kind,
      value: this.element.json
    };
  }
  /** Allow this validated field to be absent. */
  optional() {
    return new t({
      isOptional: "optional",
      element: this.element
    });
  }
  /** @internal */
  asOptional() {
    return this.optional();
  }
}, fe = class t extends b {
  static {
    n(this, "VRecord");
  }
  /**
   * Usually you'd use `v.record(key, value)` instead.
   */
  constructor({
    isOptional: e,
    key: r,
    value: o
  }) {
    if (super({ isOptional: e }), m(this, "key"), m(this, "value"), m(this, "kind", "record"), r === void 0 && L("v.record()", "key"), o === void 0 && L("v.record()", "value"), r.isOptional === "optional")
      throw new Error("Record validator cannot have optional keys");
    if (o.isOptional === "optional")
      throw new Error("Record validator cannot have optional values");
    if (!r.isConvexValidator || !o.isConvexValidator)
      throw new Error("Key and value of v.record() but be validators");
    this.key = r, this.value = o;
  }
  /** @internal */
  get json() {
    return {
      type: this.kind,
      // This cast is needed because TypeScript thinks the key type is too wide
      keys: this.key.json,
      values: {
        fieldType: this.value.json,
        optional: !1
      }
    };
  }
  /** Allow this validated field to be absent. */
  optional() {
    return new t({
      isOptional: "optional",
      key: this.key,
      value: this.value
    });
  }
  /** @internal */
  asOptional() {
    return this.optional();
  }
}, pe = class t extends b {
  static {
    n(this, "VUnion");
  }
  /**
   * Usually you'd use `v.union(...members)` instead.
   */
  constructor({ isOptional: e, members: r }) {
    super({ isOptional: e }), m(this, "members"), m(this, "kind", "union"), r.forEach((o, s) => {
      if (o === void 0 && L("v.union()", `member at index ${s}`), !o.isConvexValidator)
        throw new Error("All members of v.union() must be validators");
    }), this.members = r;
  }
  /** @internal */
  get json() {
    return {
      type: this.kind,
      value: this.members.map((e) => e.json)
    };
  }
  /** Allow this validated field to be absent. */
  optional() {
    return new t({
      isOptional: "optional",
      members: this.members
    });
  }
  /** @internal */
  asOptional() {
    return this.optional();
  }
};

// node_modules/convex/dist/esm/values/validator.js
function H(t) {
  return t?.isConvexValidator === !0;
}
n(H, "isValidator");
function de(t) {
  return H(t) ? t : c.object(t);
}
n(de, "asObjectValidator");
var c = {
  /**
   * Validates that the value is a document ID for the given table.
   *
   * IDs are strings at runtime but are typed as `Id<"tableName">` in
   * TypeScript for type safety.
   *
   * @example
   * ```typescript
   * args: { userId: v.id("users") }
   * ```
   *
   * @param tableName The name of the table.
   */
  id: /* @__PURE__ */ n((t) => new te({
    isOptional: "required",
    tableName: t
  }), "id"),
  /**
   * Validates that the value is `null`.
   *
   * Use `returns: v.null()` for functions that don't return a meaningful value.
   * JavaScript `undefined` is not a valid Convex value, it is automatically
   * converted to `null`.
   */
  null: /* @__PURE__ */ n(() => new ie({ isOptional: "required" }), "null"),
  /**
   * Validates that the value is a JavaScript `number` (Convex Float64).
   *
   * Supports all IEEE-754 double-precision floating point numbers including
   * NaN and Infinity.
   *
   * Alias for `v.float64()`.
   */
  number: /* @__PURE__ */ n(() => new D({ isOptional: "required" }), "number"),
  /**
   * Validates that the value is a JavaScript `number` (Convex Float64).
   *
   * Supports all IEEE-754 double-precision floating point numbers.
   */
  float64: /* @__PURE__ */ n(() => new D({ isOptional: "required" }), "float64"),
  /**
   * @deprecated Use `v.int64()` instead.
   */
  bigint: /* @__PURE__ */ n(() => new Q({ isOptional: "required" }), "bigint"),
  /**
   * Validates that the value is a JavaScript `bigint` (Convex Int64).
   *
   * Supports BigInts between -2^63 and 2^63-1.
   *
   * @example
   * ```typescript
   * args: { timestamp: v.int64() }
   * // Usage: createDoc({ timestamp: 1234567890n })
   * ```
   */
  int64: /* @__PURE__ */ n(() => new Q({ isOptional: "required" }), "int64"),
  /**
   * Validates that the value is a commit timestamp: an int64 (`bigint`)
   * assigned from the transaction's commit timestamp.
   *
   * An index on a field with this validator orders documents by commit order.
   * Accepts any int64 value; write `db.vars.commitTs` to have the field
   * resolve to the commit timestamp when the mutation commits.
   */
  commitTs: /* @__PURE__ */ n(() => new re({ isOptional: "required" }), "commitTs"),
  /**
   * Validates that the value is a `boolean`.
   */
  boolean: /* @__PURE__ */ n(() => new ne({ isOptional: "required" }), "boolean"),
  /**
   * Validates that the value is a `string`.
   *
   * Strings are stored as UTF-8 and their storage size is calculated as their
   * UTF-8 encoded size.
   */
  string: /* @__PURE__ */ n(() => new se({ isOptional: "required" }), "string"),
  /**
   * Validates that the value is an `ArrayBuffer` (Convex Bytes).
   *
   * Use for binary data.
   */
  bytes: /* @__PURE__ */ n(() => new oe({ isOptional: "required" }), "bytes"),
  /**
   * Validates that the value is exactly equal to the given literal.
   *
   * Useful for discriminated unions and enum-like patterns.
   *
   * @example
   * ```typescript
   * // Discriminated union pattern:
   * v.union(
   *   v.object({ kind: v.literal("error"), message: v.string() }),
   *   v.object({ kind: v.literal("success"), value: v.number() }),
   * )
   * ```
   *
   * @param literal The literal value to compare against.
   */
  literal: /* @__PURE__ */ n((t) => new ue({ isOptional: "required", value: t }), "literal"),
  /**
   * Validates that the value is an `Array` where every element matches the
   * given validator.
   *
   * Arrays can have at most 8192 elements.
   *
   * @example
   * ```typescript
   * args: { tags: v.array(v.string()) }
   * args: { coordinates: v.array(v.number()) }
   * args: { items: v.array(v.object({ name: v.string(), qty: v.number() })) }
   * ```
   *
   * @param element The validator for the elements of the array.
   */
  array: /* @__PURE__ */ n((t) => new le({ isOptional: "required", element: t }), "array"),
  /**
   * Validates that the value is an `Object` with the specified properties.
   *
   * Objects can have at most 1024 entries. Field names must be non-empty and
   * must not start with `"$"` or `"_"` (`_` is reserved for system fields
   * like `_id` and `_creationTime`; `$` is reserved for Convex internal use).
   *
   * @example
   * ```typescript
   * args: {
   *   user: v.object({
   *     name: v.string(),
   *     email: v.string(),
   *     age: v.optional(v.number()),
   *   })
   * }
   * ```
   *
   * @param fields An object mapping property names to their validators.
   */
  object: /* @__PURE__ */ n((t) => new ce({ isOptional: "required", fields: t }), "object"),
  /**
   * Validates that the value is a `Record` (object with dynamic keys).
   *
   * Records are objects at runtime but allow dynamic keys, unlike `v.object()`
   * which requires known property names. Keys must be ASCII characters only,
   * non-empty, and not start with `"$"` or `"_"`.
   *
   * @example
   * ```typescript
   * // Map of user IDs to scores:
   * args: { scores: v.record(v.id("users"), v.number()) }
   *
   * // Map of string keys to string values:
   * args: { metadata: v.record(v.string(), v.string()) }
   * ```
   *
   * @param keys The validator for the keys of the record.
   * @param values The validator for the values of the record.
   */
  record: /* @__PURE__ */ n((t, e) => new fe({
    isOptional: "required",
    key: t,
    value: e
  }), "record"),
  /**
   * Validates that the value matches at least one of the given validators.
   *
   * @example
   * ```typescript
   * // Allow string or number:
   * args: { value: v.union(v.string(), v.number()) }
   *
   * // Discriminated union (recommended pattern):
   * v.union(
   *   v.object({ kind: v.literal("text"), body: v.string() }),
   *   v.object({ kind: v.literal("image"), url: v.string() }),
   * )
   *
   * // Nullable value:
   * returns: v.union(v.object({ ... }), v.null())
   * ```
   *
   * @param members The validators to match against.
   */
  union: /* @__PURE__ */ n((...t) => new pe({
    isOptional: "required",
    members: t
  }), "union"),
  /**
   * A validator that accepts any Convex value without validation.
   *
   * Prefer using specific validators when possible for better type safety
   * and runtime validation.
   */
  any: /* @__PURE__ */ n(() => new ae({ isOptional: "required" }), "any"),
  /**
   * Makes a property optional in an object validator.
   *
   * An optional property can be omitted entirely when creating a document or
   * calling a function. This is different from `v.nullable()` which requires
   * the property to be present but allows `null`.
   *
   * @example
   * ```typescript
   * v.object({
   *   name: v.string(),              // required
   *   nickname: v.optional(v.string()), // can be omitted
   * })
   *
   * // Valid: { name: "Alice" }
   * // Valid: { name: "Alice", nickname: "Ali" }
   * // Invalid: { name: "Alice", nickname: null }  - use v.nullable() for this
   * ```
   *
   * @param value The property value validator to make optional.
   */
  optional: /* @__PURE__ */ n((t) => t.asOptional(), "optional"),
  /**
   * Allows a value to be either the given type or `null`.
   *
   * This is shorthand for `v.union(value, v.null())`. Unlike `v.optional()`,
   * the property must still be present, but may be `null`.
   *
   * @example
   * ```typescript
   * v.object({
   *   name: v.string(),
   *   deletedAt: v.nullable(v.number()), // must be present, can be null
   * })
   *
   * // Valid: { name: "Alice", deletedAt: null }
   * // Valid: { name: "Alice", deletedAt: 1234567890 }
   * // Invalid: { name: "Alice" }  - deletedAt is required
   * ```
   */
  nullable: /* @__PURE__ */ n((t) => c.union(t, c.null()), "nullable")
};

// node_modules/convex/dist/esm/values/errors.js
var lr = Object.defineProperty, fr = /* @__PURE__ */ n((t, e, r) => e in t ? lr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, "__defNormalProp"), Re = /* @__PURE__ */ n((t, e, r) => fr(t, typeof e != "symbol" ? e + "" : e, r), "__publicField"), ut, lt, pr = Symbol.for("ConvexError"), he = class extends (lt = Error, ut = pr, lt) {
  static {
    n(this, "ConvexError");
  }
  constructor(e) {
    super(typeof e == "string" ? e : I(e)), Re(this, "name", "ConvexError"), Re(this, "data"), Re(this, ut, !0), this.data = e;
  }
};

// node_modules/convex/dist/esm/values/compare_utf8.js
var ft = /* @__PURE__ */ n(() => Array.from({ length: 4 }, () => 0), "arr"), On = ft(), _n = ft();

// node_modules/convex/dist/esm/server/impl/syscall.js
function C(t, e) {
  if (typeof Convex > "u" || Convex.syscall === void 0)
    throw new Error(
      "The Convex database and auth objects are being used outside of a Convex backend. Did you mean to use `useQuery` or `useMutation` to call a Convex function?"
    );
  let r = Convex.syscall(t, JSON.stringify(e));
  return JSON.parse(r);
}
n(C, "performSyscall");
async function u(t, e) {
  if (typeof Convex > "u" || Convex.asyncSyscall === void 0)
    throw new Error(
      "The Convex database and auth objects are being used outside of a Convex backend. Did you mean to use `useQuery` or `useMutation` to call a Convex function?"
    );
  let r;
  try {
    r = await Convex.asyncSyscall(t, JSON.stringify(e));
  } catch (o) {
    if (o.data !== void 0) {
      let s = new he(o.message);
      throw s.data = h(o.data), s;
    }
    throw new Error(o.message);
  }
  return JSON.parse(r);
}
n(u, "performAsyncSyscall");
function P(t, e) {
  if (typeof Convex > "u" || Convex.jsSyscall === void 0)
    throw new Error(
      "The Convex database and auth objects are being used outside of a Convex backend. Did you mean to use `useQuery` or `useMutation` to call a Convex function?"
    );
  return Convex.jsSyscall(t, e);
}
n(P, "performJsSyscall");

// node_modules/convex/dist/esm/server/router.js
var dr = Object.defineProperty, hr = /* @__PURE__ */ n((t, e, r) => e in t ? dr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, "__defNormalProp"), N = /* @__PURE__ */ n((t, e, r) => hr(t, typeof e != "symbol" ? e + "" : e, r), "__publicField"), pt = [
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "OPTIONS",
  "PATCH"
];
function mr(t) {
  return t === "HEAD" ? "GET" : t;
}
n(mr, "normalizeMethod");
var yr = /* @__PURE__ */ n(() => new me(), "httpRouter"), me = class {
  static {
    n(this, "HttpRouter");
  }
  constructor() {
    N(this, "exactRoutes", /* @__PURE__ */ new Map()), N(this, "prefixRoutes", /* @__PURE__ */ new Map()), N(this, "isRouter", !0), N(this, "route", (e) => {
      if (!e.handler) throw new Error("route requires handler");
      if (!e.method) throw new Error("route requires method");
      let { method: r, handler: o } = e;
      if (!pt.includes(r))
        throw new Error(
          `'${r}' is not an allowed HTTP method (like GET, POST, PUT etc.)`
        );
      if ("path" in e) {
        if ("pathPrefix" in e)
          throw new Error(
            "Invalid httpRouter route: cannot contain both 'path' and 'pathPrefix'"
          );
        if (!e.path.startsWith("/"))
          throw new Error(`path '${e.path}' does not start with a /`);
        if (e.path.startsWith("/.files/") || e.path === "/.files")
          throw new Error(`path '${e.path}' is reserved`);
        let s = this.exactRoutes.has(e.path) ? this.exactRoutes.get(e.path) : /* @__PURE__ */ new Map();
        if (s.has(r))
          throw new Error(
            `Path '${e.path}' for method ${r} already in use`
          );
        s.set(r, o), this.exactRoutes.set(e.path, s);
      } else if ("pathPrefix" in e) {
        if (!e.pathPrefix.startsWith("/"))
          throw new Error(
            `pathPrefix '${e.pathPrefix}' does not start with a /`
          );
        if (!e.pathPrefix.endsWith("/"))
          throw new Error(`pathPrefix ${e.pathPrefix} must end with a /`);
        if (e.pathPrefix.startsWith("/.files/"))
          throw new Error(`pathPrefix '${e.pathPrefix}' is reserved`);
        let s = this.prefixRoutes.get(r) || /* @__PURE__ */ new Map();
        if (s.has(e.pathPrefix))
          throw new Error(
            `${e.method} pathPrefix ${e.pathPrefix} is already defined`
          );
        s.set(e.pathPrefix, o), this.prefixRoutes.set(r, s);
      } else
        throw new Error(
          "Invalid httpRouter route entry: must contain either field 'path' or 'pathPrefix'"
        );
    }), N(this, "getRoutes", () => {
      let r = [...this.exactRoutes.keys()].sort().flatMap(
        (a) => [...this.exactRoutes.get(a).keys()].sort().map(
          (i) => [a, i, this.exactRoutes.get(a).get(i)]
        )
      ), s = [...this.prefixRoutes.keys()].sort().flatMap(
        (a) => [...this.prefixRoutes.get(a).keys()].sort().map(
          (i) => [
            `${i}*`,
            a,
            this.prefixRoutes.get(a).get(i)
          ]
        )
      );
      return [...r, ...s];
    }), N(this, "lookup", (e, r) => {
      r = mr(r);
      let o = this.exactRoutes.get(e)?.get(r);
      if (o) return [o, r, e];
      let a = [...(this.prefixRoutes.get(r) || /* @__PURE__ */ new Map()).entries()].sort(
        ([i, l], [p, x]) => p.length - i.length
      );
      for (let [i, l] of a)
        if (e.startsWith(i))
          return [l, r, `${i}*`];
      return null;
    }), N(this, "runRequest", async (e, r) => {
      let o = P("requestFromConvexJson", {
        convexJson: JSON.parse(e)
      }), s = r;
      (!s || typeof s != "string") && (s = new URL(o.url).pathname);
      let a = o.method, i = this.lookup(s, a);
      if (!i) {
        let Oe = new Response(`No HttpAction routed for ${s}`, {
          status: 404
        });
        return JSON.stringify(
          P("convexJsonFromResponse", { response: Oe })
        );
      }
      let [l, p, x] = i, U = await l.invokeHttpAction(o);
      return JSON.stringify(
        P("convexJsonFromResponse", { response: U })
      );
    });
  }
};

// node_modules/convex/dist/esm/index.js
var w = "1.46.0";

// node_modules/convex/dist/esm/server/functionName.js
var z = Symbol.for("functionName");

// node_modules/convex/dist/esm/server/components/paths.js
var dt = Symbol.for("toReferencePath");
function wr(t) {
  return t[dt] ?? null;
}
n(wr, "extractReferencePath");
function gr(t) {
  return t.startsWith("function://");
}
n(gr, "isFunctionHandle");
function A(t) {
  let e;
  if (typeof t == "string")
    gr(t) ? e = { functionHandle: t } : e = { name: t };
  else if (t[z])
    e = { name: t[z] };
  else {
    let r = wr(t);
    if (!r)
      throw new Error(`${t} is not a functionReference`);
    e = { reference: r };
  }
  return e;
}
n(A, "getFunctionAddress");

// node_modules/convex/dist/esm/server/impl/validate.js
function f(t, e, r, o) {
  if (t === void 0)
    throw new TypeError(
      `Must provide arg ${e} \`${o}\` to \`${r}\``
    );
}
n(f, "validateArg");
function ht(t, e, r, o) {
  if (!Number.isInteger(t) || t < 0)
    throw new TypeError(
      `Arg ${e} \`${o}\` to \`${r}\` must be a non-negative integer`
    );
}
n(ht, "validateArgIsNonNegativeInteger");

// node_modules/convex/dist/esm/server/impl/actions_impl.js
function je(t, e, r) {
  return {
    ...A(e),
    args: y(O(r)),
    version: w,
    requestId: t
  };
}
n(je, "syscallArgs");
function Fe(t) {
  return {
    runQuery: /* @__PURE__ */ n(async (e, r) => {
      let o = await u(
        "1.0/actions/query",
        je(t, e, r)
      );
      return h(o);
    }, "runQuery"),
    runMutation: /* @__PURE__ */ n(async (e, r) => {
      let o = await u(
        "1.0/actions/mutation",
        je(t, e, r)
      );
      return h(o);
    }, "runMutation"),
    runAction: /* @__PURE__ */ n(async (e, r) => {
      let o = await u(
        "1.0/actions/action",
        je(t, e, r)
      );
      return h(o);
    }, "runAction")
  };
}
n(Fe, "setupActionCalls");

// node_modules/convex/dist/esm/server/vector_search.js
var xr = Object.defineProperty, br = /* @__PURE__ */ n((t, e, r) => e in t ? xr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, "__defNormalProp"), mt = /* @__PURE__ */ n((t, e, r) => br(t, typeof e != "symbol" ? e + "" : e, r), "__publicField"), ye = class {
  static {
    n(this, "FilterExpression");
  }
  /**
   * @internal
   */
  constructor() {
    mt(this, "_isExpression"), mt(this, "_value");
  }
};

// node_modules/convex/dist/esm/server/impl/vector_search_impl.js
var vr = Object.defineProperty, Er = /* @__PURE__ */ n((t, e, r) => e in t ? vr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, "__defNormalProp"), qe = /* @__PURE__ */ n((t, e, r) => Er(t, typeof e != "symbol" ? e + "" : e, r), "__publicField");
function Be(t) {
  return async (e, r, o) => {
    if (f(e, 1, "vectorSearch", "tableName"), f(r, 2, "vectorSearch", "indexName"), f(o, 3, "vectorSearch", "query"), !o.vector || !Array.isArray(o.vector) || o.vector.length === 0)
      throw Error("`vector` must be a non-empty Array in vectorSearch");
    return await new Me(
      t,
      e + "." + r,
      o
    ).collect();
  };
}
n(Be, "setupActionVectorSearch");
var Me = class {
  static {
    n(this, "VectorQueryImpl");
  }
  constructor(e, r, o) {
    qe(this, "requestId"), qe(this, "state"), this.requestId = e;
    let s = o.filter ? we(o.filter(Ar)) : null;
    this.state = {
      type: "preparing",
      query: {
        indexName: r,
        limit: o.limit,
        vector: o.vector,
        expressions: s
      }
    };
  }
  async collect() {
    if (this.state.type === "consumed")
      throw new Error("This query is closed and can't emit any more values.");
    let e = this.state.query;
    this.state = { type: "consumed" };
    let { results: r } = await u("1.0/actions/vectorSearch", {
      requestId: this.requestId,
      version: w,
      query: e
    });
    return r;
  }
}, F = class extends ye {
  static {
    n(this, "ExpressionImpl");
  }
  constructor(e) {
    super(), qe(this, "inner"), this.inner = e;
  }
  serialize() {
    return this.inner;
  }
};
function we(t) {
  return t instanceof F ? t.serialize() : { $literal: E(t) };
}
n(we, "serializeExpression");
var Ar = {
  //  Comparisons  /////////////////////////////////////////////////////////////
  eq(t, e) {
    if (typeof t != "string")
      throw new Error("The first argument to `q.eq` must be a field name.");
    return new F({
      $eq: [
        we(new F({ $field: t })),
        we(e)
      ]
    });
  },
  //  Logic  ///////////////////////////////////////////////////////////////////
  or(...t) {
    return new F({ $or: t.map(we) });
  }
};

// node_modules/convex/dist/esm/server/impl/authentication_impl.js
function W(t) {
  return {
    getUserIdentity: /* @__PURE__ */ n(async () => await u("1.0/getUserIdentity", {
      requestId: t
    }), "getUserIdentity")
  };
}
n(W, "setupAuth");

// node_modules/convex/dist/esm/server/filter_builder.js
var Sr = Object.defineProperty, Tr = /* @__PURE__ */ n((t, e, r) => e in t ? Sr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, "__defNormalProp"), yt = /* @__PURE__ */ n((t, e, r) => Tr(t, typeof e != "symbol" ? e + "" : e, r), "__publicField"), ge = class {
  static {
    n(this, "Expression");
  }
  /**
   * @internal
   */
  constructor() {
    yt(this, "_isExpression"), yt(this, "_value");
  }
};

// node_modules/convex/dist/esm/server/impl/filter_builder_impl.js
var Or = Object.defineProperty, _r = /* @__PURE__ */ n((t, e, r) => e in t ? Or(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, "__defNormalProp"), Ir = /* @__PURE__ */ n((t, e, r) => _r(t, typeof e != "symbol" ? e + "" : e, r), "__publicField"), g = class extends ge {
  static {
    n(this, "ExpressionImpl");
  }
  constructor(e) {
    super(), Ir(this, "inner"), this.inner = e;
  }
  serialize() {
    return this.inner;
  }
};
function d(t) {
  return t instanceof g ? t.serialize() : { $literal: E(t) };
}
n(d, "serializeExpression");
var wt = {
  //  Comparisons  /////////////////////////////////////////////////////////////
  eq(t, e) {
    return new g({
      $eq: [d(t), d(e)]
    });
  },
  neq(t, e) {
    return new g({
      $neq: [d(t), d(e)]
    });
  },
  lt(t, e) {
    return new g({
      $lt: [d(t), d(e)]
    });
  },
  lte(t, e) {
    return new g({
      $lte: [d(t), d(e)]
    });
  },
  gt(t, e) {
    return new g({
      $gt: [d(t), d(e)]
    });
  },
  gte(t, e) {
    return new g({
      $gte: [d(t), d(e)]
    });
  },
  //  Arithmetic  //////////////////////////////////////////////////////////////
  add(t, e) {
    return new g({
      $add: [d(t), d(e)]
    });
  },
  sub(t, e) {
    return new g({
      $sub: [d(t), d(e)]
    });
  },
  mul(t, e) {
    return new g({
      $mul: [d(t), d(e)]
    });
  },
  div(t, e) {
    return new g({
      $div: [d(t), d(e)]
    });
  },
  mod(t, e) {
    return new g({
      $mod: [d(t), d(e)]
    });
  },
  neg(t) {
    return new g({ $neg: d(t) });
  },
  //  Logic  ///////////////////////////////////////////////////////////////////
  and(...t) {
    return new g({ $and: t.map(d) });
  },
  or(...t) {
    return new g({ $or: t.map(d) });
  },
  not(t) {
    return new g({ $not: d(t) });
  },
  //  Other  ///////////////////////////////////////////////////////////////////
  field(t) {
    return new g({ $field: t });
  }
};

// node_modules/convex/dist/esm/server/index_range_builder.js
var $r = Object.defineProperty, Cr = /* @__PURE__ */ n((t, e, r) => e in t ? $r(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, "__defNormalProp"), Pr = /* @__PURE__ */ n((t, e, r) => Cr(t, typeof e != "symbol" ? e + "" : e, r), "__publicField"), xe = class {
  static {
    n(this, "IndexRange");
  }
  /**
   * @internal
   */
  constructor() {
    Pr(this, "_isIndexRange");
  }
};

// node_modules/convex/dist/esm/server/impl/index_range_builder_impl.js
var Nr = Object.defineProperty, Rr = /* @__PURE__ */ n((t, e, r) => e in t ? Nr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, "__defNormalProp"), gt = /* @__PURE__ */ n((t, e, r) => Rr(t, typeof e != "symbol" ? e + "" : e, r), "__publicField"), be = class t extends xe {
  static {
    n(this, "IndexRangeBuilderImpl");
  }
  constructor(e) {
    super(), gt(this, "rangeExpressions"), gt(this, "isConsumed"), this.rangeExpressions = e, this.isConsumed = !1;
  }
  static new() {
    return new t([]);
  }
  consume() {
    if (this.isConsumed)
      throw new Error(
        "IndexRangeBuilder has already been used! Chain your method calls like `q => q.eq(...).eq(...)`. See https://docs.convex.dev/using/indexes"
      );
    this.isConsumed = !0;
  }
  eq(e, r) {
    return this.consume(), new t(
      this.rangeExpressions.concat({
        type: "Eq",
        fieldPath: e,
        value: E(r)
      })
    );
  }
  gt(e, r) {
    return this.consume(), new t(
      this.rangeExpressions.concat({
        type: "Gt",
        fieldPath: e,
        value: E(r)
      })
    );
  }
  gte(e, r) {
    return this.consume(), new t(
      this.rangeExpressions.concat({
        type: "Gte",
        fieldPath: e,
        value: E(r)
      })
    );
  }
  lt(e, r) {
    return this.consume(), new t(
      this.rangeExpressions.concat({
        type: "Lt",
        fieldPath: e,
        value: E(r)
      })
    );
  }
  lte(e, r) {
    return this.consume(), new t(
      this.rangeExpressions.concat({
        type: "Lte",
        fieldPath: e,
        value: E(r)
      })
    );
  }
  export() {
    return this.consume(), this.rangeExpressions;
  }
};

// node_modules/convex/dist/esm/server/search_filter_builder.js
var jr = Object.defineProperty, Fr = /* @__PURE__ */ n((t, e, r) => e in t ? jr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, "__defNormalProp"), qr = /* @__PURE__ */ n((t, e, r) => Fr(t, typeof e != "symbol" ? e + "" : e, r), "__publicField"), ve = class {
  static {
    n(this, "SearchFilter");
  }
  /**
   * @internal
   */
  constructor() {
    qr(this, "_isSearchFilter");
  }
};

// node_modules/convex/dist/esm/server/impl/search_filter_builder_impl.js
var Mr = Object.defineProperty, Br = /* @__PURE__ */ n((t, e, r) => e in t ? Mr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, "__defNormalProp"), xt = /* @__PURE__ */ n((t, e, r) => Br(t, typeof e != "symbol" ? e + "" : e, r), "__publicField"), Ee = class t extends ve {
  static {
    n(this, "SearchFilterBuilderImpl");
  }
  constructor(e) {
    super(), xt(this, "filters"), xt(this, "isConsumed"), this.filters = e, this.isConsumed = !1;
  }
  static new() {
    return new t([]);
  }
  consume() {
    if (this.isConsumed)
      throw new Error(
        "SearchFilterBuilder has already been used! Chain your method calls like `q => q.search(...).eq(...)`."
      );
    this.isConsumed = !0;
  }
  search(e, r) {
    return f(e, 1, "search", "fieldName"), f(r, 2, "search", "query"), this.consume(), new t(
      this.filters.concat({
        type: "Search",
        fieldPath: e,
        value: r
      })
    );
  }
  eq(e, r) {
    return f(e, 1, "eq", "fieldName"), arguments.length !== 2 && f(r, 2, "search", "value"), this.consume(), new t(
      this.filters.concat({
        type: "Eq",
        fieldPath: e,
        value: E(r)
      })
    );
  }
  export() {
    return this.consume(), this.filters;
  }
};

// node_modules/convex/dist/esm/server/impl/query_impl.js
var Ur = Object.defineProperty, Vr = /* @__PURE__ */ n((t, e, r) => e in t ? Ur(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, "__defNormalProp"), Ue = /* @__PURE__ */ n((t, e, r) => Vr(t, typeof e != "symbol" ? e + "" : e, r), "__publicField"), bt = 256, q = class {
  static {
    n(this, "QueryInitializerImpl");
  }
  constructor(e) {
    Ue(this, "tableName"), this.tableName = e;
  }
  withIndex(e, r) {
    f(e, 1, "withIndex", "indexName");
    let o = be.new();
    return r !== void 0 && (o = r(o)), new R({
      source: {
        type: "IndexRange",
        indexName: this.tableName + "." + e,
        range: o.export(),
        order: null
      },
      operators: []
    });
  }
  withSearchIndex(e, r) {
    f(e, 1, "withSearchIndex", "indexName"), f(r, 2, "withSearchIndex", "searchFilter");
    let o = Ee.new();
    return new R({
      source: {
        type: "Search",
        indexName: this.tableName + "." + e,
        filters: r(o).export()
      },
      operators: []
    });
  }
  fullTableScan() {
    return new R({
      source: {
        type: "FullTableScan",
        tableName: this.tableName,
        order: null
      },
      operators: []
    });
  }
  order(e) {
    return this.fullTableScan().order(e);
  }
  // This is internal API and should not be exposed to developers yet.
  async count() {
    let e = await u("1.0/count", {
      table: this.tableName
    });
    return h(e);
  }
  filter(e) {
    return this.fullTableScan().filter(e);
  }
  limit(e) {
    return this.fullTableScan().limit(e);
  }
  collect() {
    return this.fullTableScan().collect();
  }
  take(e) {
    return this.fullTableScan().take(e);
  }
  paginate(e) {
    return this.fullTableScan().paginate(e);
  }
  first() {
    return this.fullTableScan().first();
  }
  unique() {
    return this.fullTableScan().unique();
  }
  [Symbol.asyncIterator]() {
    return this.fullTableScan()[Symbol.asyncIterator]();
  }
};
function vt(t) {
  throw new Error(
    t === "consumed" ? "This query is closed and can't emit any more values." : "This query has been chained with another operator and can't be reused."
  );
}
n(vt, "throwClosedError");
var R = class t {
  static {
    n(this, "QueryImpl");
  }
  constructor(e) {
    Ue(this, "state"), Ue(this, "tableNameForErrorMessages"), this.state = { type: "preparing", query: e }, e.source.type === "FullTableScan" ? this.tableNameForErrorMessages = e.source.tableName : this.tableNameForErrorMessages = e.source.indexName.split(".")[0];
  }
  takeQuery() {
    if (this.state.type !== "preparing")
      throw new Error(
        "A query can only be chained once and can't be chained after iteration begins."
      );
    let e = this.state.query;
    return this.state = { type: "closed" }, e;
  }
  startQuery() {
    if (this.state.type === "executing")
      throw new Error("Iteration can only begin on a query once.");
    (this.state.type === "closed" || this.state.type === "consumed") && vt(this.state.type);
    let e = this.state.query, { queryId: r } = C("1.0/queryStream", { query: e, version: w });
    return this.state = { type: "executing", queryId: r }, r;
  }
  closeQuery() {
    if (this.state.type === "executing") {
      let e = this.state.queryId;
      C("1.0/queryCleanup", { queryId: e });
    }
    this.state = { type: "consumed" };
  }
  order(e) {
    f(e, 1, "order", "order");
    let r = this.takeQuery();
    if (r.source.type === "Search")
      throw new Error(
        "Search queries must always be in relevance order. Can not set order manually."
      );
    if (r.source.order !== null)
      throw new Error("Queries may only specify order at most once");
    return r.source.order = e, new t(r);
  }
  filter(e) {
    f(e, 1, "filter", "predicate");
    let r = this.takeQuery();
    if (r.operators.length >= bt)
      throw new Error(
        `Can't construct query with more than ${bt} operators`
      );
    return r.operators.push({
      filter: d(e(wt))
    }), new t(r);
  }
  limit(e) {
    f(e, 1, "limit", "n");
    let r = this.takeQuery();
    return r.operators.push({ limit: e }), new t(r);
  }
  [Symbol.asyncIterator]() {
    return this.startQuery(), this;
  }
  async next() {
    (this.state.type === "closed" || this.state.type === "consumed") && vt(this.state.type);
    let e = this.state.type === "preparing" ? this.startQuery() : this.state.queryId, { value: r, done: o } = await u("1.0/queryStreamNext", {
      queryId: e
    });
    return o && this.closeQuery(), { value: h(r), done: o };
  }
  return() {
    return this.closeQuery(), Promise.resolve({ done: !0, value: void 0 });
  }
  async paginate(e) {
    if (f(e, 1, "paginate", "options"), typeof e?.numItems != "number" || e.numItems < 0)
      throw new Error(
        `\`options.numItems\` must be a positive number. Received \`${e?.numItems}\`.`
      );
    let r = this.takeQuery(), o = e.numItems, s = e.cursor, a = e?.endCursor ?? null, i = e.maximumRowsRead ?? null, { page: l, isDone: p, continueCursor: x, splitCursor: U, pageStatus: Oe } = await u("1.0/queryPage", {
      query: r,
      cursor: s,
      endCursor: a,
      pageSize: o,
      maximumRowsRead: i,
      maximumBytesRead: e.maximumBytesRead,
      version: w
    });
    return {
      page: l.map((Jt) => h(Jt)),
      isDone: p,
      continueCursor: x,
      splitCursor: U,
      pageStatus: Oe
    };
  }
  async collect() {
    let e = [];
    for await (let r of this)
      e.push(r);
    return e;
  }
  async take(e) {
    return f(e, 1, "take", "n"), ht(e, 1, "take", "n"), this.limit(e).collect();
  }
  async first() {
    let e = await this.take(1);
    return e.length === 0 ? null : e[0];
  }
  async unique() {
    let e = await this.take(2);
    if (e.length === 0)
      return null;
    if (e.length === 2)
      throw new Error(`unique() query returned more than one result from table ${this.tableNameForErrorMessages}:
 [${e[0]._id}, ${e[1]._id}, ...]`);
    return e[0];
  }
};

// node_modules/convex/dist/esm/server/impl/database_impl.js
async function Ve(t, e, r) {
  if (f(e, 1, "get", "id"), typeof e != "string")
    throw new Error(
      `Invalid argument \`id\` for \`db.get\`, expected string but got '${typeof e}': ${e}`
    );
  let o = {
    id: y(e),
    isSystem: r,
    version: w,
    table: t
  }, s = await u("1.0/get", o);
  return h(s);
}
n(Ve, "get");
function Qe() {
  let t = /* @__PURE__ */ n((s = !1) => ({
    get: /* @__PURE__ */ n(async (a, i) => i !== void 0 ? await Ve(a, i, s) : await Ve(void 0, a, s), "get"),
    query: /* @__PURE__ */ n((a) => new G(a, s).query(), "query"),
    normalizeId: /* @__PURE__ */ n((a, i) => {
      f(a, 1, "normalizeId", "tableName"), f(i, 2, "normalizeId", "id");
      let l = a.startsWith("_");
      if (l !== s)
        throw new Error(
          `${l ? "System" : "User"} tables can only be accessed from db.${s ? "" : "system."}normalizeId().`
        );
      let p = C("1.0/db/normalizeId", {
        table: a,
        idString: i
      });
      return h(p).id;
    }, "normalizeId"),
    // We set the system reader on the next line
    system: null,
    table: /* @__PURE__ */ n((a) => new G(a, s), "table")
  }), "reader"), { system: e, ...r } = t(!0), o = t();
  return o.system = r, o;
}
n(Qe, "setupReader");
async function Et(t, e) {
  if (t.startsWith("_"))
    throw new Error("System tables (prefixed with `_`) are read-only.");
  f(t, 1, "insert", "table"), f(e, 2, "insert", "value");
  let r = await u("1.0/insert", {
    table: t,
    value: y(e)
  });
  return h(r)._id;
}
n(Et, "insert");
async function Je(t, e, r) {
  f(e, 1, "patch", "id"), f(r, 2, "patch", "value"), await u("1.0/shallowMerge", {
    id: y(e),
    value: ct(r),
    table: t
  });
}
n(Je, "patch");
async function ke(t, e, r) {
  f(e, 1, "replace", "id"), f(r, 2, "replace", "value"), await u("1.0/replace", {
    id: y(e),
    value: y(r),
    table: t
  });
}
n(ke, "replace");
async function Le(t, e) {
  f(e, 1, "delete", "id"), await u("1.0/remove", {
    id: y(e),
    table: t
  });
}
n(Le, "delete_");
function At() {
  let t = Qe();
  return {
    get: t.get,
    query: t.query,
    normalizeId: t.normalizeId,
    system: t.system,
    insert: /* @__PURE__ */ n(async (e, r) => await Et(e, r), "insert"),
    patch: /* @__PURE__ */ n(async (e, r, o) => o !== void 0 ? await Je(e, r, o) : await Je(void 0, e, r), "patch"),
    replace: /* @__PURE__ */ n(async (e, r, o) => o !== void 0 ? await ke(e, r, o) : await ke(void 0, e, r), "replace"),
    delete: /* @__PURE__ */ n(async (e, r) => r !== void 0 ? await Le(e, r) : await Le(void 0, e), "delete"),
    table: /* @__PURE__ */ n((e) => new De(e, !1), "table"),
    vars: {
      commitTs: Ne
    }
  };
}
n(At, "setupWriter");
var G = class {
  static {
    n(this, "TableReader");
  }
  constructor(e, r) {
    this.tableName = e, this.isSystem = r;
  }
  async get(e) {
    return Ve(this.tableName, e, this.isSystem);
  }
  query() {
    let e = this.tableName.startsWith("_");
    if (e !== this.isSystem)
      throw new Error(
        `${e ? "System" : "User"} tables can only be accessed from db.${this.isSystem ? "" : "system."}query().`
      );
    return new q(this.tableName);
  }
}, De = class extends G {
  static {
    n(this, "TableWriter");
  }
  async insert(e) {
    return Et(this.tableName, e);
  }
  async patch(e, r) {
    return Je(this.tableName, e, r);
  }
  async replace(e, r) {
    return ke(this.tableName, e, r);
  }
  async delete(e) {
    return Le(this.tableName, e);
  }
};

// node_modules/convex/dist/esm/server/impl/scheduler_impl.js
function St() {
  return {
    runAfter: /* @__PURE__ */ n(async (t, e, r) => {
      let o = Tt(t, e, r);
      return await u("1.0/schedule", o);
    }, "runAfter"),
    runAt: /* @__PURE__ */ n(async (t, e, r) => {
      let o = Ot(
        t,
        e,
        r
      );
      return await u("1.0/schedule", o);
    }, "runAt"),
    cancel: /* @__PURE__ */ n(async (t) => {
      f(t, 1, "cancel", "id");
      let e = { id: y(t) };
      await u("1.0/cancel_job", e);
    }, "cancel")
  };
}
n(St, "setupMutationScheduler");
function He(t) {
  return {
    runAfter: /* @__PURE__ */ n(async (e, r, o) => {
      let s = {
        requestId: t,
        ...Tt(e, r, o)
      };
      return await u("1.0/actions/schedule", s);
    }, "runAfter"),
    runAt: /* @__PURE__ */ n(async (e, r, o) => {
      let s = {
        requestId: t,
        ...Ot(e, r, o)
      };
      return await u("1.0/actions/schedule", s);
    }, "runAt"),
    cancel: /* @__PURE__ */ n(async (e) => {
      f(e, 1, "cancel", "id");
      let r = {
        requestId: t,
        id: y(e)
      };
      return await u("1.0/actions/cancel_job", r);
    }, "cancel")
  };
}
n(He, "setupActionScheduler");
function Tt(t, e, r) {
  if (typeof t != "number")
    throw new Error("`delayMs` must be a number");
  if (!isFinite(t))
    throw new Error("`delayMs` must be a finite number");
  if (t < 0)
    throw new Error("`delayMs` must be non-negative");
  let o = O(r), s = A(e), a = (Date.now() + t) / 1e3;
  return {
    ...s,
    ts: a,
    args: y(o),
    version: w
  };
}
n(Tt, "runAfterSyscallArgs");
function Ot(t, e, r) {
  let o;
  if (t instanceof Date)
    o = t.valueOf() / 1e3;
  else if (typeof t == "number")
    o = t / 1e3;
  else
    throw new Error("The invoke time must a Date or a timestamp");
  let s = A(e), a = O(r);
  return {
    ...s,
    ts: o,
    args: y(a),
    version: w
  };
}
n(Ot, "runAtSyscallArgs");

// node_modules/convex/dist/esm/server/impl/storage_impl.js
function ze(t) {
  return {
    getUrl: /* @__PURE__ */ n(async (e) => (f(e, 1, "getUrl", "storageId"), await u("1.0/storageGetUrl", {
      requestId: t,
      version: w,
      storageId: e
    })), "getUrl"),
    getMetadata: /* @__PURE__ */ n(async (e) => await u("1.0/storageGetMetadata", {
      requestId: t,
      version: w,
      storageId: e
    }), "getMetadata")
  };
}
n(ze, "setupStorageReader");
function We(t) {
  let e = ze(t);
  return {
    generateUploadUrl: /* @__PURE__ */ n(async () => await u("1.0/storageGenerateUploadUrl", {
      requestId: t,
      version: w
    }), "generateUploadUrl"),
    delete: /* @__PURE__ */ n(async (r) => {
      await u("1.0/storageDelete", {
        requestId: t,
        version: w,
        storageId: r
      });
    }, "delete"),
    getUrl: e.getUrl,
    getMetadata: e.getMetadata
  };
}
n(We, "setupStorageWriter");
function Ge(t) {
  return {
    ...We(t),
    store: /* @__PURE__ */ n(async (r, o) => await P("storage/storeBlob", {
      requestId: t,
      version: w,
      blob: r,
      options: o
    }), "store"),
    get: /* @__PURE__ */ n(async (r) => await P("storage/getBlob", {
      requestId: t,
      version: w,
      storageId: r
    }), "get")
  };
}
n(Ge, "setupStorageActionWriter");

// node_modules/convex/dist/esm/server/impl/meta_impl.js
async function _t() {
  let t;
  try {
    t = await u("1.0/getTransactionMetrics", {});
  } catch (e) {
    throw e.message?.includes("Unknown async operation") ? new Error(
      "getTransactionMetrics() can only be called from a query or mutation. It is not available in actions or outside of a Convex function."
    ) : e;
  }
  return h(t);
}
n(_t, "getTransactionMetrics");
async function Xe() {
  let { name: t, componentPath: e } = await u(
    "1.0/getFunctionMetadata",
    {}
  );
  return {
    name: t,
    componentPath: e
  };
}
n(Xe, "getFunctionMetadata");
async function Ye() {
  let t = await u(
    "1.0/getDeploymentMetadata",
    {}
  ), e = h(t);
  return {
    name: e.name,
    region: e.region ?? null,
    class: e.class
  };
}
n(Ye, "getDeploymentMetadata");
function It() {
  let t = C("1.0/getSnapshotTs", {});
  return h(t);
}
n(It, "getSnapshotTs");
async function $t() {
  let { ip: t, userAgent: e, requestId: r, scheduledFunctionId: o, authToken: s } = await u("1.0/getRequestMetadata", {});
  return { ip: t, userAgent: e, requestId: r, scheduledFunctionId: o, authToken: s };
}
n($t, "getRequestMetadata");
function Ct(t) {
  return {
    getFunctionMetadata: /* @__PURE__ */ n(async () => ({
      ...await Xe(),
      type: "query",
      visibility: t
    }), "getFunctionMetadata"),
    getTransactionMetrics: _t,
    getDeploymentMetadata: Ye,
    getSnapshotTs: It
  };
}
n(Ct, "setupQueryMeta");
function Pt(t) {
  return {
    getFunctionMetadata: /* @__PURE__ */ n(async () => ({
      ...await Xe(),
      type: "mutation",
      visibility: t
    }), "getFunctionMetadata"),
    getTransactionMetrics: _t,
    getDeploymentMetadata: Ye,
    getRequestMetadata: $t,
    getSnapshotTs: It
  };
}
n(Pt, "setupMutationMeta");
function Ke(t) {
  return {
    getFunctionMetadata: /* @__PURE__ */ n(async () => ({
      ...await Xe(),
      type: "action",
      visibility: t
    }), "getFunctionMetadata"),
    getDeploymentMetadata: Ye,
    getRequestMetadata: $t
  };
}
n(Ke, "setupActionMeta");

// node_modules/convex/dist/esm/server/impl/registration_impl.js
async function Nt(t, e, r) {
  let s = h(JSON.parse(e)), a = {
    db: At(),
    auth: W(""),
    storage: We(""),
    scheduler: St(),
    meta: Pt(r),
    runQuery: /* @__PURE__ */ n((l, p, x) => x?.useStaleSnapshot ? Ae("snapshotQuery", l, p, x?.transactionLimits) : Ae("query", l, p, x?.transactionLimits), "runQuery"),
    runMutation: /* @__PURE__ */ n((l, p, x) => Ae("mutation", l, p, x?.transactionLimits), "runMutation")
  }, i = await Se(t, a, s);
  return Rt(i), JSON.stringify(y(i === void 0 ? null : i));
}
n(Nt, "invokeMutation");
function Rt(t) {
  if (t instanceof q || t instanceof R)
    throw new Error(
      "Return value is a Query. Results must be retrieved with `.collect()`, `.take(n), `.unique()`, or `.first()`."
    );
}
n(Rt, "validateReturnValue");
async function Se(t, e, r) {
  let o;
  try {
    o = await Promise.resolve(t(e, ...r));
  } catch (s) {
    throw Jr(s);
  }
  return o;
}
n(Se, "invokeFunction");
function M(t, e) {
  return (r, o) => (globalThis.console.warn(
    `Convex functions should not directly call other Convex functions. Consider calling a helper function instead. e.g. \`export const foo = ${t}(...); await foo(ctx);\` is not supported. See https://docs.convex.dev/production/best-practices/#use-helper-functions-to-write-shared-code`
  ), e(r, o));
}
n(M, "dontCallDirectly");
function Jr(t) {
  if (typeof t == "object" && t !== null && Symbol.for("ConvexError") in t) {
    let e = t;
    return e.data = JSON.stringify(
      y(e.data === void 0 ? null : e.data)
    ), e.ConvexErrorSymbol = Symbol.for("ConvexError"), e;
  } else
    return t;
}
n(Jr, "serializeConvexErrorData");
function B() {
  if (typeof window > "u" || window.__convexAllowFunctionsInBrowser)
    return;
  (Object.getOwnPropertyDescriptor(globalThis, "window")?.get?.toString().includes("[native code]") ?? !1) && console.error(
    "Convex functions should not be imported in the browser. This will throw an error in future versions of `convex`. If this is a false negative, please report it to Convex support."
  );
}
n(B, "assertNotBrowser");
function jt(t, e) {
  if (e === void 0)
    throw new Error(
      `A validator is undefined for field "${t}". This is often caused by circular imports. See https://docs.convex.dev/error#undefined-validator for details.`
    );
  return e;
}
n(jt, "strictReplacer");
function X(t) {
  return () => {
    let e = c.any();
    return typeof t == "object" && t.args !== void 0 && (e = de(t.args)), JSON.stringify(e.json, jt);
  };
}
n(X, "exportArgs");
function Y(t) {
  return () => {
    let e;
    return typeof t == "object" && t.returns !== void 0 && (e = de(t.returns)), JSON.stringify(e ? e.json : null, jt);
  };
}
n(Y, "exportReturns");
var kr = /* @__PURE__ */ n(((t) => {
  let e = typeof t == "function" ? t : t.handler, r = M("mutation", e);
  return B(), r.isMutation = !0, r.isPublic = !0, r.invokeMutation = (o) => Nt(e, o, "public"), r.exportArgs = X(t), r.exportReturns = Y(t), r._handler = e, r;
}), "mutationGeneric"), Lr = /* @__PURE__ */ n(((t) => {
  let e = typeof t == "function" ? t : t.handler, r = M(
    "internalMutation",
    e
  );
  return B(), r.isMutation = !0, r.isInternal = !0, r.invokeMutation = (o) => Nt(e, o, "internal"), r.exportArgs = X(t), r.exportReturns = Y(t), r._handler = e, r;
}), "internalMutationGeneric");
async function Dr(t, e, r) {
  let s = h(JSON.parse(e)), a = {
    db: Qe(),
    auth: W(""),
    storage: ze(""),
    meta: Ct(r),
    runQuery: /* @__PURE__ */ n((l, p, x) => {
      if (x?.useStaleSnapshot)
        throw new Error(
          "`useStaleSnapshot` is only supported in mutations, not queries."
        );
      return Ae("query", l, p, x?.transactionLimits);
    }, "runQuery")
  }, i = await Se(t, a, s);
  return Rt(i), JSON.stringify(y(i === void 0 ? null : i));
}
n(Dr, "invokeQuery");
var Qr = /* @__PURE__ */ n(((t) => {
  let e = typeof t == "function" ? t : t.handler, r = M("query", e);
  return B(), r.isQuery = !0, r.isPublic = !0, r.invokeQuery = (o) => Dr(e, o, "public"), r.exportArgs = X(t), r.exportReturns = Y(t), r._handler = e, r;
}), "queryGeneric");
async function Ft(t, e, r, o) {
  let s = h(JSON.parse(r)), i = {
    ...Fe(e),
    auth: W(e),
    scheduler: He(e),
    storage: Ge(e),
    vectorSearch: Be(e),
    meta: Ke(o)
  }, l = await Se(t, i, s);
  return JSON.stringify(y(l === void 0 ? null : l));
}
n(Ft, "invokeAction");
var Hr = /* @__PURE__ */ n(((t) => {
  let e = typeof t == "function" ? t : t.handler, r = M("action", e);
  return B(), r.isAction = !0, r.isPublic = !0, r.invokeAction = (o, s) => Ft(e, o, s, "public"), r.exportArgs = X(t), r.exportReturns = Y(t), r._handler = e, r;
}), "actionGeneric"), zr = /* @__PURE__ */ n(((t) => {
  let e = typeof t == "function" ? t : t.handler, r = M("internalAction", e);
  return B(), r.isAction = !0, r.isInternal = !0, r.invokeAction = (o, s) => Ft(e, o, s, "internal"), r.exportArgs = X(t), r.exportReturns = Y(t), r._handler = e, r;
}), "internalActionGeneric");
async function Wr(t, e) {
  let s = {
    ...Fe(""),
    auth: W(""),
    storage: Ge(""),
    scheduler: He(""),
    vectorSearch: Be(""),
    meta: Ke("public")
  };
  return await Se(t, s, [e]);
}
n(Wr, "invokeHttpAction");
var Gr = /* @__PURE__ */ n((t) => {
  let e = M("httpAction", t);
  return B(), e.isHttp = !0, e.invokeHttpAction = (r) => Wr(t, r), e._handler = t, e;
}, "httpActionGeneric");
async function Ae(t, e, r, o) {
  let s = O(r), a = {
    udfType: t,
    args: y(s),
    ...A(e)
  };
  o && (a.transactionLimits = o);
  let i = await u("1.0/runUdf", a);
  return h(i);
}
n(Ae, "runUdf");

// node_modules/convex/dist/esm/server/pagination.js
var Ds = c.object({
  numItems: c.number(),
  cursor: c.union(c.string(), c.null()),
  endCursor: c.optional(c.union(c.string(), c.null())),
  id: c.optional(c.number()),
  maximumRowsRead: c.optional(c.number()),
  maximumBytesRead: c.optional(c.number())
});

// node_modules/convex/dist/esm/server/api.js
function qt(t = []) {
  let e = {
    get(r, o) {
      if (typeof o == "string") {
        let s = [...t, o];
        return qt(s);
      } else if (o === z) {
        if (t.length < 2) {
          let i = ["api", ...t].join(".");
          throw new Error(
            `API path is expected to be of the form \`api.moduleName.functionName\`. Found: \`${i}\``
          );
        }
        let s = t.slice(0, -1).join("/"), a = t[t.length - 1];
        return a === "default" ? s : s + ":" + a;
      } else return o === Symbol.toStringTag ? "FunctionReference" : void 0;
    }
  };
  return new Proxy({}, e);
}
n(qt, "createApi");
var Xr = qt();

// node_modules/convex/dist/esm/server/logVars.js
var Kr = Symbol("var.requestId"), Zr = Symbol("var.ip"), en = Symbol("var.userAgent"), tn = Symbol("var.now"), rn = Symbol("var.convexActor"), nn = {
  [Kr]: "requestId",
  [Zr]: "ip",
  [en]: "userAgent",
  [tn]: "now",
  [rn]: "convexActor"
};

// node_modules/convex/dist/esm/server/schema.js
var on = Object.defineProperty, sn = /* @__PURE__ */ n((t, e, r) => e in t ? on(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, "__defNormalProp"), S = /* @__PURE__ */ n((t, e, r) => sn(t, typeof e != "symbol" ? e + "" : e, r), "__publicField"), Te = class {
  static {
    n(this, "TableDefinition");
  }
  /**
   * @internal
   */
  constructor(e) {
    S(this, "indexes"), S(this, "stagedDbIndexes"), S(this, "searchIndexes"), S(this, "stagedSearchIndexes"), S(this, "vectorIndexes"), S(this, "stagedVectorIndexes"), S(this, "validator"), S(this, "stagedValidator"), this.indexes = [], this.stagedDbIndexes = [], this.searchIndexes = [], this.stagedSearchIndexes = [], this.vectorIndexes = [], this.stagedVectorIndexes = [], this.validator = e;
  }
  /**
   * This API is experimental: it may change or disappear.
   *
   * Returns indexes defined on this table.
   * Intended for the advanced use cases of dynamically deciding which index to use for a query.
   * If you think you need this, please chime in on ths issue in the Convex JS GitHub repo.
   * https://github.com/get-convex/convex-js/issues/49
   */
  " indexes"() {
    return this.indexes;
  }
  index(e, r) {
    return Array.isArray(r) ? this.indexes.push({
      indexDescriptor: e,
      fields: r
    }) : r.staged ? this.stagedDbIndexes.push({
      indexDescriptor: e,
      fields: r.fields
    }) : this.indexes.push({
      indexDescriptor: e,
      fields: r.fields
    }), this;
  }
  searchIndex(e, r) {
    return r.staged ? this.stagedSearchIndexes.push({
      indexDescriptor: e,
      searchField: r.searchField,
      filterFields: r.filterFields || []
    }) : this.searchIndexes.push({
      indexDescriptor: e,
      searchField: r.searchField,
      filterFields: r.filterFields || []
    }), this;
  }
  vectorIndex(e, r) {
    return r.staged ? this.stagedVectorIndexes.push({
      indexDescriptor: e,
      vectorField: r.vectorField,
      dimensions: r.dimensions,
      filterFields: r.filterFields || []
    }) : this.vectorIndexes.push({
      indexDescriptor: e,
      vectorField: r.vectorField,
      dimensions: r.dimensions,
      filterFields: r.filterFields || []
    }), this;
  }
  /**
   * Stage a new document validator for this table.
   *
   * Convex validates the staged validator against the table's existing
   * documents in the background, while the validator passed to
   * {@link defineTable} remains the one enforced on reads and writes. Once
   * the background validation succeeds, make the staged validator the
   * table's validator and remove `.staged()`.
   *
   * ```ts
   * defineTable({
   *   author: v.string(),
   * }).staged({
   *   author: v.array(v.string()),
   * })
   * ```
   *
   * TODO: link a worked staged-schema example from the docs once one exists.
   *
   * @param documentSchema - The proposed next type of documents stored in
   * this table, as an object of field validators or a schema validator.
   * @returns A {@link TableDefinition} with the staged validator attached.
   *
   * @internal
   */
  staged(e) {
    if (this.stagedValidator !== void 0)
      throw new Error("Table cannot have more than one staged validator.");
    return this.stagedValidator = H(e) ? e : c.object(e), this.self();
  }
  /**
   * Work around for https://github.com/microsoft/TypeScript/issues/57035
   */
  self() {
    return this;
  }
  /**
   * Export the contents of this definition.
   *
   * This is called internally by the Convex framework.
   * @internal
   */
  export() {
    let e = this.validator.json;
    if (typeof e != "object")
      throw new Error(
        "Invalid validator: please make sure that the parameter of `defineTable` is valid (see https://docs.convex.dev/database/schemas)"
      );
    let r;
    if (this.stagedValidator !== void 0 && (r = this.stagedValidator.json, typeof r != "object"))
      throw new Error(
        "Invalid staged validator: please make sure that the parameter of `.staged()` is valid (see https://docs.convex.dev/database/schemas)"
      );
    return {
      indexes: this.indexes,
      stagedDbIndexes: this.stagedDbIndexes,
      searchIndexes: this.searchIndexes,
      stagedSearchIndexes: this.stagedSearchIndexes,
      vectorIndexes: this.vectorIndexes,
      stagedVectorIndexes: this.stagedVectorIndexes,
      documentType: e,
      stagedDocumentType: r
    };
  }
};
function Ze(t) {
  return H(t) ? new Te(t) : new Te(c.object(t));
}
n(Ze, "defineTable");
function Bt(t, e) {
  switch (e.kind) {
    case "object":
      return e.extend({
        _id: c.id(t),
        _creationTime: c.number()
      });
    case "union":
      return c.union(
        ...e.members.map(
          (r) => Bt(t, r)
        )
      );
    // `v.any()` already permits the system fields.
    case "any":
      return e;
    default:
      throw new Error(
        `Invalid validator for table "${t}": a table's documents must be objects, or a union of objects (see https://docs.convex.dev/database/schemas)`
      );
  }
}
n(Bt, "addSystemFields");
function Ut(t, e) {
  return Bt(t, e.validator);
}
n(Ut, "docValidator");
function Mt(t, e) {
  let r = t.tables[e];
  if (r === void 0)
    throw new Error(
      `Table "${e}" is not in this schema. Tables in this schema: ${Object.keys(
        t.tables
      ).join(", ")}`
    );
  return r;
}
n(Mt, "tableInSchema");
var et = class {
  static {
    n(this, "SchemaDefinition");
  }
  /**
   * @internal
   */
  constructor(e, r) {
    S(this, "tables"), S(this, "strictTableNameTypes"), S(this, "schemaValidation"), this.tables = e, this.schemaValidation = r?.schemaValidation === void 0 ? !0 : r.schemaValidation;
  }
  /**
   * The validator for whole documents of a table in this schema: the table's
   * own validator with the `_id` and `_creationTime` system fields added.
   *
   * @example
   * ```ts
   * export const get = query({
   *   args: { id: schema.id("messages") },
   *   returns: v.union(schema.doc("messages"), v.null()),
   *   handler: (ctx, args) => ctx.db.get(args.id),
   * });
   * ```
   *
   * @param tableName - The name of a table in this schema.
   * @returns A validator matching documents of that table.
   */
  doc(e) {
    return Ut(e, Mt(this, e));
  }
  /**
   * The validator for IDs of a table in this schema.
   *
   * Same as `v.id(tableName)`, but only accepts tables in this schema.
   *
   * @param tableName - The name of a table in this schema.
   * @returns A validator matching IDs of that table.
   */
  id(e) {
    return Mt(this, e), c.id(e);
  }
  /**
   * Export the contents of this definition.
   *
   * This is called internally by the Convex framework.
   * @internal
   */
  export() {
    return JSON.stringify({
      tables: Object.entries(this.tables).map(([e, r]) => {
        let {
          indexes: o,
          stagedDbIndexes: s,
          searchIndexes: a,
          stagedSearchIndexes: i,
          vectorIndexes: l,
          stagedVectorIndexes: p,
          documentType: x,
          stagedDocumentType: U
        } = r.export();
        return {
          tableName: e,
          indexes: o,
          stagedDbIndexes: s,
          searchIndexes: a,
          stagedSearchIndexes: i,
          vectorIndexes: l,
          stagedVectorIndexes: p,
          documentType: x,
          stagedDocumentType: U
        };
      }),
      schemaValidation: this.schemaValidation
    });
  }
};
function Vt(t, e) {
  return new et(t, e);
}
n(Vt, "defineSchema");
var Ai = Vt({
  _scheduled_functions: Ze({
    name: c.string(),
    args: c.array(c.any()),
    scheduledTime: c.float64(),
    completedTime: c.optional(c.float64()),
    state: c.union(
      c.object({ kind: c.literal("pending") }),
      c.object({ kind: c.literal("inProgress") }),
      c.object({ kind: c.literal("success") }),
      c.object({ kind: c.literal("failed"), error: c.string() }),
      c.object({ kind: c.literal("canceled") })
    )
  }),
  _storage: Ze({
    sha256: c.string(),
    size: c.float64(),
    contentType: c.optional(c.string())
  })
});

export {
  n as a,
  an as b,
  cn as c,
  un as d,
  c as e,
  he as f,
  kr as g,
  Lr as h,
  Qr as i,
  Hr as j,
  zr as k,
  Gr as l,
  yr as m
};
