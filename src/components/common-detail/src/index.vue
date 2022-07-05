<!--
 * @Author: fastfan
 * @Date: 2020-12-01 10:03:53
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-06-14 17:32:32
 * @Description: 详情页面通用排版一
 * @FilePath: /pc-ui/src/components/common-detail/src/index.vue
-->

<script>
import { Row, Col } from '@cci/cui'
export default {
  name: 'CmCommonDetail',

  components: {
    ElCol: Col,
    ElRow: Row
  },
  props: {
    list: {
      type: Object,
      default() {
        return {}
      }
    },
    headTitle: {
      type: String,
      default() {
        return ''
      }
    }
  },
  computed: {
    listData() { // 数据
      return this.list.data || []
    }
  },

  methods: {
    clickLink(e, info) {
      this.$emit('linkValue', info)
    }
  },
  render() {
    return (
      <div class='cm-common-info'>
        {
          this.headTitle !== ''
            ? <div class='cm-common-info-header'>
              <div class='title'>{this.headTitle}</div>
            </div>
            : null
        }
        <c-row>
          {
            this._l(this.listData, item => {
              return (
                <c-col span={item.col || 24}>
                  <div style={`color: ${item.labelColor};`} >{item.label}</div>
                  {
                    item.xType === 'Slot' ? (
                      <div>
                        { this.$slots[item.slotName] }
                      </div>
                    )
                      : <div style={item.valueStyle} on-click={(e) => this.clickLink(e, item)}>{item.value}</div>
                  }
                </c-col>
              )
            })
          }
        </c-row>
      </div>
    )
  }
}
</script>

<style lang='scss'>
  .cm-common-info{
    &-header{
      display: flex;
      justify-content: space-between;
      margin-bottom: 14px;
      color:rgba(51,51,51,1);
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
    .el-col{
      display: flex;
      font-weight: 400;
      font-size: 14px;
      align-content: space-around;
      flex-wrap: wrap;
      div:nth-child(1){
        width: 70px;
        color:rgba(51,51,51,1);
        text-align: right;
        margin: 16px 0 0 0;
      }
      div:nth-child(2){
        display: flex;
        // margin: 16px 0 0 0;
        align-items: flex-end;
        flex: 1;
        margin-left: 8px;
        color:rgba(51,51,51,.6);
      }
      .cont-video{
        width: 33% !important;
        height: 80px;
      }
      .cont-video2{
        width: 25% !important;
        height: 80px;
      }
      .text-List{
         width: 78%;
         flex-wrap: wrap;
         flex:none !important;
      }
      .text-list{
        min-width: 114px !important;
        width: auto !important;
        max-width: 156px !important;
        color: rgba(51, 51, 51, 0.6) !important;
        margin: 0 8px 8px 0 !important;
        flex:none !important;
      }
      .img-content{
        img{
          width: 80px;
          height: 80px;
        }
      }
    }
  }
</style>
