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

    compile(node) {
        let nodeAttrs = node.attributes;

        [].slice.call(nodeAttrs).forEach((attr) => {
            let attrName = attr.name,
                dir = attrName.substring(2);

            if (isDirective(attrName)) {
                let exp = attr.value;

                if (isEventDirective(dir)) {
                    this.eventHandler(node, self.$vm, exp, dir);
                } else {
                    compilerUtils[dir] && compilerUtils[dir](node, self.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        })
    }

    eventHandler (node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    }

}