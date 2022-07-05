<template>
  <div
    class="steps"
    :style="{'--active-color': activeColor}"
  >
    <template v-for="(item, index) in stepsData">
      <div
        v-if="index > 0"
        :key="`line_${index}`"
        :class="['line', { success: action >= index }]"
      />
      <div
        :key="index"
        class="step"
      >
        <i
          v-if="index < action"
          class="finished-icon"
          :class="item.icon || 'el-icon-circle-check'"
        />
        <i
          v-else
          :class="[action === index ? 'process' : 'wait']"
        >{{
          index + 1
        }}</i>
        <span :class="{'text-highlight': textHighlight && index <= action}">{{ item.title }}</span>
        <span
          v-if="item.tip"
          class="step-tip"
          :class="{'text-highlight': textHighlight && index <= action}"
        >{{ item.tip }}</span>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'CmSteps',
  props: {
    activeColor: {
      type: String,
      default: '#3786fd'
    },
    stepsData: {
      type: Array,
      default: () => []
    },
    action: {
      type: Number,
      default: 0
    },
    textHighlight: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: true
    }
  }
}
</script>
<style lang="scss" scoped>
.steps {
  display: flex;
  justify-content: space-between;
  padding: 0 199px;
  .line {
    height: 1px;
    background-color: #c0c0c0;
    flex-grow: 1;
    top: 11px;
    position: relative;
    &.success {
      background-color: var(--active-color);
    }
  }
  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 10px;
    .text-highlight {
      color: var(--active-color);
      &.step-tip{
        color: var(--active-color);
      }
    }
    .step-tip{
      font-size: 12px;
      color: #c0c0c0;
    }
    i {
      width: 26px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      font-style: normal;
      box-sizing: border-box;
    }

    .finished-icon {
      font-size: 26px;
      color: var(--active-color);
    }
    .process {
      background: var(--active-color);
      border-radius: 50%;
      color: #fff;
    }
    .wait {
      color: #c0c0c0;
      border: 1px solid #c0c0c0;
      &::after {
        background-color: #c0c0c0;
      }
    }
    span {
      padding-top: 8px;
    }
  }
}
</style>
