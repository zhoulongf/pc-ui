/*
 * @Author: zhoulf
 * @FilePath: /pc-ui/src/components/search-form/src/formInline.js
 * @Date: 2022-04-18 15:49:11
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-04-26 14:31:21
 * @Description:
 */
import { throttle } from '../../../utils/index'

export const formInline = {
  data() {
    return {
      hasMore: false,
      showStatusUse: this.showStatus || 'all',
      hasMoreFunc: throttle(this.isHasMore, 300).bind(this)
    }
  },
  mounted() {
    setTimeout(() => {
      this.isHasMore()
      this.addFormEvent()
    }, 20)
  },
  computed: {
    iconClass() {
      return this.showStatusUse === 'all' ? 'el-icon-arrow-down' : 'el-icon-arrow-up'
    },
    formStyle() {
      return this.showStatusUse === 'all' ? { height: 'auto', overflow: 'hidden' } : { height: '80px', overflow: 'hidden' }
    }
  },
  destroyed() {
    this.clearGlobalEvent()
  },
  methods: {
    clearGlobalEvent() {
      window.removeEventListener('resize', this.hasMoreFunc)
    },
    addFormEvent() {
      if (this._formEvent) {
        return false
      }
      this._formEvent = true
      window.addEventListener('resize', this.hasMoreFunc)
    },
    isHasMore() {
      const $dom = document.querySelector('.cm-form-input')
      if ($dom) {
        const h = $dom.clientHeight
        if (h > 92) {
          this.hasMore = true
        } else if (this.showStatusUse === 'one') {
          this.showStatusUse = 'all'
          this.$nextTick(() => {
            this.isHasMore()
          })
        } else {
          this.hasMore = false
          this.showStatusUse = 'all'
        }
      }
    },
    switchStatus() {
      this.showStatusUse = this.showStatusUse === 'all' ? 'one' : 'all'
    }
  }
}
