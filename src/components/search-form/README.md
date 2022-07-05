<!--
 * @Author: zhoulf
 * @FilePath: /pc-ui/src/components/search-form/README.md
 * @Date: 2022-04-20 15:25:29
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-06-14 14:15:41
 * @Description: 
-->
# CmSearchForm 搜索条

## 介绍

搜索条组件，常用于表格或者列表中


## API

扩展自`@cci/cui`的`props`。 下面列出扩展属性

| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| hasBtn  | 是否开启折叠模式，如果开启超过一行会显示更多按钮 | _boolean_ | `true` |
| model  | 表单数据 | Object | {} |
| inline  | 行内表单模式 | _boolean_ | true |
| labelPosition  | label位置 | _string_ | `top` |
| labelWidth  | label宽度 | _string_ | `110px` |
| showStatus  | 是否显示更多 | _boolean_ | true |
| fieldSchema   | 搜索项结构定义，扩展了`hidden`字段，表示是否隐藏 | _Array<_Item_>_ | - |

## 事件
| 名称          | 说明     | 参数说明     | 参数类型     |
| ------------- | -------- | -------- |-------- |
search | 点击搜索 |  1:搜索。2、重置  | type:1、2，data:form数据|
## fieldSchema
| 参数          | 说明     | 类型      | 默认值    |
| ------------- | -------- | -------- | ---------|
| xType | 输入类型， | _string_ | - |
| prop | 绑定的字段名 | _string_ | - |
| label |label | _string_ | - |
| placeholder |placeholder | _string_ | - |åå
| xStore |select的返回值 | _function_ |  {label,value}  | 
| labelKey |select的返回值的label自定义 | _string_ |   |
| valueKey |select的返回值的value自定义 | _string_ |   |
| on |项的事件 | _object_ | {}  | 
| build | select获取数据 | {url,label（存在时候list的label读取这个）,value,xStore:返回的list} |   |

### slots

> 支持自定义插槽和默认插槽

### 自定义插槽
| 名称          | 说明      |
| ------------- | ------  |
slot | 点击搜索 |  template:vNode|