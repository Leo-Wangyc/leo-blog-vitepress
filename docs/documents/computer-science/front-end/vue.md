# Vue2

##Vue2基本指令

### v-once

v-once包裹的内容，只会渲染一次，后续值的更新不会触发组件渲染

### v-html

可用于解析html内容

### v-on/v-if/v-else-if...

经常用到，不多赘述



# Vue3

## Vue2的缺点

- 对typescript不友好
- mixin混入缺陷
- 响应式缺陷，利用defineProperty劫持对象，无法监听新增和删除属性，性能也比较低下
- 逻辑零散





## Vue3的变化

- monorepo源码管理，mono单个，repository仓库，将许多项目的代码存储在同一个仓库中（方便阅读理解源码）
- 采用typescript
- 改为proxy劫持对象
- 编译阶段，生成block tree，优化diff算法
- composition API





## 命令式编程&声明式编程

**命令式编程**：命令浏览器去干某件事情，例如，原生js控制浏览器监听按钮点击事件，改变变量的值，然后将改变的值重新通过innerHTML的方式渲染回页面

**声明式编程**：先通过定义/声明变量和方法完成相应功能，再将其邦洞到模板上





## MVVM架构

vue并没有完全按照MVVM的架构进行设计，但是参考了MVVM的思想

MVVM，即**View, View-Modal, Modal**

- View，视图层，在vue中的体现就是template，定义模板页面
- Model, 模型层，在vue中的体现是data和methods等，属于数据层面
- view-modal，即vue中的Vue.createApp，进行将数据与视图双向绑定，将model层的数据绑定给view，将view的dom事件绑定回model





## Key和diff算法

v-for进行遍历的时候，推荐给每个元素带上key，因为diff算法是根据key进行判断的，所以可以提高更新速度，减少不必要的DOM操作





## SFC开发模式

SFC即single-file components，单文件组件，即推荐使用.vue文件后缀，将template, js, css写在同一个文件内





## CSS

### CSS scoped

scoped表示改css仅在该文件内有效

### CSS中的v-bind

````js
<script setup>
const color1 = 'red'
</script>

<style>
  .red{
    color: v-bind(color1)
  }
</style>
````





##动态绑定

在vue中，通过`v-bind`，或者`:` 可以动态绑定值，例如

````vue
<div :name='leo'></div>
````

在此代码示例中，会将变量leo的值绑到属性name上

但有时候，我们可以直接将变量当做属性本身的名字！

````vue
<div :[name]='leo'></div>
````

这种情况下，name和leo都是变量！



## Composition API

### ref,reactive

不多解释了



### isProxy, isReactive, isReadonly, isRef

用于判断某个对象是否为响应式对象/属性

**注意：ref创建的是RefImpl对象，因此不可以用isProxy来判断**



### toRaw

用于将响应式对象变回普通对象



### shallowReactive, shallowReadonly

创建浅层的代理响应式/只读对象，只有对象的**根级别**的属性具有对应特性



### toRef

可用于拆分响应式对象，令其中的每个属性都具有响应式

````js
<template>
	<button>{{age}}</button>
</template>

// 错误示范
<script setup>
  const reactiveObj = reactive({name: 'Leo', age: 10})
	const { name, age } = reactiveObj
  const addAge = () => {
    age ++ 	// 此时对age进行操作，页面上无响应
  }
</script>

// 正确示范
<script setup>
  const reactiveObj = reactive({name: 'Leo', age: 10})
	const { name, age } = toRef(reactiveObj) // 使用toRef包裹住
  const addAge = () => {
    age ++ 	// 此时对age进行操作，页面上有
  }
</script>
````



### unref

该函数接收一个参数，如果参数是个ref属性，则返回其value，如果不是，则返回参数本身

本质上是如下的一个语法糖

````js
result = unref(val)
result = isRef(val) ? val.value : val
````



### computed

computed和vue2中的用法差别不大

````js
const computedValue = computed(()=> val1 + val2)
````

不过computed函数支持传入set和get

````js
const computedValue = computed({
  get: ()=> val1 + val2,
  set(newVal){
  	first = val1;
    second = val2
	}
})
````



### watch, watchEffect

watch的用法和vue2中差不多，如下

```typescript
const name = ref('Leo')
const obj = reactive({
  age: 18
  height: 180
})

watch(name, ()=> console.log(name))
watch(obj, 
      ()=> console.log(obj), 
      {
  			deep: true,	// 	deep属性对于reactive包裹的对象来说是默认开启的，关闭的话，监听不到对象里面值的变化
  			immediate: false,	// immediate默认关闭，用于决定是否需要函数一进来就调用一次watch函数
			}
)
```

**watchEffect和react中的useEffect效果一样**

**与watch不同的是，watch需要传入监听的值，但是watchEffect不需要，它会自动监听watchEffect里面所有值的变化，任何一个值发生变化，都会触发watchEffect的刷新**

watchEffect在运行时会立即触发一次，最后会监听写在传入其中的函数体内响应式数据，当其中的响应式数据再度发生变化的时候，会自动触发watchEffect的执行

除此之外，watchEffect函数本身的返回值是一个stop函数，当需要停止监听的时候，直接调用即可

````js
const age = ref(18)
const age2 = ref(20)
const stop = watchEffect(()=>{
  console.log('age: ', age) // 每次age发生变化，都会触发该watch
})
const stopWatch = watchEffect(()=>{
  console.log('age2', age2)
  oninvalidate(()=>{
    console.log('before')  // oninvalidate会在watch执行前触发，可用于加一些防抖逻辑
  })
})
const changeAge = () => {
	if(age > 65){
    stop()	// 调用watchEffect本身返回的函数，即可停止监听
  }else{
    age ++
  }
}

````







## 源码分析

### 整体模块划分

整体模块划分为三大块，**compiler-module，renderer-module，reactivity-module**

+ 编译器模块compiler将视图模板编译成一个**渲染函数**
+ 数据响应式模块reactivity将模板中使用到的**数据对象变为为响应式对象**
+ 渲染模块开始进入渲染阶段(render phase)，调用刚刚生成的**渲染函数**，观察响应式数据对象的变化，并返回一个**虚拟的DOM节点**
+ 然后在挂载阶段(mount phase)，调用`mount`函数，使用**虚拟DOM节点**来创建web页面
+ 当观察的响应式对象发生变化时，渲染模块会再次调用**渲染函数**创建一个新的虚拟DOM节点，然后发送到`patch`函数中，进行DOM diff，然后更新视图



### 响应式原理分析

针对reactivity-module响应式模块，其核心原理是：

**通过Proxy代理目标对象的存取器，拦截存取操作，在执行收集依赖track以及出发更新trigger的方法后，再完成原先的存取操作**



#### reactive

> http://www.zhufengpeixun.com/advance/guide/04.reactivity-2.html#reactivity%E6%A8%A1%E5%9D%97%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8
>
> 密码：2558@手机号后四位

reactive函数接收一个对象，返回一个proxy

reactive仅用于创建响应式对象，不用于监测，不涉及到

````typescript
export const reactive = <T extends object>(target: T) => {
  return new Proxy(target, {
    get(target, key, reciever){
      // return target[key]  
      // 此处本应该直接返回target[key]，但是出于保证this的指向始终是指向的调用对象，而不是代理对象本身
      // 详情可参考 https://juejin.cn/post/7101084596053213215
      let res = Reflect.get(target, key, reciever)
      return res
    },
    set(){
      let res = Reflect.set(target, key, reciever)
      return res
    },
    delete(){}
    ...
  })
}
````



#### effect

````typescript
let activeEffect;
export const effect = (fn: Function) => {
  const _effect = function(){ // 设置一个闭包
    activeEffect = _effect 	// 将当前的effect作为全局的当前活跃effect
    fn()	
  }
  _effect() // 传入的函数会调用一下
}
````



#### traker

目前能力有限，有点听不懂，之后再回顾一下

> https://www.bilibili.com/video/BV1dS4y1y7vd?p=10&vd_source=6adac1d9bbd16466fad0c4ec156dc9b7 p10

````typescript
const targetMap = new WeakMap()
export const track = (target, key) => {
  
}
````



#### computed

```typescript
// computed 基本使用
// 1. 传入函数 computed(()=>{})
// 2. 传入对象 computed({ get(){}, set(){} })
// 重点是进行脏值检测

// 此处引入effect
import { effect } from './effect'

export const computed = (getter: Function) => {
  // let getter;
  // let setter;
  // 1. 如果传入一个函数，则为该函数为getter，否则将会对象。
  let _value = effect(getter)
  let cacheValue
  let _dirty = true	// 脏值检测
  
  class ComputedRefImpl {
    get value(){
      if(_dirty){
        cacheValue = _value()
			}
      return cacheValue
    }
  }
  
  return new ComputedRefImpl()
}
```



#### watch

```typescript
// watch的基本使用
// watch(target, (newValue, oldValue)=>{})
// 对于reactive包裹的响应式对象来说，默认deep开启，对于ref包裹的响应式对象，默认deep为false
// watch([target1, target2 , (newValue, oldValue)=>{}, { deep: true, immediate: false })

// TODO:
```



### 虚拟DOM







### Diff算法

#### vue3 diff算法

vue3中比较子元素数组，使用到了diff算法，具体的流程如下：

统一使用案例

````javascript
c1: [a, b, c, d, e, f, g]			// 之前的子元素
c2: [a, b, e, c, d, h, f, g]		// 新的子元素
````

1. **先从头开始比**

   按上面的例子，那么可以排除掉ab不需要重新渲染

   ````javascript
   // 第一轮筛选过后
   [a, b, c, d, e, f, g]				// 之前的子元素
   [a, b, e, c, d, h, f, g]		// 新的子元素
   // 筛选结果，可以不需要重新渲染ab
   [a, b]  [c, d, e, f, g]  // 之前的子元素
   [a, b]  [e, c, d, h, f, g]		// 新的子元素
   ````

2. **再从尾部开始比**

   继续筛选，可以筛掉fg，根据下标，进行unmount

   ````javascript
   // 第二轮筛选过后
   [c, d, e, f, g] 			// 之前的子元素
   [e, c, d, h, f, g]		// 新的子元素
   // 筛选结果，可以不需要重新渲染fg
   [c, d, e]  [f, g]	  // 之前的子元素
   [e, c, d, h]  [f, g]		// 新的子元素
   ````

3. **然后判断是否为最简单的插入和删除操作**

   本情况，另起一个新例子，不看上面的，如下

   ````javascript
   // 案例1 --------------------------
   [a, b, c]
   [a, b, c, d]	
   // 第一二轮筛选完成后，发现老节点已经没了，剩下一个新节点d，直接进行插入d的操作即可
   
   // 案例2 --------------------------
   [a, b, c, d]
   [a, b, c]
   // 第一二轮筛选完成后，发现新节点已经没了，剩下一个老节点d，直接进行删除d的操作即可
   ````

   上面两案例中，经过第一轮，第二轮的筛选过后，会存在一个情况，那就是新或老元素节点其中一方已经空了，没了，那就不需要进行下面第四步的乱序比较了，直接进行插入和删除即可

4. **如果不是上述的简单情况，那么就需要进行复杂比对了**

   继续回到统一案例中，当经过一二轮筛选后，而且发现新老节点都还有剩下，那么就不会走第三步。接下来，就需要进行复杂的乱序比较了

   ````javascript
   // 经过第一二轮的筛选，剩下的为
   c1: [a,b] [c, d, e] [f, g]	  // 老节点
   c2: [a,b] [e, c, d, h] [f, g]	 // 新节点
   // 其中，c1代表老节点List, c2代表新节点list
   
   // 还有几个变量要注意，s1, e1, s2, e2，分别对应老节点的开始，老节点的结束，新节点的开始，新节点的结束对应的数组下标index
   				 	(s1)  (e1)
   c1: [a,b] [c, d, e] [f, g]	  // 老节点
   c2: [a,b] [e, c, d, h] [f, g]	 // 新节点
   					(s2)      (e2)
   // s1 = 2, e1 = 4
   // s2 = 2, e2 = 5
   ````

   - 4.1 第一步，先创建一个c2中新节点的map映射表

     ````javascript
     let keyToNewIndexMap = new Map()
     // 从s2到e2，创建映射表
     for(let i = s2; i<= e2; i++){	
       // 键为子元素的key，值为子元素的c2数组下标
       keyToNewIndexMap.set(c2[i].key, i)
     }
     // keyToNewIndexMap
     // [e:2, c:3, d:4, h:5]
     ````

   - 4.2 第二步，循环老元素c1，看新的里面有没有，如果有，比较差异并添加，如果没有，就删掉老元素

     ````javascript
      
     ````

     



#### 最长递增子序列















