/*
 * @Author: zhoulf
 * @FilePath: /pc-ui/rollup.base.js
 * @Date: 2022-04-21 10:33:22
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-07-05 11:56:39
 * @Description:
 */
// import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import babel from 'rollup-plugin-babel'
import cjs from '@rollup/plugin-commonjs'
import svg from 'rollup-plugin-svg'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import node from '@rollup/plugin-node-resolve'
import vue from 'rollup-plugin-vue'
import url from 'rollup-plugin-url'
import scss from 'rollup-plugin-scss'
import acornJSX from 'acorn-jsx'
import imagePlugin from '@rollup/plugin-image'
// import serve from 'rollup-plugin-serve' // 添加本地http服务
export function getConfig(type, min = true) {
  const config = {
    input: './src/index.js',
    acornInjectPlugins: [acornJSX({ allowNamespaces: false })],
    external: id => {
      if (/^(vue)$/.test(id)) {
        return true
      }
      if (/@babel\/runtime/.test(id)) {
        return true
      }
      if (/^echarts/.test(id)) {
        return true
      }
      if (/^lodash/.test(id)) {
        return true
      }
      if (/^resize-detector/.test(id)) {
        return true
      }
      if (/^sortablejs/.test(id)) {
        return true
      }
    },
    output: [
      {
        format: 'esm',
        file: 'lib/index.js',
        globals: {
          vue: 'vue'
        }
      }],
    plugins: [
      vue({
        css: true,
        compileTemplate: true
      }),
      node({
        extensions: ['.vue', '.mjs', '.js', '.jsx', '.json']
      }),
      cjs(),
      scss(),
      svg(),
      json(),
      globals(),
      builtins(),
      replace({
        preventAssignment: true
      }),
      babel({
        exclude: '/node_modules/**',
        runtimeHelpers: true
      }),
      url({
        include: ['**/*.woff', '**/*.ttf'], // 打包字体为base64
        limit: Infinity
      }),
      imagePlugin()
      // serve({
      //   port: 5000,
      //   open: true,
      //   headers: {
      //     'Access-Control-Allow-Origin': '*' // 本地服务允许跨域
      //   }
      // 在开发服务中添加一些输出的一些信息
      // onListening: function (server) {
      //   console.log('\x1B[33m%s\x1b[0m:', 'The rollup dev Serve is start!!!')
      //   const address = server.address()
      //   const host = address.address === '::' ? 'localhost' : address.address
      //   // by using a bound function, we can access options as `this`
      //   const protocol = this.https ? 'https' : 'http';
      //   console.log('\x1B[36m%s\x1B[0m', `Serve is listening in ${address.port}`);
      //   console.log('\x1B[35m%s\x1B[39m', `You can click   ${protocol}://${host}:${address.port}/   go to Browser`);
      //   console.log('\x1B[34m%s\x1B[39m', `You can click   ${protocol}://localhost:${address.port}/  go to Browser`);
      // }
      // })
    ]
  }

  if (min !== false) {
    // config.plugins.push(terser())
  }
  return config
}
export default getConfig('vue')
