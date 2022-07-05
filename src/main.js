/*
 * @Author: zhoulf
 * @FilePath: /pc-ui/src/main.js
 * @Date: 2022-04-29 15:51:16
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-06-14 14:15:59
 * @Description:
 */
import Vue from 'vue'
import App from './app.vue'
import cui from '@cci/cui'
import PCUi from './index'
import '@cci/cui/packages/theme-default/src/index.scss'
import '../lib/index.css'
Vue.use(cui)
  .use(PCUi)
new Vue({
  el: '#app',
  render: (h) => h(App)
})
