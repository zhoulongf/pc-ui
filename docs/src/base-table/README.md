<!--
 * @Author: zhoulf
 * @FilePath: /pc-ui/docs/src/base-table/README.md
 * @Date: 2022-04-25 16:08:16
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-06-21 11:46:08
 * @Description: 
-->
# CmBaseTable 表格

### 介绍
```js
import { CmBaseTable } from '@cm/cm-pc-ui'
```

### API

扩展自`cui`的`props`。 下面列出扩展属性

| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| paginationSize  | 表单数据 | Number | 10 |
| isPagination  | 是否显示分页 | _boolean_ | true |
| totals  | 分页的总数 | Number | 0 |
| isIndex  | 是否需要序号 | _boolean_ | false |
| fields  | 表格项结构定义， | _Array_ | [] |
| data  | 表格结果， | _Array_ | [] |


### 事件
| 名称          | 说明     | 参数说明     | 参数类型     |
| ------------- | -------- | -------- |-------- |
paginationChange | 分页：将size-change和current-change整合 |    | {type:,data}|


### 代码演示

```js
<cm-base-table
      :data="tableData"
      :totals="totals"
      :fields="columns"
    />
<script>
import { CmBaseTable } from '@cm/cm-pc-ui'
export default{
    name:'test',
    components:{
        CmBaseTable
    },
    data(){
        return{
            totals: 4,
            tableData: [
                { name: 'eee ddd' }
            ],
            columns: [
                {
                label: '源名称',
                prop: 'name',
                width: 120,
                align: 'center',
                scopedSlots: {
                    default: (scope) => (
                    <div>
                        <c-button type='text' on-click={this.tabOneClick.bind(this, 1, scope)}>哈哈{scope.row.name}</c-button>
                    </div>
                    )
                }
                },
                {
                label: '源名称2',
                prop: 'name2',
                align: 'center',
                scopedSlots: {
                    header: (scope) => (
                    <div>
                        <c-button type='text'>{scope.column.label}34</c-button>
                    </div>
                    )
                }
                },
                {
                label: '源名称3',
                prop: 'name3'
                },
                {
                label: '源名称4',
                prop: 'name4'
                }
            ]
        }
    }
}
</script>
```