
import { Table, TableColumn } from '@cci/cui'
import Pagination from '../../pagination/index'
import './table.scss'
export default {
  name: 'CmBaseTable',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    highlightCurrentRow: {
      type: Boolean,
      default: false
    },
    paginationCurrent: {
      type: [String, Number],
      default: 1
    },
    paginationSize: {
      // 每页显示条目个数
      type: Number,
      default: 10
    },
    totals: {
      // 全部数据
      type: Number,
      default: 0
    },
    paginationPageSizes: {
      // 每页显示个数选择器的选项设置
      default: () => {
        return [10, 20, 30, 40]
      }
    },
    isPagination: {// 是否显示分页
      type: Boolean,
      default: true
    },
    indexAlign: String, // 序号的排列
    isIndex: {
      type: Boolean,
      default: false
    }, // 是否需要序号
    indexLabel: {
      type: String,
      default: '序号'
    },
    indexWidth: {
      type: [String, Number],
      default: 60
    },
    indexFixed: {
      type: String
    },
    expandWidth: {// 展开项的宽
      type: [String, Number],
      default: 60
    },
    expandLabel: String,
    expandFixed: String,
    expandAlign: String,
    slotExpand: Boolean,
    selectionWidth: {// 多选的宽
      type: [String, Number],
      default: 50
    },
    selectionFixed: {
      type: String,
      default: 'left'
    },
    selectionAlign: {
      type: String,
      default: 'left'
    },
    selectable: {// 多选，每一项默认都可选
      type: Function,
      default: (_row, _index) => {
        return true
      }
    },
    // 多选值
    selectionKey: {
      type: [String, Number],
      default: ''
    },
    fields: {
      // 所有数据结构
      type: Array,
      default: () => {
        return []
      }
    },
    data: {
      // 数据
      type: Array,
      default: () => {
        return []
      }
    },
    height: {
      type: [String, Number]
    },
    maxHeight: {
      type: [String, Number],
      default: 250
    },
    filters: {
      type: Boolean,
      default: false
    },
    stripe: Boolean,
    border: Boolean,
    size: {
      // 每页显示条目个数
      type: [Number, String],
      default: '10'
    },
    fit: {
      type: Boolean,
      default: true
    },
    showHeader: {// 控制头部显示隐藏
      type: Boolean,
      default: true
    },
    // 是否多选
    isSelection: {
      type: Boolean,
      default: false
    },
    propEmptyDefault: String,
    currentRowKey: [String, Number],
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    cellClassName: [String, Function],
    cellStyle: [Object, Function],
    headerRowClassName: [String, Function],
    headerCellClassName: [String, Function],
    headerRowStyle: [Object, Function],
    headerCellStyle: [Object, Function],
    rowKey: [String, Function],
    emptyText: String,
    defaultExpandAll: Boolean,
    expandRowKeys: Array,
    defaultSort: Object,
    showSummary: Boolean,
    sumText: String,
    summaryMethod: Function,
    spanMethod: Function,
    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },
    indent: {
      type: Number,
      default: 16
    },
    lazy: Boolean,
    load: Function,
    treeProps: Object
  },
  data() {
    return {
      currentSelection: [], // 当前选择的
      isCanChange: false, // 是否选择时可以改变了
      emptyImg: null
    }
  },
  watch: {
    data: {
      deep: true,
      handler(list) {
        /** selectionKey 选择模式翻页时选择唯一key  选择模式翻页时是否不清空之前选择的*/
        this.isCanChange = false
        if (this.currentSelection.length && this.selectionKey) {
          this.$nextTick(() => {
            this.currentSelection.map((li, ind) => {
              const $index = list.findIndex(
                (x) => x[this.selectionKey] === li[this.selectionKey]
              )
              if ($index >= 0) {
                this.$refs.cmSearchTable.toggleRowSelection(
                  this.$refs.cmSearchTable.data[$index],
                  true
                )
              }
              if (ind === this.currentSelection.length - 1) {
                this.isCanChange = true
              }
            })
          })
        } else {
          this.isCanChange = true
        }
      }
    }
  },
  methods: {
    // 将vnode转为dom
    cloneVNode(h, vnode) {
      if (!vnode) return null
      return h(vnode.tag, vnode.data, vnode.children)
    },
    // 插槽再render中的使用
    formatTooltip(h, item) {
      // eslint-disable-next-line eqeqeq
      if (item.type == 'expand') {
        item.scopedSlots = item.scopedSlots || {
          default: () => { // 如果设置展开项，但是未加数据的默认
            return h('div', [`暂无展开项数据`])
          }
        }
      } else {
        item.scopedSlots = item.scopedSlots || {
          default: item.scopedSlots?.default || (({ row, column, $index }) => { // 默认插槽
            return h('span', [
              column && column.formatter
                ? column.formatter(row, column, row[item.prop], $index)
                : this._v(row[item.prop] || this.emptyText || '--')
            ])
          }),
          header: item.scopedSlots?.header || (({ column }) => { // 头部样式默认插槽，插槽和renderHeader同时存在时候renderHeader优先级更高
            return h('div', { class: 'cell' }, [column.label])
          })
        }
      }
      return item
    },
    // 当选择项发生变化时会触发该事件
    selectionChange(val) {
      this.$emit('selectionChange', val)
    },
    // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
    toggleRowSelection(row, selected) {
      this.$refs.cmSearchTable.toggleRowSelection(row, selected)
    },
    // 用于可展开表格与树形表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开）
    toggleRowExpansion(row, expanded) {
      this.$refs.cmSearchTable.toggleRowExpansion(row, expanded)
    },
    // 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。
    setCurrentRow(row) {
      this.$refs.cmSearchTable.setCurrentRow(row)
    },
    // 不传入参数时用于清空所有过滤条件，数据会恢复成未过滤的状态，也可传入由columnKey组成的数组以清除指定列的过滤条件
    clearFilter(columnKey) {
      this.$refs.cmSearchTable.clearFilter(columnKey)
    },
    // 不传入参数时用于清空所有过滤条件，数据会恢复成未过滤的状态，也可传入由columnKey组成的数组以清除指定列的过滤条件
    sort(prop, order) {
      this.$refs.cmSearchTable.sort(prop, order)
    },
    /** table-column的方法*/
    filterMethod(value, row, column) {
      this.$emit('filterMethod', { value, row, column })
    },
    pageInfo() {
      return this.$refs.pageRefs.pageInfo()
    },
    resetPage(init = '') {
      return this.$refs.pageRefs.resetPage(init)
    }
  },
  render(h) {
    // table
    const renderTab = () => {
      // table的属性设置
      const tableProps = {
        staticClass: 'cm-search-table',
        props: {
          ...this.$props
        },
        on: {
          'selection-change': (val) => {
            this.selectionChange(val)
          },
          'show-header': this.showHeader,
          'current-change': (currentRow, oldCurrentRow) => {
            this.$emit('currentChange', { currentRow, oldCurrentRow })
          }
        }
      }
      const columns = this.fields.map(item => { return this.formatTooltip(h, item,) })
      return h(
        Table,
        {
          ref: 'cmSearchTable',
          ...tableProps
        },
        [
          renderEmpty(h),
          this.$props.isIndex && renderTableColumn(h),
          this.$props.isSelection && renderIsSelection(),
          renderTableColumns(h, columns)
        ]
      )
    }
    // c-table-column具体的每一项
    const renderTableColumns = (h, columns) => {
      const tableColumnArr = []
      // 初始化的时候给column设置scopeSlots
      columns.forEach((item, index) => {
        const props = {
          scopedSlots: item.scopedSlots, // 可以自定义插槽可以再次定义或者其他
          attrs: {
            ...item,
            key: index,
            index:
              item.colType === 'index' && item.indexMethod
                ? item.indexMethod
                : () => { }
          },
          key: item.label
        }
        const column = h(
          TableColumn,
          {
            ...props
          },
          []
        )
        tableColumnArr.push(column)
      })
      return tableColumnArr
    }
    // 数据为空的时候的默认展示
    const renderEmpty = (h) => {
      const vnode = this.$slots.empty ? this.$slots.empty.map(item => { return this.cloneVNode(h, item) }) : null
      return (
        <div slot='empty'>
          {vnode || (
            // <div class='empty'><img class='empty-img' src={this.emptyImg}/> 暂无数据...</div>
            <div class='empty'> 暂无数据...</div>
          )}
        </div>
      )
    }
    // 序号区域
    const renderTableColumn = (h) => {
      return h(TableColumn, {
        props: {
          type: 'index',
          label: this.indexLabel,
          width: this.indexWidth,
          fixed: this.indexFixed,
          align: this.indexAlign
        }
      })
    }
    // 多选区域
    const renderIsSelection = () => {
      return (
        <TableColumn
          type='selection'
          width={this.selectionWidth}
          fixed={this.selectionFixed}
          align={this.selectionAlign}
          selectable={this.selectable}
        ></TableColumn>
      )
    }
    // 分页组件
    const renderPagination = () => {
      const props = {
        props: {
          current: this.paginationCurrent,
          size: this.paginationSize,
          total: this.totals,
          pageSizes: this.paginationPageSizes
        },
        on: {
          paginationChange: (val) => {
            this.$emit('paginationChange', val)
          }
        }
      }
      return (
        <div class='pagination'>
          <div class='pagination-left'>
            <slot name='slotPagination'></slot>
          </div>
          <div class='pagination-right'>
            <Pagination ref='pageRefs' {...props} />
          </div>
        </div>
      )
    }
    return (
      <div class='cm-base-table' v-loading={this.isLoading}>
        {renderTab()}
        {this.isPagination && renderPagination()}
      </div>
    )
  }
}
