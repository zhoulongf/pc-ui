<!--
 * @Author: zhoulf
 * @FilePath: /pc-ui/README.md
 * @Date: 2022-04-22 11:48:34
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-07-05 12:01:26
 * @Description: 
-->
# 城管二部 前端PC端组件库

## 介绍
基于cui组件库结合业务二次封装，项目构建选用脚手架为rollup

## 特性

- 提供丰富的命令，涵盖从开发测试到构建发布的完整流程
- 基于约定的目录结构，自动生成优雅的文档站点和组件示例
- 内置 ESlint、Stylelint 校验规则，提交代码时自动执行校验

## 组件文档在线地址：
[点击查看](https://zhoulongf.github.io/pc-ui/)

## 组件列表及组件封装计划如下






- [x]  CmSearchForm 搜索条
- [x]  CmSearchTable 搜索列表
- [x]  CmBaseTable 列表
## 安装

### 注意
本包基于`cui`二次开发，请自行安装`cui`并引入

### 方式一. 自动按需引入组件（推荐）

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式。

```js
// 插件会自动将代码转化为方式二中的按需引入形式
import { CmSearchForm } from '@cm/cm-pc-ui';
```

### 方式二. 手动按需引入组件

在不使用插件的情况下，可以手动引入需要的组件。

```js
import {CmSearchForm} from '@cm/cm-pc-ui';
```

### 方式三. 导入所有组件

@cm/cm-ui 支持一次性导入所有组件，引入所有组件会增加代码包体积，因此不推荐这种做法。

```js
import Vue from 'vue';
import CMUi from '@cm/cm-pc-ui';

Vue.use(CMUi);
```

> Tips: 配置按需引入后，将不允许直接导入所有组件。

## 组件开发指南

### 命令说明:
新建符合约定目录结构的组件：


打包所有组件：
```
npm run build
```

生成changelog文档：
```
npm run changelog
```

## 工程目录说明
```
project
├─ lib              # lib 目录下的代码遵循 commonjs 规范
├─ docs             # 静态文档readme文件
├─ docs/docs          # 本地测试工程
├─ src              # 组件源码
├─ rolluo.config.js   # 工程配置文件，包含prefix、文档目录等配置
```


