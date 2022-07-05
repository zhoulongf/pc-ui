<!--
 * @Author: zhoulf
 * @FilePath: /pc-ui/docs/src/base-table/demo/index.vue
 * @Date: 2022-04-25 16:09:15
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-06-14 16:16:10
 * @Description: 
-->
<template>
    <cm-base-table :fields="columns" :data="tableData" :totals="totals" />
</template>

<script>
import { CmBaseTable } from '../../../../lib'

export default {
    name: 'test-table',
    components: {
        CmBaseTable
    },
    data() {
        return {
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
            ],
            totals: 2,
            tableData: [
                { name: 'dsdsd' }
            ]
        }
    }
}
</script>