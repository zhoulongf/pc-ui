<!--
 * @Author: zhoulf
 * @FilePath: /pc-ui/src/test-component/steps-test/index.vue
 * @Date: 2022-05-24 14:49:15
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-05-24 14:54:15
 * @Description:
-->
<template>
  <div class="steps-test">
    <cm-steps
      :steps-data="stepsData"
      active-color="#4d81e1"
      :action="action"
      text-highlight
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      action: 0,
      stepsData: [
        {
          title: '步骤一',
          icon: 'el-icon-search'
        },
        {
          title: '步骤二',
          tip: '这是步骤二的提示'
        }
        // {
        //   title: '步骤三',
        // },
        // {
        //   title: '步骤四',
        // },
        // {
        //   title: '步骤五',
        // },
      ]
    }
  },
  created() {
    setInterval(() => {
      if (this.action < this.stepsData.length - 1) {
        this.action++
      } else {
        this.action = 0
      }
    }, 1000)
  }
}
</script>
