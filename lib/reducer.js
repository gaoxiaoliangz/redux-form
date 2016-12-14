'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _mergeWith3 = require('lodash/mergeWith');

var _mergeWith4 = _interopRequireDefault(_mergeWith3);

var _assign5 = require('lodash/assign');

var _assign6 = _interopRequireDefault(_assign5);

var _merge3 = require('lodash/merge');

var _merge4 = _interopRequireDefault(_merge3);

var _effects;

exports.default = form;

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FORM = actions.FORM;
var effects = (_effects = {}, (0, _defineProperty3.default)(_effects, FORM.INITIALIZE, function (state, action) {
    var payload = action.payload,
        _action$meta = action.meta,
        keepDirty = _action$meta.keepDirty,
        form = _action$meta.form;

    var formState = (0, _defineProperty3.default)({}, form, {
        values: payload
    });
    if (typeof keepDirty === 'undefined' || keepDirty) {
        return (0, _merge4.default)({}, state, formState);
    }
    return (0, _assign6.default)({}, state, (0, _assign6.default)({}, state[form], formState));
}), (0, _defineProperty3.default)(_effects, FORM.CHANGE, function (state, action) {
    var payload = action.payload,
        _action$meta2 = action.meta,
        field = _action$meta2.field,
        form = _action$meta2.form;
    // todo
    // 应该有更好的算法

    return (0, _assign6.default)({}, state, (0, _defineProperty3.default)({}, form, (0, _assign6.default)({}, state[form], {
        values: (0, _assign6.default)({}, state[form]['values'] || {}, (0, _defineProperty3.default)({}, field, payload))
    })));
}), (0, _defineProperty3.default)(_effects, FORM.DEFINE_FIELD, function (state, action) {
    var name = action.payload.name,
        form = action.meta.form;

    return (0, _mergeWith4.default)({}, state, (0, _defineProperty3.default)({}, form, {
        definition: [{
            name: name
        }]
    }), function (objValue, srcValue) {
        if ((0, _isArray3.default)(objValue)) {
            return objValue.concat(srcValue);
        }
    });
}), (0, _defineProperty3.default)(_effects, FORM.RESET, function (state, action) {
    var form = action.meta.form;

    return (0, _assign6.default)({}, state, (0, _defineProperty3.default)({}, form, {
        definition: (0, _get3.default)(state, [form, 'definition'], {}),
        meta: (0, _get3.default)(state, [form, 'meta'], {}),
        values: {}
    }));
}), (0, _defineProperty3.default)(_effects, FORM.DESTROY, function (state, action) {
    var form = action.meta.form;

    return (0, _omit3.default)(state, [form]);
}), (0, _defineProperty3.default)(_effects, FORM.TOUCH, function (state, action) {
    var _action$meta3 = action.meta,
        fields = _action$meta3.fields,
        form = _action$meta3.form;

    var touchedFields = {};
    fields.forEach(function (field) {
        touchedFields[field] = {
            touched: true
        };
    });
    return (0, _merge4.default)({}, state, (0, _defineProperty3.default)({}, form, {
        meta: touchedFields
    }));
}), _effects);
function form() {
    var formState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    var effect = effects[action.type];
    return effect ? effect(formState, action) : formState;
}