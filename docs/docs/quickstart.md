<!--
 * @Author: zhoulf
 * @FilePath: /pc-ui/docs/docs/quickstart.md
 * @Date: 2022-04-24 17:44:51
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-04-25 19:36:33
 * @Description: 
-->
# 快速上手

### 安装

```bash
# 通过 yarn
yarn  

### 快速使用
```js
全局使用

import PCUi from '@cm/cm-pc-ui'
Vue.use(PCUi)

按需使用
import { CmSearchForm, CmBaseTable, CmSearchTable } from '@cm/cm-pc-ui'
components: {
    CmSearchForm,
    CmBaseTable,
    CmSearchTable
  },
import '@cm/cm-pc-ui/lib/index.css'
```
