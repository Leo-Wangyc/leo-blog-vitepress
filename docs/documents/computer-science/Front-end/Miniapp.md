小程序开发

##大富翁项目中遇到的坑

## 1 gif 只有初次进入会完成播放，后续直接显示最后一帧

解决方案：在 gif 后面拼接时间戳即可完整播放

复现：投色子的动画

```html
<!-- 其中timestamp是每次触发投色子后都会更新当前的时间戳 -->
<image
  class="dice"
  mode="widthFix"
  src="../images/{{num}}.gif?{{timestamp}}"
  wx:if="{{ num }}"
></image>
```
