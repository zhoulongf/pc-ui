<!--
 * @Author: zhoulf
 * @FilePath: /pc-ui/src/components/search-table/README.md
 * @Date: 2022-04-25 18:56:08
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-06-21 11:46:30
 * @Description: 
-->
# CmSearchTable 搜索表格

## 介绍

搜索表格封装


## API


| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| formModel  | 表单数据 | Object | {} |
| fieldForm  | 表单Item | Array | [] | formProps
| formProps  | 表单其他props | Object | {} |
| totals  | 分页的总数 | Number | 0 |
| data  | 表格结果， | _Array_ | [] |
| fieldTable  | 表格项结构定义， | _Array_ | [] |
| tableProps  | 表格其他props， | Object | [] | 
| pageProps  | 分页其他props， | Object | [] |

## 事件
| 名称          | 说明     | 参数说明     | 参数类型     |
| ------------- | -------- | -------- |-------- |
| paginationChange | 分页：将size-change和current-change整合 |    | {type:,data}|
| search | 点击搜索 |  current、pageSize、pageSizes、total、totals、type（pageSize、current）、data（form）、operation（search、reset）  | Object |