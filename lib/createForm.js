'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ElementClass = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _assign2 = require('lodash/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _mapValues2 = require('lodash/mapValues');

var _mapValues3 = _interopRequireDefault(_mapValues2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _react = require('react');

var _reactRedux = require('react-redux');

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _selectors = require('./selectors');

var selectors = _interopRequireWildcard(_selectors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formActions = actions.form;

var ElementClass = exports.ElementClass = function (_Component) {
    (0, _inherits3.default)(ElementClass, _Component);

    function ElementClass() {
        (0, _classCallCheck3.default)(this, ElementClass);
        return (0, _possibleConstructorReturn3.default)(this, (ElementClass.__proto__ || (0, _getPrototypeOf2.default)(ElementClass)).apply(this, arguments));
    }

    return ElementClass;
}(_react.Component);

var validateForm = function validateForm(fields, formValues, validateFn) {
    if (validateFn) {
        var errors = validateFn(formValues);
        if (!(0, _isEmpty3.default)(errors)) {
            var fieldsWithErrors = (0, _mapValues3.default)(errors, function (val) {
                return {
                    error: val
                };
            });
            return {
                fields: (0, _merge3.default)({}, fields, fieldsWithErrors),
                hasError: true
            };
        }
    }
    return { fields: fields, hasError: false };
};
var createForm = function createForm(config) {
    var fieldsArr = config.fields,
        formName = config.form,
        validate = config.validate,
        destroyOnUnmount = config.destroyOnUnmount;

    return function (WrappedComponent) {
        var Form = function (_Component2) {
            (0, _inherits3.default)(Form, _Component2);

            function Form() {
                (0, _classCallCheck3.default)(this, Form);
                return (0, _possibleConstructorReturn3.default)(this, (Form.__proto__ || (0, _getPrototypeOf2.default)(Form)).apply(this, arguments));
            }

            (0, _createClass3.default)(Form, [{
                key: 'createField',
                value: function createField(value, key) {
                    var change = this.props.change;

                    var setFieldValue = function setFieldValue(val) {
                        var newVal = val;
                        if ((typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object' && val.target) {
                            newVal = val.target.value || '';
                        }
                        change(formName, key, newVal, false, false);
                    };
                    var events = {
                        onChange: function onChange(val) {
                            return setFieldValue(val);
                        }
                    };
                    return (0, _defineProperty3.default)({}, key, {
                        get: function get(defaultVal) {
                            return value || defaultVal || '';
                        },
                        set: events.onChange,
                        value: value,
                        onChange: events.onChange,
                        events: events
                    });
                }
            }, {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    var defineField = this.props.defineField;

                    fieldsArr.forEach(function (field) {
                        defineField(formName, field);
                    });
                }
            }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    // TODO
                    // 生成版本的 React 会在初始化时执行一次 unmount 尚未查明原因
                    if (destroyOnUnmount) {
                        this.props.destroy(formName);
                    }
                }
            }, {
                key: 'render',
                value: function render() {
                    var _this3 = this;

                    var decoratedFields = void 0;
                    var _props = this.props,
                        touch = _props.touch,
                        formValues = _props.formValues,
                        formDefinition = _props.formDefinition,
                        formMeta = _props.formMeta;

                    var fieldsObjArr = (0, _map3.default)(fieldsArr, function (key) {
                        var fieldValue = formValues[key] || '';
                        return _this3.createField(fieldValue, key);
                    });
                    fieldsObjArr.forEach(function (field) {
                        decoratedFields = (0, _assign3.default)({}, decoratedFields, field);
                    });
                    var collectedValues = {};
                    formDefinition.forEach(function (def) {
                        var key = def.name;
                        collectedValues[key] = formValues[key];
                    });

                    var _validateForm = validateForm(decoratedFields, collectedValues, validate),
                        fieldsWithError = _validateForm.fields,
                        hasError = _validateForm.hasError;

                    decoratedFields = fieldsWithError;
                    decoratedFields = (0, _merge3.default)({}, decoratedFields, formMeta);
                    var handleSubmit = function handleSubmit(fn) {
                        return function (e) {
                            touch(formName, formDefinition.map(function (def) {
                                return def.name;
                            }));
                            if (!hasError) {
                                fn(collectedValues);
                            }
                        };
                    };
                    return (0, _react.createElement)(WrappedComponent, (0, _assign3.default)({}, this.props, {
                        fields: decoratedFields,
                        handleSubmit: handleSubmit
                    }));
                }
            }]);
            return Form;
        }(_react.Component);

        return (0, _reactRedux.connect)(function (state) {
            return {
                form: selectors.fullForm(formName)(state),
                formValues: selectors.formValues(formName)(state),
                formDefinition: selectors.formDefinition(formName)(state),
                formMeta: selectors.formMeta(formName)(state)
            };
        }, formActions)(Form);
    };
};
exports.default = createForm;