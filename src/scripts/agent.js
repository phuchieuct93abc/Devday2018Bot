import * as control from "./control"
import * as animojiController from "./animojiController"
import * as voice from "./responsivevoice"
import * as $ from "jquery"
import {initVoiceRecognition} from "./voiceHandler";


var url = "api"

let voiceData = {

  isVoiceStandby: false,
  content: "",
  isIdle: false

}

var $jscomp = $jscomp || {};


$jscomp.scope = {};
$jscomp.owns = function (a, b) {
  return Object.prototype.hasOwnProperty.call(a, b)
}
;
$jscomp.assign = "function" == typeof Object.assign ? Object.assign : function (a, b) {
  for (var c = 1; c < arguments.length; c++) {
    var d = arguments[c];
    if (d)
      for (var e in d)
        $jscomp.owns(d, e) && (a[e] = d[e])
  }
  return a
}
;
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
  a != Array.prototype && a != Object.prototype && (a[b] = c.value)
}
;
$jscomp.getGlobal = function (a) {
  return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
}
;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (a, b) {
  if (b) {
    var c = $jscomp.global;
    a = a.split(".");
    for (var d = 0; d < a.length - 1; d++) {
      var e = a[d];
      e in c || (c[e] = {});
      c = c[e]
    }
    a = a[a.length - 1];
    d = c[a];
    b = b(d);
    b != d && null != b && $jscomp.defineProperty(c, a, {
      configurable: !0,
      writable: !0,
      value: b
    })
  }
}
;
$jscomp.polyfill("Object.assign", function (a) {
  return a || $jscomp.assign
}, "es6", "es3");
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
  $jscomp.initSymbol = function () {
  }
  ;
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
}
;
$jscomp.Symbol = function () {
  function a(a) {
    return $jscomp.SYMBOL_PREFIX + (a || "") + b++
  }

  var b = 0;
  return a
}();
$jscomp.initSymbolIterator = function () {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.iterator;
  a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
    configurable: !0,
    writable: !0,
    value: function () {
      return $jscomp.arrayIterator(this)
    }
  });
  $jscomp.initSymbolIterator = function () {
  }
}
;
$jscomp.initSymbolAsyncIterator = function () {
  $jscomp.initSymbol();
  var a = $jscomp.global.Symbol.asyncIterator;
  a || (a = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("asyncIterator"));
  $jscomp.initSymbolAsyncIterator = function () {
  }
}
;
$jscomp.arrayIterator = function (a) {
  var b = 0;
  return $jscomp.iteratorPrototype(function () {
    return b < a.length ? {
      done: !1,
      value: a[b++]
    } : {
      done: !0
    }
  })
}
;
$jscomp.iteratorPrototype = function (a) {
  $jscomp.initSymbolIterator();
  a = {
    next: a
  };
  a[$jscomp.global.Symbol.iterator] = function () {
    return this
  }
  ;
  return a
}
;
$jscomp.makeIterator = function (a) {
  $jscomp.initSymbolIterator();
  var b = a[Symbol.iterator];
  return b ? b.call(a) : $jscomp.arrayIterator(a)
}
;
$jscomp.FORCE_POLYFILL_PROMISE = !1;
$jscomp.polyfill("Promise", function (a) {
  function b() {
    this.batch_ = null
  }

  function c(a) {
    return a instanceof f ? a : new f(function (b) {
        b(a)
      }
    )
  }

  if (a && !$jscomp.FORCE_POLYFILL_PROMISE)
    return a;
  b.prototype.asyncExecute = function (a) {
    null == this.batch_ && (this.batch_ = [],
      this.asyncExecuteBatch_());
    this.batch_.push(a);
    return this
  }
  ;
  b.prototype.asyncExecuteBatch_ = function () {
    var a = this;
    this.asyncExecuteFunction(function () {
      a.executeBatch_()
    })
  }
  ;
  var d = $jscomp.global.setTimeout;
  b.prototype.asyncExecuteFunction = function (a) {
    d(a, 0)
  }
  ;
  b.prototype.executeBatch_ = function () {
    for (; this.batch_ && this.batch_.length;) {
      var a = this.batch_;
      this.batch_ = [];
      for (var b = 0; b < a.length; ++b) {
        var c = a[b];
        a[b] = null;
        try {
          c()
        } catch (k) {
          this.asyncThrow_(k)
        }
      }
    }
    this.batch_ = null
  }
  ;
  b.prototype.asyncThrow_ = function (a) {
    this.asyncExecuteFunction(function () {
      throw a;
    })
  }
  ;
  var e = {
    PENDING: 0,
    FULFILLED: 1,
    REJECTED: 2
  }
    , f = function (a) {
    this.state_ = e.PENDING;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    var b = this.createResolveAndReject_();
    try {
      a(b.resolve, b.reject)
    } catch (l) {
      b.reject(l)
    }
  };
  f.prototype.createResolveAndReject_ = function () {
    function a(a) {
      return function (d) {
        c || (c = !0,
          a.call(b, d))
      }
    }

    var b = this
      , c = !1;
    return {
      resolve: a(this.resolveTo_),
      reject: a(this.reject_)
    }
  }
  ;
  f.prototype.resolveTo_ = function (a) {
    if (a === this)
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    else if (a instanceof f)
      this.settleSameAsPromise_(a);
    else {
      a: switch (typeof a) {
        case "object":
          var b = null != a;
          break a;
        case "function":
          b = !0;
          break a;
        default:
          b = !1
      }
      b ? this.resolveToNonPromiseObj_(a) : this.fulfill_(a)
    }
  }
  ;
  f.prototype.resolveToNonPromiseObj_ = function (a) {
    var b = void 0;
    try {
      b = a.then
    } catch (l) {
      this.reject_(l);
      return
    }
    "function" == typeof b ? this.settleSameAsThenable_(b, a) : this.fulfill_(a)
  }
  ;
  f.prototype.reject_ = function (a) {
    this.settle_(e.REJECTED, a)
  }
  ;
  f.prototype.fulfill_ = function (a) {
    this.settle_(e.FULFILLED, a)
  }
  ;
  f.prototype.settle_ = function (a, b) {
    if (this.state_ != e.PENDING)
      throw Error("Cannot settle(" + a + ", " + b + "): Promise already settled in state" + this.state_);
    this.state_ = a;
    this.result_ = b;
    this.executeOnSettledCallbacks_()
  }
  ;
  f.prototype.executeOnSettledCallbacks_ = function () {
    if (null != this.onSettledCallbacks_) {
      for (var a = 0; a < this.onSettledCallbacks_.length; ++a)
        g.asyncExecute(this.onSettledCallbacks_[a]);
      this.onSettledCallbacks_ = null
    }
  }
  ;
  var g = new b;
  f.prototype.settleSameAsPromise_ = function (a) {
    var b = this.createResolveAndReject_();
    a.callWhenSettled_(b.resolve, b.reject)
  }
  ;
  f.prototype.settleSameAsThenable_ = function (a, b) {
    var c = this.createResolveAndReject_();
    try {
      a.call(b, c.resolve, c.reject)
    } catch (k) {
      c.reject(k)
    }
  }
  ;
  f.prototype.then = function (a, b) {
    function c(a, b) {
      return "function" == typeof a ? function (b) {
          try {
            d(a(b))
          } catch (p) {
            e(p)
          }
        }
        : b
    }

    var d, e, g = new f(function (a, b) {
        d = a;
        e = b
      }
    );
    this.callWhenSettled_(c(a, d), c(b, e));
    return g
  }
  ;
  f.prototype["catch"] = function (a) {
    return this.then(void 0, a)
  }
  ;
  f.prototype.callWhenSettled_ = function (a, b) {
    function c() {
      switch (d.state_) {
        case e.FULFILLED:
          a(d.result_);
          break;
        case e.REJECTED:
          b(d.result_);
          break;
        default:
          throw Error("Unexpected state: " + d.state_);
      }
    }

    var d = this;
    null == this.onSettledCallbacks_ ? g.asyncExecute(c) : this.onSettledCallbacks_.push(c)
  }
  ;
  f.resolve = c;
  f.reject = function (a) {
    return new f(function (b, c) {
        c(a)
      }
    )
  }
  ;
  f.race = function (a) {
    return new f(function (b, d) {
        for (var e = $jscomp.makeIterator(a), f = e.next(); !f.done; f = e.next())
          c(f.value).callWhenSettled_(b, d)
      }
    )
  }
  ;
  f.all = function (a) {
    var b = $jscomp.makeIterator(a)
      , d = b.next();
    return d.done ? c([]) : new f(function (a, e) {
        function f(b) {
          return function (c) {
            g[b] = c;
            h--;
            0 == h && a(g)
          }
        }

        var g = []
          , h = 0;
        do
          g.push(void 0),
            h++ ,
            c(d.value).callWhenSettled_(f(g.length - 1), e),
            d = b.next();
        while (!d.done)
      }
    )
  }
  ;
  return f
}, "es6", "es3");
var goog = goog || {};
goog.global = this;
goog.isDef = function (a) {
  return void 0 !== a
}
;
goog.isString = function (a) {
  return "string" == typeof a
}
;
goog.isBoolean = function (a) {
  return "boolean" == typeof a
}
;
goog.isNumber = function (a) {
  return "number" == typeof a
}
;
goog.exportPath_ = function (a, b, c) {
  a = a.split(".");
  c = c || goog.global;
  a[0] in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
  for (var d; a.length && (d = a.shift());)
    !a.length && goog.isDef(b) ? c[d] = b : c = c[d] && c[d] !== Object.prototype[d] ? c[d] : c[d] = {}
}
;
goog.define = function (a, b) {
  goog.exportPath_(a, b)
}
;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.DISALLOW_TEST_ONLY_CODE = !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function (a) {
  if (goog.isInGoogModuleLoader_())
    throw Error("goog.provide cannot be used within a module.");
  goog.isInEs6ModuleLoader_() && goog.logToConsole_("goog.provide should not be used within a module.");
  goog.constructNamespace_(a)
}
;
goog.constructNamespace_ = function (a, b) {
  goog.exportPath_(a, b)
}
;
goog.getScriptNonce = function () {
  null === goog.cspNonce_ && (goog.cspNonce_ = goog.getScriptNonce_(goog.global.document) || "");
  return goog.cspNonce_
}
;
goog.NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/;
goog.cspNonce_ = null;
goog.getScriptNonce_ = function (a) {
  return (a = a.querySelector && a.querySelector("script[nonce]")) && (a = a.nonce || a.getAttribute("nonce")) && goog.NONCE_PATTERN_.test(a) ? a : null
}
;
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function (a) {
  if (!goog.isString(a) || !a || -1 == a.search(goog.VALID_MODULE_RE_))
    throw Error("Invalid module identifier");
  if (!goog.isInGoogModuleLoader_())
    throw Error("Module " + a + " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
  if (goog.moduleLoaderState_.moduleName)
    throw Error("goog.module may only be called once per module.");
  goog.moduleLoaderState_.moduleName = a
}
;
goog.module.get = function () {
  return null
}
;
goog.module.getInternal_ = function () {
  return null
}
;
goog.ModuleType = {
  ES6: "es6",
  GOOG: "goog"
};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function () {
  return goog.isInGoogModuleLoader_() || goog.isInEs6ModuleLoader_()
}
;
goog.isInGoogModuleLoader_ = function () {
  return !!goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.GOOG
}
;
goog.isInEs6ModuleLoader_ = function () {
  var a = !!goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.ES6;
  return a ? !0 : (a = goog.global.$jscomp) ? "function" != typeof a.getCurrentModulePath ? !1 : !!a.getCurrentModulePath() : !1
}
;
goog.module.declareLegacyNamespace = function () {
  goog.moduleLoaderState_.declareLegacyNamespace = !0
}
;
goog.module.declareNamespace = function (a) {
  if (goog.moduleLoaderState_)
    goog.moduleLoaderState_.moduleName = a;
  else {
    var b = goog.global.$jscomp;
    if (!b || "function" != typeof b.getCurrentModulePath)
      throw Error('Module with namespace "' + a + '" has been loaded incorrectly.');
    b = b.require(b.getCurrentModulePath());
    goog.loadedModules_[a] = {
      exports: b,
      type: goog.ModuleType.ES6,
      moduleId: a
    }
  }
}
;
goog.setTestOnly = function (a) {
  if (goog.DISALLOW_TEST_ONLY_CODE)
    throw a = a || "",
      Error("Importing test-only code into non-debug environment" + (a ? ": " + a : "."));
}
;
goog.forwardDeclare = function () {
}
;
goog.getObjectByName = function (a, b) {
  a = a.split(".");
  b = b || goog.global;
  for (var c = 0; c < a.length; c++)
    if (b = b[a[c]],
      !goog.isDefAndNotNull(b))
      return null;
  return b
}
;
goog.globalize = function (a, b) {
  b = b || goog.global;
  for (var c in a)
    b[c] = a[c]
}
;
goog.addDependency = function () {
}
;
goog.useStrictRequires = !1;
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function (a) {
  goog.global.console && goog.global.console.error(a)
}
;
goog.require = function () {
}
;
goog.basePath = "";
goog.nullFunction = function () {
}
;
goog.abstractMethod = function () {
  throw Error("unimplemented abstract method");
}
;
goog.addSingletonGetter = function (a) {
  a.instance_ = void 0;
  a.getInstance = function () {
    if (a.instance_)
      return a.instance_;
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
    return a.instance_ = new a
  }
}
;
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !1;
goog.TRANSPILE = "detect";
goog.TRANSPILE_TO_LANGUAGE = "";
goog.TRANSPILER = "transpile.js";
goog.hasBadLetScoping = null;
goog.useSafari10Workaround = function () {
  if (null == goog.hasBadLetScoping) {
    try {
      var a = !eval('"use strict";let x = 1; function f() { return typeof x; };f() == "number";')
    } catch (b) {
      a = !1
    }
    goog.hasBadLetScoping = a
  }
  return goog.hasBadLetScoping
}
;
goog.workaroundSafari10EvalBug = function (a) {
  return "(function(){" + a + "\n;})();\n"
}
;
goog.loadModule = function (a) {
  var b = goog.moduleLoaderState_;
  try {
    goog.moduleLoaderState_ = {
      moduleName: "",
      declareLegacyNamespace: !1,
      type: goog.ModuleType.GOOG
    };
    if (goog.isFunction(a))
      var c = a.call(void 0, {});
    else if (goog.isString(a))
      goog.useSafari10Workaround() && (a = goog.workaroundSafari10EvalBug(a)),
        c = goog.loadModuleFromSource_.call(void 0, a);
    else
      throw Error("Invalid module definition");
    var d = goog.moduleLoaderState_.moduleName;
    if (goog.isString(d) && d) {
      goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(d, c) : goog.SEAL_MODULE_EXPORTS && Object.seal && "object" == typeof c && null != c && Object.seal(c);
      var e = {
        exports: c,
        type: goog.ModuleType.GOOG,
        moduleId: goog.moduleLoaderState_.moduleName
      };
      goog.loadedModules_[d] = e
    } else
      throw Error('Invalid module name "' + d + '"');
  } finally {
    goog.moduleLoaderState_ = b
  }
}
;
goog.loadModuleFromSource_ = function (a) {
  var b = {};
  eval(a);
  return b
}
;
goog.normalizePath_ = function (a) {
  a = a.split("/");
  for (var b = 0; b < a.length;)
    "." == a[b] ? a.splice(b, 1) : b && ".." == a[b] && a[b - 1] && ".." != a[b - 1] ? a.splice(--b, 2) : b++;
  return a.join("/")
}
;
goog.loadFileSync_ = function (a) {
  if (goog.global.CLOSURE_LOAD_FILE_SYNC)
    return goog.global.CLOSURE_LOAD_FILE_SYNC(a);
  try {
    var b = new goog.global.XMLHttpRequest;
    b.open("get", a, !1);
    b.send();
    return 0 == b.status || 200 == b.status ? b.responseText : null
  } catch (c) {
    return null
  }
}
;
goog.transpile_ = function (a, b, c) {
  var d = goog.global.$jscomp;
  d || (goog.global.$jscomp = d = {});
  var e = d.transpile;
  if (!e) {
    var f = goog.basePath + goog.TRANSPILER
      , g = goog.loadFileSync_(f);
    if (g) {
      (function () {
          eval(g + "\n//# sourceURL=" + f)
        }
      ).call(goog.global);
      if (goog.global.$gwtExport && goog.global.$gwtExport.$jscomp && !goog.global.$gwtExport.$jscomp.transpile)
        throw Error('The transpiler did not properly export the "transpile" method. $gwtExport: ' + JSON.stringify(goog.global.$gwtExport));
      goog.global.$jscomp.transpile = goog.global.$gwtExport.$jscomp.transpile;
      d = goog.global.$jscomp;
      e = d.transpile
    }
  }
  if (!e) {
    var h = " requires transpilation but no transpiler was found.";
    h += ' Please add "//javascript/closure:transpiler" as a data dependency to ensure it is included.';
    e = d.transpile = function (a, b) {
      goog.logToConsole_(b + h);
      return a
    }
  }
  return e(a, b, c)
}
;
goog.typeOf = function (a) {
  var b = typeof a;
  if ("object" == b)
    if (a) {
      if (a instanceof Array)
        return "array";
      if (a instanceof Object)
        return b;
      var c = Object.prototype.toString.call(a);
      if ("[object Window]" == c)
        return "object";
      if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))
        return "array";
      if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))
        return "function"
    } else
      return "null";
  else if ("function" == b && "undefined" == typeof a.call)
    return "object";
  return b
}
;
goog.isNull = function (a) {
  return null === a
}
;
goog.isDefAndNotNull = function (a) {
  return null != a
}
;
goog.isArray = function (a) {
  return "array" == goog.typeOf(a)
}
;
goog.isArrayLike = function (a) {
  var b = goog.typeOf(a);
  return "array" == b || "object" == b && "number" == typeof a.length
}
;
goog.isDateLike = function (a) {
  return goog.isObject(a) && "function" == typeof a.getFullYear
}
;
goog.isFunction = function (a) {
  return "function" == goog.typeOf(a)
}
;
goog.isObject = function (a) {
  var b = typeof a;
  return "object" == b && null != a || "function" == b
}
;
goog.getUid = function (a) {
  return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
}
;
goog.hasUid = function (a) {
  return !!a[goog.UID_PROPERTY_]
}
;
goog.removeUid = function (a) {
  null !== a && "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_]
  } catch (b) {
  }
}
;
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function (a) {
  var b = goog.typeOf(a);
  if ("object" == b || "array" == b) {
    if ("function" === typeof a.clone)
      return a.clone();
    b = "array" == b ? [] : {};
    for (var c in a)
      b[c] = goog.cloneObject(a[c]);
    return b
  }
  return a
}
;
goog.bindNative_ = function (a, b, c) {
  return a.call.apply(a.bind, arguments)
}
;
goog.bindJs_ = function (a, b, c) {
  if (!a)
    throw Error();
  if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function () {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c)
    }
  }
  return function () {
    return a.apply(b, arguments)
  }
}
;
goog.bind = function (a, b, c) {
  goog.bind = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bindNative_ : goog.bindJs_;
  return goog.bind.apply(null, arguments)
}
;
goog.partial = function (a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function () {
    var b = c.slice();
    b.push.apply(b, arguments);
    return a.apply(this, b)
  }
}
;
goog.mixin = function (a, b) {
  for (var c in b)
    a[c] = b[c]
}
;
goog.now = goog.TRUSTED_SITE && Date.now || function () {
  return +new Date
}
;
goog.globalEval = function (a) {
  if (goog.global.execScript)
    goog.global.execScript(a, "JavaScript");
  else if (goog.global.eval) {
    if (null == goog.evalWorksForGlobals_) {
      try {
        goog.global.eval("var _evalTest_ = 1;")
      } catch (d) {
      }
      if ("undefined" != typeof goog.global._evalTest_) {
        try {
          delete goog.global._evalTest_
        } catch (d) {
        }
        goog.evalWorksForGlobals_ = !0
      } else
        goog.evalWorksForGlobals_ = !1
    }
    if (goog.evalWorksForGlobals_)
      goog.global.eval(a);
    else {
      var b = goog.global.document
        , c = b.createElement("SCRIPT");
      c.type = "text/javascript";
      c.defer = !1;
      c.appendChild(b.createTextNode(a));
      b.head.appendChild(c);
      b.head.removeChild(c)
    }
  } else
    throw Error("goog.globalEval not available");
}
;
goog.evalWorksForGlobals_ = null;
goog.getCssName = function (a, b) {
  if ("." == String(a).charAt(0))
    throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + a);
  var c = function (a) {
    return goog.cssNameMapping_[a] || a
  }
    , d = function (a) {
    a = a.split("-");
    for (var b = [], d = 0; d < a.length; d++)
      b.push(c(a[d]));
    return b.join("-")
  };
  d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function (a) {
    return a
  }
  ;
  a = b ? a + "-" + d(b) : d(a);
  return goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN(a) : a
}
;
goog.setCssNameMapping = function (a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b
}
;
goog.getMsg = function (a, b) {
  b && (a = a.replace(/\{\$([^}]+)}/g, function (a, d) {
    return null != b && d in b ? b[d] : a
  }));
  return a
}
;
goog.getMsgWithFallback = function (a) {
  return a
}
;
goog.exportSymbol = function (a, b, c) {
  goog.exportPath_(a, b, c)
}
;
goog.exportProperty = function (a, b, c) {
  a[b] = c
}
;
goog.inherits = function (a, b) {
  function c() {
  }

  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a;
  a.base = function (a, c, f) {
    for (var d = Array(arguments.length - 2), e = 2; e < arguments.length; e++)
      d[e - 2] = arguments[e];
    return b.prototype[c].apply(a, d)
  }
}
;
goog.base = function (a, b, c) {
  var d = arguments.callee.caller;
  if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !d)
    throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
  if ("undefined" !== typeof d.superClass_) {
    for (var e = Array(arguments.length - 1), f = 1; f < arguments.length; f++)
      e[f - 1] = arguments[f];
    return d.superClass_.constructor.apply(a, e)
  }
  if ("string" != typeof b && "symbol" != typeof b)
    throw Error("method names provided to goog.base must be a string or a symbol");
  e = Array(arguments.length - 2);
  for (f = 2; f < arguments.length; f++)
    e[f - 2] = arguments[f];
  f = !1;
  for (var g = a.constructor; g; g = g.superClass_ && g.superClass_.constructor)
    if (g.prototype[b] === d)
      f = !0;
    else if (f)
      return g.prototype[b].apply(a, e);
  if (a[b] === d)
    return a.constructor.prototype[b].apply(a, e);
  throw Error("goog.base called from a method of one name to a method of a different name");
}
;
goog.scope = function (a) {
  if (goog.isInModuleLoader_())
    throw Error("goog.scope is not supported within a module.");
  a.call(goog.global)
}
;
goog.defineClass = function (a, b) {
  var c = b.constructor
    , d = b.statics;
  c && c != Object.prototype.constructor || (c = function () {
      throw Error("cannot instantiate an interface (no constructor defined).");
    }
  );
  c = goog.defineClass.createSealingConstructor_(c, a);
  a && goog.inherits(c, a);
  delete b.constructor;
  delete b.statics;
  goog.defineClass.applyProperties_(c.prototype, b);
  null != d && (d instanceof Function ? d(c) : goog.defineClass.applyProperties_(c, d));
  return c
}
;
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function (a, b) {
  if (!goog.defineClass.SEAL_CLASS_INSTANCES)
    return a;
  var c = !goog.defineClass.isUnsealable_(b)
    , d = function () {
    var b = a.apply(this, arguments) || this;
    b[goog.UID_PROPERTY_] = b[goog.UID_PROPERTY_];
    this.constructor === d && c && Object.seal instanceof Function && Object.seal(b);
    return b
  };
  return d
}
;
goog.defineClass.isUnsealable_ = function (a) {
  return a && a.prototype && a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]
}
;
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function (a, b) {
  for (var c in b)
    Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c]);
  for (var d = 0; d < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; d++)
    c = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d],
    Object.prototype.hasOwnProperty.call(b, c) && (a[c] = b[c])
}
;
goog.tagUnsealableClass = function () {
}
;
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
/*
 Copyright (c) Microsoft Corporation. All rights reserved.
 Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 this file except in compliance with the License. You may obtain a copy of the
 License at http://www.apache.org/licenses/LICENSE-2.0

 THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
 WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 MERCHANTABLITY OR NON-INFRINGEMENT.

 See the Apache Version 2.0 License for specific language governing permissions
 and limitations under the License.
*/


$(document).ready(() => {
  var module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper = function () {
    this.workplace = document;
    this.body = document.body;
    this.queryInput = this.workplace.getElementById(module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.QUERY_INPUT_ID);
    this.queryResult = this.workplace.getElementById(module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.QUERY_RESULT_ID);
    this.queryResultWrapper = this.workplace.getElementById(module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.QUERY_RESULT_WRAPPER_ID);
    this.mic = this.workplace.getElementById(module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.QUERY_MIC_ID);
    this.preloader = this.workplace.getElementById(module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.PRELOADER_ID);
    this.agentAvatar = this.workplace.getElementById(module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.ID_AGENT_AVATAR_IMAGE)
  };
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.showNode = function (a) {
    a.style.display = "block"
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.escapeString = function (a) {
    return a && a.toString() ? a.toString().replace(/&/g, "&amp").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;") : a
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.prototype.checkAvatar = function () {
    "" === window.AGENT_AVATAR_ID && (this.agentAvatar.src = module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.DEFAULT_AVATAR_SRC)
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.prototype.hidePreloader = function () {
    // var a = this;
    // setTimeout(function () {
    //   return a.preloader.style.opacity = "0"
    // }, 200);
    // setTimeout(function () {
    //   return a.preloader.style.display = "none"
    // }, 500)
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.prototype.setInputValue = function (a) {
    this.queryInput.value = a;
    return this
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.prototype.addUserRequestNode = function (a) {
    var b = this.workplace.createElement("div");
    b.className = module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.CLASS_USER_REQUEST;
    b.innerHTML = a;
    this.queryResult.appendChild(b);
    return this
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.prototype.generateEmptyServerResponseNode = function () {
    var a = this.workplace.createElement("div");
    a.className = module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.CLASS_SERVER_RESPONSE;
    a.innerHTML = module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.DEFAULT_EMPTY_NODE_CONTENT;
    this.queryResult.appendChild(a);
    return a
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.prototype.setErrorOnNode = function (a, b) {
    b.innerHTML = a;
    b.className += " " + module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.CLASS_SERVER_RESPONSE_ERROR;
    return b
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.prototype.setContentOnNode = function (a, b) {
    b.innerHTML = a;
    return this
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.prototype.scrollResultWrapperNodeToBottom = function () {
    this.queryResultWrapper.scrollTop = this.queryResultWrapper.scrollHeight + 2000;
    return this
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.prototype.handleStartRecognition = function () {
    this.mic.className += " " + module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.CLASS_MIC_ACTIVE;
    return this
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.prototype.handleStopRecognition = function () {
    var a = new RegExp("(?:^|\\s)" + module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.CLASS_MIC_ACTIVE + "(?!\\S)", "gi");
    this.mic.className = this.mic.className.replace(a, "");
    return this
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.QUERY_INPUT_ID = "query";
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.QUERY_RESULT_ID = "result";
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.QUERY_RESULT_WRAPPER_ID = "resultWrapper";
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.QUERY_MIC_ID = "mic";
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.PRELOADER_ID = "preloader";
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.CLASS_USER_REQUEST = "user-request";
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.CLASS_SERVER_RESPONSE = "server-response";
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.CLASS_SERVER_RESPONSE_ERROR = "server-response-error";
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.ID_AGENT_AVATAR_IMAGE = "agent-avatar";
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.CLASS_MIC_ACTIVE = "active";
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.DEFAULT_EMPTY_NODE_CONTENT = "...";
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.DEFAULT_AVATAR_SRC = "/api-client/assets/img/logo-short.png";
  var module$exports$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest = {}
    ,
    module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest = function () {
    };
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest.ajax = function (a, b, c, d) {
    c = void 0 === c ? null : c;
    d = void 0 === d ? null : d;
    return new Promise(function (e, f) {
        var g = module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest.createXMLHTTPObject()
          , h = b
          , m = null;

        if (c && a === module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest.Method.GET) {
          h += "?";
          var l = 0, k;
          for (k in c)
            c.hasOwnProperty(k) && (l++ && (h += "&"),
              h += encodeURIComponent(k) + "=" + encodeURIComponent(c[k]))
        } else
          c && (d || (d = {}),
            d["Content-Type"] = "application/json",
            m = JSON.stringify(c));

        g.open(a, h);
        if (d)
          for (var n in d)
            d.hasOwnProperty(n) && g.setRequestHeader(n, d[n]);


        m ? g.send(m) : g.send();
        g.onload = function () {
          200 <= g.status && 300 > g.status ? e(g) : f(g)
        }
        ;
        g.onerror = function () {
          f(g)
        }
      }
    )
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest.get = function (a, b, c) {
    b = void 0 === b ? null : b;
    c = void 0 === c ? null : c;
    return module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest.ajax(module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest.Method.GET, a, b, c)
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest.post = function (a, b, c) {
    b = void 0 === b ? null : b;
    c = void 0 === c ? null : c;
    return module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest.ajax(module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest.Method.POST, a, b, c)
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest.put = function (a, b, c) {
    b = void 0 === b ? null : b;
    c = void 0 === c ? null : c;
    return module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest.ajax(module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest.Method.PUT, a, b, c)
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest["delete"] = function (a, b, c) {
    b = void 0 === b ? null : b;
    c = void 0 === c ? null : c;
    return module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest.ajax(module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest.Method.DELETE, a, b, c)
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest.createXMLHTTPObject = function () {
    for (var a = null, b = 0; b < module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest.XMLHttpFactories.length; b++)
      if (module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest.XMLHttpFactories.hasOwnProperty(b)) {
        try {
          a = module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest.XMLHttpFactories[b]()
        } catch (c) {
          continue
        }
        break
      }
    return a
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest.XMLHttpFactories = [function () {
    return new XMLHttpRequest
  }
    , function () {
      return new ActiveXObject("Msxml2.XMLHTTP")
    }
    , function () {
      return new ActiveXObject("Msxml3.XMLHTTP")
    }
    , function () {
      return new ActiveXObject("Microsoft.XMLHTTP")
    }
  ];
  module$exports$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest.XhrRequest = module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest;
  var XhrRequest$jscomp$inline_9 = module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest_XhrRequest = module$exports$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest.XhrRequest || (module$exports$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest.XhrRequest = {})
    , Method$jscomp$inline_10 = XhrRequest$jscomp$inline_9.Method || (XhrRequest$jscomp$inline_9.Method = {});
  Method$jscomp$inline_10.GET = "GET";
  Method$jscomp$inline_10.POST = "POST";
  Method$jscomp$inline_10.PUT = "PUT";
  Method$jscomp$inline_10.DELETE = "DELETE";
  var module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App = function (a) {
    var b = this;
    this.domHelper = a;
    this.handleMicClick = function () {
      b.isRecognizing ? b.recognition.stop() : b.recognition.start()
    }
    ;
    this.hanleInputKeyDown = function (a) {
      a.keyCode === module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App.KEY_CODES.ENTER && (a.preventDefault(),
        a.stopPropagation(),
        b.handleInput())
    }
    ;
    this.handleInput = function () {
      var a = b.domHelper.queryInput.value;
      "" !== a.replace(/\s/g, "") && (b.domHelper.addUserRequestNode(module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.escapeString(a)),
        a = b.domHelper.generateEmptyServerResponseNode(),
        a = b.generateCallbacksForNode(a),
        module$exports$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$XhrRequest.XhrRequest.get(module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App.API_URL, b.buildPayLoad(b.domHelper.queryInput.value)).then(a.success, a.error),
        b.domHelper.setInputValue("").scrollResultWrapperNodeToBottom())
    }
    ;
    this.sessionId = this.guid()
  };
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App.prototype.bindEventHandlers = function () {
    this.domHelper.queryInput.addEventListener("keydown", this.hanleInputKeyDown, !1);
    "webkitSpeechRecognition" in window && (this.initRecognition(),
      module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.showNode(this.domHelper.mic),
      this.domHelper.mic.addEventListener("click", this.handleMicClick, !1));
    this.domHelper.checkAvatar();
    this.domHelper.hidePreloader()
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App.prototype.initRecognition = function () {
    this.recognition = initVoiceRecognition(voiceData, this);
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App.prototype.buildPayLoad = function (a) {
    return {
      q: encodeURI(a),
      sessionId: encodeURI(this.sessionId)
    }
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App.prototype.handleResponse = function (a, b) {


    var c = a.response ? a.response : a.responseText;
    a = null;
    try {
      a = JSON.parse(c)
    } catch (d) {
      return this.handleError(a, b)
    }
    if (!(a.status && a.status.code && a.status.code === module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App.HTTP_STATUS.OK && a.result && a.result))
      return this.handleError(a, b);
    c = this.getSpeech(a.result);

    let speech = animojiController.parseResponse(a.result.fulfillment.speech);
    let insertingNode = c;

    let parameters = null;


    if (speech.text) {
      parameters = control.getResult(speech.text, speech.id);
      voice.responsiveVoice.speak(speech.text, "US English Male", parameters);
      insertingNode = speech.text;
      animojiController.getAnimoji("animojiVideo",speech.id, false);
      animojiController.getAnimoji("animojiVideoWindow",speech.id, false);

    } else {
      parameters = control.getResult(speech);
      voice.responsiveVoice.speak(speech, "US English Male", parameters);
    }

    this.domHelper.setContentOnNode(insertingNode, b).scrollResultWrapperNodeToBottom();
  }

  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App.prototype.generateCallbacksForNode = function (a) {
    var b = this;
    return {
      success: function (c) {
        b.handleResponse(c, a)
      },
      error: function (c) {
        b.handleResponse(c, a)
      }
    }
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App.prototype.getSpeech = function (a) {
    a = a.speech || (a.fulfillment ? a.fulfillment.speech : module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App.DEFAULT_NO_ANSWER);
    a || (a = module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App.DEFAULT_NO_ANSWER);
    return module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper.escapeString(a)
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App.prototype.handleError = function (a, b) {
    a = a && a.status && a.status.errorDetails ? a.status.errorDetails : module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App.DEFAULT_ERROR;
    this.domHelper.setErrorOnNode(a, b)
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App.prototype.guid = function () {
    var a = function () {
      return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
    };
    console.log(a);
    return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
  }
  ;
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App.API_URL = url + "/demoQuery";
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App.DEFAULT_ERROR = "Sorry, it seemed like there was an error during request.";
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App.DEFAULT_NO_ANSWER = "[empty response]";
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App.HTTP_STATUS = {
    OK: 200
  };
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App.KEY_CODES = {
    ENTER: 13
  };
  var module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$main_domHelper = new module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$DomHelper_DomHelper
    ,
    module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$main_app = new module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$App_App(module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$main_domHelper);
  module$contents$google3$third_party$apiai$ui$legacy$src$main$webapp$js$agentDemoApp$main_app.bindEventHandlers();


});




