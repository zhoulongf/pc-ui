<!--
 * @Author: zhoulf
 * @FilePath: /pc-ui/src/components/base-table/README.md
 * @Date: 2022-04-20 15:52:57
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-06-21 11:46:21
 * @Description: 
-->
# WrapTable 表格

## 介绍

表格封装


## API

扩展自`cui`的`props`。 下面列出扩展属性

| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| paginationSize  | 表单数据 | Number | 10 |
| isPagination  | 是否显示分页 | _boolean_ | true |
| totals  | 分页的总数 | Number | 0 |
| isIndex  | 是否需要序号 | _boolean_ | false |
| fields  | 表格项结构定义， | _Array_ | [] |
| data  | 表格结果， | _Array_ | [] |


## 事件
| 名称          | 说明     | 参数说明     | 参数类型     |
| ------------- | -------- | -------- |-------- |
paginationChange | 分页：将size-change和current-change整合 |    | {type:,data}|