Webpack

# 1 前端模块化

## 1.1 早期模块化实现

由于 js 的语言特性，var 变量是直接挂载到 window 的顶级对象上，早期写 js 代码的时候，用 export 导出，再在总的 app.js 中导入的时候，很容易就出现了变量命名冲突的问题，而当初，js 并没有 let 这种定义特定作用域的语法，所以，如果当时要解决命名冲突的问题，往往人们使用导出一个对象的方式

```javascript
export var a = {
  name: "Leo",
  age: 18,
};
```

这样，导入该文件后，就可以直接使用 a.name，a.age 调用属性，解决变量命名冲突的问题

但是，这种方法也有一个弊端，那就是整个对象完全暴露在外，可以通过点属性，获取任意属性的值并进行修改，十分不安全，考虑到函数具有**单独的作用域**，于是，早起的模块化逻辑就出现了，即使用——**立即执行函数**：

```javascript
(function (window) {
  // 2.使用函数自调用，形成一个专属作用域，并接受window全局对象
  var name = "Leo";
  var age = 18;
  function introduce() {
    console.log("My name is" + name);
  }
  window.introduce = introduce; // 3.将函数作用域内需要暴露出去的属性或者方法，挂载到window上
})(window); // 1.传入window全局对象
```

## 1.2 模块化优点

- 作用域封装
- 代码重用
- 解除耦合

## 1.3 模块化进化过程

> 详细的模块化语法可见 ES6.md 中的模块化笔记

- commonJs
- AMD
- ES6 Module（export/ import）

# 2 Webpack 打包机制

> 先简单讲一下打包的原理，关于 webpack 的源码，可后续做笔记补充！

Webpack 的打包机制其实和 1.1 中所提到的立即执行函数是一样的！

其中打包过程为

1. **从入口文件开始，分析整个应用的依赖树**，入口文件中会 import 各种项目中的文件，层层依赖相套，webpack 要做的，就是分析，并整理成一个依赖树
2. **将每个依赖模块包装起来，放到一个数组中等待调用**，按照上面的说法，webpack 本质是一个立即执行函数，那么，依赖树数组，就会是该立即执行函数的入参
3. **实现模块加载的方法，并把它放到模块执行的环境中，确保模块间可以互相调用**
4. **把执行入口文件的逻辑放在一个函数表达式中，并立即执行这个函数**，由此，便会开始不断层层调用，实现项目的运行

主要打包过程代码展示：_结合 1.1 中立即执行函数看，更容易懂_

```javascript
(function(){	// 本身是一个立即执行函数
  var installedModules = {};	// 设置一个对象，用于存储已经加载过的模块内容
  function _webpack_require_(moduled){	// 核心内容，用于检查模块是否加载过，若加载过，返回，若没有，则将该模块放进installedModules中，防止二次加载，同时，执行该模块
    /*code*/
  }
  // other code content...
  return _webpack_require_(0)	// entry file 返回值是入口文件，此时webpack将会直接调用入口文件
})([*modules array*])
```

具体的\_webpack*require*(moduleid)函数就不细致展开写了，详情可以参考视频资料

> webpack 课程，第 55 分钟开始
>
> https://www.bilibili.com/video/BV1a741197Hn/?spm_id_from=333.788.recommend_more_video.-1

# 3 package.json

## 3.1 语义化版本

- ^version：保证中版本和小版本

  ^1.0.1 --> 1.x.x

- ~version：保证小版本

  ^1.0.1 --> 1.0.x

# 4 webpack.config.json

## 4.1 核心概念

1. webpack 的默认配置文件是**webpack.config.json**

   ```javascript
   // 整体一览------------------------------------
   const path = require("path");

   module.export = {
     entry: "./src/index.js",
     output: {
       path: path.resolve(__dirname, "dist"), // 指定输出的目录，目录必须为绝对路径，不能是相对路径
       filename: "main.js", // 指定输出的文件名
     },
     mode: "production",
     devtool: "source-map",
     module: {
       rules: [
         {
           test: /\.css$/,
           use: ["style-loader", "css-loader"], // 例如此处，先执行css-loader再实行style-loader
         },
       ],
     },
   };
   ```

2. **entry**

   用于指定 webpack 的入口文件，从哪个文件开始打包，如果不设置，则默认为 src/index.js

   ```javascript
   entry: "./src/index.js";
   ```

3. **output**

   用于指定项目打包的输出，默认为 dist

   ```javascript
   const path = require('path')
   output: {
     path: path.resolve(__dirname, 'dist'), 		// 指定输出的目录，目录必须为绝对路径，不能是相对路径
     filename: 'main.js', 	// 指定输出的文件名
   }
   ```

4. **mode**

   代表当前编译的环境

   有三个值【none, development, production】，默认为 production，会对代码进行压缩，development 则不会

5. **devtool**

   ```javascript
   devtool: 'source-map',
   ```

6. **module**

   webpack 只能打包 js 和 json 文件，其他类型，如 css, sass, less 等需要编译器协助打包，前提，**需要先下载依赖包 style-loader 和 css-loader**

   - rules

     ```javascript
     // 用于给指定文件后缀名的文件添加loader协助编译，loader执行顺序从右到左
     module: {
       rules: [
         {
           test: /\.css$/,
           use: ["style-loader", "css-loader"], // 例如此处，先执行css-loader再实行style-loader
         },
       ];
     }
     ```

7.
