/* eslint-disable no-undef */
/*
 * @Author: zhoulf
 * @FilePath: /pc-ui/src/components/form/render/index.js
 * @Date: 2022-04-15 13:55:55
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-06-14 17:31:09
 * @Description:
 */
import {
  Input,
  Select,
  Option,
  InputNumber,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Switch,
  DatePicker
} from '@cci/cui'

export const inputRender = function(h, item, opts) {
  return [h(Input, opts)]
}
export const numberRender = function(h, item, opts) {
  return [h(InputNumber, opts)]
}
// 插槽
export const slotRender = function(h, item, opts) {
  return [h('div', opts, [item.template()])]
}
export const selectRender = function(h, item, opts, list) {
  let items = null
  const { label, value } = labelValue(item)

  if (item.build) {
    items = list[item.build.xStore]
  } else {
    if (item.xStore && typeof item.xStore !== 'function') {
      items = [...item.xStore]
    } else {
      items = item.xStore()
    }
  }
  return [h(Select, opts, [
    items && items.map(store => {
      let disabled = false
      if (store.disabled) {
        disabled = store.disabled
      }
      return h(Option, { props: { label: store[label], value: store[value], disabled }})
    })
  ])]
}
export const radioRender = function(h, item, opts) {
  const { xStore, label, value } = labelValue(item)
  return [h(RadioGroup, opts, [
    xStore.map(store => {
      return h(Radio, { 'props': { label: store[value] }}, [this._v(store[label])])
    })
  ])]
}
export const switchRender = function(h, item, opts) {
  return [h(Switch, opts)]
}
export const customRender = function(h, item, opts) {
  return [item.render(opts)]
}
export const textRender = function(h, item, opts) {
  return [h('span', { staticClass: 'el-form-text' }, [this._v(opts.attrs.value)])]
}

export const checkboxRender = function(h, item, opts) {
  const { xStore, label, value } = labelValue(item)
  return [h(CheckboxGroup, opts, [
    this._l(xStore, store => {
      return h(Checkbox, { 'props': { 'label': store[value], 'name': item.prop }}, [this._v(store[label])])
    })
  ])]
}

export const labelValue = (item) => {
  const label = item?.build?.label ?? (item.labelKey ?? 'label')
  const value = item?.build?.value ?? (item.valueKey ?? 'value')
  const xStore = typeof item.xStore === 'function' ? item.xStore() : item.xStore
  return { xStore, label, value }
}

export const selectTimeRender = function(h, item, opts) {
  let valueFormat = ''
  switch (opts.attrs.dataType) {
    case 'year':
      valueFormat = 'yyyy'
      break
    case 'month':
    case 'monthrange':
      valueFormat = 'yyyy-MM'
      break
    case 'week':
      valueFormat = 'yyyy 第 WW 周'
      break
    case 'date':
    case 'dates':
      valueFormat = 'yyyy-MM-dd'
      break
    case 'datetime':
    case 'datetimerange':
    case 'daterange':
      valueFormat = 'yyyy-MM-dd HH:mm:ss'
      break
  }
  if (opts.attrs.dataType !== 'week') { opts.attrs.valueFormat = opts.attrs.valueFormat ?? valueFormat }
  opts.attrs.format = opts.attrs.valueFormat ?? valueFormat
  opts.attrs.rangeSeparator = opts.attrs.rangeSeparator ?? '至'
  return [h(DatePicker, opts)]
}
