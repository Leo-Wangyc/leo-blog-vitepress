Git

# git 命令

> git 图形化在线练习
> https://learngitbranching.js.org/?locale=zh_CN

## git commit

用于提交本地代码到本地 git 仓库存储，可使用-m 表示说明

```javascript
git commit
git commit -m 'demo'
```

## git branch

用于新建分支

```javascript
git branch 'branch'
```

## git checkout

用于切换分支，也可用于新建并进入

```javascript
git checkout 'branch1' // 分支切换
git checkout -b 'branch2'  // 新建，并切换分支到branch2
```

## git merge

用于**合并指定分支到目前所在的分支**

```javascript
// *master  当前分支位于master，执行下面的命令可以让branch1合并到当前master下
git merge 'branch1'
```
