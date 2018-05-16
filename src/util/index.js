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

function isFunction(fn) {
    return typeof fn === 'function';
}

function isDirective(attr) {
    return attr.indexOf('v-') === 0;
}

function isEventDirective(dir) {
    return dir.indexOf('on') === 0;
}

function isElementNode(node) {
    return node.nodeType == 1;
}

function isTextNode(node) {
    return node.nodeType == 3;
}

export {
    isUndef,
    isTrue,
    isFalse,
    isObject,
    isFunction,
    isDirective,
    isEventDirective,
    isElementNode,
    isTextNode
};