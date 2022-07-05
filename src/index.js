/*
 * @Author: zhoulf
 * @FilePath: /pc-ui/src/index.js
 * @Date: 2022-04-21 10:17:38
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-05-24 14:44:59
 * @Description:
 */

import { CmSearchForm, CmBaseTable, CmSearchTable, CmInfoList, CmCommonDetail, CmSmallDialog, CmSteps } from './components'
import { CmDragDialog } from './directive'
export {
  CmSearchForm,
  CmBaseTable,
  CmSearchTable,
  CmInfoList,
  CmCommonDetail,
  CmSmallDialog,
  CmSteps,
  CmDragDialog
}
export default {
  install(Vue) {
    Vue.component(CmSearchForm.name, CmSearchForm)
    Vue.component(CmBaseTable.name, CmBaseTable)
    Vue.component(CmSearchTable.name, CmSearchTable)
    Vue.component(CmCommonDetail.name, CmCommonDetail)
    Vue.component(CmInfoList.name, CmInfoList)
    Vue.component(CmSteps.name, CmSteps)
    Vue.component(CmSmallDialog.name, CmSmallDialog)
    Vue.directive(CmDragDialog.name, CmDragDialog)
  }
}
