## Introduce

> 视频参考：https://www.bilibili.com/video/BV1Lg4y197u1/?spm_id_from=333.999.0.0&vd_source=6adac1d9bbd16466fad0c4ec156dc9b7

Nest是一个用于构建高效，可扩展的Node.js服务器端应用的框架

结合了**OOP(面向对象编程)**，**FP(函数式编程)**和**FRP(函数式反应式编程)**的元素

Nest在常见的框架(Express)上进行进一步封装



## Directory

按照官网方式搭建项目，src文件夹下会生成如下基本boilerplate files:

| boilerplate files        | Introduction                                                 |
| ------------------------ | ------------------------------------------------------------ |
| `app.controller.ts`      | A basic controller with a single route. 单个路由的controller，主要用于控制路由和service层的匹配 |
| `app.controller.spec.ts` | The unit tests for the controller. controller的单元测试文件  |
| `app.module.ts`          | The root module of the application. 应用的根模块             |
| `app.service.ts`         | A basic service with a single method. 单个controller的service层，处理业务逻辑 |
| `main.ts`                | The entry file of the application which uses the core function `NestFactory` to create a Nest application instance. |



### nest-cli.json

用于对nest的各项进行配置







## Knowledge Base

### LOC和依赖注入

TODO



### Decorator

装饰器decorator是一种函数的语法糖，可理解为用于初始化函数，将一系列函数属性或者方法通过装饰器方式添加到某些特定的类/方法/属性上

#### 类装饰器

类装饰器的type为**classDecorator**，例如：

```typescript
const myClassDecorator: classDecorator = (target: any) => {
	console.log(target)	// target指向实例类，即Leo
  target.prototype.name = 'leo'
}
// 以下两种写法互相等价
// 1:
@myClassDecorator
class Leo {
  constructor(){}
}
// 2:
class Leo {
  constructor(){}
}
myClassDecorator(Leo)
```



#### 属性装饰器

类装饰器的type为**propertyDecorator**，例如：

```typescript
const myPropertyDecorator: propertyDecorator = (target: any, key: string | symbol) => {
	console.log(target, key)	// target指向原型对象。key指向属性的key值，即name
}

class Leo {
  @myPropertyDecorator	// 属性装饰器用于装饰属性
  public name:string
  constructor(){}
}
```



#### 方法装饰器

类装饰器的type为**methodDecorator**，例如：

```typescript
const myMethodDecorator: methodDecorator = (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
	console.log(target, key, descriptor)	// target指向原型对象。 key指向属性的key值，即getName。descriptor为方法的操作对象，{ writable, enumerable, configurable }
}

class Leo {
  public name:string
  constructor(){}
  
  @myMethodDecorator
  getName(){}
}
```



#### 参数装饰器

类装饰器的type为**parameterDecorator**，例如：

```typescript
const myParameterDecorator: parameterDecorator = (target: any, key: string | symbol, index: number) => {
	console.log(target, key, index)	// target指向原型对象。 key指向属性的key值，即getName。index为索引，参数所在位置，即1
}

class Leo {
  public name:string
  constructor(){}
  
  @myMethodDecorator
  getName(name: string, @myParameterDecorator age: number){}
}
```





## Controllers

### 定义

Controllers are responsible for handling incoming **requests** and returning **responses** to the client.



### 快速创建CURD

在nest.js中，使用

```bash
nest g resource [name]
```

可以快速生成CRUD controller

生成过程中会询问两个问题

```bash
leo-lair-backend git:(v1.0.0) nest g resource UserInfo
What transport layer do you use? (Use arrow keys)
❯ REST API 
  GraphQL (code first) 
  GraphQL (schema first) 
  Microservice (non-HTTP) 
  WebSockets 
```

其分别含义对应为：

**REST API**

选择 REST API 表示你打算通过HTTP协议实现RESTful风格的接口。REST（Representational State Transfer）是一种设计风格，它侧重于使用标准的HTTP方法（如GET、POST、PUT、DELETE）来处理资源。在Web应用程序中非常常见。

**GraphQL (code first)**

GraphQL (code first) 方法让你可以使用TypeScript类和装饰器来定义GraphQL模式。在这种方法中，你将从代码开始定义模式，NestJS将自动根据你的代码生成GraphQL模式定义。这种方式让你可以享受TypeScript的强类型特性，同时更容易维护和重构。

**GraphQL (schema first)**

与code first方法相反，GraphQL (schema first) 方法要求你先定义GraphQL模式（通常是`.graphql`文件），然后根据这个模式来实现解析器。这种方法适合那些习惯于从模式开始并且希望完全控制GraphQL模式的开发者。

**Microservice (non-HTTP)**

Microservice (non-HTTP) 选项是为希望构建使用非HTTP协议的微服务应用程序的开发者准备的。NestJS支持多种微服务传输协议，如TCP、RabbitMQ、Kafka等。这适合构建分布式系统和微服务架构。

**WebSockets**

WebSockets 提供了全双工的通信通道，允许服务器和客户端之间进行实时、双向的通信。选择这个选项意味着你打算使用WebSockets来实现与 `UserInfo` 资源的实时交互，这在需要实时功能的应用程序中很有用，比如在线聊天应用或实时通知系统。



### 文件解释

当快速创建完毕之后，会在原本的src文件夹下创建出刚刚快速创建的文件夹src/user-info

其中，目录树结构如下：

```md
user-info
├── dto
│   ├── create-user-info.dto.ts
│   └── update-user-info.dto.ts
├── entities
│   └── user-info.entity.ts
├── user-info.controller.spec.ts
├── user-info.controller.ts
├── user-info.module.ts
├── user-info.service.spec.ts
└── user-info.service.ts
```

#### dto 目录
用于存放数据传输对象（Data Transfer Objects），它们用于封装从客户端接收到的数据。

#### entities 目录

通常包含与数据库表直接映射的模型。

#### controller

定义了与特定路由相关的处理逻辑，主要用于分发前端请求的url和后端对应需要调用的service

#### service

包含了业务逻辑，主要业务代码，调用接口之后的逻辑都写在这里

#### module

用于组织同一模块下的各种元素，如控制器controller和服务service

#### service/controller.spec

是单元测试文件，分别对应控制器和服务的测试



### Routing

#### 快速创建controller

在nest.js中，使用

```bash
nest g resource [name]
```

可以快速生成CRUD control
