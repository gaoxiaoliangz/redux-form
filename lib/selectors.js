'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formDefinition = exports.formMeta = exports.formValues = exports.fullForm = undefined;

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _reselect = require('reselect');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FORM = 'form';
var fullForm = exports.fullForm = function fullForm(name) {
    return function (state) {
        return (0, _get3.default)(state, [FORM, name], {});
    };
};
var formValues = exports.formValues = function formValues(name) {
    return (0, _reselect.createSelector)(fullForm(name), function (form) {
        return form['values'] || {};
    });
};
var formMeta = exports.formMeta = function formMeta(name) {
    return (0, _reselect.createSelector)(fullForm(name), function (form) {
        return form['meta'] || {};
    });
};
var formDefinition = exports.formDefinition = function formDefinition(name) {
    return (0, _reselect.createSelector)(fullForm(name), function (form) {
        return form['definition'] || [];
    });
};