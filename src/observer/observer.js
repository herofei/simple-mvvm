/**
 * @author mat.he 2018.05.14
 * Observer
 */

import {
    isObject
} from 'util/index';
import Dep from './dep';

class Observer {
    constructor(data) {
        if (!isObject(data)) {
            return;
        }
        this._data = data;
        this.walk(this._data);
    }

    walk(data) {
        Object.keys(data).forEach((key) => {
            this.defineReactive(data, key, data[key]);
        });
    }

    defineReactive(obj, key, value) {
        let me = this,
            dep = new Dep();
        if (value && isObject(value)) {
            this.walk(value);
        }
        Object.defineProperty(obj, key, {
            get() {
                let watcher = Dep.target;
                if (watcher && dep.subs[watcher.id]) {
                    dep.addDep(watcher);
                }
                return value;
            },

            set(newValue) {
                if (value !== newValue) {
                    if (value && isObject(newValue)) {
                        me.walk(newValue);
                    }
                    value = newValue;
                    dep.notify();
                }
            }
        })
    }
}

function observe(value, asRootData) {
    if (!value || !isObject(value)) {
        return;
    }
    return new Observer(value);
}

export {
    Observer,
    observe
}