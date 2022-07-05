<!--
 * @Author: zhoulf
 * @FilePath: /pc-ui/src/app.vue
 * @Date: 2022-04-29 15:52:23
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-06-27 18:06:28
 * @Description:
-->
<template>
  <div id="app">
    <cm-search-table
      :form-model="model"
      :field-form="fieldSchema"
      :data="tableData"
      :table-props="tableProps"
      :totals="totals"
      :field-table="columns"
      @search="search"
      @currentChange="currentChange"
      @selectionChange="selectionChange"
      @paginationChange="search"
    />
    <c-button
      type="primary"
      @click="dialogContent.dialogVisible = true"
    >
      open a Drag Dialog
    </c-button>
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
            <c-button
              v-show="slot.slotName==='Button'"
              class="slot-button"
              type="primary"
            >111</c-button>
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
    <info-test />
    <CmFileView
      :file-type="'pdf'"
      :file-src="'/file/5,0b01890a43c9'"
    />
    <steps-test />
  </div>
</template>
<script>
import { infoArr } from '@/utils/data.js'
import CmSmallDialog from './components/small-dialog'
import infoTest from './test-component/info-test'
import stepsTest from './test-component/steps-test'
import CmFileView from './components/file-view'
export default {
  name: 'Test',
  components: {
    infoTest,
    stepsTest,
    CmFileView,
    [CmSmallDialog.name]: CmSmallDialog
  },
  data() {
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
      tableProps: {
        height: 700,
        maxHeight: 700,
        highlightCurrentRow: true,
        isSelection: true
      },
      totals: 4,
      xStore: [
        { label: '教师', value: 1 }
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
          fixed: true,
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
        { name: 'eee ddd' },
        { name: 'eee 232' },
        { name: 'eee dd33d' },
        { name: 'eee dd44d' },
        { name: 'eee dd55d' },
        { name: 'eee 66' },
        { name: 'eee dd777d' }
      ],
      columns: [
        {
          label: '源名称',
          prop: 'name',
          sortable: true,
          width: 120,
          fixed: true,
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
          prop: 'name4',
          fixed: 'right'
        },
        {
          label: '操作',
          prop: '',
          fixed: 'right',
          scopedSlots: {
            default: (scope) => (
              <div>
                <c-button type='text' on-click={() => { this.commonHandle('delete', scope) }}>删除</c-button>
              </div>
            )
          }
        }
      ],
      dialogFilters: {
        title: '',
        dialogVisible: false,
        labelWidth: '510px',
        content: {
          // svgName: 'deleteImg',
          src: '',
          text: ''
        },
        buttonList: []
      },
      baseInfo: {
        data: infoArr
      },
      headTitles: '测试标题'
    }
  },
  computed: {
    slotList() {
      return this.baseInfo.data.filter(x => x.slotName)
    }
  },
  methods: {
    closeDialog(name) {
      console.log(name)
      this.dialogContent.dialogVisible = false
    },
    search(key) {
      console.log('key', key)
      this.getData(key.current, key.pageSize, key.data)
    },
    tabOneClick(label, item) {
      console.log(label, item)
    },
    commonHandle(item) {
      console.log(item)
      this.dialogFilters = {
        title: '删除',
        dialogVisible: true,
        labelWidth: '510px',
        content: {
          text: '此操作将永久删除该条数据，确认是否删除？'
        },
        buttonList: [
          {
            name: '确定',
            type: 'primary',
            prop: 'ensure'
          },
          {
            name: '取消',
            type: 'default',
            prop: 'cancle'
          }
        ]
      }
    },
    selectionChange(arr) {
      console.log('arr', arr)
    },
    currentChange(val) {
      console.log('val', val)
    },
    clickDialog(name) {
      if (name === 'cancle') {
        console.log('已取消')
        this.dialogFilters.dialogVisible = false
      } else if (name === 'ensure') {
        console.log('已删除')
        this.dialogFilters.dialogVisible = false
      }
    },
    getData(page, size, params) {
      // console.log(page)
      // 1.创建对象
      const _this = this
      const xhr = new XMLHttpRequest()
      const aaa = {
        quotaName: '',
        appraisalType: '',
        quotaType: '',
        pageNum: page,
        pageSize: size,
        ...params
      }
      // 2.初始化 设置请求方法和url
      xhr.open('POST', 'http://10.12.107.48:8109/cityscapeAi/appraisal/config/queryAppraisalQuotaList')// ?后面是get请求加参数方法
      // 3.发送
      xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
      xhr.send(JSON.stringify(aaa))
      // 4.事件绑定 处理服务端返回的结果
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          // 判断响应状态码
          if (xhr.status >= 200 && xhr.status <= 300) {
            const result = JSON.parse(xhr.response)
            const { totals, data } = result
            _this.totals = totals
            _this.tableData = data
          }
        }
      }
    }

  }
}

</script>
<style  lang="scss">
#app{
    margin:20px;
    .cm-base-table{
        // width:300px;
    }
    .slot-button{
      margin: 16px 0 0 0;
    }
    .slot-img{
      margin: 16px 0 0 0;
      width: 200px;
      height: 200px;
    }
}
</style>
