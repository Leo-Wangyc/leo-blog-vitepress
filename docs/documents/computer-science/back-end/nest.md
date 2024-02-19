## Directory

按照官网方式搭建项目，src文件夹下会生成如下基本boilerplate files:

| boilerplate files        | Introduction                                                 |
| ------------------------ | ------------------------------------------------------------ |
| `app.controller.ts`      | A basic controller with a single route. 单个路由的controller，主要用于控制路由和service层的匹配 |
| `app.controller.spec.ts` | The unit tests for the controller. controller的单元测试文件  |
| `app.module.ts`          | The root module of the application. 应用的根模块             |
| `app.service.ts`         | A basic service with a single method. 单个controller的service层，处理业务逻辑 |
| `main.ts`                | The entry file of the application which uses the core function `NestFactory` to create a Nest application instance. |



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

#### REST API

选择 REST API 表示你打算通过HTTP协议实现RESTful风格的接口。REST（Representational State Transfer）是一种设计风格，它侧重于使用标准的HTTP方法（如GET、POST、PUT、DELETE）来处理资源。在Web应用程序中非常常见。

#### GraphQL (code first)

GraphQL (code first) 方法让你可以使用TypeScript类和装饰器来定义GraphQL模式。在这种方法中，你将从代码开始定义模式，NestJS将自动根据你的代码生成GraphQL模式定义。这种方式让你可以享受TypeScript的强类型特性，同时更容易维护和重构。

#### GraphQL (schema first)

与code first方法相反，GraphQL (schema first) 方法要求你先定义GraphQL模式（通常是`.graphql`文件），然后根据这个模式来实现解析器。这种方法适合那些习惯于从模式开始并且希望完全控制GraphQL模式的开发者。

#### Microservice (non-HTTP)

Microservice (non-HTTP) 选项是为希望构建使用非HTTP协议的微服务应用程序的开发者准备的。NestJS支持多种微服务传输协议，如TCP、RabbitMQ、Kafka等。这适合构建分布式系统和微服务架构。

#### WebSockets

WebSockets 提供了全双工的通信通道，允许服务器和客户端之间进行实时、双向的通信。选择这个选项意味着你打算使用WebSockets来实现与 `UserInfo` 资源的实时交互，这在需要实时功能的应用程序中很有用，比如在线聊天应用或实时通知系统。



#### 目录树

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

1. `dto` 目录用于存放数据传输对象（Data Transfer Objects），它们用于封装从客户端接收到的数据。
2. `entities` 目录通常包含与数据库表直接映射的模型。
3. `.controller.ts` 文件定义了与特定路由相关的处理逻辑。
4. `.service.ts` 文件包含了业务逻辑。
5. `.module.ts` 文件用于组织同一模块下的各种元素，如控制器和服务。
6. `.spec.ts` 文件是单元测试文件，分别对应控制器和服务的测试。





### Routing



#### 快速创建controller

在nest.js中，使用

```bash
nest g resource [name]
```

可以快速生成CRUD control
