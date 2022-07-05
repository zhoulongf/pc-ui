<!--
 * @Author: zhoulf
 * @FilePath: /pc-ui/docs/src/search-form/index.vue
 * @Date: 2022-04-24 17:44:51
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-04-25 16:59:23
 * @Description: 
-->
<template>
  <button class="demo-button">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'search-form',

  props: {
    color: String,
    type: {
      type: String,
      default: 'primary',
    },
  },
};
</script>

<style lang="scss">
.demo-button {
  min-width: 120px;
  color: #fff;
  font-size: 16px;
  line-height: 36px;
  background-color: #f44;
  border: none;
  border-radius: 30px;
}
</style>
