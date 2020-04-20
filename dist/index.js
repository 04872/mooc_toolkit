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
})({"core/Toolkit.ts":[function(require,module,exports) {
"use strict";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Toolkit = /*#__PURE__*/function () {
  function Toolkit() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Toolkit);

    this.debug = true;
    this.options = {};
    Object.assign(this.options, options);
    this.emit('init');
  }
  /**
   * 注册工具模块
   */


  _createClass(Toolkit, [{
    key: "emit",
    value: function emit(evtName) {
      console.log(evtName);

      var _iterator = _createForOfIteratorHelper(Toolkit.modules),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var module = _step.value;

          if (module.handleCurrentPage) {
            this.log("\uD83D\uDE97 emit event: [".concat(evtName, "] with module<").concat(module.label, ">"));
            module[evtName](this);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } // /**
    //  * 触发钩子函数
    //  * @param {string}} hook 钩子函数名
    //  */
    // emitHook(hook: string) {
    //     Toolkit.modules.forEach(module => {
    //         const page = Page.currentPage
    //         // 未知页面不处理
    //         if (!page) return
    //         // 如果当前模块不包含在当前页面的可使用模块列表中, 就忽略这个模块
    //         if (Array.isArray(page.enableModules) && !page.enableModules.includes(module.constructor)) {
    //             // this.log('⚠️ disabled module', module.constructor && module.constructor.name)
    //             return
    //         }
    //         // this.log('🚗 enable module: ', module.constructor && module.constructor.name)
    //         if (Reflect.has(module, hook) && typeof module[hook] === 'function')
    //         // return Reflect.has(module, hook) &&
    //         //     typeof module[hook] === 'function' &&
    //         //     module[hook](this)
    //     })
    // }

  }, {
    key: "log",
    value: function log() {
      var _console;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_console = console).log.apply(_console, ['%c[Chinese_Mooc_Toolkit] LOG: ', 'color:teal'].concat(args));
    }
  }], [{
    key: "use",
    value: function use(moduleItem) {
      Array.isArray(moduleItem) ? moduleItem.map(function (item) {
        return Toolkit.use(item);
      }) : Toolkit.modules.push(moduleItem);
    }
  }, {
    key: "delay",
    value: function delay() {
      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;
      return new Promise(function (resolve) {
        return setTimeout(resolve, timeout);
      });
    }
  }]);

  return Toolkit;
}();

exports.Toolkit = Toolkit;
/**
 * 工具集
 */

Toolkit.modules = [];
},{}],"core/ToolkitModule.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ToolkitModule = /*#__PURE__*/function () {
  function ToolkitModule() {
    _classCallCheck(this, ToolkitModule);

    this.enablePages = [];
  } // 视频清晰度按钮组


  _createClass(ToolkitModule, [{
    key: "handleCurrentPage",
    get: function get() {
      var route = location.hash;
      var queryIndex = route.indexOf('?');
      if (queryIndex > 0) route = route.substr(0, queryIndex);
      return this.enablePages.includes(route);
    }
  }], [{
    key: "DOM_QUALITY_LIST",
    get: function get() {
      return document.querySelector('.m-popover-quality > ul');
    } // 视频当前清晰度按钮

  }, {
    key: "DOM_QUALITY_BUTTONS",
    get: function get() {
      if (ToolkitModule.DOM_QUALITY_LIST && ToolkitModule.DOM_QUALITY_LIST.children) {
        var elements = Array.from(ToolkitModule.DOM_QUALITY_LIST.children);
        return elements;
      }

      return [];
    }
  }]);

  return ToolkitModule;
}();

exports.ToolkitModule = ToolkitModule;
ToolkitModule.QUALITYS = [{
  key: '超高清'
}, {
  key: '高清'
}, {
  key: '标清'
}];
},{}],"models/SheetsToolkitModule.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ToolkitModule_1 = require("../core/ToolkitModule");
/**
 * 加入自定义样式
 */


var SheetsToolkitModule = /*#__PURE__*/function (_ToolkitModule_1$Tool) {
  _inherits(SheetsToolkitModule, _ToolkitModule_1$Tool);

  var _super = _createSuper(SheetsToolkitModule);

  function SheetsToolkitModule() {
    var _this;

    _classCallCheck(this, SheetsToolkitModule);

    _this = _super.apply(this, arguments);
    _this.label = 'sheets';
    _this.enablePages = ['#/learn/announce', '#/learn/content', '#/learn/content', '#/learn/examlist', '#/learn/forumindex', '#/learn/score', '#/learn/testlist'];
    return _this;
  }

  _createClass(SheetsToolkitModule, [{
    key: "init",
    value: function init(event) {
      event.log('加入自定义样式');
      SheetsToolkitModule.appendSheets();
    }
  }, {
    key: "onload",
    value: function onload(event) {} // 通过注入 css 实现隐藏广告并固定布局

  }], [{
    key: "appendSheets",
    value: function appendSheets() {
      var sheet = document.createTextNode(SheetsToolkitModule._getSheets());
      var el = document.createElement('style');
      el.id = 'handle-sheets';
      el.appendChild(sheet);
      document.getElementsByTagName('head')[0].appendChild(el);
    }
  }, {
    key: "_getSheets",
    value: function _getSheets() {
      return "\n                html {\n                    --document-filter: grayscale(0); /* #html \u9632\u6B62\u7F51\u9875\u88AB\u9ED1\u767D\u5904\u7406, \u9002\u7528\u4E8E\u7279\u6B8A\u65E5\u671F */\n                }\n                /* \u5916\u5C42\u5168\u5C40\u6837\u5F0F */\n                html {\n                    filter: var(--document-filter) !important;\n                }\n                /* \u89C6\u9891\u9875\u6837\u5F0F */\n                .u-learnBCUI { width: 100%; }\n                .u-learnBCUI .u-select { width: auto; }\n                .up.j-up.f-thide { background-position: right center; }\n                .up.j-up.f-thide::after {\n                    content: '';\n                    position: absolute;\n                    top: 38%;\n                    width: 0;\n                    height: 0;\n                    border: 4px solid transparent;\n                    border-width: 6px 5px 0 5px;\n                    border-top-color: #c6c6c6;\n                    -webkit-transition: all .3s;\n                    transition: all .3s;\n                    cursor: pointer;\n                }\n                .down.f-bg.j-list { width: auto !important; }\n                /* \u63A8\u8350\u8BFE\u7A0B, \u4F1A\u5728\u6682\u505C\u64AD\u653E\u662F\u5F39\u51FA */\n                .ux-modal.um-recommend-modal { display: none; }\n            ";
    }
  }]);

  return SheetsToolkitModule;
}(ToolkitModule_1.ToolkitModule);

exports.SheetsToolkitModule = SheetsToolkitModule;
},{"../core/ToolkitModule":"core/ToolkitModule.ts"}],"models/PlayerToolkitModule.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ToolkitModule_1 = require("../core/ToolkitModule");

var Toolkit_1 = require("../core/Toolkit");
/**
 * 处理视频播放器
 */


var PlayerToolkitModule = /*#__PURE__*/function (_ToolkitModule_1$Tool) {
  _inherits(PlayerToolkitModule, _ToolkitModule_1$Tool);

  var _super = _createSuper(PlayerToolkitModule);

  function PlayerToolkitModule() {
    var _this;

    _classCallCheck(this, PlayerToolkitModule);

    _this = _super.apply(this, arguments);
    _this.label = 'player';
    _this.enablePages = ['#/learn/content'];
    return _this;
  }

  _createClass(PlayerToolkitModule, [{
    key: "onload",
    value: function onload(event) {}
  }, {
    key: "init",
    value: function init(ctx) {
      ctx.log('⚙ 开始修改视频清晰度');

      this._fixedQuality(ctx);
    }
  }, {
    key: "_fixedQuality",
    value: function () {
      var _fixedQuality2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
        var times, qualityBtnList, _highestQualityBtn, qualityButtons, _iterator, _step, q, _iterator2, _step2, d;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                times = 40;

              case 1:
                if (!times--) {
                  _context.next = 58;
                  break;
                }

                qualityBtnList = ToolkitModule_1.ToolkitModule.DOM_QUALITY_LIST;
                _context.next = 5;
                return Toolkit_1.Toolkit.delay(300);

              case 5:
                if (qualityBtnList) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("continue", 56);

              case 7:
                if (!(qualityBtnList.children.length === 1)) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt("break", 58);

              case 9:
                // 仅有一个清晰度时不作处理
                _highestQualityBtn = null; // 最高清晰度
                // 寻找最高清晰度

                qualityButtons = Array.from(ToolkitModule_1.ToolkitModule.DOM_QUALITY_BUTTONS);
                _iterator = _createForOfIteratorHelper(ToolkitModule_1.ToolkitModule.QUALITYS);
                _context.prev = 12;

                _iterator.s();

              case 14:
                if ((_step = _iterator.n()).done) {
                  _context.next = 38;
                  break;
                }

                q = _step.value;
                _iterator2 = _createForOfIteratorHelper(qualityButtons);
                _context.prev = 17;

                _iterator2.s();

              case 19:
                if ((_step2 = _iterator2.n()).done) {
                  _context.next = 26;
                  break;
                }

                d = _step2.value;

                if (!(d.innerHTML === q.key)) {
                  _context.next = 24;
                  break;
                }

                _highestQualityBtn = d;
                return _context.abrupt("break", 26);

              case 24:
                _context.next = 19;
                break;

              case 26:
                _context.next = 31;
                break;

              case 28:
                _context.prev = 28;
                _context.t0 = _context["catch"](17);

                _iterator2.e(_context.t0);

              case 31:
                _context.prev = 31;

                _iterator2.f();

                return _context.finish(31);

              case 34:
                if (!_highestQualityBtn) {
                  _context.next = 36;
                  break;
                }

                return _context.abrupt("break", 38);

              case 36:
                _context.next = 14;
                break;

              case 38:
                _context.next = 43;
                break;

              case 40:
                _context.prev = 40;
                _context.t1 = _context["catch"](12);

                _iterator.e(_context.t1);

              case 43:
                _context.prev = 43;

                _iterator.f();

                return _context.finish(43);

              case 46:
                if (!_highestQualityBtn) {
                  _context.next = 56;
                  break;
                }

                ctx.quality = qualityButtons.find(function (d) {
                  return d.classList.contains('z-sel');
                });
                ctx.highestQuality = _highestQualityBtn;

                _highestQualityBtn.click();

                if (!(ctx.quality === ctx.highestQuality)) {
                  _context.next = 55;
                  break;
                }

                ctx.log('⚙ 修改视频清晰度成功');
                return _context.abrupt("break", 58);

              case 55:
                ctx.log('⚙ 修改视频清晰度ing ...');

              case 56:
                _context.next = 1;
                break;

              case 58:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[12, 40, 43, 46], [17, 28, 31, 34]]);
      }));

      function _fixedQuality(_x) {
        return _fixedQuality2.apply(this, arguments);
      }

      return _fixedQuality;
    }()
  }]);

  return PlayerToolkitModule;
}(ToolkitModule_1.ToolkitModule);

exports.PlayerToolkitModule = PlayerToolkitModule;
},{"../core/ToolkitModule":"core/ToolkitModule.ts","../core/Toolkit":"core/Toolkit.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Toolkit_1 = require("./core/Toolkit");

var SheetsToolkitModule_1 = require("./models/SheetsToolkitModule");

var PlayerToolkitModule_1 = require("./models/PlayerToolkitModule");

Toolkit_1.Toolkit.use(new SheetsToolkitModule_1.SheetsToolkitModule());
Toolkit_1.Toolkit.use(new PlayerToolkitModule_1.PlayerToolkitModule());

var _$Toolkit = new Toolkit_1.Toolkit(); // ⚠️ 单页面应用中 onload 仅触发一次, 这里手动监听页面跳转以触发 init 事件


window.addEventListener('DOMContentLoaded', function () {
  return _$Toolkit.emit('onload');
});
window.addEventListener('hashchange', function () {
  return _$Toolkit.emit('init');
});
},{"./core/Toolkit":"core/Toolkit.ts","./models/SheetsToolkitModule":"models/SheetsToolkitModule.ts","./models/PlayerToolkitModule":"models/PlayerToolkitModule.ts"}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "65391" + '/');

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
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/index.js.map