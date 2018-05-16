/**
 * @author mat.he 2018.05.14
 * vm
 */

import { 
    isObject,
    isFunction 
} from './util/index';

import {
    Observer,
    observe
} from './observer/observer';

import Compiler from './compiler/compiler';
import Watcher from './watcher/index';
class VM {
    constructor(options = {}) {
        this.$options = options;
        let data = this._data = this.$options.data;
        // 数据代理
        // 实现 vm.xxx -> vm._data.xxx
        Object.keys(data).forEach((key) => {
            this._proxyData(key);
        });

        this._initComputed();

        observe(data, this);

        this.$compile = new Compiler(options.el || document.body, this)
    }

    $watch (key, cb) {
        new Watcher(this, key, cb);
    }

    _proxyData (key) {
        let me = this;
        Object.defineProperty(me, key, {
            configurable: false,
            enumerable: true,
            get () {
                return me._data[key];
            },
            set (newVal) {
                me._data[key] = newVal;
            }
        });
    }

    _initComputed () {
        let computed = this.$options.computed;
        if (isObject(computed)) {
            Object.keys(computed).forEach((key) => {
                Object.defineProperty(this, key, {
                    get () {
                        let com = computed[key];
                        return isFunction(com) ? com : com.get;
                    },
                    set () {}
                });
            });
        }
    }
}

window.VM = VM;

export default VM;