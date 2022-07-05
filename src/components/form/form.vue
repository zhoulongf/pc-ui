
<script>

import {
  inputRender,
  slotRender,
  selectRender,
  numberRender,
  textRender,
  radioRender,
  checkboxRender,
  switchRender,
  customRender,
  selectTimeRender
} from './render'
import { Form, FormItem } from '@cci/cui'
import { isObject } from '../../utils/index'
export default {
  name: 'Form',
  directives: {
    focus: {
      inserted: function(el, binding, vnode) {
        if (vnode.componentInstance && vnode.componentInstance.Form) {
          vnode.componentInstance.Form.focusItem = vnode.componentInstance
        }
        setTimeout(function() {
          vnode.componentInstance && vnode.componentInstance.focus && vnode.componentInstance.focus()
        }, 300)
      }
    }
  },
  props: {
    model: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    },
    list: {
      type: Object,
      default: () => {
        return {}
      }
    },
    fieldSchema: {
      type: Array,
      default: () => {
        return []
      },
      required: true
    },
    showFoldButton: {
      type: Boolean,
      default: false
    },
    searchBtn: {
      type: Boolean,
      default: false
    },
    labelWidth: {
      type: String,
      default: '110px'
    },
    inline: {
      type: Boolean,
      default: false
    },
    labelPosition: {
      type: String,
      default: 'top'
    }
  },
  data() {
    return {
      suffix: '_map',
      focusItem: null,
      showAll: false,
      listMap: new Map()
    }
  },
  beforeCreate() {
    this.R = this.R || {}
    this.R.inputRender = inputRender
    this.R.slotRender = slotRender
    this.R.selectRender = selectRender
    this.R.numberRender = numberRender
    this.R.textRender = textRender
    this.R.customRender = customRender
    this.R.switchRender = switchRender
    this.R.checkboxRender = checkboxRender
    this.R.radioRender = radioRender
    this.R.selectTimeRender = selectTimeRender
  },
  mounted() {
    // this.inits(this.$props.fieldSchema)
    this.$on('visible', () => {
      let componentInstance = this.focusItem
      if (!componentInstance) {
        return
      }
      setTimeout(function() {
        componentInstance.focus && componentInstance.focus()
        componentInstance = null
      }, 300)
    })
  },
  methods: {
    mixinEvent(originFn, fn) {
      if (!originFn) {
        return fn
      } else if (originFn instanceof Array) {
        return originFn.concat(fn)
      } else {
        return [originFn, fn]
      }
    },
    emitRelated(val, relatedFields, source) {
      this.$emit('el.form.update', val, this.$refs[source])
      this.$refs[source] && this.$refs[source].$emit('update', val, this.$refs[source], this)
      if (!relatedFields) {
        return false
      }
      [].concat(relatedFields).forEach((ref) => {
        if (this.$refs.hasOwnProperty(ref)) {
          this.$refs[ref].$emit('el.form.update', val, this.$refs[ref], this.$refs[source], this)
        } else {
          this.fields.filter(f => f.prop === ref).forEach(formItem => {
            const custom = formItem.$children[0]
            custom.$emit('el.form.update', val, custom, this.$refs[source], this)
          })
        }
      })
    },
    // 获取具体的item
    getItemRender(R, xType) {
      return xType ? R[`${xType}Render`] : null
    },
    // 事件处理
    handleChange(item, e) {
      // element 表单验证空格输入也会通过，因此针对输入字符串去除首尾空格
      e = typeof e === 'string' ? e.trim() : e
      this.$props.model[item.prop] = e
    //   this.emitRelated(e, item.relatedFields, item.ref || item.prop)
    },
    // items解析成opts
    baseOptions(item, dataType) {
      const opts = {
        on: {},
        attrs: {
          ...item,
          value: this.$props.model[item.prop],
          type: dataType ?? 'text',
          dataType
        }
      }
      if (item.ref || item.prop) {
        opts.ref = item.ref || item.prop
      }
      if (item.focus) {
        opts.directives = [{
          name: 'focus',
          rawName: 'v-focus'
        }]
      }
      if (item.hasOwnProperty('class')) {
        opts.class = item.class || []
      }
      if (item.hasOwnProperty('on') && Object.prototype.toString.call(item.on) === '[object Object]') {
        for (const key in item.on) {
          opts.on[key] = item.on[key]
        }
      }
      return opts
    },
    // 生成item的每一项
    genChild(h, item) {
      const x = item.xType && item.xType.split('.')
      let xType = x && x[0]
      const dataType = x && x[1] || null
      const opts = this.baseOptions(item, dataType)
      let fn = this.getItemRender(this.R, xType)
      // 默认为input
      if (!xType || !fn) {
        xType = 'input'
        fn = this.R['inputRender']
      }
      // 将input类和操作类事件分开处理
      switch (xType) {
        case 'checkbox':
        case 'radio':
        case 'input':
        case 'selectTime':
          opts.on['input'] = this.mixinEvent(opts.on['input'], this.handleChange.bind(this, item))
          break
        case 'number':
        case 'switch':
        case 'select':
          opts.on['change'] = this.mixinEvent(opts.on['change'], this.handleChange.bind(this, item))
          break
      }
      return fn.call(this, h, item, opts, this.$props.list)
    },
    // 循环form-item
    renderItems(h, items = []) {
      return items
        .map(this.genChild.bind(this, h))
        .map((children, i) => {
          return this.wrapFormItem(h, items[i], children)
        })
    },
    // 处理点击展示更多
    handleShowAll() {
      this.$data.showAll = !this.$data.showAll
    },
    // 搜素
    handleSearch() {

    },
    handleReset() {

    },

    resetFields() {
      this.$refs['baseForm'].resetFields()
      this.clearForm()
    },
    clearForm() {
      for (const item in this.$props.model) {
        let nullObj = ''
        switch (isObject(this.$props.model[item])) {
          case '[object Object]':
            nullObj = {}
            break
          case '[object Array]':
            nullObj = []
            break
          case '[object Boolean]':
            nullObj = false
            break
          case '[object Number]':
            nullObj = 0
            break
          default:
            nullObj = ''
        }
        this.$props.model[item] = nullObj
      }
    },
    //  处理form-item
    wrapFormItem(h, { label, prop }, children) {
      return h(FormItem, {
        staticClass: 'el-form wrap-form',
        attrs: {
          label,
          prop
        },
        key: prop,
        class: {
          'el-form--inline': this.inline,
          'el-form--label-left': this.$props.labelPosition === 'left'
        }
      }, children)
    },
    async * createFibs(fieldList) {
      for (const item of fieldList) {
        const _build = item?.build
        if (_build && _build.url) {
          const data = await this.requires(_build, item)
          _build.list = data
          this.listMap.set(_build.xStore, data)
          yield item
        } else {
          yield null
        }
      }
    },
    // 异步处理数据
    // async inits(fieldList) {
    //   // eslint-disable-next-line no-empty
    //   for await (const item of this.createFibs(fieldList)) {
    //   }
    // },
    // 初始化form
    wrapForm(h, fieldList) {
      return h(Form, {
        class: {
          'el-form-left': this.$props.labelPosition === 'left'
        },
        ref: 'baseForm',
        props: this.$props,
        on: this.$listeners
      }, [this.$slots.reviewBtn, this.renderItems(h, fieldList), this.$slots.default])
    }
  },
  render(h) {
    // 组件里边存一份数据
    const fieldList = this.$props.fieldSchema.filter(schema => !schema.hidden)
    this.$data.fieldList = fieldList
    return this.wrapForm(h, this.$data.fieldList)
  }
}
</script>
<style  lang="scss">

.search-box {

    &--top {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
    }

    &--right {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }

    a {
      margin: 4px 10px 0 10px;
      font-size: 12px;
      cursor: pointer;

      i {
        margin-left: 4px;
      }
    }
  }
  body .el-form--inline{
    .el-form-item__label{
      display:block;
      height: 30px;
    }
    .el-form--label-left  .el-form-item__label{
      display: inline-block;
      height: 30px;
    }
    .el-form-item{
      margin-right: 12px;
    }
    .el-form-item__content{
      display: inline-block;
      vertical-align: top;
    }
    .el-input .el-input__inner,
    .el-select .el-input__inner,
    .el-textarea__inner {
        width: 220px;
    }
    .el-date-editor .el-range-separator {
      line-height: 24px;
      padding-right: 16px;
    }
    .el-date-editor .el-range__close-icon {
      line-height: 24px;
    }
    .el-date-editor .el-range-input {
      width: 53%;
    }
    .small-number-input .el-input__inner {
        width: 130px;
    }
    .reviewBtn{
      top: 34px;
    }
  }
  body .el-form-left .reviewBtn{
    top: 0;
  }
</style>
