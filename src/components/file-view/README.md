# file-view 文件预览

## 介绍

文件预览

该组件封装了各种文件格式的预览。 基于业务关系，目前该组件仅支持传入文件url预览，后续若业务需要，可配置传BLOB对象进行预览

## API

prop
| 参数          | 说明     | 类型     | 是否必传    | 备注 |
| ------------- | -------- | -------- | --------- | ------ |
| fileType  | 文件类型 | String | true | 目前支持pdf，docx，xlsx，txt，md，js，json，css格式 |
| fileSrc  | 文件url | String | true | -- |

### 引入

```js
import { CmFileView } from '@cm/cm-pc-ui'

```


### 基础用法


```html
    <CmFileView :fileType="'pdf'" :fileSrc="'/file/5,0b01890a43c9'"></CmFileView>
```