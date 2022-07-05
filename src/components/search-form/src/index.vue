<!--
 * @Author: zhoulf
 * @FilePath: /pc-ui/src/components/search-form/src/index.vue
 * @Date: 2022-04-18 15:44:54
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-06-14 17:33:07
 * @Description:
-->
<template>
  <base-form
    ref="CmSearchForm"
    :model="model"
    :field-schema="searchFields"
    :rules="rules"
    :inline="inline"
    :label-width="labelWidth"
    :style="formStyle"
    :label-position="labelPosition"
    :list="list"
    class="cm-form-input"
  >
    <slot />
    <template
      v-slot:reviewBtn
    >
      <slot name="reviewBtn">
        <div
          v-if="hasBtn"
          class="reviewBtn"
        >
          <span
            v-if="hasMore"
            class="show-status-btn"
            @click="switchStatus"
          >
            {{ showStatusUse === 'all' ? '收起' : '更多' }}
            <i :class="[iconClass,'menu-item-svg']" />
          </span>
          <Button
            icon="el-icon-search"
            type="primary"
            @click="doSearch"
          >
            {{ searchBtn }}
          </Button>
          <Button
            class="el-icon-magic-stick"
            @click="doReset"
          >
            {{ resetBtn }}
          </Button>
        </div>
        <div
          v-if="!hasBtn"
          class="reviewBtn"
        >
          <slot name="searchBtn" />
        </div>
      </slot>
    </template>
  </base-form>
</template>

<script>
import { Button } from '@cci/cui'
import baseForm from '../../form/index'
import request from '../../../utils/request'
import { formInline } from './formInline'
export default {
  name: 'CmSearchForm',
  components: {
    baseForm,
    Button
  },
  mixins: [formInline],
  props: {
    model: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    },
    fieldSchema: {
      type: Array,
      default: () => {
        return []
      },
      required: true
    },
    inline: {
      type: Boolean,
      default: true
    },
    hasBtn: {
      type: Boolean,
      default: true
    },
    searchBtn: {
      type: String,
      default: '搜索'
    },
    resetBtn: {
      type: String,
      default: '重置'
    },
    labelWidth: {
      type: String,
      default: '110px'
    },
    rules: {
      type: Array,
      default: () => {
        return []
      }
    },
    showStatus: {
      type: String,
      default: ''
    },
    labelPosition: {
      type: String,
      default: 'top'
    }
  },
  data() {
    return {
      suffix: '_map',
      list: {},
      searchFields: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    doSearch() {
      this.$emit('search', { operation: 'search', data: this.$props.model })
    },
    doReset() {
      this.$refs.CmSearchForm.resetFields()
      this.$emit('search', { operation: 'reset', data: this.$props.model })
    },
    requires(build, filed) {
      return request({
        url: build.url,
        method: 'get',
        params: filed.params || null
      }).then(res => {
        if (res.code === '200' || res.success) {
          const finalData = res.data.map(item => {
            return item
          })
          this.$set(this.list, build.xStore, finalData)
        } else {
          return []
        }
      })
    },
    init() {
      const fieldList = this.$props.fieldSchema.filter(schema => !schema.hidden)
      fieldList.forEach(item => {
        item.xStore && (item.xStore = item.xStore.bind(this))
        const _build = item?.build
        if (_build && _build.url) {
          this.requires(_build, item)
        }
      })
      this.searchFields = fieldList
    }
  }
}
</script>
<style  lang="scss">
.cm-form-input {
  //form表单
  position: relative;
  margin: 0 0 15px 0;
  // margin: 0;
  .el-form-item {
      margin-bottom: 0px;
  }
  .el-input__inner {
      width: 150px;
      height: 32px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(217, 217, 217, 1);
      opacity: 1;
      border-radius: 4px;
  }
  .el-input .el-input__inner {
      width: 140px;
  }
  .el-range-editor.el-input__inner {
      width: 220px;
  }
  .el-select .el-input__inner {
      width: 150px;
  }
  .el-date-editor .el-range__icon {
      line-height: 24px;
  }
  .el-date-editor .el-range-separator {
      line-height: 24px;
  }
  .el-date-editor .el-range__close-icon {
      line-height: 24px;
  }
  .el-date-editor .el-range-input {
      width: 53%;
  }
.reviewBtn {
  //搜索重制
  position: relative;
  float: right;
  right: 0px;
  top: 0px;
  z-index: 4;
  font-size: 12px;
  line-height: 32px;
  .search {
    // width: 60px;
    // height: 32px;
    background: #4d81e1ff;
    text-align: center;
    color: #fff;
  }
  .reset {
    // width: 60px;
    // height: 32px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid #4d81e1ff;
    color: #4d81e1ff;
  }
  span {
    font-weight: 500;
  }
}
.show-status-btn {
    color: #4d81e1ff;
    margin-right: 14px;
    font-size: 14px;
    height: 33px;
    display: inline-flex;
    cursor: pointer;
  }
.menu-item-svg {
    width: 12px;
    height: 32px;
    margin-left: 3px;
    margin-top:10px;
  }
}
</style>
