/**
 * @author mat.he 2018.05.14
 * Compiler
 */

import {
    isDirective,
    isEventDirective,
    isElementNode,
    isTextNode
} from '../util/index';

import {
    compilerUtils,
    updater
} from './compilerUtils';

class Compiler {
    constructor(el, vm) {
        this.$vm = vm;
        this.$el = isElementNode(el) ? el : document.querySelector(el);

        if (this.$el) {
            this.$fragment = this.nodeFragment(this.$el);
            this.compileElement(this.$fragment);
            this.$el.appendChild(this.$fragment);
        }
    }

    nodeFragment(el) {
        let fragment = document.createDocumentFragment(),
            child;

        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }

    compileElement(el) {
        let me = this,
            childNodes = el.childNodes;

        [].slice.call(childNodes).forEach((node) => {
            let text = node.textContent,
                reg = /\{\{((?:.|\n)+?)\}\}/;

            // 按元素节点方式编译
            if (isElementNode(node)) {
                me.compile(node);
            } else if (isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            // 遍历编译子节点
            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
    }

    compile(node) {
        let nodeAttrs = node.attributes;

        [].slice.call(nodeAttrs).forEach((attr) => {
            let attrName = attr.name,
                dir = attrName.substring(2);

            if (isDirective(attrName)) {
                let exp = attr.value;

                if (isEventDirective(dir)) {
                    this.eventHandler(node, this.$vm, exp, dir);
                } else {
                    compilerUtils[dir] && compilerUtils[dir](node, this.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });
    }

    compileText(node, exp) {
        compilerUtils.text(node, this.$vm, exp);
    }

    eventHandler(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    }

}

export default Compiler;