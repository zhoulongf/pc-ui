<!--
 * @Author: zhoulf
 * @FilePath: /pc-ui/docs/src/steps/README.md
 * @Date: 2022-05-24 14:53:26
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-05-24 15:01:19
 * @Description: 
-->

## 步骤条

### 介绍
import { CmSteps } from '@cm/cm-pc-ui'

## 代码演示
<demo-code>./index.vue</demo-code>
# CmSteps 步骤条

引导用户按照流程完成任务的分步导航条，可根据实际应用场景设定步骤。

### Steps Attributes
| 参数          | 说明     | 类型     | 可选值    | 默认值    |
| ------------- | -------- | -------- | --------- | --------- |
| stepsData  | 步骤数据，详情看下方说明 | Array | - | [] |
| action  | 设置当前激活步骤 | Number | - | 0 |
| text-highlight  | 设置正在进行与已完成的步骤文字是否高亮 | Boolean | - | false |
| activeColor  | 高亮的颜色 | String | - | #3786fd |

### stepsData Attributes
| 参数          | 说明     | 类型     | 可选值    | 默认值    |
| ------------- | -------- | -------- | --------- | --------- |
| title  | 步骤名 | String | - | '' |
| tip  | 步骤名下方的说明 | String | - | '' |
| icon  | 图标类名，只支持 el-icon 中的图标 | String | - | el-icon-circle-check |