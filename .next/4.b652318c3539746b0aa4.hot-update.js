webpackHotUpdate(4,{

/***/ "./components/TestComponents.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestComponents; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primereact_button__ = __webpack_require__("./node_modules/primereact/button.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_primereact_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_primereact_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primereact_splitbutton__ = __webpack_require__("./node_modules/primereact/splitbutton.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primereact_splitbutton___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_primereact_splitbutton__);
var _jsxFileName = "D:\\EDICIONES PROPIAS\\SvmReact\\components\\TestComponents.js";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var TestComponents =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TestComponents, _React$Component);

  function TestComponents() {
    _classCallCheck(this, TestComponents);

    return _possibleConstructorReturn(this, (TestComponents.__proto__ || Object.getPrototypeOf(TestComponents)).apply(this, arguments));
  }

  _createClass(TestComponents, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        }
      }, __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h1", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        }
      }, "Hola Mundo soy SvmReact"), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_primereact_button__["Button"], {
        label: "Save",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_primereact_button__["Button"], {
        label: "Secondary",
        className: "ui-button-secondary",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 10
        }
      }), __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2_primereact_splitbutton__["SplitButton"], {
        label: "Save",
        icon: "pi pi-check",
        model: this.state.items,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        }
      }));
    }
  }]);

  return TestComponents;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);



/***/ }),

/***/ "./node_modules/primereact/components/splitbutton/SplitButton.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SplitButton = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = __webpack_require__("./node_modules/primereact/components/button/Button.js");

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

var _DomHandler = __webpack_require__("./node_modules/primereact/components/utils/DomHandler.js");

var _DomHandler2 = _interopRequireDefault(_DomHandler);

var _SplitButtonItem = __webpack_require__("./node_modules/primereact/components/splitbutton/SplitButtonItem.js");

var _SplitButtonPanel = __webpack_require__("./node_modules/primereact/components/splitbutton/SplitButtonPanel.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SplitButton = exports.SplitButton = function (_Component) {
    _inherits(SplitButton, _Component);

    function SplitButton(props) {
        _classCallCheck(this, SplitButton);

        var _this = _possibleConstructorReturn(this, (SplitButton.__proto__ || Object.getPrototypeOf(SplitButton)).call(this, props));

        _this.onDropdownButtonClick = _this.onDropdownButtonClick.bind(_this);
        return _this;
    }

    _createClass(SplitButton, [{
        key: 'onDropdownButtonClick',
        value: function onDropdownButtonClick(event) {
            if (this.documentClickListener) {
                this.dropdownClick = true;
            }

            if (this.panel.element.offsetParent) this.hide();else this.show();
        }
    }, {
        key: 'show',
        value: function show() {
            this.panel.element.style.zIndex = String(_DomHandler2.default.generateZIndex());
            this.alignPanel();
            _DomHandler2.default.fadeIn(this.panel.element, 250);
            this.panel.element.style.display = 'block';
            this.bindDocumentListener();
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.panel.element.style.display = 'none';
            this.unbindDocumentListener();
        }
    }, {
        key: 'alignPanel',
        value: function alignPanel() {
            if (this.props.appendTo) {
                _DomHandler2.default.absolutePosition(this.panel.element, this.container);
                this.panel.element.style.minWidth = _DomHandler2.default.getWidth(this.container) + 'px';
            } else {
                _DomHandler2.default.relativePosition(this.panel.element, this.container);
            }
        }
    }, {
        key: 'bindDocumentListener',
        value: function bindDocumentListener() {
            var _this2 = this;

            if (!this.documentClickListener) {
                this.documentClickListener = function () {
                    if (_this2.dropdownClick) _this2.dropdownClick = false;else _this2.hide();
                };

                document.addEventListener('click', this.documentClickListener);
            }
        }
    }, {
        key: 'unbindDocumentListener',
        value: function unbindDocumentListener() {
            if (this.documentClickListener) {
                document.removeEventListener('click', this.documentClickListener);
                this.documentClickListener = null;
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unbindDocumentListener();
        }
    }, {
        key: 'renderItems',
        value: function renderItems() {
            if (this.props.model) {
                return this.props.model.map(function (menuitem, index) {
                    return _react2.default.createElement(_SplitButtonItem.SplitButtonItem, { menuitem: menuitem, key: index });
                });
            } else {
                return null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var className = (0, _classnames2.default)('ui-splitbutton ui-buttonset ui-widget', this.props.className, { 'ui-state-disabled': this.props.disabled });
            var items = this.renderItems();

            return _react2.default.createElement(
                'div',
                { id: this.props.id, className: className, style: this.props.style, ref: function ref(el) {
                        _this3.container = el;
                    } },
                _react2.default.createElement(_Button.Button, { type: 'button', icon: this.props.icon, label: this.props.label, onClick: this.props.onClick, disabled: this.props.disabled, cornerStyleClass: 'ui-corner-left', tabIndex: this.props.tabIndex }),
                _react2.default.createElement(_Button.Button, { type: 'button', className: 'ui-splitbutton-menubutton', icon: 'pi pi-caret-down', onClick: this.onDropdownButtonClick, disabled: this.props.disabled, cornerStyleClass: 'ui-corner-right' }),
                _react2.default.createElement(
                    _SplitButtonPanel.SplitButtonPanel,
                    { ref: function ref(el) {
                            return _this3.panel = el;
                        }, appendTo: this.props.appendTo,
                        menuStyle: this.props.menuStyle, menuClassName: this.props.menuClassName },
                    items
                )
            );
        }
    }]);

    return SplitButton;
}(_react.Component);

SplitButton.defaultProps = {
    id: null,
    label: null,
    icon: null,
    model: null,
    disabled: null,
    style: null,
    className: null,
    menuStyle: null,
    menuClassName: null,
    tabIndex: null,
    onClick: null,
    appendTo: null
};
SplitButton.propsTypes = {
    id: _propTypes2.default.string,
    label: _propTypes2.default.string,
    icon: _propTypes2.default.string,
    model: _propTypes2.default.array,
    disabled: _propTypes2.default.bool,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    menustyle: _propTypes2.default.object,
    menuClassName: _propTypes2.default.string,
    tabIndex: _propTypes2.default.string,
    onClick: _propTypes2.default.func,
    appendTo: _propTypes2.default.object
};

/***/ }),

/***/ "./node_modules/primereact/components/splitbutton/SplitButtonItem.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SplitButtonItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SplitButtonItem = exports.SplitButtonItem = function (_Component) {
    _inherits(SplitButtonItem, _Component);

    function SplitButtonItem(props) {
        _classCallCheck(this, SplitButtonItem);

        var _this = _possibleConstructorReturn(this, (SplitButtonItem.__proto__ || Object.getPrototypeOf(SplitButtonItem)).call(this, props));

        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }

    _createClass(SplitButtonItem, [{
        key: 'onClick',
        value: function onClick(e) {
            if (this.props.menuitem.command) {
                this.props.menuitem.command({ originalEvent: e, item: this.props.menuitem });
            }
            e.preventDefault();
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2.default)('ui-menuitem-link ui-corner-all', { 'ui-state-disabled': this.props.menuitem.disabled });
            var icon = this.props.menuitem.icon ? _react2.default.createElement('span', { className: (0, _classnames2.default)('ui-menuitem-icon', this.props.menuitem.icon) }) : null;
            var label = _react2.default.createElement(
                'span',
                { className: 'ui-menuitem-text' },
                this.props.menuitem.label
            );

            return _react2.default.createElement(
                'li',
                { className: 'ui-menuitem ui-widget ui-corner-all', role: 'menuitem' },
                _react2.default.createElement(
                    'a',
                    { href: this.props.menuitem.url || '#', className: className, target: this.props.menuitem.target, onClick: this.onClick },
                    icon,
                    label
                )
            );
        }
    }]);

    return SplitButtonItem;
}(_react.Component);

SplitButtonItem.defaultProps = {
    menuitem: null
};
SplitButtonItem.propsTypes = {
    menuitem: _propTypes2.default.any
};

/***/ }),

/***/ "./node_modules/primereact/components/splitbutton/SplitButtonPanel.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SplitButtonPanel = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__("./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__("./node_modules/react-dom/index.js");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = __webpack_require__("./node_modules/classnames/index.js");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SplitButtonPanel = exports.SplitButtonPanel = function (_Component) {
    _inherits(SplitButtonPanel, _Component);

    function SplitButtonPanel() {
        _classCallCheck(this, SplitButtonPanel);

        return _possibleConstructorReturn(this, (SplitButtonPanel.__proto__ || Object.getPrototypeOf(SplitButtonPanel)).apply(this, arguments));
    }

    _createClass(SplitButtonPanel, [{
        key: 'renderElement',
        value: function renderElement() {
            var _this2 = this;

            var className = (0, _classnames2.default)('ui-menu ui-menu-dynamic ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-shadow', this.props.menuClassName);

            return _react2.default.createElement(
                'div',
                { className: className, style: this.props.menuStyle, ref: function ref(el) {
                        _this2.element = el;
                    } },
                _react2.default.createElement(
                    'ul',
                    { className: 'ui-menu-list ui-helper-reset' },
                    this.props.children
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var element = this.renderElement();

            if (this.props.appendTo) {
                return _reactDom2.default.createPortal(element, this.props.appendTo);
            } else {
                return element;
            }
        }
    }]);

    return SplitButtonPanel;
}(_react.Component);

SplitButtonPanel.defaultProps = {
    appendTo: null,
    menuStyle: null,
    menuClassName: null
};
SplitButtonPanel.propTypes = {
    appendTo: _propTypes2.default.object,
    menustyle: _propTypes2.default.object,
    menuClassName: _propTypes2.default.string
};

/***/ }),

/***/ "./node_modules/primereact/components/utils/DomHandler.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomHandler = function () {
    function DomHandler() {
        _classCallCheck(this, DomHandler);
    }

    _createClass(DomHandler, null, [{
        key: 'innerWidth',
        value: function innerWidth(el) {
            var width = el.offsetWidth;
            var style = getComputedStyle(el);

            width += parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
            return width;
        }
    }, {
        key: 'width',
        value: function width(el) {
            var width = el.offsetWidth;
            var style = getComputedStyle(el);

            width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
            return width;
        }
    }, {
        key: 'getWindowScrollTop',
        value: function getWindowScrollTop() {
            var doc = document.documentElement;
            return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        }
    }, {
        key: 'getWindowScrollLeft',
        value: function getWindowScrollLeft() {
            var doc = document.documentElement;
            return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        }
    }, {
        key: 'getOuterWidth',
        value: function getOuterWidth(el, margin) {
            if (el) {
                var width = el.offsetWidth;

                if (margin) {
                    var style = getComputedStyle(el);
                    width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
                }

                return width;
            } else {
                return 0;
            }
        }
    }, {
        key: 'getOuterHeight',
        value: function getOuterHeight(el, margin) {
            if (el) {
                var height = el.offsetHeight;

                if (margin) {
                    var style = getComputedStyle(el);
                    height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
                }

                return height;
            } else {
                return 0;
            }
        }
    }, {
        key: 'getViewport',
        value: function getViewport() {
            var win = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName('body')[0],
                w = win.innerWidth || e.clientWidth || g.clientWidth,
                h = win.innerHeight || e.clientHeight || g.clientHeight;

            return { width: w, height: h };
        }
    }, {
        key: 'getOffset',
        value: function getOffset(el) {
            var rect = el.getBoundingClientRect();

            return {
                top: rect.top + document.body.scrollTop,
                left: rect.left + document.body.scrollLeft
            };
        }
    }, {
        key: 'generateZIndex',
        value: function generateZIndex() {
            this.zindex = this.zindex || 999;
            return ++this.zindex;
        }
    }, {
        key: 'getCurrentZIndex',
        value: function getCurrentZIndex() {
            return this.zindex;
        }
    }, {
        key: 'index',
        value: function index(element) {
            var children = element.parentNode.childNodes;
            var num = 0;
            for (var i = 0; i < children.length; i++) {
                if (children[i] === element) return num;
                if (children[i].nodeType === 1) num++;
            }
            return -1;
        }
    }, {
        key: 'addMultipleClasses',
        value: function addMultipleClasses(element, className) {
            if (element.classList) {
                var styles = className.split(' ');
                for (var i = 0; i < styles.length; i++) {
                    element.classList.add(styles[i]);
                }
            } else {
                var _styles = className.split(' ');
                for (var _i = 0; _i < _styles.length; _i++) {
                    element.className += ' ' + _styles[_i];
                }
            }
        }
    }, {
        key: 'addClass',
        value: function addClass(element, className) {
            if (element.classList) element.classList.add(className);else element.className += ' ' + className;
        }
    }, {
        key: 'removeClass',
        value: function removeClass(element, className) {
            if (element.classList) element.classList.remove(className);else element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }, {
        key: 'hasClass',
        value: function hasClass(element, className) {
            if (element.classList) return element.classList.contains(className);else return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
    }, {
        key: 'find',
        value: function find(element, selector) {
            return element.querySelectorAll(selector);
        }
    }, {
        key: 'findSingle',
        value: function findSingle(element, selector) {
            return element.querySelector(selector);
        }
    }, {
        key: 'getHeight',
        value: function getHeight(el) {
            var height = el.offsetHeight;
            var style = getComputedStyle(el);

            height -= parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

            return height;
        }
    }, {
        key: 'getWidth',
        value: function getWidth(el) {
            var width = el.offsetWidth;
            var style = getComputedStyle(el);

            width -= parseFloat(style.paddingLeft) + parseFloat(style.paddingRight) + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);

            return width;
        }
    }, {
        key: 'absolutePosition',
        value: function absolutePosition(element, target) {
            var elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
            var elementOuterHeight = elementDimensions.height;
            var elementOuterWidth = elementDimensions.width;
            var targetOuterHeight = target.offsetHeight;
            var targetOuterWidth = target.offsetWidth;
            var targetOffset = target.getBoundingClientRect();
            var windowScrollTop = this.getWindowScrollTop();
            var windowScrollLeft = this.getWindowScrollLeft();
            var viewport = this.getViewport();
            var top = void 0,
                left = void 0;

            if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) top = targetOffset.top + windowScrollTop - elementOuterHeight;else top = targetOuterHeight + targetOffset.top + windowScrollTop;

            if (targetOffset.left + targetOuterWidth + elementOuterWidth > viewport.width) left = targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth;else left = targetOffset.left + windowScrollLeft;

            element.style.top = top + 'px';
            element.style.left = left + 'px';
        }
    }, {
        key: 'relativePosition',
        value: function relativePosition(element, target) {
            var elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
            var targetHeight = target.offsetHeight;
            var targetWidth = target.offsetWidth;
            var targetOffset = target.getBoundingClientRect();
            var viewport = this.getViewport();
            var top, left;

            if (targetOffset.top + targetHeight + elementDimensions.height > viewport.height) top = -1 * elementDimensions.height;else top = targetHeight;

            if (targetOffset.left + elementDimensions.width > viewport.width) left = targetWidth - elementDimensions.width;else left = 0;

            element.style.top = top + 'px';
            element.style.left = left + 'px';
        }
    }, {
        key: 'getHiddenElementOuterHeight',
        value: function getHiddenElementOuterHeight(element) {
            element.style.visibility = 'hidden';
            element.style.display = 'block';
            var elementHeight = element.offsetHeight;
            element.style.display = 'none';
            element.style.visibility = 'visible';

            return elementHeight;
        }
    }, {
        key: 'getHiddenElementOuterWidth',
        value: function getHiddenElementOuterWidth(element) {
            element.style.visibility = 'hidden';
            element.style.display = 'block';
            var elementWidth = element.offsetWidth;
            element.style.display = 'none';
            element.style.visibility = 'visible';

            return elementWidth;
        }
    }, {
        key: 'getHiddenElementDimensions',
        value: function getHiddenElementDimensions(element) {
            var dimensions = {};
            element.style.visibility = 'hidden';
            element.style.display = 'block';
            dimensions.width = element.offsetWidth;
            dimensions.height = element.offsetHeight;
            element.style.display = 'none';
            element.style.visibility = 'visible';

            return dimensions;
        }
    }, {
        key: 'fadeIn',
        value: function fadeIn(element, duration) {
            element.style.opacity = 0;

            var last = +new Date();
            var opacity = 0;
            var tick = function tick() {
                opacity = +element.style.opacity + (new Date().getTime() - last) / duration;
                element.style.opacity = opacity;
                last = +new Date();

                if (+opacity < 1) {
                    window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
                }
            };

            tick();
        }
    }, {
        key: 'fadeOut',
        value: function fadeOut(element, ms) {
            var opacity = 1,
                interval = 50,
                duration = ms,
                gap = interval / duration;

            var fading = setInterval(function () {
                opacity -= gap;

                if (opacity <= 0) {
                    opacity = 0;
                    clearInterval(fading);
                }

                element.style.opacity = opacity;
            }, interval);
        }
    }, {
        key: 'getUserAgent',
        value: function getUserAgent() {
            return navigator.userAgent;
        }
    }, {
        key: 'appendChild',
        value: function appendChild(element, target) {
            if (this.isElement(target)) target.appendChild(element);else if (target.el && target.el.nativeElement) target.el.nativeElement.appendChild(element);else throw new Error('Cannot append ' + target + ' to ' + element);
        }
    }, {
        key: 'scrollInView',
        value: function scrollInView(container, item) {
            var borderTopValue = getComputedStyle(container).getPropertyValue('borderTopWidth');
            var borderTop = borderTopValue ? parseFloat(borderTopValue) : 0;
            var paddingTopValue = getComputedStyle(container).getPropertyValue('paddingTop');
            var paddingTop = paddingTopValue ? parseFloat(paddingTopValue) : 0;
            var containerRect = container.getBoundingClientRect();
            var itemRect = item.getBoundingClientRect();
            var offset = itemRect.top + document.body.scrollTop - (containerRect.top + document.body.scrollTop) - borderTop - paddingTop;
            var scroll = container.scrollTop;
            var elementHeight = container.clientHeight;
            var itemHeight = this.getOuterHeight(item);

            if (offset < 0) {
                container.scrollTop = scroll + offset;
            } else if (offset + itemHeight > elementHeight) {
                container.scrollTop = scroll + offset - elementHeight + itemHeight;
            }
        }
    }, {
        key: 'clearSelection',
        value: function clearSelection() {
            if (window.getSelection) {
                if (window.getSelection().empty) {
                    window.getSelection().empty();
                } else if (window.getSelection().removeAllRanges && window.getSelection().rangeCount > 0 && window.getSelection().getRangeAt(0).getClientRects().length > 0) {
                    window.getSelection().removeAllRanges();
                }
            } else if (document['selection'] && document['selection'].empty) {
                try {
                    document['selection'].empty();
                } catch (error) {
                    //ignore IE bug
                }
            }
        }
    }, {
        key: 'calculateScrollbarWidth',
        value: function calculateScrollbarWidth() {
            if (this.calculatedScrollbarWidth != null) return this.calculatedScrollbarWidth;

            var scrollDiv = document.createElement("div");
            scrollDiv.className = "ui-scrollbar-measure";
            document.body.appendChild(scrollDiv);

            var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);

            this.calculatedScrollbarWidth = scrollbarWidth;

            return scrollbarWidth;
        }
    }, {
        key: 'getBrowser',
        value: function getBrowser() {
            if (!this.browser) {
                var matched = this.resolveUserAgent();
                this.browser = {};

                if (matched.browser) {
                    this.browser[matched.browser] = true;
                    this.browser['version'] = matched.version;
                }

                if (this.browser['chrome']) {
                    this.browser['webkit'] = true;
                } else if (this.browser['webkit']) {
                    this.browser['safari'] = true;
                }
            }

            return this.browser;
        }
    }, {
        key: 'resolveUserAgent',
        value: function resolveUserAgent() {
            var ua = navigator.userAgent.toLowerCase();
            var match = /(chrome)[ ]([\w.]+)/.exec(ua) || /(webkit)[ ]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

            return {
                browser: match[1] || "",
                version: match[2] || "0"
            };
        }
    }]);

    return DomHandler;
}();

exports.default = DomHandler;

/***/ }),

/***/ "./node_modules/primereact/splitbutton.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__("./node_modules/primereact/components/splitbutton/SplitButton.js");

/***/ })

})
//# sourceMappingURL=4.b652318c3539746b0aa4.hot-update.js.map