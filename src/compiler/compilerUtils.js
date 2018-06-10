/**
 * @author mat.he 2018.05.14
 * compileUtils
 */


import Watcher from '../watcher/index';

// 缓存当前执行input事件的input dom对象
let $elm,
    timer = null,

    // 指令处理集合
    compilerUtils = {
        html (node, vm, exp) {
            this.bind(node, vm, exp, 'html');
        },

        text (node, vm, exp) {
            this.bind(node, vm, exp, 'text');
        },

        model (node, vm, exp) {
            let me = this,
                val;
            this.bind(node, vm, exp, 'model');
            val = this._getVmVal(vm, exp);

            node.addEventListener('input', (e) => {
                let newVal = e.target.value;
                $elm = e.target;

                if (val === newVal) {
                    return;
                }
                clearTimeout(timer);
                timer = setTimeout(function () {
                    me._setVmVal(vm, exp, newVal);
                    val = newVal;
                });
            });
        },

        bind (node, vm, exp, dir) {
            let updaterFn = updater[dir + 'Updater'],
                val = this._getVmVal(vm, exp);

            updaterFn && updaterFn(node, val);

            new Watcher(vm, exp, (value, oldValue) => {
                updaterFn && updaterFn(node, value, oldValue);
            });
        },

        eventHandler (node, vm, exp, dir) {
            let eventType = dir.split(':')[1],
                fn = vm.$options.methods && vm.$options.methods[exp];

            if (eventType && fn) {
                // fn.bind(vm) 将作用域指向vm
                node.addEventListener(eventType, fn.bind(vm), false);
            }
        },

        _getVmVal (vm, exp) {
            let val = vm;
            let exps = exp.split('.');
            exps.forEach((key) => {
                key = key.trim();
                val = val[key];
            });

            return val;
        },

        _setVmVal (vm, exp, newVal) {
            let val = vm;
            let exps = exp.split('.');

            exps.forEach((key, index) => {
                key = key.trim();
                if (index < exps.length - 1) {
                    val = val[key];
                } else {
                    val[key] = newVal;
                }
            });
        }
    },

    // 指令渲染集合
    updater = {
        htmlUpdater (node, value) {
            node.innerHTML = typeof value === 'undefined' ? '' : value;
        },
        textUpdater (node, value) {
            node.textContent = typeof value === 'undefined' ? '' : value;
        },
        modelUpdater (node, value, oldValue) {
            if ($elm === node) {
                return false;
            }
            $elm = void 0;
            node.value = typeof value === 'undefined' ? '' : value;
        }
    };

export {
    compilerUtils,
    updater
};