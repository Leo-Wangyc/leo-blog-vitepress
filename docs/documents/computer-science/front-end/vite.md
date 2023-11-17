## 全局css配置

vite.config.ts下

```typescript
css: {
	preprocessOptions: {
    scss: {
      additionalData: `@import "./src/assets/scss/variables.scss"`
    }
  }
}
```

