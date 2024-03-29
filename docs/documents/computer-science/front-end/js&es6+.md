## Js 的组成

- ECMAScript
- DOM
- BOM



## 严格模式

> 严格模式 _strict model_

**严格模式语法**

若是整个文件都使用，则定义在文件第一行，若仅在某一函数中使用，则定义在该函数内的第一行

```javascript
"use strict"; //全局

function func() {
  "use strict"; //仅在函数内部
}
```

**严格模式区别**

1. 严格模式下，不允许未声明就直接赋值

   ```javascript
   a = 10; // ok
   ```

   ```javascript
   "use strict";
   a = 10; // error
   var a = 10; // ok
   ```

2. 严格模式下，不允许属性重名

   ```javascript
   var obj = {
     a: "hello",
     a: "world",
   }; // ok
   ```

   ```javascript
   "use strict";
   var obj = {
     a: "hello",
     a: "world",
   }; // error
   ```





## 数据类型

### 值类型

- boolean
- null
- undefined
- number
- string
- bigInt
- symbol



### 引用类型

引用类型可以说只有一个，即 Object，也可以说，有如下三个，加上两个特殊对象，正则和日期

- Object
- Function
- Array
- RegExp(正则)
- Date(日期)



### Infinity

`Infinity` 是 JavaScript 中的一个特殊常量，表示无穷大

```javascript
console.log(Infinity + 1); // Infinity
console.log(Infinity * Infinity); // Infinity
console.log(Infinity - Infinity); // NaN
console.log(0 * Infinity); // NaN
```

`Infinity` 也可以在数组方法中使用

```js
var arr = [1, [2, [3, [4, 5]]]];
console.log(arr.flat(Infinity)); // [1, 2, 3, 4, 5]
```



### 虚值与真值

简单的来说 **虚值** 就是 **在转换为布尔值时** 变为 **false** 的值，变为 **true** 的值则为 **真值** 。

如何检查值是否虚值？使用 **Boolean 函数**或者 **!!** 运算符。

虚值(`Falsy`)

- 长度为 **0** 的字符串
- 数字 **0**
- `false`
- `undefined`
- `null`
- `NaN`

真值(`Truthy`)

- 空数组
- 空对象
- 其他

### 类型判断

四种方式：

- **typeof**

  用于判断基本类型

  缺点：只能判断基本类型，typeof null == object

- **instanceof**

  用于判断是谁的实例

- **constructor**

  笔记待补充

- **Object.prototype.toStirng.call**

  > 参考文档：
  >
  > https://zhuanlan.zhihu.com/p/118793721

  这种方式会返回一个字符串，格式如下[Object xxx]，只需要截取后面一截即可，或者直接做判断

  ```js
  function isType(value, type) {
    Object.prototype.toStirng.call(value) == `[object ${type}]`;
  }
  isType("123", String); // true
  isType("123", Number); // false
  ```

**Object.prototype.toString.call()的原理**：

`Object.prototype.toString` 的默认实现（在 ECMAScript 规范中）被设计为对任何对象执行时，都会返回一个包含其 `[[Class]]` 属性值的字符串。

每个 JavaScript 对象在内部都有一个 `[[Class]]` 属性，这个属性不能直接被访问。这个属性基本上定义了对象的内部类型。例如，如果是一个数组，它的 `[[Class]]` 将是 `"Array"`；如果是一个日期对象，它的 `[[Class]]` 将是 `"Date"`。

使用该方式的代码如下：

```typescript
let num = 10;
Object.prototype.toString.call(num);

// 以上述代码为例，本质上，是通过call，先换成num的上下文环境
// 然后，再调用Object.prototype.toString()方法，该方法会直接返回对象内部的 `[[Class]]` 属性
```

在 JavaScript 中，几乎所有的数据类型都有 `toString` 方法

但是直接调用该方法不会返回对应的[[Class]]属性，是因为**每种不同的数据类型都对 toString 这个方法进行了覆写**

例如:

```typescript
"Hello World".toString(); // "Hello World"
(123).toString(); // "123"
(10).toString(2); // "1010"（二进制表示）
true.toString(); // "true"
false.toString(); // "false"
Symbol("desc").toString(); // "Symbol(desc)"
BigInt(123).toString(); // "123"
({}).toString(); // "[object Object]"
Object.prototype.toString.call({}); // "[object Object]"
[1, 2, 3].toString(); // "1,2,3"
```

## 对象扩展

### 对象属性描述符

对象内的每一个属性都有自己对应的描述符，分别对应一些不同的功能

- **value**

  value 即对象的值

- **writable**

  决定了是否可以修改属性的值

- **configurable**

  决定了是否可以配置该属性的属性描述符，即是否可以通过 defineProperty(…)方法来修改该属性描述符，同时，configurable: false 还会**禁止删除**这个属性

- **enumerable**

  控制属性是否会出现在对象的属性枚举中，例如，若为 false，则 for..in 循环会忽略掉该属性

### getOwnPropertyDescriptor

- **说明**：

  Object.getOwnPropertyDescriptor 用于获取某一属性的描述符，返回值是描述符对象

- **语法**：

  ```javascript
  Object.getOwnPropertyDescriptor(obj, property);
  ```

  ```javascript
  let obj = { foo: 123 };
  Object.getOwnPropertyDescriptor(obj, "foo");
  //  { value: 123, writable: true, enumerable: true, configurable: true }
  ```

### getOwnPropertyDescriptors

- **说明**：

  Object.getOwnPropertyDescriptor 用于获取某一对象的全部属性（**不包含继承过来的属性**）描述符，返回值是描述符对象，与上面的区别是最后多了一个 s

- **语法**：

  ```javascript
  Object.getOwnPropertyDescriptors(obj);
  ```

  ```javascript
  let obj = { foo: 123 };
  Object.getOwnPropertyDescriptors(obj);
  //  { foo:{ value: 123, writable: true, enumerable: true, configurable: true } }
  ```

### Object.defineProperty

- **说明**：

  Object.defineProperty 用于设置对象中某一属性的属性描述符，若属性的属性描述符中 configurable 为 false，则该方法会失效，同时，里面可以设置 get 和 set 方法，当外部取值和修改值的时候自动触发两个方法

- **语法**：

  ```javascript
  Object.defineProperty(object, property, descriptor);
  ```

  ```javascript
  let obj = { foo: 123 };
  Object.defineProperty(obj, foo, {
    writable: false,
  });
  ```

  ```javascript
  let obj = { foo: 123 };
  Object.defineProperty(obj, {
    foo: {
      get() {
        console.log("获取了值");
      },
      set() {
        console.log("设置了值");
      },
      writable: false,
    },
  });
  obj.foo; // '获取了值'
  obj.foo = 456; // '设置了值'
  ```

### Object.create

**说明**：

Object.create 用于创建一个新的对象并添加新的属性，可以用来实现**对象的继承**

**语法**：

```javascript
Object.create(obj, newProperty);
```

```javascript
let obj = { foo: 123 };
let obj2 = Object.create(obj, {
  name: {
    value: 'hello',
    writable: false
    ...
  }
})	// 这里obj2就继承了obj的所有属性，并添加上了新的属性，obj中的属性将会全部存在于obj2的__proto__中
```

**与 new Object 继承的区别**

new object 实现的继承，父对象的属性会直接添加到子类中，子类可以直接通过点属性(.xxx)的方式点出来，继承的属性存在在子类上

```javascript
// new Object() 方式创建
var a = { rep: "apple" };
var b = new Object(a);
console.log(b); // {rep: "apple"}
console.log(b.__proto__); // {}
console.log(b.rep); // {rep: "apple"}
```

而 create 实现的继承，父对象的属性会添加到子类的原型上，子类也可以直接点出来，但是继承的属性不会存在于子类上

```javascript
// Object.create() 方式创建
var a = { rep: "apple" };
var b = Object.create(a);
console.log(b); // {}
console.log(b.__proto__); // {rep: "apple"}
console.log(b.rep); // {rep: "apple"}
```



### obj.hasOwnProperty

**说明**

用于判断对象自身是否存在某一**非继承**的属性

**语法**

```javascript
function foo() {
  this.name = "foo";
  this.sayHi = function () {
    console.log("Say Hi");
  };
}

foo.prototype.sayGoodBy = function () {
  console.log("Say Good By");
};

let myPro = new foo();

console.log(myPro.name); // foo
console.log(myPro.hasOwnProperty("name")); // true
console.log(myPro.hasOwnProperty("toString")); // false
console.log(myPro.hasOwnProperty("hasOwnProperty")); // fasle
console.log(myPro.hasOwnProperty("sayHi")); // true
console.log(myPro.hasOwnProperty("sayGoodBy")); // false
console.log("sayGoodBy" in myPro); // true
```



### in 关键字

可以用 in 进行循环，也可以用于做一些判断

**用作循环的情况**

用作循环即是 for..in 循环，可以实现类似数组 map 的功能，但是 for..in 可以循环对象，也可以循环数组

- 用作循环数组的时候，循环出来的内容是**数组的 id**

  ```typescript
  let arr2 = ["Tom", "Jerry", "Bob"];
  for (let i in arr2) {
    console.log(i);
  } // 0 1 2
  ```

- 用作循环对象的时候，循环出来的内容是**对象的 Key**

  ```typescript
  let obj = { name: "leo", height: "180" };
  for (let i in obj) {
    console.log(i);
  } // name  height
  ```

**用作判断某一个值是否在数组/对象内**

注意，用于判断的时候，同样遵循上述的原则，数组为 id，对象为 key

```typescript
let arr = ["a", "b", "c"];
console.log("b" in arr); // false
console.log(2 in arr); // true

let obj = { name: "leo", age: 18 };
console.log(18 in obj); // false
console.log("name" in obj); // true, 同时要注意，此处的key必须为字符串格式，若不加''，则会判断为变量
```

> 参考文档：
>
> https://www.cnblogs.com/memphis-f/p/12073013.html





## 变量扩展

### let, const

- var 所造成的一些问题

  1. 变量提升
  2. 允许同名变量多次定义
  3. 全局变量污染
  4. 作用域为全局

- Const 常量

  常量只要保证地址不改变即可，若为值类型，则值不可变，若为引用类型，只要地址不变，堆内容改变不会报错

### const 的解析语法

```javascript
// item中有date字段，将其重新赋值给scheduleDate
const { subHisId = "", deptId = "", scheduleDate: date = "" } = item;
```





## 函数扩展

### arguments

函数中隐式具有 arguments 属性，arguments 是一个类数组对象，其中存储着函数的全部入参，因为其类数组的特性，其不具有 slice 等数组方法，但是可以使用如下方式转换成数组，或者调用数组方法

```js
function func() {
  console.log(arguments.slice()); // 报错，其为类数组，不具有数组方法
  console.log([].slice.call(arguments)); // [1, 2, '3']
}
func(1, 2, "3");
```



### 箭头函数

`arrow function`

- 特点

  1. 没有 this
  2. 没有 arguments

- **传统方式的 this 指向**

  箭头函数可以改变 this 的指向，按照传统的方式，谁调用该函数，该函数的 this 就指向谁，如下

  ```javascript
  var a = 1;
  function add() {
    let a = 5;
    setInterval(function () {
      this.a++;
    }, 2000);
  }
  add();
  ```

  在上述例子中，setInterval 并没有对象调用，故其 this 默认指向 window，所以执行 a++的时候，并不会改变 add 函数中的 a 的值，而是改变的外部 a 的值

- **箭头函数的 this 指向**

  **始终指向自身所在的代码块的对象**



### call,apply,bind

> 参考视频：
>
> https://www.bilibili.com/video/BV1XX4y1w7R6?from=search&seid=9741743272953119387

这三个函数本质上都是一样的，都是函数方法，用于改变函数的 this 的指向，区别及使用方法如下

**call**

函数方法，用于改变 this 指向，且会**直接调用！**无返回值

```typescript
let cat = {
	name: '喵喵',
}
let dog = {
  name: '汪汪',
  sayName(){		// 注意，此处不可以使用箭头函数，箭头函数会改变This指向到该函数定义的时候的作用域指向的对象，而js中作用域仅有函数才会存在，对象不存在作用域，所以，dog对象没有作用域，sayName的外部作用域就是window，所以this会指向window
    console.log('My name is' + this.name)
  }
  eat(food1, food2){
    console.log('I like eat' + food1 + 'and' + food2)
	}
}
// call方法会把函数中的This指向后面的第一个参数
dog.sayName.call(cat); // My name is 喵喵
dog.eat.call(cat, '鱼', '猫饼干')
```

**apply**

与 call 其他基本一致，函数也会**直接调用**，但是，apply 传参接受的参数是一个数组，无返回值

```typescript
//......  // 和上面一致
dog.eat.call(cat, ["鱼", "猫饼干"]);
```

**bind**

bind 与 call 和 apply 不同，bind**不会直接调用函数！**，而是把函数当做返回值，方便后续持续调用，而省略掉每次要改 this 都要 call 一次的问题

```typescript
// .......   // 其他一致
let fun = dog.sayName.bind(cat);
fun();
```

**函数实现原理**

实现原理很简单，只需要把需要执行的函数挂载到需要绑定 this 的对象上，然后进行相关操作后，删除掉对象上的函数即可，以 call 和 bind 为例

```javascript
// call
let age = 1;
let gender = female;
let obj = {
  age: 2,
  gender: "male",
};
function logInfo() {
  console.log(age, gender);
  console.log(this.age, this.gender);
}
// 原生方法：
logInfo.call(obj);
// 1, female  2, male

// 自己实现一个call
Function.prototype.myCall = function (obj, ...args) {
  // 第一步， 将函数挂载到obj上，此时的this是调用myCall方法的函数本身。例如，logInfo.myCall，那么this和obj.func就是logInfo
  obj.func = this;
  // 第二步，因为call函数会自调用，所以直接调用该函数即可，此时因为是obj调用的，所以函数内的this也指向obj
  const res = obj.func(...args);
  // 第三步，函数执行完毕后，删除该函数，保持obj不改变
  delete obj.func;
  // 最后，return原函数本身的返回值即可
  return res;
};

// 自己实现一个bind
Function.prototype.myBind = function (obj, ...args) {
  // 第一步，与上述所说一致，挂载函数到obj上
  obj.func = this;
  // 第二步，bind不调用函数，而是返回一个函数，所以，直接返回一个函数出去
  return function () {
    // 第三步，逻辑同上
    const res = obj.func(...args);
    // 最后别忘了删除
    delete obj.func;
    return res;
  };
};
```





## 模板字符串

> template literal

即通过反引号，添加$符号表示变量的方式

```js
let name = "leo";
let describe = `My name is ${name}`;
```





## 三元表达式

> ternary operators

```js
const title = title ? title : 'Default Title'
```





## 解构赋值

### 构赋值的拷贝性质

解构赋值本质上是**浅拷贝**。当你从一个对象中解构出一个属性值，如果这个属性值是原始类型（如字符串、数字等），那么这相当于按值拷贝。但如果属性值是对象或数组，那解构出来的只是对原始对象的引用。因此，如果你修改这个解构出来的对象，原始对象也会被修改。

### 从对象中解构

```js
// 对象可任意解构
const demoObj = { name: "peter", age: 18 };
const { name, age } = demoObj;
console.log(age); // 18
```

### 从对象解构并重命名

```js
const demoObj = { name: "peter" };
const { name: t } = demoObj;
console.log(name); // ''
console.log(t); // peter
```

### 从数组中解构

```js
// 数组为按顺序解构
const demoArr = ["peter", "bill"];
const [bill, peter] = demoArr;
console.log(bill); // 'peter'
```

## 可选链操作符

### || 和 ?? 的区别

??只用来区别 undefined 和 null

```typescript
0 ?? 123; // 0
0 || 123; // 123

undefined ?? 123; // 123
undefined || 123; // 123
```





## for...in 与 for...of

### for...in

**特点**

1. for...in 可以遍历**对象、数组**
2. for...in 中遍历的索引为**字符串**类型
3. 使用 for in 会遍历数组所有的可枚举属性，包括原型上的方法
4. for...in 更适合用来遍历对象

**代码实现**

```javascript
// 数组遍历
Array.prototype.method = function () {
  console.log(this.length);
};
let arr = [1, 2, 4, 5, 7];
for (let index in arr) {
  console.log(arr[index]);
  console.log(typeof index);
}
// 1 string
// 2 string
// 4 string
// ....
// f(){console.log(this.length)} string	// 此为原型上的方法，也会被遍历出来

// 对象遍历
Object.prototype.method = function () {
  console.log(this);
};
let obj = {
  name: "张三",
  age: 22,
};
for (let key in obj) {
  console.log(key);
  console.log(obj[key]);
}
// 'name' '张三'
// 'age' 22
// 'method' f(){console.log(this)}
```

### for...of

**特点**

1. for...of 可以遍历**数组**
2. for...of 不会遍历原型上的方法

**代码实现**

```javascript
let myArray = [1, 2, 4, 5, 6, 7];
myArray.name = "数组";
myArray.getName = function () {
  return this.name;
};
for (let value of myArray) {
  console.log(value);
  console.log(typeof value);
}
// 1 number
// 2 number
// 4 number
// ...
// 7 number
```





## Promise

### Promise 简介

promise 可以简单理解为一种**立即执行的，拥有着错误检测机制的函数**

对普通普通函数来说，接收传入的值，经过处理后，返回所需要的返回值。而且函数分为了定义和使用两种场景，如下

```typescript
// 定义
const sum: number = (a: number, b: number) => a + b;
// 使用
sum(1, 2);
```

而对 promise 来说，在 new Promise 的时候，它就会立即执行，所以，promise 一般都是用于当作函数的返回值来使用。

与函数不同的是，promise 回根据内部执行情况，决定走 resolve 还是走 reject，resolve 的话，会调用外部的.then，reject 的话，会调用外部的.catch

promise 用来执行异步操作，有效地消除了回调地狱，并且增加了错误捕获机制，其本质上是一个函数对象，会**自行调用**，自身拥有着**all、reject、resolve**等方法，其原型上有**then、catch**等方法。示例如下：

```javascript
let p = new Promise(function (resolve, reject) {
  //做一些异步操作
  setTimeout(function () {
    console.log("执行了Promise");
    resolve("resolve中的参数");
  }, 2000);
});
```

在此案例中，浏览器在 2000ms 后会直接执行 setTimeout 函数

**promise 特性**：

1. promise 一定会返回一个结果
2. promise 还是基于回调的
3. 当使用 promise 的时候会传入一个执行器，此执行器是立即执行，即 new Promise(fun(){})括号中的 fun(){}是直接执行的
4. 当前 executor 给了两个函数可以来描述当前 promise 的状态，分别是 resolve 和 reject
5. promise 中有三个状态：成功态，失败态，等待态（默认为等待态）
6. 如果调用 resolve 会走到成功态，如果调用 reject 或者发生异常会走失败态
7. promise 一旦状态变化后不能更改，例如，调了 resolve 之后，再调 reject 是不会生效的，同理，throw Error 之后再 resolve 也是不会生效的

⚠️**注意，promise 会直接自调用**，所以一定要确保其中的改赋值的变量都已赋值！！！



### promise 在实际函数中的运用

因为**只有 promise 才具有.then 的方法**，所以函数**必须返回一个 promise**，才能实现.then 的调用

```js
function fn(num) {
  return new Promise(function (resolve, reject) {
    if (typeof num == "number") {
      resolve();
    } else {
      reject();
    }
  });
}
fn("2") // 失败情况
  .then(() => {
    console.log("sucess");
  })
  .catch((err) => {
    console.log("error");
  });
fn(2) // 成功情况
  .then(() => {
    console.log("sucess");
  })
  .catch((err) => {
    console.log("error");
  });
```

### promise.then

Promise.then 是 promise 中的函数成功时的触发，会自动调用函数中的 resolve 方法，then 接受的参数是一个函数，函数的参数就是 resolve 中的参数，例如 3.5.1 中的例子：

```javascript
let p = new Promise(function (resolve, reject) {
  //做一些异步操作
  setTimeout(function () {
    console.log("执行了Promise");
    resolve("resolve中的参数");
  }, 2000);
});
p.then((arg) => {
  console.log(arg); // 输出结果为: 'resolve中的参数'
});
```

当程序未在 promise 中执行 resolve 时，即是外面有.then，也不会有反应

```javascript
let p = new Promise(function (resolve, reject) {
  let a = 1;
  if (a > 10) {
    resolve("resolve中的参数"); // 很
  }
});
p.then((arg) => {
  // 不会执行，没有任何输出结果
  console.log("执行了");
  console.log(arg);
});
```

### promise.catch

Promise.then 是 promise 中的函数失败时的触发，会自动调用函数中的 reject 方法，then 接受的参数是一个函数，函数的参数就是 reject 中的参数，例如上述 then 中的例子

```javascript
function promiseClick() {
  let p = new Promise(function (resolve, reject) {
    setTimeout(function () {
      var num = Math.ceil(Math.random() * 20); //生成1-10的随机数
      console.log("随机数生成的值：", num);
      if (num <= 10) {
        resolve(num);
      } else {
        reject("数字太于10了");
      }
    }, 2000);
  });
  return p;
}

promiseClick()
  .then(function (data) {
    console.log("成功，数字为", data);
  })
  .catch(function (reason) {
    console.log("失败，原因为:", reason);
  });
```

### promise.all

**说明**

Promise.all 可以将多个 Promise 实例包装成一个新的 Promise 实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个**结果数组**，而失败的时候则返回**最先被 reject 失败状态的值**。

**语法**

```javascript
let p1 = new Promise((resolve, reject) => {
  resolve("成功了");
});

let p2 = new Promise((resolve, reject) => {
  resolve("success");
});

let p3 = Promse.reject("失败");

Promise.all([p1, p2])
  .then((result) => {
    console.log(result); //['成功了', 'success']
  })
  .catch((error) => {
    console.log(error);
  });

Promise.all([p1, p3, p2])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error); // 失败了，打出 '失败'
  });
```

注意点

**Promise.all 获得的成功结果的数组里面的数据顺序和 Promise.all 接收到的数组顺序是一致的**

参考资料

> https://www.jianshu.com/p/7e60fc1be1b2



### promise.race

**说明**

race 即赛跑的意思，promise.race()接收一个 promise 数组为参数，其中哪个 promise 最先执行完就先执行哪一个，其他的都不执行

**语法**

```javascript
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
});

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("failed");
  }, 500);
});

Promise.race([p1, p2])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error); // 打开的是 'failed'
  });
```



### promise.resolve

当有些场景下，可能返回普通对象，也可能返回 promise 对象，如果需要进行统一处理，这时候就需要将普通对象解析为 promise 对象，这时候，可以使用`Promise.resolve`包裹，使其变成一个 promise 对象

```typescript
let myObj = { name: "Leo", age: 18 };
let alwaysReuturnPromise = Promise.resolve(myObj);
```

这样，就可以通过.then 进行调用了

这种写法，本质上是下面这种写法的简写

```typescript
Promise.resolve(value);
// 等价于
new Promise((resolve, reject) => resolve(value));
```

相当于直接调用 resolve 方法改变 status 状态为 fullfilled



### promise 原理剖析

> 参考资料
>
> https://www.jianshu.com/p/d39f9d3168df
>
> https://zhuanlan.zhihu.com/p/58428287 图解 promise 原理
>
> https://www.bilibili.com/video/BV1Tu411i72B/?spm_id_from=333.337.search-card.all.click&vd_source=292c7745eb30e2c00d6028dfa6d8c3c5 一小时快速版
>

**简单实现**

首先，以简单的 promise 的使用入手

```typescript
let p1 = new Promize((resolve, reject) => {
  resolve(1);
});

p1.then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);
```

可以看到，promise 接受一个函数(叫做 executor)当做参数，该函数包含 resolve 和 reject 两个函数，调用 resolve，会触发.then 的成功回调，调用 reject，会触发.then 的失败回调（也就是.catch，算是.then 失败回调的语法糖）

那么，开始实现

promise 能根据调用 resolve 和 reject 从而实现不同的.then，依赖于其中的三种 status，分别为 PENDING，FULLFILLED，REJECTED，promise 在实例化的时候，status 为 PENDING，当调用 resolve 的时候，会改为 FULLFILLED，当调用 reject 的时候，会改为 REJECTED，再加上，promise 在生成的时候会直接执行，所以 executor 需要直接执行

同时，resolve 和 reject 本身都会接收参数，将参数存储到类中

```js
class MyPromise {
  constructor(executor) {
    this.status = "PENDING";
    this.value = "";
    this.error = "";

    this.resolve = (value) => {
      this.status = "FULLFILLED";
      this.value = value;
    };
    this.reject = (error) => {
      this.status = "REJECTED";
      this.error = error;
    };
    executor(this.resolve, this.reject); // 此处executor执行，根据外部调用情况，对应更改status的值
  }
}
```

接下来，来实现 then，then 接收两个函数作为参数，一个成功回调，一个失败回调

```js
class MyPromise {
  constructor(executor){
    ...
    this.resolve = (value) => {
      this.status = 'FULLFILLED'
      this.value = value
      this.successFuncList.forEach((func) => func(this.value));	// 将暂存的函数进行调用
    };
    this.reject = (error) => {
      this.status = 'REJECTED'
      this.error = error
      this.rejectFuncList.forEach((func) => func(this.error));
    };
    this.successFuncList = []
    this.rejectFuncList = []
  }

  then(onFulfilled, onRejected){
    if (this.status === "FULLFILLED") {
      onFulfilled(this.value);
    }
    if (this.status === "REJECTED") {
      onRejected(this.error);
    }
    // 如果then里面是setTimeout这类函数，可能状态不会及时更新，这时候需要将函数暂存
    if (this.status === "PENDING") {
      this.successFuncList.push(() => successFunc);
      this.rejectFuncList.push(() => failFunc);
    }
  }
}
```

第三步，来实现链式调用

很简单，仅需将.then 里面的内容用 promise 包裹，然后再状态改变的时候再次触发 resolve/reject 更改 promise 的状态即可，链式调用的.then 参数如何接收待补充

```js
...
then(onFulfilled, onRejected){
  const p2 = new MyPromise((resolve, reject)=> {
    if (this.status === "FULLFILLED") {
      onFulfilled(this.value);
      resolve()
    }
    if (this.status === "REJECTED") {
      onRejected(this.error);
      reject()
    }
    if (this.status === "PENDING") {
      this.successFuncList.push(() => successFunc);
      this.rejectFuncList.push(() => failFunc);
    }
  })
}
```





## Async, Await

### generator

> https://www.liaoxuefeng.com/wiki/1022910821149312/1023024381818112

**特点**：

1. generator 函数的特点是 function 后面会带个`*`
2. 而且一般函数返回用的`return`，generator 函数返回用的`yield`和`return`
3. **generator 函数调用后返回一个迭代器对象，而不是自己写函数体力的的 return 值**
4. 每次调用迭代器对象的`next`，都会走到下一个`yield`处，直到所有 yield 都走完，或者走到`return`，才会把 done 变成 true，之后再调用 next()，将全部是 undefined
5. 调用`next()`方法的时候如果往里面传参，**参数会作为上一个 yield 的返回值**，如果在第一个 next 里传参，因为没有上一个 yield，所以在第一个 next 里面传参是无效的

**基本使用**

```javascript
function* generatorFunction() {
  console.log("开始执行");
  yield "Hello";
  console.log("继续执行");
  yield "World";
}

const generator = generatorFunction(); // 调用生成器函数，直接返回生成器对象

console.log(generator.next()); // 开始执行，并打印 { value: 'Hello', done: false }
console.log(generator.next()); // 继续执行，并打印 { value: 'World', done: false }
console.log(generator.next()); // 执行结束，并打印 { value: undefined, done: true }
```

**当迭代器函数体内有 return**

```typescript
function* generatorFunction() {
    yield 'Hello';
    return 'Goodbye'; // Generator 函数在这里结束
    yield '!'; // 这行代码不会被执行
}

const generator = generatorFunction();

console.log(generator.next()); // 第一次调用next()，输出：{ value: 'Hello', done: false }
console.log(generator.next()); // 第二次调用next()，到达return语句，输出：{ value: 'Goodbye', done: true }
console.log(generator.next()); // 第三次调用next()，由于Generator已经结束，输出：{ value: undefined, done: true }
```

**调用 next()传参**

```typescript
function* generatorFunction() {
  const value = yield "Hello";
  yield "world";
  console.log("value", value);
}

const generator = generatorFunction();

console.log(generator.next()); // 第一次调用next，启动生成器，到达第一个yield 'Hello'
console.log(generator.next("passValue")); // 第二次调用next，会输出value为world，并将此次的passValue，传递给上一次yield，即yield Hello作为返回值
console.log(generator.next()); // 第三次调用next
```

**底层实现**

generator 底层涉及涉及到了 JavaScript 引擎的内部机制，这使得直接在 JavaScript 中完全模拟其行为比较复杂。Generator 的核心特性是能够暂停和恢复执行。在 JavaScript 引擎层面，这需要引擎能够在函数执行中的任意时刻保存当前的执行上下文（包括变量状态、调用栈等），并在适当的时候恢复该上下文。



### async, await

参考资料

> http://www.ruanyifeng.com/blog/2015/05/async.html

⚠️**注意：async 函数一定会返回一个 promise 对象**

**基本使用**

```javascript
// 此处模拟先从./name.txt中获取文件路径，再根据文件路径读取文件内容
async function read() {
  let filePath = await readFile("./name.txt", "utf8");
  return await readFile(filePath, "utf8");
}
// async函数返回一个promize，要获取值的话，直接使用.then获取
read().then((res) => console.log(res));
```

**核心原理**

> https://www.bilibili.com/video/BV1W94y1Q7Bo/?spm_id_from=333.337.search-card.all.click&vd_source=6adac1d9bbd16466fad0c4ec156dc9b7

```js
function* read() {
  let filePath = yield readFile("./name.txt", "utf8");
  return yield readFile(filePath, "utf8");
}

let it = read(); // 此处，先获取迭代器对象
const { value, done } = it.next(); // 此处value返回的会是一个promise

// 为了拿到value里面的值，需要.then取出来
value.then((filePath) => {
  // 此处，我们需要把.then拿到的文件名，传递到迭代器函数里面去，根据generator里面写的第五条，我们通过next传参，可以将参数传递给上一次的yield作为返回值，所以，此处传入filePath，会直接当做上一次yield的filePath的返回值进行接收了。我们同样进行结构，就可以拿到最终文件数据了
  const { value, done } = it.next(filePath);
  // 因为第二个yield返回的也是个promise，所以用then获取数据
  value.then((fileContent) => {
    console.log(fileContent);
  });
});
```





## try...catch

- 作用

  异常捕获

  try：执行其中的代码，如果其中的代码块有错误，则走 catch 的道路

  catch：如果 try 中存在代码异常，则会自动调用 catch 中的代码

  finally：无论是异常或是正常，都会最终执行一遍 finally 中的代码，顺序在 try 和 catch 之后

- 语法

  ```typescript
  try {
      tryCode - 尝试执行代码块
  }
  catch(err) {
      catchCode - 捕获错误的代码块
  }
  finally {
      finallyCode - 无论 try / catch 结果如何都会执行的代码块
  }
  ```

- 示例

  ```typescript
  try {
    adddlert("欢迎光临！"); // 此处并没有定义adddlert方法，所以代码运行到此处会报错，故而走catch
  } catch (err) {
    document.getElementById("demo").innerHTML = err.message; // 此处会打印报错的信息
  }
  ```





## 类

类就是一类相似物体的总和，例如

类：苹果， 对象：你的苹果，我的苹果

类：汽车， 对象：你的宝马 A6， 我的奔驰 s7



### 构造方法 constructor

constructor 构造方法是每当类被实例化（new）的时候，都会自动执行的方法

```js
class Animal {
  constructor() {
    console.log("执行了");
  }
}
let cat = new Animal(); // '执行了'
```



### 构造函数

- 说明

  类是构造函数的语法糖，类从本质上来说属于构造函数

  ```javascript
  class Animal {
    constructor() {}
  }
  console.log(Animal.prototype.constructor === Animal); // true
  ```



### 类的介绍

- 基本语法

  ```javascript
  class Animals {
    constructor(name, action) {
      this.name = name;
      this.action = action;
    }
    speak() {
      console.log(this.name + " say hi!");
    }
    _action() {
      console.log(this.name + " " + this.action);
    }
  }

  let dog = new Animals("Tom", "is jump");
  dog.speak();
  dog._action();
  ```

  constructor 方法是类的构造函数的默认方法，通过 new 命令生成对象实例时，自动调用该方法

- 类的继承

  ```javascript
  class Cat extends Animals {
    constructor(name) {
      super(name); // 超类继承父类构造器, 并传入参数name
    }
    speak() {
      console.log(`我是${this.name}猫!`);
    }
  }
  let cat = new Cat("Tom");
  cat.speak();
  ```





## 数组方法

### 数组遍历

> 数组遍历 _Array traversal_

**for 循环 (for loop)**

普通写法： for(let i=0; i < arr.length; i++){}

优化写法： for(let i=0, len= arr.length; i < len; i++){}

**map 遍历**

遍历每个元素，并对每个元素都进行操作，会**改变原数组中的引用类型的值，不改变值类型的值**

返回值是**更改后的数组**

```typescript
let arr = [1, { a: 2 }];
arr.map((item, index) => {
  return item * 2; // map需要有返回值
});
```

**filter 过滤**

对数组中指定的一些元素进行筛选过滤

返回值为**过滤后满足条件的新数组，不改变原数组**

```typescript
let arr = [1, 2, 3];
arr.filter((item, index) => {
  return item > 2;
}); // [3]
```

**some**

对数组中的每项进行遍历，如果其中有一项满足所给出的条件，则**返回为 true，不改变原数组**

```typescript
let arr = [1, 2, 3];
arr.some((item, index) => {
  return item > 2;
}); // true
```

**every**

对数组中的每项进行遍历，如果其中所有项都满足所给出的条件，则**返回为 true，不改变原数组**

```typescript
let arr = [1, 2, 3];
arr.some((item, index) => {
  return item > 2;
}); // false
```

**forEach**

遍历每个元素，并对每个元素都进行操作，**不改变原数组中的值**

**无返回值！**

```js
let arr = [1, 2, 3];
arr.forEach((item, index) => {
  return (arr[index] = item * 2); // 此处写法和map略有不同
}); // arr: [2, 4, 6]
// 错误示范：
arr.forEach((item, index) => {
  return item * 2; // 直接写return item*2，并不会有任何效果，原数组不变
});
```

**和 map 的区别**

- map 返回新数组，不改变原数组中的基本类型的值
- foreach 会改变原数组中的值
- map 运行速度比 foreach 快，foreach 运行速度比 for 循环快

1. 遍历方法总结

   | 方法名  | 返回值    | 是否改变原数组                            |
   | ------- | --------- | ----------------------------------------- |
   | for     | \         | 是                                        |
   | map     | new array | 是，值类型不变，引用类型改变，需要 return |
   | filter  | new array | 否                                        |
   | some    | boolean   | 否                                        |
   | every   | boolean   | 否                                        |
   | forEach | \         | 是，无返回值                              |



### 数组操作

> 数组操作 _Array operation_

1. **concat**

   作用：连接两个数组

   入参：需要连接的数组（可以有多个）

   返回值：拼接后的新数组

   是否改变原数组：否

   ```typescript
   let arr1 = [1, 2, 3];
   let arr2 = ["a", "b", "c"];
   let arr1 = [4, 5, 6];
   let arr4 = arr1.concat(arr2, arr3);
   console.log(arr4); // 1,2,3,a,b,c,4,5,6
   ```

2. **push**

   作用：向数组的末尾添加一个或多个元素

   入参：需要添加进数组的元素

   返回值：新数组的长度

   是否改变原数组：是

   ```typescript
   let arr = [1, 2];
   arr.push(3, 4);
   console.log(arr); // [1,2,3,4]
   ```

3. **pop**

   作用：删除数组的最后一个值

   入参：无

   返回值：被删除的元素的值

   是否改变原数组：是

   ```typescript
   let arr = [1, 2];
   arr.pop();
   console.log(arr); // [1]
   ```

4. **unshift**

   作用：向数组的头部添加一个或多个元素

   入参：需要添加进数组头部的元素

   返回值：新数组的长度

   是否改变原数组：是

   ```typescript
   let arr = [1, 2];
   arr.unshift(3, 4);
   console.log(arr); // [3,4,1,2]
   ```

5. **shift**

   作用：删除数组的开头的一个值

   入参：无

   返回值：被删除的元素的值

   是否改变原数组：是

   ```typescript
   let arr = [1, 2];
   arr.unshift(3, 4);
   console.log(arr); // [2]
   ```

6. **reverse**

   作用：颠倒数组中的元素顺序

   入参：无

   返回值：颠倒后的数组

   是否改变原数组：是

   ```typescript
   let arr = [1, 2];
   arr.unshift(3, 4);
   console.log(arr); // [2]
   ```

7. **sort**

   作用：数组排序

   入参：如果字母排序，则不需要入参，如果按大小排序，入参为对比函数

   返回值：排序好后的数组

   是否改变原数组：是

   ```typescript
   let arr = [10, 5, 1000, 25, 1];
   arr.sort(); // [1, 10, 1000, 25, 5]   默认按照首字母顺序排
   arr.sort((a, b) => {
     return a - b;
   }); // [1, 5, 10, 25, 1000]  从大到小排序
   ```

   原理：sort 方法比较两个值时，将值发送给比较函数，根据返回的（负、零、正）值对值进行排序。

   数组元素若为对象，要根据对象的某一个值进行排序，可以参考 special 文件中的第一条

8. **join**

   作用：数组元素拼接成字符串

   入参：需要拼接每个元素中间的分隔符，如果不传，默认为 “,”

   返回值：拼接后的字符串

   是否改变原数组：否

   ```typescript
   let arr = [1, 2, 3, 4];
   arr.join(); // '1,2,3,4'
   arr.join("-"); // '1-2-3-4'
   arr.join(""); // '1234'
   ```

9. **slice**

   作用：从数组中切割出指定的元素，并组成一个新数组

   入参：开始切割的点，结束切割的点，如果不传结束点，则默认到最后一个

   返回值：切割后的数组

   是否改变原数组：否

   **注意：end 的节点，不会被算进去！**

   ```typescript
   let arr = [1, 2, 3, 4];
   arr.slice(1, 3); // [2,3], end点的元素不会算进去
   console.log(arr); // [1,2,3,4]  不改变原数组
   ```

10. **splice**

    作用：删除元素，并向数组添加新元素

    入参：第一个参数为指定插入的下标值，第二个参数为删除元素的数量，第三到第 N 个参数为需要插入的元素

    返回值：无

    是否改变原数组：是

    ```typescript
    let arr = [1, 2, 3, 4];
    console.log(arr.splice(2, 3, 5, 6, 7)); // [],如果第二个参数大于可删的数，那就默认全部删完
    console.log(arr); // [1,2,5,6,7]
    ```

11. 操作方法总结

    | 方法名  | 返回值          | 是否改变原数组 |
    | ------- | --------------- | -------------- |
    | concat  | new array       | 否             |
    | push    | 添加后的长度    | 是             |
    | pop     | 被删除的元素    | 是             |
    | unshift | 添加后的长度    | 是             |
    | shift   | 被删除的元素    | 是             |
    | reverse | new array       | 是             |
    | sort    | new array       | 是             |
    | join    | 拼接后的 string | 否             |
    | slice   | 截取后的 array  | 否             |
    | splice  | new array       | 是             |





### Array.reduce

> https://www.jianshu.com/p/e375ba1cfc47

reduce 方法有很多的骚操作，类似于对数组进行一波 map，每个值都可以进行一些操作，然后实现一些逼格比较高的功能

**reduce 函数介绍**

   - array.reduce 是数组函数的方法，接受两个参数，第一个是对每个值进行操作的一个**回调函数**，第二个是设置回调函数开始执行的**初始 index**，第二个参数可传可不传，若不传，则默认 index 从**1**开始，一般都会需要设置为 0。

   - reduce 的返回值是**第一个参数中回调函数的返回值**

   ```typescript
   array.reduce(callback, initialValue);
   ```

**reduce 第一个参数，回调函数的介绍**

   从 1 中得知，reduce 接受的第一个参数是一个回调函数，该函数拥有四个入参，分别是

   - previousValue：上一次执行完回调函数后 return 出来的那个值，如果没有，则取 initialValue 的值
   - currentValue：本次循环中，数组中对应的值，类似 map 中的 item
   - index：本次循环所在的数组的 index 索引
   - arr：调用 reduce 的数组，就是 arr.reduce 中的 arr 本身呗，一般好像没怎么用到

   ```typescript
   // 代码实现
   let array = [1, 2, 3, 4];
   array.reduce(callback(pre, cur, index, arr){
   	console.log(pre);			// 0	因为设置了初始值0，所以此处为0
   	console.log(cur);     // 1	若没有设置初始值，会直接从index=1开始执行起来
   	console.log(index);		// 0
   	console.log(arr);			// [1,2,3,4]
   }, 0)
   ```

**arr 为空的情况**

如果 arr 为空，而没有设置初始值，那么将会直接报错，如果设置了初始值为 0，那么会返回 0

**reduce 的相关骚操作用法**

- 简单求和

  ```typescript
  let arr = [1, 2, 3, 4];
  arr.reduce((x, y) => x + y);
  ```

- 求每个元素出现的次数

  ```typescript
  let arr = ["a", "a", "b", "b", "b", "c"];
  arr.reduce((pre, cur) => {
    if (cur in pre) {
      pre[cur]++;
    } else {
      pre[cur] = 1;
    }
    return pre;
  }, {}); // {a: 2, b: 3, c: 1}
  ```

  该案例中有几个注意点

  ① 只有当操作的对象 pre 是一个对象时，使用 cur in pre 才会成功获取到内容，如果 pre 是一个数组，那么会出现一个神奇的数组结构，如下，披着数组的皮，但是实际上是一个对象

  详细关于 in 关键字的操作，可见 ES6+章 2.7

  ② 一定要把 pre 给返回出来，pre 函数如果没有返回值，走到下一个循环内就会直接报错！

- 对象数组里的属性求和

  ```typescript
  let arr = [
    {
      name: "Leo",
      salary: 30000,
    },
    {
      name: "Vivien",
      salary: 20000,
    },
  ];
  arr.reduce((pre, cur) => {
    return pre + cur.salary;
  }, 0); // 50000
  ```

**reduce 原理**

首先查看一下基本的使用方式，接收一个回调函数，返回一个操作过后的累计值

```js
[1, 2, 3, 4, 5].reduce((pre, cur) => {
  return pre + cur;
});
```

根据使用方式倒推实现原理，核心是通过 this 拿到当前调用的 array 本身，然后循环调用传进来的回调函数

```js
Array.prototype.myReduce = function (cb, initialValue = 0) {
  let value = initialValue;
  let array = this;

  array.forEach((item) => {
    value = cb(value, item);
  });

  return value;
};
```



### Array.flat

为了打平一个数组，可以使用 ES2019 引入的 `Array.prototype.flat()` 方法：

```javascript
var arr = [1, [2, [[3, 4], 5], 6]];
var flatArr = arr.flat(Infinity); // 使用 Infinity 作为深度，以确保数组完全被打平
console.log(flatArr); // 输出: [1, 2, 3, 4, 5, 6]
```

在这个例子中，`flat` 方法接受一个参数，指定要打平的深度。将其设置为 `Infinity` 可以确保无论数组有多深都会被完全打平



### 类数组

**定义**

要包含 Length，否则无法转换

**类数组转数组**

```javascript
let arrObj = {0: 'Mary', 1: 'bill', 2: 'guy', 3: 'trueman', length: 4}
// 方法一：
Array.from(arrObj)
// 方法二：
Array.prototype.slice.call(arrObj)
// 方法三（骚操作）：
[].slice.call(arrObj)
// 结果	['Mary', 'bill', 'guy', 'trueman']
// 如有其他情况，例如，少了数字，或者键值不为数字或者数字样式的字符串，或者没有length，都会导致转换出问题，如下
// 情况一： 无length
let arrObj = { 1: 'bill', 2: 'guy', 3: 'trueman'}
// 结果  []
// 情况二： length与实际不符
let arrObj = { 1: 'bill', 2: 'guy', 3: 'trueman', length: 3}
// 结果  [undefined, 'bill', 'guy']
// 情况二： 键值为字符串，而非数字
let arrObj = { name: 'bill', '2': 'guy', 3: 'trueman', length: 3}
// 结果  (3) [undefined, undefined, 'guy']， 数字字符串可以隐式转换，是支持的
```





## 字符串方法

### 字符串检索

**indexOf**

indexOf 用于检查字符串中是否有某一段字符串，如果有，返回索引值，否则返回-1

**search**

search 用于检查字符串中某一段字符串所出现的位置，如果有，返回索引值，否则返回-1，与 indexOf 不同的是，search 支持正则



### 字符串提取

**slice**

slice 接收两个参数，起始的索引和终止的索引，如果只传一个，那么会返回裁剪点到之后的全部内容

```javascript
var str = "Apple, Banana, Mango";
var res = str.slice(7, 13); // Banana
```

**subString**

 用法类似 slice，不过不支持负数

**substr**

 接受两个参数，第一个为起点索引，第二个为截取的长度



### 字符串补充

**padStart**

用于在字符串前面补位，接收两个参数，第一个是字符串总位数，第二个是补位字符

```js
let str = '2'
str.padStart(5, '0')	// 00002
```

**padEnd**

用于在字符串后面补位，接收两个参数，第一个是字符串总位数，第二个是补位字符

```js
let str = '2'
str.padStart(5, '0')	// 20000
```

padEnd如果需要和小数补位结合，给小数补位数的话，则需要动态调整，因为整数部分的长度并不固定，如下

```js
// 定义一个函数
function formatDecimal(str, decimal) {
  const [int, dec = ''] = String(str).split('.')
  return `${int}.${dec.padEnd(decimal, '0')}`
}
// 使用
const str = 0.2
formatDecimal(str, 5) // '0.20000'
```





### 数字和字符串的转化

**数字转字符串**

```js
let num = 41;
num.toString(); // '41'
num.toString(2); // '101001'		转二进制
num.toString(16); // '29'	转十六进制
````

**字符串转数字**

```js
let str = "0x29";
let num = parseInt(str); // 16

let str = "101001";
let num = parseInt(str, "2"); // 41

let str = "29";
let num = parseInt(str, "16"); // 41
```





## setTimeout&setInterval

### setTimeout

### setInterval





## throw

### throw 简介

throw 是用来**抛出异常**的

可以抛出一个 string，number，boolean 或者 object

而且，一旦代码运行到 throw 的时候，会**自动结束！**并在控制台中抛出红色异常信息

一般可以用来搭配报错信息使用

### throw 语法

- 基本语法

  ```typescript
  throw 123; // VM5850:1 Uncaught 111
  throw "123"; // VM5856:1 Uncaught 111
  throw { number: 1 }; // VM6080:1 Uncaught {number: 1}, 该对象可展开
  throw true; // VM6175:1 Uncaught true
  throw new Error("出错了"); // VM6295:1 Uncaught Error: 出错了
  // at <anonymous>:1:7
  ```

- throw 会自动结束代码

  ```typescript
  // 1：
  throw new Error("出错了");
  console.log("111"); // 此处不会打印111，因为throw已经抛出异常结束了代码
  
  // 2：
  console.error("出错了");
  console.log("111"); // 此处会打印111，console.error并不会结束代码进程
  ```





## Map&Set

Map 和 Set 是 ES6 中新增的两种数据结构

### Map

Map 的结构和 Object 很像，也是一种**键值对**的集合，只不过，Object 中的键是字符串 string 格式，而 Map 中的键可以是任意类型，包括对象也可以是键！

Map 中设置键值对使用 set 方法，获取键对应的值使用 get 方法，删除某个键值对使用 delete 方法，查询是否有某一个键值使用 has 方法。

代码如下:

```typescript
let mapmap = new Map();
mapmap.set(0, "Hello World");
// 在设置引用类型为键名的时候，注意要使用变量名，不然是获取不到的
// 错误示范
mapmap.set([1, 2, 3], [4, 5, 6]);
mapmap.get([1, 2, 3]); // undefined
// 正确示范
let arr1 = [1, 2, 3];
mapmap.set(arr1, [4, 5, 6]);
mapmap.get(arr1); // [4,5,6]
```



### Set

不同于 map 是键值对的集合，set 只是**值的集合**，既然 Map 的结构和 Object 很像，那 Set 自然对应的就是和 Array 很像了，与数组不同的是，Set 中不会存在相同的值，所以，可以很方便地用于数组去重，如下

```typescript
let arr = [1, 2, 3, 3, 3, 4];
let newArr = [...new Set(arr)]; // [1,2,3,4]
```



### WeakMap

待补充，简而言之和 map 很像，但是 key 值只能是对象





## Proxy

Proxy 可以对目标对象的读取、函数调用等操作进行拦截，然后进行操作处理。它不直接操作对象，而是像代理模式，通过对象的代理对象进行操作，在进行这些操作时，可以添加一些需要的额外操作。

**用法**

一个 Proxy 对象由两个部分组成： target 、 handler 。在通过 Proxy 构造函数生成实例对象时，需要提供这两个参数。 target 即目标对象， handler 是一个对象，声明了代理 target 的指定行为，此处未声明 handler，而是直接当做了第二入参

```javascript
let target = {
  name: "Tom",
  age: 24,
};
let handler = {
  get(target, key, receiver) {
    // 此处target是原对象，key是原对象的属性，例如下例中的name属性，receiver是proxy对象本身
    return target[key]; // 不是target.key
  },
  set(target, key, value, receiver) {
    return;
  },
};
const proxy = new Proxy(target, handler);

proxy.name; // 实际执行 handler.get
proxy.age = 25; // 实际执行 handler.set
```





## Reflect

Reflect 说人话就是，提供了对对象的一系列操作，可以用于对对象进行操作的统一处理

例如，用来赋值，获取值

**Reflect.get**

```js
const obj = { name: "John", age: 30 };
const key = "name";

// 使用 Reflect.get 获取属性值
const value = Reflect.get(obj, key);
console.log(value); // 输出 "John"
```

**Reflect.set**

```js
const obj = { name: "John", age: 30 };
const key = "age";
const newValue = 35;

// 使用 Reflect.set 设置属性值
Reflect.set(obj, key, newValue);
console.log(obj.age); // 输出 35
```

**Reflect.has**

```js
const obj = { name: "John", age: 30 };
const key = "name";

// 使用 Reflect.has 检查属性是否存在
const hasProperty = Reflect.has(obj, key);
console.log(hasProperty); // 输出 true
```

**Reflect.deleteProperty**

```js
const obj = { name: "John", age: 30 };
const key = "name";

// 使用 Reflect.deleteProperty 删除属性
Reflect.deleteProperty(obj, key);
console.log(obj); // 输出 { age: 30 }
```





## 模块化语法

### commonjs

```javascript
// 导出语法-------------文件a.js
let a = 1;
let b = 2;
module.export = {
  a,
  b,
};
// 导入语法-------------文件b.js
const m = require("./a.js");
console.log(m.a); // 1
console.log(m.b); // 2
```

### es6

```javascript
// 导出语法-------------文件a.js
export a = 1;
export b = 2;
// or
export default = {
  c = 3,
  d = 4
}
// 导入语法-------------文件b.js
import { a, b } from 'a.js'
console.log(a)  // 1
console.log(b)  // 2
// or
import demo from 'a.js'
console.log(demo.c)  // 3
console.log(demo.d)  // 4
```





## 防抖&节流

