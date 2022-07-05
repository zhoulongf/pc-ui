/*
 * @Author: zhoulf
 * @FilePath: /pc-ui/src/components/pagination/src/index.jsx
 * @Date: 2022-04-19 17:51:54
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-06-21 11:46:27
 * @Description:
 */
import { Pagination } from '@cci/cui'
export default {
  name: 'Pagination',
  props: {
    hideOnSinglePage: {
      // 当只有一页时隐藏分页
      type: Boolean,
      default: false
    },
    current: {
      // 当前位于页数
      type: Number,
      default: 1
    },
    // eslint-disable-next-line vue/require-prop-types
    pageSizes: {
      // 每页显示个数选择器的选项设置
      default: () => {
        return [10, 20, 30, 40]
      }
    },
    total: {
      // 全部数据
      type: Number,
      default: 0
    },
    pageSize: {
      // 每页显示条目个数
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      currentSize: 10,
      currentPage: 1,
      allTotal: 0,
      $type: ''
    }
  },
  watch: {
    total: {
      immediate: true,
      handler: function(val) {
        this.allTotal = val
      }

    }
  },
  mounted() {
    this.resetPage('init')
  },
  methods: {
    handleSizeChange($type) {
      this.emitData($type)
    },
    emitData($type = 'pageSize') {
      this.$type = $type
      this.$emit('paginationChange', this.pageInfo())
    },
    pageInfo() {
      return {
        type: this.$type ?? 'search',
        pageSize: this.currentSize,
        total: this.allTotal,
        totals: this.allTotal,
        pageSizes: this.$props.pageSizes,
        current: this.currentPage
      }
    },
    resetPage(init = '') {
      if (init) {
        this.currentPage = 1
      } else {
        this.currentSize = this.$props.pageSizes[0]
        this.currentPage = 1
      }
      this.emitData('current')
    }
  },
  render() {
    const modalProps = {
      on: {
        'size-change': (val) => {
          this.currentSize = val
          this.handleSizeChange('pageSize')
        },
        'current-change': (val) => {
          this.currentPage = val
          this.handleSizeChange('current')
        }
      },
      props: {
        'current-page': this.currentPage,
        pageSize: this.currentSize,
        pageSizes: this.$props.pageSizes,
        total: this.allTotal,
        background: this.$props.background ?? true,
        layout: 'total, sizes, prev, pager, next, jumper'
      }
    }
    return (
      <Pagination
        class='pagination'
        { ...modalProps } />

    )
  }
}
