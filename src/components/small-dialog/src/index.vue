<!--
 * @Author: zhoulf
 * @FilePath: /pc-ui/src/components/small-dialog/src/index.vue
 * @Date: 2022-05-11 15:19:54
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-06-14 17:14:12
 * @Description:
-->
<template>
  <Dialog
    v-cm-drag-dialog="dragInfo"
    class="cm-small-dialog"
    :modal="false"
    :show-close="false"
    :visible.sync="dialogVisible"
    :title="title"
    :width="labelWidth"
  >
    <i
      class="el-icon-close deleteImg"
      @click="blockClick('cancle')"
    />
    <div class="content">
      <slot />
    </div>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <Button
        v-for="(item,index) in buttonList"
        :key="index"
        :type="item.type"
        @click="blockClick(item.prop)"
      >
        {{ item.name }}
      </Button>
    </span>
  </Dialog>
</template>
<script>
import { Dialog, Button } from '@cci/cui'
// import Button from '@cci/cui'
import { CmDragDialog } from '../../../directive'
export default {
  name: 'CmSmallDialog',
  directives: { CmDragDialog },
  components: {
    Dialog,
    Button
  },
  props: {
    dragInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dialogContent: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      value: ''
    }
  },
  computed: {
    title() {
      return this.dialogContent.title || ''
    },
    buttonList() {
      return this.dialogContent.buttonList || []
    },
    dialogVisible() {
      return this.dialogContent.dialogVisible || false
    },
    labelWidth() {
      return this.dialogContent.labelWidth
    }
  },
  methods: {
    blockClick(name) {
      this.$emit('blockClick', name)
    }
  }
}
</script>
<style lang="scss" scoped>
.cm-small-dialog {
  .content {
    display: flex;
    &-img {
      width: 44px;
      height: 44px;
      margin-right: 20px;
    }
    .block-svg{
      width:24px;
      height: 24px;
      margin:  0 8px 0 0;
    }
    &-title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: rgba(0,0,0,0.85);
      line-height: 25px;
      margin-bottom: 3px;
    }
    &-desc {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #ff565e;
      line-height: 18px;
    }
  }
  ::v-deep .el-dialog__header {
    padding: 14px 24px;
    border-bottom: 1px solid #ccc;
  }
  ::v-deep .el-dialog {
    margin-left: auto;
    margin-right: auto;
  }
  ::v-deep .el-dialog__title {
    font-size: 20px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #111111;
    line-height: 24px;
  }
  ::v-deep .el-dialog__body {
    padding: 25px 32px 40px 32px;
  }
  ::v-deep .el-dialog__footer {
    padding-top: 0;
  }
  ::v-deep .deleteImg {
    position: absolute;
    width: 16px;
    height: 16px;
    right: 18px;
    top: 18px;
    cursor: pointer;
  }
}
</style>
