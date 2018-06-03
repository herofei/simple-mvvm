# simple-mvvm
a mvvm framework

## Getting started

```bash
# 安装依赖
npm install

# 编译打包
npm run watch
```

## Example
```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>MVVM</title>
</head>

<body>
  <div id="app">
    <h2>{{title}}</h2>
    <div>my name is {{name}}</div>
    <input type="text" v-model="input">
  </div>
<script type="text/javascript" src="./app.bundle.js"></script></body>

</html>
```

```javascript
import VM from './index';

window.vm = new VM({
    el : '#app',
    data : {
        title : 'example',
        name : 'mat.he',
        input : 'this is a text-input'
    }
})
```


修改实例vm的值,观察页面变化。

```javascript

vm.name = 'John';
vm.title = 'test example';
```

在input框中输入值'hello vm',观察vm的变化。

```javascript

console.log(vm.input);  // hello vm
```