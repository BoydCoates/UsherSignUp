import {
  a as o,
  b as Fc,
  c as Ui,
  d as Gc,
  e as m,
  f as Oi,
  h as Li,
  i as Di,
  j as Un,
  l as ot
} from "./KCTIKFDW.js";

// node_modules/cookie/dist/index.js
var Wi = Fc((ne) => {
  "use strict";
  Object.defineProperty(ne, "__esModule", { value: !0 });
  ne.parseCookie = $i;
  ne.parse = $i;
  ne.stringifyCookie = eu;
  ne.stringifySetCookie = jt;
  ne.serialize = jt;
  ne.parseSetCookie = tu;
  ne.stringifySetCookie = jt;
  ne.serialize = jt;
  var Ki = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/, Ni = /^[\u0021-\u003A\u003C-\u007E]*$/, qc = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, Xc = /^[\u0020-\u003A\u003D-\u007E]*$/, Zc = /^-?\d+$/, Yc = Object.prototype.toString, Qc = /* @__PURE__ */ (() => {
    let e = /* @__PURE__ */ o(function() {
    }, "C");
    return e.prototype = /* @__PURE__ */ Object.create(null), e;
  })();
  function $i(e, t) {
    let r = new Qc(), n = e.length;
    if (n < 2)
      return r;
    let i = t?.decode || Hi, s = 0;
    do {
      let a = Ln(e, s, n);
      if (a === -1)
        break;
      let c = On(e, s, n);
      if (a > c) {
        s = e.lastIndexOf(";", a - 1) + 1;
        continue;
      }
      let d = ge(e, s, a);
      r[d] === void 0 && (r[d] = i(ge(e, a + 1, c))), s = c + 1;
    } while (s < n);
    return r;
  }
  o($i, "parseCookie");
  function eu(e, t) {
    let r = t?.encode || encodeURIComponent, n = [];
    for (let i of Object.keys(e)) {
      let s = e[i];
      if (s === void 0)
        continue;
      if (!Ki.test(i))
        throw new TypeError(`cookie name is invalid: ${i}`);
      let a = r(s);
      if (!Ni.test(a))
        throw new TypeError(`cookie val is invalid: ${s}`);
      n.push(`${i}=${a}`);
    }
    return n.join("; ");
  }
  o(eu, "stringifyCookie");
  function jt(e, t, r) {
    let n = typeof e == "object" ? e : { ...r, name: e, value: String(t) }, s = (typeof t == "object" ? t : r)?.encode || encodeURIComponent;
    if (!Ki.test(n.name))
      throw new TypeError(`argument name is invalid: ${n.name}`);
    let a = n.value ? s(n.value) : "";
    if (!Ni.test(a))
      throw new TypeError(`argument val is invalid: ${n.value}`);
    let c = n.name + "=" + a;
    if (n.maxAge !== void 0) {
      if (!Number.isInteger(n.maxAge))
        throw new TypeError(`option maxAge is invalid: ${n.maxAge}`);
      c += "; Max-Age=" + n.maxAge;
    }
    if (n.domain) {
      if (!qc.test(n.domain))
        throw new TypeError(`option domain is invalid: ${n.domain}`);
      c += "; Domain=" + n.domain;
    }
    if (n.path) {
      if (!Xc.test(n.path))
        throw new TypeError(`option path is invalid: ${n.path}`);
      c += "; Path=" + n.path;
    }
    if (n.expires) {
      if (!ru(n.expires) || !Number.isFinite(n.expires.valueOf()))
        throw new TypeError(`option expires is invalid: ${n.expires}`);
      c += "; Expires=" + n.expires.toUTCString();
    }
    if (n.httpOnly && (c += "; HttpOnly"), n.secure && (c += "; Secure"), n.partitioned && (c += "; Partitioned"), n.priority)
      switch (typeof n.priority == "string" ? n.priority.toLowerCase() : void 0) {
        case "low":
          c += "; Priority=Low";
          break;
        case "medium":
          c += "; Priority=Medium";
          break;
        case "high":
          c += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${n.priority}`);
      }
    if (n.sameSite)
      switch (typeof n.sameSite == "string" ? n.sameSite.toLowerCase() : n.sameSite) {
        case !0:
        case "strict":
          c += "; SameSite=Strict";
          break;
        case "lax":
          c += "; SameSite=Lax";
          break;
        case "none":
          c += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${n.sameSite}`);
      }
    return c;
  }
  o(jt, "stringifySetCookie");
  function tu(e, t) {
    let r = t?.decode || Hi, n = e.length, i = On(e, 0, n), s = Ln(e, 0, i), a = s === -1 ? { name: "", value: r(ge(e, 0, i)) } : {
      name: ge(e, 0, s),
      value: r(ge(e, s + 1, i))
    }, c = i + 1;
    for (; c < n; ) {
      let d = On(e, c, n), u = Ln(e, c, d), f = u === -1 ? ge(e, c, d) : ge(e, c, u), l = u === -1 ? void 0 : ge(e, u + 1, d);
      switch (f.toLowerCase()) {
        case "httponly":
          a.httpOnly = !0;
          break;
        case "secure":
          a.secure = !0;
          break;
        case "partitioned":
          a.partitioned = !0;
          break;
        case "domain":
          a.domain = l;
          break;
        case "path":
          a.path = l;
          break;
        case "max-age":
          l && Zc.test(l) && (a.maxAge = Number(l));
          break;
        case "expires":
          if (!l)
            break;
          let y = new Date(l);
          Number.isFinite(y.valueOf()) && (a.expires = y);
          break;
        case "priority":
          if (!l)
            break;
          let p = l.toLowerCase();
          (p === "low" || p === "medium" || p === "high") && (a.priority = p);
          break;
        case "samesite":
          if (!l)
            break;
          let h = l.toLowerCase();
          (h === "lax" || h === "strict" || h === "none") && (a.sameSite = h);
          break;
      }
      c = d + 1;
    }
    return a;
  }
  o(tu, "parseSetCookie");
  function On(e, t, r) {
    let n = e.indexOf(";", t);
    return n === -1 ? r : n;
  }
  o(On, "endIndex");
  function Ln(e, t, r) {
    let n = e.indexOf("=", t);
    return n < r ? n : -1;
  }
  o(Ln, "eqIndex");
  function ge(e, t, r) {
    let n = t, i = r;
    do {
      let s = e.charCodeAt(n);
      if (s !== 32 && s !== 9)
        break;
    } while (++n < i);
    for (; i > n; ) {
      let s = e.charCodeAt(i - 1);
      if (s !== 32 && s !== 9)
        break;
      i--;
    }
    return e.slice(n, i);
  }
  o(ge, "valueSlice");
  function Hi(e) {
    if (e.indexOf("%") === -1)
      return e;
    try {
      return decodeURIComponent(e);
    } catch {
      return e;
    }
  }
  o(Hi, "decode");
  function ru(e) {
    return Yc.call(e) === "[object Date]";
  }
  o(ru, "isDate");
});

// node_modules/@convex-dev/auth/dist/server/implementation/index.js
var Pn = Gc(Wi(), 1);

// node_modules/@convex-dev/auth/dist/server/utils.js
function z(e) {
  let t = process.env[e];
  if (t === void 0)
    throw new Error(`Missing environment variable \`${e}\``);
  return t;
}
o(z, "requireEnv");
function Jt(e) {
  return /(localhost|127\.0\.0\.1):\d+/.test(e ?? "");
}
o(Jt, "isLocalHost");

// node_modules/@convex-dev/auth/dist/server/cookies.js
var oe = {
  httpOnly: !0,
  sameSite: "none",
  secure: !0,
  path: "/",
  partitioned: !0
}, nu = 900;
function ji(e, t) {
  return {
    name: Bi(e),
    value: t,
    options: { ...oe, maxAge: nu }
  };
}
o(ji, "redirectToParamCookie");
function Ji(e, t) {
  let r = Bi(e), n = t[r];
  if (n === void 0)
    return null;
  let i = {
    name: r,
    value: "",
    options: { ...oe, maxAge: 0 }
  };
  return { redirectTo: n, updatedCookie: i };
}
o(Ji, "useRedirectToParam");
function Bi(e) {
  return (Jt(process.env.CONVEX_SITE_URL) ? "" : "__Host-") + e + "RedirectTo";
}
o(Bi, "redirectToParamCookieName");

// node_modules/@auth/core/lib/utils/cookie.js
var je = function(e, t, r, n) {
  if (r === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? e !== t || !n : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return r === "m" ? n : r === "a" ? n.call(e) : n ? n.value : t.get(e);
}, ou, it, Mi, zi, iu, su;
it = /* @__PURE__ */ new WeakMap(), Mi = /* @__PURE__ */ new WeakMap(), zi = /* @__PURE__ */ new WeakMap(), ou = /* @__PURE__ */ new WeakSet(), iu = /* @__PURE__ */ o(function(t) {
  let r = Math.ceil(t.value.length / 3936);
  if (r === 1)
    return je(this, it, "f")[t.name] = t.value, [t];
  let n = [];
  for (let i = 0; i < r; i++) {
    let s = `${t.name}.${i}`, a = t.value.substr(i * 3936, 3936);
    n.push({ ...t, name: s, value: a }), je(this, it, "f")[s] = a;
  }
  return je(this, zi, "f").debug("CHUNKING_SESSION_COOKIE", {
    message: "Session cookie exceeds allowed 4096 bytes.",
    emptyCookieSize: 160,
    valueSize: t.value.length,
    chunks: n.map((i) => i.value.length + 160)
  }), n;
}, "_SessionStore_chunk"), su = /* @__PURE__ */ o(function() {
  let t = {};
  for (let r in je(this, it, "f"))
    delete je(this, it, "f")?.[r], t[r] = {
      name: r,
      value: "",
      options: { ...je(this, Mi, "f").options, maxAge: 0 }
    };
  return t;
}, "_SessionStore_clean");

// node_modules/@auth/core/errors.js
var I = class extends Error {
  static {
    o(this, "AuthError");
  }
  /** @internal */
  constructor(t, r) {
    t instanceof Error ? super(void 0, {
      cause: { err: t, ...t.cause, ...r }
    }) : typeof t == "string" ? (r instanceof Error && (r = { err: r, ...r.cause }), super(t, r)) : super(void 0, t), this.name = this.constructor.name, this.type = this.constructor.type ?? "AuthError", this.kind = this.constructor.kind ?? "error", Error.captureStackTrace?.(this, this.constructor);
    let n = `https://errors.authjs.dev#${this.type.toLowerCase()}`;
    this.message += `${this.message ? ". " : ""}Read more at ${n}`;
  }
}, ie = class extends I {
  static {
    o(this, "SignInError");
  }
};
ie.kind = "signIn";
var st = class extends I {
  static {
    o(this, "AdapterError");
  }
};
st.type = "AdapterError";
var at = class extends I {
  static {
    o(this, "AccessDenied");
  }
};
at.type = "AccessDenied";
var Bt = class extends I {
  static {
    o(this, "CallbackRouteError");
  }
};
Bt.type = "CallbackRouteError";
var Mt = class extends I {
  static {
    o(this, "ErrorPageLoop");
  }
};
Mt.type = "ErrorPageLoop";
var zt = class extends I {
  static {
    o(this, "EventError");
  }
};
zt.type = "EventError";
var Vt = class extends I {
  static {
    o(this, "InvalidCallbackUrl");
  }
};
Vt.type = "InvalidCallbackUrl";
var ct = class extends ie {
  static {
    o(this, "CredentialsSignin");
  }
  constructor() {
    super(...arguments), this.code = "credentials";
  }
};
ct.type = "CredentialsSignin";
var Ft = class extends I {
  static {
    o(this, "InvalidEndpoints");
  }
};
Ft.type = "InvalidEndpoints";
var be = class extends I {
  static {
    o(this, "InvalidCheck");
  }
};
be.type = "InvalidCheck";
var Gt = class extends I {
  static {
    o(this, "JWTSessionError");
  }
};
Gt.type = "JWTSessionError";
var ut = class extends I {
  static {
    o(this, "MissingAdapter");
  }
};
ut.type = "MissingAdapter";
var qt = class extends I {
  static {
    o(this, "MissingAdapterMethods");
  }
};
qt.type = "MissingAdapterMethods";
var Xt = class extends I {
  static {
    o(this, "MissingAuthorize");
  }
};
Xt.type = "MissingAuthorize";
var dt = class extends I {
  static {
    o(this, "MissingSecret");
  }
};
dt.type = "MissingSecret";
var Zt = class extends ie {
  static {
    o(this, "OAuthAccountNotLinked");
  }
};
Zt.type = "OAuthAccountNotLinked";
var Yt = class extends ie {
  static {
    o(this, "OAuthCallbackError");
  }
};
Yt.type = "OAuthCallbackError";
var Qt = class extends I {
  static {
    o(this, "OAuthProfileParseError");
  }
};
Qt.type = "OAuthProfileParseError";
var er = class extends I {
  static {
    o(this, "SessionTokenError");
  }
};
er.type = "SessionTokenError";
var Dn = class extends ie {
  static {
    o(this, "OAuthSignInError");
  }
};
Dn.type = "OAuthSignInError";
var Kn = class extends ie {
  static {
    o(this, "EmailSignInError");
  }
};
Kn.type = "EmailSignInError";
var tr = class extends I {
  static {
    o(this, "SignOutError");
  }
};
tr.type = "SignOutError";
var Je = class extends I {
  static {
    o(this, "UnknownAction");
  }
};
Je.type = "UnknownAction";
var rr = class extends I {
  static {
    o(this, "UnsupportedStrategy");
  }
};
rr.type = "UnsupportedStrategy";
var lt = class extends I {
  static {
    o(this, "InvalidProvider");
  }
};
lt.type = "InvalidProvider";
var nr = class extends I {
  static {
    o(this, "UntrustedHost");
  }
};
nr.type = "UntrustedHost";
var or = class extends I {
  static {
    o(this, "Verification");
  }
};
or.type = "Verification";
var ir = class extends ie {
  static {
    o(this, "MissingCSRF");
  }
};
ir.type = "MissingCSRF";
var sr = class extends I {
  static {
    o(this, "DuplicateConditionalUI");
  }
};
sr.type = "DuplicateConditionalUI";
var ar = class extends I {
  static {
    o(this, "MissingWebAuthnAutocomplete");
  }
};
ar.type = "MissingWebAuthnAutocomplete";
var cr = class extends I {
  static {
    o(this, "WebAuthnVerificationError");
  }
};
cr.type = "WebAuthnVerificationError";
var ur = class extends ie {
  static {
    o(this, "AccountNotLinked");
  }
};
ur.type = "AccountNotLinked";
var dr = class extends I {
  static {
    o(this, "ExperimentalFeatureNotEnabled");
  }
};
dr.type = "ExperimentalFeatureNotEnabled";

// node_modules/@panva/hkdf/dist/web/runtime/hkdf.js
var cu = /* @__PURE__ */ o(() => {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  throw new Error("unable to locate global object");
}, "getGlobal"), Fi = /* @__PURE__ */ o(async (e, t, r, n, i) => {
  let { crypto: { subtle: s } } = cu();
  return new Uint8Array(await s.deriveBits({
    name: "HKDF",
    hash: `SHA-${e.substr(3)}`,
    salt: r,
    info: n
  }, await s.importKey("raw", t, "HKDF", !1, ["deriveBits"]), i << 3));
}, "default");

// node_modules/@panva/hkdf/dist/web/index.js
function uu(e) {
  switch (e) {
    case "sha256":
    case "sha384":
    case "sha512":
    case "sha1":
      return e;
    default:
      throw new TypeError('unsupported "digest" value');
  }
}
o(uu, "normalizeDigest");
function Nn(e, t) {
  if (typeof e == "string")
    return new TextEncoder().encode(e);
  if (!(e instanceof Uint8Array))
    throw new TypeError(`"${t}"" must be an instance of Uint8Array or a string`);
  return e;
}
o(Nn, "normalizeUint8Array");
function du(e) {
  let t = Nn(e, "ikm");
  if (!t.byteLength)
    throw new TypeError('"ikm" must be at least one byte in length');
  return t;
}
o(du, "normalizeIkm");
function lu(e) {
  let t = Nn(e, "info");
  if (t.byteLength > 1024)
    throw TypeError('"info" must not contain more than 1024 bytes');
  return t;
}
o(lu, "normalizeInfo");
function fu(e, t) {
  if (typeof e != "number" || !Number.isInteger(e) || e < 1)
    throw new TypeError('"keylen" must be a positive integer');
  let r = parseInt(t.substr(3), 10) >> 3 || 20;
  if (e > 255 * r)
    throw new TypeError('"keylen" too large');
  return e;
}
o(fu, "normalizeKeylen");
async function Gi(e, t, r, n, i) {
  return Fi(uu(e), du(t), Nn(r, "salt"), lu(n), fu(i, e));
}
o(Gi, "hkdf");

// node_modules/jose/dist/webapi/lib/buffer_utils.js
var ft = new TextEncoder(), fr = new TextDecoder(), pr = new TextDecoder("utf-8", { fatal: !0 }), lr = 2 ** 32;
function Q(...e) {
  let t = e.reduce((i, { length: s }) => i + s, 0), r = new Uint8Array(t), n = 0;
  for (let i of e)
    r.set(i, n), n += i.length;
  return r;
}
o(Q, "concat");
function $n(e, t, r) {
  if (t < 0 || t >= lr)
    throw new RangeError(`value must be >= 0 and <= ${lr - 1}. Received ${t}`);
  e.set([t >>> 24, t >>> 16, t >>> 8, t & 255], r);
}
o($n, "writeUInt32BE");
function Hn(e) {
  let t = Math.floor(e / lr), r = e % lr, n = new Uint8Array(8);
  return $n(n, t, 0), $n(n, r, 4), n;
}
o(Hn, "uint64be");
function hr(e) {
  let t = new Uint8Array(4);
  return $n(t, e), t;
}
o(hr, "uint32be");
var pu = /[^\x00-\x7f]/;
function de(e) {
  if (typeof e == "string" && e.length >= 128) {
    if (pu.test(e))
      throw new TypeError("non-ASCII string encountered in encode()");
    return ft.encode(e);
  }
  let t = new Uint8Array(e.length);
  for (let r = 0; r < e.length; r++) {
    let n = e.charCodeAt(r);
    if (n > 127)
      throw new TypeError("non-ASCII string encountered in encode()");
    t[r] = n;
  }
  return t;
}
o(de, "encode");
function qi(e, t = !1) {
  if (Uint8Array.prototype.toBase64)
    return e.toBase64({ alphabet: t ? "base64url" : "base64", omitPadding: t });
  let r = 32768, n = [];
  for (let s = 0; s < e.length; s += r)
    n.push(String.fromCharCode.apply(null, e.subarray(s, s + r)));
  let i = btoa(n.join(""));
  return t ? i.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_") : i;
}
o(qi, "encodeBase64");
function Xi(e, t = !1) {
  if (Uint8Array.fromBase64)
    return Uint8Array.fromBase64(e, { alphabet: t ? "base64url" : "base64" });
  if (t) {
    if (e.includes("+") || e.includes("/"))
      throw new TypeError("Invalid base64url");
    e = e.replace(/-/g, "+").replace(/_/g, "/");
  }
  let r = atob(e), n = new Uint8Array(r.length);
  for (let i = 0; i < r.length; i++)
    n[i] = r.charCodeAt(i);
  return n;
}
o(Xi, "decodeBase64");
async function mr(e, t) {
  let r = `SHA-${e.slice(-3)}`;
  return new Uint8Array(await crypto.subtle.digest(r, t));
}
o(mr, "digest");

// node_modules/jose/dist/webapi/util/errors.js
var se = class extends Error {
  static {
    o(this, "JOSEError");
  }
  static code = "ERR_JOSE_GENERIC";
  code = "ERR_JOSE_GENERIC";
  constructor(t, r) {
    super(t, r), this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
  }
}, ee = class extends se {
  static {
    o(this, "JWTClaimValidationFailed");
  }
  static code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
  code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
  claim;
  reason;
  payload;
  constructor(t, r, n = "unspecified", i = "unspecified") {
    super(t, { cause: { claim: n, reason: i, payload: r } }), this.claim = n, this.reason = i, this.payload = r;
  }
}, pt = class extends se {
  static {
    o(this, "JWTExpired");
  }
  static code = "ERR_JWT_EXPIRED";
  code = "ERR_JWT_EXPIRED";
  claim;
  reason;
  payload;
  constructor(t, r, n = "unspecified", i = "unspecified") {
    super(t, { cause: { claim: n, reason: i, payload: r } }), this.claim = n, this.reason = i, this.payload = r;
  }
}, ht = class extends se {
  static {
    o(this, "JOSEAlgNotAllowed");
  }
  static code = "ERR_JOSE_ALG_NOT_ALLOWED";
  code = "ERR_JOSE_ALG_NOT_ALLOWED";
}, K = class extends se {
  static {
    o(this, "JOSENotSupported");
  }
  static code = "ERR_JOSE_NOT_SUPPORTED";
  code = "ERR_JOSE_NOT_SUPPORTED";
}, mt = class extends se {
  static {
    o(this, "JWEDecryptionFailed");
  }
  static code = "ERR_JWE_DECRYPTION_FAILED";
  code = "ERR_JWE_DECRYPTION_FAILED";
  constructor(t = "decryption operation failed", r) {
    super(t, r);
  }
}, _ = class extends se {
  static {
    o(this, "JWEInvalid");
  }
  static code = "ERR_JWE_INVALID";
  code = "ERR_JWE_INVALID";
};
var yr = class extends se {
  static {
    o(this, "JWTInvalid");
  }
  static code = "ERR_JWT_INVALID";
  code = "ERR_JWT_INVALID";
}, yt = class extends se {
  static {
    o(this, "JWKInvalid");
  }
  static code = "ERR_JWK_INVALID";
  code = "ERR_JWK_INVALID";
};

// node_modules/jose/dist/webapi/util/base64url.js
var wt = {};
Ui(wt, {
  decode: () => Be,
  encode: () => $
});
var hu = "The input to be decoded is not correctly encoded.";
function Be(e) {
  try {
    return Xi(typeof e == "string" ? e : fr.decode(e), !0);
  } catch (t) {
    throw new TypeError(hu, { cause: t });
  }
}
o(Be, "decode");
function $(e) {
  return qi(typeof e == "string" ? ft.encode(e) : e, !0);
}
o($, "encode");

// node_modules/jose/dist/webapi/lib/validate.js
function Re(e, t) {
  if (!(e instanceof Uint8Array))
    throw new TypeError(`${t} must be an instance of Uint8Array`);
}
o(Re, "assertUint8Array");
function V(e) {
  if (typeof e != "object" || e === null || Object.prototype.toString.call(e) !== "[object Object]")
    return !1;
  let t = Object.getPrototypeOf(e);
  return t === null || Object.getPrototypeOf(t) === null;
}
o(V, "isObject");
function wr(...e) {
  let t = /* @__PURE__ */ new Set();
  for (let r of e)
    if (r)
      for (let n of Object.keys(r)) {
        if (t.has(n))
          return !1;
        t.add(n);
      }
  return !0;
}
o(wr, "isDisjoint");
function gt(e, t) {
  if (e !== void 0)
    throw new TypeError(`${t} can only be called once`);
}
o(gt, "assertNotSet");
function te(e, t, r) {
  try {
    return Be(e);
  } catch {
    throw new r(`Failed to base64url decode the ${t}`);
  }
}
o(te, "decodeBase64url");
function Zi(e, t, r) {
  try {
    return de(e);
  } catch {
    throw new r(`The ${t} is not a valid base64url string`);
  }
}
o(Zi, "encodeBase64url");
function Yi(e, t, r) {
  let n;
  try {
    n = JSON.parse(pr.decode(Be(e)));
  } catch {
    throw new t(r);
  }
  if (!V(n))
    throw new t(r);
  return n;
}
o(Yi, "parseJoseHeader");
var gr = { __proto__: null };
function Wn(e, t) {
  if (t !== void 0 && (!Array.isArray(t) || t.some((r) => typeof r != "string")))
    throw new TypeError(`"${e}" option must be an array of strings`);
  return t === void 0 ? void 0 : new Set(t);
}
o(Wn, "validateAlgorithms");
function Qi(e, t) {
  let { crit: r } = t ?? {};
  if (Array.isArray(r) && new Set(r).size !== r.length)
    throw new e('"crit" (Critical) Header Parameter MUST NOT contain duplicate values');
}
o(Qi, "validateCritDuplicates");
function br(e, t, r, n, i) {
  if (i.crit !== void 0 && n?.crit === void 0)
    throw new e('"crit" (Critical) Header Parameter MUST be integrity protected');
  if (!n || n.crit === void 0)
    return [];
  if (!Array.isArray(n.crit) || n.crit.length === 0 || n.crit.some((a) => typeof a != "string" || a.length === 0))
    throw new e('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  let s = r === void 0 ? t : { __proto__: null, ...r, ...t };
  for (let a of n.crit) {
    if (!(a in s))
      throw new K(`Extension Header Parameter "${a}" is not recognized`);
    if (!Object.hasOwn(i, a) || i[a] === void 0)
      throw new e(`Extension Header Parameter "${a}" is missing`);
    if (s[a] && (!Object.hasOwn(n, a) || n[a] === void 0))
      throw new e(`Extension Header Parameter "${a}" MUST be integrity protected`);
  }
  return n.crit;
}
o(br, "validateCrit");
function _r(e, t) {
  let r, n;
  try {
    r = JSON.stringify(t), n = JSON.parse(r);
  } catch (i) {
    throw new e("JOSE Header is not valid JSON", { cause: i });
  }
  if (!V(n))
    throw new e("JOSE Header is not a JSON object");
  return [n, r];
}
o(_r, "serializeJoseHeader");

// node_modules/jose/dist/webapi/lib/key.js
var mu = /* @__PURE__ */ o((e) => e[Symbol.toStringTag], "tag"), yu = /* @__PURE__ */ o((e, t, r) => {
  let { alg: n } = e;
  if (t.use !== void 0) {
    let i = r === "sign" || r === "verify" ? "sig" : "enc";
    if (t.use !== i)
      throw new TypeError(`Invalid key for this operation, its "use" must be "${i}" when present`);
  }
  if (t.alg !== void 0 && t.alg !== n)
    throw new TypeError(`Invalid key for this operation, its "alg" must be "${n}" when present`);
  if (Array.isArray(t.key_ops)) {
    let i = r === "encrypt" || r === "decrypt" ? e.ops?.[r === "encrypt" ? 0 : 1] : r;
    if (i && !t.key_ops.includes(i))
      throw new TypeError(`Invalid key for this operation, its "key_ops" must include "${i}" when present`);
  }
}, "jwkMatchesOp");
async function Ce(e, t, r) {
  let { alg: n, secret: i } = e, s = r === "decrypt" || r === "sign";
  if (i && t instanceof Uint8Array)
    return t;
  let a, c;
  if (V(t)) {
    if (a = gu(t), typeof a.kty != "string")
      throw es(n, t, i);
    if (!(i ? a.kty === "oct" && typeof a.k == "string" : a.kty !== "oct" && (s ? a.kty === "AKP" && typeof a.priv == "string" || typeof a.d == "string" : a.d === void 0 && a.priv === void 0)))
      throw new TypeError(i ? 'JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present' : `JSON Web Key for this operation must be a ${s ? "private" : "public"} JWK`);
    if (yu(e, a, r), a.kty === "oct")
      return Be(a.k);
    if (!Object.isFrozen(t)) {
      let { key_ops: f } = t;
      Array.isArray(f) && Object.freeze(f), Object.freeze(t);
    }
  } else {
    if (!Bn(t))
      throw es(n, t, i);
    let f = i ? "secret" : s ? "private" : "public";
    if (t.type !== f && (i || ["secret", "public", "private"].includes(t.type)))
      throw new TypeError(`${mu(t)} instances must be of type "${f}" for the ${n} algorithm`);
    if (_e(t))
      return t;
    if (c = t, c.type === "secret")
      return c.export();
  }
  jn ||= /* @__PURE__ */ new WeakMap();
  let d = t, u = jn.get(d);
  if (u?.[n])
    return u[n];
  if (u || jn.set(d, u = {}), c && typeof c.toCryptoKey == "function") {
    let f = c.type === "public", l = wu[c.asymmetricKeyDetails?.namedCurve], y = e.resolve?.({ crv: l, asymmetricKeyType: c.asymmetricKeyType }) ?? e.subtle;
    return u[n] = c.toCryptoKey(y, f, e.usages[f ? 0 : 1]);
  }
  return a ??= c.export({ format: "jwk" }), a.alg = n, u[n] = await Vn(e, a);
}
o(Ce, "prepareKey");
var jn, wu = {
  __proto__: null,
  prime256v1: "P-256",
  secp384r1: "P-384",
  secp521r1: "P-521"
};
function vr(e) {
  if (!_e(e))
    throw new Error("CryptoKey instance expected");
}
o(vr, "assertCryptoKey");
var _e = /* @__PURE__ */ o((e) => {
  if (e?.[Symbol.toStringTag] === "CryptoKey")
    return !0;
  try {
    return e instanceof CryptoKey;
  } catch {
    return !1;
  }
}, "isCryptoKey"), Jn = /* @__PURE__ */ o((e) => e?.[Symbol.toStringTag] === "KeyObject", "isKeyObject"), Bn = /* @__PURE__ */ o((e) => _e(e) || Jn(e), "isKeyLike");
function ts(e, t, ...r) {
  if (r.length > 2) {
    let n = r.pop();
    e += `one of type ${r.join(", ")}, or ${n}.`;
  } else r.length === 2 ? e += `one of type ${r[0]} or ${r[1]}.` : e += `of type ${r[0]}.`;
  return t == null ? e += ` Received ${t}` : typeof t == "function" && t.name ? e += ` Received function ${t.name}` : typeof t == "object" && t != null && t.constructor?.name && (e += ` Received an instance of ${t.constructor.name}`), e;
}
o(ts, "message");
var le = /* @__PURE__ */ o((e, ...t) => ts("Key must be ", e, ...t), "invalidKeyInput");
function es(e, t, r) {
  let n = ["CryptoKey", "KeyObject", "JSON Web Key"];
  return r && n.push("Uint8Array"), new TypeError(ts(`Key for the ${e} algorithm must be `, t, ...n));
}
o(es, "invalidKeyType");
var xr = /* @__PURE__ */ o((e, t = "algorithm.name") => new TypeError(`CryptoKey does not support this operation, its ${t} must be ${e}`), "unusable");
function Mn(e, t) {
  if (t && !e.usages.includes(t))
    throw new TypeError(`CryptoKey does not support this operation, its usages must include ${t}.`);
}
o(Mn, "checkUsage");
function rs(e, t) {
  let { modulusLength: r } = t.algorithm;
  if (typeof r != "number" || r < 2048)
    throw new TypeError(`${e} requires key modulusLength to be 2048 bits or larger`);
}
o(rs, "checkModulusLength");
function zn(e, t, r) {
  let n = e.algorithm;
  if (n.name !== t.name)
    throw xr(t.name);
  if (t.hash && n.hash?.name !== t.hash)
    throw xr(t.hash, "algorithm.hash");
  if (t.namedCurve && n.namedCurve !== t.namedCurve)
    throw xr(t.namedCurve, "algorithm.namedCurve");
  if (t.length !== void 0 && n.length !== t.length)
    throw xr(t.length, "algorithm.length");
  Mn(e, r);
}
o(zn, "checkCryptoKey");
function Sr(e) {
  return { __proto__: null, ...e };
}
o(Sr, "snapshotJwk");
function gu(e) {
  let t = Sr(e);
  if (t.ext !== void 0 && typeof t.ext != "boolean")
    throw new TypeError('"ext" (Extractable) Parameter must be a boolean');
  if (t.key_ops !== void 0) {
    let r = t.key_ops, n = Array.isArray(r) ? [...r] : void 0;
    if (!n || n.some((i) => typeof i != "string") || new Set(n).size !== n.length)
      throw new TypeError('"key_ops" (Key Operations) Parameter must be an array of unique strings');
    t.key_ops = n;
  }
  return t;
}
o(gu, "normalizeJwk");
async function Vn(e, t, r) {
  if (!e.kty.includes(t.kty))
    throw new K('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
  let n = e.resolve?.({ kty: t.kty, crv: t.crv }) ?? e.subtle, i = !!(t.d || t.priv), s = { ...t, ext: r ?? t.ext };
  return s.kty !== "AKP" && delete s.alg, delete s.use, crypto.subtle.importKey("jwk", s, n, s.ext ?? !i, t.key_ops ?? e.usages[i ? 1 : 0]);
}
o(Vn, "jwkToKey");
async function Pe(e, t, r, n = !1) {
  return e instanceof Uint8Array && (e = await crypto.subtle.importKey("raw", e, t, n, [r])), zn(e, t, r), e;
}
o(Pe, "rawKey");

// node_modules/jose/dist/webapi/lib/content_encryption.js
var bt = /* @__PURE__ */ o((e) => crypto.getRandomValues(new Uint8Array(e.cekBits >> 3)), "generateCek");
function kr(e, t) {
  let r = e.byteLength << 3;
  if (r !== t)
    throw new _(`Invalid Content Encryption Key length. Expected ${t} bits, got ${r} bits`);
}
o(kr, "checkCekLength");
var bu = /* @__PURE__ */ o((e) => crypto.getRandomValues(new Uint8Array(e.ivBits >> 3)), "generateIv");
function ns(e, t) {
  if (t.length << 3 !== e.ivBits)
    throw new _("Invalid Initialization Vector length");
}
o(ns, "checkIvLength");
async function os(e, t, r) {
  if (!(t instanceof Uint8Array))
    throw new TypeError(le(t, "Uint8Array"));
  let n = e.cekBits >> 1, i = await crypto.subtle.importKey("raw", t.subarray(n >> 3), "AES-CBC", !1, [r]), s = await crypto.subtle.importKey("raw", t.subarray(0, n >> 3), {
    hash: `SHA-${n << 1}`,
    name: "HMAC"
  }, !1, ["sign"]);
  return [i, s, n];
}
o(os, "cbcKeySetup");
async function is(e, t, r) {
  return new Uint8Array((await crypto.subtle.sign("HMAC", e, t)).slice(0, r >> 3));
}
o(is, "cbcHmacTag");
async function _u(e, t, r, n, i) {
  let [s, a, c] = await os(e, r, "encrypt"), d = new Uint8Array(await crypto.subtle.encrypt({
    iv: n,
    name: "AES-CBC"
  }, s, t)), u = Q(i, n, d, Hn(i.length * 8)), f = await is(a, u, c);
  return { ciphertext: d, tag: f, iv: n };
}
o(_u, "cbcEncrypt");
async function xu(e, t) {
  let r = { name: "HMAC", hash: "SHA-256" }, n = await crypto.subtle.generateKey(r, !1, ["sign", "verify"]), i = await crypto.subtle.sign(r, n, e);
  return crypto.subtle.verify(r, n, i, t);
}
o(xu, "timingSafeEqual");
async function vu(e, t, r, n, i, s) {
  let [a, c, d] = await os(e, t, "decrypt"), u = Q(s, n, r, Hn(s.length * 8)), f = await is(c, u, d);
  try {
    if (await xu(i, f))
      return new Uint8Array(await crypto.subtle.decrypt({ iv: n, name: "AES-CBC" }, a, r));
  } catch {
  }
  throw new mt();
}
o(vu, "cbcDecrypt");
async function Er(e, t, r, n, i) {
  if (!_e(r) && !(r instanceof Uint8Array))
    throw new TypeError(le(r, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
  if (n ? ns(e, n) : n = bu(e), r instanceof Uint8Array && kr(r, e.cekBits), e.cbc)
    return _u(e, t, r, n, i);
  let s = await Pe(r, e.subtle, "encrypt"), a = new Uint8Array(await crypto.subtle.encrypt({
    additionalData: i,
    iv: n,
    name: "AES-GCM",
    tagLength: 128
  }, s, t));
  return { ciphertext: a.subarray(0, -16), tag: a.subarray(-16), iv: n };
}
o(Er, "encrypt");
async function Ar(e, t, r, n, i, s) {
  if (!_e(t) && !(t instanceof Uint8Array))
    throw new TypeError(le(t, "CryptoKey", "KeyObject", "Uint8Array", "JSON Web Key"));
  if (!n)
    throw new _("JWE Initialization Vector missing");
  if (!i)
    throw new _("JWE Authentication Tag missing");
  if (!e.cbc && i.length !== 16)
    throw new _("Invalid Authentication Tag length");
  if (ns(e, n), t instanceof Uint8Array && kr(t, e.cekBits), e.cbc)
    return vu(e, t, r, n, i, s);
  let a = await Pe(t, e.subtle, "decrypt");
  try {
    return new Uint8Array(await crypto.subtle.decrypt({
      additionalData: s,
      iv: n,
      name: "AES-GCM",
      tagLength: 128
    }, a, Q(r, i)));
  } catch {
    throw new mt();
  }
}
o(Ar, "decrypt");

// node_modules/jose/dist/webapi/lib/key_descriptor.js
function Fn(e) {
  let t = { __proto__: null };
  for (let r in e)
    t[r] = { ...e[r], alg: r };
  return t;
}
o(Fn, "table");

// node_modules/jose/dist/webapi/lib/jwe_algorithms.js
var Su = [
  ["encrypt", "wrapKey"],
  ["decrypt", "unwrapKey"]
], ku = [[], ["deriveBits"]], Rr = [[], []];
function Ir(e) {
  return {
    kty: ["RSA"],
    mode: "key-encryption",
    subtle: { name: "RSA-OAEP", hash: `SHA-${e}` },
    usages: Su,
    ops: ["wrapKey", "unwrapKey"]
  };
}
o(Ir, "rsaes");
function Tr(e) {
  return {
    kty: ["EC", "OKP"],
    mode: e,
    subtle: { name: "ECDH" },
    resolve: /* @__PURE__ */ o(({ kty: t, crv: r, asymmetricKeyType: n }) => {
      if (r === "X25519" || n === "x25519")
        return { name: "X25519" };
      if (t === "OKP")
        throw new K('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      return { name: "ECDH", namedCurve: r };
    }, "resolve"),
    usages: ku,
    ops: [void 0, "deriveBits"]
  };
}
o(Tr, "ecdh");
function Me(e, t = !1) {
  return {
    kty: ["oct"],
    mode: "key-wrapping",
    secret: !0,
    subtle: { name: t ? "AES-GCM" : "AES-KW", length: e },
    usages: Rr,
    ops: t ? ["encrypt", "decrypt"] : ["wrapKey", "unwrapKey"]
  };
}
o(Me, "aeskw");
function Gn() {
  return {
    kty: ["oct"],
    mode: "key-wrapping",
    secret: !0,
    subtle: { name: "PBKDF2" },
    usages: Rr,
    ops: ["deriveBits", "deriveBits"]
  };
}
o(Gn, "pbes2");
var _t = Fn({
  dir: {
    kty: ["oct"],
    mode: "direct-encryption",
    secret: !0,
    subtle: { name: "AES-GCM" },
    usages: Rr,
    ops: ["encrypt", "decrypt"]
  },
  "RSA-OAEP": Ir(1),
  "RSA-OAEP-256": Ir(256),
  "RSA-OAEP-384": Ir(384),
  "RSA-OAEP-512": Ir(512),
  "ECDH-ES": Tr("direct-key-agreement"),
  "ECDH-ES+A128KW": Tr("key-agreement-with-key-wrapping"),
  "ECDH-ES+A192KW": Tr("key-agreement-with-key-wrapping"),
  "ECDH-ES+A256KW": Tr("key-agreement-with-key-wrapping"),
  A128KW: Me(128),
  A192KW: Me(192),
  A256KW: Me(256),
  A128GCMKW: Me(128, !0),
  A192GCMKW: Me(192, !0),
  A256GCMKW: Me(256, !0),
  "PBES2-HS256+A128KW": Gn(),
  "PBES2-HS384+A192KW": Gn(),
  "PBES2-HS512+A256KW": Gn()
}), Eu = ["encrypt", "decrypt"];
function ze(e, t = !1) {
  return {
    kty: ["oct"],
    secret: !0,
    subtle: { name: t ? "AES-CBC" : "AES-GCM", length: e },
    usages: Rr,
    ops: Eu,
    cekBits: e,
    ivBits: t ? 128 : 96,
    cbc: t
  };
}
o(ze, "contentEncryption");
var Au = Fn({
  A128GCM: ze(128),
  A192GCM: ze(192),
  A256GCM: ze(256),
  "A128CBC-HS256": ze(256, !0),
  "A192CBC-HS384": ze(384, !0),
  "A256CBC-HS512": ze(512, !0)
});
function ss(e, t) {
  throw new K(`Invalid or unsupported "${e}" (JWE ${t}) header value`);
}
o(ss, "unsupported");
function fe(e) {
  return (typeof e == "string" ? _t[e] : void 0) ?? ss("alg", "Algorithm");
}
o(fe, "jweAlgorithm");
function Ue(e) {
  return e.mode === "key-wrapping" || e.mode === "key-encryption" || e.mode === "key-agreement-with-key-wrapping";
}
o(Ue, "isJWECEKTransport");
function Oe(e) {
  return (typeof e == "string" ? Au[e] : void 0) ?? ss("enc", "Encryption Algorithm");
}
o(Oe, "jweEncryption");

// node_modules/jose/dist/webapi/lib/key_management.js
function as(e, t) {
  if (e.algorithm.name !== "ECDH" && e.algorithm.name !== "X25519")
    throw new TypeError("CryptoKey does not support this operation, its algorithm.name must be ECDH or X25519");
  Mn(e, t);
}
o(as, "checkEcdhCryptoKey");
async function Iu(e, t, r) {
  let n = await Pe(t, fe(e).subtle, "wrapKey", !0), i = await crypto.subtle.importKey("raw", r, { hash: "SHA-256", name: "HMAC" }, !0, ["sign"]);
  return new Uint8Array(await crypto.subtle.wrapKey("raw", i, n, "AES-KW"));
}
o(Iu, "aeskwWrap");
async function Tu(e, t, r) {
  let n = await Pe(t, fe(e).subtle, "unwrapKey", !0), i = await crypto.subtle.unwrapKey("raw", r, n, "AES-KW", { hash: "SHA-256", name: "HMAC" }, !0, ["sign"]);
  return new Uint8Array(await crypto.subtle.exportKey("raw", i));
}
o(Tu, "aeskwUnwrap");
function us(e, t, r) {
  zn(t, fe(e).subtle, r), rs(e, t);
}
o(us, "checkRsaKey");
async function ds(e, t, r, n) {
  if (!(e instanceof Uint8Array) || e.length < 8)
    throw new _("PBES2 Salt Input must be 8 or more octets");
  if (!Number.isSafeInteger(r) || Math.sign(r) !== 1)
    throw new _("PBES2 Count Input must be a positive integer");
  let i = Q(de(t), Uint8Array.of(0), e), s = parseInt(t.slice(13, 16), 10), a = {
    hash: `SHA-${t.slice(8, 11)}`,
    iterations: r,
    name: "PBKDF2",
    salt: i
  }, c = await Pe(n, fe(t).subtle, "deriveBits");
  return new Uint8Array(await crypto.subtle.deriveBits(a, c, s));
}
o(ds, "deriveKey");
function qn(e) {
  return Q(hr(e.length), e);
}
o(qn, "lengthAndInput");
async function Ru(e, t, r) {
  let n = t >> 3, i = 32, s = Math.ceil(n / i), a = new Uint8Array(s * i);
  for (let c = 1; c <= s; c++) {
    let d = await mr("sha256", Q(hr(c), e, r));
    a.set(d, (c - 1) * i);
  }
  return a.slice(0, n);
}
o(Ru, "concatKdf");
async function ls(e, t, r, n, i = new Uint8Array(), s = new Uint8Array()) {
  as(e), as(t, "deriveBits");
  let a = Q(qn(de(r)), qn(i), qn(s), hr(n)), c = new Uint8Array(await crypto.subtle.deriveBits({
    name: e.algorithm.name,
    public: e
  }, t, e.algorithm.name === "X25519" ? 256 : Math.ceil(parseInt(e.algorithm.namedCurve.slice(-3), 10) / 8) << 3));
  return Ru(c, n, a);
}
o(ls, "ecdhesDeriveKey");
function fs(e) {
  vr(e);
  let t = e.algorithm.namedCurve;
  if (t !== "P-256" && t !== "P-384" && t !== "P-521" && e.algorithm.name !== "X25519")
    throw new K("ECDH with the provided key is not allowed or not supported by your javascript runtime");
}
o(fs, "assertEcdhKey");
function Cr(e, t) {
  let r = e[t];
  if (r !== void 0) {
    if (typeof r != "string")
      throw new _(`JOSE Header "${t}" (Agreement Party${t === "apu" ? "U" : "V"}Info) invalid`);
    return te(r, t, _);
  }
}
o(Cr, "partyInfo");
function ps(e, t) {
  if (!(e === void 0 || t === void 0 || e.byteLength !== t.byteLength)) {
    for (let r = 0; r < e.byteLength; r++)
      if (e[r] !== t[r])
        return;
    throw new _('JOSE Header "apu" and "apv" values must be distinct');
  }
}
o(ps, "checkPartyInfo");
function Cu(e) {
  if (e === void 0)
    throw new _("JWE Encrypted Key missing");
}
o(Cu, "assertEncryptedKey");
function cs(e) {
  if (e !== void 0)
    throw new _("Encountered unexpected JWE Encrypted Key");
}
o(cs, "assertNoEncryptedKey");
function Pu(e) {
  if (e !== void 0 && e !== 1 / 0 && (!Number.isSafeInteger(e) || e < 1))
    throw new TypeError("maxPBES2Count must be a positive safe integer or Infinity");
}
o(Pu, "validateMaxPBES2Count");
async function hs(e, t, r, n, i, s) {
  let { alg: a } = e, c = e.mode;
  if (c === "direct-encryption")
    return cs(n), r;
  let d = c === "direct-key-agreement";
  switch (d ? cs(n) : Cu(n), e.subtle.name) {
    case "ECDH": {
      let { epk: u } = i;
      if (!V(u) || ["d", "k", "p", "q", "dp", "dq", "qi", "oth", "priv"].some((h) => Object.hasOwn(u, h)))
        throw new _('JOSE Header "epk" (Ephemeral Public Key) missing or invalid');
      fs(r);
      let f = await Vn(e, u), l = Cr(i, "apu"), y = Cr(i, "apv");
      ps(l, y);
      let p = await ls(f, r, d ? t.alg : a, d ? t.cekBits : parseInt(a.slice(-5, -2), 10), l, y);
      if (d)
        return p;
      r = p;
      break;
    }
    case "RSA-OAEP":
      return vr(r), us(a, r, "decrypt"), new Uint8Array(await crypto.subtle.decrypt("RSA-OAEP", r, n));
    case "PBKDF2": {
      if (typeof i.p2c != "number")
        throw new _('JOSE Header "p2c" (PBES2 Count) missing or invalid');
      Pu(s);
      let u = s ?? 1e4;
      if (i.p2c > u)
        throw new _('JOSE Header "p2c" (PBES2 Count) out is of acceptable bounds');
      if (typeof i.p2s != "string")
        throw new _('JOSE Header "p2s" (PBES2 Salt) missing or invalid');
      let f = te(i.p2s, "p2s", _);
      r = await ds(f, a, i.p2c, r);
      break;
    }
    case "AES-GCM": {
      if (typeof i.iv != "string")
        throw new _('JOSE Header "iv" (Initialization Vector) missing or invalid');
      if (typeof i.tag != "string")
        throw new _('JOSE Header "tag" (Authentication Tag) missing or invalid');
      let u = te(i.iv, "iv", _), f = te(i.tag, "tag", _);
      if (u.byteLength !== 12)
        throw new _("Invalid Initialization Vector length");
      if (f.byteLength !== 16)
        throw new _("Invalid Authentication Tag length");
      return Ar(Oe(a.slice(0, -2)), r, n, u, f, new Uint8Array());
    }
  }
  return Tu(a.slice(-6), r, n);
}
o(hs, "decryptKeyManagement");
async function ms(e, t, r, n, i, s = {}) {
  let { alg: a, mode: c } = e, d = Ue(e);
  if (i !== void 0 && !d)
    throw new TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${a}`);
  let u = await Ce(c === "direct-encryption" ? t : e, r, "encrypt");
  if (c === "direct-encryption")
    return [u, void 0, void 0];
  let f = d ? i ?? bt(t) : void 0;
  f && kr(f, t.cekBits);
  let l, y;
  switch (e.subtle.name) {
    case "ECDH": {
      fs(u);
      let { apu: p, apv: h } = s;
      p !== void 0 && Re(p, '"apu"'), h !== void 0 && Re(h, '"apv"');
      let w = p ?? Cr(n, "apu"), v = h ?? Cr(n, "apv");
      ps(w, v);
      let x;
      s.epk !== void 0 ? x = await Ce(e, s.epk, "decrypt") : x = (await crypto.subtle.generateKey(u.algorithm, !0, ["deriveBits"])).privateKey;
      let b = crypto.subtle, S = x;
      if (!S.extractable) {
        if (typeof b.getPublicKey != "function")
          throw new TypeError('CryptoKey for "epk" must be extractable');
        S = await b.getPublicKey(x, []);
      }
      let { x: A, y: P, crv: O, kty: H } = await b.exportKey("jwk", S), D = c === "direct-key-agreement", j = await ls(u, x, D ? t.alg : a, D ? t.cekBits : parseInt(a.slice(-5, -2), 10), w, v), U = { x: A, crv: O, kty: H };
      if (H === "EC" && (U.y = P), y = { epk: U }, p !== void 0 && (y.apu = $(p)), h !== void 0 && (y.apv = $(h)), D)
        return [j, void 0, y];
      u = j;
      break;
    }
    case "RSA-OAEP": {
      vr(u), us(a, u, "encrypt"), l = new Uint8Array(await crypto.subtle.encrypt("RSA-OAEP", u, f));
      break;
    }
    case "PBKDF2": {
      let { p2c: p = 2048, p2s: h = crypto.getRandomValues(new Uint8Array(16)) } = s;
      u = await ds(h, a, p, u), y = { p2c: p, p2s: $(h) };
      break;
    }
    case "AES-GCM": {
      let p = s.iv === void 0 ? crypto.getRandomValues(new Uint8Array(12)) : s.iv;
      if (!(p instanceof Uint8Array))
        throw new TypeError('"iv" must be an instance of Uint8Array');
      let h = await Er(Oe(a.slice(0, -2)), f, u, p, new Uint8Array());
      l = h.ciphertext, y = { iv: $(h.iv), tag: $(h.tag) };
    }
  }
  if (l ??= await Iu(a.slice(-6), u, f), !(l instanceof Uint8Array) || !l.byteLength)
    throw new TypeError("JWE key management algorithm did not produce an Encrypted Key");
  return [f, l, y];
}
o(ms, "encryptKeyManagement");

// node_modules/jose/dist/webapi/lib/deflate.js
function Pr(e, t) {
  if (e.zip !== void 0 && e.zip !== "DEF")
    throw new K('Unsupported JWE "zip" (Compression Algorithm) Header Parameter value.');
  if (e.zip !== void 0 && !t?.zip)
    throw new _('JWE "zip" (Compression Algorithm) Header Parameter MUST be in a protected header.');
}
o(Pr, "validateZip");
function ys(e) {
  if (typeof globalThis[e] > "u")
    throw new K(`JWE "zip" (Compression Algorithm) Header Parameter requires the ${e} API.`);
}
o(ys, "supported");
async function ws(e, t, r = 1 / 0) {
  let n = e.writable.getWriter();
  n.write(t).catch(() => {
  }), n.close().catch(() => {
  });
  let i = [], s = 0, a = e.readable.getReader();
  for (; ; ) {
    let { value: c, done: d } = await a.read();
    if (d)
      break;
    if (i.push(c), s += c.byteLength, r !== 1 / 0 && s > r)
      throw new _("Decompressed plaintext exceeded the configured limit");
  }
  return Q(...i);
}
o(ws, "transform");
async function gs(e) {
  return ys("CompressionStream"), ws(new CompressionStream("deflate-raw"), e);
}
o(gs, "compress");
async function bs(e, t) {
  return ys("DecompressionStream"), ws(new DecompressionStream("deflate-raw"), e, t);
}
o(bs, "decompress");

// node_modules/jose/dist/webapi/lib/jwe_decrypt.js
function Uu(e) {
  let { protected: t, ciphertext: r, iv: n, tag: i, aad: s } = e, a;
  return t !== void 0 && (a = Yi(t, _, "JWE Protected Header is invalid")), [
    a,
    te(r, "ciphertext", _),
    n !== void 0 ? te(n, "iv", _) : void 0,
    i !== void 0 ? te(i, "tag", _) : void 0,
    Zi((t ?? "") + (s !== void 0 ? `.${s}` : ""), "aad", _)
  ];
}
o(Uu, "shareJWE");
function _s(e) {
  return [
    e && Wn("keyManagementAlgorithms", e.keyManagementAlgorithms),
    e && Wn("contentEncryptionAlgorithms", e.contentEncryptionAlgorithms),
    e?.crit,
    e?.maxPBES2Count,
    e?.maxDecompressedLength
  ];
}
o(_s, "prepareDecrypt");
async function Ou(e, t, r, n = Uu(e)) {
  let [i, s, a, c, d] = n, { header: u, unprotected: f, aad: l } = e, y;
  if (u !== void 0 || f !== void 0) {
    if (!wr(i, u, f))
      throw new _("JWE Protected, JWE Unprotected Header, and JWE Per-Recipient Unprotected Header Parameter names must be disjoint");
    y = { ...i, ...u, ...f };
  } else
    y = i ?? {};
  let [p, h, w, v, x] = t, { encrypted_key: b } = e;
  br(_, gr, w, i, y), Pr(y, i);
  let { alg: S, enc: A } = y;
  if (typeof S != "string" || !S)
    throw new _("missing JWE Algorithm (alg) in JWE Header");
  let P = _t[S];
  if (b === "" && (!P || !Ue(P)))
    throw new _("JWE Encrypted Key incorrect type");
  let O = P?.mode === "integrated-encryption";
  if (!O && (typeof A != "string" || !A))
    throw new _("missing JWE Encryption Algorithm (enc) in JWE Header");
  if (p && !p.has(S) || !p && S.startsWith("PBES2"))
    throw new ht('"alg" (Algorithm) Header Parameter value not allowed');
  let H;
  if (O) {
    if (A !== void 0)
      throw new _('JWE "enc" (Encryption Algorithm) Header Parameter must not be present for integrated encryption');
    if (a?.byteLength)
      throw new _("JWE Initialization Vector must be empty for integrated encryption");
    if (c?.byteLength)
      throw new _("JWE Authentication Tag must be empty for integrated encryption");
  } else {
    if (h && !h.has(A))
      throw new ht('"enc" (Encryption Algorithm) Header Parameter value not allowed');
    H = Oe(A);
  }
  let D;
  if (b !== void 0)
    try {
      D = te(b, "encrypted_key", _);
    } catch (J) {
      if (!P || !Ue(P))
        throw J;
      D = new Uint8Array();
    }
  let j = !1;
  typeof r == "function" && (r = await r(i, e), j = !0);
  let U = P ?? fe(S);
  Ue(U) && D === void 0 && (D = new Uint8Array());
  let Z = await Ce(U.mode === "direct-encryption" ? H : U, r, "decrypt"), M;
  if (U.mode === "integrated-encryption")
    M = await U.decrypt(Z, D, s, d, i, y);
  else {
    let J = H, re;
    try {
      re = await hs(U, J, Z, D, y, v), Ue(U) && re instanceof Uint8Array && re.byteLength << 3 !== J.cekBits && (re = bt(J));
    } catch (Wt) {
      if (Wt instanceof TypeError || Wt instanceof _ || Wt instanceof K)
        throw Wt;
      re = bt(J);
    }
    M = await Ar(J, re, s, a, c, d);
  }
  if (y.zip === "DEF") {
    let J = x ?? 25e4;
    if (J === 0)
      throw new K('JWE "zip" (Compression Algorithm) Header Parameter is not supported.');
    if (J !== 1 / 0 && (!Number.isSafeInteger(J) || J < 1))
      throw new TypeError("maxDecompressedLength must be 0, a positive safe integer, or Infinity");
    M = await bs(M, J).catch((re) => {
      throw re instanceof _ ? re : new _("Failed to decompress plaintext", { cause: re });
    });
  }
  return {
    plaintext: M,
    ...i && { protectedHeader: i },
    ...l !== void 0 && {
      additionalAuthenticatedData: te(l, "aad", _)
    },
    ...f && { sharedUnprotectedHeader: f },
    ...u && { unprotectedHeader: u },
    ...j && { key: Z }
  };
}
o(Ou, "decryptJWE");
async function xs(e, t, r) {
  if (e instanceof Uint8Array && (e = fr.decode(e)), typeof e != "string")
    throw new _("Compact JWE must be a string or Uint8Array");
  let { 0: n, 1: i, 2: s, 3: a, 4: c, length: d } = e.split(".");
  if (d !== 5)
    throw new _("Invalid Compact JWE");
  return Ou({
    ciphertext: a,
    iv: s || void 0,
    protected: n,
    tag: c || void 0,
    encrypted_key: i || void 0
  }, t, r);
}
o(xs, "decryptCompact");

// node_modules/jose/dist/webapi/lib/jwe_encrypt.js
function vs(e, t, r) {
  if (!wr(e, t, r))
    throw new _("JWE Protected, JWE Shared Unprotected and JWE Per-Recipient Header Parameter names must be disjoint");
}
o(vs, "checkDisjoint");
function Lu(e, t, r = !1) {
  if (!e[1] && !e[2] && !e[3])
    throw new _("either setProtectedHeader, setUnprotectedHeader, or sharedUnprotectedHeader must be called before #encrypt()");
  t !== void 0 && (e[8] = t?.crit);
  let [, n, i, s, a, c, d, u, f] = e;
  if (a !== void 0 && Re(a, "JWE Additional Authenticated Data"), c !== void 0 && Re(c, "JWE Content Encryption Key"), d !== void 0 && Re(d, "JWE Initialization Vector"), !r && n !== void 0 && (n = _r(_, n)[0], e[1] = n), i !== void 0 && (i = _r(_, i)[0], e[2] = i), !r && s !== void 0 && (s = _r(_, s)[0], e[3] = s), u !== void 0 && !V(u))
    throw new TypeError("JWE Key Management Parameters must be an object");
  vs(n, i, s);
  let l = {
    ...n,
    ...i,
    ...s
  };
  Qi(_, n), br(_, gr, f, n, l), Pr(l, n);
  let { alg: y, enc: p } = l;
  if (typeof y != "string" || !y)
    throw new _('JWE "alg" (Algorithm) Header Parameter missing or invalid');
  let h = _t[y];
  if (h?.mode === "integrated-encryption") {
    if (p !== void 0)
      throw new _('JWE "enc" (Encryption Algorithm) Header Parameter must not be present for integrated encryption');
    if (c !== void 0)
      throw new TypeError(`setContentEncryptionKey cannot be called with JWE "alg" (Algorithm) Header ${y}`);
    if (d !== void 0)
      throw new TypeError(`setInitializationVector cannot be called with JWE "alg" (Algorithm) Header ${y}`);
    return [l, void 0, h];
  }
  if (typeof p != "string" || !p)
    throw new _('JWE "enc" (Encryption Algorithm) Header Parameter missing or invalid');
  return [l, Oe(p), h];
}
o(Lu, "checkEncryptHeaders");
async function Du(e, t, r) {
  let [n, i, s] = t, [a, c, d, u, f, l, y, p, , h] = e, w = c, v = d, x = s ?? fe(n.alg), b, S, A;
  x.mode === "integrated-encryption" ? A = await Ce(x, r, "encrypt") : [A, b, S] = await ms(x, i, r, n, l, p), S && (h ? v = v ? { ...v, ...S } : S : w = w ? { ...w, ...S } : S, vs(w, v, u));
  let P = w ? $(JSON.stringify(w)) : "", O = f?.byteLength ? $(f) : void 0, H = de(O ? `${P}.${O}` : P), D = a;
  n.zip === "DEF" && (D = await gs(D).catch((J) => {
    throw new _("Failed to compress plaintext", { cause: J });
  }));
  let j, U, Z;
  x.mode === "integrated-encryption" ? [b, j] = await x.encrypt(A, D, H, w, n, p) : { ciphertext: j, tag: U, iv: Z } = await Er(i, D, A, y, H);
  let M = {
    ciphertext: $(j)
  };
  return Z && (M.iv = $(Z)), U && (M.tag = $(U)), b?.byteLength && (M.encrypted_key = $(b)), O && (M.aad = O), w && (M.protected = P), u && (M.unprotected = u), v && (M.header = v), M;
}
o(Du, "encryptJWE");
async function Ss(e, t, r) {
  return Du(e, Lu(e, r), t);
}
o(Ss, "createJWE");
function ks(e) {
  return [e.protected, e.encrypted_key, e.iv, e.ciphertext, e.tag].join(".");
}
o(ks, "compactJWE");

// node_modules/jose/dist/webapi/lib/jwt_claims_set.js
var xt = /* @__PURE__ */ o((e) => Math.floor(e.getTime() / 1e3), "epoch"), Ku = {
  s: 1,
  m: 60,
  h: 3600,
  d: 86400,
  w: 604800,
  y: 31557600
}, Nu = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i, Ve = "check_failed";
function Xn() {
  throw new TypeError("Invalid time period format");
}
o(Xn, "invalidDuration");
function Ur(e) {
  typeof e != "string" && Xn();
  let t = Nu.exec(e);
  (!t || t[4] && t[1]) && Xn();
  let r = parseFloat(t[2]), n = Math.round(r * Ku[t[3][0].toLowerCase()]);
  return Number.isFinite(n) || Xn(), t[1] === "-" || t[4] === "ago" ? -n : n;
}
o(Ur, "secs");
function Fe(e, t) {
  if (!Number.isFinite(t))
    throw new TypeError(`Invalid ${e} input`);
  return t;
}
o(Fe, "validateInput");
function Zn(e, t) {
  if (typeof t != "string")
    throw new TypeError(`"${e}" claim must be a string`);
}
o(Zn, "validateStringClaim");
function $u(e) {
  if (typeof e != "string" && (!Array.isArray(e) || Array.from(e).some((t) => typeof t != "string")))
    throw new TypeError('"aud" claim must be a string or an array of strings');
}
o($u, "validateAudienceClaim");
function Yn(e, t) {
  return typeof e == "number" ? Fe(t, e) : e instanceof Date ? Fe(t, xt(e)) : xt(/* @__PURE__ */ new Date()) + Ur(e);
}
o(Yn, "numericDate");
var Es = /* @__PURE__ */ o((e) => {
  let t = e.toLowerCase();
  return e.includes("/") ? t : `application/${t}`;
}, "normalizeTyp"), Hu = /* @__PURE__ */ o((e, t) => typeof e == "string" ? t.includes(e) : Array.isArray(e) ? t.some((r) => e.includes(r)) : !1, "checkAudiencePresence");
function Qn(e, t, r = !1) {
  let n = e[t];
  if (!(n === void 0 && !r)) {
    if (typeof n != "number")
      throw new ee(`"${t}" claim must be a number`, e, t, "invalid");
    return n;
  }
}
o(Qn, "validateNumericDate");
function eo(e, t) {
  throw new ee(`unexpected "${t}" claim value`, e, t, Ve);
}
o(eo, "unexpectedClaim");
function As(e, t, r = {}) {
  let n;
  try {
    n = JSON.parse(pr.decode(t));
  } catch {
  }
  if (!V(n))
    throw new yr("JWT Claims Set must be a top-level JSON object");
  let { typ: i } = r;
  if (i !== void 0 && (typeof e.typ != "string" || Es(e.typ) !== Es(i)))
    throw new ee('unexpected "typ" JWT header value', n, "typ", Ve);
  let { requiredClaims: s = [], issuer: a, subject: c, audience: d, maxTokenAge: u } = r, f = [...s];
  u !== void 0 && f.push("iat"), d !== void 0 && f.push("aud"), c !== void 0 && f.push("sub"), a !== void 0 && f.push("iss");
  for (let b of new Set(f.reverse()))
    if (!Object.hasOwn(n, b))
      throw new ee(`missing required "${b}" claim`, n, b, "missing");
  a !== void 0 && !(Array.isArray(a) ? a : [a]).includes(n.iss) && eo(n, "iss"), c !== void 0 && n.sub !== c && eo(n, "sub"), d !== void 0 && !Hu(n.aud, typeof d == "string" ? [d] : d) && eo(n, "aud");
  let { clockTolerance: l } = r, y = 0;
  if (typeof l == "string")
    y = Ur(l);
  else if (l !== void 0) {
    if (typeof l != "number")
      throw new TypeError("Invalid clockTolerance option type");
    y = l;
  }
  Fe("clockTolerance option", y);
  let { currentDate: p } = r, h = Fe("currentDate option", xt(p === void 0 ? /* @__PURE__ */ new Date() : p)), w = Qn(n, "iat", u !== void 0), v = Qn(n, "nbf");
  if (v !== void 0 && v > h + y)
    throw new ee('"nbf" claim timestamp check failed', n, "nbf", Ve);
  let x = Qn(n, "exp");
  if (x !== void 0 && x <= h - y)
    throw new pt('"exp" claim timestamp check failed', n, "exp", Ve);
  if (u !== void 0) {
    let b = h - w, S = Fe("maxTokenAge option", typeof u == "number" ? u : Ur(u));
    if (b - y > S)
      throw new pt('"iat" claim timestamp check failed (too far in the past)', n, "iat", Ve);
    if (b < -y)
      throw new ee('"iat" claim timestamp check failed (it should be in the past)', n, "iat", Ve);
  }
  return n;
}
o(As, "validateClaimsSet");
var Is;
function pe(e) {
  return Is.get(e);
}
o(pe, "producerPayload");
function Ts(e) {
  let t = pe(e);
  for (let r of ["iat", "nbf", "exp"]) {
    let n = t[r];
    if (typeof n == "number" && !Number.isFinite(n))
      throw new TypeError(`"${r}" claim must be a finite number`);
  }
  return ft.encode(JSON.stringify(t));
}
o(Ts, "jwtData");
function Lr(e, t) {
  return pe(e)[t];
}
o(Lr, "jwtClaim");
var Or = class {
  static {
    o(this, "JWTClaimsBuilder");
  }
  constructor(t = {}) {
    if (!V(t))
      throw new TypeError("JWT Claims Set MUST be an object");
    (Is ||= /* @__PURE__ */ new WeakMap()).set(this, structuredClone(t));
  }
  setIssuer(t) {
    return Zn("iss", t), pe(this).iss = t, this;
  }
  setSubject(t) {
    return Zn("sub", t), pe(this).sub = t, this;
  }
  setAudience(t) {
    return $u(t), pe(this).aud = t, this;
  }
  setJti(t) {
    return Zn("jti", t), pe(this).jti = t, this;
  }
  setNotBefore(t) {
    return pe(this).nbf = Yn(t, "setNotBefore"), this;
  }
  setExpirationTime(t) {
    return pe(this).exp = Yn(t, "setExpirationTime"), this;
  }
  setIssuedAt(t) {
    let r = pe(this);
    return t === void 0 ? r.iat = xt(/* @__PURE__ */ new Date()) : typeof t == "string" ? r.iat = Fe("setIssuedAt", xt(/* @__PURE__ */ new Date()) + Ur(t)) : r.iat = Yn(t, "setIssuedAt"), this;
  }
};

// node_modules/jose/dist/webapi/jwt/decrypt.js
async function to(e, t, r) {
  let { plaintext: n, ...i } = await xs(e, _s(r), t), { protectedHeader: s } = i, a = As(s, n, r);
  for (let c of ["iss", "sub", "aud"])
    if (s[c] !== void 0 && (c === "aud" ? JSON.stringify(s.aud) !== JSON.stringify(a.aud) : s[c] !== a[c]))
      throw new ee(`replicated "${c}" claim header parameter mismatch`, a, c, "mismatch");
  return { payload: a, ...i };
}
o(to, "jwtDecrypt");

// node_modules/jose/dist/webapi/jwt/encrypt.js
var Wu = Or, vt = class extends Wu {
  static {
    o(this, "EncryptJWT");
  }
  #e = [void 0];
  #t;
  #r;
  #n;
  setProtectedHeader(t) {
    return gt(this.#e[1], "setProtectedHeader"), this.#e[1] = t, this;
  }
  setKeyManagementParameters(t) {
    return gt(this.#e[7], "setKeyManagementParameters"), this.#e[7] = t, this;
  }
  setContentEncryptionKey(t) {
    return gt(this.#e[5], "setContentEncryptionKey"), this.#e[5] = t, this;
  }
  setInitializationVector(t) {
    return gt(this.#e[6], "setInitializationVector"), this.#e[6] = t, this;
  }
  replicateIssuerAsHeader() {
    return this.#t = !0, this;
  }
  replicateSubjectAsHeader() {
    return this.#r = !0, this;
  }
  replicateAudienceAsHeader() {
    return this.#n = !0, this;
  }
  async encrypt(t, r) {
    let n = Ts(this);
    this.#e[1] && (this.#t || this.#r || this.#n) && (this.#e[1] = {
      ...this.#e[1],
      iss: this.#t ? Lr(this, "iss") : void 0,
      sub: this.#r ? Lr(this, "sub") : void 0,
      aud: this.#n ? Lr(this, "aud") : void 0
    });
    let i = [...this.#e];
    return i[0] = n, ks(await Ss(i, t, r));
  }
};

// node_modules/jose/dist/webapi/key/export.js
async function Rs(e) {
  if (Jn(e))
    if (e.type === "secret")
      e = e.export();
    else
      return e.export({ format: "jwk" });
  if (e instanceof Uint8Array)
    return {
      kty: "oct",
      k: $(e)
    };
  if (!_e(e))
    throw new TypeError(le(e, "CryptoKey", "KeyObject", "Uint8Array"));
  if (!e.extractable)
    throw new TypeError("non-extractable CryptoKey cannot be exported as a JWK");
  let t = await crypto.subtle.exportKey("jwk", e);
  delete t.ext, delete t.key_ops, delete t.use, t.kty !== "AKP" && delete t.alg;
  for (let r of Object.keys(t))
    t[r] === void 0 && delete t[r];
  return t;
}
o(Rs, "exportJWK");

// node_modules/jose/dist/webapi/jwk/thumbprint.js
var he = /* @__PURE__ */ o((e, t) => {
  if (typeof e != "string" || !e)
    throw new yt(`${t} missing or invalid`);
}, "check");
async function Dr(e, t) {
  let r;
  if (V(e)) {
    if (r = Sr(e), typeof r.kty != "string")
      throw new TypeError(le(e, "CryptoKey", "KeyObject", "JSON Web Key"));
  } else if (Bn(e))
    r = Sr(await Rs(e));
  else
    throw new TypeError(le(e, "CryptoKey", "KeyObject", "JSON Web Key"));
  if (t ??= "sha256", t !== "sha256" && t !== "sha384" && t !== "sha512")
    throw new TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
  let n;
  switch (r.kty) {
    case "AKP":
      he(r.alg, '"alg" (Algorithm) Parameter'), he(r.pub, '"pub" (Public key) Parameter'), n = { alg: r.alg, kty: r.kty, pub: r.pub };
      break;
    case "EC":
      he(r.crv, '"crv" (Curve) Parameter'), he(r.x, '"x" (X Coordinate) Parameter'), he(r.y, '"y" (Y Coordinate) Parameter'), n = { crv: r.crv, kty: r.kty, x: r.x, y: r.y };
      break;
    case "OKP":
      he(r.crv, '"crv" (Subtype of Key Pair) Parameter'), he(r.x, '"x" (Public Key) Parameter'), n = { crv: r.crv, kty: r.kty, x: r.x };
      break;
    case "RSA":
      he(r.e, '"e" (Exponent) Parameter'), he(r.n, '"n" (Modulus) Parameter'), n = { e: r.e, kty: r.kty, n: r.n };
      break;
    case "oct":
      if (typeof r.k != "string")
        throw new yt('"k" (Key Value) Parameter missing or invalid');
      n = { k: r.k, kty: r.kty };
      break;
    default:
      throw new K('"kty" (Key Type) Parameter missing or unsupported');
  }
  let i = de(JSON.stringify(n));
  return $(await mr(t, i));
}
o(Dr, "calculateJwkThumbprint");

// node_modules/@auth/core/lib/vendored/cookie.js
var St = {};
Ui(St, {
  parse: () => Fu,
  serialize: () => Gu
});
var ju = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/, Ju = /^("?)[\u0021\u0023-\u002B\u002D-\u003A\u003C-\u005B\u005D-\u007E]*\1$/, Bu = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i, Mu = /^[\u0020-\u003A\u003D-\u007E]*$/, zu = Object.prototype.toString, Vu = /* @__PURE__ */ (() => {
  let e = /* @__PURE__ */ o(function() {
  }, "C");
  return e.prototype = /* @__PURE__ */ Object.create(null), e;
})();
function Fu(e, t) {
  let r = new Vu(), n = e.length;
  if (n < 2)
    return r;
  let i = t?.decode || qu, s = 0;
  do {
    let a = e.indexOf("=", s);
    if (a === -1)
      break;
    let c = e.indexOf(";", s), d = c === -1 ? n : c;
    if (a > d) {
      s = e.lastIndexOf(";", a - 1) + 1;
      continue;
    }
    let u = Cs(e, s, a), f = Ps(e, a, u), l = e.slice(u, f);
    if (r[l] === void 0) {
      let y = Cs(e, a + 1, d), p = Ps(e, d, y), h = i(e.slice(y, p));
      r[l] = h;
    }
    s = d + 1;
  } while (s < n);
  return r;
}
o(Fu, "parse");
function Cs(e, t, r) {
  do {
    let n = e.charCodeAt(t);
    if (n !== 32 && n !== 9)
      return t;
  } while (++t < r);
  return r;
}
o(Cs, "startIndex");
function Ps(e, t, r) {
  for (; t > r; ) {
    let n = e.charCodeAt(--t);
    if (n !== 32 && n !== 9)
      return t + 1;
  }
  return r;
}
o(Ps, "endIndex");
function Gu(e, t, r) {
  let n = r?.encode || encodeURIComponent;
  if (!ju.test(e))
    throw new TypeError(`argument name is invalid: ${e}`);
  let i = n(t);
  if (!Ju.test(i))
    throw new TypeError(`argument val is invalid: ${t}`);
  let s = e + "=" + i;
  if (!r)
    return s;
  if (r.maxAge !== void 0) {
    if (!Number.isInteger(r.maxAge))
      throw new TypeError(`option maxAge is invalid: ${r.maxAge}`);
    s += "; Max-Age=" + r.maxAge;
  }
  if (r.domain) {
    if (!Bu.test(r.domain))
      throw new TypeError(`option domain is invalid: ${r.domain}`);
    s += "; Domain=" + r.domain;
  }
  if (r.path) {
    if (!Mu.test(r.path))
      throw new TypeError(`option path is invalid: ${r.path}`);
    s += "; Path=" + r.path;
  }
  if (r.expires) {
    if (!Xu(r.expires) || !Number.isFinite(r.expires.valueOf()))
      throw new TypeError(`option expires is invalid: ${r.expires}`);
    s += "; Expires=" + r.expires.toUTCString();
  }
  if (r.httpOnly && (s += "; HttpOnly"), r.secure && (s += "; Secure"), r.partitioned && (s += "; Partitioned"), r.priority)
    switch (typeof r.priority == "string" ? r.priority.toLowerCase() : void 0) {
      case "low":
        s += "; Priority=Low";
        break;
      case "medium":
        s += "; Priority=Medium";
        break;
      case "high":
        s += "; Priority=High";
        break;
      default:
        throw new TypeError(`option priority is invalid: ${r.priority}`);
    }
  if (r.sameSite)
    switch (typeof r.sameSite == "string" ? r.sameSite.toLowerCase() : r.sameSite) {
      case !0:
      case "strict":
        s += "; SameSite=Strict";
        break;
      case "lax":
        s += "; SameSite=Lax";
        break;
      case "none":
        s += "; SameSite=None";
        break;
      default:
        throw new TypeError(`option sameSite is invalid: ${r.sameSite}`);
    }
  return s;
}
o(Gu, "serialize");
function qu(e) {
  if (e.indexOf("%") === -1)
    return e;
  try {
    return decodeURIComponent(e);
  } catch {
    return e;
  }
}
o(qu, "decode");
function Xu(e) {
  return zu.call(e) === "[object Date]";
}
o(Xu, "isDate");

// node_modules/@auth/core/jwt.js
var { parse: Vh } = St, Yu = 720 * 60 * 60, Qu = /* @__PURE__ */ o(() => Date.now() / 1e3 | 0, "now"), Us = "dir", ro = "A256CBC-HS512";
async function Kr(e) {
  let { token: t = {}, secret: r, maxAge: n = Yu, salt: i } = e, s = Array.isArray(r) ? r : [r], a = await Os(ro, s[0], i), c = await Dr({ kty: "oct", k: wt.encode(a) }, `sha${a.byteLength << 3}`);
  return await new vt(t).setProtectedHeader({ alg: Us, enc: ro, kid: c }).setIssuedAt().setExpirationTime(Qu() + n).setJti(crypto.randomUUID()).encrypt(a);
}
o(Kr, "encode");
async function Nr(e) {
  let { token: t, secret: r, salt: n } = e, i = Array.isArray(r) ? r : [r];
  if (!t)
    return null;
  let { payload: s } = await to(t, async ({ kid: a, enc: c }) => {
    for (let d of i) {
      let u = await Os(c, d, n);
      if (a === void 0)
        return u;
      let f = await Dr({ kty: "oct", k: wt.encode(u) }, `sha${u.byteLength << 3}`);
      if (a === f)
        return u;
    }
    throw new Error("no matching decryption secret");
  }, {
    clockTolerance: 15,
    keyManagementAlgorithms: [Us],
    contentEncryptionAlgorithms: [ro, "A256GCM"]
  });
  return s;
}
o(Nr, "decode");
async function Os(e, t, r) {
  let n;
  switch (e) {
    case "A256CBC-HS512":
      n = 64;
      break;
    case "A256GCM":
      n = 32;
      break;
    default:
      throw new Error("Unsupported JWT Content Encryption Algorithm");
  }
  return await Gi("sha256", t, r, `Auth.js Generated Encryption Key (${r})`, n);
}
o(Os, "getDerivedEncryptionKey");

// node_modules/@auth/core/lib/utils/logger.js
var no = "\x1B[31m", td = "\x1B[33m", rd = "\x1B[90m", kt = "\x1B[0m", nd = {
  error(e) {
    let t = e instanceof I ? e.type : e.name;
    if (console.error(`${no}[auth][error]${kt} ${t}: ${e.message}`), e.cause && typeof e.cause == "object" && "err" in e.cause && e.cause.err instanceof Error) {
      let { err: r, ...n } = e.cause;
      console.error(`${no}[auth][cause]${kt}:`, r.stack), n && console.error(`${no}[auth][details]${kt}:`, JSON.stringify(n, null, 2));
    } else e.stack && console.error(e.stack.replace(/.*/, "").substring(1));
  },
  warn(e) {
    console.warn(`${td}[auth][warn][${e}]${kt}`, "Read more: https://warnings.authjs.dev");
  },
  debug(e, t) {
    console.log(`${rd}[auth][debug]:${kt} ${e}`, JSON.stringify(t, null, 2));
  }
};
function Et(e) {
  let t = {
    ...nd
  };
  return e.debug || (t.debug = () => {
  }), e.logger?.error && (t.error = e.logger.error), e.logger?.warn && (t.warn = e.logger.warn), e.logger?.debug && (t.debug = e.logger.debug), e.logger ?? (e.logger = t), t;
}
o(Et, "setLogger");

// node_modules/@auth/core/lib/utils/web.js
var { parse: om, serialize: im } = St;

// node_modules/@auth/core/lib/symbols.js
var oo = Symbol("skip-csrf-check"), Ks = Symbol("return-type-raw"), xe = Symbol("custom-fetch"), id = Symbol("conform-internal");

// node_modules/preact/dist/preact.module.js
var js, L, Js, ad, Le, Ns, Bs, so, lo, ao, co, cd, uo = {}, Ms = [], ud = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, fo = Array.isArray;
function ve(e, t) {
  for (var r in t) e[r] = t[r];
  return e;
}
o(ve, "d");
function zs(e) {
  e && e.parentNode && e.parentNode.removeChild(e);
}
o(zs, "w");
function io(e, t, r, n, i) {
  var s = { type: e, props: t, key: r, ref: n, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: i ?? ++Js, __i: -1, __u: 0 };
  return i == null && L.vnode != null && L.vnode(s), s;
}
o(io, "g");
function De(e) {
  return e.children;
}
o(De, "b");
function Hr(e, t) {
  this.props = e, this.context = t;
}
o(Hr, "k");
function Ge(e, t) {
  if (t == null) return e.__ ? Ge(e.__, e.__i + 1) : null;
  for (var r; t < e.__k.length; t++) if ((r = e.__k[t]) != null && r.__e != null) return r.__e;
  return typeof e.type == "function" ? Ge(e) : null;
}
o(Ge, "x");
function Vs(e) {
  var t, r;
  if ((e = e.__) != null && e.__c != null) {
    for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++) if ((r = e.__k[t]) != null && r.__e != null) {
      e.__e = e.__c.base = r.__e;
      break;
    }
    return Vs(e);
  }
}
o(Vs, "C");
function $s(e) {
  (!e.__d && (e.__d = !0) && Le.push(e) && !Wr.__r++ || Ns !== L.debounceRendering) && ((Ns = L.debounceRendering) || Bs)(Wr);
}
o($s, "S");
function Wr() {
  var e, t, r, n, i, s, a, c;
  for (Le.sort(so); e = Le.shift(); ) e.__d && (t = Le.length, n = void 0, s = (i = (r = e).__v).__e, a = [], c = [], r.__P && ((n = ve({}, i)).__v = i.__v + 1, L.vnode && L.vnode(n), qs(r.__P, n, i, r.__n, r.__P.namespaceURI, 32 & i.__u ? [s] : null, a, s ?? Ge(i), !!(32 & i.__u), c), n.__v = i.__v, n.__.__k[n.__i] = n, fd(a, n, c), n.__e != s && Vs(n)), Le.length > t && Le.sort(so));
  Wr.__r = 0;
}
o(Wr, "M");
function Fs(e, t, r, n, i, s, a, c, d, u, f) {
  var l, y, p, h, w, v = n && n.__k || Ms, x = t.length;
  for (r.__d = d, dd(r, t, v), d = r.__d, l = 0; l < x; l++) (p = r.__k[l]) != null && (y = p.__i === -1 ? uo : v[p.__i] || uo, p.__i = l, qs(e, p, y, i, s, a, c, d, u, f), h = p.__e, p.ref && y.ref != p.ref && (y.ref && po(y.ref, null, p), f.push(p.ref, p.__c || h, p)), w == null && h != null && (w = h), 65536 & p.__u || y.__k === p.__k ? d = Gs(p, d, e) : typeof p.type == "function" && p.__d !== void 0 ? d = p.__d : h && (d = h.nextSibling), p.__d = void 0, p.__u &= -196609);
  r.__d = d, r.__e = w;
}
o(Fs, "P");
function dd(e, t, r) {
  var n, i, s, a, c, d = t.length, u = r.length, f = u, l = 0;
  for (e.__k = [], n = 0; n < d; n++) (i = t[n]) != null && typeof i != "boolean" && typeof i != "function" ? (a = n + l, (i = e.__k[n] = typeof i == "string" || typeof i == "number" || typeof i == "bigint" || i.constructor == String ? io(null, i, null, null, null) : fo(i) ? io(De, { children: i }, null, null, null) : i.constructor === void 0 && i.__b > 0 ? io(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v) : i).__ = e, i.__b = e.__b + 1, s = null, (c = i.__i = ld(i, r, a, f)) !== -1 && (f--, (s = r[c]) && (s.__u |= 131072)), s == null || s.__v === null ? (c == -1 && l--, typeof i.type != "function" && (i.__u |= 65536)) : c !== a && (c == a - 1 ? l-- : c == a + 1 ? l++ : (c > a ? l-- : l++, i.__u |= 65536))) : i = e.__k[n] = null;
  if (f) for (n = 0; n < u; n++) (s = r[n]) != null && (131072 & s.__u) == 0 && (s.__e == e.__d && (e.__d = Ge(s)), Xs(s, s));
}
o(dd, "$");
function Gs(e, t, r) {
  var n, i;
  if (typeof e.type == "function") {
    for (n = e.__k, i = 0; n && i < n.length; i++) n[i] && (n[i].__ = e, t = Gs(n[i], t, r));
    return t;
  }
  e.__e != t && (t && e.type && !r.contains(t) && (t = Ge(e)), r.insertBefore(e.__e, t || null), t = e.__e);
  do
    t = t && t.nextSibling;
  while (t != null && t.nodeType === 8);
  return t;
}
o(Gs, "I");
function ld(e, t, r, n) {
  var i = e.key, s = e.type, a = r - 1, c = r + 1, d = t[r];
  if (d === null || d && i == d.key && s === d.type && (131072 & d.__u) == 0) return r;
  if (n > (d != null && (131072 & d.__u) == 0 ? 1 : 0)) for (; a >= 0 || c < t.length; ) {
    if (a >= 0) {
      if ((d = t[a]) && (131072 & d.__u) == 0 && i == d.key && s === d.type) return a;
      a--;
    }
    if (c < t.length) {
      if ((d = t[c]) && (131072 & d.__u) == 0 && i == d.key && s === d.type) return c;
      c++;
    }
  }
  return -1;
}
o(ld, "L");
function Hs(e, t, r) {
  t[0] === "-" ? e.setProperty(t, r ?? "") : e[t] = r == null ? "" : typeof r != "number" || ud.test(t) ? r : r + "px";
}
o(Hs, "T");
function $r(e, t, r, n, i) {
  var s;
  e: if (t === "style") if (typeof r == "string") e.style.cssText = r;
  else {
    if (typeof n == "string" && (e.style.cssText = n = ""), n) for (t in n) r && t in r || Hs(e.style, t, "");
    if (r) for (t in r) n && r[t] === n[t] || Hs(e.style, t, r[t]);
  }
  else if (t[0] === "o" && t[1] === "n") s = t !== (t = t.replace(/(PointerCapture)$|Capture$/i, "$1")), t = t.toLowerCase() in e || t === "onFocusOut" || t === "onFocusIn" ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + s] = r, r ? n ? r.u = n.u : (r.u = lo, e.addEventListener(t, s ? co : ao, s)) : e.removeEventListener(t, s ? co : ao, s);
  else {
    if (i == "http://www.w3.org/2000/svg") t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (t != "width" && t != "height" && t != "href" && t != "list" && t != "form" && t != "tabIndex" && t != "download" && t != "rowSpan" && t != "colSpan" && t != "role" && t != "popover" && t in e) try {
      e[t] = r ?? "";
      break e;
    } catch {
    }
    typeof r == "function" || (r == null || r === !1 && t[4] !== "-" ? e.removeAttribute(t) : e.setAttribute(t, t == "popover" && r == 1 ? "" : r));
  }
}
o($r, "A");
function Ws(e) {
  return function(t) {
    if (this.l) {
      var r = this.l[t.type + e];
      if (t.t == null) t.t = lo++;
      else if (t.t < r.u) return;
      return r(L.event ? L.event(t) : t);
    }
  };
}
o(Ws, "F");
function qs(e, t, r, n, i, s, a, c, d, u) {
  var f, l, y, p, h, w, v, x, b, S, A, P, O, H, D, j, U = t.type;
  if (t.constructor !== void 0) return null;
  128 & r.__u && (d = !!(32 & r.__u), s = [c = t.__e = r.__e]), (f = L.__b) && f(t);
  e: if (typeof U == "function") try {
    if (x = t.props, b = "prototype" in U && U.prototype.render, S = (f = U.contextType) && n[f.__c], A = f ? S ? S.props.value : f.__ : n, r.__c ? v = (l = t.__c = r.__c).__ = l.__E : (b ? t.__c = l = new U(x, A) : (t.__c = l = new Hr(x, A), l.constructor = U, l.render = hd), S && S.sub(l), l.props = x, l.state || (l.state = {}), l.context = A, l.__n = n, y = l.__d = !0, l.__h = [], l._sb = []), b && l.__s == null && (l.__s = l.state), b && U.getDerivedStateFromProps != null && (l.__s == l.state && (l.__s = ve({}, l.__s)), ve(l.__s, U.getDerivedStateFromProps(x, l.__s))), p = l.props, h = l.state, l.__v = t, y) b && U.getDerivedStateFromProps == null && l.componentWillMount != null && l.componentWillMount(), b && l.componentDidMount != null && l.__h.push(l.componentDidMount);
    else {
      if (b && U.getDerivedStateFromProps == null && x !== p && l.componentWillReceiveProps != null && l.componentWillReceiveProps(x, A), !l.__e && (l.shouldComponentUpdate != null && l.shouldComponentUpdate(x, l.__s, A) === !1 || t.__v === r.__v)) {
        for (t.__v !== r.__v && (l.props = x, l.state = l.__s, l.__d = !1), t.__e = r.__e, t.__k = r.__k, t.__k.some(function(Z) {
          Z && (Z.__ = t);
        }), P = 0; P < l._sb.length; P++) l.__h.push(l._sb[P]);
        l._sb = [], l.__h.length && a.push(l);
        break e;
      }
      l.componentWillUpdate != null && l.componentWillUpdate(x, l.__s, A), b && l.componentDidUpdate != null && l.__h.push(function() {
        l.componentDidUpdate(p, h, w);
      });
    }
    if (l.context = A, l.props = x, l.__P = e, l.__e = !1, O = L.__r, H = 0, b) {
      for (l.state = l.__s, l.__d = !1, O && O(t), f = l.render(l.props, l.state, l.context), D = 0; D < l._sb.length; D++) l.__h.push(l._sb[D]);
      l._sb = [];
    } else do
      l.__d = !1, O && O(t), f = l.render(l.props, l.state, l.context), l.state = l.__s;
    while (l.__d && ++H < 25);
    l.state = l.__s, l.getChildContext != null && (n = ve(ve({}, n), l.getChildContext())), b && !y && l.getSnapshotBeforeUpdate != null && (w = l.getSnapshotBeforeUpdate(p, h)), Fs(e, fo(j = f != null && f.type === De && f.key == null ? f.props.children : f) ? j : [j], t, r, n, i, s, a, c, d, u), l.base = t.__e, t.__u &= -161, l.__h.length && a.push(l), v && (l.__E = l.__ = null);
  } catch (Z) {
    if (t.__v = null, d || s != null) {
      for (t.__u |= d ? 160 : 128; c && c.nodeType === 8 && c.nextSibling; ) c = c.nextSibling;
      s[s.indexOf(c)] = null, t.__e = c;
    } else t.__e = r.__e, t.__k = r.__k;
    L.__e(Z, t, r);
  }
  else s == null && t.__v === r.__v ? (t.__k = r.__k, t.__e = r.__e) : t.__e = pd(r.__e, t, r, n, i, s, a, d, u);
  (f = L.diffed) && f(t);
}
o(qs, "O");
function fd(e, t, r) {
  t.__d = void 0;
  for (var n = 0; n < r.length; n++) po(r[n], r[++n], r[++n]);
  L.__c && L.__c(t, e), e.some(function(i) {
    try {
      e = i.__h, i.__h = [], e.some(function(s) {
        s.call(i);
      });
    } catch (s) {
      L.__e(s, i.__v);
    }
  });
}
o(fd, "j");
function pd(e, t, r, n, i, s, a, c, d) {
  var u, f, l, y, p, h, w, v = r.props, x = t.props, b = t.type;
  if (b === "svg" ? i = "http://www.w3.org/2000/svg" : b === "math" ? i = "http://www.w3.org/1998/Math/MathML" : i || (i = "http://www.w3.org/1999/xhtml"), s != null) {
    for (u = 0; u < s.length; u++) if ((p = s[u]) && "setAttribute" in p == !!b && (b ? p.localName === b : p.nodeType === 3)) {
      e = p, s[u] = null;
      break;
    }
  }
  if (e == null) {
    if (b === null) return document.createTextNode(x);
    e = document.createElementNS(i, b, x.is && x), c && (L.__m && L.__m(t, s), c = !1), s = null;
  }
  if (b === null) v === x || c && e.data === x || (e.data = x);
  else {
    if (s = s && js.call(e.childNodes), v = r.props || uo, !c && s != null) for (v = {}, u = 0; u < e.attributes.length; u++) v[(p = e.attributes[u]).name] = p.value;
    for (u in v) if (p = v[u], u != "children") {
      if (u == "dangerouslySetInnerHTML") l = p;
      else if (!(u in x)) {
        if (u == "value" && "defaultValue" in x || u == "checked" && "defaultChecked" in x) continue;
        $r(e, u, null, p, i);
      }
    }
    for (u in x) p = x[u], u == "children" ? y = p : u == "dangerouslySetInnerHTML" ? f = p : u == "value" ? h = p : u == "checked" ? w = p : c && typeof p != "function" || v[u] === p || $r(e, u, p, v[u], i);
    if (f) c || l && (f.__html === l.__html || f.__html === e.innerHTML) || (e.innerHTML = f.__html), t.__k = [];
    else if (l && (e.innerHTML = ""), Fs(e, fo(y) ? y : [y], t, r, n, b === "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, s, a, s ? s[0] : r.__k && Ge(r, 0), c, d), s != null) for (u = s.length; u--; ) zs(s[u]);
    c || (u = "value", b === "progress" && h == null ? e.removeAttribute("value") : h !== void 0 && (h !== e[u] || b === "progress" && !h || b === "option" && h !== v[u]) && $r(e, u, h, v[u], i), u = "checked", w !== void 0 && w !== e[u] && $r(e, u, w, v[u], i));
  }
  return e;
}
o(pd, "z");
function po(e, t, r) {
  try {
    if (typeof e == "function") {
      var n = typeof e.__u == "function";
      n && e.__u(), n && t == null || (e.__u = e(t));
    } else e.current = t;
  } catch (i) {
    L.__e(i, r);
  }
}
o(po, "N");
function Xs(e, t, r) {
  var n, i;
  if (L.unmount && L.unmount(e), (n = e.ref) && (n.current && n.current !== e.__e || po(n, null, t)), (n = e.__c) != null) {
    if (n.componentWillUnmount) try {
      n.componentWillUnmount();
    } catch (s) {
      L.__e(s, t);
    }
    n.base = n.__P = null;
  }
  if (n = e.__k) for (i = 0; i < n.length; i++) n[i] && Xs(n[i], t, r || typeof e.type != "function");
  r || zs(e.__e), e.__c = e.__ = e.__e = e.__d = void 0;
}
o(Xs, "V");
function hd(e, t, r) {
  return this.constructor(e, r);
}
o(hd, "q");
js = Ms.slice, L = { __e: /* @__PURE__ */ o(function(e, t, r, n) {
  for (var i, s, a; t = t.__; ) if ((i = t.__c) && !i.__) try {
    if ((s = i.constructor) && s.getDerivedStateFromError != null && (i.setState(s.getDerivedStateFromError(e)), a = i.__d), i.componentDidCatch != null && (i.componentDidCatch(e, n || {}), a = i.__d), a) return i.__E = i;
  } catch (c) {
    e = c;
  }
  throw e;
}, "__e") }, Js = 0, ad = /* @__PURE__ */ o(function(e) {
  return e != null && e.constructor == null;
}, "t"), Hr.prototype.setState = function(e, t) {
  var r;
  r = this.__s != null && this.__s !== this.state ? this.__s : this.__s = ve({}, this.state), typeof e == "function" && (e = e(ve({}, r), this.props)), e && ve(r, e), e != null && this.__v && (t && this._sb.push(t), $s(this));
}, Hr.prototype.forceUpdate = function(e) {
  this.__v && (this.__e = !0, e && this.__h.push(e), $s(this));
}, Hr.prototype.render = De, Le = [], Bs = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, so = /* @__PURE__ */ o(function(e, t) {
  return e.__v.__b - t.__v.__b;
}, "f"), Wr.__r = 0, lo = 0, ao = Ws(!1), co = Ws(!0), cd = 0;

// node_modules/oauth4webapi/build/index.js
var ho;
(typeof navigator > "u" || !navigator.userAgent?.startsWith?.("Mozilla/5.0 ")) && (ho = "oauth4webapi/v3.8.8");
function Xe(e, t) {
  if (e == null)
    return !1;
  try {
    return e instanceof t || Object.getPrototypeOf(e)[Symbol.toStringTag] === t.prototype[Symbol.toStringTag];
  } catch {
    return !1;
  }
}
o(Xe, "looseInstanceOf");
var q = "ERR_INVALID_ARG_VALUE", F = "ERR_INVALID_ARG_TYPE";
function R(e, t, r) {
  let n = new TypeError(e, { cause: r });
  return Object.assign(n, { code: t }), n;
}
o(R, "CodedTypeError");
var me = Symbol(), ea = Symbol(), yd = Symbol(), Se = Symbol(), Vr = Symbol(), mo = Symbol(), ky = Symbol(), wd = new TextEncoder(), gd = new TextDecoder();
function ae(e) {
  return typeof e == "string" ? wd.encode(e) : gd.decode(e);
}
o(ae, "buf");
var yo;
Uint8Array.prototype.toBase64 ? yo = /* @__PURE__ */ o((e) => (e instanceof ArrayBuffer && (e = new Uint8Array(e)), e.toBase64({ alphabet: "base64url", omitPadding: !0 })), "encodeBase64Url") : yo = /* @__PURE__ */ o((t) => {
  t instanceof ArrayBuffer && (t = new Uint8Array(t));
  let r = [];
  for (let n = 0; n < t.byteLength; n += 32768)
    r.push(String.fromCharCode.apply(null, t.subarray(n, n + 32768)));
  return btoa(r.join("")).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}, "encodeBase64Url");
var wo;
Uint8Array.fromBase64 ? wo = /* @__PURE__ */ o((e) => {
  try {
    return Uint8Array.fromBase64(e, { alphabet: "base64url" });
  } catch (t) {
    throw R("The input to be decoded is not correctly encoded.", q, t);
  }
}, "decodeBase64Url") : wo = /* @__PURE__ */ o((e) => {
  try {
    let t = atob(e.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "")), r = new Uint8Array(t.length);
    for (let n = 0; n < t.length; n++)
      r[n] = t.charCodeAt(n);
    return r;
  } catch (t) {
    throw R("The input to be decoded is not correctly encoded.", q, t);
  }
}, "decodeBase64Url");
function ce(e) {
  return typeof e == "string" ? wo(e) : yo(e);
}
o(ce, "b64u");
var G = class extends Error {
  static {
    o(this, "UnsupportedOperationError");
  }
  code;
  constructor(t, r) {
    super(t, r), this.name = this.constructor.name, this.code = al, Error.captureStackTrace?.(this, this.constructor);
  }
}, go = class extends Error {
  static {
    o(this, "OperationProcessingError");
  }
  code;
  constructor(t, r) {
    super(t, r), this.name = this.constructor.name, r?.code && (this.code = r?.code), Error.captureStackTrace?.(this, this.constructor);
  }
};
function k(e, t, r) {
  return new go(e, { code: t, cause: r });
}
o(k, "OPE");
function bd(e, t) {
  if (!(e instanceof CryptoKey))
    throw R(`${t} must be a CryptoKey`, F);
}
o(bd, "assertCryptoKey");
function _d(e, t) {
  if (bd(e, t), e.type !== "private")
    throw R(`${t} must be a private CryptoKey`, q);
}
o(_d, "assertPrivateKey");
function jr(e) {
  return !(e === null || typeof e != "object" || Array.isArray(e));
}
o(jr, "isJsonObject");
function Fr(e) {
  Xe(e, Headers) && (e = Object.fromEntries(e.entries()));
  let t = new Headers(e ?? {});
  if (ho && !t.has("user-agent") && t.set("user-agent", ho), t.has("authorization"))
    throw R('"options.headers" must not include the "authorization" header name', q);
  return t;
}
o(Fr, "prepareHeaders");
function So(e, t) {
  if (t !== void 0) {
    if (typeof t == "function" && (t = t(e.href)), !(t instanceof AbortSignal))
      throw R('"options.signal" must return or be an instance of AbortSignal', F);
    return t;
  }
}
o(So, "signal");
function ta(e) {
  return e.includes("//") ? e.replace("//", "/") : e;
}
o(ta, "replaceDoubleSlash");
function xd(e, t, r = !1) {
  return e.pathname === "/" ? e.pathname = t : e.pathname = ta(`${t}/${r ? e.pathname : e.pathname.replace(/(\/)$/, "")}`), e;
}
o(xd, "prependWellKnown");
function vd(e, t) {
  return e.pathname = ta(`${e.pathname}/${t}`), e;
}
o(vd, "appendWellKnown");
async function Sd(e, t, r, n) {
  if (!(e instanceof URL))
    throw R(`"${t}" must be an instance of URL`, F);
  Ao(e, n?.[me] !== !0);
  let i = r(new URL(e.href)), s = Fr(n?.headers);
  return s.set("accept", "application/json"), (n?.[Se] || fetch)(i.href, {
    body: void 0,
    headers: Object.fromEntries(s.entries()),
    method: "GET",
    redirect: "manual",
    signal: So(i, n?.signal)
  });
}
o(Sd, "performDiscovery");
async function ra(e, t) {
  return Sd(e, "issuerIdentifier", (r) => {
    switch (t?.algorithm) {
      case void 0:
      case "oidc":
        vd(r, ".well-known/openid-configuration");
        break;
      case "oauth2":
        xd(r, ".well-known/oauth-authorization-server");
        break;
      default:
        throw R('"options.algorithm" must be "oidc" (default), or "oauth2"', q);
    }
    return r;
  }, t);
}
o(ra, "discoveryRequest");
function Jr(e, t, r, n, i) {
  try {
    if (typeof e != "number" || !Number.isFinite(e))
      throw R(`${r} must be a number`, F, i);
    if (e > 0)
      return;
    if (t) {
      if (e !== 0)
        throw R(`${r} must be a non-negative number`, q, i);
      return;
    }
    throw R(`${r} must be a positive number`, q, i);
  } catch (s) {
    throw n ? k(s.message, n, i) : s;
  }
}
o(Jr, "assertNumber");
function N(e, t, r, n) {
  try {
    if (typeof e != "string")
      throw R(`${t} must be a string`, F, n);
    if (e.length === 0)
      throw R(`${t} must not be empty`, q, n);
  } catch (i) {
    throw r ? k(i.message, r, n) : i;
  }
}
o(N, "assertString");
async function na(e, t) {
  let r = e;
  if (!(r instanceof URL) && r !== Qs)
    throw R('"expectedIssuerIdentifier" must be an instance of URL', F);
  if (!Xe(t, Response))
    throw R('"response" must be an instance of Response', F);
  if (t.status !== 200)
    throw k('"response" is not a conform Authorization Server Metadata response (unexpected HTTP status code)', Ro, t);
  en(t);
  let n = await Po(t);
  if (N(n.issuer, '"response" body "issuer" property', T, { body: n }), r !== Qs && new URL(n.issuer).href !== r.href)
    throw k('"response" body "issuer" property does not match the expected value', Ea, { expected: r.href, body: n, attribute: "issuer" });
  return n;
}
o(na, "processDiscoveryResponse");
function oa(e) {
  Ed(e, "application/json");
}
o(oa, "assertApplicationJson");
function kd(e, ...t) {
  let r = '"response" content-type must be ';
  if (t.length > 2) {
    let n = t.pop();
    r += `${t.join(", ")}, or ${n}`;
  } else t.length === 2 ? r += `${t[0]} or ${t[1]}` : r += t[0];
  return k(r, dl, e);
}
o(kd, "notJson");
function Ed(e, t) {
  if (la(e) !== t)
    throw kd(e, t);
}
o(Ed, "assertContentType");
function Gr() {
  return ce(crypto.getRandomValues(new Uint8Array(32)));
}
o(Gr, "randomBytes");
function qr() {
  return Gr();
}
o(qr, "generateRandomCodeVerifier");
function Xr() {
  return Gr();
}
o(Xr, "generateRandomState");
function Zr() {
  return Gr();
}
o(Zr, "generateRandomNonce");
async function Yr(e) {
  return N(e, "codeVerifier"), ce(await crypto.subtle.digest("SHA-256", ae(e)));
}
o(Yr, "calculatePKCECodeChallenge");
function Ad(e) {
  return e instanceof CryptoKey ? { key: e } : e?.key instanceof CryptoKey ? (e.kid !== void 0 && N(e.kid, '"kid"'), {
    key: e.key,
    kid: e.kid
  }) : {};
}
o(Ad, "getKeyAndKid");
function Id(e) {
  switch (e.algorithm.hash.name) {
    case "SHA-256":
      return "PS256";
    case "SHA-384":
      return "PS384";
    case "SHA-512":
      return "PS512";
    default:
      throw new G("unsupported RsaHashedKeyAlgorithm hash name", {
        cause: e
      });
  }
}
o(Id, "psAlg");
function Td(e) {
  switch (e.algorithm.hash.name) {
    case "SHA-256":
      return "RS256";
    case "SHA-384":
      return "RS384";
    case "SHA-512":
      return "RS512";
    default:
      throw new G("unsupported RsaHashedKeyAlgorithm hash name", {
        cause: e
      });
  }
}
o(Td, "rsAlg");
function Rd(e) {
  switch (e.algorithm.namedCurve) {
    case "P-256":
      return "ES256";
    case "P-384":
      return "ES384";
    case "P-521":
      return "ES512";
    default:
      throw new G("unsupported EcKeyAlgorithm namedCurve", { cause: e });
  }
}
o(Rd, "esAlg");
function Cd(e) {
  switch (e.algorithm.name) {
    case "RSA-PSS":
      return Id(e);
    case "RSASSA-PKCS1-v1_5":
      return Td(e);
    case "ECDSA":
      return Rd(e);
    case "Ed25519":
    case "ML-DSA-44":
    case "ML-DSA-65":
    case "ML-DSA-87":
      return e.algorithm.name;
    case "EdDSA":
      return "Ed25519";
    default:
      throw new G("unsupported CryptoKey algorithm name", { cause: e });
  }
}
o(Cd, "keyToJws");
function It(e) {
  let t = e?.[ea];
  return typeof t == "number" && Number.isFinite(t) ? t : 0;
}
o(It, "getClockSkew");
function ko(e) {
  let t = e?.[yd];
  return typeof t == "number" && Number.isFinite(t) && Math.sign(t) !== -1 ? t : 30;
}
o(ko, "getClockTolerance");
function Eo() {
  return Math.floor(Date.now() / 1e3);
}
o(Eo, "epochTime");
function Tt(e) {
  if (typeof e != "object" || e === null)
    throw R('"as" must be an object', F);
  N(e.issuer, '"as.issuer"');
}
o(Tt, "assertAs");
function Rt(e) {
  if (typeof e != "object" || e === null)
    throw R('"client" must be an object', F);
  N(e.client_id, '"client.client_id"');
}
o(Rt, "assertClient");
function ia(e) {
  return N(e, '"clientSecret"'), (t, r, n, i) => {
    n.set("client_id", r.client_id), n.set("client_secret", e);
  };
}
o(ia, "ClientSecretPost");
function sa(e, t) {
  let r = Eo() + It(t);
  return {
    jti: Gr(),
    aud: e.issuer,
    exp: r + 60,
    iat: r,
    nbf: r,
    iss: t.client_id,
    sub: t.client_id
  };
}
o(sa, "clientAssertionPayload");
function aa(e, t) {
  let { key: r, kid: n } = Ad(e);
  return _d(r, '"clientPrivateKey.key"'), async (i, s, a, c) => {
    let d = { alg: Cd(r), kid: n }, u = sa(i, s);
    t?.[Vr]?.(d, u), a.set("client_id", s.client_id), a.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), a.set("client_assertion", await Pd(d, u, r));
  };
}
o(aa, "PrivateKeyJwt");
function ca(e, t) {
  N(e, '"clientSecret"');
  let r = t?.[Vr], n;
  return async (i, s, a, c) => {
    n ||= await crypto.subtle.importKey("raw", ae(e), { hash: "SHA-256", name: "HMAC" }, !1, ["sign"]);
    let d = { alg: "HS256" }, u = sa(i, s);
    r?.(d, u);
    let f = `${ce(ae(JSON.stringify(d)))}.${ce(ae(JSON.stringify(u)))}`, l = await crypto.subtle.sign(n.algorithm, n, ae(f));
    a.set("client_id", s.client_id), a.set("client_assertion_type", "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"), a.set("client_assertion", `${f}.${ce(new Uint8Array(l))}`);
  };
}
o(ca, "ClientSecretJwt");
async function Pd(e, t, r) {
  if (!r.usages.includes("sign"))
    throw R('CryptoKey instances used for signing assertions must include "sign" in their "usages"', q);
  let n = `${ce(ae(JSON.stringify(e)))}.${ce(ae(JSON.stringify(t)))}`, i = ce(await crypto.subtle.sign(yl(r), r, ae(n)));
  return `${n}.${i}`;
}
o(Pd, "signJwt");
var Ud = URL.parse ? (e, t) => URL.parse(e, t) : (e, t) => {
  try {
    return new URL(e, t);
  } catch {
    return null;
  }
};
function Ao(e, t) {
  if (t && e.protocol !== "https:")
    throw k("only requests to HTTPS are allowed", ll, e);
  if (e.protocol !== "https:" && e.protocol !== "http:")
    throw k("only HTTP and HTTPS requests are allowed", fl, e);
}
o(Ao, "checkProtocol");
function Zs(e, t, r, n) {
  let i;
  if (typeof e != "string" || !(i = Ud(e)))
    throw k(`authorization server metadata does not contain a valid ${r ? `"as.mtls_endpoint_aliases.${t}"` : `"as.${t}"`}`, e === void 0 ? pl : hl, { attribute: r ? `mtls_endpoint_aliases.${t}` : t });
  return Ao(i, n), i;
}
o(Zs, "validateEndpoint");
function ua(e, t, r, n) {
  return r && e.mtls_endpoint_aliases && t in e.mtls_endpoint_aliases ? Zs(e.mtls_endpoint_aliases[t], t, r, n) : Zs(e[t], t, r, n);
}
o(ua, "resolveEndpoint");
var bo = class extends Error {
  static {
    o(this, "ResponseBodyError");
  }
  cause;
  code;
  error;
  status;
  error_description;
  response;
  constructor(t, r) {
    super(t, r), this.name = this.constructor.name, this.code = sl, this.cause = r.cause, this.error = r.cause.error, this.status = r.response.status, this.error_description = r.cause.error_description, Object.defineProperty(this, "response", { enumerable: !1, value: r.response }), Error.captureStackTrace?.(this, this.constructor);
  }
}, At = class extends Error {
  static {
    o(this, "AuthorizationResponseError");
  }
  cause;
  code;
  error;
  error_description;
  constructor(t, r) {
    super(t, r), this.name = this.constructor.name, this.code = cl, this.cause = r.cause, this.error = r.cause.get("error"), this.error_description = r.cause.get("error_description") ?? void 0, Error.captureStackTrace?.(this, this.constructor);
  }
}, _o = class extends Error {
  static {
    o(this, "WWWAuthenticateChallengeError");
  }
  cause;
  code;
  response;
  status;
  constructor(t, r) {
    super(t, r), this.name = this.constructor.name, this.code = il, this.cause = r.cause, this.status = r.response.status, this.response = r.response, Object.defineProperty(this, "response", { enumerable: !1 }), Error.captureStackTrace?.(this, this.constructor);
  }
}, Br = "[a-zA-Z0-9!#$%&\\'\\*\\+\\-\\.\\^_`\\|~]+", Od = "[a-zA-Z0-9\\-\\._\\~\\+\\/]+={0,2}", Ld = '"((?:[^"\\\\]|\\\\[\\s\\S])*)"', Dd = "(" + Br + ")\\s*=\\s*" + Ld, Kd = "(" + Br + ")\\s*=\\s*(" + Br + ")", Nd = new RegExp("^[,\\s]*(" + Br + ")"), $d = new RegExp("^[,\\s]*" + Dd + "[,\\s]*(.*)"), Hd = new RegExp("^[,\\s]*" + Kd + "[,\\s]*(.*)"), Wd = new RegExp("^(" + Od + ")(?:$|[,\\s])(.*)");
function jd(e) {
  if (!Xe(e, Response))
    throw R('"response" must be an instance of Response', F);
  let t = e.headers.get("www-authenticate");
  if (t === null)
    return;
  let r = [], n = t;
  for (; n; ) {
    let i = n.match(Nd), s = i?.[1].toLowerCase();
    if (!s)
      return;
    let a = n.substring(i[0].length);
    if (a && !a.match(/^[\s,]/))
      return;
    let c = a.match(/^\s+(.*)$/), d = !!c;
    n = c ? c[1] : void 0;
    let u = {}, f;
    if (d)
      for (; n; ) {
        let y, p;
        if (i = n.match($d)) {
          [, y, p, n] = i, p.includes("\\") && (p = p.replace(/\\([\s\S])/g, "$1")), u[y.toLowerCase()] = p;
          continue;
        }
        if (i = n.match(Hd)) {
          [, y, p, n] = i, u[y.toLowerCase()] = p;
          continue;
        }
        if (i = n.match(Wd)) {
          if (Object.keys(u).length)
            break;
          [, f, n] = i;
          break;
        }
        return;
      }
    else
      n = a || void 0;
    let l = { scheme: s, parameters: u };
    f && (l.token68 = f), r.push(l);
  }
  if (r.length)
    return r;
}
o(jd, "parseWwwAuthenticateChallenges");
async function Jd(e) {
  if (e.status > 399 && e.status < 500) {
    en(e), oa(e);
    try {
      let t = await e.clone().json();
      if (jr(t) && typeof t.error == "string" && t.error.length)
        return t;
    } catch {
    }
  }
}
o(Jd, "parseOAuthResponseErrorBody");
async function Bd(e, t, r) {
  if (e.status !== t) {
    ya(e);
    let n;
    throw (n = await Jd(e)) ? (await e.body?.cancel(), new bo("server responded with an error in the response body", {
      cause: n,
      response: e
    })) : k(`"response" is not a conform ${r} response (unexpected HTTP status code)`, Ro, e);
  }
}
o(Bd, "checkOAuthBodyError");
function da(e) {
  if (!To.has(e))
    throw R('"options.DPoP" is not a valid DPoPHandle', q);
}
o(da, "assertDPoP");
async function Md(e, t, r, n, i, s) {
  if (N(e, '"accessToken"'), !(r instanceof URL))
    throw R('"url" must be an instance of URL', F);
  Ao(r, s?.[me] !== !0), n = Fr(n), s?.DPoP && (da(s.DPoP), await s.DPoP.addProof(r, n, t.toUpperCase(), e)), n.set("authorization", `${n.has("dpop") ? "DPoP" : "Bearer"} ${e}`);
  let a = await (s?.[Se] || fetch)(r.href, {
    duplex: Xe(i, ReadableStream) ? "half" : void 0,
    body: i,
    headers: Object.fromEntries(n.entries()),
    method: t,
    redirect: "manual",
    signal: So(r, s?.signal)
  });
  return s?.DPoP?.cacheNonce(a, r), a;
}
o(Md, "resourceRequest");
async function Io(e, t, r, n) {
  Tt(e), Rt(t);
  let i = ua(e, "userinfo_endpoint", t.use_mtls_endpoint_aliases, n?.[me] !== !0), s = Fr(n?.headers);
  return t.userinfo_signed_response_alg ? s.set("accept", "application/jwt") : (s.set("accept", "application/json"), s.append("accept", "application/jwt")), Md(r, "GET", i, s, null, {
    ...n,
    [ea]: It(t)
  });
}
o(Io, "userInfoRequest");
var zd = Symbol();
function la(e) {
  return e.headers.get("content-type")?.split(";")[0];
}
o(la, "getContentType");
async function fa(e, t, r, n, i) {
  if (Tt(e), Rt(t), !Xe(n, Response))
    throw R('"response" must be an instance of Response', F);
  if (ya(n), n.status !== 200)
    throw k('"response" is not a conform UserInfo Endpoint response (unexpected HTTP status code)', Ro, n);
  en(n);
  let s;
  if (la(n) === "application/jwt") {
    let { claims: a, jwt: c } = await Aa(await n.text(), Ia.bind(void 0, t.userinfo_signed_response_alg, e.userinfo_signing_alg_values_supported, void 0), It(t), ko(t), i?.[mo]).then(Gd.bind(void 0, t.client_id)).then(qd.bind(void 0, e));
    ha.set(n, c), s = a;
  } else {
    if (t.userinfo_signed_response_alg)
      throw k("JWT UserInfo Response expected", ul, n);
    s = await Po(n);
  }
  switch (N(s.sub, '"response" body "sub" property', T, { body: s }), r) {
    case zd:
      break;
    default:
      if (N(r, '"expectedSubject"'), s.sub !== r)
        throw k('unexpected "response" body "sub" property value', Ea, {
          expected: r,
          body: s,
          attribute: "sub"
        });
  }
  return s;
}
o(fa, "processUserInfoResponse");
async function Vd(e, t, r, n, i, s, a) {
  return await r(e, t, i, s), s.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"), (a?.[Se] || fetch)(n.href, {
    body: i,
    headers: Object.fromEntries(s.entries()),
    method: "POST",
    redirect: "manual",
    signal: So(n, a?.signal)
  });
}
o(Vd, "authenticatedRequest");
async function Fd(e, t, r, n, i, s) {
  let a = ua(e, "token_endpoint", t.use_mtls_endpoint_aliases, s?.[me] !== !0);
  i.set("grant_type", n);
  let c = Fr(s?.headers);
  c.set("accept", "application/json"), s?.DPoP !== void 0 && (da(s.DPoP), await s.DPoP.addProof(a, c, "POST"));
  let d = await Vd(e, t, r, a, i, c, s);
  return s?.DPoP?.cacheNonce(d, a), d;
}
o(Fd, "tokenEndpointRequest");
var pa = /* @__PURE__ */ new WeakMap(), ha = /* @__PURE__ */ new WeakMap();
function Qr(e) {
  if (!e.id_token)
    return;
  let t = pa.get(e);
  if (!t)
    throw R('"ref" was already garbage collected or did not resolve from the proper sources', q);
  return t;
}
o(Qr, "getValidatedIdTokenClaims");
async function ma(e, t, r, n, i, s) {
  if (Tt(e), Rt(t), !Xe(r, Response))
    throw R('"response" must be an instance of Response', F);
  await Bd(r, 200, "Token Endpoint"), en(r);
  let a = await Po(r);
  if (N(a.access_token, '"response" body "access_token" property', T, {
    body: a
  }), N(a.token_type, '"response" body "token_type" property', T, {
    body: a
  }), a.token_type = a.token_type.toLowerCase(), a.expires_in !== void 0) {
    let c = typeof a.expires_in != "number" ? parseFloat(a.expires_in) : a.expires_in;
    Jr(c, !0, '"response" body "expires_in" property', T, {
      body: a
    }), a.expires_in = c;
  }
  if (a.refresh_token !== void 0 && N(a.refresh_token, '"response" body "refresh_token" property', T, {
    body: a
  }), a.scope !== void 0 && typeof a.scope != "string")
    throw k('"response" body "scope" property must be a string', T, { body: a });
  if (a.id_token !== void 0) {
    N(a.id_token, '"response" body "id_token" property', T, {
      body: a
    });
    let c = [];
    t.require_auth_time === !0 && c.push("auth_time"), t.default_max_age !== void 0 && (Jr(t.default_max_age, !0, '"client.default_max_age"'), c.push("auth_time")), n?.length && c.push(...n);
    let { claims: d, jwt: u } = await el(e, t, a.id_token, c, i);
    rl(t, d), tl(d), ha.set(r, u), pa.set(a, d);
  }
  if (s?.[a.token_type] !== void 0)
    s[a.token_type](r, a);
  else if (a.token_type !== "dpop" && a.token_type !== "bearer")
    throw new G("unsupported `token_type` value", { cause: { body: a } });
  return a;
}
o(ma, "processGenericAccessTokenResponse");
function ya(e) {
  let t;
  if (t = jd(e))
    throw new _o("server responded with a challenge in the WWW-Authenticate HTTP Header", { cause: t, response: e });
}
o(ya, "checkAuthenticationChallenges");
function Gd(e, t) {
  return t.claims.aud !== void 0 ? wa(e, t) : t;
}
o(Gd, "validateOptionalAudience");
function wa(e, t) {
  if (Array.isArray(t.claims.aud)) {
    if (!t.claims.aud.includes(e))
      throw k('unexpected JWT "aud" (audience) claim value', qe, {
        expected: e,
        claims: t.claims,
        claim: "aud"
      });
  } else if (t.claims.aud !== e)
    throw k('unexpected JWT "aud" (audience) claim value', qe, {
      expected: e,
      claims: t.claims,
      claim: "aud"
    });
  return t;
}
o(wa, "validateAudience");
function qd(e, t) {
  return t.claims.iss !== void 0 ? ga(e, t) : t;
}
o(qd, "validateOptionalIssuer");
function ga(e, t) {
  let r = e[gl]?.(t) ?? e.issuer;
  if (t.claims.iss !== r)
    throw k('unexpected JWT "iss" (issuer) claim value', qe, {
      expected: r,
      claims: t.claims,
      claim: "iss"
    });
  return t;
}
o(ga, "validateIssuer");
var To = /* @__PURE__ */ new WeakSet();
function Xd(e) {
  return To.add(e), e;
}
o(Xd, "brand");
var Zd = Symbol();
async function ba(e, t, r, n, i, s, a) {
  if (Tt(e), Rt(t), !To.has(n))
    throw R('"callbackParameters" must be an instance of URLSearchParams obtained from "validateAuthResponse()", or "validateJwtAuthResponse()', q);
  N(i, '"redirectUri"');
  let c = Ne(n, "code");
  if (!c)
    throw k('no authorization code in "callbackParameters"', T);
  let d = new URLSearchParams(a?.additionalParameters);
  return d.set("redirect_uri", i), d.set("code", c), s !== Zd && (N(s, '"codeVerifier"'), d.set("code_verifier", s)), Fd(e, t, r, "authorization_code", d, a);
}
o(ba, "authorizationCodeGrantRequest");
var _a = {
  aud: "audience",
  c_hash: "code hash",
  client_id: "client id",
  exp: "expiration time",
  iat: "issued at",
  iss: "issuer",
  jti: "jwt id",
  nonce: "nonce",
  s_hash: "state hash",
  sub: "subject",
  ath: "access token hash",
  htm: "http method",
  htu: "http uri",
  cnf: "confirmation",
  auth_time: "authentication time"
};
function Yd(e, t) {
  for (let r of e)
    if (t.claims[r] === void 0)
      throw k(`JWT "${r}" (${_a[r]}) claim missing`, T, {
        claims: t.claims
      });
  return t;
}
o(Yd, "validatePresence");
function Qd(e, t) {
  if (typeof t.claims[e] != "string")
    throw k(`unexpected JWT "${e}" (${_a[e]}) claim type`, T, {
      claims: t.claims
    });
  return t;
}
o(Qd, "validateStringClaim");
function el(e, t, r, n, i) {
  return Aa(r, Ia.bind(void 0, t.id_token_signed_response_alg, e.id_token_signing_alg_values_supported, "RS256"), It(t), ko(t), i).then(Yd.bind(void 0, ["aud", "exp", "iat", "iss", "sub", ...n])).then(ga.bind(void 0, e)).then(wa.bind(void 0, t.client_id)).then(Qd.bind(void 0, "sub"));
}
o(el, "validateIdTokenClaims");
function xa(e, t) {
  if (t === zr)
    return t;
  let r = t === void 0;
  return r && (t = e.default_max_age), t === void 0 ? zr : (Jr(t, !0, r ? '"client.default_max_age"' : '"maxAge" argument'), t);
}
o(xa, "resolveIdTokenMaxAge");
function tl(e) {
  e.auth_time !== void 0 && Jr(e.auth_time, !0, 'ID Token "auth_time" (authentication time)', T, { claims: e });
}
o(tl, "validateIdTokenAuthTimeClaim");
function va(e, t, r) {
  if (r === zr)
    return;
  let n = Eo() + It(e), i = ko(e);
  if (t.auth_time + r < n - i)
    throw k("too much time has elapsed since the last End-User authentication", vo, { claims: t, now: n, tolerance: i, claim: "auth_time" });
}
o(va, "validateIdTokenAuthTime");
function Sa(e, t) {
  let r = t === Mr ? void 0 : t;
  if (e.nonce !== r)
    throw k('unexpected ID Token "nonce" claim value', qe, {
      expected: r,
      claims: e,
      claim: "nonce"
    });
}
o(Sa, "validateIdTokenNonce");
function rl(e, t) {
  if (Array.isArray(t.aud) && t.aud.length !== 1) {
    if (t.azp === void 0)
      throw k('ID Token "aud" (audience) claim includes additional untrusted audiences', qe, { claims: t, claim: "aud" });
    if (t.azp !== e.client_id)
      throw k('unexpected ID Token "azp" (authorized party) claim value', qe, {
        expected: e.client_id,
        claims: t,
        claim: "azp"
      });
  }
}
o(rl, "validateIdTokenAuthorizedParty");
var Mr = Symbol(), zr = Symbol();
async function ka(e, t, r, n) {
  return typeof n?.expectedNonce == "string" || typeof n?.maxAge == "number" || n?.requireIdToken ? nl(e, t, r, n.expectedNonce, n.maxAge, n[mo], n.recognizedTokenTypes) : ol(e, t, r, n?.maxAge, n?.[mo], n?.recognizedTokenTypes);
}
o(ka, "processAuthorizationCodeResponse");
async function nl(e, t, r, n, i, s, a) {
  let c = [];
  switch (n) {
    case void 0:
      n = Mr;
      break;
    case Mr:
      break;
    default:
      N(n, '"expectedNonce" argument'), c.push("nonce");
  }
  i = xa(t, i), i !== zr && c.push("auth_time");
  let d = await ma(e, t, r, c, s, a);
  N(d.id_token, '"response" body "id_token" property', T, {
    body: d
  });
  let u = Qr(d);
  return va(t, u, i), Sa(u, n), d;
}
o(nl, "processAuthorizationCodeOpenIDResponse");
async function ol(e, t, r, n, i, s) {
  let a = await ma(e, t, r, void 0, i, s), c = Qr(a);
  return c && (va(t, c, xa(t, n)), Sa(c, Mr)), a;
}
o(ol, "processAuthorizationCodeOAuth2Response");
var il = "OAUTH_WWW_AUTHENTICATE_CHALLENGE", sl = "OAUTH_RESPONSE_BODY_ERROR", al = "OAUTH_UNSUPPORTED_OPERATION", cl = "OAUTH_AUTHORIZATION_RESPONSE_ERROR", ul = "OAUTH_JWT_USERINFO_EXPECTED", xo = "OAUTH_PARSE_ERROR", T = "OAUTH_INVALID_RESPONSE";
var dl = "OAUTH_RESPONSE_IS_NOT_JSON", Ro = "OAUTH_RESPONSE_IS_NOT_CONFORM", ll = "OAUTH_HTTP_REQUEST_FORBIDDEN", fl = "OAUTH_REQUEST_PROTOCOL_FORBIDDEN", vo = "OAUTH_JWT_TIMESTAMP_CHECK_FAILED", qe = "OAUTH_JWT_CLAIM_COMPARISON_FAILED", Ea = "OAUTH_JSON_ATTRIBUTE_COMPARISON_FAILED";
var pl = "OAUTH_MISSING_SERVER_METADATA", hl = "OAUTH_INVALID_SERVER_METADATA";
function en(e) {
  if (e.bodyUsed)
    throw R('"response" body has been used already', q);
}
o(en, "assertReadableResponse");
function Ys(e) {
  let { algorithm: t } = e;
  if (typeof t.modulusLength != "number" || t.modulusLength < 2048)
    throw new G(`unsupported ${t.name} modulusLength`, {
      cause: e
    });
}
o(Ys, "checkRsaKeyAlgorithm");
function ml(e) {
  let { algorithm: t } = e;
  switch (t.namedCurve) {
    case "P-256":
      return "SHA-256";
    case "P-384":
      return "SHA-384";
    case "P-521":
      return "SHA-512";
    default:
      throw new G("unsupported ECDSA namedCurve", { cause: e });
  }
}
o(ml, "ecdsaHashName");
function yl(e) {
  switch (e.algorithm.name) {
    case "ECDSA":
      return {
        name: e.algorithm.name,
        hash: ml(e)
      };
    case "RSA-PSS":
      switch (Ys(e), e.algorithm.hash.name) {
        case "SHA-256":
        case "SHA-384":
        case "SHA-512":
          return {
            name: e.algorithm.name,
            saltLength: parseInt(e.algorithm.hash.name.slice(-3), 10) >> 3
          };
        default:
          throw new G("unsupported RSA-PSS hash name", { cause: e });
      }
    case "RSASSA-PKCS1-v1_5":
      return Ys(e), e.algorithm.name;
    case "ML-DSA-44":
    case "ML-DSA-65":
    case "ML-DSA-87":
    case "Ed25519":
      return e.algorithm.name;
  }
  throw new G("unsupported CryptoKey algorithm name", { cause: e });
}
o(yl, "keyToSubtle");
async function Aa(e, t, r, n, i) {
  let { 0: s, 1: a, length: c } = e.split(".");
  if (c === 5)
    if (i !== void 0)
      e = await i(e), { 0: s, 1: a, length: c } = e.split(".");
    else
      throw new G("JWE decryption is not configured", { cause: e });
  if (c !== 3)
    throw k("Invalid JWT", T, e);
  let d;
  try {
    d = JSON.parse(ae(ce(s)));
  } catch (l) {
    throw k("failed to parse JWT Header body as base64url encoded JSON", xo, l);
  }
  if (!jr(d))
    throw k("JWT Header must be a top level object", T, e);
  if (t(d), d.crit !== void 0)
    throw new G('no JWT "crit" header parameter extensions are supported', {
      cause: { header: d }
    });
  let u;
  try {
    u = JSON.parse(ae(ce(a)));
  } catch (l) {
    throw k("failed to parse JWT Payload body as base64url encoded JSON", xo, l);
  }
  if (!jr(u))
    throw k("JWT Payload must be a top level object", T, e);
  let f = Eo() + r;
  if (u.exp !== void 0) {
    if (typeof u.exp != "number")
      throw k('unexpected JWT "exp" (expiration time) claim type', T, { claims: u });
    if (u.exp <= f - n)
      throw k('unexpected JWT "exp" (expiration time) claim value, expiration is past current timestamp', vo, { claims: u, now: f, tolerance: n, claim: "exp" });
  }
  if (u.iat !== void 0 && typeof u.iat != "number")
    throw k('unexpected JWT "iat" (issued at) claim type', T, { claims: u });
  if (u.iss !== void 0 && typeof u.iss != "string")
    throw k('unexpected JWT "iss" (issuer) claim type', T, { claims: u });
  if (u.nbf !== void 0) {
    if (typeof u.nbf != "number")
      throw k('unexpected JWT "nbf" (not before) claim type', T, { claims: u });
    if (u.nbf > f + n)
      throw k('unexpected JWT "nbf" (not before) claim value', vo, {
        claims: u,
        now: f,
        tolerance: n,
        claim: "nbf"
      });
  }
  if (u.aud !== void 0 && typeof u.aud != "string" && !Array.isArray(u.aud))
    throw k('unexpected JWT "aud" (audience) claim type', T, { claims: u });
  return { header: d, claims: u, jwt: e };
}
o(Aa, "validateJwt");
function Ia(e, t, r, n) {
  if (e !== void 0) {
    if (typeof e == "string" ? n.alg !== e : !e.includes(n.alg))
      throw k('unexpected JWT "alg" header parameter', T, {
        header: n,
        expected: e,
        reason: "client configuration"
      });
    return;
  }
  if (Array.isArray(t)) {
    if (!t.includes(n.alg))
      throw k('unexpected JWT "alg" header parameter', T, {
        header: n,
        expected: t,
        reason: "authorization server metadata"
      });
    return;
  }
  if (r !== void 0) {
    if (typeof r == "string" ? n.alg !== r : typeof r == "function" ? !r(n.alg) : !r.includes(n.alg))
      throw k('unexpected JWT "alg" header parameter', T, {
        header: n,
        expected: r,
        reason: "default value"
      });
    return;
  }
  throw k('missing client or server configuration to verify used JWT "alg" header parameter', void 0, { client: e, issuer: t, fallback: r });
}
o(Ia, "checkSigningAlgorithm");
function Ne(e, t) {
  let { 0: r, length: n } = e.getAll(t);
  if (n > 1)
    throw k(`"${t}" parameter must be provided only once`, T);
  return r;
}
o(Ne, "getURLSearchParameter");
var Co = Symbol(), wl = Symbol();
function Ta(e, t, r, n) {
  if (Tt(e), Rt(t), r instanceof URL && (r = r.searchParams), !(r instanceof URLSearchParams))
    throw R('"parameters" must be an instance of URLSearchParams, or URL', F);
  if (Ne(r, "response"))
    throw k('"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()', T, { parameters: r });
  let i = Ne(r, "iss"), s = Ne(r, "state");
  if (!i && e.authorization_response_iss_parameter_supported)
    throw k('response parameter "iss" (issuer) missing', T, { parameters: r });
  if (i && i !== e.issuer)
    throw k('unexpected "iss" (issuer) response parameter value', T, {
      expected: e.issuer,
      parameters: r
    });
  switch (n) {
    case void 0:
    case wl:
      if (s !== void 0)
        throw k('unexpected "state" response parameter encountered', T, {
          expected: void 0,
          parameters: r
        });
      break;
    case Co:
      break;
    default:
      if (N(n, '"expectedState" argument'), s !== n)
        throw k(s === void 0 ? 'response parameter "state" missing' : 'unexpected "state" response parameter value', T, { expected: n, parameters: r });
  }
  if (Ne(r, "error"))
    throw new At("authorization response from the server is an error", {
      cause: r
    });
  let c = Ne(r, "id_token"), d = Ne(r, "token");
  if (c !== void 0 || d !== void 0)
    throw new G("implicit and hybrid flows are not supported");
  return Xd(new URLSearchParams(r));
}
o(Ta, "validateAuthResponse");
async function Po(e, t = oa) {
  let r;
  try {
    r = await e.json();
  } catch (n) {
    throw t(e), k('failed to parse "response" body as JSON', xo, n);
  }
  if (!jr(r))
    throw k('"response" body must be a top level object', T, { body: r });
  return r;
}
o(Po, "getResponseJsonBody");
var Qs = Symbol(), gl = Symbol();

// node_modules/@auth/core/lib/actions/callback/oauth/checks.js
var Uo = 900;
async function Oo(e, t, r) {
  let { cookies: n, logger: i } = r, s = n[e], a = /* @__PURE__ */ new Date();
  a.setTime(a.getTime() + Uo * 1e3), i.debug(`CREATE_${e.toUpperCase()}`, {
    name: s.name,
    payload: t,
    COOKIE_TTL: Uo,
    expires: a
  });
  let c = await Kr({
    ...r.jwt,
    maxAge: Uo,
    token: {
      value: t,
      provider: r.provider.id
    },
    salt: s.name
  }), d = { ...s.options, expires: a };
  return { name: s.name, value: c, options: d };
}
o(Oo, "sealCookie");
async function bl(e, t, r) {
  try {
    let { logger: n, cookies: i, jwt: s } = r;
    if (n.debug(`PARSE_${e.toUpperCase()}`, { cookie: t }), !t)
      throw new be(`${e} cookie was missing`);
    let a = await Nr({
      ...s,
      token: t,
      salt: i[e].name
    });
    if (!a?.value)
      throw new Error("Invalid cookie");
    if (a.provider !== r.provider?.id)
      throw new Error(`${e} cookie was created for a different provider than the one handling the callback`);
    return a.value;
  } catch (n) {
    throw new be(`${e} value could not be parsed`, {
      cause: n
    });
  }
}
o(bl, "parseCookie");
function _l(e, t, r) {
  let { logger: n, cookies: i } = t, s = i[e];
  n.debug(`CLEAR_${e.toUpperCase()}`, { cookie: s }), r.push({
    name: s.name,
    value: "",
    options: { ...i[e].options, maxAge: 0 }
  });
}
o(_l, "clearCookie");
function Lo(e, t) {
  return async function(r, n, i) {
    let { provider: s, logger: a } = i;
    if (!s?.checks?.includes(e))
      return;
    let c = r?.[i.cookies[t].name];
    a.debug(`USE_${t.toUpperCase()}`, { value: c });
    let d = await bl(t, c, i);
    return _l(t, i, n), d;
  };
}
o(Lo, "useCookie");
var Ca = {
  /** Creates a PKCE code challenge and verifier pair. The verifier in stored in the cookie. */
  async create(e) {
    let t = qr(), r = await Yr(t);
    return { cookie: await Oo("pkceCodeVerifier", t, e), value: r };
  },
  /**
   * Returns code_verifier if the provider is configured to use PKCE,
   * and clears the container cookie afterwards.
   * An error is thrown if the code_verifier is missing or invalid.
   */
  use: Lo("pkce", "pkceCodeVerifier")
}, xl = 900, Ra = "encodedState", Do = {
  /** Creates a state cookie with an optionally encoded body. */
  async create(e, t) {
    let { provider: r } = e;
    if (!r.checks.includes("state")) {
      if (t)
        throw new be("State data was provided but the provider is not configured to use state");
      return;
    }
    let n = {
      origin: t,
      random: Xr()
    }, i = await Kr({
      secret: e.jwt.secret,
      token: n,
      salt: Ra,
      maxAge: xl
    });
    return { cookie: await Oo("state", i, e), value: i };
  },
  /**
   * Returns state if the provider is configured to use state,
   * and clears the container cookie afterwards.
   * An error is thrown if the state is missing or invalid.
   */
  use: Lo("state", "state"),
  /** Decodes the state. If it could not be decoded, it throws an error. */
  async decode(e, t) {
    try {
      t.logger.debug("DECODE_STATE", { state: e });
      let r = await Nr({
        secret: t.jwt.secret,
        token: e,
        salt: Ra
      });
      if (r)
        return r;
      throw new Error("Invalid state");
    } catch (r) {
      throw new be("State could not be decoded", { cause: r });
    }
  }
}, Pa = {
  async create(e) {
    if (!e.provider.checks.includes("nonce"))
      return;
    let t = Zr();
    return { cookie: await Oo("nonce", t, e), value: t };
  },
  /**
   * Returns nonce if the provider is configured to use nonce,
   * and clears the container cookie afterwards.
   * An error is thrown if the nonce is missing or invalid.
   * @see https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes
   * @see https://danielfett.de/2020/05/16/pkce-vs-nonce-equivalent-or-not/#nonce
   */
  use: Lo("nonce", "nonce")
};

// node_modules/@auth/core/lib/utils/env.js
function Ko(e, t, r = !1) {
  try {
    let n = e.AUTH_URL;
    n && (t.basePath ? r || Et(t).warn("env-url-basepath-redundant") : t.basePath = new URL(n).pathname);
  } catch {
  } finally {
    t.basePath ?? (t.basePath = "/auth");
  }
  if (!t.secret?.length) {
    t.secret = [];
    let n = e.AUTH_SECRET;
    n && t.secret.push(n);
    for (let i of [1, 2, 3]) {
      let s = e[`AUTH_SECRET_${i}`];
      s && t.secret.unshift(s);
    }
  }
  t.redirectProxyUrl ?? (t.redirectProxyUrl = e.AUTH_REDIRECT_PROXY_URL), t.trustHost ?? (t.trustHost = !!(e.AUTH_URL ?? e.AUTH_TRUST_HOST ?? e.VERCEL ?? e.CF_PAGES ?? e.NODE_ENV !== "production")), t.providers = t.providers.map((n) => {
    let { id: i } = typeof n == "function" ? n({}) : n, s = i.toUpperCase().replace(/-/g, "_"), a = e[`AUTH_${s}_ID`], c = e[`AUTH_${s}_SECRET`], d = e[`AUTH_${s}_ISSUER`], u = e[`AUTH_${s}_KEY`], f = typeof n == "function" ? n({ clientId: a, clientSecret: c, issuer: d, apiKey: u }) : n;
    return f.type === "oauth" || f.type === "oidc" ? (f.clientId ?? (f.clientId = a), f.clientSecret ?? (f.clientSecret = c), f.issuer ?? (f.issuer = d)) : f.type === "email" && (f.apiKey ?? (f.apiKey = u)), f;
  });
}
o(Ko, "setEnvDefaults");

// node_modules/@convex-dev/auth/dist/server/provider_utils.js
function Oa(e) {
  let t = Ho(e), r = t.providers.filter((n) => n.type === "credentials").map((n) => n.extraProviders).flat().filter((n) => n !== void 0);
  return {
    ...t,
    extraProviders: Cl(r),
    theme: t.theme ?? {
      colorScheme: "auto",
      logo: "",
      brandColor: "",
      buttonText: ""
    }
  };
}
o(Oa, "configDefaults");
function La(e) {
  let t = { providers: [e] };
  return Ho(t), t.providers[0];
}
o(La, "materializeProvider");
function Cl(e) {
  let t = { providers: e };
  return Ho(t), t.providers;
}
o(Cl, "materializeProviders");
function Ho(e) {
  let t = e.providers.map((n) => Pl(typeof n == "function" ? n() : n)), r = { ...e, providers: t };
  return Ko(process.env, r), r.providers.forEach((n) => {
    if (n.type === "phone") {
      let i = n.id.toUpperCase().replace(/-/g, "_");
      n.apiKey ??= process.env[`AUTH_${i}_KEY`];
    }
  }), r;
}
o(Ho, "materializeAndDefaultProviders");
function Pl(e) {
  let t = $o(e, e.options);
  return t.type === "oauth" || t.type === "oidc" ? Ll(t) : t;
}
o(Pl, "providerDefaults");
var Ul = /* @__PURE__ */ o((e) => Da({
  id: e.sub ?? e.id ?? crypto.randomUUID(),
  name: e.name ?? e.nickname ?? e.preferred_username,
  email: e.email ?? void 0,
  image: e.picture ?? void 0
}), "defaultProfile"), Ol = /* @__PURE__ */ o((e) => Da({
  access_token: e.access_token,
  id_token: e.id_token,
  refresh_token: e.refresh_token,
  expires_at: e.expires_at,
  scope: e.scope,
  token_type: e.token_type,
  session_state: e.session_state
}), "defaultAccount");
function Da(e) {
  let t = {};
  for (let [r, n] of Object.entries(e))
    n !== void 0 && (t[r] = n);
  return t;
}
o(Da, "stripUndefined");
function Ll(e) {
  e.issuer && (e.wellKnown ??= `${e.issuer}/.well-known/openid-configuration`);
  let t = e.checks ?? ["pkce"];
  return e.redirectProxyUrl && (t.includes("state") || t.push("state"), e.redirectProxyUrl = `${e.redirectProxyUrl}/callback/${e.id}`), {
    ...e,
    checks: t,
    profile: e.profile ?? Ul,
    account: e.account ?? Ol
  };
}
o(Ll, "normalizeOAuth");
var Dl = "convexauth.mumbojumbo", Kl = `https://${Dl}`;
function $e(e, t) {
  if (!e && t)
    return;
  if (typeof e == "string")
    return { url: new URL(e) };
  let r = new URL(e?.url ?? Kl);
  if (e?.params != null)
    for (let [n, i] of Object.entries(e.params))
      r.searchParams.set(n, String(n === "claims" ? JSON.stringify(i) : i));
  return { url: r, request: e?.request, conform: e?.conform };
}
o($e, "normalizeEndpoint");
function $o(e, ...t) {
  if (!t.length)
    return e;
  let r = t.shift();
  if (No(e) && No(r))
    for (let n in r)
      No(r[n]) ? (e[n] || Object.assign(e, { [n]: {} }), $o(e[n], r[n])) : Object.assign(e, { [n]: r[n] });
  return $o(e, ...t);
}
o($o, "merge");
function No(e) {
  return e && typeof e == "object" && !Array.isArray(e);
}
o(No, "isObject");
function Ka(e, t) {
  let r = e.providers.concat(t ? e.extraProviders : []).map((n) => `\`${n.id}\``);
  return r.length > 0 ? r.join(", ") : "no providers have been configured";
}
o(Ka, "listAvailableProviders");

// node_modules/@oslojs/binary/dist/uint.js
var Wo = class {
  static {
    o(this, "BigEndian");
  }
  uint8(t, r) {
    if (t.byteLength < r + 1)
      throw new TypeError("Insufficient bytes");
    return t[r];
  }
  uint16(t, r) {
    if (t.byteLength < r + 2)
      throw new TypeError("Insufficient bytes");
    return t[r] << 8 | t[r + 1];
  }
  uint32(t, r) {
    if (t.byteLength < r + 4)
      throw new TypeError("Insufficient bytes");
    let n = 0;
    for (let i = 0; i < 4; i++)
      n |= t[r + i] << 24 - i * 8;
    return n;
  }
  uint64(t, r) {
    if (t.byteLength < r + 8)
      throw new TypeError("Insufficient bytes");
    let n = 0n;
    for (let i = 0; i < 8; i++)
      n |= BigInt(t[r + i]) << BigInt(56 - i * 8);
    return n;
  }
  putUint8(t, r, n) {
    if (t.length < n + 1)
      throw new TypeError("Not enough space");
    if (r < 0 || r > 255)
      throw new TypeError("Invalid uint8 value");
    t[n] = r;
  }
  putUint16(t, r, n) {
    if (t.length < n + 2)
      throw new TypeError("Not enough space");
    if (r < 0 || r > 65535)
      throw new TypeError("Invalid uint16 value");
    t[n] = r >> 8, t[n + 1] = r & 255;
  }
  putUint32(t, r, n) {
    if (t.length < n + 4)
      throw new TypeError("Not enough space");
    if (r < 0 || r > 4294967295)
      throw new TypeError("Invalid uint32 value");
    for (let i = 0; i < 4; i++)
      t[n + i] = r >> (3 - i) * 8 & 255;
  }
  putUint64(t, r, n) {
    if (t.length < n + 8)
      throw new TypeError("Not enough space");
    if (r < 0 || r > 18446744073709551615n)
      throw new TypeError("Invalid uint64 value");
    for (let i = 0; i < 8; i++)
      t[n + i] = Number(r >> BigInt((7 - i) * 8) & 0xffn);
  }
}, jo = class {
  static {
    o(this, "LittleEndian");
  }
  uint8(t, r) {
    if (t.byteLength < r + 1)
      throw new TypeError("Insufficient bytes");
    return t[r];
  }
  uint16(t, r) {
    if (t.byteLength < r + 2)
      throw new TypeError("Insufficient bytes");
    return t[r] | t[r + 1] << 8;
  }
  uint32(t, r) {
    if (t.byteLength < r + 4)
      throw new TypeError("Insufficient bytes");
    let n = 0;
    for (let i = 0; i < 4; i++)
      n |= t[r + i] << i * 8;
    return n;
  }
  uint64(t, r) {
    if (t.byteLength < r + 8)
      throw new TypeError("Insufficient bytes");
    let n = 0n;
    for (let i = 0; i < 8; i++)
      n |= BigInt(t[r + i]) << BigInt(i * 8);
    return n;
  }
  putUint8(t, r, n) {
    if (t.length < 1 + n)
      throw new TypeError("Insufficient space");
    if (r < 0 || r > 255)
      throw new TypeError("Invalid uint8 value");
    t[n] = r;
  }
  putUint16(t, r, n) {
    if (t.length < 2 + n)
      throw new TypeError("Insufficient space");
    if (r < 0 || r > 65535)
      throw new TypeError("Invalid uint16 value");
    t[n + 1] = r >> 8, t[n] = r & 255;
  }
  putUint32(t, r, n) {
    if (t.length < 4 + n)
      throw new TypeError("Insufficient space");
    if (r < 0 || r > 4294967295)
      throw new TypeError("Invalid uint32 value");
    for (let i = 0; i < 4; i++)
      t[n + i] = r >> i * 8 & 255;
  }
  putUint64(t, r, n) {
    if (t.length < 8 + n)
      throw new TypeError("Insufficient space");
    if (r < 0 || r > 18446744073709551615n)
      throw new TypeError("Invalid uint64 value");
    for (let i = 0; i < 8; i++)
      t[n + i] = Number(r >> BigInt(i * 8) & 0xffn);
  }
}, Ze = new Wo(), Nl = new jo();

// node_modules/@oslojs/binary/dist/bits.js
function X(e, t) {
  return (e << 32 - t | e >>> t) >>> 0;
}
o(X, "rotr32");

// node_modules/@oslojs/binary/dist/big.js
function tn(e) {
  if (e.byteLength < 1)
    throw new TypeError("Empty Uint8Array");
  let t = 0n;
  for (let r = 0; r < e.byteLength; r++)
    t += BigInt(e[r]) << BigInt((e.byteLength - 1 - r) * 8);
  return t;
}
o(tn, "bigIntFromBytes");

// node_modules/@oslojs/crypto/dist/sha2/sha224.js
var Kg = new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);

// node_modules/@oslojs/crypto/dist/sha2/sha256.js
function Jo(e) {
  let t = new rn();
  return t.update(e), t.digest();
}
o(Jo, "sha256");
var rn = class {
  static {
    o(this, "SHA256");
  }
  blockSize = 64;
  size = 32;
  blocks = new Uint8Array(64);
  currentBlockSize = 0;
  H = new Uint32Array([
    1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225
  ]);
  l = 0n;
  w = new Uint32Array(64);
  update(t) {
    if (this.l += BigInt(t.byteLength) * 8n, this.currentBlockSize + t.byteLength < 64) {
      this.blocks.set(t, this.currentBlockSize), this.currentBlockSize += t.byteLength;
      return;
    }
    let r = 0;
    if (this.currentBlockSize > 0) {
      let n = t.slice(0, 64 - this.currentBlockSize);
      this.blocks.set(n, this.currentBlockSize), this.process(), r += n.byteLength, this.currentBlockSize = 0;
    }
    for (; r + 64 <= t.byteLength; ) {
      let n = t.slice(r, r + 64);
      this.blocks.set(n), this.process(), r += 64;
    }
    if (t.byteLength - r > 0) {
      let n = t.slice(r);
      this.blocks.set(n), this.currentBlockSize = n.byteLength;
    }
  }
  digest() {
    this.blocks[this.currentBlockSize] = 128, this.currentBlockSize += 1, 64 - this.currentBlockSize < 8 && (this.blocks.fill(0, this.currentBlockSize), this.process(), this.currentBlockSize = 0), this.blocks.fill(0, this.currentBlockSize), Ze.putUint64(this.blocks, this.l, this.blockSize - 8), this.process();
    let t = new Uint8Array(32);
    for (let r = 0; r < 8; r++)
      Ze.putUint32(t, this.H[r], r * 4);
    return t;
  }
  process() {
    for (let u = 0; u < 16; u++)
      this.w[u] = (this.blocks[u * 4] << 24 | this.blocks[u * 4 + 1] << 16 | this.blocks[u * 4 + 2] << 8 | this.blocks[u * 4 + 3]) >>> 0;
    for (let u = 16; u < 64; u++) {
      let f = (X(this.w[u - 2], 17) ^ X(this.w[u - 2], 19) ^ this.w[u - 2] >>> 10) >>> 0, l = (X(this.w[u - 15], 7) ^ X(this.w[u - 15], 18) ^ this.w[u - 15] >>> 3) >>> 0;
      this.w[u] = f + this.w[u - 7] + l + this.w[u - 16] | 0;
    }
    let t = this.H[0], r = this.H[1], n = this.H[2], i = this.H[3], s = this.H[4], a = this.H[5], c = this.H[6], d = this.H[7];
    for (let u = 0; u < 64; u++) {
      let f = (X(s, 6) ^ X(s, 11) ^ X(s, 25)) >>> 0, l = (s & a ^ ~s & c) >>> 0, y = d + f + l + Hl[u] + this.w[u] | 0, p = (X(t, 2) ^ X(t, 13) ^ X(t, 22)) >>> 0, h = (t & r ^ t & n ^ r & n) >>> 0, w = p + h | 0;
      d = c, c = a, a = s, s = i + y | 0, i = n, n = r, r = t, t = y + w | 0;
    }
    this.H[0] = t + this.H[0] | 0, this.H[1] = r + this.H[1] | 0, this.H[2] = n + this.H[2] | 0, this.H[3] = i + this.H[3] | 0, this.H[4] = s + this.H[4] | 0, this.H[5] = a + this.H[5] | 0, this.H[6] = c + this.H[6] | 0, this.H[7] = d + this.H[7] | 0;
  }
}, Hl = new Uint32Array([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]);

// node_modules/@oslojs/crypto/dist/sha2/sha512.js
var zg = new BigUint64Array([
  0x428a2f98d728ae22n,
  0x7137449123ef65cdn,
  0xb5c0fbcfec4d3b2fn,
  0xe9b5dba58189dbbcn,
  0x3956c25bf348b538n,
  0x59f111f1b605d019n,
  0x923f82a4af194f9bn,
  0xab1c5ed5da6d8118n,
  0xd807aa98a3030242n,
  0x12835b0145706fben,
  0x243185be4ee4b28cn,
  0x550c7dc3d5ffb4e2n,
  0x72be5d74f27b896fn,
  0x80deb1fe3b1696b1n,
  0x9bdc06a725c71235n,
  0xc19bf174cf692694n,
  0xe49b69c19ef14ad2n,
  0xefbe4786384f25e3n,
  0x0fc19dc68b8cd5b5n,
  0x240ca1cc77ac9c65n,
  0x2de92c6f592b0275n,
  0x4a7484aa6ea6e483n,
  0x5cb0a9dcbd41fbd4n,
  0x76f988da831153b5n,
  0x983e5152ee66dfabn,
  0xa831c66d2db43210n,
  0xb00327c898fb213fn,
  0xbf597fc7beef0ee4n,
  0xc6e00bf33da88fc2n,
  0xd5a79147930aa725n,
  0x06ca6351e003826fn,
  0x142929670a0e6e70n,
  0x27b70a8546d22ffcn,
  0x2e1b21385c26c926n,
  0x4d2c6dfc5ac42aedn,
  0x53380d139d95b3dfn,
  0x650a73548baf63den,
  0x766a0abb3c77b2a8n,
  0x81c2c92e47edaee6n,
  0x92722c851482353bn,
  0xa2bfe8a14cf10364n,
  0xa81a664bbc423001n,
  0xc24b8b70d0f89791n,
  0xc76c51a30654be30n,
  0xd192e819d6ef5218n,
  0xd69906245565a910n,
  0xf40e35855771202an,
  0x106aa07032bbd1b8n,
  0x19a4c116b8d2d0c8n,
  0x1e376c085141ab53n,
  0x2748774cdf8eeb99n,
  0x34b0bcb5e19b48a8n,
  0x391c0cb3c5c95a63n,
  0x4ed8aa4ae3418acbn,
  0x5b9cca4f7763e373n,
  0x682e6ff3d6b2b8a3n,
  0x748f82ee5defb2fcn,
  0x78a5636f43172f60n,
  0x84c87814a1f0ab72n,
  0x8cc702081a6439ecn,
  0x90befffa23631e28n,
  0xa4506cebde82bde9n,
  0xbef9a3f7b2c67915n,
  0xc67178f2e372532bn,
  0xca273eceea26619cn,
  0xd186b8c721c0c207n,
  0xeada7dd6cde0eb1en,
  0xf57d4f7fee6ed178n,
  0x06f067aa72176fban,
  0x0a637dc5a2c898a6n,
  0x113f9804bef90daen,
  0x1b710b35131c471bn,
  0x28db77f523047d84n,
  0x32caab7b40c72493n,
  0x3c9ebe0a15c9bebcn,
  0x431d67c49c100d4cn,
  0x4cc5d4becb3e42b6n,
  0x597f299cfc657e2an,
  0x5fcb6fab3ad6faecn,
  0x6c44198c4a475817n
]);

// node_modules/@oslojs/encoding/dist/hex.js
function Bo(e) {
  let t = "";
  for (let r = 0; r < e.length; r++)
    t += $a[e[r] >> 4], t += $a[e[r] & 15];
  return t;
}
o(Bo, "encodeHexLowerCase");
function Wl(e) {
  if (e.length % 2 !== 0)
    throw new Error("Invalid hex string");
  let t = new Uint8Array(e.length / 2);
  for (let r = 0; r < e.length; r += 2) {
    if (!(e[r] in nn))
      throw new Error("Invalid character");
    if (!(e[r + 1] in nn))
      throw new Error("Invalid character");
    t[r / 2] |= nn[e[r]] << 4, t[r / 2] |= nn[e[r + 1]];
  }
  return t;
}
o(Wl, "decodeHex");
var $a = "0123456789abcdef", nn = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15
};

// node_modules/@oslojs/encoding/dist/base32.js
var Ha;
(function(e) {
  e[e.Include = 0] = "Include", e[e.None = 1] = "None";
})(Ha || (Ha = {}));
var Wa;
(function(e) {
  e[e.Required = 0] = "Required", e[e.Ignore = 1] = "Ignore";
})(Wa || (Wa = {}));

// node_modules/@oslojs/encoding/dist/base64.js
var ja;
(function(e) {
  e[e.Include = 0] = "Include", e[e.None = 1] = "None";
})(ja || (ja = {}));
var Ja;
(function(e) {
  e[e.Required = 0] = "Required", e[e.Ignore = 1] = "Ignore";
})(Ja || (Ja = {}));

// node_modules/@oslojs/crypto/dist/random/index.js
function jl(e, t) {
  if (t < 2)
    throw new Error("Argument 'max' must be a positive integer larger than 1");
  let r = (t - 1n).toString(2).length, n = r % 8, i = new Uint8Array(Math.ceil(r / 8));
  try {
    e.read(i);
  } catch (a) {
    throw new Error("Failed to retrieve random bytes", {
      cause: a
    });
  }
  n !== 0 && (i[0] &= (1 << n) - 1);
  let s = tn(i);
  for (; s >= t; ) {
    try {
      e.read(i);
    } catch (a) {
      throw new Error("Failed to retrieve random bytes", {
        cause: a
      });
    }
    n !== 0 && (i[0] &= (1 << n) - 1), s = tn(i);
  }
  return s;
}
o(jl, "generateRandomInteger");
function Jl(e, t) {
  if (t < 2 || t > Number.MAX_SAFE_INTEGER)
    throw new Error("Argument 'max' must be a positive integer larger than 1");
  return Number(jl(e, BigInt(t)));
}
o(Jl, "generateRandomIntegerNumber");
function Ba(e, t, r) {
  let n = "";
  for (let i = 0; i < r; i++)
    n += t[Jl(e, t.length)];
  return n;
}
o(Ba, "generateRandomString");

// node_modules/@convex-dev/auth/dist/server/implementation/utils.js
var ke = "|", zo = "|";
function on(e) {
  return e !== void 0 ? Number(e) : void 0;
}
o(on, "stringToNumber");
async function Ye(e) {
  return Bo(Jo(new TextEncoder().encode(e)));
}
o(Ye, "sha256");
function sn(e, t) {
  return Ba({
    read(n) {
      crypto.getRandomValues(n);
    }
  }, t, e);
}
o(sn, "generateRandomString");
function Vo(e) {
  g(E.ERROR, e instanceof Error ? e.message + `
` + e.stack?.replace("\\n", `
`) : e);
}
o(Vo, "logError");
var E = {
  ERROR: "ERROR",
  WARN: "WARN",
  INFO: "INFO",
  DEBUG: "DEBUG"
};
function g(e, ...t) {
  let r = E[process.env.AUTH_LOG_LEVEL ?? "INFO"] ?? "INFO";
  switch (e) {
    case "ERROR":
      console.error(...t);
      break;
    case "WARN":
      r !== "ERROR" && console.warn(...t);
      break;
    case "INFO":
      (r === "INFO" || r === "DEBUG") && console.info(...t);
      break;
    case "DEBUG":
      r === "DEBUG" && console.debug(...t);
      break;
  }
}
o(g, "logWithLevel");
var Mo = 5;
function C(e) {
  return e === "" ? "" : process.env.AUTH_LOG_SECRETS !== "true" ? e.length < Mo * 2 ? "<redacted>" : e.substring(0, Mo) + "<redacted>" + e.substring(e.length - Mo) : e;
}
o(C, "maybeRedact");

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/runtime/webcrypto.js
var Ee = crypto, Pt = /* @__PURE__ */ o((e) => e instanceof CryptoKey, "isCryptoKey");

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/lib/buffer_utils.js
var ye = new TextEncoder(), Ut = new TextDecoder(), n_ = 2 ** 32;
function Ma(...e) {
  let t = e.reduce((i, { length: s }) => i + s, 0), r = new Uint8Array(t), n = 0;
  for (let i of e)
    r.set(i, n), n += i.length;
  return r;
}
o(Ma, "concat");

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/runtime/base64url.js
var Bl = /* @__PURE__ */ o((e) => {
  let t = e;
  typeof t == "string" && (t = ye.encode(t));
  let r = 32768, n = [];
  for (let i = 0; i < t.length; i += r)
    n.push(String.fromCharCode.apply(null, t.subarray(i, i + r)));
  return btoa(n.join(""));
}, "encodeBase64"), an = /* @__PURE__ */ o((e) => Bl(e).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"), "encode"), Ml = /* @__PURE__ */ o((e) => {
  let t = atob(e), r = new Uint8Array(t.length);
  for (let n = 0; n < t.length; n++)
    r[n] = t.charCodeAt(n);
  return r;
}, "decodeBase64"), cn = /* @__PURE__ */ o((e) => {
  let t = e;
  t instanceof Uint8Array && (t = Ut.decode(t)), t = t.replace(/-/g, "+").replace(/_/g, "/").replace(/\s/g, "");
  try {
    return Ml(t);
  } catch {
    throw new TypeError("The input to be decoded is not correctly encoded.");
  }
}, "decode");

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/util/errors.js
var W = class extends Error {
  static {
    o(this, "JOSEError");
  }
  constructor(t, r) {
    super(t, r), this.code = "ERR_JOSE_GENERIC", this.name = this.constructor.name, Error.captureStackTrace?.(this, this.constructor);
  }
};
W.code = "ERR_JOSE_GENERIC";
var Fo = class extends W {
  static {
    o(this, "JWTClaimValidationFailed");
  }
  constructor(t, r, n = "unspecified", i = "unspecified") {
    super(t, { cause: { claim: n, reason: i, payload: r } }), this.code = "ERR_JWT_CLAIM_VALIDATION_FAILED", this.claim = n, this.reason = i, this.payload = r;
  }
};
Fo.code = "ERR_JWT_CLAIM_VALIDATION_FAILED";
var Go = class extends W {
  static {
    o(this, "JWTExpired");
  }
  constructor(t, r, n = "unspecified", i = "unspecified") {
    super(t, { cause: { claim: n, reason: i, payload: r } }), this.code = "ERR_JWT_EXPIRED", this.claim = n, this.reason = i, this.payload = r;
  }
};
Go.code = "ERR_JWT_EXPIRED";
var qo = class extends W {
  static {
    o(this, "JOSEAlgNotAllowed");
  }
  constructor() {
    super(...arguments), this.code = "ERR_JOSE_ALG_NOT_ALLOWED";
  }
};
qo.code = "ERR_JOSE_ALG_NOT_ALLOWED";
var B = class extends W {
  static {
    o(this, "JOSENotSupported");
  }
  constructor() {
    super(...arguments), this.code = "ERR_JOSE_NOT_SUPPORTED";
  }
};
B.code = "ERR_JOSE_NOT_SUPPORTED";
var Xo = class extends W {
  static {
    o(this, "JWEDecryptionFailed");
  }
  constructor(t = "decryption operation failed", r) {
    super(t, r), this.code = "ERR_JWE_DECRYPTION_FAILED";
  }
};
Xo.code = "ERR_JWE_DECRYPTION_FAILED";
var Zo = class extends W {
  static {
    o(this, "JWEInvalid");
  }
  constructor() {
    super(...arguments), this.code = "ERR_JWE_INVALID";
  }
};
Zo.code = "ERR_JWE_INVALID";
var we = class extends W {
  static {
    o(this, "JWSInvalid");
  }
  constructor() {
    super(...arguments), this.code = "ERR_JWS_INVALID";
  }
};
we.code = "ERR_JWS_INVALID";
var Ot = class extends W {
  static {
    o(this, "JWTInvalid");
  }
  constructor() {
    super(...arguments), this.code = "ERR_JWT_INVALID";
  }
};
Ot.code = "ERR_JWT_INVALID";
var Yo = class extends W {
  static {
    o(this, "JWKInvalid");
  }
  constructor() {
    super(...arguments), this.code = "ERR_JWK_INVALID";
  }
};
Yo.code = "ERR_JWK_INVALID";
var Qo = class extends W {
  static {
    o(this, "JWKSInvalid");
  }
  constructor() {
    super(...arguments), this.code = "ERR_JWKS_INVALID";
  }
};
Qo.code = "ERR_JWKS_INVALID";
var ei = class extends W {
  static {
    o(this, "JWKSNoMatchingKey");
  }
  constructor(t = "no applicable key found in the JSON Web Key Set", r) {
    super(t, r), this.code = "ERR_JWKS_NO_MATCHING_KEY";
  }
};
ei.code = "ERR_JWKS_NO_MATCHING_KEY";
var ti = class extends W {
  static {
    o(this, "JWKSMultipleMatchingKeys");
  }
  constructor(t = "multiple matching keys found in the JSON Web Key Set", r) {
    super(t, r), this.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
  }
};
ti.code = "ERR_JWKS_MULTIPLE_MATCHING_KEYS";
var ri = class extends W {
  static {
    o(this, "JWKSTimeout");
  }
  constructor(t = "request timed out", r) {
    super(t, r), this.code = "ERR_JWKS_TIMEOUT";
  }
};
ri.code = "ERR_JWKS_TIMEOUT";
var ni = class extends W {
  static {
    o(this, "JWSSignatureVerificationFailed");
  }
  constructor(t = "signature verification failed", r) {
    super(t, r), this.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";
  }
};
ni.code = "ERR_JWS_SIGNATURE_VERIFICATION_FAILED";

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/lib/crypto_key.js
function ue(e, t = "algorithm.name") {
  return new TypeError(`CryptoKey does not support this operation, its ${t} must be ${e}`);
}
o(ue, "unusable");
function Lt(e, t) {
  return e.name === t;
}
o(Lt, "isAlgorithm");
function oi(e) {
  return parseInt(e.name.slice(4), 10);
}
o(oi, "getHashLength");
function Vl(e) {
  switch (e) {
    case "ES256":
      return "P-256";
    case "ES384":
      return "P-384";
    case "ES512":
      return "P-521";
    default:
      throw new Error("unreachable");
  }
}
o(Vl, "getNamedCurve");
function Fl(e, t) {
  if (t.length && !t.some((r) => e.usages.includes(r))) {
    let r = "CryptoKey does not support this operation, its usages must include ";
    if (t.length > 2) {
      let n = t.pop();
      r += `one of ${t.join(", ")}, or ${n}.`;
    } else t.length === 2 ? r += `one of ${t[0]} or ${t[1]}.` : r += `${t[0]}.`;
    throw new TypeError(r);
  }
}
o(Fl, "checkUsage");
function za(e, t, ...r) {
  switch (t) {
    case "HS256":
    case "HS384":
    case "HS512": {
      if (!Lt(e.algorithm, "HMAC"))
        throw ue("HMAC");
      let n = parseInt(t.slice(2), 10);
      if (oi(e.algorithm.hash) !== n)
        throw ue(`SHA-${n}`, "algorithm.hash");
      break;
    }
    case "RS256":
    case "RS384":
    case "RS512": {
      if (!Lt(e.algorithm, "RSASSA-PKCS1-v1_5"))
        throw ue("RSASSA-PKCS1-v1_5");
      let n = parseInt(t.slice(2), 10);
      if (oi(e.algorithm.hash) !== n)
        throw ue(`SHA-${n}`, "algorithm.hash");
      break;
    }
    case "PS256":
    case "PS384":
    case "PS512": {
      if (!Lt(e.algorithm, "RSA-PSS"))
        throw ue("RSA-PSS");
      let n = parseInt(t.slice(2), 10);
      if (oi(e.algorithm.hash) !== n)
        throw ue(`SHA-${n}`, "algorithm.hash");
      break;
    }
    case "EdDSA": {
      if (e.algorithm.name !== "Ed25519" && e.algorithm.name !== "Ed448")
        throw ue("Ed25519 or Ed448");
      break;
    }
    case "Ed25519": {
      if (!Lt(e.algorithm, "Ed25519"))
        throw ue("Ed25519");
      break;
    }
    case "ES256":
    case "ES384":
    case "ES512": {
      if (!Lt(e.algorithm, "ECDSA"))
        throw ue("ECDSA");
      let n = Vl(t);
      if (e.algorithm.namedCurve !== n)
        throw ue(n, "algorithm.namedCurve");
      break;
    }
    default:
      throw new TypeError("CryptoKey does not support this operation");
  }
  Fl(e, r);
}
o(za, "checkSigCryptoKey");

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/lib/invalid_key_input.js
function Va(e, t, ...r) {
  if (r = r.filter(Boolean), r.length > 2) {
    let n = r.pop();
    e += `one of type ${r.join(", ")}, or ${n}.`;
  } else r.length === 2 ? e += `one of type ${r[0]} or ${r[1]}.` : e += `of type ${r[0]}.`;
  return t == null ? e += ` Received ${t}` : typeof t == "function" && t.name ? e += ` Received function ${t.name}` : typeof t == "object" && t != null && t.constructor?.name && (e += ` Received an instance of ${t.constructor.name}`), e;
}
o(Va, "message");
var ii = /* @__PURE__ */ o((e, ...t) => Va("Key must be ", e, ...t), "default");
function si(e, t, ...r) {
  return Va(`Key for the ${e} algorithm must be `, t, ...r);
}
o(si, "withAlg");

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/runtime/is_key_like.js
var ai = /* @__PURE__ */ o((e) => Pt(e) ? !0 : e?.[Symbol.toStringTag] === "KeyObject", "default"), Qe = ["CryptoKey"];

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/lib/is_disjoint.js
var Gl = /* @__PURE__ */ o((...e) => {
  let t = e.filter(Boolean);
  if (t.length === 0 || t.length === 1)
    return !0;
  let r;
  for (let n of t) {
    let i = Object.keys(n);
    if (!r || r.size === 0) {
      r = new Set(i);
      continue;
    }
    for (let s of i) {
      if (r.has(s))
        return !1;
      r.add(s);
    }
  }
  return !0;
}, "isDisjoint"), Fa = Gl;

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/lib/is_object.js
function ql(e) {
  return typeof e == "object" && e !== null;
}
o(ql, "isObjectLike");
function Dt(e) {
  if (!ql(e) || Object.prototype.toString.call(e) !== "[object Object]")
    return !1;
  if (Object.getPrototypeOf(e) === null)
    return !0;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t;
}
o(Dt, "isObject");

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/runtime/check_key_length.js
var Ga = /* @__PURE__ */ o((e, t) => {
  if (e.startsWith("RS") || e.startsWith("PS")) {
    let { modulusLength: r } = t.algorithm;
    if (typeof r != "number" || r < 2048)
      throw new TypeError(`${e} requires key modulusLength to be 2048 bits or larger`);
  }
}, "default");

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/lib/is_jwk.js
function He(e) {
  return Dt(e) && typeof e.kty == "string";
}
o(He, "isJWK");
function qa(e) {
  return e.kty !== "oct" && typeof e.d == "string";
}
o(qa, "isPrivateJWK");
function Xa(e) {
  return e.kty !== "oct" && typeof e.d > "u";
}
o(Xa, "isPublicJWK");
function Za(e) {
  return He(e) && e.kty === "oct" && typeof e.k == "string";
}
o(Za, "isSecretJWK");

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/runtime/jwk_to_key.js
function Zl(e) {
  let t, r;
  switch (e.kty) {
    case "RSA": {
      switch (e.alg) {
        case "PS256":
        case "PS384":
        case "PS512":
          t = { name: "RSA-PSS", hash: `SHA-${e.alg.slice(-3)}` }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "RS256":
        case "RS384":
        case "RS512":
          t = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${e.alg.slice(-3)}` }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "RSA-OAEP":
        case "RSA-OAEP-256":
        case "RSA-OAEP-384":
        case "RSA-OAEP-512":
          t = {
            name: "RSA-OAEP",
            hash: `SHA-${parseInt(e.alg.slice(-3), 10) || 1}`
          }, r = e.d ? ["decrypt", "unwrapKey"] : ["encrypt", "wrapKey"];
          break;
        default:
          throw new B('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "EC": {
      switch (e.alg) {
        case "ES256":
          t = { name: "ECDSA", namedCurve: "P-256" }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "ES384":
          t = { name: "ECDSA", namedCurve: "P-384" }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "ES512":
          t = { name: "ECDSA", namedCurve: "P-521" }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          t = { name: "ECDH", namedCurve: e.crv }, r = e.d ? ["deriveBits"] : [];
          break;
        default:
          throw new B('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    case "OKP": {
      switch (e.alg) {
        case "Ed25519":
          t = { name: "Ed25519" }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "EdDSA":
          t = { name: e.crv }, r = e.d ? ["sign"] : ["verify"];
          break;
        case "ECDH-ES":
        case "ECDH-ES+A128KW":
        case "ECDH-ES+A192KW":
        case "ECDH-ES+A256KW":
          t = { name: e.crv }, r = e.d ? ["deriveBits"] : [];
          break;
        default:
          throw new B('Invalid or unsupported JWK "alg" (Algorithm) Parameter value');
      }
      break;
    }
    default:
      throw new B('Invalid or unsupported JWK "kty" (Key Type) Parameter value');
  }
  return { algorithm: t, keyUsages: r };
}
o(Zl, "subtleMapping");
var Yl = /* @__PURE__ */ o(async (e) => {
  if (!e.alg)
    throw new TypeError('"alg" argument is required when "jwk.alg" is not present');
  let { algorithm: t, keyUsages: r } = Zl(e), n = [
    t,
    e.ext ?? !1,
    e.key_ops ?? r
  ], i = { ...e };
  return delete i.alg, delete i.use, Ee.subtle.importKey("jwk", i, ...n);
}, "parse"), Ya = Yl;

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/runtime/normalize_key.js
var Qa = /* @__PURE__ */ o((e) => cn(e), "exportKeyValue"), et, tt, ec = /* @__PURE__ */ o((e) => e?.[Symbol.toStringTag] === "KeyObject", "isKeyObject"), un = /* @__PURE__ */ o(async (e, t, r, n, i = !1) => {
  let s = e.get(t);
  if (s?.[n])
    return s[n];
  let a = await Ya({ ...r, alg: n });
  return i && Object.freeze(t), s ? s[n] = a : e.set(t, { [n]: a }), a;
}, "importAndCache"), Ql = /* @__PURE__ */ o((e, t) => {
  if (ec(e)) {
    let r = e.export({ format: "jwk" });
    return delete r.d, delete r.dp, delete r.dq, delete r.p, delete r.q, delete r.qi, r.k ? Qa(r.k) : (tt || (tt = /* @__PURE__ */ new WeakMap()), un(tt, e, r, t));
  }
  return He(e) ? e.k ? cn(e.k) : (tt || (tt = /* @__PURE__ */ new WeakMap()), un(tt, e, e, t, !0)) : e;
}, "normalizePublicKey"), ef = /* @__PURE__ */ o((e, t) => {
  if (ec(e)) {
    let r = e.export({ format: "jwk" });
    return r.k ? Qa(r.k) : (et || (et = /* @__PURE__ */ new WeakMap()), un(et, e, r, t));
  }
  return He(e) ? e.k ? cn(e.k) : (et || (et = /* @__PURE__ */ new WeakMap()), un(et, e, e, t, !0)) : e;
}, "normalizePrivateKey"), ci = { normalizePublicKey: Ql, normalizePrivateKey: ef };

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/runtime/asn1.js
var Ae = /* @__PURE__ */ o((e, t, r = 0) => {
  r === 0 && (t.unshift(t.length), t.unshift(6));
  let n = e.indexOf(t[0], r);
  if (n === -1)
    return !1;
  let i = e.subarray(n, n + t.length);
  return i.length !== t.length ? !1 : i.every((s, a) => s === t[a]) || Ae(e, t, n + 1);
}, "findOid"), tc = /* @__PURE__ */ o((e) => {
  switch (!0) {
    case Ae(e, [42, 134, 72, 206, 61, 3, 1, 7]):
      return "P-256";
    case Ae(e, [43, 129, 4, 0, 34]):
      return "P-384";
    case Ae(e, [43, 129, 4, 0, 35]):
      return "P-521";
    case Ae(e, [43, 101, 110]):
      return "X25519";
    case Ae(e, [43, 101, 111]):
      return "X448";
    case Ae(e, [43, 101, 112]):
      return "Ed25519";
    case Ae(e, [43, 101, 113]):
      return "Ed448";
    default:
      throw new B("Invalid or unsupported EC Key Curve or OKP Key Sub Type");
  }
}, "getNamedCurve"), tf = /* @__PURE__ */ o(async (e, t, r, n, i) => {
  let s, a, c = new Uint8Array(atob(r.replace(e, "")).split("").map((u) => u.charCodeAt(0))), d = t === "spki";
  switch (n) {
    case "PS256":
    case "PS384":
    case "PS512":
      s = { name: "RSA-PSS", hash: `SHA-${n.slice(-3)}` }, a = d ? ["verify"] : ["sign"];
      break;
    case "RS256":
    case "RS384":
    case "RS512":
      s = { name: "RSASSA-PKCS1-v1_5", hash: `SHA-${n.slice(-3)}` }, a = d ? ["verify"] : ["sign"];
      break;
    case "RSA-OAEP":
    case "RSA-OAEP-256":
    case "RSA-OAEP-384":
    case "RSA-OAEP-512":
      s = {
        name: "RSA-OAEP",
        hash: `SHA-${parseInt(n.slice(-3), 10) || 1}`
      }, a = d ? ["encrypt", "wrapKey"] : ["decrypt", "unwrapKey"];
      break;
    case "ES256":
      s = { name: "ECDSA", namedCurve: "P-256" }, a = d ? ["verify"] : ["sign"];
      break;
    case "ES384":
      s = { name: "ECDSA", namedCurve: "P-384" }, a = d ? ["verify"] : ["sign"];
      break;
    case "ES512":
      s = { name: "ECDSA", namedCurve: "P-521" }, a = d ? ["verify"] : ["sign"];
      break;
    case "ECDH-ES":
    case "ECDH-ES+A128KW":
    case "ECDH-ES+A192KW":
    case "ECDH-ES+A256KW": {
      let u = tc(c);
      s = u.startsWith("P-") ? { name: "ECDH", namedCurve: u } : { name: u }, a = d ? [] : ["deriveBits"];
      break;
    }
    case "Ed25519":
      s = { name: "Ed25519" }, a = d ? ["verify"] : ["sign"];
      break;
    case "EdDSA":
      s = { name: tc(c) }, a = d ? ["verify"] : ["sign"];
      break;
    default:
      throw new B('Invalid or unsupported "alg" (Algorithm) value');
  }
  return Ee.subtle.importKey(t, c, s, i?.extractable ?? !1, a);
}, "genericImport"), rc = /* @__PURE__ */ o((e, t, r) => tf(/(?:-----(?:BEGIN|END) PRIVATE KEY-----|\s)/g, "pkcs8", e, t, r), "fromPKCS8");

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/key/import.js
async function ui(e, t, r) {
  if (typeof e != "string" || e.indexOf("-----BEGIN PRIVATE KEY-----") !== 0)
    throw new TypeError('"pkcs8" must be PKCS#8 formatted string');
  return rc(e, t, r);
}
o(ui, "importPKCS8");

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/lib/check_key_type.js
var rt = /* @__PURE__ */ o((e) => e?.[Symbol.toStringTag], "tag"), di = /* @__PURE__ */ o((e, t, r) => {
  if (t.use !== void 0 && t.use !== "sig")
    throw new TypeError("Invalid key for this operation, when present its use must be sig");
  if (t.key_ops !== void 0 && t.key_ops.includes?.(r) !== !0)
    throw new TypeError(`Invalid key for this operation, when present its key_ops must include ${r}`);
  if (t.alg !== void 0 && t.alg !== e)
    throw new TypeError(`Invalid key for this operation, when present its alg must be ${e}`);
  return !0;
}, "jwkMatchesOp"), rf = /* @__PURE__ */ o((e, t, r, n) => {
  if (!(t instanceof Uint8Array)) {
    if (n && He(t)) {
      if (Za(t) && di(e, t, r))
        return;
      throw new TypeError('JSON Web Key for symmetric algorithms must have JWK "kty" (Key Type) equal to "oct" and the JWK "k" (Key Value) present');
    }
    if (!ai(t))
      throw new TypeError(si(e, t, ...Qe, "Uint8Array", n ? "JSON Web Key" : null));
    if (t.type !== "secret")
      throw new TypeError(`${rt(t)} instances for symmetric algorithms must be of type "secret"`);
  }
}, "symmetricTypeCheck"), nf = /* @__PURE__ */ o((e, t, r, n) => {
  if (n && He(t))
    switch (r) {
      case "sign":
        if (qa(t) && di(e, t, r))
          return;
        throw new TypeError("JSON Web Key for this operation be a private JWK");
      case "verify":
        if (Xa(t) && di(e, t, r))
          return;
        throw new TypeError("JSON Web Key for this operation be a public JWK");
    }
  if (!ai(t))
    throw new TypeError(si(e, t, ...Qe, n ? "JSON Web Key" : null));
  if (t.type === "secret")
    throw new TypeError(`${rt(t)} instances for asymmetric algorithms must not be of type "secret"`);
  if (r === "sign" && t.type === "public")
    throw new TypeError(`${rt(t)} instances for asymmetric algorithm signing must be of type "private"`);
  if (r === "decrypt" && t.type === "public")
    throw new TypeError(`${rt(t)} instances for asymmetric algorithm decryption must be of type "private"`);
  if (t.algorithm && r === "verify" && t.type === "private")
    throw new TypeError(`${rt(t)} instances for asymmetric algorithm verifying must be of type "public"`);
  if (t.algorithm && r === "encrypt" && t.type === "private")
    throw new TypeError(`${rt(t)} instances for asymmetric algorithm encryption must be of type "public"`);
}, "asymmetricTypeCheck");
function nc(e, t, r, n) {
  t.startsWith("HS") || t === "dir" || t.startsWith("PBES2") || /^A\d{3}(?:GCM)?KW$/.test(t) ? rf(t, r, n, e) : nf(t, r, n, e);
}
o(nc, "checkKeyType");
var z_ = nc.bind(void 0, !1), oc = nc.bind(void 0, !0);

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/lib/validate_crit.js
function of(e, t, r, n, i) {
  if (i.crit !== void 0 && n?.crit === void 0)
    throw new e('"crit" (Critical) Header Parameter MUST be integrity protected');
  if (!n || n.crit === void 0)
    return /* @__PURE__ */ new Set();
  if (!Array.isArray(n.crit) || n.crit.length === 0 || n.crit.some((a) => typeof a != "string" || a.length === 0))
    throw new e('"crit" (Critical) Header Parameter MUST be an array of non-empty strings when present');
  let s;
  r !== void 0 ? s = new Map([...Object.entries(r), ...t.entries()]) : s = t;
  for (let a of n.crit) {
    if (!s.has(a))
      throw new B(`Extension Header Parameter "${a}" is not recognized`);
    if (i[a] === void 0)
      throw new e(`Extension Header Parameter "${a}" is missing`);
    if (s.get(a) && n[a] === void 0)
      throw new e(`Extension Header Parameter "${a}" MUST be integrity protected`);
  }
  return new Set(n.crit);
}
o(of, "validateCrit");
var ic = of;

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/runtime/subtle_dsa.js
function li(e, t) {
  let r = `SHA-${e.slice(-3)}`;
  switch (e) {
    case "HS256":
    case "HS384":
    case "HS512":
      return { hash: r, name: "HMAC" };
    case "PS256":
    case "PS384":
    case "PS512":
      return { hash: r, name: "RSA-PSS", saltLength: e.slice(-3) >> 3 };
    case "RS256":
    case "RS384":
    case "RS512":
      return { hash: r, name: "RSASSA-PKCS1-v1_5" };
    case "ES256":
    case "ES384":
    case "ES512":
      return { hash: r, name: "ECDSA", namedCurve: t.namedCurve };
    case "Ed25519":
      return { name: "Ed25519" };
    case "EdDSA":
      return { name: t.name };
    default:
      throw new B(`alg ${e} is not supported either by JOSE or your javascript runtime`);
  }
}
o(li, "subtleDsa");

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/runtime/get_sign_verify_key.js
async function fi(e, t, r) {
  if (r === "sign" && (t = await ci.normalizePrivateKey(t, e)), r === "verify" && (t = await ci.normalizePublicKey(t, e)), Pt(t))
    return za(t, e, r), t;
  if (t instanceof Uint8Array) {
    if (!e.startsWith("HS"))
      throw new TypeError(ii(t, ...Qe));
    return Ee.subtle.importKey("raw", t, { hash: `SHA-${e.slice(-3)}`, name: "HMAC" }, !1, [r]);
  }
  throw new TypeError(ii(t, ...Qe, "Uint8Array", "JSON Web Key"));
}
o(fi, "getCryptoKey");

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/lib/epoch.js
var Ie = /* @__PURE__ */ o((e) => Math.floor(e.getTime() / 1e3), "default");

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/lib/secs.js
var sf = /^(\+|\-)? ?(\d+|\d+\.\d+) ?(seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)(?: (ago|from now))?$/i, dn = /* @__PURE__ */ o((e) => {
  let t = sf.exec(e);
  if (!t || t[4] && t[1])
    throw new TypeError("Invalid time period format");
  let r = parseFloat(t[2]), n = t[3].toLowerCase(), i;
  switch (n) {
    case "sec":
    case "secs":
    case "second":
    case "seconds":
    case "s":
      i = Math.round(r);
      break;
    case "minute":
    case "minutes":
    case "min":
    case "mins":
    case "m":
      i = Math.round(r * 60);
      break;
    case "hour":
    case "hours":
    case "hr":
    case "hrs":
    case "h":
      i = Math.round(r * 3600);
      break;
    case "day":
    case "days":
    case "d":
      i = Math.round(r * 86400);
      break;
    case "week":
    case "weeks":
    case "w":
      i = Math.round(r * 604800);
      break;
    default:
      i = Math.round(r * 31557600);
      break;
  }
  return t[1] === "-" || t[4] === "ago" ? -i : i;
}, "default");

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/runtime/sign.js
var af = /* @__PURE__ */ o(async (e, t, r) => {
  let n = await fi(e, t, "sign");
  Ga(e, n);
  let i = await Ee.subtle.sign(li(e, n.algorithm), n, r);
  return new Uint8Array(i);
}, "sign"), sc = af;

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/jws/flattened/sign.js
var ln = class {
  static {
    o(this, "FlattenedSign");
  }
  constructor(t) {
    if (!(t instanceof Uint8Array))
      throw new TypeError("payload must be an instance of Uint8Array");
    this._payload = t;
  }
  setProtectedHeader(t) {
    if (this._protectedHeader)
      throw new TypeError("setProtectedHeader can only be called once");
    return this._protectedHeader = t, this;
  }
  setUnprotectedHeader(t) {
    if (this._unprotectedHeader)
      throw new TypeError("setUnprotectedHeader can only be called once");
    return this._unprotectedHeader = t, this;
  }
  async sign(t, r) {
    if (!this._protectedHeader && !this._unprotectedHeader)
      throw new we("either setProtectedHeader or setUnprotectedHeader must be called before #sign()");
    if (!Fa(this._protectedHeader, this._unprotectedHeader))
      throw new we("JWS Protected and JWS Unprotected Header Parameter names must be disjoint");
    let n = {
      ...this._protectedHeader,
      ...this._unprotectedHeader
    }, i = ic(we, /* @__PURE__ */ new Map([["b64", !0]]), r?.crit, this._protectedHeader, n), s = !0;
    if (i.has("b64") && (s = this._protectedHeader.b64, typeof s != "boolean"))
      throw new we('The "b64" (base64url-encode payload) Header Parameter must be a boolean');
    let { alg: a } = n;
    if (typeof a != "string" || !a)
      throw new we('JWS "alg" (Algorithm) Header Parameter missing or invalid');
    oc(a, t, "sign");
    let c = this._payload;
    s && (c = ye.encode(an(c)));
    let d;
    this._protectedHeader ? d = ye.encode(an(JSON.stringify(this._protectedHeader))) : d = ye.encode("");
    let u = Ma(d, ye.encode("."), c), f = await sc(a, t, u), l = {
      signature: an(f),
      payload: ""
    };
    return s && (l.payload = Ut.decode(c)), this._unprotectedHeader && (l.header = this._unprotectedHeader), this._protectedHeader && (l.protected = Ut.decode(d)), l;
  }
};

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/jws/compact/sign.js
var fn = class {
  static {
    o(this, "CompactSign");
  }
  constructor(t) {
    this._flattened = new ln(t);
  }
  setProtectedHeader(t) {
    return this._flattened.setProtectedHeader(t), this;
  }
  async sign(t, r) {
    let n = await this._flattened.sign(t, r);
    if (n.payload === void 0)
      throw new TypeError("use the flattened module for creating JWS with b64: false");
    return `${n.protected}.${n.payload}.${n.signature}`;
  }
};

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/jwt/produce.js
function We(e, t) {
  if (!Number.isFinite(t))
    throw new TypeError(`Invalid ${e} input`);
  return t;
}
o(We, "validateInput");
var pn = class {
  static {
    o(this, "ProduceJWT");
  }
  constructor(t = {}) {
    if (!Dt(t))
      throw new TypeError("JWT Claims Set MUST be an object");
    this._payload = t;
  }
  setIssuer(t) {
    return this._payload = { ...this._payload, iss: t }, this;
  }
  setSubject(t) {
    return this._payload = { ...this._payload, sub: t }, this;
  }
  setAudience(t) {
    return this._payload = { ...this._payload, aud: t }, this;
  }
  setJti(t) {
    return this._payload = { ...this._payload, jti: t }, this;
  }
  setNotBefore(t) {
    return typeof t == "number" ? this._payload = { ...this._payload, nbf: We("setNotBefore", t) } : t instanceof Date ? this._payload = { ...this._payload, nbf: We("setNotBefore", Ie(t)) } : this._payload = { ...this._payload, nbf: Ie(/* @__PURE__ */ new Date()) + dn(t) }, this;
  }
  setExpirationTime(t) {
    return typeof t == "number" ? this._payload = { ...this._payload, exp: We("setExpirationTime", t) } : t instanceof Date ? this._payload = { ...this._payload, exp: We("setExpirationTime", Ie(t)) } : this._payload = { ...this._payload, exp: Ie(/* @__PURE__ */ new Date()) + dn(t) }, this;
  }
  setIssuedAt(t) {
    return typeof t > "u" ? this._payload = { ...this._payload, iat: Ie(/* @__PURE__ */ new Date()) } : t instanceof Date ? this._payload = { ...this._payload, iat: We("setIssuedAt", Ie(t)) } : typeof t == "string" ? this._payload = {
      ...this._payload,
      iat: We("setIssuedAt", Ie(/* @__PURE__ */ new Date()) + dn(t))
    } : this._payload = { ...this._payload, iat: We("setIssuedAt", t) }, this;
  }
};

// node_modules/@convex-dev/auth/node_modules/jose/dist/browser/jwt/sign.js
var Kt = class extends pn {
  static {
    o(this, "SignJWT");
  }
  setProtectedHeader(t) {
    return this._protectedHeader = t, this;
  }
  async sign(t, r) {
    let n = new fn(ye.encode(JSON.stringify(this._payload)));
    if (n.setProtectedHeader(this._protectedHeader), Array.isArray(this._protectedHeader?.crit) && this._protectedHeader.crit.includes("b64") && this._protectedHeader.b64 === !1)
      throw new Ot("JWTs MUST NOT use unencoded payload");
    return n.sign(t, r);
  }
};

// node_modules/@convex-dev/auth/dist/server/implementation/tokens.js
var cf = 1e3 * 60 * 60, uf = /* @__PURE__ */ new Set(["sub", "iss", "aud", "iat", "exp", "nbf", "jti"]);
async function ac(e, t, r) {
  let n = await ui(z("JWT_PRIVATE_KEY"), "RS256"), i = new Date(Date.now() + (r.jwt?.durationMs ?? cf)), s = {};
  if (r.jwt?.customClaims) {
    let a = await r.jwt.customClaims(e, {
      userId: t.userId,
      sessionId: t.sessionId
    });
    for (let [c, d] of Object.entries(a)) {
      if (uf.has(c))
        throw new Error(`Reserved claim "${c}" in custom claims`);
      s[c] = d;
    }
  }
  return await new Kt({
    ...s,
    sub: t.userId + ke + t.sessionId
  }).setProtectedHeader({ alg: "RS256" }).setIssuedAt().setIssuer(z("CONVEX_SITE_URL")).setAudience("convex").setExpirationTime(i).sign(n);
}
o(ac, "generateToken");

// node_modules/@convex-dev/auth/dist/server/implementation/refreshTokens.js
var df = 1e3 * 60 * 60 * 24 * 30, hn = 10 * 1e3;
async function cc(e, t, r, n) {
  let i = Date.now() + (t.session?.inactiveDurationMs ?? on(process.env.AUTH_SESSION_INACTIVE_DURATION_MS) ?? df);
  return await e.db.insert("authRefreshTokens", {
    sessionId: r,
    expirationTime: i,
    parentRefreshTokenId: n ?? void 0
  });
}
o(cc, "createRefreshToken");
var uc = /* @__PURE__ */ o((e, t) => `${e}${zo}${t}`, "formatRefreshToken"), mn = /* @__PURE__ */ o((e) => {
  let [t, r] = e.split(zo);
  if (!t || !r)
    throw new Error(`Can't parse refresh token: ${C(e)}`);
  return { refreshTokenId: t, sessionId: r };
}, "parseRefreshToken");
async function dc(e, t) {
  let r = [t], n = [t._id];
  for (; n.length > 0; ) {
    let i = [];
    for (let s of n) {
      let a = await e.db.query("authRefreshTokens").withIndex("sessionIdAndParentRefreshTokenId", (c) => c.eq("sessionId", t.sessionId).eq("parentRefreshTokenId", s)).collect();
      r.push(...a), i.push(...a.map((c) => c._id));
    }
    n = i;
  }
  for (let i of r)
    (i.firstUsedTime === void 0 || i.firstUsedTime > Date.now() - hn) && await e.db.patch(i._id, {
      firstUsedTime: Date.now() - hn
    });
  return r;
}
o(dc, "invalidateRefreshTokensInSubtree");
async function yn(e, t) {
  let r = await e.db.query("authRefreshTokens").withIndex("sessionIdAndParentRefreshTokenId", (n) => n.eq("sessionId", t)).collect();
  for (let n of r)
    await e.db.delete(n._id);
}
o(yn, "deleteAllRefreshTokens");
async function lc(e, t, r) {
  let n = await e.db.get(t);
  if (n === null)
    return g(E.INFO, "Invalid refresh token"), null;
  if (n.expirationTime < Date.now())
    return g(E.INFO, "Expired refresh token"), null;
  if (n.sessionId !== r)
    return g(E.WARN, "Invalid refresh token session ID"), null;
  let i = await e.db.get(n.sessionId);
  return i === null ? (g(E.INFO, "Invalid refresh token session"), null) : i.expirationTime < Date.now() ? (g(E.INFO, "Expired refresh token session"), null) : { session: i, refreshTokenDoc: n };
}
o(lc, "refreshTokenIfValid");
async function fc(e, t) {
  return e.db.query("authRefreshTokens").withIndex("sessionId", (r) => r.eq("sessionId", t)).filter((r) => r.eq(r.field("firstUsedTime"), void 0)).order("desc").first();
}
o(fc, "loadActiveRefreshToken");

// node_modules/@convex-dev/auth/dist/server/implementation/sessions.js
var lf = 1e3 * 60 * 60 * 24 * 30;
async function wn(e, t, r, n, i) {
  return {
    userId: r,
    sessionId: n,
    tokens: i ? await Nt(e, t, {
      userId: r,
      sessionId: n,
      issuedRefreshTokenId: null,
      parentRefreshTokenId: null
    }) : null
  };
}
o(wn, "maybeGenerateTokensForSession");
async function gn(e, t, r) {
  let n = await Y(e);
  if (n !== null) {
    let i = await e.db.get(n);
    i !== null && await $t(e, i);
  }
  return await ff(e, r, t);
}
o(gn, "createNewAndDeleteExistingSession");
async function Nt(e, t, r) {
  let n = { userId: r.userId, sessionId: r.sessionId }, i = r.issuedRefreshTokenId ?? await cc(e, t, r.sessionId, r.parentRefreshTokenId), s = {
    token: await ac(e, n, t),
    refreshToken: uc(i, r.sessionId)
  };
  return g(E.DEBUG, `Generated token ${C(s.token)} and refresh token ${C(i)} for session ${C(r.sessionId)}`), s;
}
o(Nt, "generateTokensForSession");
async function ff(e, t, r) {
  await r.callbacks?.beforeSessionCreation?.(e, { userId: t });
  let n = Date.now() + (r.session?.totalDurationMs ?? on(process.env.AUTH_SESSION_TOTAL_DURATION_MS) ?? lf);
  return await e.db.insert("authSessions", { expirationTime: n, userId: t });
}
o(ff, "createSession");
async function $t(e, t) {
  await e.db.delete(t._id), await yn(e, t._id);
}
o($t, "deleteSession");
async function Y(e) {
  let t = await e.auth.getUserIdentity();
  if (t === null)
    return null;
  let [, r] = t.subject.split(ke);
  return r;
}
o(Y, "getAuthSessionId");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/signIn.js
var pc = m.object({
  userId: m.id("users"),
  sessionId: m.optional(m.id("authSessions")),
  generateTokens: m.boolean()
});
async function hc(e, t, r) {
  g(E.DEBUG, "signInImpl args:", t);
  let { userId: n, sessionId: i, generateTokens: s } = t, a = i ?? await gn(e, r, n);
  return await wn(e, r, n, a, s);
}
o(hc, "signInImpl");
var pi = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "signIn",
    ...t
  }
}), "callSignIn");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/signOut.js
async function mc(e) {
  let t = await Y(e);
  if (t !== null) {
    let r = await e.db.get(t);
    if (r !== null)
      return await $t(e, r), { userId: r.userId, sessionId: r._id };
  }
  return null;
}
o(mc, "signOutImpl");
var hi = /* @__PURE__ */ o(async (e) => e.runMutation("auth:store", {
  args: {
    type: "signOut"
  }
}), "callSignOut");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/refreshSession.js
var yc = m.object({
  refreshToken: m.string()
});
async function wc(e, t, r, n) {
  let { refreshToken: i } = t, { refreshTokenId: s, sessionId: a } = mn(i);
  g("DEBUG", `refreshSessionImpl args: Token ID: ${C(s)} Session ID: ${C(a)}`);
  let c = e.db.normalizeId("authRefreshTokens", s), d = e.db.normalizeId("authSessions", a);
  if (c === null || d === null)
    return g("INFO", "Invalid refresh token"), null;
  let u = await lc(e, c, d);
  if (u === null) {
    let w = await e.db.get(d);
    return w !== null && await e.db.delete(w._id), await yn(e, d), null;
  }
  let { session: f } = u, l = f._id, y = f.userId, p = u.refreshTokenDoc.firstUsedTime;
  if (p === void 0) {
    await e.db.patch(c, {
      firstUsedTime: Date.now()
    });
    let w = await Nt(e, n, {
      userId: y,
      sessionId: l,
      issuedRefreshTokenId: null,
      parentRefreshTokenId: c
    }), { refreshTokenId: v } = mn(w.refreshToken);
    return g("DEBUG", `Exchanged ${C(u.refreshTokenDoc._id)} (first use) for new refresh token ${C(v)}`), w;
  }
  let h = await fc(e, d);
  if (g("DEBUG", `Active refresh token: ${C(h?._id ?? "(none)")}, parent ${C(h?.parentRefreshTokenId ?? "(none)")}`), h !== null && h.parentRefreshTokenId === c)
    return g("DEBUG", `Token ${C(u.refreshTokenDoc._id)} is parent of active refresh token ${C(h._id)}, so returning that token`), await Nt(e, n, {
      userId: y,
      sessionId: l,
      issuedRefreshTokenId: h._id,
      parentRefreshTokenId: c
    });
  if (p + hn > Date.now()) {
    let w = await Nt(e, n, {
      userId: y,
      sessionId: l,
      issuedRefreshTokenId: null,
      parentRefreshTokenId: c
    }), { refreshTokenId: v } = mn(w.refreshToken);
    return g("DEBUG", `Exchanged ${C(u.refreshTokenDoc._id)} (reuse) for new refresh token ${C(v)}`), w;
  } else {
    g("WARN", "Refresh token used outside of reuse window"), g("DEBUG", `Token ${C(u.refreshTokenDoc._id)} being used outside of reuse window, so invalidating all refresh tokens in subtree`);
    let w = await dc(e, u.refreshTokenDoc);
    return g("DEBUG", `Invalidated ${w.length} refresh tokens in subtree: ${w.map((v) => C(v._id)).join(", ")}`), null;
  }
}
o(wc, "refreshSessionImpl");
var mi = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "refreshSession",
    ...t
  }
}), "callRefreshSession");

// node_modules/@convex-dev/auth/dist/server/implementation/rateLimit.js
async function bn(e, t, r) {
  let n = await gc(e, t, r);
  return n === null ? !1 : n.attempsLeft < 1;
}
o(bn, "isSignInRateLimited");
async function _n(e, t, r) {
  let n = await gc(e, t, r);
  if (n !== null)
    await e.db.patch(n.limit._id, {
      attemptsLeft: n.attempsLeft - 1,
      lastAttemptTime: Date.now()
    });
  else {
    let i = bc(r);
    await e.db.insert("authRateLimits", {
      identifier: t,
      attemptsLeft: i - 1,
      lastAttemptTime: Date.now()
    });
  }
}
o(_n, "recordFailedSignIn");
async function xn(e, t) {
  let r = await e.db.query("authRateLimits").withIndex("identifier", (n) => n.eq("identifier", t)).unique();
  r !== null && await e.db.delete(r._id);
}
o(xn, "resetSignInRateLimit");
async function gc(e, t, r) {
  let n = Date.now(), i = bc(r), s = await e.db.query("authRateLimits").withIndex("identifier", (u) => u.eq("identifier", t)).unique();
  if (s === null)
    return null;
  let a = n - s.lastAttemptTime, c = i / (3600 * 1e3), d = Math.min(i, s.attemptsLeft + a * c);
  return { limit: s, attempsLeft: d };
}
o(gc, "getRateLimitState");
function bc(e) {
  return e.signIn?.maxFailedAttempsPerHour ?? 10;
}
o(bc, "configuredMaxAttempsPerHour");

// node_modules/@convex-dev/auth/dist/server/implementation/provider.js
async function vn(e, t) {
  if (e.type !== "credentials")
    throw new Error(`Provider ${e.id} is not a credentials provider`);
  let r = e.crypto?.hashSecret;
  if (r === void 0)
    throw new Error(`Provider ${e.id} does not have a \`crypto.hashSecret\` function`);
  return await r(t);
}
o(vn, "hash");
async function Sn(e, t, r) {
  if (e.type !== "credentials")
    throw new Error(`Provider ${e.id} is not a credentials provider`);
  let n = e.crypto?.verifySecret;
  if (n === void 0)
    throw new Error(`Provider ${e.id} does not have a \`crypto.verifySecret\` function`);
  return await n(t, r);
}
o(Sn, "verify");
function yi(e, t, r) {
  try {
    return e(t, r);
  } catch {
    return null;
  }
}
o(yi, "getProviderOrNull");

// node_modules/@convex-dev/auth/dist/server/implementation/users.js
async function Te(e, t, r, n, i) {
  let s = await pf(e, t, "existingAccount" in r ? r.existingAccount : null, n, i), a = await yf(e, s, r, n);
  return { userId: s, accountId: a };
}
o(Te, "upsertUserAndAccount");
async function pf(e, t, r, n, i) {
  g(E.DEBUG, "defaultCreateOrUpdateUser args:", {
    existingAccountId: r?._id,
    existingSessionId: t,
    args: { ...n, provider: n.provider.id }
  });
  let s = r?.userId ?? null;
  if (i.callbacks?.createOrUpdateUser !== void 0)
    return g(E.DEBUG, "Using custom createOrUpdateUser callback"), await i.callbacks.createOrUpdateUser(e, {
      existingUserId: s,
      ...n
    });
  let { provider: a, profile: { emailVerified: c, phoneVerified: d, ...u } } = n, f = c ?? ((a.type === "oauth" || a.type === "oidc") && a.allowDangerousEmailAccountLinking !== !1), l = d ?? !1, y = n.shouldLinkViaEmail || f || a.type === "email", p = n.shouldLinkViaPhone || l || a.type === "phone", h = s;
  if (s === null) {
    let b = typeof u.email == "string" && y ? (await hf(e, u.email))?._id ?? null : null, S = typeof u.phone == "string" && p ? (await mf(e, u.phone))?._id ?? null : null;
    b !== null && S !== null ? (g(E.DEBUG, `Found existing email and phone verified users, so not linking: email: ${b}, phone: ${S}`), h = null) : b !== null ? (g(E.DEBUG, `Found existing email verified user, linking: ${b}`), h = b) : S !== null ? (g(E.DEBUG, `Found existing phone verified user, linking: ${S}`), h = S) : (g(E.DEBUG, "No existing verified users found, creating new user"), h = null);
  }
  let w = {
    ...f ? { emailVerificationTime: Date.now() } : null,
    ...l ? { phoneVerificationTime: Date.now() } : null,
    ...u
  }, v = h;
  if (h !== null)
    try {
      await e.db.patch(h, w);
    } catch (b) {
      throw new Error(`Could not update user document with ID \`${h}\`, either the user has been deleted but their account has not, or the profile data doesn't match the \`users\` table schema: ${b.message}`);
    }
  else
    h = await e.db.insert("users", w);
  let x = i.callbacks?.afterUserCreatedOrUpdated;
  return x !== void 0 ? (g(E.DEBUG, "Calling custom afterUserCreatedOrUpdated callback"), await x(e, {
    userId: h,
    existingUserId: v,
    ...n
  })) : g(E.DEBUG, "No custom afterUserCreatedOrUpdated callback, skipping"), h;
}
o(pf, "defaultCreateOrUpdateUser");
async function hf(e, t) {
  let r = await e.db.query("users").withIndex("email", (n) => n.eq("email", t)).filter((n) => n.neq(n.field("emailVerificationTime"), void 0)).take(2);
  return r.length === 1 ? r[0] : null;
}
o(hf, "uniqueUserWithVerifiedEmail");
async function mf(e, t) {
  let r = await e.db.query("users").withIndex("phone", (n) => n.eq("phone", t)).filter((n) => n.neq(n.field("phoneVerificationTime"), void 0)).take(2);
  return r.length === 1 ? r[0] : null;
}
o(mf, "uniqueUserWithVerifiedPhone");
async function yf(e, t, r, n) {
  let i = "existingAccount" in r ? r.existingAccount._id : await e.db.insert("authAccounts", {
    userId: t,
    provider: n.provider.id,
    providerAccountId: r.providerAccountId,
    secret: r.secret
  });
  return "existingAccount" in r && r.existingAccount.userId !== t && await e.db.patch(i, { userId: t }), n.profile.emailVerified && await e.db.patch(i, { emailVerified: n.profile.email }), n.profile.phoneVerified && await e.db.patch(i, { phoneVerified: n.profile.phone }), i;
}
o(yf, "createOrUpdateAccount");
async function _c(e, t) {
  let r = await e.db.get(t);
  if (r === null)
    throw new Error(`Expected an account to exist for ID "${t}"`);
  return r;
}
o(_c, "getAccountOrThrow");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/verifyCodeAndSignIn.js
var xc = m.object({
  params: m.any(),
  provider: m.optional(m.string()),
  verifier: m.optional(m.string()),
  generateTokens: m.boolean(),
  allowExtraProviders: m.boolean()
});
async function vc(e, t, r, n) {
  g(E.DEBUG, "verifyCodeAndSignInImpl args:", {
    params: { email: t.params.email, phone: t.params.phone },
    provider: t.provider,
    verifier: t.verifier,
    generateTokens: t.generateTokens,
    allowExtraProviders: t.allowExtraProviders
  });
  let { generateTokens: i, provider: s, allowExtraProviders: a } = t, c = t.params.email ?? t.params.phone;
  if (c !== void 0 && await bn(e, c, n))
    return g(E.WARN, "Too many failed attempts to verify code for this email"), null;
  let d = await wf(e, t, s ?? null, r, a, n, await Y(e));
  if (d === null)
    return c !== void 0 && await _n(e, c, n), null;
  c !== void 0 && await xn(e, c);
  let { userId: u } = d, f = await gn(e, n, u);
  return await wn(e, n, u, f, i);
}
o(vc, "verifyCodeAndSignInImpl");
var Ht = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "verifyCodeAndSignIn",
    ...t
  }
}), "callVerifyCodeAndSignIn");
async function wf(e, t, r, n, i, s, a) {
  let { params: c, verifier: d } = t, u = await Ye(c.code), f = await e.db.query("authVerificationCodes").withIndex("code", (b) => b.eq("code", u)).unique();
  if (f === null)
    return g(E.INFO, "Invalid verification code"), null;
  if (f.verifier !== d)
    return g(E.INFO, "Invalid verifier"), null;
  if (f.expirationTime < Date.now())
    return g(E.INFO, "Expired verification code"), await e.db.delete(f._id), null;
  let { accountId: l, emailVerified: y, phoneVerified: p } = f, h = await e.db.get(l);
  if (h === null)
    return g(E.WARN, "Account associated with this email has been deleted"), null;
  if (r !== null && f.provider !== r)
    return g(E.WARN, `Invalid provider "${r}" for given \`code\`, which was generated by provider "${f.provider}"`), null;
  let w = yi(n, f.provider, i);
  if (w === null)
    return g(E.WARN, `Provider "${f.provider}" which generated this \`code\` is not available here`), null;
  if ((w.type === "email" || w.type === "phone") && w.authorize !== void 0)
    try {
      await w.authorize(t.params, h);
    } catch (b) {
      return g(E.WARN, "Verification code failed the provider's `authorize` check", b), null;
    }
  let v = yi(n, h.provider);
  if (v === null)
    return g(E.WARN, `Provider "${h.provider}" for this account is not configured`), null;
  await e.db.delete(f._id);
  let x = h.userId;
  return v.type === "oauth" || v.type === "oidc" || ({ userId: x } = await Te(e, a, { existingAccount: h }, {
    type: "verification",
    provider: v,
    profile: {
      ...y !== void 0 ? { email: y, emailVerified: !0 } : {},
      ...p !== void 0 ? { phone: p, phoneVerified: !0 } : {}
    }
  }, s)), { providerAccountId: h.providerAccountId, userId: x };
}
o(wf, "verifyCodeOnly");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/verifierSignature.js
var Sc = m.object({
  verifier: m.string(),
  signature: m.string()
});
async function kc(e, t) {
  let { verifier: r, signature: n } = t, i = e.db.normalizeId("authVerifiers", r), s = i === null ? null : await e.db.get(i);
  if (s === null)
    throw new Error("Invalid verifier");
  return await e.db.patch(s._id, { signature: n });
}
o(kc, "verifierSignatureImpl");
var gi = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "verifierSignature",
    ...t
  }
}), "callVerifierSignature");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/userOAuth.js
var gf = 1e3 * 60 * 2, Ec = m.object({
  provider: m.string(),
  providerAccountId: m.string(),
  profile: m.any(),
  signature: m.string()
});
async function Ac(e, t, r, n) {
  g("DEBUG", "userOAuthImpl args:", {
    ...t,
    signature: C(t.signature)
  });
  let { profile: i, provider: s, providerAccountId: a, signature: c } = t, d = r(s), u = await e.db.query("authAccounts").withIndex("providerAndAccountId", (h) => h.eq("provider", s).eq("providerAccountId", a)).unique(), f = await e.db.query("authVerifiers").withIndex("signature", (h) => h.eq("signature", c)).unique();
  if (f === null)
    throw new Error("Invalid state");
  let { accountId: l } = await Te(e, f.sessionId ?? null, u !== null ? { existingAccount: u } : { providerAccountId: a }, { type: "oauth", provider: d, profile: i }, n), y = sn(8, "0123456789");
  await e.db.delete(f._id);
  let p = await e.db.query("authVerificationCodes").withIndex("accountId", (h) => h.eq("accountId", l)).unique();
  return p !== null && await e.db.delete(p._id), await e.db.insert("authVerificationCodes", {
    code: await Ye(y),
    accountId: l,
    provider: s,
    expirationTime: Date.now() + gf,
    // The use of a verifier means we don't need an identifier
    // during verification.
    verifier: f._id
  }), y;
}
o(Ac, "userOAuthImpl");
var bi = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "userOAuth",
    ...t
  }
}), "callUserOAuth");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/createVerificationCode.js
var Ic = m.object({
  accountId: m.optional(m.id("authAccounts")),
  provider: m.string(),
  email: m.optional(m.string()),
  phone: m.optional(m.string()),
  code: m.string(),
  expirationTime: m.number(),
  allowExtraProviders: m.boolean()
});
async function Tc(e, t, r, n) {
  g(E.DEBUG, "createVerificationCodeImpl args:", {
    ...t,
    code: "<redacted>"
  });
  let { email: i, phone: s, code: a, expirationTime: c, provider: d, accountId: u, allowExtraProviders: f } = t, l = u !== void 0 ? await _c(e, u) : await e.db.query("authAccounts").withIndex("providerAndAccountId", (h) => h.eq("provider", d).eq("providerAccountId", i ?? s)).unique(), y = r(d, f), { accountId: p } = await Te(e, await Y(e), l !== null ? { existingAccount: l } : { providerAccountId: i ?? s }, y.type === "email" ? { type: "email", provider: y, profile: { email: i } } : { type: "phone", provider: y, profile: { phone: s } }, n);
  return await bf(e, p, d, a, c, { email: i, phone: s }), i ?? s;
}
o(Tc, "createVerificationCodeImpl");
var _i = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "createVerificationCode",
    ...t
  }
}), "callCreateVerificationCode");
async function bf(e, t, r, n, i, { email: s, phone: a }) {
  let c = await e.db.query("authVerificationCodes").withIndex("accountId", (d) => d.eq("accountId", t)).unique();
  c !== null && await e.db.delete(c._id), await e.db.insert("authVerificationCodes", {
    accountId: t,
    provider: r,
    code: await Ye(n),
    expirationTime: i,
    emailVerified: s,
    phoneVerified: a
  });
}
o(bf, "generateUniqueVerificationCode");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/createAccountFromCredentials.js
var Rc = m.object({
  provider: m.string(),
  account: m.object({ id: m.string(), secret: m.optional(m.string()) }),
  profile: m.any(),
  shouldLinkViaEmail: m.optional(m.boolean()),
  shouldLinkViaPhone: m.optional(m.boolean())
});
async function Cc(e, t, r, n) {
  g(E.DEBUG, "createAccountFromCredentialsImpl args:", {
    provider: t.provider,
    account: {
      id: t.account.id,
      secret: C(t.account.secret ?? "")
    }
  });
  let { provider: i, account: s, profile: a, shouldLinkViaEmail: c, shouldLinkViaPhone: d } = t, u = r(i), f = await e.db.query("authAccounts").withIndex("providerAndAccountId", (h) => h.eq("provider", u.id).eq("providerAccountId", s.id)).unique();
  if (f !== null) {
    if (s.secret !== void 0 && !await Sn(u, s.secret, f.secret ?? ""))
      throw new Error(`Account ${s.id} already exists`);
    return {
      account: f,
      // TODO: Ian removed this,
      user: await e.db.get(f.userId)
    };
  }
  let l = s.secret !== void 0 ? await vn(u, s.secret) : void 0, { userId: y, accountId: p } = await Te(e, await Y(e), { providerAccountId: s.id, secret: l }, {
    type: "credentials",
    provider: u,
    profile: a,
    shouldLinkViaEmail: c,
    shouldLinkViaPhone: d
  }, n);
  return {
    account: await e.db.get(p),
    user: await e.db.get(y)
  };
}
o(Cc, "createAccountFromCredentialsImpl");
var xi = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "createAccountFromCredentials",
    ...t
  }
}), "callCreateAccountFromCredentials");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/retrieveAccountWithCredentials.js
var Pc = m.object({
  provider: m.string(),
  account: m.object({ id: m.string(), secret: m.optional(m.string()) })
});
async function Uc(e, t, r, n) {
  let { provider: i, account: s } = t;
  g(E.DEBUG, "retrieveAccountWithCredentialsImpl args:", {
    provider: i,
    account: {
      id: s.id,
      secret: C(s.secret ?? "")
    }
  });
  let a = await e.db.query("authAccounts").withIndex("providerAndAccountId", (c) => c.eq("provider", i).eq("providerAccountId", s.id)).unique();
  if (a === null)
    return "InvalidAccountId";
  if (s.secret !== void 0) {
    if (await bn(e, a._id, n))
      return "TooManyFailedAttempts";
    if (!await Sn(r(i), s.secret, a.secret ?? ""))
      return await _n(e, a._id, n), "InvalidSecret";
    await xn(e, a._id);
  }
  return {
    account: a,
    // TODO: Ian removed this
    user: await e.db.get(a.userId)
  };
}
o(Uc, "retrieveAccountWithCredentialsImpl");
var vi = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "retrieveAccountWithCredentials",
    ...t
  }
}), "callRetreiveAccountWithCredentials");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/modifyAccount.js
var Oc = m.object({
  provider: m.string(),
  account: m.object({ id: m.string(), secret: m.string() })
});
async function Lc(e, t, r) {
  let { provider: n, account: i } = t;
  g(E.DEBUG, "retrieveAccountWithCredentialsImpl args:", {
    provider: n,
    account: {
      id: i.id,
      secret: C(i.secret ?? "")
    }
  });
  let s = await e.db.query("authAccounts").withIndex("providerAndAccountId", (a) => a.eq("provider", n).eq("providerAccountId", i.id)).unique();
  if (s === null)
    throw new Error(`Cannot modify account with ID ${i.id} because it does not exist`);
  await e.db.patch(s._id, {
    secret: await vn(r(n), i.secret)
  });
}
o(Lc, "modifyAccountImpl");
var Si = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "modifyAccount",
    ...t
  }
}), "callModifyAccount");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/invalidateSessions.js
var Dc = m.object({
  userId: m.id("users"),
  except: m.optional(m.array(m.id("authSessions")))
}), ki = /* @__PURE__ */ o(async (e, t) => e.runMutation("auth:store", {
  args: {
    type: "invalidateSessions",
    ...t
  }
}), "callInvalidateSessions"), Kc = /* @__PURE__ */ o(async (e, t) => {
  g(E.DEBUG, "invalidateSessionsImpl args:", t);
  let { userId: r, except: n } = t, i = new Set(n ?? []), s = await e.db.query("authSessions").withIndex("userId", (a) => a.eq("userId", r)).collect();
  for (let a of s)
    i.has(a._id) || await $t(e, a);
}, "invalidateSessionsImpl");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/verifier.js
async function Nc(e) {
  return await e.db.insert("authVerifiers", {
    sessionId: await Y(e) ?? void 0
  });
}
o(Nc, "verifierImpl");
var Ei = /* @__PURE__ */ o(async (e) => e.runMutation("auth:store", {
  args: {
    type: "verifier"
  }
}), "callVerifier");

// node_modules/@convex-dev/auth/dist/server/implementation/mutations/index.js
var $c = m.object({
  args: m.union(m.object({
    type: m.literal("signIn"),
    ...pc.fields
  }), m.object({
    type: m.literal("signOut")
  }), m.object({
    type: m.literal("refreshSession"),
    ...yc.fields
  }), m.object({
    type: m.literal("verifyCodeAndSignIn"),
    ...xc.fields
  }), m.object({
    type: m.literal("verifier")
  }), m.object({
    type: m.literal("verifierSignature"),
    ...Sc.fields
  }), m.object({
    type: m.literal("userOAuth"),
    ...Ec.fields
  }), m.object({
    type: m.literal("createVerificationCode"),
    ...Ic.fields
  }), m.object({
    type: m.literal("createAccountFromCredentials"),
    ...Rc.fields
  }), m.object({
    type: m.literal("retrieveAccountWithCredentials"),
    ...Pc.fields
  }), m.object({
    type: m.literal("modifyAccount"),
    ...Oc.fields
  }), m.object({
    type: m.literal("invalidateSessions"),
    ...Dc.fields
  }))
}), Hc = /* @__PURE__ */ o(async (e, t, r, n) => {
  let i = t.args;
  switch (g(E.INFO, `\`auth:store\` type: ${i.type}`), i.type) {
    case "signIn":
      return hc(e, i, n);
    case "signOut":
      return mc(e);
    case "refreshSession":
      return wc(e, i, r, n);
    case "verifyCodeAndSignIn":
      return vc(e, i, r, n);
    case "verifier":
      return Nc(e);
    case "verifierSignature":
      return kc(e, i);
    case "userOAuth":
      return Ac(e, i, r, n);
    case "createVerificationCode":
      return Tc(e, i, r, n);
    case "createAccountFromCredentials":
      return Cc(e, i, r, n);
    case "retrieveAccountWithCredentials":
      return Uc(e, i, r, n);
    case "modifyAccount":
      return Lc(e, i, r);
    case "invalidateSessions":
      return Kc(e, i);
    default:
  }
}, "storeImpl");

// node_modules/@convex-dev/auth/dist/server/implementation/redirects.js
async function kn(e, t) {
  if (t.redirectTo !== void 0) {
    if (typeof t.redirectTo != "string")
      throw new Error(`Expected \`redirectTo\` to be a string, got ${t.redirectTo}`);
    return await (e.callbacks?.redirect ?? _f)(t);
  }
  return Wc();
}
o(kn, "redirectAbsoluteUrl");
async function _f({ redirectTo: e }) {
  let t = Wc();
  if (e.startsWith("?") || e.startsWith("/"))
    return `${t}${e}`;
  if (e.startsWith(t)) {
    let r = e[t.length];
    if (r === void 0 || r === "?" || r === "/")
      return e;
  }
  throw new Error(`Invalid \`redirectTo\` ${e} for configured SITE_URL: ${t.toString()}`);
}
o(_f, "defaultRedirectCallback");
function En(e, t, r) {
  let n = /([^:]+):(.*)/, [, i, s] = e.match(n), a = /^\/\/(?:\/|$|\?)/.test(s), c = a && s.startsWith("///"), d = new URL(`http:${a ? "//googblibok" + s.slice(2) : s}`);
  d.searchParams.set(t, r);
  let [, , u] = d.toString().match(n);
  return `${i}:${a ? (c ? "/" : "") + "//" + u.slice(13) : u}`;
}
o(En, "setURLSearchParam");
function Wc() {
  return z("SITE_URL").replace(/\/$/, "");
}
o(Wc, "siteUrl");

// node_modules/@convex-dev/auth/dist/server/implementation/signIn.js
var xf = 3600 * 24;
async function Ai(e, t, r, n) {
  if (t === null && r.refreshToken)
    return { kind: "refreshTokens", signedIn: { tokens: await mi(e, {
      refreshToken: r.refreshToken
    }) } };
  if (t === null && r.params?.code !== void 0)
    return {
      kind: "signedIn",
      signedIn: await Ht(e, {
        params: r.params,
        verifier: r.verifier,
        generateTokens: !0,
        allowExtraProviders: n.allowExtraProviders
      })
    };
  if (t === null)
    throw new Error("Cannot sign in: Missing `provider`, `params.code` or `refreshToken`");
  if (t.type === "email" || t.type === "phone")
    return vf(e, t, r, n);
  if (t.type === "credentials")
    return Sf(e, t, r, n);
  if (t.type === "oauth" || t.type === "oidc")
    return kf(e, t, r, n);
  let i = t;
  throw new Error(`Provider type ${t.type} is not supported yet`);
}
o(Ai, "signInImpl");
async function vf(e, t, r, n) {
  if (r.params?.code !== void 0) {
    let f = await Ht(e, {
      params: r.params,
      provider: t.id,
      generateTokens: n.generateTokens,
      allowExtraProviders: n.allowExtraProviders
    });
    if (f === null)
      throw new Error("Could not verify code");
    return {
      kind: "signedIn",
      signedIn: f
    };
  }
  let s = t.generateVerificationToken ? await t.generateVerificationToken() : sn(32, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"), a = Date.now() + (t.maxAge ?? xf) * 1e3, c = await _i(e, {
    provider: t.id,
    accountId: r.accountId,
    email: r.params?.email,
    phone: r.params?.phone,
    code: s,
    expirationTime: a,
    allowExtraProviders: n.allowExtraProviders
  }), d = await kn(e.auth.config, r.params ?? {}), u = {
    identifier: c,
    url: En(d, "code", s),
    token: s,
    expires: new Date(a)
  };
  return t.type === "email" ? await t.sendVerificationRequest(
    {
      ...u,
      provider: {
        ...t,
        from: (
          // Simplifies demo configuration of Resend
          t.from === "Auth.js <no-reply@authjs.dev>" && t.id === "resend" ? "My App <onboarding@resend.dev>" : t.from
        )
      },
      request: new Request("http://localhost"),
      // TODO: Document
      theme: e.auth.config.theme
    },
    // @ts-expect-error Figure out typing for email providers so they can
    // access ctx.
    e
  ) : t.type === "phone" && await t.sendVerificationRequest({ ...u, provider: t }, e), { kind: "started", started: !0 };
}
o(vf, "handleEmailAndPhoneProvider");
async function Sf(e, t, r, n) {
  let i = await t.authorize(r.params ?? {}, e);
  return i === null ? { kind: "signedIn", signedIn: null } : {
    kind: "signedIn",
    signedIn: await pi(e, {
      userId: i.userId,
      sessionId: i.sessionId,
      generateTokens: n.generateTokens
    })
  };
}
o(Sf, "handleCredentials");
async function kf(e, t, r, n) {
  if (r.params?.code !== void 0)
    return {
      kind: "signedIn",
      signedIn: await Ht(e, {
        params: r.params,
        verifier: r.verifier,
        generateTokens: !0,
        allowExtraProviders: n.allowExtraProviders
      })
    };
  let i = new URL((process.env.CUSTOM_AUTH_SITE_URL ?? z("CONVEX_SITE_URL")) + `/api/auth/signin/${t.id}`), s = await Ei(e);
  if (i.searchParams.set("code", s), r.params?.redirectTo !== void 0) {
    if (typeof r.params.redirectTo != "string")
      throw new Error(`Expected \`redirectTo\` to be a string, got ${r.params.redirectTo}`);
    i.searchParams.set("redirectTo", r.params.redirectTo);
  }
  return { kind: "redirect", redirect: i.toString(), verifier: s };
}
o(kf, "handleOAuthProvider");

// node_modules/@convex-dev/auth/dist/server/oauth/checks.js
var jc = 900;
async function Ii(e, t, r) {
  let { cookies: n } = r, i = n[e], s = /* @__PURE__ */ new Date();
  s.setTime(s.getTime() + jc * 1e3), g("DEBUG", `CREATE_${e.toUpperCase()}`, {
    name: i.name,
    COOKIE_TTL: jc,
    expires: s
  });
  let a = { ...i.options, expires: s };
  return { name: i.name, value: t, options: a };
}
o(Ii, "createCookie");
function Ef(e, t, r) {
  let { cookies: n } = t, i = n[e];
  g("DEBUG", `CLEAR_${e.toUpperCase()}`, { cookie: i }), r.push({
    name: i.name,
    value: "",
    options: { ...n[e].options, maxAge: 0 }
  });
}
o(Ef, "clearCookie");
function Ti(e, t) {
  return async function(r, n, i) {
    let { provider: s } = i;
    if (!s?.checks?.includes(e))
      return;
    let a = r?.[i.cookies[t].name];
    return g("DEBUG", `USE_${t.toUpperCase()}`, {
      present: a !== void 0
    }), Ef(t, i, n), a;
  };
}
o(Ti, "useCookie");
var An = {
  /** Creates a PKCE code challenge and verifier pair. The verifier is stored in the cookie. */
  async create(e) {
    let t = qr(), r = await Yr(t);
    return { cookie: await Ii("pkceCodeVerifier", t, e), codeChallenge: r, codeVerifier: t };
  },
  /**
   * Returns code_verifier if the provider is configured to use PKCE,
   * and clears the container cookie afterwards.
   * An error is thrown if the code_verifier is missing or invalid.
   */
  use: Ti("pkce", "pkceCodeVerifier")
}, In = {
  /** Creates a state cookie with an optionally encoded body. */
  async create(e, t) {
    let { provider: r } = e;
    if (!r.checks.includes("state")) {
      if (t)
        throw new Error("State data was provided but the provider is not configured to use state");
      return;
    }
    let n = Xr();
    return { cookie: await Ii("state", n, e), value: n };
  },
  /**
   * Returns state if the provider is configured to use state,
   * and clears the container cookie afterwards.
   * An error is thrown if the state is missing or invalid.
   */
  use: Ti("state", "state")
}, Tn = {
  async create(e) {
    if (!e.provider.checks.includes("nonce"))
      return;
    let t = Zr();
    return { cookie: await Ii("nonce", t, e), value: t };
  },
  /**
   * Returns nonce if the provider is configured to use nonce,
   * and clears the container cookie afterwards.
   * An error is thrown if the nonce is missing or invalid.
   * @see https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes
   * @see https://danielfett.de/2020/05/16/pkce-vs-nonce-equivalent-or-not/#nonce
   */
  use: Ti("nonce", "nonce")
};

// node_modules/@convex-dev/auth/dist/server/oauth/lib/utils/customFetch.js
function nt(e) {
  return { [Se]: e[xe] ?? fetch };
}
o(nt, "fetchOpt");

// node_modules/@convex-dev/auth/dist/server/oauth/convexAuth.js
function Rn(e) {
  return (process.env.CUSTOM_AUTH_SITE_URL ?? z("CONVEX_SITE_URL")) + "/api/auth/callback/" + e;
}
o(Rn, "callbackUrl");
function Cn({ codeVerifier: e, state: t, nonce: r }) {
  return [e, t, r].filter((n) => n !== void 0).join(" ");
}
o(Cn, "getAuthorizationSignature");
function Ri(e, t) {
  return (Jt(process.env.CONVEX_SITE_URL) ? "" : "__Host-") + t + "OAuth" + e;
}
o(Ri, "oauthStateCookieName");
var Ci = /* @__PURE__ */ o((e) => ({
  pkceCodeVerifier: {
    name: Ri("pkce", e),
    options: {
      ...oe
    }
  },
  state: {
    name: Ri("state", e),
    options: {
      ...oe
    }
  },
  nonce: {
    name: Ri("nonce", e),
    options: {
      ...oe
    }
  },
  // ConvexAuth: We don't support webauthn, so this value doesn't actually matter
  webauthnChallenge: {
    name: "ConvexAuth_shouldNotBeUsed_webauthnChallenge",
    options: {
      ...oe
    }
  },
  // ConvexAuth: We don't use these cookies, so their values should never be used
  sessionToken: {
    name: "ConvexAuth_shouldNotBeUsed_sessionToken",
    options: {
      ...oe
    }
  },
  callbackUrl: {
    name: "ConvexAuth_shouldNotBeUsed_callbackUrl",
    options: {
      ...oe
    }
  },
  csrfToken: {
    name: "ConvexAuth_shouldNotBeUsed_csrfToken",
    options: {
      ...oe
    }
  }
}), "defaultCookiesOptions");
async function Pi(e) {
  if (!e.authorization || !e.token || !e.userinfo) {
    if (!e.issuer)
      throw new Error(`Provider \`${e.id}\` is missing an \`issuer\` URL configuration. Consult the provider docs.`);
    let i = new URL(e.issuer), s = await ra(i, {
      ...nt(e),
      [me]: !0
    }), a = await na(i, s);
    if (!a.token_endpoint)
      throw new TypeError("TODO: Authorization server did not provide a token endpoint.");
    let c = a;
    return {
      ...e,
      checks: e.checks,
      profile: e.profile,
      account: e.account,
      clientId: e.clientId,
      idToken: e.type === "oidc" ? e.idToken : void 0,
      // ConvexAuth: Apparently it's important for us to normalize the endpoint after
      // service discovery (https://github.com/get-convex/convex-auth/commit/35bf716bfb0d29dbce1cbca318973b0732f75015)
      authorization: $e({
        ...e.authorization,
        url: c.authorization_endpoint
      }),
      token: $e({
        ...e.token,
        url: c.token_endpoint
      }),
      userinfo: c.userinfo_endpoint ? $e({
        ...e.userinfo,
        url: c.userinfo_endpoint
      }) : e.userinfo,
      as: c,
      configSource: "discovered"
    };
  }
  let t = $e(e.authorization), r = $e(e.token), n = e.userinfo ? $e(e.userinfo) : void 0;
  return {
    ...e,
    checks: e.checks,
    profile: e.profile,
    account: e.account,
    clientId: e.clientId,
    idToken: e.type === "oidc" ? e.idToken : void 0,
    authorization: t,
    token: r,
    userinfo: n,
    as: {
      issuer: e.issuer ?? "theremustbeastringhere.dev",
      authorization_endpoint: t?.url.toString(),
      token_endpoint: r?.url.toString(),
      userinfo_endpoint: n?.url.toString()
    },
    configSource: "provided"
  };
}
o(Pi, "oAuthConfigToInternalProvider");

// node_modules/@convex-dev/auth/dist/server/oauth/authorizationUrl.js
async function Bc(e) {
  let { provider: t } = e, r = t.authorization?.url, { as: n, authorization: i, configSource: s } = t;
  if (!i)
    throw new TypeError("Could not determine the authorization endpoint.");
  r || (r = new URL(i.url));
  let a = r.searchParams, c = Rn(t.id), d = Object.assign({
    response_type: "code",
    // clientId can technically be undefined, should we check this in assert.ts or rely on the Authorization Server to do it?
    client_id: t.clientId,
    redirect_uri: c,
    // @ts-expect-error TODO:
    ...t.authorization?.params
  }, Object.fromEntries(r.searchParams.entries() ?? []));
  for (let w in d)
    a.set(w, d[w]);
  let u = [], f = await In.create(e);
  f && (a.set("state", f.value), u.push(f.cookie));
  let l;
  if (t.checks?.includes("pkce"))
    if (s === "discovered" && !n.code_challenge_methods_supported?.includes("S256"))
      t.type === "oidc" && (t.checks = ["nonce"]);
    else {
      let w = await An.create(e);
      a.set("code_challenge", w.codeChallenge), a.set("code_challenge_method", "S256"), u.push(w.cookie), l = w.codeVerifier;
    }
  let y = await Tn.create(e);
  y && (a.set("nonce", y.value), u.push(y.cookie)), t.type === "oidc" && !r.searchParams.has("scope") && r.searchParams.set("scope", "openid profile email");
  let p = new URL(r);
  for (let w of ["state", "nonce"])
    p.searchParams.has(w) && p.searchParams.set(w, "<redacted>");
  g("DEBUG", "authorization url is ready", {
    url: p.toString(),
    cookies: u.map((w) => w.name),
    providerId: t.id
  });
  let h = Cn({
    codeVerifier: l,
    state: a.get("state") ?? void 0,
    nonce: a.get("nonce") ?? void 0
  });
  return { redirect: r.toString(), cookies: u, signature: h };
}
o(Bc, "getAuthorizationUrl");

// node_modules/@convex-dev/auth/dist/server/oauth/lib/utils/providers.js
function Mc(e) {
  return e.type === "oidc";
}
o(Mc, "isOIDCProvider");

// node_modules/@convex-dev/auth/dist/server/oauth/callback.js
function zc(e) {
  return encodeURIComponent(e).replace(/%20/g, "+");
}
o(zc, "formUrlEncode");
function Af(e, t) {
  let r = zc(e), n = zc(t);
  return `Basic ${btoa(`${r}:${n}`)}`;
}
o(Af, "clientSecretBasic");
async function Vc(e, t, r) {
  let { provider: n } = r, { userinfo: i, as: s } = n, a = {
    client_id: n.clientId,
    ...n.client
  }, c;
  switch (a.token_endpoint_auth_method) {
    // TODO: in the next breaking major version have undefined be `client_secret_post`
    case void 0:
    case "client_secret_basic":
      c = /* @__PURE__ */ o((S, A, P, O) => {
        O.set("authorization", Af(n.clientId, n.clientSecret));
      }, "clientAuth");
      break;
    case "client_secret_post":
      c = ia(n.clientSecret);
      break;
    case "client_secret_jwt":
      c = ca(n.clientSecret);
      break;
    case "private_key_jwt":
      c = aa(n.token.clientPrivateKey, {
        // TODO: review in the next breaking change
        [Vr](S, A) {
          A.aud = [s.issuer, s.token_endpoint];
        }
      });
      break;
    default:
      throw new Error("unsupported client authentication method");
  }
  let d = [], u = await In.use(t, d, r), f;
  try {
    f = Ta(s, a, new URLSearchParams(e), n.checks.includes("state") ? u : Co);
  } catch (S) {
    if (S instanceof At) {
      let A = {
        providerId: n.id,
        ...Object.fromEntries(S.cause.entries())
      };
      throw g("DEBUG", "OAuthCallbackError", A), new Error("OAuth Provider returned an error", { cause: A });
    }
    throw S;
  }
  let l = await An.use(t, d, r), y = Rn(n.id), p = await ba(s, a, c, f, y, l ?? "decoy", {
    // TODO: move away from allowing insecure HTTP requests
    [me]: !0,
    [Se]: (...S) => (n.checks.includes("pkce") || S[1].body.delete("code_verifier"), nt(n)[Se](...S))
  });
  n.token?.conform && (p = await n.token.conform(p.clone()) ?? p);
  let h = {}, w = await Tn.use(t, d, r), v = Mc(n), x = await ka(s, a, p, {
    expectedNonce: w,
    requireIdToken: v
  }), b = x;
  if (v) {
    let S = Qr(x);
    if (S === void 0)
      throw new Error("ID Token claims are missing");
    let A = S;
    if (h = A, n.id === "apple")
      try {
        h.user = JSON.parse(e?.user);
      } catch {
      }
    if (n.idToken === !1) {
      let P = await Io(s, a, x.access_token, {
        ...nt(n),
        // TODO: move away from allowing insecure HTTP requests
        [me]: !0
      });
      h = await fa(s, a, A.sub, P);
    }
  } else if (i?.request) {
    let S = await i.request({ tokens: b, provider: n });
    S instanceof Object && (h = S);
  } else if (i?.url)
    h = await (await Io(s, a, x.access_token, nt(n))).json();
  else
    throw new TypeError("No userinfo endpoint configured");
  return b.expires_in && (b.expires_at = Math.floor(Date.now() / 1e3) + Number(b.expires_in)), {
    profile: h,
    tokens: b,
    cookies: d,
    signature: Cn({ codeVerifier: l, state: u, nonce: w })
  };
}
o(Vc, "handleOAuth");

// node_modules/@convex-dev/auth/dist/server/implementation/index.js
function If(e) {
  let t = Oa(e), r = t.providers.some((c) => c.type === "oauth" || c.type === "oidc"), n = /* @__PURE__ */ o((c, d = !1) => t.providers.find((u) => u.id === c) ?? (d ? t.extraProviders.find((u) => u.id === c) : void 0), "getProvider"), i = /* @__PURE__ */ o((c, d = !1) => {
    let u = n(c, d);
    if (u === void 0) {
      let f = `Provider \`${c}\` is not configured, available providers are ${Ka(t, d)}.`;
      throw g(E.ERROR, f), new Error(f);
    }
    return u;
  }, "getProviderOrThrow"), s = /* @__PURE__ */ o((c) => ({ ...c, auth: { ...c.auth, config: t } }), "enrichCtx");
  return {
    /**
     * Helper for configuring HTTP actions.
     */
    auth: {
      /**
       * @deprecated - Use `getAuthUserId` from "@convex-dev/auth/server":
       *
       * ```ts
       * import { getAuthUserId } from "@convex-dev/auth/server";
       * ```
       *
       * @hidden
       */
      getUserId: /* @__PURE__ */ o(async (c) => {
        let d = await c.auth.getUserIdentity();
        if (d === null)
          return null;
        let [u] = d.subject.split(ke);
        return u;
      }, "getUserId"),
      /**
       * @deprecated - Use `getAuthSessionId` from "@convex-dev/auth/server":
       *
       * ```
       * import { getAuthSessionId } from "@convex-dev/auth/server";
       * ```
       *
       * @hidden
       */
      getSessionId: /* @__PURE__ */ o(async (c) => {
        let d = await c.auth.getUserIdentity();
        if (d === null)
          return null;
        let [, u] = d.subject.split(ke);
        return u;
      }, "getSessionId"),
      /**
       * Add HTTP actions for JWT verification and OAuth sign-in.
       *
       * ```ts
       * import { httpRouter } from "convex/server";
       * import { auth } from "./auth.js";
       *
       * const http = httpRouter();
       *
       * auth.addHttpRoutes(http);
       *
       * export default http;
       * ```
       *
       * The following routes are handled always:
       *
       * - `/.well-known/openid-configuration`
       * - `/.well-known/jwks.json`
       *
       * The following routes are handled if OAuth is configured:
       *
       * - `/api/auth/signin/*`
       * - `/api/auth/callback/*`
       *
       * @param http your HTTP router
       */
      addHttpRoutes: /* @__PURE__ */ o((c) => {
        if (c.route({
          path: "/.well-known/openid-configuration",
          method: "GET",
          handler: ot(async () => new Response(JSON.stringify({
            issuer: z("CONVEX_SITE_URL"),
            jwks_uri: z("CONVEX_SITE_URL") + "/.well-known/jwks.json",
            authorization_endpoint: z("CONVEX_SITE_URL") + "/oauth/authorize"
          }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "public, max-age=15, stale-while-revalidate=15, stale-if-error=86400"
            }
          }))
        }), c.route({
          path: "/.well-known/jwks.json",
          method: "GET",
          handler: ot(async () => new Response(z("JWKS"), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "public, max-age=15, stale-while-revalidate=15, stale-if-error=86400"
            }
          }))
        }), r) {
          c.route({
            pathPrefix: "/api/auth/signin/",
            method: "GET",
            handler: ot(Lf(400, async (u, f) => {
              let l = new URL(f.url), p = l.pathname.split("/").at(-1);
              if (p === null)
                throw new Error("Missing provider id");
              let h = l.searchParams.get("code");
              if (h === null)
                throw new Error("Missing sign-in verifier");
              let w = i(p), { redirect: v, cookies: x, signature: b } = await Bc({
                provider: await Pi(w),
                cookies: Ci(p)
              });
              await gi(u, {
                verifier: h,
                signature: b
              });
              let S = l.searchParams.get("redirectTo");
              S !== null && x.push(ji(p, S));
              let A = new Headers({ Location: v });
              for (let { name: P, value: O, options: H } of x)
                A.append("Set-Cookie", (0, Pn.serialize)(P, O, H));
              return new Response(null, { status: 302, headers: A });
            }))
          });
          let d = ot(async (u, f) => {
            let l = u, y = new URL(f.url), h = y.pathname.split("/").at(-1);
            g(E.DEBUG, "Handling OAuth callback for provider:", h);
            let w = i(h), v = Df(f), x = Ji(w.id, v), b = await kn(t, {
              redirectTo: x?.redirectTo
            }), S = y.searchParams;
            if (f.headers.get("Content-Type") === "application/x-www-form-urlencoded") {
              let A = await f.formData();
              for (let [P, O] of A.entries())
                typeof O == "string" && S.append(P, O);
            }
            try {
              let { profile: A, tokens: P, signature: O } = await Vc(Object.fromEntries(S.entries()), v, {
                provider: await Pi(w),
                cookies: Ci(w.id)
              }), { id: H, ...D } = await w.profile(A, P);
              if (typeof H != "string")
                throw new Error(`The profile method of the ${h} config must return a string ID`);
              let j = await bi(l, {
                provider: h,
                providerAccountId: H,
                profile: D,
                signature: O
              });
              return new Response(null, {
                status: 302,
                headers: {
                  Location: En(b, "code", j),
                  "Cache-Control": "must-revalidate"
                }
              });
            } catch (A) {
              return Vo(A), Response.redirect(b);
            }
          });
          c.route({
            pathPrefix: "/api/auth/callback/",
            method: "GET",
            handler: d
          }), c.route({
            pathPrefix: "/api/auth/callback/",
            method: "POST",
            handler: d
          });
        }
      }, "addHttpRoutes")
    },
    /**
     * Action called by the client to sign the user in.
     *
     * Also used for refreshing the session.
     */
    signIn: Un({
      args: {
        provider: m.optional(m.string()),
        params: m.optional(m.any()),
        verifier: m.optional(m.string()),
        refreshToken: m.optional(m.string()),
        calledBy: m.optional(m.string())
      },
      handler: /* @__PURE__ */ o(async (c, d) => {
        d.calledBy !== void 0 && g("INFO", `\`auth:signIn\` called by ${d.calledBy}`);
        let u = d.provider !== void 0 ? i(d.provider) : null, f = await Ai(s(c), u, d, {
          generateTokens: !0,
          allowExtraProviders: !1
        });
        switch (f.kind) {
          case "redirect":
            return { redirect: f.redirect, verifier: f.verifier };
          case "signedIn":
          case "refreshTokens":
            return { tokens: f.signedIn?.tokens ?? null };
          case "started":
            return { started: !0 };
          default: {
            let l = f;
            throw new Error(`Unexpected result from signIn, ${f}`);
          }
        }
      }, "handler")
    }),
    /**
     * Action called by the client to invalidate the current session.
     */
    signOut: Un({
      args: {},
      handler: /* @__PURE__ */ o(async (c) => {
        await hi(c);
      }, "handler")
    }),
    /**
     * Internal mutation used by the library to read and write
     * to the database during signin and signout.
     */
    store: Li({
      args: $c,
      handler: /* @__PURE__ */ o(async (c, d) => Hc(c, d, i, t), "handler")
    }),
    /**
     * Utility function for frameworks to use to get the current auth state
     * based on credentials that they've supplied separately.
     */
    isAuthenticated: Di({
      args: {},
      handler: /* @__PURE__ */ o(async (c, d) => await c.auth.getUserIdentity() !== null, "handler")
    })
  };
}
o(If, "convexAuth");
async function Tf(e) {
  let t = await e.auth.getUserIdentity();
  if (t === null)
    return null;
  let [r] = t.subject.split(ke);
  return r;
}
o(Tf, "getAuthUserId");
async function Rf(e, t) {
  return await xi(e, t);
}
o(Rf, "createAccount");
async function Cf(e, t) {
  let n = await vi(e, t);
  if (typeof n == "string")
    throw new Error(n);
  return n;
}
o(Cf, "retrieveAccount");
async function Pf(e, t) {
  return await Si(e, t);
}
o(Pf, "modifyAccountCredentials");
async function Uf(e, t) {
  return await ki(e, t);
}
o(Uf, "invalidateSessions");
async function Of(e, t, r) {
  let n = await Ai(e, La(t), r, {
    generateTokens: !1,
    allowExtraProviders: !0
  });
  return n.kind === "signedIn" && n.signedIn !== null ? { userId: n.signedIn.userId, sessionId: n.signedIn.sessionId } : null;
}
o(Of, "signInViaProvider");
function Lf(e, t) {
  return async (r, n) => {
    try {
      return await t(r, n);
    } catch (i) {
      return i instanceof Oi ? new Response(null, {
        status: e,
        statusText: i.data
      }) : (Vo(i), new Response(null, {
        status: 500,
        statusText: "Internal Server Error"
      }));
    }
  };
}
o(Lf, "convertErrorsToResponse");
function Df(e) {
  return (0, Pn.parse)(e.headers.get("Cookie") ?? "");
}
o(Df, "getCookies");

export {
  Bo as a,
  Wl as b,
  If as c,
  Tf as d,
  Rf as e,
  Cf as f,
  Pf as g,
  Uf as h,
  Of as i
};
/*! Bundled license information:

@auth/core/lib/vendored/cookie.js:
  (**
   * @source https://github.com/jshttp/cookie
   * @author blakeembrey
   * @license MIT
   *)
*/
