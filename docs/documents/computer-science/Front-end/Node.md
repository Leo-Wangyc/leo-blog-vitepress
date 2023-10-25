#Node

# Node 简介

node.js 是一个基于 chrome V8 引擎的 javascript 运行环境`runtime`，不是一门语言，不包含 BOM 和 DOM

js 由 ECMAScript，DOM, BOM 组成

node.js 由 ECMAScript 和 Node 模块 API 组成

# 模块导入导出

## import

## require

## export

module.export 优先级要高于 export

```js
export const demo1 = {
  name: 'demo1'
}
module.export const demo1 = {
  name: 'demo2'
}
```

# fs 模块

## fs.readFile()

文件读取

`fs.readFile('path', 'encode scheme', callback)`

- path： 文件路径(./demo.js)
- encode scheme：编码方式（utf-8...）
- callback，回调函数(err, doc)=>{ err: 状态码， doc: 文件读取结果 }

## fs.writeFile()

文件写入

`fs.writeFile('path', content, callback)`

- path： 文件路径(./demo.txt)
- content：文件写入内容
- callback，回调函数(err, doc)=>{ err: 状态码， doc: 文件写入结果 }，注，如果当前文件夹中没有 path 中写入的对应文件

，那么会直接新建一个文件

##path 模块

Q: 为什么需要 path 模块？

A: 因为在不同的操作系统中，path 的写法不固定，windows 上是\/, linux 上是/

## path.join

路径拼接

`path.join('path1', 'path2', ...)`

- path1： 文件路径 1
- path2：文件路径 2
- ...

例如，要读取 User/Documents/Demo/demo.txt，那么，就可以使用

path.join('User', 'Documents', 'Demo', 'demo.txt')来进行路径编写

但是一般来说，我们在 fs.readFile 时会使用绝对路径，而不使用相对路径，因为相对路径一般是相对于命令行当前所在目录，而不是文件所在目录，故而使用`__dirname`来表示当前的文件所处目录

path.join(\_\_dirname, '01demo.js')

# 第三方模块

## npm

npm (node package management) node 的第三方模块管理工具

###nrm

nrm (npm registry manager) npm 下载地址切换工具，可用于管理镜像源

## gulp
