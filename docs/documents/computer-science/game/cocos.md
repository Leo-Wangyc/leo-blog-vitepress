

# Cocos

## Cocos面板

基础面板

![image-20231105230127536](../../../public/assets/cocos/image-20231105230127536.png)





## Node

cocos中，比较重要的概念就是节点



### Position

position用于描述节点的位置，可以通过覆盖position的方式对position进行修改，不然的话改变的只是引用值，不会触发cocos的内部渲染

```javascript
export class test extends Component {
  start() {
    // 非标准获取位置的方式
    console.log(this.node.position);
  }

  update(deltaTime: number) {
    const p = this.node.position;
    // position + 1是向右运动
    p.x += 1;
    this.node.position = p;
  }
}
```

获取position方式：**getPosition(Vec3?)**

设置position方式：**setPosition(Vec3)**

比较建议使用已有变量的重复使用的方式对position进行操作，不然会产生大量垃圾

```js
export class test extends Component {
  start() {
    
    // ❌ 错误方式：this.node.getPosition()在不传入Vec3三维向量对象的时候，会默认新建一个，如果放到update中，每秒会生成60个对象，十分消耗性能（虽然会被js垃圾回收机制回收掉）
    const currentP = this.node.getPosition()
    currentP.x += 300
    this.node.setPosition(currentP)
    
    // ✅ 正确方式：
    const currentP = new Vec3()
    this.node.getPosition(currentP)
    currentP.x += 300
    this.node.setPosition(currentP)
  }

  update(deltaTime: number) {}
}
```

此外，cocos提供了简便的创建Vec2和Vec3的方式，也推荐在类里面直接**创建V3对象**

```js
export class test extends Component {
  // 语法糖
  curPos = v3()
  
  start() {}

  update(deltaTime: number) {
    // 直接使用全局的V3对象，可以保证不会产生新的垃圾变量，优化性能
    this.node.getPosition(this.curPos)
    this.curPos.x += 1
    this.node.setPosition(this.curPos)
  }
}
```



### angle

angle和position不一样，angle可以直接通过+1的方式进行修改

```js
export class test extends Component {
  start() {
    console.log(this.node.angle);
  }

  update(deltaTime: number) {
    // 需要注意，360度和0度一样，最好做一个满360 - 360的处理
    this.node.angle += 1
  }
}
```

### rotation

一般3d游戏会需要用到

### scale





## 事件

可以给节点绑定上一系列事件

```typescript
import { Node } from 'cc'
export class test extends Component {
  start() {
    this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this)
    this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
    this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this)
    this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this)
  }
  // 鼠标点击
  onTouchStart(event: EventTouch){}
  // 鼠标移动
  onTouchMove(event: EventTouch){}
  // 鼠标松开
  onTouchEnd(event: EventTouch){}
  // 鼠标
  onTouchCancel(event: EventTouch){}

  update(deltaTime: number) {
  }
}
```



### 真实像素和UI像素

一般我们在对节点进行位置操作的时候，都需要操作UI的值，而不是本身相对于左下角的点的值，例如：

**event.getDeltaX()**

**event.getDeltaY()**

这两个方法，用于获取事件触发时，x,y相对于**设备像素**的像素变化！也就是说，当设备像素越高，x,y的变化越大，就会出现不跟手的情况！因为cocos的画布始终是720x1280，如果设备像素为1440 x 2560，那么每次移动事件触发，x,y的变化量其实相对画布来说都是翻倍的！

```typescript
export class test extends Component {
  start() {
    this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
  }
  // 鼠标移动
  onTouchMove(event: EventTouch){
    // 获取相对于设备像素移动的x和y的值
    const dx = event.getDeltaX()
    const dy = event.getDeltaY()
    // 获取当前相对于画布(0,0)点的像素的值
    const x = this.node.position.x;
    const y = this.node.position.y;
    // 移动当前节点，使其跟随鼠标移动，会发现不跟手
    this.node.setPosition(x + dx, y + dy)
  }
  
  update(deltaTime: number) {}
}
```

在上述例子中，就会出现移动节点不跟手的情况，在这种情况下，我们需要使用UI像素进行操作

**event.getUIDelta()**

```typescript
export class test extends Component {
  start() {
    this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
  }
  // 鼠标移动
  onTouchMove(event: EventTouch){
    // 获取相对于画布像素移动的x和y的值
    const delta = event.getUIDelta()
    // 获取当前相对于画布(0,0)点的像素的值
    const dx = delta.x;
    const y = delta.y;
    // 移动当前节点，使其跟随鼠标移动，此时相对画布来说就是正常的
    this.node.setPosition(x + dx, y + dy)
  }
  
  update(deltaTime: number) {}
}
```

所以对于Position来说，也是一样的

```typescript
export class test extends Component {
  start() {
    this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this)
  }
  // 鼠标点击
  onTouchStart(event: EventTouch){
    const loc = event.getLocation()  // 此处获取的是设备像素的位置值，大小不固定，跟随设备精度和大小而变化
    const uiLoc = event.getUILocation()	// 此处获取的是cocos canvas画布的位置值，固定720x1280
  }
  
  update(deltaTime: number) {}
}
```

