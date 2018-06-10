/**
 * @author mat.he 2018.05.14
 * example
 */

import VM from './index';

window.vm = new VM({
    el : '#app',
    data : {
        title : 'example',
        name : 'mat.he',
        input : 'this is a text-input'
    }
});

