<template>
  <div
    class="infoCaption"
    :class="[wrapAlign, wrapWidth]"
  >
    <div
      v-for="(item, index) in list"
      :key="index"
      class="captionBox"
      :class="[
        boxAlign,
        [boxClass].flat().length == 1
          ? [boxClass].flat()[0]
          : [boxClass].flat()[index],
        highlightIndex == index ? 'highlight' : '',
      ]"
      @click="itemClick(item, index)"
      @mouseenter="mouseover(item, index)"
      @mouseleave="mouseLeave(item, index)"
    >
      <div
        class="captionBoxBigTitle"
        :style="{ order: item.order ? item.order[0] : '' }"
      >
        {{ item.title }}
      </div>

      <div
        class="captionBoxNum"
        :style="{ order: item.order ? item.order[1] : '' }"
      >
        {{ item.num }}<span class="captionBoxUnit">{{ item.unit }}</span>
      </div>

      <div
        class="captionBoxStastic"
        :style="{ order: item.order ? item.order[2] : '' }"
      >
        <div class="captionBoxTitle">
          {{ item.name }}
        </div>
        <img
          v-if="item.upIcon"
          class="upImg"
          :src="item.upIcon"
        >
        <span
          v-if="item.up"
          class="captionBoxUp"
        >{{ item.up }}</span>

        <img
          v-if="item.downIcon"
          class="downImg"
          :src="item.downIcon"
        >
        <span
          v-if="item.down"
          class="captionBoxDown"
        >{{ item.down }}</span>
      </div>
      <slot />
    </div>
  </div>
</template>
<script>
/**
 * wrap 调节最外层居中情况：space-around（align:around）； space-between(align:between)
 *      width 调节元素宽度：等宽(width:same) ；自身宽度：(不设置)
 * box 调节box内剧种情况：居中（ align: center）：居右(align: right)
 *     扩展自定义样式 对每个box加入class:[className]
 */
export default {
  name: 'CmInfoList',
  props: {
    list: {
      type: Array,
      default() {
        return [
          {
            title: '近一周',
            num: 1567,
            unit: '件',
            name: '本月处理数',
            up: '10%',
            upIcon: 'https://img.yzcdn.cn/vant/logo.png',
            down: '10%',
            downIcon: 'https://img.yzcdn.cn/vant/logo.png'
          },
          {
            title: '近一月',
            num: 1567,
            unit: '件',
            name: '本月处理数',
            up: '10%',
            upIcon: 'https://img.yzcdn.cn/vant/logo.png'
          },
          {
            title: '近一季',
            num: 1567,
            unit: '件',
            name: '本月处理数'
          }
        ]
      }
    },
    wrapAlign: {
      type: String,
      default: 'between' // between;around;''
    },
    wrapWidth: {
      type: String,
      default: 'same' // same;''
    },
    boxAlign: {
      type: String,
      default: 'center' // center/left,right
    },
    boxClass: {
      type: [Array, String],
      default() {
        return '' // 给box自定义class
      }
    },
    highlight: {
      type: Boolean,
      default: false
    },
    highlightAutoClose: {
      // 若要手动自动关闭，通过ref获取highlightIndex置为-1
      type: [String, Number],
      default: 0 // 判断为真就会自动关闭
    },
    autoPlay: {
      type: [String, Number],
      default: 0
    },
    onHover: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      highlightIndex: -1,
      inter: null
    }
  },
  beforeDestroy() {
    if (this.inter) {
      clearInterval(this.inter)
      this.inter = null
    }
  },
  mounted() {
    if (Number(this.autoPlay) && this.list?.length > 0) {
      this.highlightIndex = 0
      this.play(Number(this.autoPlay))
    }
  },
  methods: {
    mouseover() {
      if (this.onHover && this.autoPlay && this.inter) {
        clearInterval(this.inter)
        this.inter = null
      }
    },
    mouseLeave() {
      if (this.onHover && this.autoPlay && !this.inter) {
        this.play(Number(this.autoPlay))
      }
    },
    stop() {
      if (this.inter) {
        clearInterval(this.inter)
        this.inter = null
        this.highlightIndex = -1
      }
    },
    autoClose(t = 1000) {
      setTimeout(() => {
        if (Number(this.autoPlay) && !this.onHover) {
          this.play(Number(this.autoPlay))
        } else {
          this.highlightIndex = -1
        }
      }, t)
    },
    play(t = 3000) {
      if (this.list?.length > 0) {
        // 手动操作需要
        this.inter = setInterval(() => {
          if (++this.highlightIndex >= this.list.length) {
            this.highlightIndex = 0
          }
          this.$emit(
            'itemClick',
            this.list[this.highlightIndex],
            this.highlightIndex
          )
        }, t)
      }
    },
    itemClick(item, index) {
      if (this.highlight && this.list?.length > 0) {
        if (this.inter) {
          clearInterval(this.inter)
          this.inter = null
        }
        this.highlightIndex = index
        if (Number(this.highlightAutoClose)) {
          this.autoClose(Number(this.highlightAutoClose))
        } else if (Number(this.autoPlay) && !this.onHover) {
          this.play(Number(this.autoPlay))
        }
      }
      this.$emit('itemClick', item, index)
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  line-height: normal;
}
.infoCaption {
  display: flex;
  align-items: center;
  &.same {
    .captionBox {
      width: 1%;
      flex: 1;
    }
  }
  &.around {
    justify-content: space-around;
  }
  &.between {
    justify-content: space-between;
  }
  .captionBox {
    padding: 5px;
    background: #fff;
    // width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // width: calc((100% - 48px) / 4);
    // height: 86px;
    &.highlight {
      background: #e6e5e5;
    }
    &.center {
      align-items: center;
    }
    &.right {
      align-items: flex-end;
    }
    .captionBoxBigTitle {
      font-size: 36px;
      font-weight: 600;
    }
    .captionBoxNum {
      font-size: 34px;
      font-weight: 600;
      color: #4d81e1;

      .captionBoxUnit {
        font-size: 16px;
        font-weight: 400;
        color: #4d81e1;
      }
    }

    .captionBoxStastic {
      display: flex;
      align-items: center;

      img {
        display: inline-block;
        width: 22px;
        max-height: 22px;
        vertical-align: bottom;
        margin: 0 0 0 10px;
      }

      .captionBoxTitle {
        font-size: 16px;
        font-weight: 400;
        color: #333333;
        word-break: keep-all;
      }

      .captionBoxUp {
        font-size: 12px;
        font-weight: 600;
        color: #e44225;
        margin-left: 5px;
      }

      .captionBoxDown {
        font-size: 12px;
        font-weight: 600;
        color: #2fc25b;
        margin-left: 5px;
      }
    }
  }
}
</style>
