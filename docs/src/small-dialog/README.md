<!--
 * @Author: zhoulf
 * @FilePath: /pc-ui/docs/src/small-dialog/README.md
 * @Date: 2022-04-24 10:38:58
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-05-24 09:54:41
 * @Description: 
-->
# 适用 PC 端通用弹框和详情页面

## 可拖拽的弹框以及详情页面
### 介绍
import { CmSmallDialog,CmCommonDetail } from '@cm/cm-pc-ui'

## 代码演示
<demo-code>./index.vue</demo-code>

### 详情 Attributes

| 参数       | 说明         | 类型          | 可选值                  | 默认值 |
| :----------: | :------------: | :-------------: | :-----------------------: | :------: |
| xType      | 类型         | string        | Slot/ null | —      |
| label      | 行标题         | string        | —                       | —      |
| value      | 值           | string/number | —                       | —      |
| labelColor | 行标题颜色     | string        | —                       | -      |
| valueColor | 值颜色       | string        | —                       | -      |
| prop       | 行唯一标识   | string        | —                       | -      |
| slotName   | 具名插槽名字 | string        | —                       | -      |
| extraData   | 额外参数 | any        | —                       | -      |

### 可拖拽弹框 Attributes

参数 | 说明 | 类型 | 默认值
---|---|---|---
dragInfo        | 是否可以拖拽  | Object | status:true
dialogFilters               | 弹窗数据            |     Object      | { }
title | 弹窗标题 | string | —— | text |
dialogVisible | 弹窗是否显示 | Boolean | —— | true | —— | false
labelWidth | 弹窗宽度 | String | —— |  —— |
content  | 弹窗内容            |     Object      | {
  svgName | 弹窗内容svg名称  | String | —— |  —— |
  src | 弹窗内容可配置图片  | String | —— |  —— |
  text | 弹窗内容文本  | String | —— |  text |
 }
buttonList      | 按钮组              |     Array       | [
  {
     name | 按钮名称  | String | —— |  text |
     type | 按钮类型  | String | —— | —— |
     methods | 按钮点击方法名称,用于方法回调，以便于辨识那个按钮被点击  | String | —— | —— |
  }
]
### Events

事件名称 | 说明 | 回调参数
---|---|---
click   | 单击触发,blockClick  | (methods) 接收两个参数，1. 方法名
