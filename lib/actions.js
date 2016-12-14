'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var FORM = exports.FORM = {
    CHANGE: 'form/CHANGE',
    RESET: 'form/RESET',
    TOUCH: 'form/TOUCH',
    DEFINE_FIELD: 'form/DEFINE_FIELD',
    DESTROY: 'form/DESTROY',
    INITIALIZE: 'form/INITIALIZE'
};
var initialize = exports.initialize = function initialize(form, values, keepDirty) {
    return { type: FORM.INITIALIZE, meta: { form: form, keepDirty: keepDirty }, payload: values };
};
var change = exports.change = function change(form, field, value, touch, persistentSubmitErrors) {
    return { type: FORM.CHANGE, meta: { form: form, field: field, touch: touch, persistentSubmitErrors: persistentSubmitErrors }, payload: value };
};
var touch = exports.touch = function touch(form, fields) {
    return { type: FORM.TOUCH, meta: { form: form, fields: fields } };
};
var defineField = exports.defineField = function defineField(form, name) {
    return { type: FORM.DEFINE_FIELD, meta: { form: form }, payload: { name: name } };
};
var reset = exports.reset = function reset(form) {
    return { type: FORM.RESET, meta: { form: form } };
};
var destroy = exports.destroy = function destroy(form) {
    return { type: FORM.DESTROY, meta: { form: form } };
};
// 方便取出所有的 form 命名空间下的所有 action
var form = exports.form = {
    change: change,
    touch: touch,
    reset: reset,
    defineField: defineField,
    destroy: destroy
};