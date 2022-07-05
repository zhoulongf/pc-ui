<!--
 * @Author: zhoulf
 * @FilePath: /pc-ui/docs/src/search-table/README.md
 * @Date: 2022-04-25 19:04:56
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-06-21 11:46:11
 * @Description: 
-->
# CmSearchTable 搜索表格

### 引入

```js
import { CmSearchTable } from '@cm/cm-pc-ui'
```
### API


| 参数          | 说明     | 类型     | 默认值    |
| ------------- | -------- | -------- | --------- |
| formModel  | 表单数据 | Object | {} |
| fieldForm  | 表单Item | Array | [] | formProps
| formProps  | 表单其他props | Object | {} |
| totals  | 分页的总数 | Number | 0 |
| data  | 表格结果， | _Array_ | [] |
| fieldTable  | 表格项结构定义 | _Array_ | [] |
| tableProps  | 表格其他props | Object | [] | 
| pageProps  | 分页其他props | Object | [] |

### 事件
| 名称          | 说明     | 参数说明     | 参数类型     |
| ------------- | -------- | -------- |-------- |
| paginationChange | 分页：将size-change和current-change整合 |    | {type:,data}|
| search | 点击搜索 |  current、pageSize、pageSizes、total、totals、type（pageSize、current）、data（form）、operation（search、reset）  | Object |

### 代码演示
```js
<CmSearchTable
      :formModel="model"
      :fieldForm="fieldSchema"
      :data="tableData"
      :totals="totals"
      :fieldTable="columns"
      @search="search"
      @paginationChange="search"
    />

<script>
import { CmSearchTable } from '@cm/cm-pc-ui'
export default{
    name:'test',
    components:{
        CmSearchTable
    },
    data(){
        return{
            totals: 4,
            model: {
                id: '2323',
                id1: '',
                id2: '',
                slot: '',
                name: '',
                eventDataType: '',
                radio: 1,
                checkbox: [1],
                switch: true,
                lastUpdateTimer: []
            },
            fieldSchema: [
                {
                label: '姓名',
                xType: 'input',
                prop: 'id',
                clearable: true,
                focus: () => {
                },
                on: {
                    'change': () => {
                    }
                }
                },
                {
                label: '姓名1',
                xType: 'input',
                prop: 'id1',
                clearable: true
                },
                {
                label: '姓名2',
                xType: 'input',
                prop: 'id2',
                clearable: true
                },
                {
                label: '职业',
                xType: 'select',
                prop: 'name',
                clearable: true,
                labelKey: 'label',
                // valueKey: 'name',
                xStore: () => { return this.xStore },
                on: {
                    'change': () => {
                    this.$nextTick(() => {
                    })
                    }
                }
                },
                {
                label: '一期二期',
                prop: 'eventDataType',
                xType: 'select',
                placeholder: '请选择一期二期',
                xStore: function() {
                    return this.list.eventDataList
                },
                build: {
                    url:
                    '/cityscapeAi/eventCenter/enum/getEnumByEnumTypeAddFirst?enumType=EVENT_DATA_TYPE',
                    label: 'codeDesc',
                    value: 'codeValue',
                    xStore: 'eventDataList'
                }
                },
                // {
                //   label: '单选组',
                //   prop: 'radio',
                //   xType: 'radio',
                //   xStore: () => {
                //     return this.xSradio
                //   }
                // },
                {
                label: '办结时间',
                prop: 'lastUpdateTimer',
                placeholder: '请选择最后操作时间',
                xType: 'selectTime.datetimerange'
                },
                {
                xType: 'slot',
                label: 'slot',
                prop: 'slot',
                template: () => { return <div>fgfgfg</div> }
                }
            ],
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
                        <Button type='text' on-click={this.tabOneClick.bind(this, 1, scope)}>哈哈{scope.row.name}</Button>
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
                        <Button type='text'>{scope.column.label}34</Button>
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
            ],
        }
    },
    methods: {
        search(key) {
            console.log('key', key)
            this.totals = 0
        },
        tabOneClick(label, item) {
            console.log(label, item)
        }
    }
}
</script>    
```