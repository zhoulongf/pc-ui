<!--
 * @Author: zhoulf
 * @FilePath: /pc-ui/docs/src/info-list/index.vue
 * @Date: 2022-05-19 14:44:00
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-05-19 15:41:46
 * @Description: 
-->
<template>
  <div class="info-test">
    <cm-info-list />
  </div>
</template>
<script>
import {CmInfoList} from '../../../lib'

export default {
    name: 'test-info',
    components:{
        [CmInfoList.name]:CmInfoList
    }
}
</script>
