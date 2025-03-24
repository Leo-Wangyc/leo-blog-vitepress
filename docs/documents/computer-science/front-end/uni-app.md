# Uniapp介绍

`uni-app` 是一个使用 [Vue.js](https://vuejs.org/) 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/飞书/QQ/快手/钉钉/淘宝）、快应用等多个平台。



# 打包小程序注意事项

## 加白

需要记得添加域名白名单，未添加白名单的情况下，接口调用会失效，而且看不出来！







# 项目架构最佳实践

## CSS

CSS样式部分采用less或者scss均可

小项目无需使用css module，大项目可以引入

### 单位转换

uniapp默认使用750px的设计稿进行px和rpx的转换，如果UI提供的设计稿为其他尺寸，需要在偏好设置里面进行设置

比例的设置方式为设计稿宽度 除以 750， 例如，375px的设计稿，比例为 375 / 750 = 0.5

> HBuilderX -> 偏好设置 -> 语言服务配置 -> px转rpx/upx比例

### 样式引入

对于scss文件来说，引入要用这种写法：

```css
<style lang="scss" scoped>
	@import 'index';
</style>
```

而不能写成

```css
<style scoped>
	@import url(./index.scss);
</style>
```



### placeholder样式更改

通过placeholder-class进行类定义更改

```html
<input type="text" class="search-input" placeholder-class="search-input-placeholder" placeholder="输入关键词搜索" />

<style scoped>
/deep/ .search-input-placeholder {
	color: red;
}
</style>

```



### 输入框遮盖问题

> https://blog.csdn.net/yangsi0706/article/details/109031335





## 路由

uniapp路由采用小程序标准的Pages配置

```js
"pages": [ //pages数组中第一项表示应用启动页
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "超能力键盘",
				"navigationStyle": "custom"
			}
		}
	],
```

并可以通过style进行页面样式配置

常见配置如下：

- navigationBarTitleText： 页面title，string
- navigationBarTextStyle：black | white 定义页面title的颜色
- navigationBarBackgroundColor： 定义nav bar的颜色
- navigationStyle：页面样式，custom为自定义，可以消除nav bar和status bar进行完全自定义
- enablePullDownRefresh： 是否允许下拉刷新
- "app-plus": { "softinputMode": "adjustResize" }：用于配置让键盘自适应输入框input，且不会出现ios冲顶现象，不过在custom模式下会失效

### 获取页面参数

vue3里面，页面可以通过定义 props 来直接接收 url 传入的参数

```html
<script setup>
  // 如：uni.navigateTo({ url: '/pages/index/index?id=10' })
  const props = defineProps({
    id: String,
  });
  console.log("id=" + props.id); // id=10
</script>
```



## 状态管理

### 全局状态

全局状态管理采用pinia，接入成本低，理解成本也很低，见vue章，pinia篇



### 组件内状态

与vue3语法一致，不赘述，见vue章节



## 组件通信

见vue章



## 内置组件

### scroll-view

用于可视区域的滚动展示







## 语音接入





## 条件渲染



