/**
 * @author mat.he 2018.05.14
 * 订阅器
 */

class Dep {
    constructor() {
        // 订阅者列表
        this.subs = [];
    }

    // 添加订阅者
    addSub(watcher) {
        if (watcher) {
            this.subs.push(watcher);
        }
    }

    removeSub(watcher) {
        let index = this.subs.indexOf(watcher);
        if (index !== -1) {
            this.subs.splice(index, 1);
        }
    }

    // 通知所有订阅者更新
    notify() {
        this.subs.forEach((watcher) => {
            watcher.update();
        });
    }
}

Dep.target = null;

export default Dep;