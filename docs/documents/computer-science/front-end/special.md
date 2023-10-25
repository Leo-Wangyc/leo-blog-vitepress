# 特殊处理

## 1 对象数组根据特定属性进行排序

```javascript
var arr = [
  { name: "zopp", age: 0 },
  { name: "gpp", age: 18 },
  { name: "yjj", age: 8 },
];

function compare(property) {
  return function (a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value1 - value2;
  };
}
console.log(arr.sort(compare("age")));
```

参考资料

> https://www.cnblogs.com/saifei/p/9043821.html

## 2 关于 0，undefined 等值和&&的结合

```typescript
console.log(0 && 123); // 0	0类似为false
console.log(1 && 123); // 123	两边都为true，默认取右边
console.log(1234 && 123); // 123
console.log(undefined && 123); // undefined	undefined类似为false
```

此问题经常出现在年龄上，当后台返回的年龄值为 0（number）时，类似 age && <div>component</div> 的语法就会失效
