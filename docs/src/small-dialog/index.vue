<!--
 * @Author: zhoulf
 * @FilePath: /pc-ui/docs/src/small-dialog/index.vue
 * @Date: 2022-05-24 14:43:21
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-06-14 17:21:13
 * @Description: 
-->
<template>
<div class="container">
    <button
      type="primary"
      @click="dialogContent.dialogVisible = true"
    >
      open a Drag Dialog
    </button>
    <cm-small-dialog
      :dialog-content="dialogContent"
      :drag-info="dragInfo"
      @blockClick="closeDialog"
    >
      <cm-common-detail
        :list="baseInfo"
        :head-title="headTitles"
      >
        <template
          v-for="slot in slotList"
          v-slot:[slot.slotName]
        >
          <span :key="slot.slotName">
            <button
              v-show="slot.slotName==='Button'"
              class="slot-button"
              type="primary"
            >111</button>
            <span
              v-for="(item,index) in slot.extraData"
              v-show="slot.slotName==='ImgViwer'"
              :key="index"
            >
              <img
                class="slot-img"
                :src="item"
              >
            </span>
            <span
              v-show="slot.slotName==='Link'"
              :style="{color:slot.valueColor}"
            >文字链接</span>
          </span>
        </template>
      </cm-common-detail>
    </cm-small-dialog>
</div>
</template>
<script>
import {Button} from '@cci/cui'
import { CmSmallDialog,CmCommonDetail } from '../../../lib'
import '@cci/cui/lib/theme-default/button.css'
import '@cci/cui/lib/theme-default/dialog.css'
import '@cci/cui/lib/theme-default/row.css'
import '@cci/cui/lib/theme-default/col.css'

export default {
    components: {
        [CmSmallDialog.name]:CmSmallDialog,
    [CmCommonDetail.name]: CmCommonDetail,
        Button
    },
    data(){
        return {
            dialogContent: {
                title: '可拖拽弹框',
                buttonList: [{
                    name: '提交',
                    type: 'primary'
                }],
                dialogVisible: false
            },
            dragInfo: {
                status: true
            },
            baseInfo: {
                data: [
                    {
                        label: '报警类型：',
                        value: '11',
                        col: 24,
                        labelColor: '',
                        valueColor: '',
                        prop: 'bigType'
                    },
                    {
                        label: '报警时间：',
                        value: '22',
                        col: 12,
                        labelColor: '',
                        valueColor: '',
                        prop: 'alarmTime'
                    }
                ]
            }
        }
  },
  methods: {
      closeDialog(name) {
      console.log(name)
      this.dialogContent.dialogVisible = false
    },
    }
}
</script>