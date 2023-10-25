# JS&ES6+

## Js 的组成

- ECMAScript
- DOM
- BOM

## 严格模式

> 严格模式 _strict model_

严格模式语法

- 若是整个文件都使用，则定义在文件第一行，若仅在某一函数中使用，则定义在该函数内的第一行

  ```javascript
  "use strict"; //全局

  function func() {
    "use strict"; //仅在函数内部
  }
  ```

- 严格模式区别

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

  3. 待补充

## 对象扩展

---

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

- **说明**：

  Object.create 用于创建一个新的对象并添加新的属性，可以用来实现**对象的继承**

- **语法**：

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

- **与 new Object 继承的区别**

  - new object 实现的继承，父对象的属性会直接添加到子类中，子类可以直接通过点属性(.xxx)的方式点出来，继承的属性存在在子类上

    ```javascript
    // new Object() 方式创建
    var a = { rep: "apple" };
    var b = new Object(a);
    console.log(b); // {rep: "apple"}
    console.log(b.__proto__); // {}
    console.log(b.rep); // {rep: "apple"}
    ```

  - 而 create 实现的继承，父对象的属性会添加到子类的原型上，子类也可以直接点出来，但是继承的属性不会存在于子类上

    ```javascript
    // Object.create() 方式创建
    var a = { rep: "apple" };
    var b = Object.create(a);
    console.log(b); // {}
    console.log(b.__proto__); // {rep: "apple"}
    console.log(b.rep); // {rep: "apple"}
    ```

### obj.hasOwnProperty

- 说明

  用于判断对象自身是否存在某一**非继承**的属性

- 语法

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

1. **用作循环的情况**

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

2. **用作判断某一个值是否在数组/对象内**

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

---

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

---

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

- 函数用法

  1. **call**

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

  2. **apply**

     与 call 其他基本一致，函数也会**直接调用**，但是，apply 传参接受的参数是一个数组，无返回值

     ```typescript
     //......  // 和上面一致
     dog.eat.call(cat, ["鱼", "猫饼干"]);
     ```

  3. **bind**

     bind 与 call 和 apply 不同，bind**不会直接调用函数！**，而是把函数当做返回值，方便后续持续调用，而省略掉每次要改 this 都要 call 一次的问题

     ```typescript
     // .......   // 其他一致
     let fun = dog.sayName.bind(cat);
     fun();
     ```

- 函数实现原理

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
    obj.func(...args);
    // 第三步，函数执行完毕后，删除该函数，保持obj不改变
    delete obj.func;
    // 最后，因为call函数没有返回值，所以直接return即可
    return;
  };

  // 自己实现一个bind
  Function.prototype.myBind = function (obj, ...args) {
    // 第一步，与上述所说一致，挂载函数到obj上
    obj.func = this;
    // 第二步，bind不调用函数，而是返回一个函数，所以，直接返回一个函数出去
    return function () {
      // 第三步，逻辑同上
      obj.func(...args);
      // 最后别忘了删除
      delete obj.func;
      return;
    };
  };
  ```

## 模板字符串

即通过反引号，添加$符号表示变量的方式

```js
let name = "leo";
let describe = `My name is ${name}`;
```

## 解构赋值

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

## for...in 与 for...of

---

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

---

### Promise 简介

- promise 用来执行异步操作，有效地消除了回调地狱，并且增加了错误捕获机制，其本质上是一个函数对象，会**自行调用**，自身拥有着**all、reject、resolve**等方法，其原型上有**then、catch**等方法。示例如下：

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

- promise 所拥有的特性：

  1. promise 一定会返回一个结果
  2. promise 还是基于回调的
  3. 当使用 promise 的时候会传入一个执行器，此执行器是立即执行，即 new Promise(fun(){})括号中的 fun(){}是直接执行的
  4. 当前 executor 给了两个函数可以来描述当前 promise 的状态，分别是 resolve 和 reject
  5. promise 中有三个状态：成功态，失败态，等待态（默认为等待态）
  6. 如果调用 resolve 会走到成功态，如果调用 reject 或者发生异常会走失败态
  7. promise 一旦状态变化后不能更改，例如，调了 resolve 之后，再调 reject 是不会生效的，同理，throw Error 之后再 resolve 也是不会生效的

- Resolve, reject

  分别对应成功与失败所调用的函数

- **注意点！！！**

  ！！！**注意，promise 会直接自调用**，所以一定要确保其中的改赋值的变量都已赋值！！！

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

####promise.then

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

- 说明

  Promise.all 可以将多个 Promise 实例包装成一个新的 Promise 实例。同时，成功和失败的返回值是不同的，成功的时候返回的是一个**结果数组**，而失败的时候则返回**最先被 reject 失败状态的值**。

- 语法示例

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

- 注意点

  **Promise.all 获得的成功结果的数组里面的数据顺序和 Promise.all 接收到的数组顺序是一致的**

- 参考资料

  > https://www.jianshu.com/p/7e60fc1be1b2

### promise.race

- 说明

  race 即赛跑的意思，promise.race()接收一个 promise 数组为参数，其中哪个 promise 最先执行完就先执行哪一个，其他的都不执行

- 语法

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

### promise 原理剖析

- 参考资料

  > https://www.jianshu.com/p/d39f9d3168df
  >
  > https://zhuanlan.zhihu.com/p/58428287 图解 promise 原理
  >
  > node --> promise

- 简单原理实现

  ```javascript
  const PENDING = "PENDING"; // 对应上述所说的，promise有三大状态，等待态，成功态和失败态
  const FULFILLED = "FULFILLED";
  const REJECTED = "REJECTED";
  class Promise {
    constructor(executor) {
      // executor是promise接收的那个函数，在promise中会立即执行
      this.status = PENDING; // 初始默认状态为等待态
      this.value = undefined; // value是接收到的executor中的resolve函数的参数
      this.reason = undefined; // reason是接收到的executor中的reject函数的参数
      this.onResolveCallbacks = []; // resolve后的then中的函数，会放在此数组中暂存，防止因为executor中有异步操作导致的状态改变异常（例如，executor中有个两秒的setTimeOut，等真正状态改变的时候，才去调用所有的后续then方法）
      this.onRejectCallbacks = []; // 同理如上
      let resolve = (value) => {
        if (this.status === PENDING) {
          // promise中只可能有一种状态改变，有一种状态后，就立刻结束，不可能从失败变成成功，只有从pending态发生改变才会真正引起状态的改变，从而调用暂存函数数组中的所有函数方法
          this.value = value;
          this.status = FULFILLED;
          this.onResolveCallbacks.forEach((fn) => fn()); // 遍历暂存函数中的所有函数并全部执行
        }
      };
      let reject = (reason) => {
        if (this.status === PENDING) {
          this.status = REJECTED;
          this.reason = reason;
          this.onRejectCallbacks.forEach((fn) => fn());
        }
      };
      try {
        executor(resolve, reject); // 对应上面说的，promise传入的函数会立刻执行
      } catch (e) {
        reject(e);
      }
    }
    then(onFulfilled, onRejected) {
      // then方法实现，只是简单原理而已，实际上为了实现Promise的链式调用，then方法本身返回的其实是一个promise，所以才可以实现无限then
      if (this.status === FULFILLED) {
        // 此处的直接调用，是executor中代码是同步代码的情况
        onFulfilled(this.value);
      }
      if (this.status === REJECTED) {
        onRejected(this.reason);
      }
      if (this.status === PENDING) {
        // 这里是异步代码的情况，将onFulfilled函数压入onResolveCallbacks数组中，等待异步加载完毕，状态改变后，再进行调用
        this.onResolveCallbacks.push(() => {
          onFulfilled(this.value);
        });
        this.onRejectCallbacks.push(() => {
          onRejected(this.reason);
        });
      }
    }
  }
  ```

## Async, Await

### generator

- 说明：

  一般的函数只有一个返回值，遇见 return 的情况下，会直接结束函数的调用，但是 generator 函数，允许函数有多个返回值，每一次返回，都会返回一个 generator 对象，需要使用.next()的方式对其进行调用。

- 参考资料

  > https://www.liaoxuefeng.com/wiki/1022910821149312/1023024381818112

- 语法

  ```javascript
  // 生成阶段
  function* fib(max) {
    var t,
      a = 0,
      b = 1,
      n = 0;
    while (n < max) {
      yield a;
      [a, b] = [b, a + b];
      n++;
    }
    return;
  }
  // 调用阶段
  var f = fib(5);
  f.next(); // {value: 0, done: false}
  f.next(); // {value: 1, done: false}
  f.next(); // {value: 1, done: false}
  f.next(); // {value: 2, done: false}
  f.next(); // {value: 3, done: false}
  f.next(); // {value: undefined, done: true}
  // 也可以使用for of的方式进行循环调用
  for (var x of fib(10)) {
    console.log(x); // 依次输出0, 1, 1, 2, 3, ...
  }
  ```

- 异步操作的同步写法：

  ```javascript
  var fs = require("fs");

  var readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
      fs.readFile(fileName, function (error, data) {
        if (error) reject(error);
        resolve(data);
      });
    });
  };
  // -----------------------------markLine----------------------------
  var gen = function* () {
    // *（星号）表示函数里有异步操作
    var f1 = yield readFile("/etc/fstab"); // yield 表示紧跟在后面的表达式需要等待结果
    var f2 = yield readFile("/etc/shells");
    console.log(f1.toString());
    console.log(f2.toString());
  };
  // -----------------------------markLine----------------------------
  ```

### async, await

- 异步的“终极解决方式”

  js 的异步操作处理，从最开始的回调函数，到后来的 promise，再到 generator，每次都有改进，但是都感觉不彻底，直到出现了 async, await 函数，异步操作变得简单了起来，借用阮一峰老师的一句话“**异步编程的最高境界，就是根本不用关心它是不是异步**”

- 参考资料

  > http://www.ruanyifeng.com/blog/2015/05/async.html

- generator 函数

  async, await，**本质上是 generator 函数的语法糖**

- **async, await 语法**

  在上例的代码中，如果按照 async，await 的语法规则，可改写成如下

  ```javascript
  // -----------------------------markLine----------------------------
  var asyncReadFile = async function () {
    // async 表示函数里有异步操作
    var f1 = await readFile("/etc/fstab"); // await 表示紧跟在后面的表达式需要等待结果
    var f2 = await readFile("/etc/shells");
    console.log(f1.toString());
    console.log(f2.toString());
  };
  // -----------------------------markLine----------------------------
  ```

  不难看出，写法区别仅仅是将\*换成了 async，yield 换成了 await

- **async, await 优点**

  async 函数对 generator 函数的改进，体现在以下三点

  1. **内置执行器**

     Generator 函数的执行必须靠执行器，所以才有了 co 函数库，而 async 函数自带执行器。也就是说，async 函数的执行，与普通函数一模一样

  2. **更好的语义**

     async 和 await，比起星号和 yield，语义更清楚了

  3. **更广的适用性**

     co 函数库约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以跟 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）

- **async 函数用法**

  await 函数后面接 promise 对象，要等待 promise 对象有返回结果了，才会继续调用函数后面的内容

- **promise 返回 reject 的情况**

  因为 await 后面接的是 promise，所以有可能会出现 reject 的情况，所以建议把 await 命令放在 try...catch 命令中，示例如下

  ```javascript
  async function myFunction() {
    try {
      await somethingThatReturnsAPromise();
    } catch (err) {
      console.log(err);
    }
  }

  // 也可以写成
  async function myFunction() {
    await somethingThatReturnsAPromise().catch(function (err) {
      console.log(err);
    });
  }
  ```

  具体的 try...catch 的用法，请见#3.7

## try...catch...finally

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

1. for 循环 (for loop)

   普通写法： for(let i=0; i < arr.length; i++){}

   优化写法： for(let i=0, len= arr.length; i < len; i++){}

2. map 遍历

   遍历每个元素，并对每个元素都进行操作，会**改变原数组中的引用类型的值，不改变值类型的值**，返回值是更改后的数组

   ```typescript
   let arr = [1, { a: 2 }];
   arr.map((item, index) => {
     return item * 2; // map需要有返回值
   });
   ```

3. filter 过滤

   对数组中指定的一些元素进行筛选过滤，返回值为**过滤后满足条件的新数组，不改变原数组**

   ```typescript
   let arr = [1, 2, 3];
   arr.filter((item, index) => {
     return item > 2;
   }); // [3]
   ```

4. some

   对数组中的每项进行遍历，如果其中有一项满足所给出的条件，则**返回为 true，不改变原数组**

   ```typescript
   let arr = [1, 2, 3];
   arr.some((item, index) => {
     return item > 2;
   }); // true
   ```

5. every

   对数组中的每项进行遍历，如果其中所有项都满足所给出的条件，则**返回为 true，不改变原数组**

   ```typescript
   let arr = [1, 2, 3];
   arr.some((item, index) => {
     return item > 2;
   }); // false
   ```

6. forEach

   遍历每个元素，并对每个元素都进行操作，会**改变原数组中的所有值，且无返回值**

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

7. 遍历方法总结

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

reduce 方法有很多的骚操作，类似于对数组进行一波 map，每个值都可以进行一些操作，然后实现一些逼格比较高的功能

1. **reduce 函数介绍**

   - array.reduce 是数组函数的方法，接受两个参数，第一个是对每个值进行操作的一个**回调函数**，第二个是设置回调函数开始执行的**初始 index**，第二个参数可传可不传，若不传，则默认 index 从**1**开始，一般都会需要设置为 0。

   - reduce 的返回值是**第一个参数中回调函数的返回值**

   ```typescript
   array.reduce(callback, initialValue);
   ```

2. **reduce 第一个参数，回调函数的介绍**

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

3. **arr 为空的情况**

   如果 arr 为空，而没有设置初始值，那么将会直接报错，如果设置了初始值为 0，那么会返回 0

4. **reduce 的相关骚操作用法**

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

5. **参考文档**

   写得非常详细，而且简单易懂，强推

   > https://www.jianshu.com/p/e375ba1cfc47

### 类数组

- 类数组的定义：

  要包含 Length，否则无法转换

- 类数组转数组

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

1. **indexOf**

   indexOf 用于检查字符串中是否有某一段字符串，如果有，返回索引值，否则返回-1

2. **search**

   search 用于检查字符串中某一段字符串所出现的位置，如果有，返回索引值，否则返回-1，与 indexOf 不同的是，search 支持正则

### 字符串提取

1. **slice**

   slice 接收两个参数，起始的索引和终止的索引，如果只传一个，那么会返回裁剪点到之后的全部内容

   ```javascript
   var str = "Apple, Banana, Mango";
   var res = str.slice(7, 13); // Banana
   ```

2. **subString**

   用法类似 slice，不过不支持负数

3. **substr**

   接受两个参数，第一个为起点索引，第二个为截取的长度

### 数字和字符串的转化

- 数字转字符串

  ```js
  let num = 41;
  num.toString(); // '41'
  num.toString(2); // '101001'		转二进制
  num.toString(16); // '29'	转十六进制
  ```

- 字符串转数字

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

### 1 throw 简介

throw 是用来**抛出异常**的

可以抛出一个 string，number，boolean 或者 object

而且，一旦代码运行到 throw 的时候，会**自动结束！**并在控制台中抛出红色异常信息

一般可以用来搭配报错信息使用

### 2 throw 语法

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

### 1 Map

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

### 2 Set

不同于 map 是键值对的集合，set 只是**值的集合**，既然 Map 的结构和 Object 很像，那 Set 自然对应的就是和 Array 很像了，与数组不同的是，Set 中不会存在相同的值，所以，可以很方便地用于数组去重，如下

```typescript
let arr = [1, 2, 3, 3, 3, 4];
let newArr = [...new Set(arr)]; // [1,2,3,4]
```

### 3 WeakMap

待补充，简而言之和 map 很像，但是 key 值只能是对象

## Proxy&Reflect

### 1 proxy

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

####2 reflect

## 模块化语法

### 1 commonjs

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

####2 es6

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

####
