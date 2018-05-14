/**
 * @author mat.he 2018.05.14
 */

let _;

function isUndef(v) {
    return v === undefined || v === null;
}

function isTrue(v) {
    return v === true;
}

function isFalse(v) {
    return v === false;
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

function isFunction (fn) {
    return typeof expOrFn === 'function';
}

export default _ = {
    isUndef,
    isTrue,
    isFalse,
    isObject
};