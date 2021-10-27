// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/tslib/tslib.es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__assign = void 0;
exports.__asyncDelegator = __asyncDelegator;
exports.__asyncGenerator = __asyncGenerator;
exports.__asyncValues = __asyncValues;
exports.__await = __await;
exports.__awaiter = __awaiter;
exports.__classPrivateFieldGet = __classPrivateFieldGet;
exports.__classPrivateFieldSet = __classPrivateFieldSet;
exports.__createBinding = void 0;
exports.__decorate = __decorate;
exports.__exportStar = __exportStar;
exports.__extends = __extends;
exports.__generator = __generator;
exports.__importDefault = __importDefault;
exports.__importStar = __importStar;
exports.__makeTemplateObject = __makeTemplateObject;
exports.__metadata = __metadata;
exports.__param = __param;
exports.__read = __read;
exports.__rest = __rest;
exports.__spread = __spread;
exports.__spreadArray = __spreadArray;
exports.__spreadArrays = __spreadArrays;
exports.__values = __values;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function () {
  exports.__assign = __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

exports.__assign = __assign;

function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}

var __createBinding = Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
};

exports.__createBinding = __createBinding;

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
/** @deprecated */


function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}
/** @deprecated */


function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}

;

var __setModuleDefault = Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
}

function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
}
},{}],"../node_modules/@lit/reactive-element/css-tag.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeCSS = exports.supportsAdoptingStyleSheets = exports.getCompatibleStyle = exports.css = exports.adoptStyles = exports.CSSResult = void 0;

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = window.ShadowRoot && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
      e = Symbol(),
      n = new Map();
exports.supportsAdoptingStyleSheets = t;

class s {
  constructor(t, n) {
    if (this._$cssResult$ = !0, n !== e) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t;
  }

  get styleSheet() {
    let e = n.get(this.cssText);
    return t && void 0 === e && (n.set(this.cssText, e = new CSSStyleSheet()), e.replaceSync(this.cssText)), e;
  }

  toString() {
    return this.cssText;
  }

}

exports.CSSResult = s;

const o = t => new s("string" == typeof t ? t : t + "", e),
      r = (t, ...n) => {
  const o = 1 === t.length ? t[0] : n.reduce((e, n, s) => e + (t => {
    if (!0 === t._$cssResult$) return t.cssText;
    if ("number" == typeof t) return t;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[s + 1], t[0]);
  return new s(o, e);
},
      i = (e, n) => {
  t ? e.adoptedStyleSheets = n.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet) : n.forEach(t => {
    const n = document.createElement("style"),
          s = window.litNonce;
    void 0 !== s && n.setAttribute("nonce", s), n.textContent = t.cssText, e.appendChild(n);
  });
},
      S = t ? t => t : t => t instanceof CSSStyleSheet ? (t => {
  let e = "";

  for (const n of t.cssRules) e += n.cssText;

  return o(e);
})(t) : t;

exports.getCompatibleStyle = S;
exports.adoptStyles = i;
exports.css = r;
exports.unsafeCSS = o;
},{}],"../node_modules/@lit/reactive-element/reactive-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CSSResult", {
  enumerable: true,
  get: function () {
    return _cssTag.CSSResult;
  }
});
exports.ReactiveElement = void 0;
Object.defineProperty(exports, "adoptStyles", {
  enumerable: true,
  get: function () {
    return _cssTag.adoptStyles;
  }
});
Object.defineProperty(exports, "css", {
  enumerable: true,
  get: function () {
    return _cssTag.css;
  }
});
exports.defaultConverter = void 0;
Object.defineProperty(exports, "getCompatibleStyle", {
  enumerable: true,
  get: function () {
    return _cssTag.getCompatibleStyle;
  }
});
exports.notEqual = void 0;
Object.defineProperty(exports, "supportsAdoptingStyleSheets", {
  enumerable: true,
  get: function () {
    return _cssTag.supportsAdoptingStyleSheets;
  }
});
Object.defineProperty(exports, "unsafeCSS", {
  enumerable: true,
  get: function () {
    return _cssTag.unsafeCSS;
  }
});

var _cssTag = require("./css-tag.js");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s, e;

const r = {
  toAttribute(t, i) {
    switch (i) {
      case Boolean:
        t = t ? "" : null;
        break;

      case Object:
      case Array:
        t = null == t ? t : JSON.stringify(t);
    }

    return t;
  },

  fromAttribute(t, i) {
    let s = t;

    switch (i) {
      case Boolean:
        s = null !== t;
        break;

      case Number:
        s = null === t ? null : Number(t);
        break;

      case Object:
      case Array:
        try {
          s = JSON.parse(t);
        } catch (t) {
          s = null;
        }

    }

    return s;
  }

},
      h = (t, i) => i !== t && (i == i || t == t),
      o = {
  attribute: !0,
  type: String,
  converter: r,
  reflect: !1,
  hasChanged: h
};

exports.notEqual = h;
exports.defaultConverter = r;

class n extends HTMLElement {
  constructor() {
    super(), this._$Et = new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$Ei = null, this.o();
  }

  static addInitializer(t) {
    var i;
    null !== (i = this.l) && void 0 !== i || (this.l = []), this.l.push(t);
  }

  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((i, s) => {
      const e = this._$Eh(s, i);

      void 0 !== e && (this._$Eu.set(e, s), t.push(e));
    }), t;
  }

  static createProperty(t, i = o) {
    if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const s = "symbol" == typeof t ? Symbol() : "__" + t,
            e = this.getPropertyDescriptor(t, s, i);
      void 0 !== e && Object.defineProperty(this.prototype, t, e);
    }
  }

  static getPropertyDescriptor(t, i, s) {
    return {
      get() {
        return this[i];
      },

      set(e) {
        const r = this[t];
        this[i] = e, this.requestUpdate(t, r, s);
      },

      configurable: !0,
      enumerable: !0
    };
  }

  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || o;
  }

  static finalize() {
    if (this.hasOwnProperty("finalized")) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);

    if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this._$Eu = new Map(), this.hasOwnProperty("properties")) {
      const t = this.properties,
            i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];

      for (const s of i) this.createProperty(s, t[s]);
    }

    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }

  static finalizeStyles(i) {
    const s = [];

    if (Array.isArray(i)) {
      const e = new Set(i.flat(1 / 0).reverse());

      for (const i of e) s.unshift((0, _cssTag.getCompatibleStyle)(i));
    } else void 0 !== i && s.push((0, _cssTag.getCompatibleStyle)(i));

    return s;
  }

  static _$Eh(t, i) {
    const s = i.attribute;
    return !1 === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0;
  }

  o() {
    var t;
    this._$Ev = new Promise(t => this.enableUpdating = t), this._$AL = new Map(), this._$Ep(), this.requestUpdate(), null === (t = this.constructor.l) || void 0 === t || t.forEach(t => t(this));
  }

  addController(t) {
    var i, s;
    (null !== (i = this._$Em) && void 0 !== i ? i : this._$Em = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t));
  }

  removeController(t) {
    var i;
    null === (i = this._$Em) || void 0 === i || i.splice(this._$Em.indexOf(t) >>> 0, 1);
  }

  _$Ep() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this._$Et.set(i, this[i]), delete this[i]);
    });
  }

  createRenderRoot() {
    var t;
    const s = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return (0, _cssTag.adoptStyles)(s, this.constructor.elementStyles), s;
  }

  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t = this._$Em) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
    });
  }

  enableUpdating(t) {}

  disconnectedCallback() {
    var t;
    null === (t = this._$Em) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
    });
  }

  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }

  _$Eg(t, i, s = o) {
    var e, h;

    const n = this.constructor._$Eh(t, s);

    if (void 0 !== n && !0 === s.reflect) {
      const o = (null !== (h = null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) && void 0 !== h ? h : r.toAttribute)(i, s.type);
      this._$Ei = t, null == o ? this.removeAttribute(n) : this.setAttribute(n, o), this._$Ei = null;
    }
  }

  _$AK(t, i) {
    var s, e, h;

    const o = this.constructor,
          n = o._$Eu.get(t);

    if (void 0 !== n && this._$Ei !== n) {
      const t = o.getPropertyOptions(n),
            l = t.converter,
            a = null !== (h = null !== (e = null === (s = l) || void 0 === s ? void 0 : s.fromAttribute) && void 0 !== e ? e : "function" == typeof l ? l : null) && void 0 !== h ? h : r.fromAttribute;
      this._$Ei = n, this[n] = a(i, t.type), this._$Ei = null;
    }
  }

  requestUpdate(t, i, s) {
    let e = !0;
    void 0 !== t && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || h)(this[t], i) ? (this._$AL.has(t) || this._$AL.set(t, i), !0 === s.reflect && this._$Ei !== t && (void 0 === this._$ES && (this._$ES = new Map()), this._$ES.set(t, s))) : e = !1), !this.isUpdatePending && e && (this._$Ev = this._$EC());
  }

  async _$EC() {
    this.isUpdatePending = !0;

    try {
      await this._$Ev;
    } catch (t) {
      Promise.reject(t);
    }

    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }

  scheduleUpdate() {
    return this.performUpdate();
  }

  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this._$Et && (this._$Et.forEach((t, i) => this[i] = t), this._$Et = void 0);
    let i = !1;
    const s = this._$AL;

    try {
      i = this.shouldUpdate(s), i ? (this.willUpdate(s), null === (t = this._$Em) || void 0 === t || t.forEach(t => {
        var i;
        return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
      }), this.update(s)) : this._$ET();
    } catch (t) {
      throw i = !1, this._$ET(), t;
    }

    i && this._$AE(s);
  }

  willUpdate(t) {}

  _$AE(t) {
    var i;
    null === (i = this._$Em) || void 0 === i || i.forEach(t => {
      var i;
      return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }

  _$ET() {
    this._$AL = new Map(), this.isUpdatePending = !1;
  }

  get updateComplete() {
    return this.getUpdateComplete();
  }

  getUpdateComplete() {
    return this._$Ev;
  }

  shouldUpdate(t) {
    return !0;
  }

  update(t) {
    void 0 !== this._$ES && (this._$ES.forEach((t, i) => this._$Eg(i, this[i], t)), this._$ES = void 0), this._$ET();
  }

  updated(t) {}

  firstUpdated(t) {}

}

exports.ReactiveElement = n;
n.finalized = !0, n.elementProperties = new Map(), n.elementStyles = [], n.shadowRootOptions = {
  mode: "open"
}, null === (s = globalThis.reactiveElementPolyfillSupport) || void 0 === s || s.call(globalThis, {
  ReactiveElement: n
}), (null !== (e = globalThis.reactiveElementVersions) && void 0 !== e ? e : globalThis.reactiveElementVersions = []).push("1.0.0");
},{"./css-tag.js":"../node_modules/@lit/reactive-element/css-tag.js"}],"../node_modules/lit-html/lit-html.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.svg = exports.render = exports.nothing = exports.noChange = exports.html = exports._$LH = void 0;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t, i;

const s = globalThis.trustedTypes,
      e = s ? s.createPolicy("lit-html", {
  createHTML: t => t
}) : void 0,
      o = `lit$${(Math.random() + "").slice(9)}$`,
      n = "?" + o,
      l = `<${n}>`,
      h = document,
      r = (t = "") => h.createComment(t),
      d = t => null === t || "object" != typeof t && "function" != typeof t,
      u = Array.isArray,
      v = t => {
  var i;
  return u(t) || "function" == typeof (null === (i = t) || void 0 === i ? void 0 : i[Symbol.iterator]);
},
      c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
      a = /-->/g,
      f = />/g,
      _ = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
      g = /'/g,
      m = /"/g,
      $ = /^(?:script|style|textarea)$/i,
      p = t => (i, ...s) => ({
  _$litType$: t,
  strings: i,
  values: s
}),
      y = p(1),
      b = p(2),
      T = Symbol.for("lit-noChange"),
      x = Symbol.for("lit-nothing"),
      w = new WeakMap(),
      A = (t, i, s) => {
  var e, o;
  const n = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
  let l = n._$litPart$;

  if (void 0 === l) {
    const t = null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o ? o : null;
    n._$litPart$ = l = new S(i.insertBefore(r(), t), t, void 0, null != s ? s : {});
  }

  return l._$AI(t), l;
},
      C = h.createTreeWalker(h, 129, null, !1),
      P = (t, i) => {
  const s = t.length - 1,
        n = [];
  let h,
      r = 2 === i ? "<svg>" : "",
      d = c;

  for (let i = 0; i < s; i++) {
    const s = t[i];
    let e,
        u,
        v = -1,
        p = 0;

    for (; p < s.length && (d.lastIndex = p, u = d.exec(s), null !== u);) p = d.lastIndex, d === c ? "!--" === u[1] ? d = a : void 0 !== u[1] ? d = f : void 0 !== u[2] ? ($.test(u[2]) && (h = RegExp("</" + u[2], "g")), d = _) : void 0 !== u[3] && (d = _) : d === _ ? ">" === u[0] ? (d = null != h ? h : c, v = -1) : void 0 === u[1] ? v = -2 : (v = d.lastIndex - u[2].length, e = u[1], d = void 0 === u[3] ? _ : '"' === u[3] ? m : g) : d === m || d === g ? d = _ : d === a || d === f ? d = c : (d = _, h = void 0);

    const y = d === _ && t[i + 1].startsWith("/>") ? " " : "";
    r += d === c ? s + l : v >= 0 ? (n.push(e), s.slice(0, v) + "$lit$" + s.slice(v) + o + y) : s + o + (-2 === v ? (n.push(void 0), i) : y);
  }

  const u = r + (t[s] || "<?>") + (2 === i ? "</svg>" : "");
  return [void 0 !== e ? e.createHTML(u) : u, n];
};

exports.render = A;
exports.nothing = x;
exports.noChange = T;
exports.svg = b;
exports.html = y;

class V {
  constructor({
    strings: t,
    _$litType$: i
  }, e) {
    let l;
    this.parts = [];
    let h = 0,
        d = 0;
    const u = t.length - 1,
          v = this.parts,
          [c, a] = P(t, i);

    if (this.el = V.createElement(c, e), C.currentNode = this.el.content, 2 === i) {
      const t = this.el.content,
            i = t.firstChild;
      i.remove(), t.append(...i.childNodes);
    }

    for (; null !== (l = C.nextNode()) && v.length < u;) {
      if (1 === l.nodeType) {
        if (l.hasAttributes()) {
          const t = [];

          for (const i of l.getAttributeNames()) if (i.endsWith("$lit$") || i.startsWith(o)) {
            const s = a[d++];

            if (t.push(i), void 0 !== s) {
              const t = l.getAttribute(s.toLowerCase() + "$lit$").split(o),
                    i = /([.?@])?(.*)/.exec(s);
              v.push({
                type: 1,
                index: h,
                name: i[2],
                strings: t,
                ctor: "." === i[1] ? k : "?" === i[1] ? H : "@" === i[1] ? I : M
              });
            } else v.push({
              type: 6,
              index: h
            });
          }

          for (const i of t) l.removeAttribute(i);
        }

        if ($.test(l.tagName)) {
          const t = l.textContent.split(o),
                i = t.length - 1;

          if (i > 0) {
            l.textContent = s ? s.emptyScript : "";

            for (let s = 0; s < i; s++) l.append(t[s], r()), C.nextNode(), v.push({
              type: 2,
              index: ++h
            });

            l.append(t[i], r());
          }
        }
      } else if (8 === l.nodeType) if (l.data === n) v.push({
        type: 2,
        index: h
      });else {
        let t = -1;

        for (; -1 !== (t = l.data.indexOf(o, t + 1));) v.push({
          type: 7,
          index: h
        }), t += o.length - 1;
      }

      h++;
    }
  }

  static createElement(t, i) {
    const s = h.createElement("template");
    return s.innerHTML = t, s;
  }

}

function E(t, i, s = t, e) {
  var o, n, l, h;
  if (i === T) return i;
  let r = void 0 !== e ? null === (o = s._$Cl) || void 0 === o ? void 0 : o[e] : s._$Cu;
  const u = d(i) ? void 0 : i._$litDirective$;
  return (null == r ? void 0 : r.constructor) !== u && (null === (n = null == r ? void 0 : r._$AO) || void 0 === n || n.call(r, !1), void 0 === u ? r = void 0 : (r = new u(t), r._$AT(t, s, e)), void 0 !== e ? (null !== (l = (h = s)._$Cl) && void 0 !== l ? l : h._$Cl = [])[e] = r : s._$Cu = r), void 0 !== r && (i = E(t, r._$AS(t, i.values), r, e)), i;
}

class N {
  constructor(t, i) {
    this.v = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
  }

  get parentNode() {
    return this._$AM.parentNode;
  }

  get _$AU() {
    return this._$AM._$AU;
  }

  p(t) {
    var i;
    const {
      el: {
        content: s
      },
      parts: e
    } = this._$AD,
          o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : h).importNode(s, !0);
    C.currentNode = o;
    let n = C.nextNode(),
        l = 0,
        r = 0,
        d = e[0];

    for (; void 0 !== d;) {
      if (l === d.index) {
        let i;
        2 === d.type ? i = new S(n, n.nextSibling, this, t) : 1 === d.type ? i = new d.ctor(n, d.name, d.strings, this, t) : 6 === d.type && (i = new L(n, this, t)), this.v.push(i), d = e[++r];
      }

      l !== (null == d ? void 0 : d.index) && (n = C.nextNode(), l++);
    }

    return o;
  }

  m(t) {
    let i = 0;

    for (const s of this.v) void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
  }

}

class S {
  constructor(t, i, s, e) {
    var o;
    this.type = 2, this._$AH = x, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cg = null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o;
  }

  get _$AU() {
    var t, i;
    return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i ? i : this._$Cg;
  }

  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return void 0 !== i && 11 === t.nodeType && (t = i.parentNode), t;
  }

  get startNode() {
    return this._$AA;
  }

  get endNode() {
    return this._$AB;
  }

  _$AI(t, i = this) {
    t = E(this, t, i), d(t) ? t === x || null == t || "" === t ? (this._$AH !== x && this._$AR(), this._$AH = x) : t !== this._$AH && t !== T && this.$(t) : void 0 !== t._$litType$ ? this.T(t) : void 0 !== t.nodeType ? this.S(t) : v(t) ? this.M(t) : this.$(t);
  }

  A(t, i = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, i);
  }

  S(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.A(t));
  }

  $(t) {
    this._$AH !== x && d(this._$AH) ? this._$AA.nextSibling.data = t : this.S(h.createTextNode(t)), this._$AH = t;
  }

  T(t) {
    var i;
    const {
      values: s,
      _$litType$: e
    } = t,
          o = "number" == typeof e ? this._$AC(t) : (void 0 === e.el && (e.el = V.createElement(e.h, this.options)), e);
    if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o) this._$AH.m(s);else {
      const t = new N(o, this),
            i = t.p(this.options);
      t.m(s), this.S(i), this._$AH = t;
    }
  }

  _$AC(t) {
    let i = w.get(t.strings);
    return void 0 === i && w.set(t.strings, i = new V(t)), i;
  }

  M(t) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let s,
        e = 0;

    for (const o of t) e === i.length ? i.push(s = new S(this.A(r()), this.A(r()), this, this.options)) : s = i[e], s._$AI(o), e++;

    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
  }

  _$AR(t = this._$AA.nextSibling, i) {
    var s;

    for (null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i); t && t !== this._$AB;) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }

  setConnected(t) {
    var i;
    void 0 === this._$AM && (this._$Cg = t, null === (i = this._$AP) || void 0 === i || i.call(this, t));
  }

}

class M {
  constructor(t, i, s, e, o) {
    this.type = 1, this._$AH = x, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = o, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = x;
  }

  get tagName() {
    return this.element.tagName;
  }

  get _$AU() {
    return this._$AM._$AU;
  }

  _$AI(t, i = this, s, e) {
    const o = this.strings;
    let n = !1;
    if (void 0 === o) t = E(this, t, i, 0), n = !d(t) || t !== this._$AH && t !== T, n && (this._$AH = t);else {
      const e = t;
      let l, h;

      for (t = o[0], l = 0; l < o.length - 1; l++) h = E(this, e[s + l], i, l), h === T && (h = this._$AH[l]), n || (n = !d(h) || h !== this._$AH[l]), h === x ? t = x : t !== x && (t += (null != h ? h : "") + o[l + 1]), this._$AH[l] = h;
    }
    n && !e && this.k(t);
  }

  k(t) {
    t === x ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "");
  }

}

class k extends M {
  constructor() {
    super(...arguments), this.type = 3;
  }

  k(t) {
    this.element[this.name] = t === x ? void 0 : t;
  }

}

class H extends M {
  constructor() {
    super(...arguments), this.type = 4;
  }

  k(t) {
    t && t !== x ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name);
  }

}

class I extends M {
  constructor(t, i, s, e, o) {
    super(t, i, s, e, o), this.type = 5;
  }

  _$AI(t, i = this) {
    var s;
    if ((t = null !== (s = E(this, t, i, 0)) && void 0 !== s ? s : x) === T) return;
    const e = this._$AH,
          o = t === x && e !== x || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive,
          n = t !== x && (e === x || o);
    o && this.element.removeEventListener(this.name, this, e), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }

  handleEvent(t) {
    var i, s;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s ? s : this.element, t) : this._$AH.handleEvent(t);
  }

}

class L {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
  }

  get _$AU() {
    return this._$AM._$AU;
  }

  _$AI(t) {
    E(this, t);
  }

}

const R = {
  P: "$lit$",
  V: o,
  L: n,
  I: 1,
  N: P,
  R: N,
  D: v,
  j: E,
  H: S,
  O: M,
  F: H,
  B: I,
  W: k,
  Z: L
};
exports._$LH = R;
null === (t = globalThis.litHtmlPolyfillSupport) || void 0 === t || t.call(globalThis, V, S), (null !== (i = globalThis.litHtmlVersions) && void 0 !== i ? i : globalThis.litHtmlVersions = []).push("2.0.0");
},{}],"../node_modules/lit-element/lit-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  LitElement: true,
  UpdatingElement: true,
  _$LE: true
};
exports._$LE = exports.UpdatingElement = exports.LitElement = void 0;

var _reactiveElement = require("@lit/reactive-element");

Object.keys(_reactiveElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _reactiveElement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _reactiveElement[key];
    }
  });
});

var _litHtml = require("lit-html");

Object.keys(_litHtml).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _litHtml[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _litHtml[key];
    }
  });
});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o, r;
const s = _reactiveElement.ReactiveElement;
exports.UpdatingElement = s;

class n extends _reactiveElement.ReactiveElement {
  constructor() {
    super(...arguments), this.renderOptions = {
      host: this
    }, this._$Dt = void 0;
  }

  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = i.firstChild), i;
  }

  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Dt = (0, _litHtml.render)(i, this.renderRoot, this.renderOptions);
  }

  connectedCallback() {
    var t;
    super.connectedCallback(), null === (t = this._$Dt) || void 0 === t || t.setConnected(!0);
  }

  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), null === (t = this._$Dt) || void 0 === t || t.setConnected(!1);
  }

  render() {
    return _litHtml.noChange;
  }

}

exports.LitElement = n;
n.finalized = !0, n._$litElement$ = !0, null === (l = globalThis.litElementHydrateSupport) || void 0 === l || l.call(globalThis, {
  LitElement: n
}), null === (o = globalThis.litElementPolyfillSupport) || void 0 === o || o.call(globalThis, {
  LitElement: n
});
const h = {
  _$AK: (t, e, i) => {
    t._$AK(e, i);
  },
  _$AL: t => t._$AL
};
exports._$LE = h;
(null !== (r = globalThis.litElementVersions) && void 0 !== r ? r : globalThis.litElementVersions = []).push("3.0.0");
},{"@lit/reactive-element":"../node_modules/@lit/reactive-element/reactive-element.js","lit-html":"../node_modules/lit-html/lit-html.js"}],"../node_modules/lit/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("@lit/reactive-element");

require("lit-html");

var _litElement = require("lit-element/lit-element.js");

Object.keys(_litElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _litElement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _litElement[key];
    }
  });
});
},{"@lit/reactive-element":"../node_modules/@lit/reactive-element/reactive-element.js","lit-html":"../node_modules/lit-html/lit-html.js","lit-element/lit-element.js":"../node_modules/lit-element/lit-element.js"}],"../node_modules/@lit/reactive-element/decorators/custom-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customElement = void 0;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n = n => e => "function" == typeof e ? ((n, e) => (window.customElements.define(n, e), e))(n, e) : ((n, e) => {
  const {
    kind: t,
    elements: i
  } = e;
  return {
    kind: t,
    elements: i,

    finisher(e) {
      window.customElements.define(n, e);
    }

  };
})(n, e);

exports.customElement = n;
},{}],"../node_modules/@lit/reactive-element/decorators/property.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.property = e;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i = (i, e) => "method" === e.kind && e.descriptor && !("value" in e.descriptor) ? { ...e,

  finisher(n) {
    n.createProperty(e.key, i);
  }

} : {
  kind: "field",
  key: Symbol(),
  placement: "own",
  descriptor: {},
  originalKey: e.key,

  initializer() {
    "function" == typeof e.initializer && (this[e.key] = e.initializer.call(this));
  },

  finisher(n) {
    n.createProperty(e.key, i);
  }

};

function e(e) {
  return (n, t) => void 0 !== t ? ((i, e, n) => {
    e.constructor.createProperty(n, i);
  })(e, n, t) : i(e, n);
}
},{}],"../node_modules/@lit/reactive-element/decorators/state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = t;

var _property = require("./property.js");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function t(t) {
  return (0, _property.property)({ ...t,
    state: !0
  });
}
},{"./property.js":"../node_modules/@lit/reactive-element/decorators/property.js"}],"../node_modules/@lit/reactive-element/decorators/base.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.standardPrototypeMethod = exports.legacyPrototypeMethod = exports.decorateProperty = void 0;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = (e, t, o) => {
  Object.defineProperty(t, o, e);
},
      t = (e, t) => ({
  kind: "method",
  placement: "prototype",
  key: t.key,
  descriptor: e
}),
      o = ({
  finisher: e,
  descriptor: t
}) => (o, n) => {
  var r;

  if (void 0 === n) {
    const n = null !== (r = o.originalKey) && void 0 !== r ? r : o.key,
          i = null != t ? {
      kind: "method",
      placement: "prototype",
      key: n,
      descriptor: t(o.key)
    } : { ...o,
      key: n
    };
    return null != e && (i.finisher = function (t) {
      e(t, n);
    }), i;
  }

  {
    const r = o.constructor;
    void 0 !== t && Object.defineProperty(o, n, t(n)), null == e || e(r, n);
  }
};

exports.decorateProperty = o;
exports.standardPrototypeMethod = t;
exports.legacyPrototypeMethod = e;
},{}],"../node_modules/@lit/reactive-element/decorators/event-options.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventOptions = e;

var _base = require("./base.js");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e(e) {
  return (0, _base.decorateProperty)({
    finisher: (r, t) => {
      Object.assign(r.prototype[t], e);
    }
  });
}
},{"./base.js":"../node_modules/@lit/reactive-element/decorators/base.js"}],"../node_modules/@lit/reactive-element/decorators/query.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = i;

var _base = require("./base.js");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function i(i, n) {
  return (0, _base.decorateProperty)({
    descriptor: o => {
      const t = {
        get() {
          var o, n;
          return null !== (n = null === (o = this.renderRoot) || void 0 === o ? void 0 : o.querySelector(i)) && void 0 !== n ? n : null;
        },

        enumerable: !0,
        configurable: !0
      };

      if (n) {
        const n = "symbol" == typeof o ? Symbol() : "__" + o;

        t.get = function () {
          var o, t;
          return void 0 === this[n] && (this[n] = null !== (t = null === (o = this.renderRoot) || void 0 === o ? void 0 : o.querySelector(i)) && void 0 !== t ? t : null), this[n];
        };
      }

      return t;
    }
  });
}
},{"./base.js":"../node_modules/@lit/reactive-element/decorators/base.js"}],"../node_modules/@lit/reactive-element/decorators/query-all.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryAll = e;

var _base = require("./base.js");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e(e) {
  return (0, _base.decorateProperty)({
    descriptor: r => ({
      get() {
        var r, o;
        return null !== (o = null === (r = this.renderRoot) || void 0 === r ? void 0 : r.querySelectorAll(e)) && void 0 !== o ? o : [];
      },

      enumerable: !0,
      configurable: !0
    })
  });
}
},{"./base.js":"../node_modules/@lit/reactive-element/decorators/base.js"}],"../node_modules/@lit/reactive-element/decorators/query-async.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryAsync = e;

var _base = require("./base.js");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e(e) {
  return (0, _base.decorateProperty)({
    descriptor: r => ({
      async get() {
        var r;
        return await this.updateComplete, null === (r = this.renderRoot) || void 0 === r ? void 0 : r.querySelector(e);
      },

      enumerable: !0,
      configurable: !0
    })
  });
}
},{"./base.js":"../node_modules/@lit/reactive-element/decorators/base.js"}],"../node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryAssignedNodes = o;

var _base = require("./base.js");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function o(o = "", n = !1, t = "") {
  return (0, _base.decorateProperty)({
    descriptor: e => ({
      get() {
        var e, r, l;
        const i = "slot" + (o ? `[name=${o}]` : ":not([name])");
        let u = null !== (l = null === (r = null === (e = this.renderRoot) || void 0 === e ? void 0 : e.querySelector(i)) || void 0 === r ? void 0 : r.assignedNodes({
          flatten: n
        })) && void 0 !== l ? l : [];
        return t && (u = u.filter(e => e.nodeType === Node.ELEMENT_NODE && e.matches(t))), u;
      },

      enumerable: !0,
      configurable: !0
    })
  });
}
},{"./base.js":"../node_modules/@lit/reactive-element/decorators/base.js"}],"../node_modules/lit/decorators.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _customElement = require("@lit/reactive-element/decorators/custom-element.js");

Object.keys(_customElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _customElement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _customElement[key];
    }
  });
});

var _property = require("@lit/reactive-element/decorators/property.js");

Object.keys(_property).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _property[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _property[key];
    }
  });
});

var _state = require("@lit/reactive-element/decorators/state.js");

Object.keys(_state).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _state[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _state[key];
    }
  });
});

var _eventOptions = require("@lit/reactive-element/decorators/event-options.js");

Object.keys(_eventOptions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _eventOptions[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _eventOptions[key];
    }
  });
});

var _query = require("@lit/reactive-element/decorators/query.js");

Object.keys(_query).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _query[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _query[key];
    }
  });
});

var _queryAll = require("@lit/reactive-element/decorators/query-all.js");

Object.keys(_queryAll).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _queryAll[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _queryAll[key];
    }
  });
});

var _queryAsync = require("@lit/reactive-element/decorators/query-async.js");

Object.keys(_queryAsync).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _queryAsync[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _queryAsync[key];
    }
  });
});

var _queryAssignedNodes = require("@lit/reactive-element/decorators/query-assigned-nodes.js");

Object.keys(_queryAssignedNodes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _queryAssignedNodes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _queryAssignedNodes[key];
    }
  });
});
},{"@lit/reactive-element/decorators/custom-element.js":"../node_modules/@lit/reactive-element/decorators/custom-element.js","@lit/reactive-element/decorators/property.js":"../node_modules/@lit/reactive-element/decorators/property.js","@lit/reactive-element/decorators/state.js":"../node_modules/@lit/reactive-element/decorators/state.js","@lit/reactive-element/decorators/event-options.js":"../node_modules/@lit/reactive-element/decorators/event-options.js","@lit/reactive-element/decorators/query.js":"../node_modules/@lit/reactive-element/decorators/query.js","@lit/reactive-element/decorators/query-all.js":"../node_modules/@lit/reactive-element/decorators/query-all.js","@lit/reactive-element/decorators/query-async.js":"../node_modules/@lit/reactive-element/decorators/query-async.js","@lit/reactive-element/decorators/query-assigned-nodes.js":"../node_modules/@lit/reactive-element/decorators/query-assigned-nodes.js"}],"../node_modules/lit-html/directive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.directive = exports.PartType = exports.Directive = void 0;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = {
  ATTRIBUTE: 1,
  CHILD: 2,
  PROPERTY: 3,
  BOOLEAN_ATTRIBUTE: 4,
  EVENT: 5,
  ELEMENT: 6
},
      e = t => (...e) => ({
  _$litDirective$: t,
  values: e
});

exports.directive = e;
exports.PartType = t;

class i {
  constructor(t) {}

  get _$AU() {
    return this._$AM._$AU;
  }

  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }

  _$AS(t, e) {
    return this.update(t, e);
  }

  update(t, e) {
    return this.render(...e);
  }

}

exports.Directive = i;
},{}],"../node_modules/lit-html/directives/class-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classMap = void 0;

var _litHtml = require("../lit-html.js");

var _directive = require("../directive.js");

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o = (0, _directive.directive)(class extends _directive.Directive {
  constructor(t) {
    var i;
    if (super(t), t.type !== _directive.PartType.ATTRIBUTE || "class" !== t.name || (null === (i = t.strings) || void 0 === i ? void 0 : i.length) > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }

  render(t) {
    return " " + Object.keys(t).filter(i => t[i]).join(" ") + " ";
  }

  update(i, [s]) {
    var r, o;

    if (void 0 === this.st) {
      this.st = new Set(), void 0 !== i.strings && (this.et = new Set(i.strings.join(" ").split(/\s/).filter(t => "" !== t)));

      for (const t in s) s[t] && !(null === (r = this.et) || void 0 === r ? void 0 : r.has(t)) && this.st.add(t);

      return this.render(s);
    }

    const e = i.element.classList;
    this.st.forEach(t => {
      t in s || (e.remove(t), this.st.delete(t));
    });

    for (const t in s) {
      const i = !!s[t];
      i === this.st.has(t) || (null === (o = this.et) || void 0 === o ? void 0 : o.has(t)) || (i ? (e.add(t), this.st.add(t)) : (e.remove(t), this.st.delete(t)));
    }

    return _litHtml.noChange;
  }

});
exports.classMap = o;
},{"../lit-html.js":"../node_modules/lit-html/lit-html.js","../directive.js":"../node_modules/lit-html/directive.js"}],"../node_modules/lit/directives/class-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classMap = require("lit-html/directives/class-map.js");

Object.keys(_classMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _classMap[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _classMap[key];
    }
  });
});
},{"lit-html/directives/class-map.js":"../node_modules/lit-html/directives/class-map.js"}],"controllers/KeyController.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyDownController = void 0;

class KeyDownController {
  constructor(host) {
    this.handlekeyDown = e => {
      this.host.handlekeyDown(e);
    };

    (this.host = host).addController(this);
  }

  hostConnected() {
    document.addEventListener("keydown", this.handlekeyDown);
  }

  hostDisconnected() {
    document.removeEventListener("keydown", this.handlekeyDown);
  }

}

exports.KeyDownController = KeyDownController;
},{}],"styles/noselect.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noselectText = exports.noselect = void 0;

var _lit = require("lit");

var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const noselect = (0, _lit.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n.noselect {\n  -webkit-touch-callout: none; /* iOS Safari */\n    -webkit-user-select: none; /* Safari */\n     -khtml-user-select: none; /* Konqueror HTML */\n       -moz-user-select: none; /* Old versions of Firefox */\n        -ms-user-select: none; /* Internet Explorer/Edge */\n            user-select: none; /* Non-prefixed version, currently\n                                  supported by Chrome, Edge, Opera and Firefox */\n}\n"])));
exports.noselect = noselect;
const noselectText = "\n-webkit-touch-callout: none;\n    -webkit-user-select: none; \n     -khtml-user-select: none;\n       -moz-user-select: none; \n        -ms-user-select: none; \n            user-select: none;\n";
exports.noselectText = noselectText;
},{"lit":"../node_modules/lit/index.js"}],"styles/button.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.button = void 0;

var _lit = require("lit");

var _noselect = require("./noselect");

var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const button = [_noselect.noselect, (0, _lit.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    :host{\n        display: var(--button-display, inline-block);\n        height: var(--button-height);\n    }\n    .icon{\n        align-self: center;\n        justify-self: center;\n    }\n    .wrapper.mini{\n        padding: 2px 4px;\n        font-size: 0.9rem;\n    }\n    .wrapper.disabled{\n        opacity: 0.5;\n    }\n    .wrapper.icon-before, .wrapper.icon-after{\n        grid-template-columns: auto auto;\n    }\n    .wrapper.icon-before.icon-after{\n        grid-template-columns: auto auto auto;\n    }\n    .wrapper.borderless, div.wrapper.borderless:focus{\n        border: none;\n        outline: none;\n    }\n    div.wrapper.borderless:focus{\n        background-color: var(--button-background-hover,  hsl(222, 20%, 96%));\n    }\n    :host(.icon-before) .wrapper, \n    :host(.icon-after) .wrapper {\n        grid-template-columns:repeat(2, auto);\n    }\n    :host(.icon-before.icon-after) .wrapper{\n        grid-template-columns:repeat(3, auto);\n    }\n    .wrapper{\n        cursor: pointer;\n        display: grid;\n        gap: var(--button-icon-gap, 4px);\n        box-sizing: border-box;\n        align-items: center;\n        grid-template-columns: auto;\n        gap: 10px;\n        height: 100%;\n        padding: var(--button-padding, 6px 18px);\n        border: var(--button-border, 1px solid  hsl(222, 20%, 65%));\n        outline: var(--button-outline, none);\n        border-radius: var(--button-radius, 3px);\n        color: var(--button-color, hsl(222, 20%, 35%));\n        background-color: var(--button-backround, hsl(222, 20%, 99%));\n        --icon-fill: var(--button-color);\n        font-weight: var(--button-weight, 600);\n    }\n    .wrapper:not(.disabled):hover{\n        background-color: var(--button-background-hover,  hsl(222, 20%, 96%));\n    }\n    .wrapper:not(.disabled):focus{\n        background-color: var(--button-background-focus, var(--button-backround, hsl(222,20%, 99%)));\n        outline: var(--button-outline-focus, 1px solid hsla(222, 20%, 60%, 0.5));\n        \n    }\n\n    .wrapper.primary{\n        color: var(--button-primary, hsl(222, 95%, 98%));\n        background-color: var(--button-primary-background, hsl(222, 95%, 65%));\n        border: 1px solid var(--button-primary-border,  hsl(222, 95%, 45%));\n        --icon-fill: var(--button-primary);\n    }\n    .wrapper.primary:not(.disabled):hover{\n        background-color: var(--button-primary-background-hover,  hsl(222, 95%, 60%));\n    }\n    .wrapper.primary:not(.disabled):focus{\n        background-color: var(--button-primary-background-focus,  var(--button-primary-background, hsl(222, 95%, 65%)));\n        outline: var(--button-primary-outline-focus, 1px solid  hsl(222, 95%, 45%));\n    }\n\n    .wrapper.success{\n        color: var(--button-success, hsl(120, 95%, 15%));\n        background-color: var(--button-success-background, hsl(110, 85%, 70%));\n        border: var(--button-success-border, 1px solid hsl(120, 95%, 45%));\n        --icon-fill: var(--button-success);\n    }\n    .wrapper.success:not(.disabled):hover{\n        background-color: var(--button-success-background-hover, hsl(120, 95%, 80%));\n    }\n    .wrapper.success:not(.disabled):focus{\n        background-color: var(--button-success-background-focus, hsl(120, 95%, 70%));\n        outline: var(--button-success-outline-focus, 1px solid hsl(120, 95%, 50%));\n    }\n\n    .wrapper.danger{\n        color: var(--button-danger, hsl(1, 95%, 15%));\n        background-color: var(--button-danger-background, hsl(1, 95%, 80%));\n        border: 1px solid var(--button-danger-border, hsl(1, 95%, 55%));\n        --icon-fill: var(--button-danger);\n    }\n    .wrapper.danger:not(.disabled):hover{\n        background-color: var(--button-danger-background-hover,  hsl(1, 95%, 75%));\n    }\n    .wrapper.danger:not(.disabled):focus{\n        background-color: var(--button-danger-background-hover,  hsl(1, 95%, 80%));\n        outline: var(--button-danger-outline-focus, 1px solid  hsl(1, 95%, 55%));\n    }\n\n    .wrapper.switch:focus{\n        outline: none;\n    }\n    .wrapper.switch.switch-on{\n        background-color: var(--button-switch-backround, hsl(222, 80%, 60%));\n        color: var(--button-switch-color, hsl(222, 80%, 98%));\n    }\n    .wrapper.switch:not(.switch-on):not(:hover),\n    .wrapper.switch:not(.switch-on):focus\n    {\n        background-color: transparent;\n    }\n    "])))];
exports.button = button;
},{"lit":"../node_modules/lit/index.js","./noselect":"styles/noselect.ts"}],"button/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtomElement = void 0;

var _tslib = require("tslib");

var _lit = require("lit");

var _decorators = require("lit/decorators");

var _classMap = require("lit/directives/class-map");

var _KeyController = require("../controllers/KeyController");

var _button = require("../styles/button");

var _templateObject, _templateObject2, _templateObject3;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let ButtomElement = class ButtomElement extends _lit.LitElement {
  constructor() {
    super(...arguments);
    this.iconBefore = '';
    this.iconAfter = '';
    this.type = 'button';
    this.size = 'medium';
    this.tabindex = 0;
    this.disabled = false;
    this.borderless = false;
    this.switch = false;
    this.primary = false;
    this.secondary = false;
    this.success = false;
    this.danger = false;
    this.switchOn = true;
    this.enter = new _KeyController.KeyDownController(this);
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  get classes() {
    return {
      borderless: this.borderless,
      switch: this.switch,
      "switch-on": this.switchOn,
      primary: this.primary,
      secondary: this.secondary,
      success: this.success,
      danger: this.danger,
      disabled: this.disabled,
      wrapper: true,
      noselect: true,
      "icon-before": !!this.iconBefore,
      "icon-after": !!this.iconAfter
    };
  }

  _iconBeforeTemplate() {
    if (!this.iconBefore) return _lit.nothing;
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<span class = \"icon-before icon\">", "</span>"])), this.iconBefore);
  }

  _iconAfterTemplate() {
    if (!this.iconAfter) return _lit.nothing;
    return (0, _lit.html)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["<span class = \"icon-after icon\">", "</span>"])), this.iconAfter);
  }

  render() {
    return (0, _lit.html)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        <div tabindex = \"", "\" \n            class = \"", "\" \n            @click = \"", "\">\n            <slot @slotchange = \"", "\" \n                  name = \"icon-before\"></slot>\n            <div><slot></slot></div>\n            <slot @slotchange = \"", "\"\n                  name = \"icon-after\"></slot>\n        </div>"])), this.tabindex, (0, _classMap.classMap)(this.classes), this._click, this._onIconBefore, this._onIconAfter);
  } // ==== Events ====


  _onIconBefore(e) {
    this.classList.add('icon-before');
  }

  _onIconAfter(e) {
    this.classList.add('icon-after');
  }

  handlekeyDown(e) {
    if (e.key === "Enter" && document.activeElement === this) {
      this.submit();
    }
  }

  _click() {
    if (this.disabled) return;

    if (this.switch) {
      this.toggleSwitch();
    } else {
      this.submit();
    }
  } // ==== Actions ====


  toggleSwitch() {
    this.switchOn = !this.switchOn;
    this.dispatchEvent(new CustomEvent("switchChanged", {
      detail: this.switchOn,
      bubbles: true
    }));
  }

  submit() {
    if (this.type === 'submit') {
      this.dispatchEvent(new CustomEvent("submitForm", {
        bubbles: true,
        composed: true
      }));
    }
  }

};
exports.ButtomElement = ButtomElement;
ButtomElement.styles = _button.button;
(0, _tslib.__decorate)([(0, _decorators.property)()], ButtomElement.prototype, "iconBefore", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)()], ButtomElement.prototype, "iconAfter", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], ButtomElement.prototype, "type", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], ButtomElement.prototype, "size", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], ButtomElement.prototype, "tabindex", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], ButtomElement.prototype, "disabled", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], ButtomElement.prototype, "borderless", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], ButtomElement.prototype, "switch", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], ButtomElement.prototype, "primary", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], ButtomElement.prototype, "secondary", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], ButtomElement.prototype, "success", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], ButtomElement.prototype, "danger", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], ButtomElement.prototype, "switchOn", void 0);
exports.ButtomElement = ButtomElement = (0, _tslib.__decorate)([(0, _decorators.customElement)("button-element")], ButtomElement);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit":"../node_modules/lit/index.js","lit/decorators":"../node_modules/lit/decorators.js","lit/directives/class-map":"../node_modules/lit/directives/class-map.js","../controllers/KeyController":"controllers/KeyController.ts","../styles/button":"styles/button.ts"}],"circlepercent/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CirclePercent = void 0;

var _tslib = require("tslib");

var _lit = require("lit");

var _decorators = require("lit/decorators");

var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let CirclePercent = class CirclePercent extends _lit.LitElement {
  constructor() {
    super(...arguments);
    this._percent = 0;
    this.size = 0;
    this.ratio = 2;
    this._ctx = null;
  }

  static get properties() {
    return {
      percent: {
        type: Number
      }
    };
  }

  get percent() {
    return this._percent;
  }

  set percent(value) {
    if (value > 100) value = 100;
    this._percent = value;
    this.renderCircle();
  }

  _init() {
    this._ctx = this.canvas.getContext('2d');
    this._ctx.canvas.height = this.clientHeight * this.ratio;
    this._ctx.canvas.width = this.clientWidth * this.ratio;
    this._ctx.lineWidth = this.lineWidth;
  }

  get lineWidth() {
    return 1 * this.ratio;
  }

  get radius() {
    return this.size * this.ratio / 2;
  }

  getColor() {
    const styles = window.getComputedStyle(this.canvas);
    const color = styles.getPropertyValue("--circle-color");
    return color || "#aaa";
  }

  renderCircle() {
    if (!this._ctx) return;
    const color = this.getColor();
    this._ctx.strokeStyle = color;
    this._ctx.fillStyle = color;

    this._ctx.clearRect(0, 0, this.radius * 2, this.radius * 2);

    this._ctx.lineWidth = 0;

    if (this.percent) {
      this._ctx.beginPath();

      this._ctx.moveTo(this.radius, this.radius);

      this._ctx.lineTo(this.radius, 0);

      this._ctx.arc(this.radius, this.radius, this.radius - this.ratio, -Math.PI / 2, this.percent / 100 * 2 * Math.PI - Math.PI / 2);

      this._ctx.fill();
    }

    this._ctx.beginPath();

    this._ctx.arc(this.radius, this.radius, this.radius - this.lineWidth - 1, 0, 2 * Math.PI);

    this._ctx.stroke();
  }

  render() {
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<canvas></canvas>"])));
  }

  updated() {
    this.renderCircle();
  }

  firstUpdated() {
    if (this.size) {
      this.style.setProperty('--percent-size', this.size + "px");
    } else {
      this.size = parseInt(this.style.getPropertyValue('--percent-size')) || 14;
    }

    this._init();
  }

};
exports.CirclePercent = CirclePercent;
CirclePercent.styles = (0, _lit.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    :host{\n        display: block;\n        height: var(--percent-size, 14px);\n        width: var(--percent-size, 14px);\n    }\n    canvas{\n        width: 100%;\n        height: 100%;\n        display: block;\n    }\n    "])));
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number,
  attribute: true
})], CirclePercent.prototype, "size", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number,
  attribute: true
})], CirclePercent.prototype, "ratio", void 0);
(0, _tslib.__decorate)([(0, _decorators.query)('canvas')], CirclePercent.prototype, "canvas", void 0);
exports.CirclePercent = CirclePercent = (0, _tslib.__decorate)([(0, _decorators.customElement)('circle-percent')], CirclePercent);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit":"../node_modules/lit/index.js","lit/decorators":"../node_modules/lit/decorators.js"}],"controllers/OuterClickRemoveController.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OuterClickRemoveController = void 0;

class OuterClickRemoveController {
  constructor(host) {
    this.handleClick = e => {
      this.host.handleClick(e);
    };

    (this.host = host).addController(this);
  }

  hostConnected() {
    document.addEventListener("click", this.handleClick);
  }

  hostDisconnected() {
    document.removeEventListener("click", this.handleClick);
  }

}

exports.OuterClickRemoveController = OuterClickRemoveController;
},{}],"note/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoteElement = void 0;

var _tslib = require("tslib");

var _lit = require("lit");

var _decorators = require("lit/decorators");

var _OuterClickRemoveController = require("../controllers/OuterClickRemoveController");

var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let NoteElement = class NoteElement extends _lit.LitElement {
  constructor() {
    super(...arguments);
    this._hosted = 0;
    this._minShowTime = 500;
    this._handle = new _OuterClickRemoveController.OuterClickRemoveController(this);
  }

  getSize() {
    const bound = this.getBoundingClientRect();
    return {
      width: bound.width,
      height: bound.height
    };
  }

  show() {
    this.classList.add('visible');
  }

  connectedCallback() {
    super.connectedCallback();
    this._hosted = Date.now();
  }

  render() {
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<slot></slot>"])));
  }

  handleClick(e) {
    if (e.target !== this && Date.now() - this._hosted > this._minShowTime) {
      this.dispatchEvent(new CustomEvent("close"));
    }
  }

};
exports.NoteElement = NoteElement;
NoteElement.styles = (0, _lit.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    :host{\n        display: block;\n        position: absolute;/*\n        visibility: hidden;\n        opacity: 0;*/\n        transition: 0.4s ease-in;\n        border: 1px solid var(--note-border-color);\n        z-index: 10;\n        padding: 5px;\n        border-radius: 1px;\n        box-sizing: border-box;\n        background-color: var(--note-background-color, rgba(255,255,255,0.85));\n        color: var(--note-color);\n    }\n    :host(.visible){\n        visibility: visible;\n        opacity: 1;\n    }\n    :host(.error){\n        /*background-color: var(--note-error-background-color, #fff);*/\n        color: var(--note-error-color, red);\n        /*border: 1px solid var(--note-error-border-color, #ff7e6d);*/\n    }\n    "])));
exports.NoteElement = NoteElement = (0, _tslib.__decorate)([(0, _decorators.customElement)("note-element")], NoteElement);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit":"../node_modules/lit/index.js","lit/decorators":"../node_modules/lit/decorators.js","../controllers/OuterClickRemoveController":"controllers/OuterClickRemoveController.ts"}],"../node_modules/lit-html/directive-helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setCommittedValue = exports.setChildPartValue = exports.removePart = exports.isTemplateResult = exports.isSingleExpression = exports.isPrimitive = exports.isDirectiveResult = exports.insertPart = exports.getDirectiveClass = exports.getCommittedValue = exports.clearPart = exports.TemplateResultType = void 0;

var _litHtml = require("./lit-html.js");

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const {
  H: i
} = _litHtml._$LH,
      t = o => null === o || "object" != typeof o && "function" != typeof o,
      n = {
  HTML: 1,
  SVG: 2
},
      v = (o, i) => {
  var t, n;
  return void 0 === i ? void 0 !== (null === (t = o) || void 0 === t ? void 0 : t._$litType$) : (null === (n = o) || void 0 === n ? void 0 : n._$litType$) === i;
},
      l = o => {
  var i;
  return void 0 !== (null === (i = o) || void 0 === i ? void 0 : i._$litDirective$);
},
      d = o => {
  var i;
  return null === (i = o) || void 0 === i ? void 0 : i._$litDirective$;
},
      r = o => void 0 === o.strings,
      e = () => document.createComment(""),
      u = (o, t, n) => {
  var v;
  const l = o._$AA.parentNode,
        d = void 0 === t ? o._$AB : t._$AA;

  if (void 0 === n) {
    const t = l.insertBefore(e(), d),
          v = l.insertBefore(e(), d);
    n = new i(t, v, o, o.options);
  } else {
    const i = n._$AB.nextSibling,
          t = n._$AM,
          r = t !== o;

    if (r) {
      let i;
      null === (v = n._$AQ) || void 0 === v || v.call(n, o), n._$AM = o, void 0 !== n._$AP && (i = o._$AU) !== t._$AU && n._$AP(i);
    }

    if (i !== d || r) {
      let o = n._$AA;

      for (; o !== i;) {
        const i = o.nextSibling;
        l.insertBefore(o, d), o = i;
      }
    }
  }

  return n;
},
      c = (o, i, t = o) => (o._$AI(i, t), o),
      f = {},
      s = (o, i = f) => o._$AH = i,
      a = o => o._$AH,
      m = o => {
  var i;
  null === (i = o._$AP) || void 0 === i || i.call(o, !1, !0);
  let t = o._$AA;
  const n = o._$AB.nextSibling;

  for (; t !== n;) {
    const o = t.nextSibling;
    t.remove(), t = o;
  }
},
      p = o => {
  o._$AR();
};

exports.clearPart = p;
exports.removePart = m;
exports.getCommittedValue = a;
exports.setCommittedValue = s;
exports.setChildPartValue = c;
exports.insertPart = u;
exports.isSingleExpression = r;
exports.getDirectiveClass = d;
exports.isDirectiveResult = l;
exports.isTemplateResult = v;
exports.TemplateResultType = n;
exports.isPrimitive = t;
},{"./lit-html.js":"../node_modules/lit-html/lit-html.js"}],"../node_modules/lit-html/async-directive.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsyncDirective = void 0;
Object.defineProperty(exports, "directive", {
  enumerable: true,
  get: function () {
    return _directive.directive;
  }
});

var _directiveHelpers = require("./directive-helpers.js");

var _directive = require("./directive.js");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = (i, t) => {
  var s, o;
  const n = i._$AN;
  if (void 0 === n) return !1;

  for (const i of n) null === (o = (s = i)._$AO) || void 0 === o || o.call(s, t, !1), e(i, t);

  return !0;
},
      o = i => {
  let t, s;

  do {
    if (void 0 === (t = i._$AM)) break;
    s = t._$AN, s.delete(i), i = t;
  } while (0 === (null == s ? void 0 : s.size));
},
      n = i => {
  for (let t; t = i._$AM; i = t) {
    let s = t._$AN;
    if (void 0 === s) t._$AN = s = new Set();else if (s.has(i)) break;
    s.add(i), l(t);
  }
};

function r(i) {
  void 0 !== this._$AN ? (o(this), this._$AM = i, n(this)) : this._$AM = i;
}

function h(i, t = !1, s = 0) {
  const n = this._$AH,
        r = this._$AN;
  if (void 0 !== r && 0 !== r.size) if (t) {
    if (Array.isArray(n)) for (let i = s; i < n.length; i++) e(n[i], !1), o(n[i]);else null != n && (e(n, !1), o(n));
  } else e(this, i);
}

const l = i => {
  var t, e, o, n;
  i.type == _directive.PartType.CHILD && (null !== (t = (o = i)._$AP) && void 0 !== t || (o._$AP = h), null !== (e = (n = i)._$AQ) && void 0 !== e || (n._$AQ = r));
};

class d extends _directive.Directive {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }

  _$AT(i, t, s) {
    super._$AT(i, t, s), n(this), this.isConnected = i._$AU;
  }

  _$AO(i, t = !0) {
    var s, n;
    i !== this.isConnected && (this.isConnected = i, i ? null === (s = this.reconnected) || void 0 === s || s.call(this) : null === (n = this.disconnected) || void 0 === n || n.call(this)), t && (e(this, i), o(this));
  }

  setValue(t) {
    if ((0, _directiveHelpers.isSingleExpression)(this._$Ct)) this._$Ct._$AI(t, this);else {
      const i = [...this._$Ct._$AH];
      i[this._$Ci] = t, this._$Ct._$AI(i, this, 0);
    }
  }

  disconnected() {}

  reconnected() {}

}

exports.AsyncDirective = d;
},{"./directive-helpers.js":"../node_modules/lit-html/directive-helpers.js","./directive.js":"../node_modules/lit-html/directive.js"}],"../node_modules/lit-html/directives/ref.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ref = exports.createRef = void 0;

var _litHtml = require("../lit-html.js");

var _asyncDirective = require("../async-directive.js");

var _directive = require("../directive.js");

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e = () => new o();

exports.createRef = e;

class o {}

const h = new WeakMap(),
      n = (0, _directive.directive)(class extends _asyncDirective.AsyncDirective {
  render(i) {
    return _litHtml.nothing;
  }

  update(i, [s]) {
    var e;
    const o = s !== this.U;
    return o && void 0 !== this.U && this.nt(void 0), (o || this.rt !== this.lt) && (this.U = s, this.ht = null === (e = i.options) || void 0 === e ? void 0 : e.host, this.nt(this.lt = i.element)), _litHtml.nothing;
  }

  nt(t) {
    "function" == typeof this.U ? (void 0 !== h.get(this.U) && this.U.call(this.ht, void 0), h.set(this.U, t), void 0 !== t && this.U.call(this.ht, t)) : this.U.value = t;
  }

  get rt() {
    var t;
    return "function" == typeof this.U ? h.get(this.U) : null === (t = this.U) || void 0 === t ? void 0 : t.value;
  }

  disconnected() {
    this.rt === this.lt && this.nt(void 0);
  }

  reconnected() {
    this.nt(this.lt);
  }

});
exports.ref = n;
},{"../lit-html.js":"../node_modules/lit-html/lit-html.js","../async-directive.js":"../node_modules/lit-html/async-directive.js","../directive.js":"../node_modules/lit-html/directive.js"}],"../node_modules/lit/directives/ref.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ref = require("lit-html/directives/ref.js");

Object.keys(_ref).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ref[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ref[key];
    }
  });
});
},{"lit-html/directives/ref.js":"../node_modules/lit-html/directives/ref.js"}],"form-associated/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formAssociated = void 0;

var _tslib = require("tslib");

var _lit = require("lit");

var _decorators = require("lit/decorators");

require("../note");

var _ref = require("lit/directives/ref.js");

var _templateObject;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const defaultValidationMessages = {
  badInput: {
    "en": "Bad input"
  },
  customError: {
    "en": "Custom error"
  },
  patternMismatch: {
    "en": "Pattern ${pattern} error"
  },
  rangeOverflow: {
    "en": "Value must be less then ${max}"
  },
  rangeUnderflow: {
    "en": "Value must be more then ${min}"
  },
  stepMismatch: {
    "en": "Value must be in step of ${step}"
  },
  tooLong: {
    "en": "Value is too long"
  },
  tooShort: {
    "en": "Value is too short"
  },
  valueMissing: {
    "en": "Value is required"
  },
  typeMismatch: {
    "en": "Type mismatch"
  }
};

const formAssociated = superClass => {
  class FormAssociated extends superClass {
    constructor() {
      super(...arguments);
      this._formAssiciated = true;
      this.showNote = false;
      this.disabled = false;
      this.required = false;
      this.readonly = false;
      this.name = '';
      this.validity = {
        badInput: false,
        customError: false,
        patternMismatch: false,
        rangeOverflow: false,
        rangeUnderflow: false,
        stepMismatch: false,
        tooLong: false,
        tooShort: false,
        typeMismatch: false,
        valueMissing: false
      };
      this.noteRef = (0, _ref.createRef)();
      this.valid = true;
      this.value = '';
      this.customValidationMessage = '';
      this._isFirstUpdated = false;
      this.min = NaN;
      this.max = NaN;
      this.step = NaN;
      this.pattern = '';
      this.required = false;
    }

    static get properties() {
      return {
        value: {
          type: String
        }
      };
    }

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener("keypress", this._handleKeypress);
      this.dispatchEvent(new CustomEvent("fromAttached", {
        bubbles: true,
        composed: true,
        detail: this
      }));
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.dispatchEvent(new CustomEvent("fromDettached", {
        bubbles: true,
        composed: true,
        detail: this
      }));
    }

    render() {
      if (this.showNote) {
        //const {x, y} = calcPositionForPopup(this, {width: 400, height: 40});
        // style = "left: ${x}px; top: ${y + 5}px"
        return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<note-element \n                    @close = \"", "\" \n                    style = \"transform: translate(0, -100%);\"\n                    class = \"error\" ", ">", "</note-element>"])), this._handleCloseNote, (0, _ref.ref)(this.noteRef), this.validationMessage);
      }

      return _lit.nothing;
    }

    updated(_changedProperties) {
      if (_changedProperties.has("disabled")) {
        this.disabled ? this.classList.add("disabled") : this.classList.remove("disabled");
      }

      if (_changedProperties.has("readonly")) {
        this.readonly ? this.classList.add("readonly") : this.classList.remove("readonly");
      }
    }

    async firstUpdated() {
      await this.updateComplete;
      this._isFirstUpdated = true;
    }

    findLabel() {
      let parent = this.parentElement;

      if ((parent === null || parent === void 0 ? void 0 : parent.tagName) === "LABEL-ELEMENT") {
        return parent;
      }

      while (parent) {
        if ((parent === null || parent === void 0 ? void 0 : parent.tagName) === "LABEL-ELEMENT") {
          return parent;
        }

        parent = parent.parentElement;
      }

      return null;
    }
    /** Validation */


    _getLang() {
      return window.ValidationsMessagesLang || window.navigator.language.split('-')[0];
    }

    _getErrorText(key) {
      var _a, _b;

      const text = ((_a = window.ValidationsMessages) === null || _a === void 0 ? void 0 : _a[key][this._getLang()]) || ((_b = window.ValidationsMessages) === null || _b === void 0 ? void 0 : _b[key]['en']) || defaultValidationMessages[key][this._getLang()] || defaultValidationMessages[key]['en'];
      const data = {
        min: this.min,
        max: this.max,
        step: this.step
      };
      return text.replace(/\$\{([a-zA-Z0-9_.,=)( ]+)\}/g, (m, n) => {
        let value = data[n];
        return value !== undefined ? String(value) : m;
      });
    }

    get validationMessage() {
      const keys = Object.keys(this.validity);

      for (const key of keys) {
        const v = this.validity[key];

        if (v) {
          return this._getErrorText(key);
        }
      }

      return "";
    }

    checkValidity() {
      if (!this._isFirstUpdated) return false;
      this.valid = !Object.values(this.validity).filter(it => it).length;

      if (this.isConnected) {
        if (this.valid) {
          this.classList.remove("error-valid");
        } else {
          this.classList.add("error-valid");
        }
      }

      return this.valid;
    }

    reportValidity() {
      const validity = this.checkValidity();
      this.showNote = !validity;
      return validity;
    }

    validate() {
      if (this.required && !this.value) {
        this.setValidity({
          valueMissing: true
        });
      } else if (!this.required || this.value) {
        this.setValidity({
          valueMissing: false
        });
      }
    }

    setValidity(flags, message, anchor) {
      this.validity = _objectSpread(_objectSpread({}, this.validity), flags);

      if (message) {
        this.customValidationMessage = message;
      }

      this.checkValidity();
    }
    /** ========= */


    _handleCloseNote() {
      this.showNote = false;
    }

    _handleKeypress(e) {
      if (e.key === 'Enter') {
        this.dispatchEvent(new CustomEvent('submitForm', {
          bubbles: true,
          composed: true
        }));
      }
    }

  }

  (0, _tslib.__decorate)([(0, _decorators.property)({
    type: Boolean,
    reflect: true
  })], FormAssociated.prototype, "showNote", void 0);
  (0, _tslib.__decorate)([(0, _decorators.property)({
    type: Boolean,
    reflect: true
  })], FormAssociated.prototype, "disabled", void 0);
  (0, _tslib.__decorate)([(0, _decorators.property)({
    type: Boolean
  })], FormAssociated.prototype, "required", void 0);
  (0, _tslib.__decorate)([(0, _decorators.property)({
    type: Boolean
  })], FormAssociated.prototype, "readonly", void 0);
  (0, _tslib.__decorate)([(0, _decorators.property)({
    type: String
  })], FormAssociated.prototype, "name", void 0);
  ;
  return FormAssociated;
  ;
};

exports.formAssociated = formAssociated;
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit":"../node_modules/lit/index.js","lit/decorators":"../node_modules/lit/decorators.js","../note":"note/index.ts","lit/directives/ref.js":"../node_modules/lit/directives/ref.js"}],"styles/input.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.input = void 0;

var _lit = require("lit");

var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const input = (0, _lit.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n:host{\n    display: var(--input-display, inline-block);\n    height: var(--input-height);\n}\n:host(.error-valid) input{\n    border: 1px solid var(--error-border, #ff7e6d);\n}\n:host(.error-valid) input:focus{\n    outline: 1px solid var(--error-border, #ff7e6d);\n}\n:host(.disabled){\n    opacity: 0.8;\n}\n:host(.readonly){\n    opacity: 0.9;\n}\n.wrapper{\n    position: relative;\n    height: 100%;\n}\n.icon{\n    position: absolute;\n    right: 5px;\n    top: 50%;\n    transform: translateY(-50%);\n}\ninput, textarea{\n    height: 100%;\n    width: 100%;\n    font-size: var(--input-font-size, inherit);\n    box-sizing: border-box;\n    padding: var(--input-padding, 2px 8px);\n    border: 1px solid var(--input-border, hsla(222, 20%, 60%, 0.5));\n    text-align: var(--input-align, initial);\n    background-color: var(--input-background, #fff);\n}\n\ninput:focus, \ntextarea:focus{\n    outline: var(--input-outline-focus, 1px solid hsla(222, 20%, 60%, 0.5));\n}\ninput:focus::-webkit-input-placeholder {opacity: 0; transition: opacity 0.3s ease;}\ninput:focus::-moz-placeholder          {opacity: 0; transition: opacity 0.3s ease;}\ninput:focus:-moz-placeholder           {opacity: 0; transition: opacity 0.3s ease;}\ninput:focus:-ms-input-placeholder      {opacity: 0; transition: opacity 0.3s ease;}\n\ninput:-webkit-autofill,\ninput:-webkit-autofill:hover,\ninput:-webkit-autofill:focus,\ninput:-webkit-autofill:active{\n    box-shadow: 0 0 0 30px white inset\n}\n\ntextarea{\n}\n\ntextarea:focus::-webkit-input-placeholder {opacity: 0; transition: opacity 0.3s ease;}\ntextarea:focus::-moz-placeholder          {opacity: 0; transition: opacity 0.3s ease;}\ntextarea:focus:-moz-placeholder           {opacity: 0; transition: opacity 0.3s ease;}\ntextarea:focus:-ms-input-placeholder      {opacity: 0; transition: opacity 0.3s ease;}\n"])));
exports.input = input;
},{"lit":"../node_modules/lit/index.js"}],"checkbox/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckboxElement = void 0;

var _tslib = require("tslib");

var _decorators = require("lit/decorators");

var _index = require("../form-associated/index");

var _lit = require("lit");

var _input = require("../styles/input");

var _templateObject, _templateObject2, _templateObject3;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let CheckboxElement = class CheckboxElement extends (0, _index.formAssociated)(_lit.LitElement) {
  constructor() {
    super(...arguments);
    this.type = "switcher";
    this._checked = false;
    this._value = 'off';
  }

  static get properties() {
    return _objectSpread(_objectSpread({}, super.properties), {}, {
      value: {
        type: String
      },
      checked: {
        type: Boolean
      }
    });
  }

  get checked() {
    return this._checked;
  }

  set checked(value) {
    this.value = value ? 'on' : 'off';
  }

  get value() {
    return this._value;
  }

  set value(value) {
    const oldValue = this._value;
    this._value = value;
    this._checked = value === 'on';
    this.requestUpdate('value', oldValue);
  }

  connectedCallback() {
    var _a;

    super.connectedCallback();
    (_a = this.findLabel()) === null || _a === void 0 ? void 0 : _a.appendConnectedField(this);
  }

  disconnectedCallback() {
    var _a;

    super.disconnectedCallback();
    (_a = this.findLabel()) === null || _a === void 0 ? void 0 : _a.removeConnectedField(this);
  }

  _switcherTemplate() {
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<div \n            @click = \"", "\" \n            class = \"switcher ", " ", "\"><span class = \"control\"></span></div>"])), this._handleClick, this.readonly ? 'readonly' : '', this.value);
  }

  _checkboxTemplate() {
    return (0, _lit.html)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["<div \n            @click = \"", "\" \n            class = \"checkbox ", " ", "\">\n    </div>"])), this._handleClick, this.readonly ? 'readonly' : '', this.value);
  }

  render() {
    if (this.type === 'switcher') {
      return this._switcherTemplate();
    }

    return this._checkboxTemplate();
  }

  _handleClick() {
    if (this.readonly) return;
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent("changed", {
      bubbles: true,
      detail: {
        value: this.value,
        checked: this.checked
      }
    }));
  }

};
exports.CheckboxElement = CheckboxElement;
CheckboxElement.styles = [_input.input, (0, _lit.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        :host{\n            --checkbox-switcher-width: 32px;\n            --checkbox-switcher-height: 14px;\n            --checkbox-control-size: 14px;\n            --offset: calc((var(--checkbox-switcher-height) - var(--checkbox-control-size) - 2px ) / 2);\n\n            --checkmark-border: 2px;\n            --checkmark-width: 5px;\n            --checkmark-height: 8px;\n            --checkmark-left: calc(var(--checkbox-control-size) - var(--checkmark-width) - var(--checkmark-border) - 3px);\n            --checkmark-top: calc(var(--checkbox-control-size) - var(--checkmark-height) - var(--checkmark-border) - 4px);\n\n        }\n        .checkbox{\n            width: var(--checkbox-control-size);\n            height: var(--checkbox-control-size);\n            border: 1px solid var(--checkbox-border, #999);\n            position: relative;\n            cursor: pointer;\n            \n        }\n        .checkbox:hover{\n            box-shadow: 0 0 2px var(--checkbox-border, #999);\n        }\n        .checkbox.on{\n            background-color: var(--checkbox-off-background, white);\n        }\n        .checkbox.on:after{\n            content:'';\n            position: absolute;\n            top: var(--checkmark-top);\n            left: var(--checkmark-left);\n                    \n            transform-origin: center;\n            transform:  rotate(45deg) skewX(15deg) ;\n            height: var(--checkmark-height);\n            width: var(--checkmark-width);\n            border-bottom: var(--checkmark-border) solid var(--checkmark-color, hsl(100, 65%, 5%));\n            border-right: var(--checkmark-border) solid var(--checkmark-color, hsl(100, 65%, 5%));\n        }\n        .switcher{\n            cursor: pointer;\n            position: relative;\n            width: var(--checkbox-switcher-width);\n            height: var(--checkbox-switcher-height);\n            border-radius: 16px;\n            z-index: 2;\n            background-color: var(--checkbox-off-background, hsl(0, 65%, 55%));\n            transition: background-color ease 0.2s;\n            box-shadow: var(--checkbox-switcher-shadow, inset 1px 1px 2px rgba(0,0,0,0.7));\n        }\n        .switcher .control{\n            position: absolute;\n            background-color: var(--checkbox-switcher-control-background,#fff);\n            border: var(--checkbox-switcher-control-border, 1px solid #ccc); ;\n            border-radius: var(--checkbox-control-size);\n            width: var(--checkbox-control-size);\n            height: var(--checkbox-control-size);\n            top: var(--offset);\n            left: var(--offset);\n            box-shadow: var(--checkbox-switcher-control-shadow, 1px 1px 2px rgba(0,0,0,0.6));\n            transition: transform ease 0.2s;\n        }\n        .switcher.on {\n            background-color: var(--checkbox-on-background, hsl(110, 65%, 50%));\n        }\n        .switcher.on .control{\n            transform: translateX(calc(var(--checkbox-switcher-width) - var(--checkbox-control-size) + 1px));\n        }\n        .readonly{\n            opacity: 0.5;\n        }\n        "])))];
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], CheckboxElement.prototype, "type", void 0);
exports.CheckboxElement = CheckboxElement = (0, _tslib.__decorate)([(0, _decorators.customElement)("checkbox-element")], CheckboxElement);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit/decorators":"../node_modules/lit/decorators.js","../form-associated/index":"form-associated/index.ts","lit":"../node_modules/lit/index.js","../styles/input":"styles/input.ts"}],"helpers.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isiOS = exports.isChildOfElement = exports.getRootElement = exports.getParentTagName = exports.getEventDataset = exports.getClientX = void 0;

const getParentTagName = (el, tagName) => {
  let current = el;

  while (current) {
    if (current.tagName.toLowerCase() === tagName) {
      return current;
    }

    current = current.parentElement;
  }

  return null;
};

exports.getParentTagName = getParentTagName;

const getRootElement = el => {
  while (el.parentElement) {
    el = el.parentElement;
  }

  return el;
};

exports.getRootElement = getRootElement;

const getClientX = e => {
  var _a;

  const clientx = e.clientX || ((_a = e.targetTouches) === null || _a === void 0 ? void 0 : _a[0].clientX) || 0;
  return clientx;
};

exports.getClientX = getClientX;

const isiOS = () => {
  return ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) // iPad on iOS 13 detection
  || navigator.userAgent.includes("Mac") && "ontouchend" in document;
};

exports.isiOS = isiOS;

const getEventDataset = (e, data) => {
  return e.target.closest(".option").dataset[data];
};

exports.getEventDataset = getEventDataset;

const isChildOfElement = (el, target) => {
  while (el.parentElement) {
    if (el === target) {
      return true;
    }

    el = el.parentElement;
  }

  return false;
};

exports.isChildOfElement = isChildOfElement;
},{}],"code/code-line.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CodeLine = void 0;

var _tslib = require("tslib");

var _decorators = require("lit/decorators");

var _lit = require("lit");

var _helpers = require("../helpers");

var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let CodeLine = class CodeLine extends _lit.LitElement {
  constructor() {
    super(...arguments);
    this.number = 0;
  }

  get root() {
    return (0, _helpers.getParentTagName)(this, 'code-element');
  }

  connectedCallback() {
    super.connectedCallback();
    const root = this.root;

    if (!root) {
      console.warn('Code line must be child of code-element');
      return;
    }

    this.number = root.inc();
  }

  render() {
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<div class = \"wrapper\">\n                <div class = \"line-number\">", "</div>\n                <div><slot></slot></div>   \n            </div>"])), this.number);
  }

};
exports.CodeLine = CodeLine;
CodeLine.styles = (0, _lit.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    :host{\n        display: block;\n        padding: 3px;\n    }\n    .wrapper{\n        display: grid;\n        grid-template-columns: 25px auto;\n    }\n    .line-number{\n        color: #777;\n    }\n    "])));
(0, _tslib.__decorate)([(0, _decorators.state)()], CodeLine.prototype, "number", void 0);
exports.CodeLine = CodeLine = (0, _tslib.__decorate)([(0, _decorators.customElement)('code-line')], CodeLine);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit/decorators":"../node_modules/lit/decorators.js","lit":"../node_modules/lit/index.js","../helpers":"helpers.ts"}],"code/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  CodeElement: true
};
exports.CodeElement = void 0;

var _tslib = require("tslib");

var _decorators = require("lit/decorators");

var _lit = require("lit");

var _codeLine = require("./code-line");

Object.keys(_codeLine).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _codeLine[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _codeLine[key];
    }
  });
});

var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let CodeElement = class CodeElement extends _lit.LitElement {
  constructor() {
    super(...arguments);
    this._counter = 0;
  }

  inc() {
    return ++this._counter;
  }

  render() {
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<slot></slot>"])));
  }

};
exports.CodeElement = CodeElement;
CodeElement.styles = (0, _lit.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    :host{\n        display: block;\n        background-color: var(--code-background, rgba(0,0,0,0.05));\n        padding: 10px;\n        margin: 10px 0;\n        font-family: monospace;\n        border-radius: 5px;\n    }"])));
exports.CodeElement = CodeElement = (0, _tslib.__decorate)([(0, _decorators.customElement)('code-element')], CodeElement);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit/decorators":"../node_modules/lit/decorators.js","lit":"../node_modules/lit/index.js","./code-line":"code/code-line.ts"}],"description/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DescriptionElement = void 0;

var _tslib = require("tslib");

var _decorators = require("lit/decorators");

var _lit = require("lit");

var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let DescriptionElement = class DescriptionElement extends _lit.LitElement {
  render() {
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<slot></slot>"])));
  }

};
exports.DescriptionElement = DescriptionElement;
DescriptionElement.styles = (0, _lit.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    :host{\n        display: block;\n        padding: 10px 0;\n        font-style: italic;\n    }\n    "])));
exports.DescriptionElement = DescriptionElement = (0, _tslib.__decorate)([(0, _decorators.customElement)('description-element')], DescriptionElement);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit/decorators":"../node_modules/lit/decorators.js","lit":"../node_modules/lit/index.js"}],"../node_modules/kailib/dist/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HSLstringToRGB = void 0;
exports.avarage = avarage;
exports.ceilMinify = ceilMinify;
exports.copy2Clipboard = copy2Clipboard;
exports.debonce = debonce;
exports.deepCopy = deepCopy;
exports.deleteAllCookies = deleteAllCookies;
exports.firstUpper = firstUpper;
exports.format = format;
exports.getCookie = getCookie;
exports.getDigit = getDigit;
exports.getEventDataset = void 0;
exports.getFormData = getFormData;
exports.getPeriod = getPeriod;
exports.getScrollbarWidth = getScrollbarWidth;
exports.getTopic = getTopic;
exports.getValue = getValue;
exports.hexTostring = hexTostring;
exports.hsl2rgb = hsl2rgb;
exports.insertBefore = exports.insertAfter = void 0;
exports.isEmail = isEmail;
exports.isInt = isInt;
exports.isOTP = isOTP;
exports.isPassword = isPassword;
exports.minifyString = void 0;
exports.mobileAndTabletCheck = mobileAndTabletCheck;
exports.pad = pad;
exports.parse = parse;
exports.parseDec = parseDec;
exports.randomInt = randomInt;
exports.setCookie = setCookie;
exports.stringToHex = stringToHex;
exports.submitValidation = submitValidation;
exports.syncObjects = syncObjects;
exports.time2string = time2string;
exports.urlEncode = urlEncode;

function parseDec(val) {
  if (typeof val === 'number') {
    return val;
  }

  val = val.replace(',', '.');
  return parseFloat(val);
}

function firstUpper(text) {
  return text[0].toUpperCase() + text.slice(1);
}

function pad(value, n) {
  let string = String(value);

  if (string.length < n) {
    return "0".repeat(n - string.length) + string;
  } else {
    return string;
  }
}

function time2string(timestamp, type = "smart") {
  if (timestamp === 0) {
    return '-';
  }

  let time = new Date(timestamp * 1000);
  let now = Date.now();

  if (timestamp === 0) {
    return "-";
  }

  let d = pad(time.getDate(), 2);
  let m = pad(time.getMonth() + 1, 2);
  let y = time.getFullYear();
  let h = pad(time.getHours(), 2);
  let i = pad(time.getMinutes(), 2);

  if (type === "without-year") {
    return `${d}/${m} ${h}:${i}`;
  } else if (type === "smart") {
    if (now - timestamp * 1000 > 84600000 * 365) {
      return y;
    }

    if (now - timestamp * 1000 < 84600000) {
      return `${h}:${i}`;
    }

    return `${d}/${m}`;
  } else if (type === "short") {
    return `${d}/${m}/${y}`;
  } else {
    return `${d}/${m}/${y} ${h}:${i}`;
  }
}

function hsl2rgb(h, s, l, hex = true) {
  let rgb = [];

  try {
    if (typeof h !== "number") {
      h = parseInt(h);
    }

    if (typeof s !== "number") {
      s = parseInt(s);
    }

    if (typeof l !== "number") {
      l = parseInt(l);
    }

    if (s > 100) {
      s = 100;
    }

    if (l > 100) {
      l = 100;
    }

    h = h % 360;
    s = s / 100;
    l = l / 100;
    let c, x, m;
    c = (1 - Math.abs(2 * l - 1)) * s;
    x = c * (1 - Math.abs(h / 60 % 2 - 1));
    m = l - c / 2;
    if (h >= 0 && h < 60) rgb = [c, x, 0];
    if (h >= 60 && h < 120) rgb = [x, c, 0];
    if (h >= 120 && h < 180) rgb = [0, c, x];
    if (h >= 180 && h < 240) rgb = [0, x, c];
    if (h >= 240 && h < 300) rgb = [x, 0, c];
    if (h >= 300 && h < 360) rgb = [c, 0, x];
    rgb[0] = Math.floor(255 * (rgb[0] + m));
    rgb[1] = Math.floor(255 * (rgb[1] + m));
    rgb[2] = Math.floor(255 * (rgb[2] + m));

    if (hex) {
      return "#" + pad(rgb[0].toString(16), 2) + pad(rgb[1].toString(16), 2) + pad(rgb[2].toString(16), 2);
    } else {
      return rgb;
    }
  } catch (e) {
    if (!rgb) {
      if (hex) {
        return "#000000";
      } else {
        return [0, 0, 0];
      }
    }
  }
}

function deepCopy(obj) {
  if (Array.isArray(obj)) {
    let newArray = [];

    for (let i = 0; i < obj.length; i++) {
      let item = obj[i];

      if (typeof item === "object" && item !== null) {
        newArray.push(deepCopy(item));
      } else {
        newArray.push(item);
      }
    }

    return newArray;
  } else if (typeof obj === "object") {
    let data = {};

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        let item = obj[key];

        if (item !== null && typeof item === "object") {
          data[key] = deepCopy(item);
        } else {
          data[key] = item;
        }
      }
    }

    return data;
  } else {
    return obj;
  }
}

function getDigit(number) {
  return Math.log(number) * Math.LOG10E | 0;
}

function ceilMinify(number, maxDigit) {
  let digit = getDigit(number);

  if (digit > maxDigit) {
    let res = 0;
    let addition = "";

    if (digit > 18) {
      res = number / 1000000000000000000000;
      addition = " qi";
    } else if (digit > 15) {
      res = number / 1000000000000000000;
      addition = " qa";
    } else if (digit > 12) {
      res = number / 1000000000000000;
      addition = " tr";
    } else if (digit > 9) {
      res = number / 1000000000;
      addition = " bn";
    } else if (digit > 6) {
      res = number / 1000000;
      addition = " m";
    } else if (digit > 3) {
      res = number / 1000;
      addition = " k";
    } else {
      res = number;
    }

    return [res, addition];
  } else {
    return [number, ""];
  }
}

function syncObjects(source, target) {
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      if (!target[key]) {
        target[key] = source[key];
      } else if (typeof source[key] === "object" && typeof target[key] === "object") {
        syncObjects(source[key], target[key]);
      }
    }
  }

  return target;
}

function copy2Clipboard(text = "_") {
  let $input = document.createElement("input");
  $input.setAttribute("type", "text");
  $input.setAttribute("style", "position: absolute; z-index:-1");
  $input.value = text;
  document.body.appendChild($input);
  $input.select();
  document.execCommand("copy");
  $input.remove();
}

function getPeriod(period = "D") {
  if (period === "M1") {
    return 60;
  } else if (period === "M5") {
    return 60 * 5;
  } else if (period === "M15") {
    return 60 * 15;
  } else if (period === "M30") {
    return 60 * 30;
  } else if (period === "H1") {
    return 60 * 60;
  } else if (period === "H2") {
    return 60 * 120;
  } else if (period === "H4") {
    return 60 * 240;
  } else if (period === "D") {
    return 60 * 1440;
  } else if (period === "W") {
    return 60 * 10080;
  }
}

function avarage(array) {
  if (!Array.isArray(array)) {
    return false;
  }

  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }

  return sum / array.length;
}

function parse(str) {
  if (typeof str === 'string') {
    try {
      str = JSON.parse(str);
    } catch (e) {
      return str;
    }
  }

  return str;
}

function urlEncode(params) {
  let resString = [];

  for (let k in params) {
    if (params.hasOwnProperty(k)) {
      let val = typeof params[k] === "object" ? JSON.stringify(params[k]) : params[k];
      resString.push(k + '=' + encodeURIComponent(val));
    }
  }

  return resString.join('&');
}

function isInt(value) {
  return typeof value === "number" && Math.floor(value) === value;
}

function isOTP(value) {
  if (typeof value !== "string") {
    value = value.toString();
  }

  return value.length === 6;
}

function isEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return typeof email === "string" && re.test(email);
}

function isPassword(password) {
  return typeof password === "string" && password.length > 6;
}

function getFormData(form) {
  let params = {};

  if (form instanceof HTMLFormElement) {
    for (let i = 0; i < form.elements.length; i++) {
      const el = form.elements[i];

      if (!(el instanceof HTMLInputElement) && !(el instanceof HTMLSelectElement) && !(el instanceof HTMLTextAreaElement)) {
        continue;
      }

      if (!el.name || el.disabled) continue;

      if (el instanceof HTMLInputElement && el.type === "radio" && el.checked) {
        params[el.name] = el.value;
      } else if (el instanceof HTMLInputElement && el.type === "file") {
        params[el.name] = el.files;
      } else if (el instanceof HTMLInputElement) {
        if (el.type === "checkbox" || el.dataset.type === "checkbox") {
          params[el.name] = el.checked;
        } else if (el.type === "number" || ['decimal', 'numeric'].includes(el.getAttribute('inputmode')) || el.dataset.type === "number") {
          params[el.name] = Number(el.value);
        } else {
          params[el.name] = el.value.trim();
        }
      } else if (el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
        params[el.name] = el.value.trim();
      }
    }
  }

  return params;
}

function randomInt(min, max) {
  return Math.round(min + Math.random() * (max - min));
}

function mobileAndTabletCheck() {
  let check = false; //@ts-ignore

  const a = navigator.userAgent || navigator.vendor || window['opera'];
  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
}

function format(text, args, remove = false) {
  if (typeof args !== "object" || !args || !text) return text;
  return text.replace(/\{([a-zA-Z0-9_.,=)( ]+)\}/g, function (m, n) {
    let value = getValue(n, args);
    return value !== undefined ? value : remove ? "" : m;
  });
}

function getValue(path, args) {
  let arr = path.split(".");
  let current = args;

  for (let i = 0; i < arr.length; i++) {
    if (current !== undefined) {
      current = current[arr[i]];
    } else {
      return undefined;
    }
  }

  return current;
}

function submitValidation(pool) {
  return !pool.reduce((a, v) => a + +!v, 0);
}

function debonce(value) {
  return function (target, prop, descriptor) {
    let lastCall = 0;
    return Object.assign(Object.assign({}, descriptor), {
      value: function (...args) {
        if (Date.now() - lastCall < value) {
          return;
        }

        lastCall = Date.now();
        return descriptor.value.call(this, ...args);
      }
    });
  };
}

function setCookie(name, value, options = {}) {
  options = Object.assign({
    path: '/',
    "max-age": 84600 * 365,
    secure: true
  }, options);

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];

    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function getCookie(name) {
  let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : "";
}

function deleteAllCookies() {
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    let eqPos = cookie.indexOf("=");
    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

function stringToHex(str) {
  let result = "";

  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }

  return "0x" + result;
}

function hexTostring(str) {
  let hexes = str.match(/.{1,4}/g) || [];
  let back = "";

  for (let j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
}

function getTopic(str) {
  const string = stringToHex(str);
  return string + "0".repeat(66 - string.length);
}

function getScrollbarWidth() {
  return window.innerWidth - document.body.clientWidth;
}

const insertAfter = (array, index, item) => {
  const res = [];

  for (let i = 0; i < array.length; i++) {
    res.push(array[i]);

    if (index === i) {
      res.push(item);
    }
  }

  return res;
};

exports.insertAfter = insertAfter;

const insertBefore = (array, index, item) => {
  const res = [];

  for (let i = 0; i < array.length; i++) {
    if (index === i) {
      res.push(item);
    }

    res.push(array[i]);
  }

  return res;
};

exports.insertBefore = insertBefore;

const getEventDataset = (e, selector, dataName) => {
  const el = e.target.closest(selector);
  if (el instanceof HTMLElement) return el.dataset[dataName];
};

exports.getEventDataset = getEventDataset;

const minifyString = (str, resultLength = 12, float = 'center') => {
  if (!str) return '';

  if (str.length <= resultLength) {
    return str;
  }

  if (float === 'center') {
    return str.substring(0, resultLength / 2) + ".." + str.substring(str.length - resultLength / 2, str.length);
  } else if (float === 'right') {
    return ".." + str.substring(str.length - resultLength, str.length);
  } else {
    return str.substring(0, resultLength) + "..";
  }
};

exports.minifyString = minifyString;

const calcSum = str => {
  if (str.includes('+')) {
    const [num1, num2] = str.split('+');
    return parseFloat(num1) + parseFloat(num2);
  }

  return parseFloat(str);
};

const calcValue = str => {
  if (str.includes('calc(')) {
    const v = str.substr(0, str.length - 1).replace('calc(', '');
    const [num1, num2] = v.split('*');

    if (!num2) {
      return calcSum(num1);
    }

    return calcSum(num1) * calcSum(num2);
  }

  return parseFloat(str);
};

const HSLstringToRGB = hslColor => {
  const str = hslColor.substr(0, hslColor.length - 1).replace('hsl(', '');
  const values = str.split(',');
  return hsl2rgb(calcValue(values[0]), calcValue(values[1]), calcValue(values[2]));
};

exports.HSLstringToRGB = HSLstringToRGB;
},{}],"dialog/styles.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DIALOG_STYLES = void 0;

var _lit = require("lit");

var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const DIALOG_STYLES = (0, _lit.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n:host{\n    display: block;\n}\n.overlap{\n    display: flex;\n    --dialog-z-index: 125;\n    margin: 0;\n    top: 0;\n    padding: 0;\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    z-index: var(--dialog-z-index, 100);\n    background-color: var(--dialog-overlap, rgba(0,0,0,0.7));\n    visibility: hidden;\n}\n:host([opened]) .overlap{\n    visibility: visible;\n    align-items: center;\n    justify-content: center;\n}\n:host([opened]) main{\n    padding: var(--dialog-main-padding, var(--dialog-padding, 15px 20px));\n}\n:host([opened]) header{\n    padding: var(--dialog-header-padding, var(--dialog-padding, 15px 20px));\n}\n:host([opened]) footer{\n    padding: var(--dialog-footer-padding, var(--dialog-padding, 15px 20px));\n}\n.dialog{          \n    max-height: var(--dialog-max-height, initial);\n    width: var(--dialog-width, 600px);\n    height: var(--dialog-height, 300px);\n    z-index: calc(var(--dialog-z-index, 100) + 1);\n    color: black;\n    color: var(--dialog-color, black);\n    background-color: var(--dialog-background, #fefefe);\n    border-radius: 3px;\n    box-sizing: border-box;\n    word-wrap: break-word;\n    display: flex;\n    flex-direction: column;\n    position: relative;\n    box-shadow: 1px 1px 8px var(--dialog-boxshadow, rgba(0,0,0,0.7));\n}\n\nheader ::slotted(h1), \nheader ::slotted(h2), \nheader ::slotted(h3), \nheader ::slotted(h4){\n    margin: 0;\n}\nmain{\n    flex: 1 1 auto;\n    overflow-y: auto;\n    overflow-x: hidden;\n}\nheader{\n    position: relative;\n    background-color: var(--dialog-header-background, #111);\n    color: var(--dialog-header-color, #fefefe);\n    font-size: 16px;\n    display: none;\n}\nheader.visible{\n    display: block;\n}\nfooter{\n    display: flex;\n    justify-content: space-between;\n}\n.closebtn-wrapper{\n    display: flex;\n    flex-direction: column;\n    justify-content: end;\n}\n.close-icon, .arrow-back{\n    position: absolute;\n    padding: 10px;\n    right: 2px;\n    top: -2px;\n    cursor: pointer;\n    color: #aaa;\n    --icon-font-size: 18px;\n}\n.arrow-back{\n    right: 30px;\n    transform-origin: center;\n    transform: rotate(90deg);\n}\n.close-icon svg{\n    fill: var(--dialog-icon-fill, #888);\n}"])));
exports.DIALOG_STYLES = DIALOG_STYLES;
},{"lit":"../node_modules/lit/index.js"}],"styles/scrollbar.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollbar = void 0;

var _lit = require("lit");

var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const scrollbar = (0, _lit.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n::-webkit-scrollbar {\n  width: 5px;\n}\n::-webkit-scrollbar-track {\n  background: var(--scrollbar-track, #f1f1f1);\n}\n::-webkit-scrollbar-thumb {\n  background: var(--scrollbar-thumb, #888);;\n}\n:host, .ff-scrollbar{  \n  scrollbar-color: var(--scrollbar-thumb, #888) var(--scrollbar-track, #f1f1f1) ;\n  scrollbar-width: thin;\n}\n"])));
exports.scrollbar = scrollbar;
},{"lit":"../node_modules/lit/index.js"}],"dialog/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DialogElement = void 0;

var _tslib = require("tslib");

var _lit = require("lit");

var _decorators = require("lit/decorators");

var _kailib = require("kailib");

var _styles = require("./styles");

var _scrollbar = require("../styles/scrollbar");

var _KeyController = require("../controllers/KeyController");

var _templateObject, _templateObject2, _templateObject3, _templateObject4;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let pool = [];
let DialogElement = class DialogElement extends _lit.LitElement {
  constructor() {
    super(...arguments);
    this.closeBtnText = "Close";
    this.opened = false;
    this.useCancelBtn = true;
    this.content = "";
    this.headerVisible = false;
    this._keyPressController = new _KeyController.KeyDownController(this);
    this._resolve = null; // **** Actions **** 

    this._headerChanged = e => {
      this.headerVisible = true;
    };
  }

  static get styles() {
    return [_styles.DIALOG_STYLES, _scrollbar.scrollbar];
  }

  _footerTemplate() {
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["", "\n        <slot name = \"footer\"></slot>"])), this.useCancelBtn ? (0, _lit.html)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["<div @click = \"", "\" class = \"closebtn-wrapper\">\n                        <slot name = \"closeBtn\">\n                            <button-element \n                                    type = \"button\"\n                                    class = \"button\">", "</button-element>\n                        </slot>\n                    </div>"])), this.close, this.closeBtnText) : _lit.nothing);
  }

  render() {
    return (0, _lit.html)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        <div class = \"overlap\">\n            <div class = \"dialog\" @click = \"", "\">\n                <header class = \"", "\">\n                    <slot name = \"header\" \n                        @slotchange = \"", "\"></slot>\n                </header>\n                ", "\n                <icon-element \n                        icon = \"cancel\" \n                        class = \"close-icon\" \n                        @click = \"", "\"></icon-element>\n                <main class = \"ff-scrollbar\"><slot></slot></main>\n                <footer>", "</footer>\n            </div>\n        </div>"])), this._onClick, this.headerVisible ? 'visible' : '', this._headerChanged, pool.length > 1 ? (0, _lit.html)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["<icon-element \n                        class = \"arrow-back\" \n                        icon = \"dropdown\"\n                        @click = \"", "\"\n                        ></icon-element>"])), this.close) : _lit.nothing, this.close, this._footerTemplate());
  }

  _show() {
    document.body.style.paddingRight = (0, _kailib.getScrollbarWidth)() + "px";
    document.body.style.overflow = 'hidden';
    this.opened = true;
  }

  _hide() {
    document.body.style.paddingRight = "initial";
    document.body.style.overflow = 'initial';
  }

  open() {
    pool.forEach(it => it.removeAttribute('opened'));
    pool.push(this);
    this.opened = true;

    this._show();

    return new Promise(r => {
      this._resolve = r;
    });
  }

  close() {
    var _a, _b;

    this.opened = false;

    this._hide();

    (_a = this._resolve) === null || _a === void 0 ? void 0 : _a.call(this, false);
    this._resolve = null;
    pool = pool.filter(it => it !== this);
    (_b = pool[pool.length - 1]) === null || _b === void 0 ? void 0 : _b.setAttribute('opened', '');
  }

  confirm() {
    var _a, _b;

    const data = this.querySelector('form-element');

    if (data) {
      const result = data.submit();

      if (result) {
        (_a = this._resolve) === null || _a === void 0 ? void 0 : _a.call(this, result);
      } else {
        return;
      }
    } else {
      (_b = this._resolve) === null || _b === void 0 ? void 0 : _b.call(this, true);
    }

    this._resolve = null;
    this.close();
  } // **** Events **** 


  _onClick(e) {
    const el = e.target;

    if (el.closest('[confirm]')) {
      this.confirm();
    } else if (el.closest('[close]')) {
      this.close();
    }
  }

  handlekeyDown(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

};
exports.DialogElement = DialogElement;
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String,
  attribute: false
})], DialogElement.prototype, "closeBtnText", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean,
  attribute: true,
  reflect: true
})], DialogElement.prototype, "opened", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean,
  attribute: true,
  reflect: true
})], DialogElement.prototype, "useCancelBtn", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Object,
  attribute: false
})], DialogElement.prototype, "content", void 0);
(0, _tslib.__decorate)([(0, _decorators.state)()], DialogElement.prototype, "headerVisible", void 0);
exports.DialogElement = DialogElement = (0, _tslib.__decorate)([(0, _decorators.customElement)('dialog-element')], DialogElement);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit":"../node_modules/lit/index.js","lit/decorators":"../node_modules/lit/decorators.js","kailib":"../node_modules/kailib/dist/index.js","./styles":"dialog/styles.ts","../styles/scrollbar":"styles/scrollbar.ts","../controllers/KeyController":"controllers/KeyController.ts"}],"label/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LabelText = void 0;

var _tslib = require("tslib");

var _lit = require("lit");

var _decorators = require("lit/decorators");

var _helpers = require("../helpers");

var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let LabelText = class LabelText extends _lit.LitElement {
  constructor() {
    super(...arguments);
    this.for = '';
    this._connectedNode = null;

    this._handleClick = () => {
      var _a;

      (_a = this._connectedNode) === null || _a === void 0 ? void 0 : _a.focus();
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.appendConnectedField(this._findConnectedField());
    this.addEventListener('click', this._handleClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._connectedNode = null;
    this.removeEventListener('click', this._handleClick);
  }

  render() {
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<slot></slot>"])));
  }

  appendConnectedField(el) {
    if (!this._connectedNode && el) {
      this._connectedNode = el;
    }
  }

  removeConnectedField(el) {
    if (el === this._connectedNode) {
      this._connectedNode = null;
    }
  }

  _findConnectedField() {
    if (this.for) {
      const root = (0, _helpers.getRootElement)(this);
      const node = root.querySelector("#".concat(this.for));

      if (node && node._formAssiciated || node instanceof HTMLInputElement) {
        return node;
      }
    }

    return null;
  }

};
exports.LabelText = LabelText;
LabelText.styles = (0, _lit.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral([""])));
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], LabelText.prototype, "for", void 0);
exports.LabelText = LabelText = (0, _tslib.__decorate)([(0, _decorators.customElement)("label-text")], LabelText);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit":"../node_modules/lit/index.js","lit/decorators":"../node_modules/lit/decorators.js","../helpers":"helpers.ts"}],"form/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FromElement = void 0;

var _tslib = require("tslib");

var _lit = require("lit");

var _decorators = require("lit/decorators");

require("../label");

var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let FromElement = class FromElement extends _lit.LitElement {
  constructor() {
    super(...arguments);
    this._elements = [];
    this.noValidate = false;
    this.disabled = false; // ==== Events ==== 

    this._handleSubmit = e => {
      e.preventDefault();
      this.submit();
    };

    this._handleFormAttached = e => {
      this._elements.push(e.detail);
    };

    this._handleFormDettached = e => {
      this._elements.filter(it => e.detail !== it);
    };
  }

  get length() {
    return this._elements.length;
  }

  get elements() {
    return this._elements;
  }

  render() {
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<slot></slot>"])));
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("submitForm", this._handleSubmit);
    this.addEventListener("fromAttached", this._handleFormAttached);
    this.addEventListener("fromDettached", this._handleFormDettached);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("submitForm", this._handleSubmit);
    this.removeEventListener("fromAttached", this._handleFormAttached);
    this.removeEventListener("fromDettached", this._handleFormDettached);
  }

  _getData() {
    const data = {};

    this._elements.forEach(it => {
      if (it.name) {
        data[it.name] = it.value;
      }
    });

    return data;
  }

  checkValidity() {
    for (const el of this.elements) {
      if (!el.checkValidity()) {
        return false;
      }
    }

    return true;
  }

  reportValidity() {
    for (const el of this.elements) {
      el.validate();

      if (!el.reportValidity()) {
        return false;
      }
    }

    return true;
  }

  updated(props) {
    if (props.has('disabled')) {
      this._elements.forEach(el => el.disabled = this.disabled);
    }
  }

  submit() {
    if (!this.noValidate && !this.reportValidity()) {
      return false;
    }

    const data = this._getData();

    this.dispatchEvent(new CustomEvent('submit', {
      detail: {
        data
      },
      bubbles: true
    }));
    return data;
  }

  reset() {}

};
exports.FromElement = FromElement;
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], FromElement.prototype, "noValidate", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], FromElement.prototype, "disabled", void 0);
exports.FromElement = FromElement = (0, _tslib.__decorate)([(0, _decorators.customElement)("form-element")], FromElement);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit":"../node_modules/lit/index.js","lit/decorators":"../node_modules/lit/decorators.js","../label":"label/index.ts"}],"header/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderElement = void 0;

var _tslib = require("tslib");

var _decorators = require("lit/decorators");

var _lit = require("lit");

var _templateObject, _templateObject2, _templateObject3;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let HeaderElement = class HeaderElement extends _lit.LitElement {
  constructor() {
    super(...arguments);
    this.level = 1;
  }

  render() {
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<slot></slot>"])));
  }

};
exports.HeaderElement = HeaderElement;
HeaderElement.styles = [(0, _lit.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        :host{\n            display: block;\n            font-weight: var(--header-font-weight, bold);\n            font-family: var(--header-font-weight, inherit);\n        }\n        :host([center]){\n            text-align: center;\n        }\n        "]))), ...[1, 2, 3, 4, 5, 6].map(it => (0, _lit.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral([":host([level=\"", "\"]){\n            margin: var(--header-", "-margin, 2.5rem 0 1rem 0);\n            font-size: var(--header-", "-font-size, ", "rem);\n        }"])), it, it, it, 3 - it * 0.4))];
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number,
  attribute: true,
  reflect: true
})], HeaderElement.prototype, "level", void 0);
exports.HeaderElement = HeaderElement = (0, _tslib.__decorate)([(0, _decorators.customElement)('header-element')], HeaderElement);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit/decorators":"../node_modules/lit/decorators.js","lit":"../node_modules/lit/index.js"}],"icon/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconElement = void 0;

var _tslib = require("tslib");

var _lit = require("lit");

var _decorators = require("lit/decorators");

var _templateObject;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var IconElement_1;
let IconElement = IconElement_1 = class IconElement extends _lit.LitElement {
  constructor() {
    super(...arguments);
    this.icon = '';
    this.material = false;
  }

  willUpdate() {
    if (this.material) this.classList.add("material");else this.classList.remove("material");
  }

  render() {
    const code = IconElement_1.iconsMap[this.icon];

    if (!this.material) {
      if (code) {
        return String.fromCharCode(code);
      }

      if (IconElement_1.defaultIcons[this.icon]) {
        return IconElement_1.defaultIcons[this.icon];
      }
    }

    return this.icon;
  }

};
exports.IconElement = IconElement;
IconElement.iconsMap = {
  "help": parseInt("006E", 16),
  "dropdown": parseInt("0069", 16),
  "arrow-down": parseInt("004e", 16),
  "arrow-up": parseInt("004f", 16),
  "arrow-down-2": parseInt("0050", 16),
  "arrow-up-2": parseInt("0051", 16),
  "waiting": parseInt("0041", 16),
  "done": parseInt("0042", 16),
  "canceled": parseInt("0046", 16),
  "order-status-0": parseInt("0041", 16),
  "order-status-3": parseInt("0042", 16),
  "order-status-5": parseInt("006F", 16),
  "order-status-7": parseInt("0042", 16),
  "order-status-50": parseInt("0044", 16),
  "order-status-51": parseInt("0045", 16),
  "order-status-52": parseInt("0046", 16),
  "info": parseInt("0047", 16),
  "edit": parseInt("0048", 16),
  "tag": parseInt("004a", 16),
  "telegram": parseInt("004b", 16),
  "switch": parseInt("004c", 16),
  "toggle": parseInt("004d", 16),
  "cancel": parseInt("0052", 16),
  "remove": parseInt("0052", 16),
  "checkmark": parseInt("0053", 16),
  "connected": parseInt("0054", 16),
  "disconnected": parseInt("0055", 16),
  "deposit": parseInt("0056", 16),
  "withdraw": parseInt("0057", 16),
  "transfer": parseInt("0058", 16),
  "share": parseInt("005A", 16),
  "resize": parseInt("005B", 16),
  "move": parseInt("005C", 16),
  "orderbook-mode-sym1sum": parseInt("0061", 16),
  "orderbook-mode-sym2sum": parseInt("0062", 16),
  "orderbook-mode-sym2vol": parseInt("0063", 16),
  "orderbook-mode-userOrders": parseInt("0064", 16),
  "orderbook-mode-percentPrice": parseInt("0025", 16),
  "orderbook-mode-avPrice": parseInt("0059", 16),
  "user": parseInt("0064", 16),
  "hide": parseInt("0065", 16),
  "show": parseInt("0066", 16),
  "filter": parseInt("0067", 16),
  "exit": parseInt("0068", 16),
  "buy": parseInt("006A", 16),
  "sell": parseInt("006B", 16),
  "makeposition": parseInt("0070", 16),
  "copyto": parseInt("0071", 16),
  "copy": parseInt("0071", 16),
  "favorites": parseInt("0072", 16),
  "favoritesChecked": parseInt("0073", 16),
  "wallet": parseInt("0074", 16),
  "zoom": parseInt("0075", 16),
  "any2any": parseInt("0078", 16),
  "markets": parseInt("0079", 16),
  "book": parseInt("007a", 16),
  "alert": parseInt("007b", 16),
  "graf": parseInt("006d", 16),
  "list": parseInt("007c", 16),
  "manage": parseInt("007d", 16),
  "settings": parseInt("007e", 16),
  "cards": parseInt("0031", 16),
  "50x50": parseInt("0032", 16),
  "youtube": parseInt("0033", 16),
  "theme": parseInt("0034", 16),
  "logout": parseInt("0035", 16),
  "terminal": parseInt("0036", 16),
  "lend": parseInt("0037", 16),
  "loan": parseInt("0038", 16),
  "message": parseInt("0039", 16),
  "journal": parseInt("003A", 16),
  "new": parseInt("003B", 16),
  "home": parseInt("003C", 16),
  "transactions": parseInt("003D", 16),
  "account": parseInt("003E", 16),
  "orders": parseInt("003F", 16),
  "sun": parseInt("0022", 16),
  "moon": parseInt("0021", 16),
  "mail": parseInt("006c", 16)
};
IconElement.defaultIcons = {
  "remove": "❌",
  "info": "ℹ️",
  "config": "⚙️",
  "user": "👤",
  "message": "✉️",
  "email": "📧"
};
IconElement.styles = (0, _lit.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    :host{\n        cursor: pointer;\n        display: inline-block;\n        cursor: pointer;\n        font-style: normal;\n        font-weight: normal;\n        font-family: var(--icon-font-family, 'Icons');\n        color: var(--icon-color, #000);\n        font-size: var(--icon-font-size, 12px);\n        -webkit-touch-callout: none; /* iOS Safari */\n        -webkit-user-select: none; /* Safari */\n            -khtml-user-select: none; /* Konqueror HTML */\n            -moz-user-select: none; /* Old versions of Firefox */\n            -ms-user-select: none; /* Internet Explorer/Edge */\n                user-select: none; /* Non-prefixed version, currently\n                                        supported by Chrome, Edge, Opera and Firefox */\n    }\n    :host(.material){\n        font-family: 'Material Icons';\n        font-weight: normal;\n        font-style: normal;\n        line-height: 1;\n        letter-spacing: normal;\n        text-transform: none;\n        display: inline-block;\n        white-space: nowrap;\n        word-wrap: normal;\n        direction: ltr;\n        -moz-font-feature-settings: 'liga';\n        -moz-osx-font-smoothing: grayscale;\n    }\n    :host(.font-awesome){\n        font-family: var(--icon-font-family, 'Icons');\n    }\n    :host(.text-danger),\n    :host(.danger),\n    :host(.error){\n        color: var(--error-color, red);\n    }\n    :host(.back){\n        transform-origin: center;\n        transform: rotate(-90deg);\n    }\n    :host(.dropup){\n        transform-origin: center;\n        transform: rotate(-180deg) translateY(3px)\n    }\n    "])));
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], IconElement.prototype, "icon", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], IconElement.prototype, "material", void 0);
exports.IconElement = IconElement = IconElement_1 = (0, _tslib.__decorate)([(0, _decorators.customElement)("icon-element")], IconElement);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit":"../node_modules/lit/index.js","lit/decorators":"../node_modules/lit/decorators.js"}],"layout/grid.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LayoutGrid = void 0;

var _tslib = require("tslib");

var _lit = require("lit");

var _decorators = require("lit/decorators");

var _scrollbar = require("../styles/scrollbar");

var _templateObject, _templateObject2, _templateObject3;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let LayoutGrid = class LayoutGrid extends _lit.LitElement {
  constructor() {
    super(...arguments);
    this.cellSize = 20;
    this.isMoving = false;
    this.isResizing = false;
    this.layoutElementData = null;
    this.__onEndMove = this._onEndMove.bind(this);
    this.shadowX = 0;
    this.shadowY = 0;
    this.shadowWidth = 0;
    this.shadowHeight = 0;
    this.maxIndex = 3;
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('mouseup', this.__onEndMove);
    setTimeout(() => {
      this.maxIndex = this._getMaxZIndex() + 1;
    }, 200);
  }

  disconnectedCallback() {
    document.removeEventListener('mouseup', this.__onEndMove);
    super.disconnectedCallback();
  }

  shadowTemplate() {
    var _a, _b, _c, _d;

    const width = this.shadowWidth || ((_a = this.layoutElementData) === null || _a === void 0 ? void 0 : _a.element.width) || 0;
    const height = this.shadowHeight || ((_b = this.layoutElementData) === null || _b === void 0 ? void 0 : _b.element.height) || 0;
    const top = this.shadowY || ((_c = this.layoutElementData) === null || _c === void 0 ? void 0 : _c.element.top) || 0;
    const left = this.shadowX || ((_d = this.layoutElementData) === null || _d === void 0 ? void 0 : _d.element.left) || 0;
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["        \n        <div class = \"shadow ", "\" \n             style = \"z-index: ", "; width: ", "px; height: ", "px; left: ", "px; top: ", "px\"></div>"])), this.isMoving || this.isResizing ? 'show' : '', this.maxIndex - 2, width, height, left, top);
  }

  render() {
    return (0, _lit.html)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        <div class = \"wrapper ff-scrollbar ", " \" \n            @startmove = \"", "\"\n            @startResize = \"", "\"\n            @mousemove = \"", "\">\n            \n            <slot></slot>\n            ", "\n        </div>"])), this.isMoving ? 'move' : '', this._onStartMove, this._onStartResize, this._onMove, this.shadowTemplate());
  }

  _onStart(e) {
    this.layoutElementData = e.detail;
    this.layoutElementData.element.zIndex = this.maxIndex++;
    this.shadowX = this.layoutElementData.element.left;
    this.shadowY = this.layoutElementData.element.top;
  }

  _onStartMove(e) {
    this._onStart(e);

    this.isMoving = true;
    this.querySelectorAll('layout-element').forEach(el => el.classList.add('move'));
  }

  _onStartResize(e) {
    this._onStart(e);

    this.isResizing = true;
    this.querySelectorAll('layout-element').forEach(el => el.classList.add('resize'));
  }

  _onEndMove(e) {
    var _a, _b;

    if (this.isMoving) {
      this.isMoving = false;
      (_a = this.layoutElementData) === null || _a === void 0 ? void 0 : _a.element.setPosition(this.shadowX, this.shadowY);
    } else if (this.isResizing) {
      this.isResizing = false;
      (_b = this.layoutElementData) === null || _b === void 0 ? void 0 : _b.element.setSize(this.shadowWidth, this.shadowHeight);
    }

    this.layoutElementData = null;
    this.shadowX = 0;
    this.shadowY = 0;
    this.shadowWidth = 0;
    this.shadowHeight = 0;
    this.querySelectorAll('layout-element').forEach(el => (el.classList.remove('move'), el.classList.remove('resize')));
  }

  _onMove(e) {
    if (!this.layoutElementData) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    requestAnimationFrame(() => {
      if (this.isResizing) {
        this.setSize(e.pageX, e.pageY);
      } else if (this.isMoving) {
        this.setPosition(e.pageX, e.pageY);
      }
    });
  }

  getNewPosition(value) {
    const dv = value % this.cellSize;

    const _dv = dv > this.cellSize / 2 ? this.cellSize - dv : -dv;

    return Math.round(value + _dv);
  }

  showShadow(data) {
    if (data.x && data.y) {
      this.shadowX = this.getNewPosition(data.x);
      this.shadowY = this.getNewPosition(data.y);
    }

    if (data.width && data.height) {
      this.shadowWidth = this.getNewPosition(data.width);
      this.shadowHeight = this.getNewPosition(data.height);
    }
  }

  setSize(x, y) {
    if (!this.layoutElementData) return;
    const rect = this.getBoundingClientRect();
    x = x - this.layoutElementData.element.left - rect.x + this.wrapper.scrollLeft;
    y = y - this.layoutElementData.element.top - rect.y + this.wrapper.scrollTop;
    const width = Math.min(Math.max(this.layoutElementData.element.minWidth, x), this.layoutElementData.element.maxWidth);
    const height = Math.min(Math.max(this.layoutElementData.element.minHeight, y), this.layoutElementData.element.maxHeight);
    this.layoutElementData.element.setSize(width, height);
    this.showShadow({
      width,
      height
    });
  }

  setPosition(x, y) {
    if (!this.layoutElementData) return;
    x = x - this.layoutElementData.layerX; // - rect.x;

    y = y - this.layoutElementData.layerY; // - rect.y;

    this.layoutElementData.element.setPosition(x, y);
    this.showShadow({
      x,
      y
    });
  }

  _getMaxZIndex() {
    return Math.max(...Object.values(this._getPositions()).map(it => it.zIndex));
  }

  _getPositions() {
    const data = {};
    this.querySelectorAll("layout-element").forEach(el => {
      data[el.name] = {
        width: el.width,
        height: el.height,
        minWidth: el.minWidth,
        minHeight: el.minHeight,
        maxWidth: el.maxWidth,
        maxHeight: el.maxHeight,
        zIndex: el.zIndex,
        top: el.top,
        left: el.left
      };
    });
    return data;
  }

  getPositions() {
    return this._normalizeZindex(this._getPositions());
  }

  _normalizeZindex(data) {
    let index = 1;
    Object.keys(data).map(it => _objectSpread(_objectSpread({}, data[it]), {}, {
      key: it
    })).sort((a, b) => {
      if (a.zIndex > b.zIndex) {
        return 1;
      }

      if (a.zIndex < b.zIndex) {
        return -1;
      }

      return 0;
    }).map(it => {
      if (it.zIndex > index) {
        index++;
        data[it.key].zIndex = index; // it.zIndex = index;
      }
    });
    return data;
  }

};
exports.LayoutGrid = LayoutGrid;
LayoutGrid.styles = [(0, _lit.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        :host{\n            display: block;\n            width: 100%;\n            height: 100%;\n        }\n        .wrapper{\n            overflow: auto;         \n            width: 100%;\n            height: 100%;\n            position: relative;\n            background-color: #333;\n            \n        }\n        .wrapper.move{\n            cursor: move;\n        }\n        .shadow{\n            display: none;\n            position: absolute;\n            background-color: var(--layout-shadow-background, #fff);\n            z-index: 0;\n            top: 0;\n            left: 0;\n            opacity: 0.5;\n        }\n        .move .shadow{\n            transition: ease-out 0.1s;\n        }\n        .shadow.show{\n            display: block;\n        }\n        "]))), _scrollbar.scrollbar];
(0, _tslib.__decorate)([(0, _decorators.query)(".shadow")], LayoutGrid.prototype, "shadow", void 0);
(0, _tslib.__decorate)([(0, _decorators.query)(".wrapper ")], LayoutGrid.prototype, "wrapper", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], LayoutGrid.prototype, "cellSize", void 0);
(0, _tslib.__decorate)([(0, _decorators.state)()], LayoutGrid.prototype, "isMoving", void 0);
(0, _tslib.__decorate)([(0, _decorators.state)()], LayoutGrid.prototype, "isResizing", void 0);
(0, _tslib.__decorate)([(0, _decorators.state)()], LayoutGrid.prototype, "layoutElementData", void 0);
(0, _tslib.__decorate)([(0, _decorators.state)()], LayoutGrid.prototype, "shadowX", void 0);
(0, _tslib.__decorate)([(0, _decorators.state)()], LayoutGrid.prototype, "shadowY", void 0);
(0, _tslib.__decorate)([(0, _decorators.state)()], LayoutGrid.prototype, "shadowWidth", void 0);
(0, _tslib.__decorate)([(0, _decorators.state)()], LayoutGrid.prototype, "shadowHeight", void 0);
(0, _tslib.__decorate)([(0, _decorators.state)()], LayoutGrid.prototype, "maxIndex", void 0);
exports.LayoutGrid = LayoutGrid = (0, _tslib.__decorate)([(0, _decorators.customElement)("layout-grid")], LayoutGrid);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit":"../node_modules/lit/index.js","lit/decorators":"../node_modules/lit/decorators.js","../styles/scrollbar":"styles/scrollbar.ts"}],"layout/element.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LayoutElement = void 0;

var _tslib = require("tslib");

var _lit = require("lit");

var _decorators = require("lit/decorators");

require("../icon");

var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let LayoutElement = class LayoutElement extends _lit.LitElement {
  constructor() {
    super(...arguments);
    this.minWidth = 240;
    this.maxWidth = 520;
    this.minHeight = 240;
    this.maxHeight = 520;
    this.height = 400;
    this.width = 320;
    this.top = 0;
    this.left = 0;
    this.zIndex = 1;
    this.name = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.width = this.parentElement.getNewPosition(this.width);
    this.height = this.parentElement.getNewPosition(this.height);
  }

  willUpdate() {
    this._setStyleValue('--width', this.width);

    this._setStyleValue('--height', this.height);

    this._setStyleValue('--left', this.left);

    this._setStyleValue('--top', this.top);

    this._setStyleValue('--z-index', this.zIndex);
  }

  render() {
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    <div @click = \"", "\" class = \"wrapper\">\n      <slot></slot>\n    </div>\n    <icon-element \n        @pointerdown = \"", "\" \n        class = \"move\" \n        icon = \"move\"></icon-element>\n    <icon-element \n        @pointerdown = \"", "\"\n        class = \"resize\" \n        icon = \"resize\"></icon-element>\n    "])), this._onSetMaxZindex, this._onStartMove, this._onResize);
  }
  /** Events */


  _onSetMaxZindex() {
    this.zIndex = this.parentElement.maxIndex + 1;
    this.parentElement.maxIndex = this.zIndex;
  }

  _onResize(e) {
    this.dispatchEvent(new CustomEvent("startResize", {
      detail: {
        element: this,
        layerX: e.pageX - this.left,
        layerY: e.pageY - this.top
      },
      bubbles: true
    }));
  }

  _onStartMove(e) {
    this.dispatchEvent(new CustomEvent("startmove", {
      detail: {
        element: this,
        layerX: e.pageX - this.left,
        layerY: e.pageY - this.top
      },
      bubbles: true
    }));
  }
  /** Actions */


  setPosition(x, y) {
    if (x !== this.left || y !== this.top) {
      this.top = y;
      this.left = x;
    }
  }

  setSize(width, height) {
    if (width < this.minWidth || height < this.minHeight) return;
    this.width = width;
    this.height = height;
  }

  _setStyleValue(valueName, value) {
    const currentValue = this.style.getPropertyValue(valueName);

    if (currentValue != value + "px") {
      this.style.setProperty(valueName, value + (valueName.includes('index') ? '' : "px"));
    }
  }

};
exports.LayoutElement = LayoutElement;
LayoutElement.styles = (0, _lit.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    :host{\n      display: block;\n      box-sizing: border-box;\n      width: var(--width, 200px);\n      height: var(--height, 200px);\n      padding: var(--layout-padding-background, 2px);\n      position: absolute;\n      left: var(--left, 0);\n      top: var(--top, 0);\n      z-index: var(--z-index, 1);\n    }\n    .wrapper{\n      background-color: var(--layout-element-background, #cd85fd);\n      padding: 3px 6px;\n      box-sizing: border-box;\n      height: 100%;\n\n    }\n\n    .resize, .move{\n      opacity: 0.5;\n      --icon-font-size: 9px;\n    }\n    .move{\n      position: absolute;\n      right: -2px;\n      top: 2px;\n      z-index: 10;\n      padding: 5px;\n    }\n    .resize{\n      position: absolute;\n      right: -3px;\n      bottom: 1px;\n      transform-origin: center;\n      transform: scaleX(-1);\n      cursor: nw-resize;\n      padding: 5px;\n      z-index: 10;\n      --icon-font-size: 7px;\n    }\n    .move{\n      cursor: move;\n      padding: 0 4px 0 0;\n    }\n    :host(.move),\n    :host(.resize){\n      pointer-events: none;\n    }\n  "])));
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], LayoutElement.prototype, "minWidth", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], LayoutElement.prototype, "maxWidth", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], LayoutElement.prototype, "minHeight", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], LayoutElement.prototype, "maxHeight", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], LayoutElement.prototype, "height", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], LayoutElement.prototype, "width", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], LayoutElement.prototype, "top", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], LayoutElement.prototype, "left", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], LayoutElement.prototype, "zIndex", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], LayoutElement.prototype, "name", void 0);
exports.LayoutElement = LayoutElement = (0, _tslib.__decorate)([(0, _decorators.customElement)("layout-element")], LayoutElement);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit":"../node_modules/lit/index.js","lit/decorators":"../node_modules/lit/decorators.js","../icon":"icon/index.ts"}],"layout/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _grid = require("./grid");

Object.keys(_grid).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _grid[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _grid[key];
    }
  });
});

var _element = require("./element");

Object.keys(_element).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _element[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _element[key];
    }
  });
});
},{"./grid":"layout/grid.ts","./element":"layout/element.ts"}],"../node_modules/lit-html/directives/if-defined.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ifDefined = void 0;

var _litHtml = require("../lit-html.js");

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const l = l => null != l ? l : _litHtml.nothing;

exports.ifDefined = l;
},{"../lit-html.js":"../node_modules/lit-html/lit-html.js"}],"../node_modules/lit/directives/if-defined.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ifDefined = require("lit-html/directives/if-defined.js");

Object.keys(_ifDefined).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ifDefined[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ifDefined[key];
    }
  });
});
},{"lit-html/directives/if-defined.js":"../node_modules/lit-html/directives/if-defined.js"}],"link/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkElement = void 0;

var _tslib = require("tslib");

var _lit = require("lit");

var _decorators = require("lit/decorators");

var _ifDefined = require("lit/directives/if-defined");

var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let LinkElement = class LinkElement extends _lit.LitElement {
  constructor() {
    super(...arguments);
    this.href = undefined;
    this.type = 'link';
    this.rel = "nofollow";
    this.target = "_self";
  }

  render() {
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<a \n                    rel = \"", "\"\n                    target = \"", "\" \n                    href = \"", "\"><slot></slot></a>"])), (0, _ifDefined.ifDefined)(this.rel), this.target, (0, _ifDefined.ifDefined)(this.href));
  }

};
exports.LinkElement = LinkElement;
LinkElement.styles = (0, _lit.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    :host{\n        display: inline-block;\n        box-sizing: border-box;\n    }\n    :host(.underlined) a{\n        border-bottom: 1px solid var(--link-color, hsl(200, 80%, 55%));\n    }\n    a:focus{\n        outline: 1px solid var(--link-color, hsl(200, 80%, 55%));\n        border-bottom: 1px solid transparent;\n    }\n    a{\n        color: var(--link-color, hsl(200, 80%, 55%));\n        text-decoration: none;\n        cursor: pointer;\n        display: inline-flex;\n        align-items: center;\n    }\n    a:hover:not(:focus){\n        color: var(--link-color-hover, hsl(200, 80%, 60%));\n        box-shadow: 0 4px 4px -4px  hsl(200, 80%, 55%);\n        -webkit--shadow: 0 4px 4px -4px  hsl(200, 80%, 55%);\n        -moz-box-shadow: 0 4px 4px -4px  hsl(200, 80%, 55%);\n    }\n    "])));
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], LinkElement.prototype, "href", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], LinkElement.prototype, "type", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], LinkElement.prototype, "rel", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], LinkElement.prototype, "target", void 0);
exports.LinkElement = LinkElement = (0, _tslib.__decorate)([(0, _decorators.customElement)("link-element")], LinkElement);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit":"../node_modules/lit/index.js","lit/decorators":"../node_modules/lit/decorators.js","lit/directives/if-defined":"../node_modules/lit/directives/if-defined.js"}],"../node_modules/lit-html/directives/live.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.live = void 0;

var _litHtml = require("../lit-html.js");

var _directive = require("../directive.js");

var _directiveHelpers = require("../directive-helpers.js");

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const l = (0, _directive.directive)(class extends _directive.Directive {
  constructor(r) {
    if (super(r), r.type !== _directive.PartType.PROPERTY && r.type !== _directive.PartType.ATTRIBUTE && r.type !== _directive.PartType.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!(0, _directiveHelpers.isSingleExpression)(r)) throw Error("`live` bindings can only contain a single expression");
  }

  render(r) {
    return r;
  }

  update(i, [t]) {
    if (t === _litHtml.noChange || t === _litHtml.nothing) return t;
    const o = i.element,
          l = i.name;

    if (i.type === _directive.PartType.PROPERTY) {
      if (t === o[l]) return _litHtml.noChange;
    } else if (i.type === _directive.PartType.BOOLEAN_ATTRIBUTE) {
      if (!!t === o.hasAttribute(l)) return _litHtml.noChange;
    } else if (i.type === _directive.PartType.ATTRIBUTE && o.getAttribute(l) === t + "") return _litHtml.noChange;

    return (0, _directiveHelpers.setCommittedValue)(i), t;
  }

});
exports.live = l;
},{"../lit-html.js":"../node_modules/lit-html/lit-html.js","../directive.js":"../node_modules/lit-html/directive.js","../directive-helpers.js":"../node_modules/lit-html/directive-helpers.js"}],"../node_modules/lit/directives/live.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _live = require("lit-html/directives/live.js");

Object.keys(_live).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _live[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _live[key];
    }
  });
});
},{"lit-html/directives/live.js":"../node_modules/lit-html/directives/live.js"}],"number/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberField = void 0;

var _tslib = require("tslib");

var _lit = require("lit");

var _decorators = require("lit/decorators");

var _index = require("../form-associated/index");

require("../icon");

var _input = require("../styles/input");

var _live = require("lit//directives/live");

var _ref = require("lit/directives/ref.js");

var _templateObject, _templateObject2, _templateObject3;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

;
const AvailabledKeys = ['Control', 'Backspace', 'Delete', ',', '.', 'ArrowLeft', 'ArrowRight', 'Shift', 'Home', 'End', "Enter"];
const Numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const CtrAvailable = ['a', 'v', 'c', 'x', 'z', 86, 67, 88, 90, 65];
let NumberField = class NumberField extends (0, _index.formAssociated)(_lit.LitElement) {
  constructor() {
    super(...arguments);
    this.min = NaN;
    this.max = NaN;
    this.decimals = 8;
    this.readonly = false;
    this.autofocus = false;
    this.replaceToRange = false;
    this.placeholder = '';
    this.inputmode = 'text';
    this.useCancelButton = false;
    this.icon = '';
    this._selectionBeforeRender = 0;
    this.inputRef = (0, _ref.createRef)();
    this._valueAsNumber = NaN;
    this._value = '';
  }

  static get styles() {
    return _input.input;
  }

  static get properties() {
    return _objectSpread(_objectSpread({}, super.properties), {}, {
      value: {
        type: String,
        hasChanged: () => true
      },
      valueAsNumber: {
        type: String
      }
    });
  }

  get valueAsNumber() {
    return this._valueAsNumber;
  }

  set valueAsNumber(value) {
    this.value = value.toFixed(this.decimals);
  }

  get value() {
    return this._value;
  }

  set value(value) {
    const oldValue = this._value;
    this._value = this._valueResolve(value);
    this._valueAsNumber = Number(this._value);
    this.requestUpdate('value', oldValue);
  }

  connectedCallback() {
    var _a;

    super.connectedCallback();
    (_a = this.findLabel()) === null || _a === void 0 ? void 0 : _a.appendConnectedField(this);
  }

  disconnectedCallback() {
    var _a;

    super.disconnectedCallback();
    (_a = this.findLabel()) === null || _a === void 0 ? void 0 : _a.removeConnectedField(this);
  }

  _valueResolve(rawValue) {
    let value = rawValue.replace(",", ".");
    const arr = value.split(".");

    if (arr.length > 1) {
      value = arr[0] + "." + arr.slice(1).join("").slice(0, this.decimals);
    }

    if (this.replaceToRange) {
      const asNumber = Number(value);

      if (!isNaN(this.min) && asNumber < this.min) {
        value = this.min.toString();
      } else if (!isNaN(this.max) && asNumber > this.max) {
        value = this.max.toString();
      }
    }

    return value;
  }

  _iconTemplate() {
    if (!this.icon) return _lit.nothing;
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<div class = \"icon\">", "</div>"])), this.icon);
  }

  _cancelIconTemplate() {
    if (!this.useCancelButton || !this.value) return _lit.nothing;
    return (0, _lit.html)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["<icon-element \n                        @click = \"", "\"\n                        icon = \"remove\" \n                        class = \"danger icon\"></icon-element>"])), this._clearValue);
  }

  willUpdate() {
    var _a;

    this._selectionBeforeRender = ((_a = this.inputRef.value) === null || _a === void 0 ? void 0 : _a.selectionStart) || 0;
  }

  render() {
    return (0, _lit.html)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        ", "\n        <div class = \"wrapper\" >\n            <input type = \"text\" \n                   ?disabled = \"", "\"\n                   ?readonly = \"", "\"\n                   placeholder = \"", "\"\n                   spellcheck = \"", "\"\n                   inputmode = \"", "\"\n                   @input = \"", "\" \n                   @keydown = \"", "\"\n                   @change = \"", "\"\n                   ", "\n                   .value = ", ">\n            ", "\n            ", "\n        </div>"])), super.render(), this.disabled, this.readonly, this.placeholder, this.spellcheck, this.inputmode, this._handleInput, this._handleKeyDown, this._handleChange, (0, _ref.ref)(this.inputRef), (0, _live.live)(this.value), this._cancelIconTemplate(), this._iconTemplate());
  }

  updated(props) {
    var _a;

    super.updated(props);

    if (this._selectionBeforeRender !== undefined) {
      (_a = this.inputRef.value) === null || _a === void 0 ? void 0 : _a.setSelectionRange(this._selectionBeforeRender, this._selectionBeforeRender);
    }

    this.validate();

    if (props.has("value")) {
      this.dispatchEvent(new CustomEvent("changed", {
        detail: this.value,
        bubbles: true
      }));
    }
  }

  async firstUpdated(props) {
    super.firstUpdated(props);

    if (this.autofocus) {
      setTimeout(() => this.focus());
    }
  }

  validate() {
    super.validate();

    if (this.min) {
      if (this.valueAsNumber < this.min) {
        this.setValidity({
          rangeUnderflow: true
        });
      } else if (this.validity.rangeUnderflow) {
        this.setValidity({
          rangeUnderflow: false
        });
      }
    }

    if (this.max) {
      if (this.valueAsNumber > this.max) {
        this.setValidity({
          rangeOverflow: true
        });
      } else if (this.validity.rangeOverflow) {
        this.setValidity({
          rangeOverflow: false
        });
      }
    }
  }

  _clearValue() {
    this.value = '';
  }

  focus() {
    var _a, _b;

    (_a = this.inputRef.value) === null || _a === void 0 ? void 0 : _a.focus();
    (_b = this.inputRef.value) === null || _b === void 0 ? void 0 : _b.setSelectionRange(this.value.length, this.value.length);
  } // ==== Events ====


  _handleChange(e) {
    this.reportValidity();
  }

  _handleInput(e) {
    this.value = e.target.value;
  }

  _handleKeyDown(e) {
    if (!AvailabledKeys.includes(e.key) && !Numbers.includes(e.key) && !(CtrAvailable.includes(e.key) && (e.ctrlKey || e.metaKey) || CtrAvailable.includes(e.keyCode) && (e.ctrlKey || e.metaKey))) {
      e.preventDefault();
    }
  }

};
exports.NumberField = NumberField;
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], NumberField.prototype, "min", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], NumberField.prototype, "max", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], NumberField.prototype, "decimals", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], NumberField.prototype, "readonly", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], NumberField.prototype, "autofocus", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], NumberField.prototype, "replaceToRange", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], NumberField.prototype, "placeholder", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], NumberField.prototype, "inputmode", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], NumberField.prototype, "useCancelButton", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)()], NumberField.prototype, "icon", void 0);
exports.NumberField = NumberField = (0, _tslib.__decorate)([(0, _decorators.customElement)("number-field")], NumberField);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit":"../node_modules/lit/index.js","lit/decorators":"../node_modules/lit/decorators.js","../form-associated/index":"form-associated/index.ts","../icon":"icon/index.ts","../styles/input":"styles/input.ts","lit//directives/live":"../node_modules/lit/directives/live.js","lit/directives/ref.js":"../node_modules/lit/directives/ref.js"}],"pagination/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginationElement = void 0;

var _tslib = require("tslib");

var _decorators = require("lit/decorators");

var _lit = require("lit");

require("../icon");

require("../number");

var _templateObject, _templateObject2, _templateObject3;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let PaginationElement = class PaginationElement extends _lit.LitElement {
  constructor() {
    super(...arguments);
    this.page = 0;
    this.pageLength = 5;
    this.length = 20;
  }

  get pageCount() {
    return Math.ceil(this.length / this.pageLength) - 1;
  }

  get pageList() {
    const pagesCount = this.pageCount;
    const list = [...new Set([0, pagesCount, this.page, //this.page - 2, 
    this.page - 1, //this.page + 2, 
    this.page + 1])].filter(n => n >= 0 && n <= pagesCount).sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });
    const newArr = [];

    for (let i = 0; i < list.length; i++) {
      newArr.push({
        value: list[i],
        label: (list[i] + 1).toString()
      });

      if (list[i + 1] - list[i] > 1) {
        newArr.push({
          value: Math.round(list[i] + (list[i + 1] - list[i]) / 2),
          label: '..'
        });
      }
    }

    return newArr;
  }

  setPage(page) {
    const pageCount = this.pageCount;
    if (page < 0) page = 0;
    if (page > pageCount) page = pageCount;
    this.page = page;
    this.dispatchEvent(new CustomEvent('changed', {
      detail: page
    }));
  }

  _pagesTemplate() {
    return this.pageList.map(n => (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<button type = \"button\"\n                    data-page = \"", "\"\n                    @click = \"", "\"\n                    class = \"", "\">", "</button>"])), n.value, this._onChange, n.value === this.page ? 'selected' : '', n.label));
  }

  render() {
    return (0, _lit.html)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        <button @click = \"", "\" \n                type = \"button\">\n            <icon-element class = \"arrow-left\" icon = \"arrow-down-2\"></icon-element>\n        </button>\n        <number-field \n            type = \"number\"\n            .min = \"", "\"\n            .max = \"", "\"\n            .value = \"", "\"\n            @changed = \"", "\"\n            .decimals = \"", "\"\n        ></number-field>                \n        <button @click = \"", "\" \n                type = \"button\">\n            <icon-element class = \"arrow-right\" icon = \"arrow-down-2\"></icon-element>\n        </button>\n        <div class = \"page-list\">", "</div>"])), this._decrementPage, 1, this.pageCount + 1, (this.page + 1).toFixed(0), this._onInputChange, 0, this._incrementPage, this._pagesTemplate());
  }

  _onChange(e) {
    const page = Number(e.target.dataset.page);
    this.setPage(page);
  }

  _onInputChange(e) {
    this.setPage(e.detail - 1);
  }

  _incrementPage() {
    this.setPage(this.page + 1);
  }

  _decrementPage() {
    this.setPage(this.page - 1);
  }

};
exports.PaginationElement = PaginationElement;
PaginationElement.styles = [(0, _lit.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        :host{\n            display: flex;\n            align-items: center;\n            box-sizing: border-box;\n        }\n        number-field{\n            --input-align: center;\n            --input-font-size: 12px;\n            width: 40px;\n        }\n        button{\n            box-sizing: border-box;\n            padding: 3px 7px;\n            outline: none;\n            border: none;\n            background: transparent;\n            color: var(--font-color, black);\n            margin: 0 1px;\n            cursor: pointer;\n            border-radius: 2px;\n            font-size: var(--font-size, 12px);\n        }\n        button.selected{\n            background-color: var(--button-background, #eee);\n        }\n        button:not(:focus):hover{\n            background-color: var(--button-background-hover, #eee);\n        }\n        .arrow-right{\n            transform-origin: center;\n            transform: rotate(-90deg);\n        }\n        .arrow-left{\n            transform-origin: center;\n            transform: rotate(90deg);\n        }\n        .page-list{\n            margin-left: 5px;\n            font-size: var(--font-size, 12px);\n        }\n    "])))];
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], PaginationElement.prototype, "page", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], PaginationElement.prototype, "pageLength", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], PaginationElement.prototype, "length", void 0);
exports.PaginationElement = PaginationElement = (0, _tslib.__decorate)([(0, _decorators.customElement)("pagination-element")], PaginationElement);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit/decorators":"../node_modules/lit/decorators.js","lit":"../node_modules/lit/index.js","../icon":"icon/index.ts","../number":"number/index.ts"}],"panel/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelElement = void 0;

var _tslib = require("tslib");

var _decorators = require("lit/decorators");

var _lit = require("lit");

var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let PanelElement = class PanelElement extends _lit.LitElement {
  render() {
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<slot></slot>"])));
  }

};
exports.PanelElement = PanelElement;
PanelElement.styles = (0, _lit.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    :host{\n        display: block;\n        background-color: var(--panel-background, hsl(299, 80%, 70%));\n        color: var(--panel-color, var(--app-font-color, hsl(299, 70%, 10%)));\n        padding: var(--panel-padding, 10px 15px);\n        border: 1px solid var(--panel-border, initial);\n    }"])));
exports.PanelElement = PanelElement = (0, _tslib.__decorate)([(0, _decorators.customElement)('panel-element')], PanelElement);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit/decorators":"../node_modules/lit/decorators.js","lit":"../node_modules/lit/index.js"}],"../node_modules/qrcode/lib/can-promise.js":[function(require,module,exports) {
// can-promise has a crash in some versions of react native that dont have
// standard global objects
// https://github.com/soldair/node-qrcode/issues/157
module.exports = function () {
  return typeof Promise === 'function' && Promise.prototype && Promise.prototype.then;
};
},{}],"../node_modules/qrcode/node_modules/isarray/index.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],"C:/Users/Kaifat/AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/base64-js/index.js":[function(require,module,exports) {
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],"C:/Users/Kaifat/AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/ieee754/index.js":[function(require,module,exports) {
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],"C:/Users/Kaifat/AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/isarray/index.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],"C:/Users/Kaifat/AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/buffer/index.js":[function(require,module,exports) {

var global = arguments[3];
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

},{"base64-js":"C:/Users/Kaifat/AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/base64-js/index.js","ieee754":"C:/Users/Kaifat/AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/ieee754/index.js","isarray":"C:/Users/Kaifat/AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/isarray/index.js","buffer":"C:/Users/Kaifat/AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/buffer/index.js"}],"../node_modules/qrcode/lib/utils/typedarray-buffer.js":[function(require,module,exports) {

/**
 * Implementation of a subset of node.js Buffer methods for the browser.
 * Based on https://github.com/feross/buffer
 */

/* eslint-disable no-proto */
'use strict';

var isArray = require('isarray');

function typedArraySupport() {
  // Can typed array instances be augmented?
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = {
      __proto__: Uint8Array.prototype,
      foo: function () {
        return 42;
      }
    };
    return arr.foo() === 42;
  } catch (e) {
    return false;
  }
}

Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
var K_MAX_LENGTH = Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;

function Buffer(arg, offset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, offset, length);
  }

  if (typeof arg === 'number') {
    return allocUnsafe(this, arg);
  }

  return from(this, arg, offset, length);
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array; // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97

  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true,
      enumerable: false,
      writable: false
    });
  }
}

function checked(length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes');
  }

  return length | 0;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}

function createBuffer(that, length) {
  var buf;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    buf = new Uint8Array(length);
    buf.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    buf = that;

    if (buf === null) {
      buf = new Buffer(length);
    }

    buf.length = length;
  }

  return buf;
}

function allocUnsafe(that, size) {
  var buf = createBuffer(that, size < 0 ? 0 : checked(size) | 0);

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      buf[i] = 0;
    }
  }

  return buf;
}

function fromString(that, string) {
  var length = byteLength(string) | 0;
  var buf = createBuffer(that, length);
  var actual = buf.write(string);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual);
  }

  return buf;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  var buf = createBuffer(that, length);

  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255;
  }

  return buf;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  var buf;

  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array);
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset);
  } else {
    buf = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    buf.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    buf = fromArrayLike(that, buf);
  }

  return buf;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    var buf = createBuffer(that, len);

    if (buf.length === 0) {
      return buf;
    }

    obj.copy(buf, 0, 0, len);
    return buf;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }

      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i); // is surrogate component

    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } // valid lead


        leadSurrogate = codePoint;
        continue;
      } // 2 leads in a row


      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      } // valid surrogate pair


      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null; // encode utf8

    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function byteLength(string) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }

  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }

  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0;
  return utf8ToBytes(string).length;
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }

  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function from(that, value, offset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, offset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, offset);
  }

  return fromObject(that, value);
}

Buffer.prototype.write = function write(string, offset, length) {
  // Buffer#write(string)
  if (offset === undefined) {
    length = this.length;
    offset = 0; // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    length = this.length;
    offset = 0; // Buffer#write(string, offset[, length])
  } else if (isFinite(offset)) {
    offset = offset | 0;

    if (isFinite(length)) {
      length = length | 0;
    } else {
      length = undefined;
    }
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  return utf8Write(this, string, offset, length);
};

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;
  var newBuf;

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end); // Return an augmented `Uint8Array` instance

    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);

    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};

Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start; // Copy 0 bytes; we're done

  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0; // Fatal error conditions

  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }

  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds'); // Are we oob?

  if (end > this.length) end = this.length;

  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
};

Buffer.prototype.fill = function fill(val, start, end) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      end = this.length;
    }

    if (val.length === 1) {
      var code = val.charCodeAt(0);

      if (code < 256) {
        val = code;
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  } // Invalid ranges are not set to a default, so can range check early.


  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;
  if (!val) val = 0;
  var i;

  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : new Buffer(val);
    var len = bytes.length;

    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return createBuffer(null, 0);
  }

  var i;

  if (length === undefined) {
    length = 0;

    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = allocUnsafe(null, length);
  var pos = 0;

  for (i = 0; i < list.length; ++i) {
    var buf = list[i];

    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }

    buf.copy(buffer, pos);
    pos += buf.length;
  }

  return buffer;
};

Buffer.byteLength = byteLength;
Buffer.prototype._isBuffer = true;

Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

module.exports.alloc = function (size) {
  var buffer = new Buffer(size);
  buffer.fill(0);
  return buffer;
};

module.exports.from = function (data) {
  return new Buffer(data);
};
},{"isarray":"../node_modules/qrcode/node_modules/isarray/index.js","buffer":"C:/Users/Kaifat/AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/buffer/index.js"}],"../node_modules/qrcode/lib/core/utils.js":[function(require,module,exports) {
var toSJISFunction;
var CODEWORDS_COUNT = [0, // Not used
26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706];
/**
 * Returns the QR Code size for the specified version
 *
 * @param  {Number} version QR Code version
 * @return {Number}         size of QR code
 */

exports.getSymbolSize = function getSymbolSize(version) {
  if (!version) throw new Error('"version" cannot be null or undefined');
  if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
  return version * 4 + 17;
};
/**
 * Returns the total number of codewords used to store data and EC information.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Data length in bits
 */


exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
  return CODEWORDS_COUNT[version];
};
/**
 * Encode data with Bose-Chaudhuri-Hocquenghem
 *
 * @param  {Number} data Value to encode
 * @return {Number}      Encoded value
 */


exports.getBCHDigit = function (data) {
  var digit = 0;

  while (data !== 0) {
    digit++;
    data >>>= 1;
  }

  return digit;
};

exports.setToSJISFunction = function setToSJISFunction(f) {
  if (typeof f !== 'function') {
    throw new Error('"toSJISFunc" is not a valid function.');
  }

  toSJISFunction = f;
};

exports.isKanjiModeEnabled = function () {
  return typeof toSJISFunction !== 'undefined';
};

exports.toSJIS = function toSJIS(kanji) {
  return toSJISFunction(kanji);
};
},{}],"../node_modules/qrcode/lib/core/error-correction-level.js":[function(require,module,exports) {
exports.L = {
  bit: 1
};
exports.M = {
  bit: 0
};
exports.Q = {
  bit: 3
};
exports.H = {
  bit: 2
};

function fromString(string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string');
  }

  var lcStr = string.toLowerCase();

  switch (lcStr) {
    case 'l':
    case 'low':
      return exports.L;

    case 'm':
    case 'medium':
      return exports.M;

    case 'q':
    case 'quartile':
      return exports.Q;

    case 'h':
    case 'high':
      return exports.H;

    default:
      throw new Error('Unknown EC Level: ' + string);
  }
}

exports.isValid = function isValid(level) {
  return level && typeof level.bit !== 'undefined' && level.bit >= 0 && level.bit < 4;
};

exports.from = function from(value, defaultValue) {
  if (exports.isValid(value)) {
    return value;
  }

  try {
    return fromString(value);
  } catch (e) {
    return defaultValue;
  }
};
},{}],"../node_modules/qrcode/lib/core/bit-buffer.js":[function(require,module,exports) {
function BitBuffer() {
  this.buffer = [];
  this.length = 0;
}

BitBuffer.prototype = {
  get: function (index) {
    var bufIndex = Math.floor(index / 8);
    return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
  },
  put: function (num, length) {
    for (var i = 0; i < length; i++) {
      this.putBit((num >>> length - i - 1 & 1) === 1);
    }
  },
  getLengthInBits: function () {
    return this.length;
  },
  putBit: function (bit) {
    var bufIndex = Math.floor(this.length / 8);

    if (this.buffer.length <= bufIndex) {
      this.buffer.push(0);
    }

    if (bit) {
      this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
    }

    this.length++;
  }
};
module.exports = BitBuffer;
},{}],"../node_modules/qrcode/lib/core/bit-matrix.js":[function(require,module,exports) {
var BufferUtil = require('../utils/buffer');
/**
 * Helper class to handle QR Code symbol modules
 *
 * @param {Number} size Symbol size
 */


function BitMatrix(size) {
  if (!size || size < 1) {
    throw new Error('BitMatrix size must be defined and greater than 0');
  }

  this.size = size;
  this.data = BufferUtil.alloc(size * size);
  this.reservedBit = BufferUtil.alloc(size * size);
}
/**
 * Set bit value at specified location
 * If reserved flag is set, this bit will be ignored during masking process
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 * @param {Boolean} reserved
 */


BitMatrix.prototype.set = function (row, col, value, reserved) {
  var index = row * this.size + col;
  this.data[index] = value;
  if (reserved) this.reservedBit[index] = true;
};
/**
 * Returns bit value at specified location
 *
 * @param  {Number}  row
 * @param  {Number}  col
 * @return {Boolean}
 */


BitMatrix.prototype.get = function (row, col) {
  return this.data[row * this.size + col];
};
/**
 * Applies xor operator at specified location
 * (used during masking process)
 *
 * @param {Number}  row
 * @param {Number}  col
 * @param {Boolean} value
 */


BitMatrix.prototype.xor = function (row, col, value) {
  this.data[row * this.size + col] ^= value;
};
/**
 * Check if bit at specified location is reserved
 *
 * @param {Number}   row
 * @param {Number}   col
 * @return {Boolean}
 */


BitMatrix.prototype.isReserved = function (row, col) {
  return this.reservedBit[row * this.size + col];
};

module.exports = BitMatrix;
},{"../utils/buffer":"../node_modules/qrcode/lib/utils/typedarray-buffer.js"}],"../node_modules/qrcode/lib/core/alignment-pattern.js":[function(require,module,exports) {
/**
 * Alignment pattern are fixed reference pattern in defined positions
 * in a matrix symbology, which enables the decode software to re-synchronise
 * the coordinate mapping of the image modules in the event of moderate amounts
 * of distortion of the image.
 *
 * Alignment patterns are present only in QR Code symbols of version 2 or larger
 * and their number depends on the symbol version.
 */
var getSymbolSize = require('./utils').getSymbolSize;
/**
 * Calculate the row/column coordinates of the center module of each alignment pattern
 * for the specified QR Code version.
 *
 * The alignment patterns are positioned symmetrically on either side of the diagonal
 * running from the top left corner of the symbol to the bottom right corner.
 *
 * Since positions are simmetrical only half of the coordinates are returned.
 * Each item of the array will represent in turn the x and y coordinate.
 * @see {@link getPositions}
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinate
 */


exports.getRowColCoords = function getRowColCoords(version) {
  if (version === 1) return [];
  var posCount = Math.floor(version / 7) + 2;
  var size = getSymbolSize(version);
  var intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
  var positions = [size - 7]; // Last coord is always (size - 7)

  for (var i = 1; i < posCount - 1; i++) {
    positions[i] = positions[i - 1] - intervals;
  }

  positions.push(6); // First coord is always 6

  return positions.reverse();
};
/**
 * Returns an array containing the positions of each alignment pattern.
 * Each array's element represent the center point of the pattern as (x, y) coordinates
 *
 * Coordinates are calculated expanding the row/column coordinates returned by {@link getRowColCoords}
 * and filtering out the items that overlaps with finder pattern
 *
 * @example
 * For a Version 7 symbol {@link getRowColCoords} returns values 6, 22 and 38.
 * The alignment patterns, therefore, are to be centered on (row, column)
 * positions (6,22), (22,6), (22,22), (22,38), (38,22), (38,38).
 * Note that the coordinates (6,6), (6,38), (38,6) are occupied by finder patterns
 * and are not therefore used for alignment patterns.
 *
 * var pos = getPositions(7)
 * // [[6,22], [22,6], [22,22], [22,38], [38,22], [38,38]]
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */


exports.getPositions = function getPositions(version) {
  var coords = [];
  var pos = exports.getRowColCoords(version);
  var posLength = pos.length;

  for (var i = 0; i < posLength; i++) {
    for (var j = 0; j < posLength; j++) {
      // Skip if position is occupied by finder patterns
      if (i === 0 && j === 0 || // top-left
      i === 0 && j === posLength - 1 || // bottom-left
      i === posLength - 1 && j === 0) {
        // top-right
        continue;
      }

      coords.push([pos[i], pos[j]]);
    }
  }

  return coords;
};
},{"./utils":"../node_modules/qrcode/lib/core/utils.js"}],"../node_modules/qrcode/lib/core/finder-pattern.js":[function(require,module,exports) {
var getSymbolSize = require('./utils').getSymbolSize;

var FINDER_PATTERN_SIZE = 7;
/**
 * Returns an array containing the positions of each finder pattern.
 * Each array's element represent the top-left point of the pattern as (x, y) coordinates
 *
 * @param  {Number} version QR Code version
 * @return {Array}          Array of coordinates
 */

exports.getPositions = function getPositions(version) {
  var size = getSymbolSize(version);
  return [// top-left
  [0, 0], // top-right
  [size - FINDER_PATTERN_SIZE, 0], // bottom-left
  [0, size - FINDER_PATTERN_SIZE]];
};
},{"./utils":"../node_modules/qrcode/lib/core/utils.js"}],"../node_modules/qrcode/lib/core/mask-pattern.js":[function(require,module,exports) {
/**
 * Data mask pattern reference
 * @type {Object}
 */
exports.Patterns = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7
};
/**
 * Weighted penalty scores for the undesirable features
 * @type {Object}
 */

var PenaltyScores = {
  N1: 3,
  N2: 3,
  N3: 40,
  N4: 10
};
/**
 * Check if mask pattern value is valid
 *
 * @param  {Number}  mask    Mask pattern
 * @return {Boolean}         true if valid, false otherwise
 */

exports.isValid = function isValid(mask) {
  return mask != null && mask !== '' && !isNaN(mask) && mask >= 0 && mask <= 7;
};
/**
 * Returns mask pattern from a value.
 * If value is not valid, returns undefined
 *
 * @param  {Number|String} value        Mask pattern value
 * @return {Number}                     Valid mask pattern or undefined
 */


exports.from = function from(value) {
  return exports.isValid(value) ? parseInt(value, 10) : undefined;
};
/**
* Find adjacent modules in row/column with the same color
* and assign a penalty value.
*
* Points: N1 + i
* i is the amount by which the number of adjacent modules of the same color exceeds 5
*/


exports.getPenaltyN1 = function getPenaltyN1(data) {
  var size = data.size;
  var points = 0;
  var sameCountCol = 0;
  var sameCountRow = 0;
  var lastCol = null;
  var lastRow = null;

  for (var row = 0; row < size; row++) {
    sameCountCol = sameCountRow = 0;
    lastCol = lastRow = null;

    for (var col = 0; col < size; col++) {
      var module = data.get(row, col);

      if (module === lastCol) {
        sameCountCol++;
      } else {
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        lastCol = module;
        sameCountCol = 1;
      }

      module = data.get(col, row);

      if (module === lastRow) {
        sameCountRow++;
      } else {
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
        lastRow = module;
        sameCountRow = 1;
      }
    }

    if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
    if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
  }

  return points;
};
/**
 * Find 2x2 blocks with the same color and assign a penalty value
 *
 * Points: N2 * (m - 1) * (n - 1)
 */


exports.getPenaltyN2 = function getPenaltyN2(data) {
  var size = data.size;
  var points = 0;

  for (var row = 0; row < size - 1; row++) {
    for (var col = 0; col < size - 1; col++) {
      var last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
      if (last === 4 || last === 0) points++;
    }
  }

  return points * PenaltyScores.N2;
};
/**
 * Find 1:1:3:1:1 ratio (dark:light:dark:light:dark) pattern in row/column,
 * preceded or followed by light area 4 modules wide
 *
 * Points: N3 * number of pattern found
 */


exports.getPenaltyN3 = function getPenaltyN3(data) {
  var size = data.size;
  var points = 0;
  var bitsCol = 0;
  var bitsRow = 0;

  for (var row = 0; row < size; row++) {
    bitsCol = bitsRow = 0;

    for (var col = 0; col < size; col++) {
      bitsCol = bitsCol << 1 & 0x7FF | data.get(row, col);
      if (col >= 10 && (bitsCol === 0x5D0 || bitsCol === 0x05D)) points++;
      bitsRow = bitsRow << 1 & 0x7FF | data.get(col, row);
      if (col >= 10 && (bitsRow === 0x5D0 || bitsRow === 0x05D)) points++;
    }
  }

  return points * PenaltyScores.N3;
};
/**
 * Calculate proportion of dark modules in entire symbol
 *
 * Points: N4 * k
 *
 * k is the rating of the deviation of the proportion of dark modules
 * in the symbol from 50% in steps of 5%
 */


exports.getPenaltyN4 = function getPenaltyN4(data) {
  var darkCount = 0;
  var modulesCount = data.data.length;

  for (var i = 0; i < modulesCount; i++) darkCount += data.data[i];

  var k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
  return k * PenaltyScores.N4;
};
/**
 * Return mask value at given position
 *
 * @param  {Number} maskPattern Pattern reference value
 * @param  {Number} i           Row
 * @param  {Number} j           Column
 * @return {Boolean}            Mask value
 */


function getMaskAt(maskPattern, i, j) {
  switch (maskPattern) {
    case exports.Patterns.PATTERN000:
      return (i + j) % 2 === 0;

    case exports.Patterns.PATTERN001:
      return i % 2 === 0;

    case exports.Patterns.PATTERN010:
      return j % 3 === 0;

    case exports.Patterns.PATTERN011:
      return (i + j) % 3 === 0;

    case exports.Patterns.PATTERN100:
      return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;

    case exports.Patterns.PATTERN101:
      return i * j % 2 + i * j % 3 === 0;

    case exports.Patterns.PATTERN110:
      return (i * j % 2 + i * j % 3) % 2 === 0;

    case exports.Patterns.PATTERN111:
      return (i * j % 3 + (i + j) % 2) % 2 === 0;

    default:
      throw new Error('bad maskPattern:' + maskPattern);
  }
}
/**
 * Apply a mask pattern to a BitMatrix
 *
 * @param  {Number}    pattern Pattern reference number
 * @param  {BitMatrix} data    BitMatrix data
 */


exports.applyMask = function applyMask(pattern, data) {
  var size = data.size;

  for (var col = 0; col < size; col++) {
    for (var row = 0; row < size; row++) {
      if (data.isReserved(row, col)) continue;
      data.xor(row, col, getMaskAt(pattern, row, col));
    }
  }
};
/**
 * Returns the best mask pattern for data
 *
 * @param  {BitMatrix} data
 * @return {Number} Mask pattern reference number
 */


exports.getBestMask = function getBestMask(data, setupFormatFunc) {
  var numPatterns = Object.keys(exports.Patterns).length;
  var bestPattern = 0;
  var lowerPenalty = Infinity;

  for (var p = 0; p < numPatterns; p++) {
    setupFormatFunc(p);
    exports.applyMask(p, data); // Calculate penalty

    var penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data); // Undo previously applied mask

    exports.applyMask(p, data);

    if (penalty < lowerPenalty) {
      lowerPenalty = penalty;
      bestPattern = p;
    }
  }

  return bestPattern;
};
},{}],"../node_modules/qrcode/lib/core/error-correction-code.js":[function(require,module,exports) {
var ECLevel = require('./error-correction-level');

var EC_BLOCKS_TABLE = [// L  M  Q  H
1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81];
var EC_CODEWORDS_TABLE = [// L  M  Q  H
7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430];
/**
 * Returns the number of error correction block that the QR Code should contain
 * for the specified version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction blocks
 */

exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];

    case ECLevel.M:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];

    case ECLevel.Q:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];

    case ECLevel.H:
      return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];

    default:
      return undefined;
  }
};
/**
 * Returns the number of error correction codewords to use for the specified
 * version and error correction level.
 *
 * @param  {Number} version              QR Code version
 * @param  {Number} errorCorrectionLevel Error correction level
 * @return {Number}                      Number of error correction codewords
 */


exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
  switch (errorCorrectionLevel) {
    case ECLevel.L:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];

    case ECLevel.M:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];

    case ECLevel.Q:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];

    case ECLevel.H:
      return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];

    default:
      return undefined;
  }
};
},{"./error-correction-level":"../node_modules/qrcode/lib/core/error-correction-level.js"}],"../node_modules/qrcode/lib/core/galois-field.js":[function(require,module,exports) {
var BufferUtil = require('../utils/buffer');

var EXP_TABLE = BufferUtil.alloc(512);
var LOG_TABLE = BufferUtil.alloc(256)
/**
 * Precompute the log and anti-log tables for faster computation later
 *
 * For each possible value in the galois field 2^8, we will pre-compute
 * the logarithm and anti-logarithm (exponential) of this value
 *
 * ref {@link https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Introduction_to_mathematical_fields}
 */
;

(function initTables() {
  var x = 1;

  for (var i = 0; i < 255; i++) {
    EXP_TABLE[i] = x;
    LOG_TABLE[x] = i;
    x <<= 1; // multiply by 2
    // The QR code specification says to use byte-wise modulo 100011101 arithmetic.
    // This means that when a number is 256 or larger, it should be XORed with 0x11D.

    if (x & 0x100) {
      // similar to x >= 256, but a lot faster (because 0x100 == 256)
      x ^= 0x11D;
    }
  } // Optimization: double the size of the anti-log table so that we don't need to mod 255 to
  // stay inside the bounds (because we will mainly use this table for the multiplication of
  // two GF numbers, no more).
  // @see {@link mul}


  for (i = 255; i < 512; i++) {
    EXP_TABLE[i] = EXP_TABLE[i - 255];
  }
})();
/**
 * Returns log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */


exports.log = function log(n) {
  if (n < 1) throw new Error('log(' + n + ')');
  return LOG_TABLE[n];
};
/**
 * Returns anti-log value of n inside Galois Field
 *
 * @param  {Number} n
 * @return {Number}
 */


exports.exp = function exp(n) {
  return EXP_TABLE[n];
};
/**
 * Multiplies two number inside Galois Field
 *
 * @param  {Number} x
 * @param  {Number} y
 * @return {Number}
 */


exports.mul = function mul(x, y) {
  if (x === 0 || y === 0) return 0; // should be EXP_TABLE[(LOG_TABLE[x] + LOG_TABLE[y]) % 255] if EXP_TABLE wasn't oversized
  // @see {@link initTables}

  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
};
},{"../utils/buffer":"../node_modules/qrcode/lib/utils/typedarray-buffer.js"}],"../node_modules/qrcode/lib/core/polynomial.js":[function(require,module,exports) {
var BufferUtil = require('../utils/buffer');

var GF = require('./galois-field');
/**
 * Multiplies two polynomials inside Galois Field
 *
 * @param  {Buffer} p1 Polynomial
 * @param  {Buffer} p2 Polynomial
 * @return {Buffer}    Product of p1 and p2
 */


exports.mul = function mul(p1, p2) {
  var coeff = BufferUtil.alloc(p1.length + p2.length - 1);

  for (var i = 0; i < p1.length; i++) {
    for (var j = 0; j < p2.length; j++) {
      coeff[i + j] ^= GF.mul(p1[i], p2[j]);
    }
  }

  return coeff;
};
/**
 * Calculate the remainder of polynomials division
 *
 * @param  {Buffer} divident Polynomial
 * @param  {Buffer} divisor  Polynomial
 * @return {Buffer}          Remainder
 */


exports.mod = function mod(divident, divisor) {
  var result = BufferUtil.from(divident);

  while (result.length - divisor.length >= 0) {
    var coeff = result[0];

    for (var i = 0; i < divisor.length; i++) {
      result[i] ^= GF.mul(divisor[i], coeff);
    } // remove all zeros from buffer head


    var offset = 0;

    while (offset < result.length && result[offset] === 0) offset++;

    result = result.slice(offset);
  }

  return result;
};
/**
 * Generate an irreducible generator polynomial of specified degree
 * (used by Reed-Solomon encoder)
 *
 * @param  {Number} degree Degree of the generator polynomial
 * @return {Buffer}        Buffer containing polynomial coefficients
 */


exports.generateECPolynomial = function generateECPolynomial(degree) {
  var poly = BufferUtil.from([1]);

  for (var i = 0; i < degree; i++) {
    poly = exports.mul(poly, [1, GF.exp(i)]);
  }

  return poly;
};
},{"../utils/buffer":"../node_modules/qrcode/lib/utils/typedarray-buffer.js","./galois-field":"../node_modules/qrcode/lib/core/galois-field.js"}],"../node_modules/qrcode/lib/core/reed-solomon-encoder.js":[function(require,module,exports) {

var BufferUtil = require('../utils/buffer');

var Polynomial = require('./polynomial');

var Buffer = require('buffer').Buffer;

function ReedSolomonEncoder(degree) {
  this.genPoly = undefined;
  this.degree = degree;
  if (this.degree) this.initialize(this.degree);
}
/**
 * Initialize the encoder.
 * The input param should correspond to the number of error correction codewords.
 *
 * @param  {Number} degree
 */


ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
  // create an irreducible generator polynomial
  this.degree = degree;
  this.genPoly = Polynomial.generateECPolynomial(this.degree);
};
/**
 * Encodes a chunk of data
 *
 * @param  {Buffer} data Buffer containing input data
 * @return {Buffer}      Buffer containing encoded data
 */


ReedSolomonEncoder.prototype.encode = function encode(data) {
  if (!this.genPoly) {
    throw new Error('Encoder not initialized');
  } // Calculate EC for this data block
  // extends data size to data+genPoly size


  var pad = BufferUtil.alloc(this.degree);
  var paddedData = Buffer.concat([data, pad], data.length + this.degree); // The error correction codewords are the remainder after dividing the data codewords
  // by a generator polynomial

  var remainder = Polynomial.mod(paddedData, this.genPoly); // return EC data blocks (last n byte, where n is the degree of genPoly)
  // If coefficients number in remainder are less than genPoly degree,
  // pad with 0s to the left to reach the needed number of coefficients

  var start = this.degree - remainder.length;

  if (start > 0) {
    var buff = BufferUtil.alloc(this.degree);
    remainder.copy(buff, start);
    return buff;
  }

  return remainder;
};

module.exports = ReedSolomonEncoder;
},{"../utils/buffer":"../node_modules/qrcode/lib/utils/typedarray-buffer.js","./polynomial":"../node_modules/qrcode/lib/core/polynomial.js","buffer":"C:/Users/Kaifat/AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/buffer/index.js"}],"../node_modules/qrcode/lib/core/version-check.js":[function(require,module,exports) {
/**
 * Check if QR Code version is valid
 *
 * @param  {Number}  version QR Code version
 * @return {Boolean}         true if valid version, false otherwise
 */
exports.isValid = function isValid(version) {
  return !isNaN(version) && version >= 1 && version <= 40;
};
},{}],"../node_modules/qrcode/lib/core/regex.js":[function(require,module,exports) {
var numeric = '[0-9]+';
var alphanumeric = '[A-Z $%*+\\-./:]+';
var kanji = '(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|' + '[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|' + '[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|' + '[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+';
kanji = kanji.replace(/u/g, '\\u');
var byte = '(?:(?![A-Z0-9 $%*+\\-./:]|' + kanji + ')(?:.|[\r\n]))+';
exports.KANJI = new RegExp(kanji, 'g');
exports.BYTE_KANJI = new RegExp('[^A-Z0-9 $%*+\\-./:]+', 'g');
exports.BYTE = new RegExp(byte, 'g');
exports.NUMERIC = new RegExp(numeric, 'g');
exports.ALPHANUMERIC = new RegExp(alphanumeric, 'g');
var TEST_KANJI = new RegExp('^' + kanji + '$');
var TEST_NUMERIC = new RegExp('^' + numeric + '$');
var TEST_ALPHANUMERIC = new RegExp('^[A-Z0-9 $%*+\\-./:]+$');

exports.testKanji = function testKanji(str) {
  return TEST_KANJI.test(str);
};

exports.testNumeric = function testNumeric(str) {
  return TEST_NUMERIC.test(str);
};

exports.testAlphanumeric = function testAlphanumeric(str) {
  return TEST_ALPHANUMERIC.test(str);
};
},{}],"../node_modules/qrcode/lib/core/mode.js":[function(require,module,exports) {
var VersionCheck = require('./version-check');

var Regex = require('./regex');
/**
 * Numeric mode encodes data from the decimal digit set (0 - 9)
 * (byte values 30HEX to 39HEX).
 * Normally, 3 data characters are represented by 10 bits.
 *
 * @type {Object}
 */


exports.NUMERIC = {
  id: 'Numeric',
  bit: 1 << 0,
  ccBits: [10, 12, 14]
};
/**
 * Alphanumeric mode encodes data from a set of 45 characters,
 * i.e. 10 numeric digits (0 - 9),
 *      26 alphabetic characters (A - Z),
 *   and 9 symbols (SP, $, %, *, +, -, ., /, :).
 * Normally, two input characters are represented by 11 bits.
 *
 * @type {Object}
 */

exports.ALPHANUMERIC = {
  id: 'Alphanumeric',
  bit: 1 << 1,
  ccBits: [9, 11, 13]
};
/**
 * In byte mode, data is encoded at 8 bits per character.
 *
 * @type {Object}
 */

exports.BYTE = {
  id: 'Byte',
  bit: 1 << 2,
  ccBits: [8, 16, 16]
};
/**
 * The Kanji mode efficiently encodes Kanji characters in accordance with
 * the Shift JIS system based on JIS X 0208.
 * The Shift JIS values are shifted from the JIS X 0208 values.
 * JIS X 0208 gives details of the shift coded representation.
 * Each two-byte character value is compacted to a 13-bit binary codeword.
 *
 * @type {Object}
 */

exports.KANJI = {
  id: 'Kanji',
  bit: 1 << 3,
  ccBits: [8, 10, 12]
};
/**
 * Mixed mode will contain a sequences of data in a combination of any of
 * the modes described above
 *
 * @type {Object}
 */

exports.MIXED = {
  bit: -1
};
/**
 * Returns the number of bits needed to store the data length
 * according to QR Code specifications.
 *
 * @param  {Mode}   mode    Data mode
 * @param  {Number} version QR Code version
 * @return {Number}         Number of bits
 */

exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
  if (!mode.ccBits) throw new Error('Invalid mode: ' + mode);

  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid version: ' + version);
  }

  if (version >= 1 && version < 10) return mode.ccBits[0];else if (version < 27) return mode.ccBits[1];
  return mode.ccBits[2];
};
/**
 * Returns the most efficient mode to store the specified data
 *
 * @param  {String} dataStr Input data string
 * @return {Mode}           Best mode
 */


exports.getBestModeForData = function getBestModeForData(dataStr) {
  if (Regex.testNumeric(dataStr)) return exports.NUMERIC;else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;else if (Regex.testKanji(dataStr)) return exports.KANJI;else return exports.BYTE;
};
/**
 * Return mode name as string
 *
 * @param {Mode} mode Mode object
 * @returns {String}  Mode name
 */


exports.toString = function toString(mode) {
  if (mode && mode.id) return mode.id;
  throw new Error('Invalid mode');
};
/**
 * Check if input param is a valid mode object
 *
 * @param   {Mode}    mode Mode object
 * @returns {Boolean} True if valid mode, false otherwise
 */


exports.isValid = function isValid(mode) {
  return mode && mode.bit && mode.ccBits;
};
/**
 * Get mode object from its name
 *
 * @param   {String} string Mode name
 * @returns {Mode}          Mode object
 */


function fromString(string) {
  if (typeof string !== 'string') {
    throw new Error('Param is not a string');
  }

  var lcStr = string.toLowerCase();

  switch (lcStr) {
    case 'numeric':
      return exports.NUMERIC;

    case 'alphanumeric':
      return exports.ALPHANUMERIC;

    case 'kanji':
      return exports.KANJI;

    case 'byte':
      return exports.BYTE;

    default:
      throw new Error('Unknown mode: ' + string);
  }
}
/**
 * Returns mode from a value.
 * If value is not a valid mode, returns defaultValue
 *
 * @param  {Mode|String} value        Encoding mode
 * @param  {Mode}        defaultValue Fallback value
 * @return {Mode}                     Encoding mode
 */


exports.from = function from(value, defaultValue) {
  if (exports.isValid(value)) {
    return value;
  }

  try {
    return fromString(value);
  } catch (e) {
    return defaultValue;
  }
};
},{"./version-check":"../node_modules/qrcode/lib/core/version-check.js","./regex":"../node_modules/qrcode/lib/core/regex.js"}],"../node_modules/qrcode/lib/core/version.js":[function(require,module,exports) {
var Utils = require('./utils');

var ECCode = require('./error-correction-code');

var ECLevel = require('./error-correction-level');

var Mode = require('./mode');

var VersionCheck = require('./version-check');

var isArray = require('isarray'); // Generator polynomial used to encode version information


var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
var G18_BCH = Utils.getBCHDigit(G18);

function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
  for (var currentVersion = 1; currentVersion <= 40; currentVersion++) {
    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
      return currentVersion;
    }
  }

  return undefined;
}

function getReservedBitsCount(mode, version) {
  // Character count indicator + mode indicator bits
  return Mode.getCharCountIndicator(mode, version) + 4;
}

function getTotalBitsFromDataArray(segments, version) {
  var totalBits = 0;
  segments.forEach(function (data) {
    var reservedBits = getReservedBitsCount(data.mode, version);
    totalBits += reservedBits + data.getBitsLength();
  });
  return totalBits;
}

function getBestVersionForMixedData(segments, errorCorrectionLevel) {
  for (var currentVersion = 1; currentVersion <= 40; currentVersion++) {
    var length = getTotalBitsFromDataArray(segments, currentVersion);

    if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
      return currentVersion;
    }
  }

  return undefined;
}
/**
 * Returns version number from a value.
 * If value is not a valid version, returns defaultValue
 *
 * @param  {Number|String} value        QR Code version
 * @param  {Number}        defaultValue Fallback value
 * @return {Number}                     QR Code version number
 */


exports.from = function from(value, defaultValue) {
  if (VersionCheck.isValid(value)) {
    return parseInt(value, 10);
  }

  return defaultValue;
};
/**
 * Returns how much data can be stored with the specified QR code version
 * and error correction level
 *
 * @param  {Number} version              QR Code version (1-40)
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Mode}   mode                 Data mode
 * @return {Number}                      Quantity of storable data
 */


exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
  if (!VersionCheck.isValid(version)) {
    throw new Error('Invalid QR Code version');
  } // Use Byte mode as default


  if (typeof mode === 'undefined') mode = Mode.BYTE; // Total codewords for this QR code version (Data + Error correction)

  var totalCodewords = Utils.getSymbolTotalCodewords(version); // Total number of error correction codewords

  var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel); // Total number of data codewords

  var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
  if (mode === Mode.MIXED) return dataTotalCodewordsBits;
  var usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version); // Return max number of storable codewords

  switch (mode) {
    case Mode.NUMERIC:
      return Math.floor(usableBits / 10 * 3);

    case Mode.ALPHANUMERIC:
      return Math.floor(usableBits / 11 * 2);

    case Mode.KANJI:
      return Math.floor(usableBits / 13);

    case Mode.BYTE:
    default:
      return Math.floor(usableBits / 8);
  }
};
/**
 * Returns the minimum version needed to contain the amount of data
 *
 * @param  {Segment} data                    Segment of data
 * @param  {Number} [errorCorrectionLevel=H] Error correction level
 * @param  {Mode} mode                       Data mode
 * @return {Number}                          QR Code version
 */


exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
  var seg;
  var ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);

  if (isArray(data)) {
    if (data.length > 1) {
      return getBestVersionForMixedData(data, ecl);
    }

    if (data.length === 0) {
      return 1;
    }

    seg = data[0];
  } else {
    seg = data;
  }

  return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
};
/**
 * Returns version information with relative error correction bits
 *
 * The version information is included in QR Code symbols of version 7 or larger.
 * It consists of an 18-bit sequence containing 6 data bits,
 * with 12 error correction bits calculated using the (18, 6) Golay code.
 *
 * @param  {Number} version QR Code version
 * @return {Number}         Encoded version info bits
 */


exports.getEncodedBits = function getEncodedBits(version) {
  if (!VersionCheck.isValid(version) || version < 7) {
    throw new Error('Invalid QR Code version');
  }

  var d = version << 12;

  while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
    d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
  }

  return version << 12 | d;
};
},{"./utils":"../node_modules/qrcode/lib/core/utils.js","./error-correction-code":"../node_modules/qrcode/lib/core/error-correction-code.js","./error-correction-level":"../node_modules/qrcode/lib/core/error-correction-level.js","./mode":"../node_modules/qrcode/lib/core/mode.js","./version-check":"../node_modules/qrcode/lib/core/version-check.js","isarray":"../node_modules/qrcode/node_modules/isarray/index.js"}],"../node_modules/qrcode/lib/core/format-info.js":[function(require,module,exports) {
var Utils = require('./utils');

var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
var G15_BCH = Utils.getBCHDigit(G15);
/**
 * Returns format information with relative error correction bits
 *
 * The format information is a 15-bit sequence containing 5 data bits,
 * with 10 error correction bits calculated using the (15, 5) BCH code.
 *
 * @param  {Number} errorCorrectionLevel Error correction level
 * @param  {Number} mask                 Mask pattern
 * @return {Number}                      Encoded format information bits
 */

exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
  var data = errorCorrectionLevel.bit << 3 | mask;
  var d = data << 10;

  while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
    d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
  } // xor final data with mask pattern in order to ensure that
  // no combination of Error Correction Level and data mask pattern
  // will result in an all-zero data string


  return (data << 10 | d) ^ G15_MASK;
};
},{"./utils":"../node_modules/qrcode/lib/core/utils.js"}],"../node_modules/qrcode/lib/core/numeric-data.js":[function(require,module,exports) {
var Mode = require('./mode');

function NumericData(data) {
  this.mode = Mode.NUMERIC;
  this.data = data.toString();
}

NumericData.getBitsLength = function getBitsLength(length) {
  return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
};

NumericData.prototype.getLength = function getLength() {
  return this.data.length;
};

NumericData.prototype.getBitsLength = function getBitsLength() {
  return NumericData.getBitsLength(this.data.length);
};

NumericData.prototype.write = function write(bitBuffer) {
  var i, group, value; // The input data string is divided into groups of three digits,
  // and each group is converted to its 10-bit binary equivalent.

  for (i = 0; i + 3 <= this.data.length; i += 3) {
    group = this.data.substr(i, 3);
    value = parseInt(group, 10);
    bitBuffer.put(value, 10);
  } // If the number of input digits is not an exact multiple of three,
  // the final one or two digits are converted to 4 or 7 bits respectively.


  var remainingNum = this.data.length - i;

  if (remainingNum > 0) {
    group = this.data.substr(i);
    value = parseInt(group, 10);
    bitBuffer.put(value, remainingNum * 3 + 1);
  }
};

module.exports = NumericData;
},{"./mode":"../node_modules/qrcode/lib/core/mode.js"}],"../node_modules/qrcode/lib/core/alphanumeric-data.js":[function(require,module,exports) {
var Mode = require('./mode');
/**
 * Array of characters available in alphanumeric mode
 *
 * As per QR Code specification, to each character
 * is assigned a value from 0 to 44 which in this case coincides
 * with the array index
 *
 * @type {Array}
 */


var ALPHA_NUM_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' ', '$', '%', '*', '+', '-', '.', '/', ':'];

function AlphanumericData(data) {
  this.mode = Mode.ALPHANUMERIC;
  this.data = data;
}

AlphanumericData.getBitsLength = function getBitsLength(length) {
  return 11 * Math.floor(length / 2) + 6 * (length % 2);
};

AlphanumericData.prototype.getLength = function getLength() {
  return this.data.length;
};

AlphanumericData.prototype.getBitsLength = function getBitsLength() {
  return AlphanumericData.getBitsLength(this.data.length);
};

AlphanumericData.prototype.write = function write(bitBuffer) {
  var i; // Input data characters are divided into groups of two characters
  // and encoded as 11-bit binary codes.

  for (i = 0; i + 2 <= this.data.length; i += 2) {
    // The character value of the first character is multiplied by 45
    var value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45; // The character value of the second digit is added to the product

    value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]); // The sum is then stored as 11-bit binary number

    bitBuffer.put(value, 11);
  } // If the number of input data characters is not a multiple of two,
  // the character value of the final character is encoded as a 6-bit binary number.


  if (this.data.length % 2) {
    bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
  }
};

module.exports = AlphanumericData;
},{"./mode":"../node_modules/qrcode/lib/core/mode.js"}],"../node_modules/qrcode/lib/core/byte-data.js":[function(require,module,exports) {
var BufferUtil = require('../utils/buffer');

var Mode = require('./mode');

function ByteData(data) {
  this.mode = Mode.BYTE;
  this.data = BufferUtil.from(data);
}

ByteData.getBitsLength = function getBitsLength(length) {
  return length * 8;
};

ByteData.prototype.getLength = function getLength() {
  return this.data.length;
};

ByteData.prototype.getBitsLength = function getBitsLength() {
  return ByteData.getBitsLength(this.data.length);
};

ByteData.prototype.write = function (bitBuffer) {
  for (var i = 0, l = this.data.length; i < l; i++) {
    bitBuffer.put(this.data[i], 8);
  }
};

module.exports = ByteData;
},{"../utils/buffer":"../node_modules/qrcode/lib/utils/typedarray-buffer.js","./mode":"../node_modules/qrcode/lib/core/mode.js"}],"../node_modules/qrcode/lib/core/kanji-data.js":[function(require,module,exports) {
var Mode = require('./mode');

var Utils = require('./utils');

function KanjiData(data) {
  this.mode = Mode.KANJI;
  this.data = data;
}

KanjiData.getBitsLength = function getBitsLength(length) {
  return length * 13;
};

KanjiData.prototype.getLength = function getLength() {
  return this.data.length;
};

KanjiData.prototype.getBitsLength = function getBitsLength() {
  return KanjiData.getBitsLength(this.data.length);
};

KanjiData.prototype.write = function (bitBuffer) {
  var i; // In the Shift JIS system, Kanji characters are represented by a two byte combination.
  // These byte values are shifted from the JIS X 0208 values.
  // JIS X 0208 gives details of the shift coded representation.

  for (i = 0; i < this.data.length; i++) {
    var value = Utils.toSJIS(this.data[i]); // For characters with Shift JIS values from 0x8140 to 0x9FFC:

    if (value >= 0x8140 && value <= 0x9FFC) {
      // Subtract 0x8140 from Shift JIS value
      value -= 0x8140; // For characters with Shift JIS values from 0xE040 to 0xEBBF
    } else if (value >= 0xE040 && value <= 0xEBBF) {
      // Subtract 0xC140 from Shift JIS value
      value -= 0xC140;
    } else {
      throw new Error('Invalid SJIS character: ' + this.data[i] + '\n' + 'Make sure your charset is UTF-8');
    } // Multiply most significant byte of result by 0xC0
    // and add least significant byte to product


    value = (value >>> 8 & 0xff) * 0xC0 + (value & 0xff); // Convert result to a 13-bit binary string

    bitBuffer.put(value, 13);
  }
};

module.exports = KanjiData;
},{"./mode":"../node_modules/qrcode/lib/core/mode.js","./utils":"../node_modules/qrcode/lib/core/utils.js"}],"../node_modules/dijkstrajs/dijkstra.js":[function(require,module,exports) {
'use strict';

/******************************************************************************
 * Created 2008-08-19.
 *
 * Dijkstra path-finding functions. Adapted from the Dijkstar Python project.
 *
 * Copyright (C) 2008
 *   Wyatt Baldwin <self@wyattbaldwin.com>
 *   All rights reserved
 *
 * Licensed under the MIT license.
 *
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *****************************************************************************/
var dijkstra = {
  single_source_shortest_paths: function(graph, s, d) {
    // Predecessor map for each node that has been encountered.
    // node ID => predecessor node ID
    var predecessors = {};

    // Costs of shortest paths from s to all nodes encountered.
    // node ID => cost
    var costs = {};
    costs[s] = 0;

    // Costs of shortest paths from s to all nodes encountered; differs from
    // `costs` in that it provides easy access to the node that currently has
    // the known shortest path from s.
    // XXX: Do we actually need both `costs` and `open`?
    var open = dijkstra.PriorityQueue.make();
    open.push(s, 0);

    var closest,
        u, v,
        cost_of_s_to_u,
        adjacent_nodes,
        cost_of_e,
        cost_of_s_to_u_plus_cost_of_e,
        cost_of_s_to_v,
        first_visit;
    while (!open.empty()) {
      // In the nodes remaining in graph that have a known cost from s,
      // find the node, u, that currently has the shortest path from s.
      closest = open.pop();
      u = closest.value;
      cost_of_s_to_u = closest.cost;

      // Get nodes adjacent to u...
      adjacent_nodes = graph[u] || {};

      // ...and explore the edges that connect u to those nodes, updating
      // the cost of the shortest paths to any or all of those nodes as
      // necessary. v is the node across the current edge from u.
      for (v in adjacent_nodes) {
        if (adjacent_nodes.hasOwnProperty(v)) {
          // Get the cost of the edge running from u to v.
          cost_of_e = adjacent_nodes[v];

          // Cost of s to u plus the cost of u to v across e--this is *a*
          // cost from s to v that may or may not be less than the current
          // known cost to v.
          cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

          // If we haven't visited v yet OR if the current known cost from s to
          // v is greater than the new cost we just found (cost of s to u plus
          // cost of u to v across e), update v's cost in the cost list and
          // update v's predecessor in the predecessor list (it's now u).
          cost_of_s_to_v = costs[v];
          first_visit = (typeof costs[v] === 'undefined');
          if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
            costs[v] = cost_of_s_to_u_plus_cost_of_e;
            open.push(v, cost_of_s_to_u_plus_cost_of_e);
            predecessors[v] = u;
          }
        }
      }
    }

    if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
      var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
      throw new Error(msg);
    }

    return predecessors;
  },

  extract_shortest_path_from_predecessor_list: function(predecessors, d) {
    var nodes = [];
    var u = d;
    var predecessor;
    while (u) {
      nodes.push(u);
      predecessor = predecessors[u];
      u = predecessors[u];
    }
    nodes.reverse();
    return nodes;
  },

  find_path: function(graph, s, d) {
    var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
    return dijkstra.extract_shortest_path_from_predecessor_list(
      predecessors, d);
  },

  /**
   * A very naive priority queue implementation.
   */
  PriorityQueue: {
    make: function (opts) {
      var T = dijkstra.PriorityQueue,
          t = {},
          key;
      opts = opts || {};
      for (key in T) {
        if (T.hasOwnProperty(key)) {
          t[key] = T[key];
        }
      }
      t.queue = [];
      t.sorter = opts.sorter || T.default_sorter;
      return t;
    },

    default_sorter: function (a, b) {
      return a.cost - b.cost;
    },

    /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */
    push: function (value, cost) {
      var item = {value: value, cost: cost};
      this.queue.push(item);
      this.queue.sort(this.sorter);
    },

    /**
     * Return the highest priority element in the queue.
     */
    pop: function () {
      return this.queue.shift();
    },

    empty: function () {
      return this.queue.length === 0;
    }
  }
};


// node.js module exports
if (typeof module !== 'undefined') {
  module.exports = dijkstra;
}

},{}],"../node_modules/qrcode/lib/core/segments.js":[function(require,module,exports) {
var Mode = require('./mode');

var NumericData = require('./numeric-data');

var AlphanumericData = require('./alphanumeric-data');

var ByteData = require('./byte-data');

var KanjiData = require('./kanji-data');

var Regex = require('./regex');

var Utils = require('./utils');

var dijkstra = require('dijkstrajs');
/**
 * Returns UTF8 byte length
 *
 * @param  {String} str Input string
 * @return {Number}     Number of byte
 */


function getStringByteLength(str) {
  return unescape(encodeURIComponent(str)).length;
}
/**
 * Get a list of segments of the specified mode
 * from a string
 *
 * @param  {Mode}   mode Segment mode
 * @param  {String} str  String to process
 * @return {Array}       Array of object with segments data
 */


function getSegments(regex, mode, str) {
  var segments = [];
  var result;

  while ((result = regex.exec(str)) !== null) {
    segments.push({
      data: result[0],
      index: result.index,
      mode: mode,
      length: result[0].length
    });
  }

  return segments;
}
/**
 * Extracts a series of segments with the appropriate
 * modes from a string
 *
 * @param  {String} dataStr Input string
 * @return {Array}          Array of object with segments data
 */


function getSegmentsFromString(dataStr) {
  var numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
  var alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
  var byteSegs;
  var kanjiSegs;

  if (Utils.isKanjiModeEnabled()) {
    byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
    kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
  } else {
    byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
    kanjiSegs = [];
  }

  var segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
  return segs.sort(function (s1, s2) {
    return s1.index - s2.index;
  }).map(function (obj) {
    return {
      data: obj.data,
      mode: obj.mode,
      length: obj.length
    };
  });
}
/**
 * Returns how many bits are needed to encode a string of
 * specified length with the specified mode
 *
 * @param  {Number} length String length
 * @param  {Mode} mode     Segment mode
 * @return {Number}        Bit length
 */


function getSegmentBitsLength(length, mode) {
  switch (mode) {
    case Mode.NUMERIC:
      return NumericData.getBitsLength(length);

    case Mode.ALPHANUMERIC:
      return AlphanumericData.getBitsLength(length);

    case Mode.KANJI:
      return KanjiData.getBitsLength(length);

    case Mode.BYTE:
      return ByteData.getBitsLength(length);
  }
}
/**
 * Merges adjacent segments which have the same mode
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */


function mergeSegments(segs) {
  return segs.reduce(function (acc, curr) {
    var prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;

    if (prevSeg && prevSeg.mode === curr.mode) {
      acc[acc.length - 1].data += curr.data;
      return acc;
    }

    acc.push(curr);
    return acc;
  }, []);
}
/**
 * Generates a list of all possible nodes combination which
 * will be used to build a segments graph.
 *
 * Nodes are divided by groups. Each group will contain a list of all the modes
 * in which is possible to encode the given text.
 *
 * For example the text '12345' can be encoded as Numeric, Alphanumeric or Byte.
 * The group for '12345' will contain then 3 objects, one for each
 * possible encoding mode.
 *
 * Each node represents a possible segment.
 *
 * @param  {Array} segs Array of object with segments data
 * @return {Array}      Array of object with segments data
 */


function buildNodes(segs) {
  var nodes = [];

  for (var i = 0; i < segs.length; i++) {
    var seg = segs[i];

    switch (seg.mode) {
      case Mode.NUMERIC:
        nodes.push([seg, {
          data: seg.data,
          mode: Mode.ALPHANUMERIC,
          length: seg.length
        }, {
          data: seg.data,
          mode: Mode.BYTE,
          length: seg.length
        }]);
        break;

      case Mode.ALPHANUMERIC:
        nodes.push([seg, {
          data: seg.data,
          mode: Mode.BYTE,
          length: seg.length
        }]);
        break;

      case Mode.KANJI:
        nodes.push([seg, {
          data: seg.data,
          mode: Mode.BYTE,
          length: getStringByteLength(seg.data)
        }]);
        break;

      case Mode.BYTE:
        nodes.push([{
          data: seg.data,
          mode: Mode.BYTE,
          length: getStringByteLength(seg.data)
        }]);
    }
  }

  return nodes;
}
/**
 * Builds a graph from a list of nodes.
 * All segments in each node group will be connected with all the segments of
 * the next group and so on.
 *
 * At each connection will be assigned a weight depending on the
 * segment's byte length.
 *
 * @param  {Array} nodes    Array of object with segments data
 * @param  {Number} version QR Code version
 * @return {Object}         Graph of all possible segments
 */


function buildGraph(nodes, version) {
  var table = {};
  var graph = {
    'start': {}
  };
  var prevNodeIds = ['start'];

  for (var i = 0; i < nodes.length; i++) {
    var nodeGroup = nodes[i];
    var currentNodeIds = [];

    for (var j = 0; j < nodeGroup.length; j++) {
      var node = nodeGroup[j];
      var key = '' + i + j;
      currentNodeIds.push(key);
      table[key] = {
        node: node,
        lastCount: 0
      };
      graph[key] = {};

      for (var n = 0; n < prevNodeIds.length; n++) {
        var prevNodeId = prevNodeIds[n];

        if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
          graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
          table[prevNodeId].lastCount += node.length;
        } else {
          if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
          graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version); // switch cost
        }
      }
    }

    prevNodeIds = currentNodeIds;
  }

  for (n = 0; n < prevNodeIds.length; n++) {
    graph[prevNodeIds[n]]['end'] = 0;
  }

  return {
    map: graph,
    table: table
  };
}
/**
 * Builds a segment from a specified data and mode.
 * If a mode is not specified, the more suitable will be used.
 *
 * @param  {String} data             Input data
 * @param  {Mode | String} modesHint Data mode
 * @return {Segment}                 Segment
 */


function buildSingleSegment(data, modesHint) {
  var mode;
  var bestMode = Mode.getBestModeForData(data);
  mode = Mode.from(modesHint, bestMode); // Make sure data can be encoded

  if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
    throw new Error('"' + data + '"' + ' cannot be encoded with mode ' + Mode.toString(mode) + '.\n Suggested mode is: ' + Mode.toString(bestMode));
  } // Use Mode.BYTE if Kanji support is disabled


  if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
    mode = Mode.BYTE;
  }

  switch (mode) {
    case Mode.NUMERIC:
      return new NumericData(data);

    case Mode.ALPHANUMERIC:
      return new AlphanumericData(data);

    case Mode.KANJI:
      return new KanjiData(data);

    case Mode.BYTE:
      return new ByteData(data);
  }
}
/**
 * Builds a list of segments from an array.
 * Array can contain Strings or Objects with segment's info.
 *
 * For each item which is a string, will be generated a segment with the given
 * string and the more appropriate encoding mode.
 *
 * For each item which is an object, will be generated a segment with the given
 * data and mode.
 * Objects must contain at least the property "data".
 * If property "mode" is not present, the more suitable mode will be used.
 *
 * @param  {Array} array Array of objects with segments data
 * @return {Array}       Array of Segments
 */


exports.fromArray = function fromArray(array) {
  return array.reduce(function (acc, seg) {
    if (typeof seg === 'string') {
      acc.push(buildSingleSegment(seg, null));
    } else if (seg.data) {
      acc.push(buildSingleSegment(seg.data, seg.mode));
    }

    return acc;
  }, []);
};
/**
 * Builds an optimized sequence of segments from a string,
 * which will produce the shortest possible bitstream.
 *
 * @param  {String} data    Input string
 * @param  {Number} version QR Code version
 * @return {Array}          Array of segments
 */


exports.fromString = function fromString(data, version) {
  var segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
  var nodes = buildNodes(segs);
  var graph = buildGraph(nodes, version);
  var path = dijkstra.find_path(graph.map, 'start', 'end');
  var optimizedSegs = [];

  for (var i = 1; i < path.length - 1; i++) {
    optimizedSegs.push(graph.table[path[i]].node);
  }

  return exports.fromArray(mergeSegments(optimizedSegs));
};
/**
 * Splits a string in various segments with the modes which
 * best represent their content.
 * The produced segments are far from being optimized.
 * The output of this function is only used to estimate a QR Code version
 * which may contain the data.
 *
 * @param  {string} data Input string
 * @return {Array}       Array of segments
 */


exports.rawSplit = function rawSplit(data) {
  return exports.fromArray(getSegmentsFromString(data, Utils.isKanjiModeEnabled()));
};
},{"./mode":"../node_modules/qrcode/lib/core/mode.js","./numeric-data":"../node_modules/qrcode/lib/core/numeric-data.js","./alphanumeric-data":"../node_modules/qrcode/lib/core/alphanumeric-data.js","./byte-data":"../node_modules/qrcode/lib/core/byte-data.js","./kanji-data":"../node_modules/qrcode/lib/core/kanji-data.js","./regex":"../node_modules/qrcode/lib/core/regex.js","./utils":"../node_modules/qrcode/lib/core/utils.js","dijkstrajs":"../node_modules/dijkstrajs/dijkstra.js"}],"../node_modules/qrcode/lib/core/qrcode.js":[function(require,module,exports) {
var BufferUtil = require('../utils/buffer');

var Utils = require('./utils');

var ECLevel = require('./error-correction-level');

var BitBuffer = require('./bit-buffer');

var BitMatrix = require('./bit-matrix');

var AlignmentPattern = require('./alignment-pattern');

var FinderPattern = require('./finder-pattern');

var MaskPattern = require('./mask-pattern');

var ECCode = require('./error-correction-code');

var ReedSolomonEncoder = require('./reed-solomon-encoder');

var Version = require('./version');

var FormatInfo = require('./format-info');

var Mode = require('./mode');

var Segments = require('./segments');

var isArray = require('isarray');
/**
 * QRCode for JavaScript
 *
 * modified by Ryan Day for nodejs support
 * Copyright (c) 2011 Ryan Day
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
*/

/**
 * Add finder patterns bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */


function setupFinderPattern(matrix, version) {
  var size = matrix.size;
  var pos = FinderPattern.getPositions(version);

  for (var i = 0; i < pos.length; i++) {
    var row = pos[i][0];
    var col = pos[i][1];

    for (var r = -1; r <= 7; r++) {
      if (row + r <= -1 || size <= row + r) continue;

      for (var c = -1; c <= 7; c++) {
        if (col + c <= -1 || size <= col + c) continue;

        if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}
/**
 * Add timing pattern bits to matrix
 *
 * Note: this function must be called before {@link setupAlignmentPattern}
 *
 * @param  {BitMatrix} matrix Modules matrix
 */


function setupTimingPattern(matrix) {
  var size = matrix.size;

  for (var r = 8; r < size - 8; r++) {
    var value = r % 2 === 0;
    matrix.set(r, 6, value, true);
    matrix.set(6, r, value, true);
  }
}
/**
 * Add alignment patterns bits to matrix
 *
 * Note: this function must be called after {@link setupTimingPattern}
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */


function setupAlignmentPattern(matrix, version) {
  var pos = AlignmentPattern.getPositions(version);

  for (var i = 0; i < pos.length; i++) {
    var row = pos[i][0];
    var col = pos[i][1];

    for (var r = -2; r <= 2; r++) {
      for (var c = -2; c <= 2; c++) {
        if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
          matrix.set(row + r, col + c, true, true);
        } else {
          matrix.set(row + r, col + c, false, true);
        }
      }
    }
  }
}
/**
 * Add version info bits to matrix
 *
 * @param  {BitMatrix} matrix  Modules matrix
 * @param  {Number}    version QR Code version
 */


function setupVersionInfo(matrix, version) {
  var size = matrix.size;
  var bits = Version.getEncodedBits(version);
  var row, col, mod;

  for (var i = 0; i < 18; i++) {
    row = Math.floor(i / 3);
    col = i % 3 + size - 8 - 3;
    mod = (bits >> i & 1) === 1;
    matrix.set(row, col, mod, true);
    matrix.set(col, row, mod, true);
  }
}
/**
 * Add format info bits to matrix
 *
 * @param  {BitMatrix} matrix               Modules matrix
 * @param  {ErrorCorrectionLevel}    errorCorrectionLevel Error correction level
 * @param  {Number}    maskPattern          Mask pattern reference value
 */


function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
  var size = matrix.size;
  var bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
  var i, mod;

  for (i = 0; i < 15; i++) {
    mod = (bits >> i & 1) === 1; // vertical

    if (i < 6) {
      matrix.set(i, 8, mod, true);
    } else if (i < 8) {
      matrix.set(i + 1, 8, mod, true);
    } else {
      matrix.set(size - 15 + i, 8, mod, true);
    } // horizontal


    if (i < 8) {
      matrix.set(8, size - i - 1, mod, true);
    } else if (i < 9) {
      matrix.set(8, 15 - i - 1 + 1, mod, true);
    } else {
      matrix.set(8, 15 - i - 1, mod, true);
    }
  } // fixed module


  matrix.set(size - 8, 8, 1, true);
}
/**
 * Add encoded data bits to matrix
 *
 * @param  {BitMatrix} matrix Modules matrix
 * @param  {Buffer}    data   Data codewords
 */


function setupData(matrix, data) {
  var size = matrix.size;
  var inc = -1;
  var row = size - 1;
  var bitIndex = 7;
  var byteIndex = 0;

  for (var col = size - 1; col > 0; col -= 2) {
    if (col === 6) col--;

    while (true) {
      for (var c = 0; c < 2; c++) {
        if (!matrix.isReserved(row, col - c)) {
          var dark = false;

          if (byteIndex < data.length) {
            dark = (data[byteIndex] >>> bitIndex & 1) === 1;
          }

          matrix.set(row, col - c, dark);
          bitIndex--;

          if (bitIndex === -1) {
            byteIndex++;
            bitIndex = 7;
          }
        }
      }

      row += inc;

      if (row < 0 || size <= row) {
        row -= inc;
        inc = -inc;
        break;
      }
    }
  }
}
/**
 * Create encoded codewords from data input
 *
 * @param  {Number}   version              QR Code version
 * @param  {ErrorCorrectionLevel}   errorCorrectionLevel Error correction level
 * @param  {ByteData} data                 Data input
 * @return {Buffer}                        Buffer containing encoded codewords
 */


function createData(version, errorCorrectionLevel, segments) {
  // Prepare data buffer
  var buffer = new BitBuffer();
  segments.forEach(function (data) {
    // prefix data with mode indicator (4 bits)
    buffer.put(data.mode.bit, 4); // Prefix data with character count indicator.
    // The character count indicator is a string of bits that represents the
    // number of characters that are being encoded.
    // The character count indicator must be placed after the mode indicator
    // and must be a certain number of bits long, depending on the QR version
    // and data mode
    // @see {@link Mode.getCharCountIndicator}.

    buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version)); // add binary data sequence to buffer

    data.write(buffer);
  }); // Calculate required number of bits

  var totalCodewords = Utils.getSymbolTotalCodewords(version);
  var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
  var dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8; // Add a terminator.
  // If the bit string is shorter than the total number of required bits,
  // a terminator of up to four 0s must be added to the right side of the string.
  // If the bit string is more than four bits shorter than the required number of bits,
  // add four 0s to the end.

  if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
    buffer.put(0, 4);
  } // If the bit string is fewer than four bits shorter, add only the number of 0s that
  // are needed to reach the required number of bits.
  // After adding the terminator, if the number of bits in the string is not a multiple of 8,
  // pad the string on the right with 0s to make the string's length a multiple of 8.


  while (buffer.getLengthInBits() % 8 !== 0) {
    buffer.putBit(0);
  } // Add pad bytes if the string is still shorter than the total number of required bits.
  // Extend the buffer to fill the data capacity of the symbol corresponding to
  // the Version and Error Correction Level by adding the Pad Codewords 11101100 (0xEC)
  // and 00010001 (0x11) alternately.


  var remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;

  for (var i = 0; i < remainingByte; i++) {
    buffer.put(i % 2 ? 0x11 : 0xEC, 8);
  }

  return createCodewords(buffer, version, errorCorrectionLevel);
}
/**
 * Encode input data with Reed-Solomon and return codewords with
 * relative error correction bits
 *
 * @param  {BitBuffer} bitBuffer            Data to encode
 * @param  {Number}    version              QR Code version
 * @param  {ErrorCorrectionLevel} errorCorrectionLevel Error correction level
 * @return {Buffer}                         Buffer containing encoded codewords
 */


function createCodewords(bitBuffer, version, errorCorrectionLevel) {
  // Total codewords for this QR code version (Data + Error correction)
  var totalCodewords = Utils.getSymbolTotalCodewords(version); // Total number of error correction codewords

  var ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel); // Total number of data codewords

  var dataTotalCodewords = totalCodewords - ecTotalCodewords; // Total number of blocks

  var ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel); // Calculate how many blocks each group should contain

  var blocksInGroup2 = totalCodewords % ecTotalBlocks;
  var blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
  var totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
  var dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
  var dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1; // Number of EC codewords is the same for both groups

  var ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1; // Initialize a Reed-Solomon encoder with a generator polynomial of degree ecCount

  var rs = new ReedSolomonEncoder(ecCount);
  var offset = 0;
  var dcData = new Array(ecTotalBlocks);
  var ecData = new Array(ecTotalBlocks);
  var maxDataSize = 0;
  var buffer = BufferUtil.from(bitBuffer.buffer); // Divide the buffer into the required number of blocks

  for (var b = 0; b < ecTotalBlocks; b++) {
    var dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2; // extract a block of data from buffer

    dcData[b] = buffer.slice(offset, offset + dataSize); // Calculate EC codewords for this data block

    ecData[b] = rs.encode(dcData[b]);
    offset += dataSize;
    maxDataSize = Math.max(maxDataSize, dataSize);
  } // Create final data
  // Interleave the data and error correction codewords from each block


  var data = BufferUtil.alloc(totalCodewords);
  var index = 0;
  var i, r; // Add data codewords

  for (i = 0; i < maxDataSize; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      if (i < dcData[r].length) {
        data[index++] = dcData[r][i];
      }
    }
  } // Apped EC codewords


  for (i = 0; i < ecCount; i++) {
    for (r = 0; r < ecTotalBlocks; r++) {
      data[index++] = ecData[r][i];
    }
  }

  return data;
}
/**
 * Build QR Code symbol
 *
 * @param  {String} data                 Input string
 * @param  {Number} version              QR Code version
 * @param  {ErrorCorretionLevel} errorCorrectionLevel Error level
 * @param  {MaskPattern} maskPattern     Mask pattern
 * @return {Object}                      Object containing symbol data
 */


function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
  var segments;

  if (isArray(data)) {
    segments = Segments.fromArray(data);
  } else if (typeof data === 'string') {
    var estimatedVersion = version;

    if (!estimatedVersion) {
      var rawSegments = Segments.rawSplit(data); // Estimate best version that can contain raw splitted segments

      estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
    } // Build optimized segments
    // If estimated version is undefined, try with the highest version


    segments = Segments.fromString(data, estimatedVersion || 40);
  } else {
    throw new Error('Invalid data');
  } // Get the min version that can contain data


  var bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel); // If no version is found, data cannot be stored

  if (!bestVersion) {
    throw new Error('The amount of data is too big to be stored in a QR Code');
  } // If not specified, use min version as default


  if (!version) {
    version = bestVersion; // Check if the specified version can contain the data
  } else if (version < bestVersion) {
    throw new Error('\n' + 'The chosen QR Code version cannot contain this amount of data.\n' + 'Minimum version required to store current data is: ' + bestVersion + '.\n');
  }

  var dataBits = createData(version, errorCorrectionLevel, segments); // Allocate matrix buffer

  var moduleCount = Utils.getSymbolSize(version);
  var modules = new BitMatrix(moduleCount); // Add function modules

  setupFinderPattern(modules, version);
  setupTimingPattern(modules);
  setupAlignmentPattern(modules, version); // Add temporary dummy bits for format info just to set them as reserved.
  // This is needed to prevent these bits from being masked by {@link MaskPattern.applyMask}
  // since the masking operation must be performed only on the encoding region.
  // These blocks will be replaced with correct values later in code.

  setupFormatInfo(modules, errorCorrectionLevel, 0);

  if (version >= 7) {
    setupVersionInfo(modules, version);
  } // Add data codewords


  setupData(modules, dataBits);

  if (isNaN(maskPattern)) {
    // Find best mask pattern
    maskPattern = MaskPattern.getBestMask(modules, setupFormatInfo.bind(null, modules, errorCorrectionLevel));
  } // Apply mask pattern


  MaskPattern.applyMask(maskPattern, modules); // Replace format info bits with correct values

  setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
  return {
    modules: modules,
    version: version,
    errorCorrectionLevel: errorCorrectionLevel,
    maskPattern: maskPattern,
    segments: segments
  };
}
/**
 * QR Code
 *
 * @param {String | Array} data                 Input data
 * @param {Object} options                      Optional configurations
 * @param {Number} options.version              QR Code version
 * @param {String} options.errorCorrectionLevel Error correction level
 * @param {Function} options.toSJISFunc         Helper func to convert utf8 to sjis
 */


exports.create = function create(data, options) {
  if (typeof data === 'undefined' || data === '') {
    throw new Error('No input text');
  }

  var errorCorrectionLevel = ECLevel.M;
  var version;
  var mask;

  if (typeof options !== 'undefined') {
    // Use higher error correction level as default
    errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
    version = Version.from(options.version);
    mask = MaskPattern.from(options.maskPattern);

    if (options.toSJISFunc) {
      Utils.setToSJISFunction(options.toSJISFunc);
    }
  }

  return createSymbol(data, version, errorCorrectionLevel, mask);
};
},{"../utils/buffer":"../node_modules/qrcode/lib/utils/typedarray-buffer.js","./utils":"../node_modules/qrcode/lib/core/utils.js","./error-correction-level":"../node_modules/qrcode/lib/core/error-correction-level.js","./bit-buffer":"../node_modules/qrcode/lib/core/bit-buffer.js","./bit-matrix":"../node_modules/qrcode/lib/core/bit-matrix.js","./alignment-pattern":"../node_modules/qrcode/lib/core/alignment-pattern.js","./finder-pattern":"../node_modules/qrcode/lib/core/finder-pattern.js","./mask-pattern":"../node_modules/qrcode/lib/core/mask-pattern.js","./error-correction-code":"../node_modules/qrcode/lib/core/error-correction-code.js","./reed-solomon-encoder":"../node_modules/qrcode/lib/core/reed-solomon-encoder.js","./version":"../node_modules/qrcode/lib/core/version.js","./format-info":"../node_modules/qrcode/lib/core/format-info.js","./mode":"../node_modules/qrcode/lib/core/mode.js","./segments":"../node_modules/qrcode/lib/core/segments.js","isarray":"../node_modules/qrcode/node_modules/isarray/index.js"}],"../node_modules/qrcode/lib/renderer/utils.js":[function(require,module,exports) {
function hex2rgba(hex) {
  if (typeof hex === 'number') {
    hex = hex.toString();
  }

  if (typeof hex !== 'string') {
    throw new Error('Color should be defined as hex string');
  }

  var hexCode = hex.slice().replace('#', '').split('');

  if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
    throw new Error('Invalid hex color: ' + hex);
  } // Convert from short to long form (fff -> ffffff)


  if (hexCode.length === 3 || hexCode.length === 4) {
    hexCode = Array.prototype.concat.apply([], hexCode.map(function (c) {
      return [c, c];
    }));
  } // Add default alpha value


  if (hexCode.length === 6) hexCode.push('F', 'F');
  var hexValue = parseInt(hexCode.join(''), 16);
  return {
    r: hexValue >> 24 & 255,
    g: hexValue >> 16 & 255,
    b: hexValue >> 8 & 255,
    a: hexValue & 255,
    hex: '#' + hexCode.slice(0, 6).join('')
  };
}

exports.getOptions = function getOptions(options) {
  if (!options) options = {};
  if (!options.color) options.color = {};
  var margin = typeof options.margin === 'undefined' || options.margin === null || options.margin < 0 ? 4 : options.margin;
  var width = options.width && options.width >= 21 ? options.width : undefined;
  var scale = options.scale || 4;
  return {
    width: width,
    scale: width ? 4 : scale,
    margin: margin,
    color: {
      dark: hex2rgba(options.color.dark || '#000000ff'),
      light: hex2rgba(options.color.light || '#ffffffff')
    },
    type: options.type,
    rendererOpts: options.rendererOpts || {}
  };
};

exports.getScale = function getScale(qrSize, opts) {
  return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
};

exports.getImageWidth = function getImageWidth(qrSize, opts) {
  var scale = exports.getScale(qrSize, opts);
  return Math.floor((qrSize + opts.margin * 2) * scale);
};

exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
  var size = qr.modules.size;
  var data = qr.modules.data;
  var scale = exports.getScale(size, opts);
  var symbolSize = Math.floor((size + opts.margin * 2) * scale);
  var scaledMargin = opts.margin * scale;
  var palette = [opts.color.light, opts.color.dark];

  for (var i = 0; i < symbolSize; i++) {
    for (var j = 0; j < symbolSize; j++) {
      var posDst = (i * symbolSize + j) * 4;
      var pxColor = opts.color.light;

      if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
        var iSrc = Math.floor((i - scaledMargin) / scale);
        var jSrc = Math.floor((j - scaledMargin) / scale);
        pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
      }

      imgData[posDst++] = pxColor.r;
      imgData[posDst++] = pxColor.g;
      imgData[posDst++] = pxColor.b;
      imgData[posDst] = pxColor.a;
    }
  }
};
},{}],"../node_modules/qrcode/lib/renderer/canvas.js":[function(require,module,exports) {
var Utils = require('./utils');

function clearCanvas(ctx, canvas, size) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!canvas.style) canvas.style = {};
  canvas.height = size;
  canvas.width = size;
  canvas.style.height = size + 'px';
  canvas.style.width = size + 'px';
}

function getCanvasElement() {
  try {
    return document.createElement('canvas');
  } catch (e) {
    throw new Error('You need to specify a canvas element');
  }
}

exports.render = function render(qrData, canvas, options) {
  var opts = options;
  var canvasEl = canvas;

  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas;
    canvas = undefined;
  }

  if (!canvas) {
    canvasEl = getCanvasElement();
  }

  opts = Utils.getOptions(opts);
  var size = Utils.getImageWidth(qrData.modules.size, opts);
  var ctx = canvasEl.getContext('2d');
  var image = ctx.createImageData(size, size);
  Utils.qrToImageData(image.data, qrData, opts);
  clearCanvas(ctx, canvasEl, size);
  ctx.putImageData(image, 0, 0);
  return canvasEl;
};

exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
  var opts = options;

  if (typeof opts === 'undefined' && (!canvas || !canvas.getContext)) {
    opts = canvas;
    canvas = undefined;
  }

  if (!opts) opts = {};
  var canvasEl = exports.render(qrData, canvas, opts);
  var type = opts.type || 'image/png';
  var rendererOpts = opts.rendererOpts || {};
  return canvasEl.toDataURL(type, rendererOpts.quality);
};
},{"./utils":"../node_modules/qrcode/lib/renderer/utils.js"}],"../node_modules/qrcode/lib/renderer/svg-tag.js":[function(require,module,exports) {
var Utils = require('./utils');

function getColorAttrib(color, attrib) {
  var alpha = color.a / 255;
  var str = attrib + '="' + color.hex + '"';
  return alpha < 1 ? str + ' ' + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
}

function svgCmd(cmd, x, y) {
  var str = cmd + x;
  if (typeof y !== 'undefined') str += ' ' + y;
  return str;
}

function qrToPath(data, size, margin) {
  var path = '';
  var moveBy = 0;
  var newRow = false;
  var lineLength = 0;

  for (var i = 0; i < data.length; i++) {
    var col = Math.floor(i % size);
    var row = Math.floor(i / size);
    if (!col && !newRow) newRow = true;

    if (data[i]) {
      lineLength++;

      if (!(i > 0 && col > 0 && data[i - 1])) {
        path += newRow ? svgCmd('M', col + margin, 0.5 + row + margin) : svgCmd('m', moveBy, 0);
        moveBy = 0;
        newRow = false;
      }

      if (!(col + 1 < size && data[i + 1])) {
        path += svgCmd('h', lineLength);
        lineLength = 0;
      }
    } else {
      moveBy++;
    }
  }

  return path;
}

exports.render = function render(qrData, options, cb) {
  var opts = Utils.getOptions(options);
  var size = qrData.modules.size;
  var data = qrData.modules.data;
  var qrcodesize = size + opts.margin * 2;
  var bg = !opts.color.light.a ? '' : '<path ' + getColorAttrib(opts.color.light, 'fill') + ' d="M0 0h' + qrcodesize + 'v' + qrcodesize + 'H0z"/>';
  var path = '<path ' + getColorAttrib(opts.color.dark, 'stroke') + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
  var viewBox = 'viewBox="' + '0 0 ' + qrcodesize + ' ' + qrcodesize + '"';
  var width = !opts.width ? '' : 'width="' + opts.width + '" height="' + opts.width + '" ';
  var svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + '</svg>\n';

  if (typeof cb === 'function') {
    cb(null, svgTag);
  }

  return svgTag;
};
},{"./utils":"../node_modules/qrcode/lib/renderer/utils.js"}],"../node_modules/qrcode/lib/browser.js":[function(require,module,exports) {
var canPromise = require('./can-promise');

var QRCode = require('./core/qrcode');

var CanvasRenderer = require('./renderer/canvas');

var SvgRenderer = require('./renderer/svg-tag.js');

function renderCanvas(renderFunc, canvas, text, opts, cb) {
  var args = [].slice.call(arguments, 1);
  var argsNum = args.length;
  var isLastArgCb = typeof args[argsNum - 1] === 'function';

  if (!isLastArgCb && !canPromise()) {
    throw new Error('Callback required as last argument');
  }

  if (isLastArgCb) {
    if (argsNum < 2) {
      throw new Error('Too few arguments provided');
    }

    if (argsNum === 2) {
      cb = text;
      text = canvas;
      canvas = opts = undefined;
    } else if (argsNum === 3) {
      if (canvas.getContext && typeof cb === 'undefined') {
        cb = opts;
        opts = undefined;
      } else {
        cb = opts;
        opts = text;
        text = canvas;
        canvas = undefined;
      }
    }
  } else {
    if (argsNum < 1) {
      throw new Error('Too few arguments provided');
    }

    if (argsNum === 1) {
      text = canvas;
      canvas = opts = undefined;
    } else if (argsNum === 2 && !canvas.getContext) {
      opts = text;
      text = canvas;
      canvas = undefined;
    }

    return new Promise(function (resolve, reject) {
      try {
        var data = QRCode.create(text, opts);
        resolve(renderFunc(data, canvas, opts));
      } catch (e) {
        reject(e);
      }
    });
  }

  try {
    var data = QRCode.create(text, opts);
    cb(null, renderFunc(data, canvas, opts));
  } catch (e) {
    cb(e);
  }
}

exports.create = QRCode.create;
exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL); // only svg for now.

exports.toString = renderCanvas.bind(null, function (data, _, opts) {
  return SvgRenderer.render(data, opts);
});
},{"./can-promise":"../node_modules/qrcode/lib/can-promise.js","./core/qrcode":"../node_modules/qrcode/lib/core/qrcode.js","./renderer/canvas":"../node_modules/qrcode/lib/renderer/canvas.js","./renderer/svg-tag.js":"../node_modules/qrcode/lib/renderer/svg-tag.js"}],"qrcode/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QRCodeElement = void 0;

var _tslib = require("tslib");

var _decorators = require("lit/decorators");

var _lit = require("lit");

var _qrcode = _interopRequireDefault(require("qrcode"));

var _templateObject, _templateObject2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let QRCodeElement = class QRCodeElement extends _lit.LitElement {
  constructor() {
    super(...arguments);
    this.value = '';
  }

  _setQRCode() {
    _qrcode.default.toCanvas(this.canvas, this.value, {
      width: 200
    });
  }

  updated() {
    this._setQRCode();
  }

  render() {
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<canvas></canvas>"])));
  }

};
exports.QRCodeElement = QRCodeElement;
QRCodeElement.styles = (0, _lit.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    :host{\n        display: flex;\n        justify-content: center;\n    }\n    canvas{\n        display: block;\n        width: var(--qrcode-width, 200px);\n    }"])));
(0, _tslib.__decorate)([(0, _decorators.query)('canvas')], QRCodeElement.prototype, "canvas", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], QRCodeElement.prototype, "value", void 0);
exports.QRCodeElement = QRCodeElement = (0, _tslib.__decorate)([(0, _decorators.customElement)('qrcode-element')], QRCodeElement);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit/decorators":"../node_modules/lit/decorators.js","lit":"../node_modules/lit/index.js","qrcode":"../node_modules/qrcode/lib/browser.js"}],"range/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeElement = void 0;

var _tslib = require("tslib");

var _lit = require("lit");

var _decorators = require("lit/decorators");

var _index = require("../form-associated/index");

var _noselect = require("../styles/noselect");

var _helpers = require("../helpers");

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/** <range-element></range-element> */
let RangeElement = class RangeElement extends (0, _index.formAssociated)(_lit.LitElement) {
  constructor() {
    super(...arguments);
    this._isMoving = false;
    this.offsetX = 0;
    this.percent = 0;
    this.isPercentHidden = true;
    this.disabledByVol = true;
    this.decimals = 8;
    this.showPercent = false;
    this.usePoints = true;
    this.startFromMin = false;
    this._points = [0, 25, 50, 75, 100];
    this._timeout = 0;
    this._trackSize = 0;
    this._trackStartX = 0;
    this._thumbSize = 0;
    this._padding = 0;
    this._min = 0;
    this._max = 100;
    this._value = '0'; // ==== Events ==== 

    this._handlePointerDown = e => {
      if (this.isDisabled()) return;
      this._isMoving = true;
      this.isPercentHidden = false;
    };

    this._handlePointerMove = e => {
      if (this._isMoving === true) {
        this._movePosition(e);

        this.isPercentHidden = false;
        e.preventDefault();
      }
    };

    this._handlePointerUp = e => {
      if (this._isMoving === true) {
        this._isMoving = false;

        this._hidePercent();

        this._movePosition(e);

        e.preventDefault();
      }
    };

    this._handlePointOver = e => {
      if (this.isDisabled()) return;
      clearTimeout(this._timeout);
      this.isPercentHidden = false;
      e.preventDefault();
    };

    this._handlePointLeave = e => {
      e.preventDefault();

      this._hidePercent();
    };
  }

  static get styles() {
    return [_noselect.noselect, (0, _lit.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n            :host{\n                display: inline-block;\n                min-width: 200px;\n                position: relative;\n                box-sizing: border-box;\n                --size: 8px;\n                --pointer: 8px;\n                --pointer-border: 2px;\n                --poiner-width: calc(var(--pointer) + var(--pointer-border));\n                --line-height: 4px;\n                --to-middle: calc((var(--size) - var(--pointer)) / 2);\n                --top-margin: 8px;\n                --padding: 10px;\n                padding: 5px var(--padding);\n                box-sizing: border-box;\n\n            }\n            :host(.disabled){\n                opacity: 0.5;\n            }\n            .thumb, .point, .track-line{\n                cursor: pointer;\n            }\n            .thumb-wrapper{\n                position: absolute;\n                z-index: 3;\n                top: calc(var(--top-margin) - var(--size) / 2 + var(--line-height) / 2);\n                width: var(--size, 14px);\n                height: var(--size, 14px);\n                transform-origin: center;\n                transform: translateX(-50%);\n                \n            }\n            .thumb{\n                border-radius: 100%;\n                width: 100%;\n                height: 100%;\n                background-color: var(--range-thumb, #111);\n                box-shadow: 0 0 0 var(--pointer-border) var(--range-points-border-color, #111);\n                \n            }\n            .percent{\n                opacity: 1;\n                text-align: center;\n                left: 0;\n                position: absolute;\n                text-align: center;\n                transform-origin: center;\n                font-size: 12px;\n                transform-origin: center;\n                transform: translate(calc(-50% + 4px));\n            }\n            .percent.hidden{\n                opacity: 0;\n            }\n            .track{\n                display: flex;\n                position: relative;\n                width: 100%;\n                border-radius: 3px;\n                box-sizing: border-box;\n                position: relative;\n            }\n            .track-line{\n                width: calc(100% );\n                background-color: var(--range-track, #999);\n                height: var(--line-height);\n                margin: var(--top-margin) auto;\n                border-radius: 2px\n            }\n            .blocked-track{\n                position: absolute;\n                left: 5px;\n                background-color: var(--range-track-blocked, #999);\n                height: var(--lineHeigh);\n                top: var(--top-margin);\n                border-radius: 2px\n            }\n            .point{\n                position: absolute;\n                top: calc(var(--top-margin) - var(--pointer) / 2 + var(--line-height) / 2);\n                width: var(--pointer);\n                height: var(--pointer);\n                border-radius: var(--pointer);\n                background-color: var(--range-points-background, #fff);\n                box-shadow: 0 0 0 var(--pointer-border) var(--range-points-border-color, #444);\n                transform: translate(-50%, 0);\n                z-index: 1;\n            }\n            "])))];
  }

  static get properties() {
    return _objectSpread(_objectSpread({}, super.properties), {}, {
      value: {
        type: String,
        hasChanged: () => true
      },
      min: {
        type: Number
      },
      max: {
        type: Number
      }
    });
  }

  get min() {
    return this._min;
  }

  set min(value) {
    const oldValue = this._min;

    if (value < 0) {
      console.warn("Min value must be => 0, replaced to 0.");
      value = 0;
    }

    this._min = value;
    this.percent = this._calcPercentByValue();
    this.requestUpdate('max', oldValue);
  }

  get max() {
    return this._max;
  }

  set max(value) {
    const oldValue = this._max;
    this._max = value;
    this.percent = this._calcPercentByValue();
    this.requestUpdate('max', oldValue);
  }

  get valueAsNumber() {
    return Number(this._value);
  }

  set valueAsNumber(value) {
    if (typeof value === 'number') {
      this.value = value.toFixed(this.decimals);
    }
  }

  get value() {
    return this._value;
  }

  set value(value) {
    const oldValue = this._value;
    this._value = value;
    this.percent = this._calcPercentByValue();
    this.requestUpdate('value', oldValue);
  }

  isDisabled() {
    return this.disabled || this.max < this.min;
  }

  willUpdate() {
    const rect = this.getBoundingClientRect();
    this._trackSize = this._calcTackWidth(rect);
    this._trackStartX = this._calcTrackStartX(rect);
    this._value = this._calcValueByPercent(this.percent).toFixed(this.decimals);

    this._updateOffset();
  }

  updated(props) {
    super.updated(props);
    this.dispatchEvent(new CustomEvent("changed", {
      detail: {
        value: this.value,
        percent: this.percent,
        valueAsNumber: this.valueAsNumber,
        type: 'range'
      },
      bubbles: true
    }));
  }

  get minPercent() {
    if (!this.startFromMin) {
      return 0;
    } //return this.valueAsNumber / (this.max - this.min) * 100 


    return this.min / this.max * 100;
  } // ==== Actions ==== 


  _calcTrackStartX(rect) {
    return rect.x + this._padding;
  }

  _calcTackWidth(rect) {
    return rect.width - this._padding * 2;
  }

  _calcOffset(e) {
    const xPosition = (0, _helpers.getClientX)(e);
    return xPosition - this._trackStartX; //  - this._trackStartX - this._thumbSize / 2;
  }

  _calcPercentByOffset(offset) {
    let percent = Math.round(offset / this._trackSize * 100 * 10) / 10;

    if (percent > 100) {
      percent = 100;
    }

    if (this.usePoints) {
      if (percent < 3 || !percent) {
        percent = 0;
      } else if (percent > 22 && percent < 28) {
        percent = 25;
      } else if (percent > 47 && percent < 53) {
        percent = 50;
      } else if (percent > 72 && percent < 78) {
        percent = 75;
      } else if (percent > 97) {
        percent = 100;
      }
    }

    if (percent < this.minPercent) {
      return this.minPercent;
    }

    return percent;
  }

  _calcPercentByValue() {
    let value = 0;

    if (this.startFromMin) {
      value = Math.round((this.valueAsNumber - this.min) / (this.max - this.min) * 100 * 10) / 10;
    } else {
      value = Math.round(this.valueAsNumber / this.max * 100 * 10) / 10;
    }

    if (value < this.min) {
      return 0;
    }

    if (value > this.max) {
      return 100;
    }

    return value;
  }

  _calcValueByPercent(percent) {
    let value = 0;

    if (this.startFromMin) {
      value = this.min + (this.max - this.min) * (percent / 100);
    } else {
      value = this.max * (percent / 100);
    }

    if (value < this.min) {
      return this.min;
    }

    if (value > this.max) {
      return this.max;
    }

    return value;
    ;
  }

  _updateOffset() {
    const rect = this.getBoundingClientRect();
    const width = rect.width - this._padding * 2; //  this._thumbSize / 2

    const offsetX = Math.round(width * this.percent / 100 * 1e2) / 1e2;

    if (offsetX !== this.offsetX) {
      this.offsetX = offsetX;
    }
  }

  _hidePercent() {
    clearTimeout(this._timeout);
    this._timeout = window.setTimeout(() => {
      this.isPercentHidden = true;
    }, 800);
  }

  _movePosition(e) {
    requestAnimationFrame(() => {
      const offset = this._calcOffset(e);

      this.percent = this._calcPercentByOffset(offset);
    });
    e.preventDefault();
  }

  setPercent(value) {
    this.percent = value;
  } // ==== templates ==== 


  _pointersTemplate() {
    if (this.usePoints) {
      return this._points.map(it => (0, _lit.html)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["<div                         \n                        data-value = \"", "\"\n                        style = \"left: ", "%;\"\n                        class = \"point point-", "\"></div>"])), it, it, it));
    }

    return _lit.nothing;
  }

  _percentTemplate() {
    if (!this.showPercent) return _lit.nothing;
    const left = this.offsetX + this._padding - this._thumbSize * this.percent / 100;
    return (0, _lit.html)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["<div style = \"left: ", "px;\"\n                        class = \"noselect percent ", "\">", "%</div> "])), left, this.isPercentHidden ? 'hidden' : '', this.percent);
  }

  _blockedVolume() {
    if (!this.startFromMin) return _lit.nothing;
    const width = this.minPercent * (this._trackSize - this._padding) / 100;
    return (0, _lit.html)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["<div class = \"blocked-track\" style = \"width: ", "px;\"></div>"])), width);
  }

  _thumbTemplate() {
    const offset = this.offsetX.toFixed(1);
    return (0, _lit.html)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["<div class = \"thumb-wrapper\" \n            style = \"left: ", "px\">\n            ", "       \n        </div>"])), offset, this.isDisabled() ? _lit.nothing : (0, _lit.html)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["<slot><div class = \"thumb\"></div></slot>"]))));
  }

  render() {
    return (0, _lit.html)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n        <div class = \"track ", "\"\n            @mousedown = \"", "\"\n            @mouserover = \"", "\"\n            @mouseleave = \"", "\"\n            @touchstart = \"", "\">\n            ", "\n            <div class = \"track-line\"></div>\n            ", "\n            ", "\n        </div>\n        ", "\n        "])), this.isDisabled() ? 'disabled' : '', this._handlePointerDown, this._handlePointOver, this._handlePointLeave, this._handlePointerDown, this._thumbTemplate(), this._pointersTemplate(), this._blockedVolume(), this._percentTemplate());
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener("touchmove", this._handlePointerMove, {
      passive: false
    });
    document.addEventListener("touchend", this._handlePointerUp);
    document.addEventListener("mousemove", this._handlePointerMove, {
      passive: false
    });
    document.addEventListener("mouseup", this._handlePointerUp);
    const rect = this.getBoundingClientRect();
    this._trackSize = this._calcTackWidth(rect);
    this._trackStartX = this._calcTrackStartX(rect);
    this._thumbSize = parseInt(window.getComputedStyle(this).getPropertyValue("--pointer"));
    this._padding = parseInt(window.getComputedStyle(this).getPropertyValue("--padding"));
  }

  disconnectedCallback() {
    document.removeEventListener("touchmove", this._handlePointerMove);
    document.removeEventListener("touchend", this._handlePointerUp);
    document.removeEventListener("mousemove", this._handlePointerMove);
    document.removeEventListener("mouseup", this._handlePointerUp);
    super.disconnectedCallback();
  }

};
exports.RangeElement = RangeElement;
(0, _tslib.__decorate)([(0, _decorators.state)()], RangeElement.prototype, "offsetX", void 0);
(0, _tslib.__decorate)([(0, _decorators.state)()], RangeElement.prototype, "percent", void 0);
(0, _tslib.__decorate)([(0, _decorators.state)()], RangeElement.prototype, "isPercentHidden", void 0);
(0, _tslib.__decorate)([(0, _decorators.state)()], RangeElement.prototype, "disabledByVol", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], RangeElement.prototype, "decimals", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], RangeElement.prototype, "showPercent", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], RangeElement.prototype, "usePoints", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], RangeElement.prototype, "startFromMin", void 0);
(0, _tslib.__decorate)([(0, _decorators.query)('.track')], RangeElement.prototype, "_wrapper", void 0);
exports.RangeElement = RangeElement = (0, _tslib.__decorate)([(0, _decorators.customElement)("range-element")], RangeElement);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit":"../node_modules/lit/index.js","lit/decorators":"../node_modules/lit/decorators.js","../form-associated/index":"form-associated/index.ts","../styles/noselect":"styles/noselect.ts","../helpers":"helpers.ts"}],"../node_modules/lit-html/directives/style-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styleMap = void 0;

var _litHtml = require("../lit-html.js");

var _directive = require("../directive.js");

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i = (0, _directive.directive)(class extends _directive.Directive {
  constructor(t) {
    var e;
    if (super(t), t.type !== _directive.PartType.ATTRIBUTE || "style" !== t.name || (null === (e = t.strings) || void 0 === e ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }

  render(t) {
    return Object.keys(t).reduce((e, r) => {
      const s = t[r];
      return null == s ? e : e + `${r = r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }, "");
  }

  update(e, [r]) {
    const {
      style: s
    } = e.element;

    if (void 0 === this.ut) {
      this.ut = new Set();

      for (const t in r) this.ut.add(t);

      return this.render(r);
    }

    this.ut.forEach(t => {
      null == r[t] && (this.ut.delete(t), t.includes("-") ? s.removeProperty(t) : s[t] = "");
    });

    for (const t in r) {
      const e = r[t];
      null != e && (this.ut.add(t), t.includes("-") ? s.setProperty(t, e) : s[t] = e);
    }

    return _litHtml.noChange;
  }

});
exports.styleMap = i;
},{"../lit-html.js":"../node_modules/lit-html/lit-html.js","../directive.js":"../node_modules/lit-html/directive.js"}],"../node_modules/lit/directives/style-map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _styleMap = require("lit-html/directives/style-map.js");

Object.keys(_styleMap).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _styleMap[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _styleMap[key];
    }
  });
});
},{"lit-html/directives/style-map.js":"../node_modules/lit-html/directives/style-map.js"}],"controllers/ClickController.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClickController = void 0;

class ClickController {
  constructor(host) {
    this.handleClick = e => {
      this.host.handleDocumentClick(e);
    };

    (this.host = host).addController(this);
  }

  hostConnected() {
    document.addEventListener("click", this.handleClick);
  }

  hostDisconnected() {
    document.removeEventListener("click", this.handleClick);
  }

}

exports.ClickController = ClickController;
},{}],"helpers/position.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calcPositionForPopup = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const yMiddle = (bound, tooltip) => bound.top + bound.height / 2 - tooltip.clientHeight / 2 + window.scrollY;

const yTop = (bound, tooltip, element) => bound.top - tooltip.clientHeight + window.scrollY;

const yBottom = (bound, tooltip, element) => bound.top + bound.height + window.scrollY;

const ySmartPosType = (bound, tooltip, element) => {
  const expectedBottom = window.innerHeight - bound.bottom - tooltip.clientHeight;
  return expectedBottom > 0 ? "bottom" : 'top';
};

const xMiddle = (bound, tooltip) => bound.left + bound.width / 2 - tooltip.clientWidth / 2;

const xRight = (bound, tooltip, element) => bound.left + bound.width;

const xLeft = (bound, tooltip, element) => bound.left - tooltip.clientWidth;

const xSmartPos = (bound, tooltip, element) => {
  const expectedRight = bound.right + tooltip.clientWidth;

  if (expectedRight < window.innerWidth) {
    return xRight(bound, tooltip, element);
  }

  return window.innerWidth - tooltip.clientWidth - 20;
};

function getBoundingClientRect(el) {
  var rect = el.getBoundingClientRect();
  return {
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    x: rect.x,
    y: rect.y
  };
}

const getY = function getY(bound, neededHeight) {
  let align = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'smart';
  let y = 0;

  if (bound.top - neededHeight < 0) {
    y = bound.bottom + window.scrollY;
  } else {
    y = bound.top - neededHeight + window.scrollY;
  }

  return y;
};

const getX = function getX(bound, nedeedWidth) {
  let align = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'smart';
  let x = 0;

  if (bound.left - nedeedWidth < 0) {
    x = bound.left + window.scrollX;
    ;
  } else {
    x = bound.left - nedeedWidth + window.scrollX;
  }

  return x;
};

const calcPositionForPopup = (el, data) => {
  const offsetTop = el.offsetTop;
  const offsetLeft = el.offsetLeft;

  const bound = _objectSpread(_objectSpread({}, getBoundingClientRect(el)), {}, {
    offsetTop,
    offsetLeft
  });

  const y = getY(bound, data.height, data.alignY);
  const x = getX(bound, data.width, data.alignX);
  return {
    x,
    y
  };
};

exports.calcPositionForPopup = calcPositionForPopup;
},{}],"select/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectElement = void 0;

var _tslib = require("tslib");

var _classMap = require("lit/directives/class-map");

var _styleMap = require("lit/directives/style-map");

var _lit = require("lit");

var _index = require("../form-associated/index");

var _decorators = require("lit/decorators");

var _input = require("../styles/input");

var _helpers = require("../helpers");

var _ClickController = require("../controllers/ClickController");

var _KeyController = require("../controllers/KeyController");

var _position = require("../helpers/position");

var _scrollbar = require("../styles/scrollbar");

var _templateObject, _templateObject2, _templateObject3, _templateObject4;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let SelectElement = class SelectElement extends (0, _index.formAssociated)(_lit.LitElement) {
  constructor() {
    super(...arguments);
    this.items = [];
    this.value = '';
    this.optionsWidth = 0;
    this.optionsHeight = 0;
    this.open = false;
    this._clickController = new _ClickController.ClickController(this);
    this._keyPressController = new _KeyController.KeyDownController(this);
    this._isFocus = false;
    this._focusTime = 0;
    this._focusedOption = '';
    this._optionsPosition = {
      x: 0,
      y: 0
    };
  }

  selected() {
    return this.items.filter(it => this.value === it.value)[0];
  }

  currentOption() {
    return this.items.findIndex(it => it.value === this.value);
  }

  firstUpdated() {
    if (!this.optionsWidth) {
      this.optionsWidth = this.clientWidth;
    }
  }

  willUpdate() {
    if (this.open) {
      this._optionsPosition = (0, _position.calcPositionForPopup)(this, {
        width: this.optionsWidth,
        height: this.optionsHeight || 40
      });
    }
  }

  _contentTemplate() {
    if (!this.open) return _lit.nothing;
    const optionsClass = {
      options: true,
      "ff-scrollbar": true,
      open: this.open
    };
    const optionStyles = {
      width: this.optionsWidth + "px",
      height: this.optionsHeight ? this.optionsHeight + "px" : "initial",
      //transform: `translate(0, 100%);`
      left: this._optionsPosition.x + "px",
      top: this._optionsPosition.y + "px"
    };
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<div\n            style = \"", "\"\n            class = \"", "\">", "</div>"])), (0, _styleMap.styleMap)(optionStyles), (0, _classMap.classMap)(optionsClass), this.items.map((it, i) => {
      const className = {
        selected: this.value === it.value,
        option: true,
        ['value-' + it.value]: true
      };
      return (0, _lit.html)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["<div \n                tabindex = \"0\"\n                data-index = \"", "\"\n                data-value = \"", "\"\n                @click = \"", "\" \n                @focus = \"", "\" \n                class = \"", "\">", "</div>"])), i, it.value, this._handleSelectClick, this._handleOptionFocus, (0, _classMap.classMap)(className), it.text);
    }));
  }

  focus() {
    var _a, _b;

    (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(".content")) === null || _b === void 0 ? void 0 : _b.focus();
  }

  render() {
    var _a;

    return (0, _lit.html)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        <div \n            @click = \"", "\"\n            tabindex = \"0\"\n            class = \"content\">\n            <div>", "</div>\n            <slot name = \"icon\">\n                <div class = \"icon-dropdown\"><icon-element \n                    class = \"", "\" \n                    icon = \"dropdown\"></icon-element></div>\n            </slot>\n        </div>\n        ", ""])), this.handleClick, ((_a = this.selected()) === null || _a === void 0 ? void 0 : _a.text) || '-', this.open ? 'dropup' : '', this._contentTemplate());
  }

  updated(p) {
    var _a, _b;

    super.updated(p);

    if (this.open) {
      (_b = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(".value-" + this.value)) === null || _b === void 0 ? void 0 : _b.focus();
    }
  }

  setValue(value) {
    this.value = value;
    this.focus();
  }

  nextSelect() {
    let current = this.currentOption();
    current++;

    if (current > this.items.length - 1) {
      current = 0;
    }

    this.setValue(this.items[current].value);
  }

  prevSelect() {
    let current = this.currentOption();
    current--;

    if (current < 0) {
      current = this.items.length - 1;
    }

    this.setValue(this.items[current].value);
  }

  _handleOptionFocus(e) {
    this._focusedOption = e.target.dataset.value;
  }

  _handleSelectClick(e) {
    this.setValue((0, _helpers.getEventDataset)(e, 'value'));
    this.open = false;
    e.stopPropagation();
  }

  handlekeyDown(e) {
    if (e.key === "ArrowDown") {
      this.nextSelect();
    }

    if (e.key === "ArrowUp") {
      this.prevSelect();
    }

    if (e.key === "Enter") {
      if (this.open) {
        this.setValue(this._focusedOption);
        this.open = false;
      } else {
        this.open = true;
      }
    }
  }

  handleDocumentClick(e) {
    const isChild = (0, _helpers.isChildOfElement)(e.target, this);

    if (!isChild) {
      this.open = false;
    }
  }

  handleClick() {
    this.open = !this.open;
  }

};
exports.SelectElement = SelectElement;
SelectElement.styles = [_input.input, _scrollbar.scrollbar, (0, _lit.css)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n        :host{\n            display: inline-block;\n            min-width: 80px;\n        }\n        .content{\n            display: grid;\n            background-color: var(--select-background);\n            border: 1px solid var(--select-border, #ccc);\n            grid-template-columns: auto auto;\n            padding: var(--select-padding, 5px 10px);\n            cursor: pointer;\n        }\n        .content:focus{\n            outline: 1px solid var(--select-outline-focus, #ccc);\n        }\n        .options.open{\n            display: block;\n        }\n        .options{\n            position: absolute;\n            display: none;\n            border: 1px solid var(--select-border, #ccc);\n            box-sizing: border-box;\n            overflow-y: auto;\n        }\n        .option{\n            cursor: pointer;\n            padding: var(--option-padding, 5px 10px);\n        }\n        .option:focus, \n        .option:hover{\n            background-color: var(--option-hover, #ccc);\n        }\n        .disabled{\n            opacity: 0.5;\n        }\n        .icon-dropdown{\n            display: flex;\n            align-items: center;\n            justify-content: end;\n        }"])))];
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Array
})], SelectElement.prototype, "items", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], SelectElement.prototype, "value", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], SelectElement.prototype, "optionsWidth", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], SelectElement.prototype, "optionsHeight", void 0);
(0, _tslib.__decorate)([(0, _decorators.state)()], SelectElement.prototype, "open", void 0);
exports.SelectElement = SelectElement = (0, _tslib.__decorate)([(0, _decorators.customElement)("select-element")], SelectElement);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit/directives/class-map":"../node_modules/lit/directives/class-map.js","lit/directives/style-map":"../node_modules/lit/directives/style-map.js","lit":"../node_modules/lit/index.js","../form-associated/index":"form-associated/index.ts","lit/decorators":"../node_modules/lit/decorators.js","../styles/input":"styles/input.ts","../helpers":"helpers.ts","../controllers/ClickController":"controllers/ClickController.ts","../controllers/KeyController":"controllers/KeyController.ts","../helpers/position":"helpers/position.ts","../styles/scrollbar":"styles/scrollbar.ts"}],"spinner/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpinnerElement = void 0;

var _tslib = require("tslib");

var _lit = require("lit");

var _decorators = require("lit/decorators");

var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let SpinnerElement = class SpinnerElement extends _lit.LitElement {
  constructor() {
    super(...arguments);
    this.big = false;
    this.small = false;
    this.fullContent = false;
    this.fullscreen = false;
  }

  render() {
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n            <div class = \"pulsor\">\n                <div class=\"bounce bounce1\"></div>\n                <div class=\"bounce bounce2\"></div>\n            </div>\n        "])));
  }

};
exports.SpinnerElement = SpinnerElement;
SpinnerElement.styles = (0, _lit.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        :host([fullscreen]){\n            position: absolute;\n            top: 0;\n            left: 0;\n            z-index: 1000;\n            display: flex;\n            height: 100vh;\n            width: 100%;\n            align-items: center;\n            justify-content: center;\n            background-color: var(--spinner-background);\n        }\n        :host([fullContent]){    \n            position: absolute;\n            top: 0;\n            left: 0;\n            z-index: 10;\n            display: flex;\n            height: 100%;\n            width: 100%;\n            align-items: center;\n            justify-content: center;\n            position: relative;\n            background-color: var(--spinner-background);\n            \n        }\n        :host(.container){\n            display: flex;\n            height: 100%;\n            width: 100%;\n            align-items: center;\n            justify-content: center;\n            position: relative;\n        }\n        .pulsor{\n            width: 30px;\n            height: 30px;\n            position: relative;\n        }\n        :host([small]) .pulsor{\n            position: absolute;\n            left: calc(50% - 7.5px);\n            top: calc(50% - 7.5px);\n            width: 15px;\n            height: 15px;\n        }\n        :host([big]) .pulsor{\n            width: 50px;\n            height: 50px;\n        }\n        .bounce {\n            background-color: var(--spinner-color, rgba(0,0,0,0.5));\n            width: 100%;\n            height: 100%;\n            border-radius: 50%;\n            opacity: 0.6;\n            position: absolute;\n            top: 0;\n            left: 0;\n            -webkit-animation: sk-bounce 1.5s infinite ease-in-out;\n            animation: sk-bounce 1.5s infinite ease-in-out;\n        }\n        .bounce2 {\n            -webkit-animation-delay: -1.0s;\n            animation-delay: -1.0s;\n        }\n        @-webkit-keyframes sk-bounce {\n            0%, 100% {\n                -webkit-transform: scale(0.0)\n            }\n            50% {\n                -webkit-transform: scale(1.0)\n            }\n        }\n        @keyframes sk-bounce {\n            0%, 100% {\n                transform: scale(0.0);\n                -webkit-transform: scale(0.0);\n            }\n            50% {\n                transform: scale(1.0);\n                -webkit-transform: scale(1.0);\n            }\n        }\n    "])));
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean,
  attribute: true,
  reflect: true
})], SpinnerElement.prototype, "big", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean,
  attribute: true,
  reflect: true
})], SpinnerElement.prototype, "small", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean,
  attribute: true,
  reflect: true
})], SpinnerElement.prototype, "fullContent", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean,
  attribute: true,
  reflect: true
})], SpinnerElement.prototype, "fullscreen", void 0);
exports.SpinnerElement = SpinnerElement = (0, _tslib.__decorate)([(0, _decorators.customElement)('spinner-element')], SpinnerElement);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit":"../node_modules/lit/index.js","lit/decorators":"../node_modules/lit/decorators.js"}],"tabs/tabs-element.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabsElement = void 0;

var _tslib = require("tslib");

var _classMap = require("lit/directives/class-map");

var _lit = require("lit");

var _index = require("../form-associated/index");

var _decorators = require("lit/decorators");

var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let TabsElement = class TabsElement extends (0, _index.formAssociated)(_lit.LitElement) {
  constructor() {
    super(...arguments);
    this.items = [];
    this.type = 'button';
    this.selected = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('changed', this._handleSelect);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('changed', this._handleSelect);
  }

  _handleSelect(e) {
    this.selected = e.detail;
  }

  _updateTabs() {
    this.querySelectorAll("tab-item").forEach(it => {
      it.type = this.type;
      it.value === this.selected ? it.select() : it.unselect();
    });
  }

  updated() {
    if (this.disabled) return;

    this._updateTabs();
  }

  render() {
    const map = {
      content: true,
      type: this.type,
      disabled: this.disabled,
      ["type-" + this.type]: true
    };
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<div class = \"", "\"><slot></slot></div>"])), (0, _classMap.classMap)(map));
  }

};
exports.TabsElement = TabsElement;
TabsElement.styles = (0, _lit.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    :host{\n        \n        display: inline-block;        \n    }\n    .content{\n        display: flex;\n    }\n    /*.type-button .tab{\n        border: 1px solid var(--tab-border, tomato);\n        padding: var(--tab-button-padding, 5px 14px);\n    }\n    .type-tab .tab{\n        padding: var(--tab-padding, 5px 14px);\n        border: 1px solid transparent;\n        border-bottom: 1px solid var(--tab-border, tomato);\n        \n    }\n    .type-tab .tab.selected{\n        border-top: 1px solid var(--tab-border, tomato);\n        border-left: 1px solid var(--tab-border, tomato);\n        border-right: 1px solid var(--tab-border, tomato);\n        border-bottom: 1px solid transparent;\n    }\n    .tab{\n        background-color: var(--tab-background);\n        color: var(--tab-color);\n        cursor: pointer;\n    }*/\n    .tab.selected, \n    :not(.disabled) .tab:not(:focus):hover, \n    :not(.disabled) :focus{\n        background-color: tomato;\n    }\n    :host([disabled]){\n        opacity: 0.5;\n       \n    }"])));
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Array
})], TabsElement.prototype, "items", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String,
  reflect: true
})], TabsElement.prototype, "type", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], TabsElement.prototype, "selected", void 0);
exports.TabsElement = TabsElement = (0, _tslib.__decorate)([(0, _decorators.customElement)("tabs-element")], TabsElement);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit/directives/class-map":"../node_modules/lit/directives/class-map.js","lit":"../node_modules/lit/index.js","../form-associated/index":"form-associated/index.ts","lit/decorators":"../node_modules/lit/decorators.js"}],"text/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextStatusedElement = void 0;

var _tslib = require("tslib");

var _decorators = require("lit/decorators");

var _lit = require("lit");

var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let TextStatusedElement = class TextStatusedElement extends _lit.LitElement {
  constructor() {
    super(...arguments);
    this.center = false;
    this.pulse = false;
    this.status = 'none';
  }

  render() {
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<slot></slot>"])));
  }

};
exports.TextStatusedElement = TextStatusedElement;
TextStatusedElement.styles = [(0, _lit.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        :host{\n            display: block;\n        }\n        :host([status=\"error\"]),\n        :host([status=\"danger\"]){\n            color: var(--error-color, red);\n        }\n        :host([status=\"attention\"]){\n            color: var(--attention-color, #c4c10d);\n        }\n        :host([status=\"success\"]){\n            color: var(--success-color, #24d40d);\n        }\n        :host([status=\"accented\"]){\n            color: var(--accented-color, #24d40d);\n        }\n        :host([center]){\n            text-align: center;\n        }\n        :host([pulse]){\n            animation: pulse 1.8s ease infinite;\n        }\n        @keyframes pulse {\n            0% {\n                opacity: 1\n            }\n            50%{\n                opacity: 0.5\n            }\n            100%{\n                opacity: 1\n            }\n        }"])))];
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean,
  attribute: true,
  reflect: true
})], TextStatusedElement.prototype, "center", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean,
  attribute: true,
  reflect: true
})], TextStatusedElement.prototype, "pulse", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String,
  attribute: true,
  reflect: true
})], TextStatusedElement.prototype, "status", void 0);
exports.TextStatusedElement = TextStatusedElement = (0, _tslib.__decorate)([(0, _decorators.customElement)('text-element')], TextStatusedElement);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit/decorators":"../node_modules/lit/decorators.js","lit":"../node_modules/lit/index.js"}],"text-field/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextField = void 0;

var _tslib = require("tslib");

var _lit = require("lit");

var _decorators = require("lit/decorators");

var _index = require("../form-associated/index");

require("../icon");

var _input = require("../styles/input");

var _ref = require("lit/directives/ref.js");

var _templateObject, _templateObject2, _templateObject3;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let TextField = class TextField extends (0, _index.formAssociated)(_lit.LitElement) {
  constructor() {
    super(...arguments);
    this.size = 0;
    this.minlength = NaN;
    this.maxlength = NaN;
    this.spellcheck = false;
    this.autofocus = false;
    this.pattern = '';
    this.placeholder = '';
    this.inputmode = 'text';
    this.type = 'text';
    this.useCancelButton = false;
    this.icon = '';
    this.inputRef = (0, _ref.createRef)();
    this._value = '';
  }

  static get styles() {
    return _input.input;
  }

  static get properties() {
    return _objectSpread(_objectSpread({}, super.properties), {}, {
      value: {
        type: String
      }
    });
  }

  get value() {
    return this._value;
  }

  set value(value) {
    const oldValue = this._value;
    this._value = value;
    ;
    this.requestUpdate('value', oldValue);
  }

  connectedCallback() {
    var _a;

    super.connectedCallback();
    (_a = this.findLabel()) === null || _a === void 0 ? void 0 : _a.appendConnectedField(this);
  }

  disconnectedCallback() {
    var _a;

    super.disconnectedCallback();
    (_a = this.findLabel()) === null || _a === void 0 ? void 0 : _a.removeConnectedField(this);
  }

  validate() {
    super.validate();

    if (!isNaN(this.minlength)) {
      if (this.value.length < this.minlength) {
        this.setValidity({
          tooShort: true
        });
      } else if (this.validity.tooShort) {
        this.setValidity({
          tooShort: false
        });
      }
    }

    if (!isNaN(this.maxlength)) {
      if (this.value.length > this.maxlength) {
        this.setValidity({
          tooLong: true
        });
      } else if (this.validity.tooLong) {
        this.setValidity({
          tooLong: false
        });
      }
    }

    if (this.pattern) {
      const patten = new RegExp(this.pattern);

      if (!patten.test(this.value)) {
        this.setValidity({
          patternMismatch: true
        });
      } else if (this.validity.patternMismatch) {
        this.setValidity({
          patternMismatch: false
        });
      }
    }
  }

  _iconTemplate() {
    if (!this.icon) return _lit.nothing;
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<div class = \"icon\">", "</div>"])), this.icon);
  }

  _cancelIconTemplate() {
    if (!this.useCancelButton || !this.value) return _lit.nothing;
    return (0, _lit.html)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["<icon-element \n                        @click = \"", "\"\n                        icon = \"cancel\" \n                        class = \"danger icon\"></icon-element>"])), this.clearValue);
  }

  render() {
    return (0, _lit.html)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        ", "\n        <div class = \"wrapper\" >\n            <input type = \"", "\" \n                   placeholder = \"", "\"\n                   spellcheck = \"", "\"\n                   inputmode = \"", "\"\n                   ?autofocus = \"", "\"\n                   ?readonly = \"", "\"\n                   ?disabled = \"", "\"\n                   size = \"", "\"\n                   @input = \"", "\" \n                   @change = \"", "\"\n                   ", "\n                   .value = \"", "\">\n            ", "\n            ", "\n        </div>"])), super.render(), this.type, this.placeholder, this.spellcheck, this.inputmode, this.autofocus, this.readonly, this.disabled, this.size, this._onInput, this._onChange, (0, _ref.ref)(this.inputRef), this.value, this._cancelIconTemplate(), this._iconTemplate());
  }

  updated(_changedProperties) {
    super.updated(_changedProperties);
    this.validate();
  }

  firstUpdated(props) {
    super.firstUpdated(props);

    if (this.autofocus) {
      setTimeout(() => this.focus());
    }
  }

  focus() {
    var _a, _b;

    (_a = this.inputRef.value) === null || _a === void 0 ? void 0 : _a.focus();
    (_b = this.inputRef.value) === null || _b === void 0 ? void 0 : _b.setSelectionRange(this.value.length, this.value.length);
  }

  clearValue() {
    this.value = '';
  } // 


  _onChange(e) {
    this.reportValidity();
  }

  _onInput(e) {
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent("changed", {
      detail: this.value,
      bubbles: true
    }));
  }

};
exports.TextField = TextField;
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], TextField.prototype, "size", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], TextField.prototype, "minlength", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Number
})], TextField.prototype, "maxlength", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], TextField.prototype, "spellcheck", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], TextField.prototype, "autofocus", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], TextField.prototype, "pattern", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], TextField.prototype, "placeholder", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], TextField.prototype, "inputmode", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], TextField.prototype, "type", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], TextField.prototype, "useCancelButton", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)()], TextField.prototype, "icon", void 0);
exports.TextField = TextField = (0, _tslib.__decorate)([(0, _decorators.customElement)("text-field")], TextField);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit":"../node_modules/lit/index.js","lit/decorators":"../node_modules/lit/decorators.js","../form-associated/index":"form-associated/index.ts","../icon":"icon/index.ts","../styles/input":"styles/input.ts","lit/directives/ref.js":"../node_modules/lit/directives/ref.js"}],"textarea/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextareaField = void 0;

var _tslib = require("tslib");

var _styleMap = require("lit/directives/style-map");

var _lit = require("lit");

var _decorators = require("lit/decorators");

var _input = require("../styles/input");

var _index = require("../form-associated/index");

var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let TextareaField = class TextareaField extends (0, _index.formAssociated)(_lit.LitElement) {
  constructor() {
    super(...arguments);
    this.placeholder = '';
    this.resize = 'none';
    this._value = '';
  }

  static get properties() {
    return {
      value: {
        type: String
      }
    };
  }

  get value() {
    return this._value;
  }

  set value(data) {
    const oldValue = this._value;
    this._value = data;
    this.requestUpdate('value', oldValue);
  }

  render() {
    const style = {
      resize: this.resize
    };
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<textarea \n                        style = \"", "\"\n                        placeholder=\"", "\" \n                        @input = \"", "\">", "</textarea>"])), (0, _styleMap.styleMap)(style), this.placeholder, this._onInput, this.value);
  }

  _onInput(e) {
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent('changed', {
      detail: this.value,
      bubbles: true
    }));
  }

};
exports.TextareaField = TextareaField;
TextareaField.styles = [_input.input, (0, _lit.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    :root{  \n        display: inline-block;\n    }\n    textarea{\n        width: 100%;\n        display: inline-block;\n        height: var(--textarea-height, 40px);\n        resize: var(--textarea-resize, none);\n    }\n    "])))];
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], TextareaField.prototype, "placeholder", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], TextareaField.prototype, "resize", void 0);
exports.TextareaField = TextareaField = (0, _tslib.__decorate)([(0, _decorators.customElement)('textarea-field')], TextareaField);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit/directives/style-map":"../node_modules/lit/directives/style-map.js","lit":"../node_modules/lit/index.js","lit/decorators":"../node_modules/lit/decorators.js","../styles/input":"styles/input.ts","../form-associated/index":"form-associated/index.ts"}],"treeview/tree-view.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Treeview = void 0;

var _tslib = require("tslib");

var _lit = require("lit");

var _decorators = require("lit/decorators");

require("../icon");

var _templateObject, _templateObject2;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let Treeview = class Treeview extends _lit.LitElement {
  constructor() {
    super(...arguments);
    this._items = new Map();
    this.selected = '';
  }

  setValue(value) {
    this.selected = value;

    for (const [v, it] of this._items) {
      if (it.container) {
        it.selectContainer(value);
        continue;
      }

      if (v === value) {
        it.select();
      } else {
        it.unselect();
      }
    }
  }

  connectTreeItem(item) {
    this._items.set(item.value, item);
  }

  disconnectTreeItem(item) {
    this._items.delete(item.value);
  }

  render() {
    return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<slot></slot>"])));
  }

  firstUpdated() {
    this.setValue(this.selected);
  }

};
exports.Treeview = Treeview;
Treeview.styles = (0, _lit.css)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    :host{\n        display: inline-block;\n    }\n    "])));
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String,
  reflect: true
})], Treeview.prototype, "selected", void 0);
exports.Treeview = Treeview = (0, _tslib.__decorate)([(0, _decorators.customElement)("tree-view")], Treeview);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit":"../node_modules/lit/index.js","lit/decorators":"../node_modules/lit/decorators.js","../icon":"icon/index.ts"}],"treeview/tree-item.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeItem = void 0;

var _tslib = require("tslib");

var _classMap = require("lit/directives/class-map");

var _lit = require("lit");

var _decorators = require("lit/decorators");

var _helpers = require("../helpers");

var _templateObject, _templateObject2, _templateObject3;

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

let TreeItem = class TreeItem extends _lit.LitElement {
  constructor() {
    super(...arguments);
    this.value = '';
    this.label = '';
    this.container = false;
    this.opened = false;
    this.selected = false;
    this._childTrees = [];
    this._childValues = [];

    this.onSelect = e => {
      e.stopPropagation();

      if (this.container) {
        this.opened = !this.opened;

        this._updateOpened();
      } else {
        this.root.setValue(this.value);
      }
    };
  }

  get root() {
    return (0, _helpers.getParentTagName)(this, "tree-view");
  }

  get rootItem() {
    return (0, _helpers.getParentTagName)(this.parentElement, "tree-item");
  }

  _connectToView() {
    const root = this.root;

    if (!root) {
      console.warn("TreeItem must be child of TreeView");
      return;
    }

    root.connectTreeItem(this);
  }

  _disconnectFromView() {
    var _a;

    (_a = this.root) === null || _a === void 0 ? void 0 : _a.disconnectTreeItem(this);
  }

  _connectToItem() {
    const root = this.rootItem;

    if (!!root) {
      this.setAttribute("containered", "");

      if (!root.opened) {
        this.style.display = 'none';
      } else {
        this.style.display = 'block';
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.onSelect);

    this._connectToView();

    this._connectToItem();

    if (!this.value) {
      this.container = true;
    }
  }

  disconnectedCallback() {
    this._childTrees = [];

    this._disconnectFromView();

    this.removeEventListener('click', this.onSelect);
    super.disconnectedCallback();
  }

  firstUpdated() {
    setTimeout(() => {
      const childs = [...this.querySelectorAll("tree-item")];

      if (childs.length) {
        this._childTrees = childs;
        this._childValues = childs.map(it => it.value);
        this.container = true;
      }

      this._updateOpened();
    });
  }

  _updateOpened() {
    this._childTrees.forEach(it => {
      it.style.display = this.opened ? 'block' : 'none';
    });
  }

  _containterTemplate() {
    if (this.container) {
      const data = {
        dropup: this.opened,
        "icon-before": true
      };
      return (0, _lit.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["<icon-element \n                            icon = \"dropdown\" \n                            class = \"", "\"></icon-element>"])), (0, _classMap.classMap)(data));
    }
  }

  render() {
    return (0, _lit.html)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["<div class = \"label\">", "", "</div><slot></slot>"])), this._containterTemplate(), this.label);
  }

  selectContainer(value) {
    if (this._childValues.includes(value)) {
      this.select();
    } else {
      this.unselect();
    }
  }

  select() {
    this.setAttribute("selected", "");
    this.selected = true;
  }

  unselect() {
    this.selected = false;
    this.removeAttribute("selected");
  }

};
exports.TreeItem = TreeItem;
TreeItem.styles = (0, _lit.css)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        :host{\n            display: block;\n            padding: 5px 10px;\n            cursor: pointer;\n            font-weight: 600;\n        }\n        :host([containered]){\n            margin-left: 20px;\n        }\n        :host([container]) .label{\n            padding-bottom: 5px;\n        }\n        :host([container][selected]) .label{\n            color: var(--treeitem-selected-color, #f700ff);\n        }\n        :host(:not([container])[selected]){\n            background-color: var(--treeitem-selected-background, rgba(0, 0, 0, 0.1));\n            color: var(--treeitem-selected-color, #f700ff);\n        }\n        .icon-before{\n            margin-right: 5px;\n            \n        }\n        "])));
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String,
  attribute: true,
  reflect: true
})], TreeItem.prototype, "value", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: String
})], TreeItem.prototype, "label", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean,
  reflect: true
})], TreeItem.prototype, "container", void 0);
(0, _tslib.__decorate)([(0, _decorators.property)({
  type: Boolean
})], TreeItem.prototype, "opened", void 0);
(0, _tslib.__decorate)([(0, _decorators.state)()], TreeItem.prototype, "selected", void 0);
exports.TreeItem = TreeItem = (0, _tslib.__decorate)([(0, _decorators.customElement)("tree-item")], TreeItem);
},{"tslib":"../node_modules/tslib/tslib.es6.js","lit/directives/class-map":"../node_modules/lit/directives/class-map.js","lit":"../node_modules/lit/index.js","lit/decorators":"../node_modules/lit/decorators.js","../helpers":"helpers.ts"}],"treeview/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _treeView = require("./tree-view");

Object.keys(_treeView).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _treeView[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _treeView[key];
    }
  });
});

var _treeItem = require("./tree-item");

Object.keys(_treeItem).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _treeItem[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _treeItem[key];
    }
  });
});
},{"./tree-view":"treeview/tree-view.ts","./tree-item":"treeview/tree-item.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _button = require("./button");

Object.keys(_button).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _button[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _button[key];
    }
  });
});

var _circlepercent = require("./circlepercent");

Object.keys(_circlepercent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _circlepercent[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _circlepercent[key];
    }
  });
});

var _checkbox = require("./checkbox");

Object.keys(_checkbox).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _checkbox[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _checkbox[key];
    }
  });
});

var _code = require("./code");

Object.keys(_code).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _code[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _code[key];
    }
  });
});

var _description = require("./description");

Object.keys(_description).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _description[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _description[key];
    }
  });
});

var _dialog = require("./dialog");

Object.keys(_dialog).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _dialog[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dialog[key];
    }
  });
});

var _form = require("./form");

Object.keys(_form).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _form[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _form[key];
    }
  });
});

var _formAssociated = require("./form-associated");

Object.keys(_formAssociated).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _formAssociated[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _formAssociated[key];
    }
  });
});

var _header = require("./header");

Object.keys(_header).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _header[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _header[key];
    }
  });
});

var _icon = require("./icon");

Object.keys(_icon).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _icon[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _icon[key];
    }
  });
});

var _label = require("./label");

Object.keys(_label).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _label[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _label[key];
    }
  });
});

var _layout = require("./layout");

Object.keys(_layout).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _layout[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _layout[key];
    }
  });
});

var _link = require("./link");

Object.keys(_link).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _link[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _link[key];
    }
  });
});

var _note = require("./note");

Object.keys(_note).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _note[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _note[key];
    }
  });
});

var _number = require("./number");

Object.keys(_number).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _number[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _number[key];
    }
  });
});

var _pagination = require("./pagination");

Object.keys(_pagination).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _pagination[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pagination[key];
    }
  });
});

var _panel = require("./panel");

Object.keys(_panel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _panel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _panel[key];
    }
  });
});

var _qrcode = require("./qrcode");

Object.keys(_qrcode).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _qrcode[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _qrcode[key];
    }
  });
});

var _range = require("./range");

Object.keys(_range).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _range[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _range[key];
    }
  });
});

var _select = require("./select");

Object.keys(_select).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _select[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _select[key];
    }
  });
});

var _spinner = require("./spinner");

Object.keys(_spinner).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _spinner[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _spinner[key];
    }
  });
});

var _tabsElement = require("./tabs/tabs-element");

Object.keys(_tabsElement).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tabsElement[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _tabsElement[key];
    }
  });
});

var _text = require("./text");

Object.keys(_text).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _text[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _text[key];
    }
  });
});

var _textField = require("./text-field");

Object.keys(_textField).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _textField[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _textField[key];
    }
  });
});

var _textarea = require("./textarea");

Object.keys(_textarea).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _textarea[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _textarea[key];
    }
  });
});

var _treeview = require("./treeview");

Object.keys(_treeview).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _treeview[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _treeview[key];
    }
  });
});
},{"./button":"button/index.ts","./circlepercent":"circlepercent/index.ts","./checkbox":"checkbox/index.ts","./code":"code/index.ts","./description":"description/index.ts","./dialog":"dialog/index.ts","./form":"form/index.ts","./form-associated":"form-associated/index.ts","./header":"header/index.ts","./icon":"icon/index.ts","./label":"label/index.ts","./layout":"layout/index.ts","./link":"link/index.ts","./note":"note/index.ts","./number":"number/index.ts","./pagination":"pagination/index.ts","./panel":"panel/index.ts","./qrcode":"qrcode/index.ts","./range":"range/index.ts","./select":"select/index.ts","./spinner":"spinner/index.ts","./tabs/tabs-element":"tabs/tabs-element.ts","./text":"text/index.ts","./text-field":"text-field/index.ts","./textarea":"textarea/index.ts","./treeview":"treeview/index.ts"}],"C:/Users/Kaifat/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59687" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Kaifat/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/index.js.map