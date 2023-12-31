

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

### 鼠标事件

鼠标事件挂载在**Node.EventType**下

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



### 键盘事件

键盘事件挂载在**Input.EventType**下

```typescript
import { Node } from 'cc'
export class test extends Component {
  start() {
    this.node.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
  }
  // 键盘按下
  onKeyDown(event: EventTouch){
    event.key_word = KEY_W
  }

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



## 脚本中操作其他节点

在cocos中，我们使用this.node操作的时候，只能操作该脚本挂载的节点，如果想要操作其他节点，那么我们需要使用props的方式进行传入

**@property(Node) [NodeName]: Node** 的格式，可以将其他节点挂载到当前脚本中进行操作，例如，我们想要挂载一个button节点到整个Node的节点脚本中，首先，在脚本中进行property定义

```typescript
export class test extends Component {
  // 将button传进来，可以对button进行操作
  @property(Node) button: Node;
  start() {}
}
```

定义成功后，在cocos的页面上的点击该脚本所挂载的组件，在其组件菜单栏中，会对应出现一个命名的组件（就是上述代码示例中所写的的button），此时可以将需要挂载的button节点拖拽到该位置上进行绑定

<img src="../../../public/assets/cocos/image-20231107221936467.png" alt="image-20231107221936467" style="zoom:50%;" />

<img src="../../../public/assets/cocos/image-20231107222026300.png" alt="image-20231107222026300" style="zoom:50%;" />

此时在脚本中，this.node获取到的将会是该脚本挂载的node节点本身，而this.button获取到的将会是挂载传进来的button节点



## 缓动系统

要介绍缓动系统，我们首先将cocos中的节点绑定到脚本上

按照脚本中操作其他节点的方式，我们将button挂载进来，并对touchEnd事件进行监听

```typescript
@ccclass("test")
export class test extends Component {
  @property(Node) button: Node;
  start() {
    this.button.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
  }
}
```

然后，编写onTouchEnd事件，设置缓动函数

```typescript
onTouchEnd(event: EventTouch) {
  this.button.setScale(0.9, 0.9);
  this.myAnimation();
}
```

编写缓动函数**tween**，有以下注意点

1. cocos的渲染原理，有点类似于vue等mvvm框架的原理，利用数据变化驱动视图更新，而不是直接更改视图，故而无论是位置，大小，旋转度，颜色等，都可以先对数据进行改变，然后再用改变后的数据驱动视图的update
2. 对于无限播放的动画，我们需要使用到**repeatForever()**函数，该函数可以直接传入tween进行循环播放，也可以在union了多个tween之后，设置.repeatForever，代码分别如下（1,1-1对应y轴变化驱动视图变化，采用repeatForever函数传入tween的方式。2,2-1对应颜色变化，采用多个tween.union再repeat的形式）：

```typescript
myAnimation() {
    // 注意，我们并不是直接操作tween去改变节点的位置，而是通过tween，改变数据，再由数据驱动节点的相关改变
    // 1. 例如，我们可以设置一个obj,里面包含了y轴的位置信息，那么我们就可以通过tween改变y的值，然后在onUpdate里面，由改动过的y值，利用setPosition方式驱动节点的重新渲染
    const obj = {
      y: 0,
    };
    // 2. 此外，我们还可以设置一个颜色vec3向量变量，里面包含了颜色的信息
    const color = v3(255, 255, 255);
    // 1 - 1: tween改变y值从而setPosition改变y轴
    tween(obj)
      .repeatForever(
        // 值得一提的是，repeatForever里面可以包含需要循环播放的tween实现循环播放（1-1），也可以通过多个tween进行.union的方式再.repeatForever(2-1)
        tween(obj)
          .to(
            3, // 此处的数字代表动画时间
            { y: 200 },
            {
              onUpdate: (target, ratio) => {
                this.button.setPosition(this.button.position.x, obj.y);
              },
              easing: "quadOut",
            }
          )
          .to(
            3,
            { y: 0 },
            {
              onUpdate: (target, ratio) => {
                this.button.setPosition(this.button.position.x, obj.y);
              },
              easing: "quadOut",
            }
          )
      )
      .start();
    // 2-1: 颜色的循环变化
    tween(color)
      .to(
        3,
        { x: 10, y: 20, z: 30 },
        {
          onUpdate(target, ratio) {
            this.button.color = new Color(color.x, color.y, color.z);
          },
        }
      )
      .to(
        3,
        { x: 120, y: 0, z: 100 },
        {
          onUpdate(target, ratio) {
            this.button.color = new Color(color.x, color.y, color.z);
          },
        }
      )
      .union() // 此处通过先将多个tween进行union，再repeat forever
      .repeatForever()
      .start();
  }
```





## 母鸡接蛋游戏实操

### 前期项目搭建

首先，我们需要创建好游戏资源库的目录，资源不能随意堆放，新建图片和脚本文件夹，并将所需要的素材导入

<img src="../../../public/assets/cocos/image-20231123231203887.png" alt="image-20231123231203887" style="zoom:50%;" />

随后，在canvas画布下，新增一个GameRoot的节点，表示游戏的根节点，同时，创建好所需的相关节点

<img src="../../../public/assets/cocos/image-20231123231432889.png" alt="image-20231123231432889" style="zoom:50%;" />

随后，将chiken素材导入chiken节点，调整好大小，并复制出多个

<img src="../../../public/assets/cocos/image-20231123231727618.png" alt="image-20231123231727618" style="zoom:50%;" />

在chiken的根节点下，创建layout组件

<img src="../../../public/assets/cocos/image-20231123231827980.png" alt="image-20231123231827980" style="zoom:50%;" />

设置好type为horizontal水平排布，让多个子节点排在水平线上

resize mode为container，可以让子节点自动适应画布宽度

spacing x，可以改变子节点之间的间距

affected by scale，可以让改节点下的子节点都跟随父节点的比例进行变换

<img src="../../../public/assets/cocos/image-20231123233925382.png" alt="image-20231123233925382" style="zoom:50%;" />

<img src="../../../public/assets/cocos/image-20231123232217411.png" alt="image-20231123232217411" style="zoom:50%;" />

同样的方式拖入player，然后新建GameRoot空脚本，挂载到gameroot节点上，进行编辑

脚本编写第一步，先将三个根节点在gameroot中引入，根节点最好带上root后缀

```typescript
export class GameRoot extends Component {
  @property(Node) player: Node;
  @property(Node) chickenRoot: Node;
  @property(Node) eggsRoot: Node;

  start() {}

  update(deltaTime: number) {}
}
```

随后回到cocos页面，将三个根节点拖入到GameRoot的组件面板中，方便我们直接通过this获取位置

<img src="../../../public/assets/cocos/image-20231123233056654.png" alt="image-20231123233056654" style="zoom:50%;" />

继续回到代码中，通过input.on监听键盘事件



### player移动逻辑

首先，对键盘事件进行监听

```typescript
start() {
  this.openInputEvent();
}

openInputEvent() {
  input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
}

onKeyDown(event: EventKeyboard) {
  switch (event.keyCode) {
    case KeyCode.KEY_A:
      // 左移逻辑
      break;
    case KeyCode.KEY_D:
      // 右移逻辑
      break;
  }
}
```

随后，获取每只鸡的x坐标，用于配置player的移动

```typescript
playerPosIndex = 0;
chickenPosArr = [];

initData() {
  for (let i = 0; i < this.chickenRoot.children.length; i++) {
    const currentChicken = this.chickenRoot[i];
    this.chickenPosArr[i] = currentChicken.position.x;
  }
}

start() {
  this.initData();
  this.openInputEvent();
}
```

然后编写移动逻辑

```typescript
onKeyDown(event: EventKeyboard) {
  switch (event.keyCode) {
    case KeyCode.KEY_A:
      // 左移传入-1
      this.movePlayer(-1);
      break;
    case KeyCode.KEY_D:
      // 右移传入1
      this.movePlayer(1);
      break;
  }
}

movePlayer(dir: 1 | -1) {
  this.playerPosIndex += dir;
  if (this.playerPosIndex < 0) {
    this.playerPosIndex = 0;
  }
  if (this.playerPosIndex > this.chickenRoot.children.length - 1) {
    this.playerPosIndex = this.chickenRoot.children.length - 1;
  }
  this.renderPlayerPos();
}

renderPlayerPos() {
  const x = this.chickenPosArr[this.playerPosIndex];
  const y = this.player.position.y;
  this.player.setPosition(x, y);
}
```

最后，别忘了初始化player的位置，这样可以让player在进游戏的时候位置保持在最左边

```typescript
initData() {
  ...
  this.renderPlayerPos();
}
```

最后效果如图

<img src="../../../public/assets/cocos/image-20231124000342656.png" alt="image-20231124000342656" style="zoom:50%;" />



### 鸡蛋的逻辑

将鸡蛋设置为预制体（prefab）

首先，将egg拖到egg节点下

<img src="../../../public/assets/cocos/image-20231126195705136.png" alt="image-20231126195705136" style="zoom:50%;" />

然后，再把egge拖回到assets中，这样，会自动将egg变成预制体，双击预制体，还能对其进行编辑

<img src="../../../public/assets/cocos/image-20231126195751191.png" alt="image-20231126195751191" style="zoom:50%;" />

then，去脚本中挂载鸡蛋节点，并绑定到gameroot节点上

```typescript
export class GameRoot extends Component {
 	...
  @property(Prefab) eggPrefab: Prefab;
	...
}
```

then，编写鸡蛋生成的脚本。

通过**instantiate()**可以实例化预制体

通过**addChild**将生成的实例化预制体绑定到节点上

通过**schedule(callback, interval, times, ..) **设置定时器

```typescript
start() {
  this.initData();
  this.openInputEvent();
  this.startCreateEggs();
}

startCreateEggs() {
  this.schedule(this.createSingleEgg, 2);
}

createSingleEgg() {
  const randomIndex = Math.floor(Math.random() * this.chickenPosArr.length);
  const egg = instantiate(this.eggPrefab);
  this.eggsRoot.addChild(egg);
  egg.setPosition(
    this.chickenPosArr[randomIndex],
    this.chickenRoot.position.y
  );
}
```

最后，在update中补充鸡蛋下落的动画，并令其在触底的时候进行销毁

通过遍历所有的eggRoot下的eggs，通过**deltaTime**对其y轴坐标进行减少

如果触底（canvas画布中心为y轴0点，1280分辨率下，取一半，也就是640，为底端），通过**destory()**来销毁当前预制体

```typescript
update(deltaTime: number) {
  for (let i = 0; i < this.eggsRoot.children.length; i++) {
    const currentEgg = this.eggsRoot.children[i];
    const x = currentEgg.position.x;
    const y = currentEgg.position.y - 150 * deltaTime;
    currentEgg.setPosition(x, y);
    
    if(y<-600){
      currentEgg.destroy()
    }
  }
}
```

### 碰撞事件

给**player**组件和**egg预制体**分别加上**刚体组件**和**碰撞盒组件**，⚠️**注意，两者要同时添加才可生效！碰撞是两个物体的碰撞！而且是加在egg预制体上！而不是加在eggRoot上！**

其中，刚体组件RigidBody2d需要勾选**enable contact listener**，这样发生碰撞事件才能被监听到

同时，type需要选为**animated**，其他type的作用可以参考文档

在碰撞盒组件BoxConllider2d中，需要勾选sensor，这样会触发回调函数

<img src="../../../public/assets/cocos/image-20231126210248608.png" alt="image-20231126210248608" style="zoom:50%;" />

对player节点进行碰撞事件监听

首先通过**getComponent**获取到player身上挂载的碰撞体collider2D组件，boxCollider2D也可以，不过collider2D可以同时监听到box, circle和polygon的类型的碰撞体

随后，启动监听该组件的碰撞事件**Contact2DType.BEGIN_CONTACT**

在碰撞事件发生的时候，需要消除otherCollider，也就是与player节点发生碰撞的这个组件，在本案例中也就是egg组件。此时不可以直接**otherCollider.node.destroy()**， 因为此时物理碰撞事件还在进行中，直接销毁会报错，我们需要通过**director.once**，在物理碰撞事件发生之后，再对组件进行销毁

```typescript
 start() {
   ...
   this.onCollider2DEvent();
}

onCollider2DEvent() {
  const comp = this.player.getComponent(Collider2D);
  // 写boxCollider2D也可以，不过用Collider2D可以获取改节点下任何类型的碰撞体
  // const comp = this.player.getComponent(BoxCollider2D);
  console.log("comp", comp);
  comp.on(
    Contact2DType.BEGIN_CONTACT,
    (
      selfCollider: Collider2D, // 当前碰撞组件
      otherCollider: Collider2D, // 被其他碰撞体所碰撞的那个组件
      contact: IPhysics2DContact | null // 当前碰撞中的信息
    ) => {
      director.once(
        Director.EVENT_AFTER_PHYSICS,
        () => {
          otherCollider.node.destroy();
        },
        this
      );
    },
    this
  );
}
```

### 封装得分，hp展示

新增hp和score的label，并进行property封装，挂载到gameRoot上

```typ
@property(Label) scoreLabel: Label;
@property(Label) hpLabel: Label;

score = 0;
hp = 3;
```

<img src="../../../public/assets/cocos/image-20231126213105304.png" alt="image-20231126213105304" style="zoom:50%;" />

在start中，封装初始化展示逻辑，通过label

```typescript
start() {
  ...
  this.initLabel();
}

initLabel() {
  this.renderScoreLabel();
  this.renderHpLabel();
}

renderHpLabel() {
  this.hpLabel.string = `HP: ${this.hp}`;
}

renderScoreLabel() {
  this.scoreLabel.string = `${this.score} 分`;
}
```

在已经写好的组件摧毁事件后，添加得分/掉血的逻辑，并触发label的更新

```typescript
// score
director.once(
  Director.EVENT_AFTER_PHYSICS,
  () => {
    otherCollider.node.destroy();
  },
  this
);
this.score += 1;
this.renderScoreLabel();

// hurt
if (y < -600) {
  currentEgg.destroy();
  this.hp -= 1;
  this.renderHpLabel();
  this.checkIsGameOver();
}
checkIsGameOver() {
  if (this.hp <= 0) {
    console.log("Game Over");
  }
}
```

### 项目完整代码

自此，整个游戏项目即以完结，GameRoot完整代码如下

```typescript
import {
  _decorator,
  Component,
  input,
  Node,
  Input,
  EventKeyboard,
  KeyCode,
  Prefab,
  instantiate,
  Collider2D,
  BoxCollider2D,
  Contact2DType,
  Collider,
  IPhysics2DContact,
  director,
  Director,
  Label,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameRoot")
export class GameRoot extends Component {
  @property(Node) player: Node;
  @property(Node) chickenRoot: Node;
  @property(Node) eggsRoot: Node;
  @property(Prefab) eggPrefab: Prefab;

  @property(Label) scoreLabel: Label;
  @property(Label) hpLabel: Label;

  playerPosIndex = 0;
  chickenPosArr = [];

  score = 0;
  hp = 3;

  initData() {
    for (let i = 0; i < this.chickenRoot.children.length; i++) {
      const currentChicken = this.chickenRoot.children[i];
      this.chickenPosArr[i] = currentChicken.position.x;
    }
    this.renderPlayerPos();
  }

  start() {
    this.initData();
    this.initLabel();
    this.openInputEvent();
    this.startCreateEggs();
    this.onCollider2DEvent();
  }

  initLabel() {
    this.renderScoreLabel();
    this.renderHpLabel();
  }

  renderHpLabel() {
    this.hpLabel.string = `HP: ${this.hp}`;
  }

  renderScoreLabel() {
    this.scoreLabel.string = `${this.score} 分`;
  }

  onCollider2DEvent() {
    const comp = this.player.getComponent(Collider2D);
    // 写boxCollider2D也可以，不过用Collider2D可以获取改节点下任何类型的碰撞体
    // const comp = this.player.getComponent(BoxCollider2D);
    comp.on(
      Contact2DType.BEGIN_CONTACT,
      (
        selfCollider: Collider2D, // 当前碰撞组件
        otherCollider: Collider2D, // 被其他碰撞体所碰撞的那个组件
        contact: IPhysics2DContact | null // 当前碰撞中的信息
      ) => {
        director.once(
          Director.EVENT_AFTER_PHYSICS,
          () => {
            otherCollider.node.destroy();
          },
          this
        );
        this.score += 1;
        this.renderScoreLabel();
      },
      this
    );
  }

  startCreateEggs() {
    this.schedule(this.createSingleEgg, 2);
  }

  createSingleEgg() {
    const randomIndex = Math.floor(Math.random() * this.chickenPosArr.length);
    const egg = instantiate(this.eggPrefab);
    this.eggsRoot.addChild(egg);
    egg.setPosition(
      this.chickenPosArr[randomIndex],
      this.chickenRoot.position.y
    );
  }

  openInputEvent() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this.movePlayer(-1);
        break;
      case KeyCode.KEY_D:
        this.movePlayer(1);
        break;
    }
  }

  movePlayer(dir: 1 | -1) {
    this.playerPosIndex += dir;
    if (this.playerPosIndex < 0) {
      this.playerPosIndex = 0;
    }
    if (this.playerPosIndex > this.chickenRoot.children.length - 1) {
      this.playerPosIndex = this.chickenRoot.children.length - 1;
    }
    this.renderPlayerPos();
  }

  renderPlayerPos() {
    const x = this.chickenPosArr[this.playerPosIndex];
    const y = this.player.position.y;
    this.player.setPosition(x, y);
  }

  checkIsGameOver() {
    if (this.hp <= 0) {
      console.log("Game Over");
    }
  }

  update(deltaTime: number) {
    for (let i = 0; i < this.eggsRoot.children.length; i++) {
      const currentEgg = this.eggsRoot.children[i];
      const x = currentEgg.position.x;
      const y = currentEgg.position.y - 150 * deltaTime;
      currentEgg.setPosition(x, y);
      if (y < -600) {
        currentEgg.destroy();
        this.hp -= 1;
        this.renderHpLabel();
        this.checkIsGameOver();
      }
    }
  }
}
```





## 物理系统

### 刚体&碰撞体

在项目中，新建三个白盒子

<img src="../../../public/assets/cocos/image-20231127224237345.png" alt="image-20231127224237345" style="zoom:50%;" />

随后，将底下这个设置为静态刚体，其他两个设置为动态刚体，均增加上碰撞体组件，即可实现自由落体

<img src="../../../public/assets/cocos/image-20231127224337905.png" alt="image-20231127224337905" style="zoom:50%;" />



### 物理关节

#### 鼠标调试关节

**MouseJoint2D**，使用该关节绑定到节点上，可以用鼠标任意拖拽节点

<img src="../../../public/assets/cocos/image-20231127224914977.png" alt="image-20231127224914977" style="zoom:50%;" />

效果如下

<img src="../../../public/assets/cocos/image-20231127224956717.png" alt="image-20231127224956717" style="zoom:50%;" />





#### 距离关节

给box2添加上**DistanceJoint2D**,可以实现距离关节，用于保证两个节点之间的距离一致

collide conneted用于控制是否为碰撞体

connected body这里，需要把box1拖进来，令box1跟随box2移动

取消auto calc distance，设定固定300长度，可以让盒子距离最大为300，**像是一根没有弹力的绳子**

<img src="../../../public/assets/cocos/image-20231127225317461.png" alt="image-20231127225317461" style="zoom:50%;" />



#### 弹簧关节

弹簧关节比较重要，用到的地方很多

给box2添加上**SpringJoint2D**

同理，添加上碰撞体事件，设置好关节连接体

frequency用于调节弹簧弹力大小

<img src="../../../public/assets/cocos/image-20231127230829540.png" alt="image-20231127230829540" style="zoom:50%;" />



#### 轮子关节

利用轮子组件**WheelJoint2D**，我们可以让组件实现旋转

connected body用于挂载轮子组件，此处不是挂box1,而是挂box2本身

enable motor意为是否需要启动马达，启动马达后，组件会有动力进行自转

motor speed和max motor torque用于设置马达的方向和力度，speed为负则为反方向转

<img src="../../../public/assets/cocos/image-20231127231220912.png" alt="image-20231127231220912" style="zoom:50%;" />
