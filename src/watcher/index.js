/**
 * @author mat.he 2018.05.14
 * Watcher
 */

import Dep from '../observer/dep';
import { isFunction } from '../util/index';

let uid = 0;

class Watcher {
    constructor(vm, expOrFn, callback) {
       this.vm = vm;
       this.id = uid++;
       this.exp = expOrFn;
       this.callback = callback;
       this.oldValue = '';
       if (isFunction(expOrFn)) {
            this.getter = expOrFn;
        } else {
            this.getter = this.parseGetter(expOrFn);
        }
       // 将自己添加到订阅器的操作
       this.value = this.get();
    }

    update () {
        this.run();
    }

    run () {
        let newVal = this.get(),
            oldVal = this.value;
        if (newVal === oldVal) {
            return;
        }
        this.value = newVal;
        // 将newVal, oldVal挂载到MVVM实例上
        this.callback.call(this.vm, newVal, oldVal);
    }

    get () {
        let value;
        Dep.target = this;
        // 强制执行监听器里的get函数
        value = this.getter.call(this.vm, this.vm);
        Dep.target = null;
        return value;
    }

    parseGetter (exp) {
        let exps;
        if (/[^\w.$]/.test(exp)) {
            return; 
        } 
        exps = exp.split('.');
        return function(obj) {
            for (var i = 0, len = exps.length; i < len; i++) {
                if (!obj) return;
                obj = obj[exps[i]];
            }
            return obj;
        }
    }
}

export default Watcher;