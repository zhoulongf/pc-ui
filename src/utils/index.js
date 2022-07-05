/*
 * @Author: zhoulf
 * @FilePath: /pc-ui/src/utils/index.js
 * @Date: 2022-04-21 11:16:11
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-04-21 11:16:12
 * @Description:
 */
export function throttle(fn, wait) {
  // var pre = Date.now();
  var timer
  wait = wait || 100
  return function() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, wait)
  }
}
const _toString = Object.prototype.toString
export function isObject(obj) {
  return _toString.call(obj)
}
