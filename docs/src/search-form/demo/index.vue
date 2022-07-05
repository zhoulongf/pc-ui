<!--
 * @Author: zhoulf
 * @FilePath: /pc-ui/docs/src/search-form/demo/index.vue
 * @Date: 2022-04-24 10:38:58
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-06-14 17:18:11
 * @Description: 
-->
<template>
  <cm-search-form :model="model" :field-schema="fieldSchema" @search="search" />
</template>

<script>
import Vue from 'vue'
import { CmSearchForm } from '../../../../lib'
import '@cci/cui/lib/theme-default/button.css'
import '@cci/cui/lib/theme-default/form.css'
import '@cci/cui/lib/theme-default/form-item.css'
import '@cci/cui/lib/theme-default/select.css'
import '@cci/cui/lib/theme-default/option.css'
import '@cci/cui/lib/theme-default/input-number.css'
import '@cci/cui/lib/theme-default/radio-group.css'
import '@cci/cui/lib/theme-default/radio.css'
import '@cci/cui/lib/theme-default/checkbox.css'
import '@cci/cui/lib/theme-default/checkbox-group.css'
import '@cci/cui/lib/theme-default/switch.css'
import '@cci/cui/lib/theme-default/date-picker.css'

Vue.config.silent = true

export default {
  name: 'test',
  components: {
    CmSearchForm
  },
  data() {
    return {
      totals: 4,
      xStore: [
        { label: '美食/餐厅线上活动', value: 0 },
        { label: '地推活动', value: 1 },
        { label: '线下主题活动', value: 2 },
        { label: '单纯品牌曝光', value: 3 }
      ],
      xStore1: [
        { label: '你好', value: 0 },
        { label: '我好', value: 1 }
      ],
      xSradio: [
        { label: '单选', value: 0 },
        { label: '单选2', value: 1 }
      ],
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
        // {
        //   label: '姓名1',
        //   xType: 'input',
        //   prop: 'id1',
        //   clearable: true
        // },
        // {
        //   label: '姓名2',
        //   xType: 'input',
        //   prop: 'id2',
        //   clearable: true
        // },
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
          xStore() {
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
          label: '多选选组',
          prop: 'checkbox',
          xType: 'checkbox',
          xStore: () => {
            return this.xSradio
          }
        },
        // {
        //   label: '开关',
        //   prop: 'switch',
        //   xType: 'switch',
        //   activeText: '成功打开',
        //   inactiveText: '关闭成功',
        //   inactiveColor: '#ff4949'
        // },
        {
          xType: 'slot',
          label: 'slot',
          prop: 'slot',
          template: () => { return <div>fgfgfg</div> }
        }
      ]
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