# TypeScript

> 深入理解 TypeScript: https://jkchao.github.io/typescript-book-chinese/#why

## ts 数据类型

---

### 常见数据类型

```typescript
// 基本数据类型
let married: boolean = true;
let age: number = 10;
let first_name: string = "hello";
let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [4, 5, 6]; // 和上面一样，只不过写法不同

// 扩展数据类型
// 1.元组类型tuple（即数量和类型已知的数组）
let tupleArr: [string, number] = ["Leo", 18];

// 2.任意类型any，变量定义为any就和Js无差别了，不会进行类型校验
let root: any = document.getElementById("root");
root.style.color = "green";

// 类型的注意点
// 1.null和undefined是其他类型的子类型
let x: number;
x = 1;
x = undefined;
x = null; // 此处并不会报错，因为undefined和null均为number的子类型，如果开启严格模式，则此处会报错，详见6.1.2
```

### 数据类型注意事项

在 ts 配置文件中，tsconfig.json，如若开启了严格模式，则某些类型的定义会变得更加严格，例如，1.1 中示例的的 null 和 undefined 将不再会是其他类型的子类型

### 枚举

枚举类似定义常量，不过，可以实现两边互等

```typescript
enum Day {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}
```

如上述例子中，虽然没给每个枚举赋值，但是 ts 默认会帮忙将所有值进行标号，如下

```tsx
enum Day {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}
```

除此之外，枚举支持两边互等互点，比如

```typescript
Day.SUNDAY; // 0
Day[0]; // 'SUNDAY'
```

### never

#### never 作用和使用

1. never 是 ts 中的一种特殊类型，用通俗的话解释它的作用就是：**用来告知编译器某处代码永远不会执行,从而获得编译器提示, 以避免程序员在一个永远不会(或不应该)执行的地方编写代码.**

2. 除此之外，其还具有的功能是：

- **检查「Unreachable code」**，在编译器中呈现的就是颜色变浅的无法执行的代码块

  举个栗子

  ```javascript
  process.exit(0);
  console.log("hello world"); //Error: Unreachable code detected.ts(7027)监测到了不可读取的程序代码
  ```

  在上面这个示例中，hello world 不会被打印，因为 process.exit()的返回值是一个 never，程序走到这里已经终结退出了，所以后续的代码不会执行

- **间接收窄其他数据的类型**

  同样举个栗子

  ```javascript
  function throwError() {
    throw new Error();
  }

  function firstChar(msg: string | undefined) {
    if (msg == undefined) throwError();
    let chr = msg.charAt(1); //❌Object is possibly 'undefined'.
  }
  ```

  ```typescript
  function throwError(): never {
    throw new Error();
  }

  function firstChar(msg: string | undefined) {
    if (msg == undefined) throwError();
    let chr = msg.charAt(1); // ✅
  }
  ```

  在上面这个示例中，刚开始有一个疑惑，如下

  > 其实 throwError 应该已经是抛出了一个异常了，按理来说，抛出异常意味着程序结束，如果 object 为 Undefined 的话，应该不会走到 msg.charAt 里面去，那为什么还需要一个 never 才能让编译器停止报错？

  > 上述疑问，张仁阳老师给出的解释是：这是类型较验。如果程序里抛出错误，返回值类型就需要定义成 never,表示永远不会到达 的值

- **其他**

  在某些情况下，会自动返回一个 never，举个栗子

  ```typescript
  function fn(x: string | number) {
    if (typeof x === "number") {
      console.log(x); //此处编译器会提示x的值为number
    } else if (typeof x === "string") {
      console.log(x); //此处编译器会提示x的值为stirng
    } else {
      console.log(x); //此处编译器会提示x的值为never
    }
  }
  ```

#### never 和 void

1. 返回值区别

   void 代表返回值为空，在非严格模式下，可以一个定义了 void 的函数返回值可以是 undefined，可以是 null，严格模式下，可以是 undefined，不能为 null

   ```typescript
   function voidFun(): void {
     return undefined | unll; // 非严格模式下，两种均可，严格模式下，null会报错
   }
   ```

   如果函数被定义为 never，那么不能 return 任何值

2. 执行区别

   返回为 void 的函数其中的函数会执行，返回为 never 的函数不会执行

### bigint 和 number

BigInt 和 Number 是 js 中的类型，bigint 和 number 是 ts 中的类型

### 复杂数据类型

1. **联合类型**

   联合类型是给一个变量赋值为多种可能的类型，当未给该变量指定值的时候，只能调用该对象多种可能类型的共有的方法

   ```typescript
   let variable: string | number;
   variable!.toStirng(); // 此时只能调用string和number共有的方法，不然会报错，如果想忽略这个错误，见2.2
   variable = 1;
   variable.toFixed(2); // 赋值之后，就可以调用一些number的方法了
   ```

2. **字面量类型**

   字面量类型类似于枚举，定义一个类型的时候，某个变量若为该类型，则其值只能为这个类型中所定义的值

   ```typescript
   type stringType = "1" | "2" | 3;
   let stringTypeVariable: stringType = 1; // 该处会报错，因为stringType类型上并没有number1
   let stringTypeVariable: stringType = 3; // 正常
   ```

## 断言

---

### as

as 可以进行类型断言

```typescript
let n: number | string;
(a as number) = 1;
```

### 非空断言

说明：ts 编译器在编译的过程中，若发现某些值可能不存在，然而我们却给这些值赋值的时候，会报一个错，说明该值可能并不存在，从而造成值为 null，然后给 Null 的属性赋值，会造成空指针异常。这时候，我们可以使用非空断言，告诉 ts 该值一定存在，从而忽略掉这个错误

```typescript
let element: HTMLElement | null = document.getElementById("root");
element.style.color = "green"; // 此时会报错
element!.style.color = "greend"; //这种写法就不会报错了
```

### 类型断言

说明：ts 编译器编译时，如果发现某个联合类型声明的变量未赋值，那么该变量只能调用联合类型的共有的方法，如果要给改变量设置类型断言，可按如下写法

```typescript
let variable: string | number;
(variable! as number).toFixed(2); // 此处variable没有赋值，需要使用非空断言，同时，没有值，就不知道类型，所以也需要进行类型断言
```

### 双重断言

说明：如果出现上述的类型断言，但是实际上，想使用除了定义类型之外的类型，就可以使用双重断言

```typescript
let variable: string | number;
(variable! as number).toFixed(2);
(variable! as any as boolean).valueOf(); // 强制定义variable的类型为bool类型
```

## ts 函数

---

### 函数声明

ts 的函数声明中，入参出参，返回值均可定义类型

具体格式如下

```typescript
// (arg1Type, arg2Type, ...) : returnType
let func = (x:string, y:number):void => {
  console.log(x);
  console.log(y);
}
func('1', 2);

// 一般情况下，声明函数并不需要给函数添加类型，因为他本身可以自行推导，一般需要进类型标识的，是将函数当做变量来使用，例如
let fn = (a:string, b: string): string => a + b;
const sum: (a:string, b: string): string = fn;
```

除此之外，还可在类型声明前面加上一个`？`进行**参数可选**的设置，即该号位置的参数可有可无

```typescript
let func = (x: string, y?: number): void => {
  // y是可选参数，可传可不传
  console.log(x);
  console.log(y);
};
func("1"); // '1'  undefined
```

### 函数 this

ts 中，函数中的 this 必须要声明之后才能使用，否则会报错

```typescript

```

### 函数重载

**函数重载 function overload**，即为同一个函数提供多个函数类型定义来进行函数重载，而且，**函数重载和函数声明必须保证连续写**，不然就会报错

- 某些简单情况下，函数重载可以直接用或`|`语句替代

  ```typescript
  let fun = (x: string | number): void => {
    if (typeof x == "string") {
      console.log("it's a string");
    } else if (typeof x == "number") {
      console.log("it's a number");
    }
  };
  // -------------上述函数可重载为下面的函数---------------------
  function fun(x: string): void;
  function fun(x: number): void;
  function fun(x: any): void {
    if (typeof x == "string") {
      console.log("it's a string");
    } else if (typeof x == "number") {
      console.log("it's a number");
    }
  }
  ```

- 某些复杂情况下，上面的这种简单写法就会出问题

  ```typescript
  // 例如有个需求，需要传入的x和y可以为string，也可以为number，但是x和y的类型必须一致
  // 如果按第一种写法
  let fun = (x: string | number, y: string | number): void => {};
  fun(1, "2"); // 这种写法，并不会报错

  // -------------上述函数可重载为下面的函数---------------------
  function fun(x: string, y: string): void;
  function fun(x: number, y: number): void;
  function fun(x: string | number, y: string | number): void {}
  fun(1, "1"); // 这种写法，会直接在IDE中报错，方便进行检查
  ```

## 类

---

### 变量的定义

类中接受的参数，在 constructor 中，要先定义，不能直接 this

```typescript
class Animal {
  // 需要对接收的参数进行定义，不然ts会报错
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
```

> 类的简易参考文档
>
> https://blog.csdn.net/johnZhangqi/article/details/105502226?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-0&spm=1001.2101.3001.4242

### 类的继承

继承使用关键字 extends，调用父类使用 super，super 即是调用父类的原型，子类继承父类的属性和方法，并且子类可以改写父类的属性和方法

```typescript
class Animal {
  name: string;
  constructor(_name: string) {
    // constructor用于接收入参，例如在下面new Horse的时候就传进来了一个入参
    this.name = _name;
  }
  eat() {}
  sleep() {} // 父类的方法，子类没有重写
}

class Horse extends Animal {
  constructor() {
    super(name); // 注意点：super是写在constructor里面的，直接继承父类的name属性
  }
  eat() {
    // 子类可以重写父类的方法，会直接覆盖
    console.log("newEat");
    super.eat(); // 子类如果要调用父类的方法，可以直接用super.methodName的方式
  }
}
let horse = new Horse("horse");
horse.eat(); // 此处调用的是覆盖后的子类自己的方法
horse.sleep(); // 因为子类没有重写该方法，所以直接调用的是父类的
```

> 参考文档：
>
> - 关于类的继承以及各个修饰符对继承的影响
>
>   https://blog.csdn.net/ddr66288/article/details/102119998
>
> - 关于 constructor 和 super
>
>   https://www.jianshu.com/p/2f13ecb9a109

### 类的修饰符

ts 里面提供的修饰符共有三个，分别是

- public（默认）：公有 在当前类里面、 子类 、类外面都可以访问

- protected：保护类型 在当前类里面、子类里面可以访问 ，在类外部没法访问

- private： 私有 在当前类里面可以访问，子类、类外部都没法访问

- readonly：只读属性

  | 修饰符    | 当前类 | 子类     | 外部     |
  | --------- | ------ | -------- | :------- |
  | public    | 可访问 | 可访问   | 可访问   |
  | protected | 可访问 | 可访问   | 不可访问 |
  | private   | 可访问 | 不可访问 | 不可访问 |
  | readonly  |        |          |          |

### 静态属性 静态方法

1. 定义

   静态属性：这些属性存在于类本身上面而不是类的实例上，只能通过类.属性名称的方式来进行调用，而不能在实例上进行调用，静态方法同理，与之相对应的，存在于类的实例上的属性和方法叫**成员属性**和**成员方法**

2. 说明

   简而言之，就是 static 标识符标识的属性或者方法，不会被子类继承，所以，子类点静态方法是会报错的，同时，静态方法也只存在于父类上，同时，**无法使用 this 关键字**，因为 this 关键字指向的是被实例化后的对象类

3. 代码示例

   ```typescript
   class Person {
     public name: string;
     public age: number = 20;

     static sex: string = "男"; // 保护属性

     constructor(name: string) {
       this.name = name;
     }

     run() {
       // 实例方法
       console.log(`${this.name}在奔跑`);
     }
     work() {
       console.log(`${this.name}在工作`);
     }

     static print() {
       //静态方法
       console.log("print方法");
       console.log("print方法" + this.age); // 报错，静态方法里无法直接调用当前类属性（只能调用静态属性）this.age是undefined
       console.log("print方法" + this.sex);
     }
   }

   let p = new Person("张三");
   // 调用实例方法
   p.run();
   // 调用静态方法
   Person.print();
   ```

### 多态

1. 定义

   父类定义一个方法不去实现，让继承它的子类去实现 每一个子类有不同的表现

2. 代码示例

   ```typescript
   class Animal {
     name: string;
     constructor(name: string) {
       this.name = name;
     }
     eat() {
       //具体吃什么  不知道   ，  具体吃什么?继承它的子类去实现 ，每一个子类的表现不一样
       console.log("吃的方法");
     }
   }

   class Dog extends Animal {
     constructor(name: string) {
       super(name);
     }
     eat() {
       return this.name + "吃粮食";
     }
   }

   class Cat extends Animal {
     constructor(name: string) {
       super(name);
     }
     eat() {
       return this.name + "吃老鼠";
     }
   }
   ```

### 抽象

1. 定义

   - 抽象类是提供其他类继承的基类，**不能直接被实例化**
   - 用 abstract 关键字定义抽象类和抽象方法，抽象类中的抽象方法**不包含具体实现**并且**必须在派生类中实现**
   - abstract 抽象方法**只能放在抽象类里面**
   - 抽象类和抽象方法用来定义标准

2. 说明

   简而言之，① 不能 new 出来；② 抽象类里面的抽象方法不包括实现，而且子类必须要实现该抽象方法；③ 抽象方法只能放在抽象类里；④ 抽象类里面可以放普通方法，子类可以选择不实现

3. 代码示例

   ```typescript
   abstract class Animal {
     public name: string;
     constructor(name: string) {
       this.name = name;
     }
     abstract eat(): any; //抽象方法不包含具体实现并且必须在派生类中实现。
     run() {
       console.log("其他方法可以不实现");
     }
   }
   var a = new Animal(); // 这里这么写是错误的，因为抽象类不可以被实例

   class Dog extends Animal {
     constructor(name: any) {
       super(name);
     }
     eat() {
       //抽象类的子类必须实现抽象类里面的抽象方法，但是可以不实现run，因为run不是抽象方法
       console.log(this.name + "吃粮食");
     }
   }
   var d = new Dog("小白狗");
   d.eat();
   ```

## 接口

`接口 interface`

---

> 接口的详细文档
>
> https://yuzhiqiang.blog.csdn.net/article/details/54378607?utm_medium=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.baidujs&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-1.baidujs

1. 定义

   - 用来描述数据的形状（对象，类，函数等）
   - 接口中的东西都是抽象的，没有具体实现
   - 接口是为了实现**多继承**
   - 关键字是**implements**

2. 接口**interface**和类型定义**type**的区别

3. 接口的函数类型

   - 说明：接口可以用来描述 js 中的所有对象，函数也不例外，描述函数的时候，用括号包裹键值，写在冒号后面

   - 代码实现

     ```typescript
     interface Animal {
       [speak: string]: string; // 如果是[]，则是用来约束对象或者数组，对应的是键:值
     }
     interface Animal2 {
       (): string; // 如果是用来约束函数，那么键名要用()，对应的是 (参数):返回值
     }

     let cat: Animal = {
       speak: "喵喵喵",
     };

     let dog: Animal2 = () => {
       return "汪汪汪";
     };
     ```

   - 此外注意点，如果接口约束函数的时候其中还有其他属性或方法，那么对应的需要将该属性或方法加上

     ```typescript
     interface Animal2 {
       (): string;
       name: string;
     }

     let t: any = () => {}; // 此处如果不加any，下面会报错，因为t对应的是空函数，不能赋值
     t.name = "Dog";
     let dog: Animal2 = t;
     ```

## 泛型

`泛型 `

---

**泛型定义：**

**说明：**

泛型就是在使用的时候确定类型

**示例**

假设现在需要一个函数，传入一个数字和一个值，返回一个数组，数组长度为传入的数字长度，每个数组元素的值都为传入的值

```typescript
// 记得函数的<T>要写在参数前
const createArray = <T>(times: number, value: T): Array => {
  let arr = [];
  for (let i = 0; i < times; i++) {
    arr.push(value);
  }
  return arr;
};

// 因为传入的value值不确定，只有在传递的时候才知道具体是什么值，故而需要用到泛型，写法为函数名后面接<T>, 并在对应参数后面表示T的含义，如上述中，value的类型就是
createArray(5, "abc");
createArray(5, true);
createArray(5, 18);
```

## ts 关键字

> 参考文档：https://juejin.cn/post/7034035155434110990

---

1. `typeof`
2. `keyof`
3. `in`
4. `extends`
5. `as`
6. `infer`

## 类型兼容性

---

## Record

`Record<K,T>`构造具有给定类型`T`的一组属性`K`的类型。在将一个类型的属性映射到另一个类型的属性时，`Record`非常方便。

```typescript
type IType = Rocord<string, number>;

let obj: IType = {
  "1": "1",
  "2": 2, // 报错，此处应为string而非number
};
```

```typescript
interface EmployeeType {
  id: number;
  fullname: string;
  role: string;
}

let employees: Record<number, EmployeeType> = {
  0: { id: 1, fullname: "John Doe", role: "Designer" },
  1: { id: 2, fullname: "Ibrahima Fall", role: "Developer" },
  2: { id: 3, fullname: "Sara Duckson", role: "Developer" },
};
```

## 装饰器

---

### 类装饰器

ts 官方定义：装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上，装饰器使用 @expression 这种形式，expression 求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入

暂时没有看出来有啥用，先了解了再说，上代码

```typescript
funtion decoratorFun(targetClass: any){		// 装饰器函数的入参是Person类
  targetClass.prototype.name = 'Leo';		// 装饰器上添加的属性和方法最后都可以直接调用到
  targetClass.prototype.eat = function(){
    console.log('eat...');
  };
}

@decoratorFun		// 装饰器为@加上函数名，本身是一个函数
class Person{
}

let p:Person = new Person();
console.log(p.name);	// Leo，此处就可以直接调用到了
console.log(p.eat);		// eat...
```

### 类装饰器工厂

简而言之，就是如果类装饰器声明的时候需要传参，那么可以采用类装饰器工厂的模式

```typescript
function decorateFactory(name: string) {
  // 此处的名称应与装饰器名称一致
  return function decorateFactoryCallback(x: Function) {
    // 既然装饰器函数是个函数，所以直接return一个function即可
    x.prototype.name = name;
    x.prototype.eat = function () {
      console.log("eat...");
    };
  };
}

@decorateFactory("Leo")
class Person {}
```

**补充点：类装饰器直接返回新类替换掉原始的类**

直接上代码

```typescript
function decoratorClass(x: Function) {
  return class {
    name: string;
    eat: Function;
    age: number; // age是多出来的属性，原则上来说，新类必须要包含原始类的所有属性和方法，只能多，不能少是原则，如果少了name或者eat中的任何一个，该函数都会直接报错
    constructor() {}
  };
}

@decoratorClass
class Person {
  name: string;
  eat: Function;
  constructor() {} // 此处也留下一个疑点，为啥类里面最后结尾使用分号而不是逗号
}
```

### 属性装饰器

### 参数装饰器

### 装饰器的执行顺序

1. 类装饰器最后执行，对同一个类的不同装饰器而言，后写的装饰器先执行
2. 方法和方法中的参数装饰器，先执行参数装饰器，再执行方法装饰器
3. 方法装饰器和属性装饰器则按正常代码顺序，先写先执行
