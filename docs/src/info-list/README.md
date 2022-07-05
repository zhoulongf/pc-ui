# info-list 按钮

### 介绍

info-list 是一个多样式标题展示组件

### 引入
```js
import { CmInfoList } from '@cm/cm-pc-ui'
<info-list :list="list" />
```
## 代码演示
<demo-code>./index.vue</demo-code>

### 基础用法


## API

### Props

| 参数               | 说明                      | 类型                | 默认值                                                       |
| ------------------ | ------------------------- | ------------------- | ------------------------------------------------------------ |
| list               | 数据列表                  | _array_             | `[title,num,unit,name,up,`<br/>`upIcon,down,downIcon,order]` |
| wrapAlign          | 最外层对齐方式            | _string_            | between(around)                                              |
| wrapWidth          | 最外层子元素宽度          | _string_            | same                                                         |
| boxAlign           | 子元素内容对齐方式        | _string_            | center(left,right)                                           |
| boxClass           | 每个 list 容器添加 class  | _string_ ; _array_  | ''(anyString)                                                |
| highlight          | 是否点击高亮 :list>0 有效 | _Boolean_           | false(true)                                                  |
| highlightAutoClose | 关闭高亮延时              | _string_ ; _number_ | 0                                                            |
| autoPlay           | 自动轮播:list>0 有效      | _string_ ; _number_ | 0                                                            |
| onHover            | hover 暂停                | _string_ ; _number_ | false(true)                                                  |

### Events

| 事件名 | 说明       | 回调参数               |
| ------ | ---------- | ---------------------- |
| click  | 点击时触发 | itemClick(item, index) |

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 默认插槽 |
