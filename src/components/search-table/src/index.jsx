/*
 * @Author: zhoulf
 * @FilePath: /pc-ui/src/components/search-table/src/index.jsx
 * @Date: 2022-04-20 11:51:35
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-06-21 11:46:34
 * @Description:
 */
import CmSearchForm from '../../search-form'
import CmBaseTable from '../../base-table'
export default {
  name: 'CmSearchTable',
  props: {
    formModel: {
      type: Object,
      default: () => {
        return {}
      },
      required: true
    },
    fieldForm: {
      type: Array,
      default: () => {
        return []
      }
    },
    formProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    totals: {
      type: Number,
      default: 0
    },
    fieldTable: {
      type: Array,
      default: () => {
        return []
      }
    },
    tableProps: {
      type: Object,
      default: () => {
        return {}
      }
    },
    pageProps: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      pageInfo: {}
    }
  },
  mounted() {
    this.pageInfo = this.pageFn()
  },
  methods: {
    pageFn() {
      return this.$refs.searchTable.pageInfo()
    },
    formFn(h) {
      const props = {
        attrs: {
          model: this.$props.formModel,
          fieldSchema: this.$props.fieldForm,
          ...this.$props.formProps
        },
        on: {
          search: (props) => {
            if (props.operation === 'reset') {
              this.$refs.searchTable.resetPage()
            } else {
              this.$refs.searchTable.resetPage('init')
              // this.$nextTick(() => {
              //   this.$emit('search', { ...props, ...this.pageInfo })
              // })
            }
          }
        }
      }
      return h(CmSearchForm, { ...props })
    },
    tableFn(h) {
      const props = {
        ref: 'searchTable',
        attrs: {
          data: this.$props.data,
          fields: this.$props.fieldTable,
          totals: this.$props.totals,
          ...this.$props.tableProps,
          ...this.$props.pageProps
        },
        on: {
          paginationChange: (val) => {
            this.pageInfo = Object.assign({}, val)
            this.$emit('paginationChange', { ...this.pageInfo, data: this.$props.formModel, operation: 'search' })
          },
          selectionChange: (val) => {
            this.$emit('selectionChange', val)
          },
          currentChange: (val) => {
            this.$emit('currentChange', { ...val })
          }
        }
      }
      return h(CmBaseTable, { ...props })
    },
    searchTable(h) {
      return h('div', [this.formFn(h), this.$slots.default, this.tableFn(h)])
    }
  },
  render(h) {
    return this.searchTable(h)
  }
}
