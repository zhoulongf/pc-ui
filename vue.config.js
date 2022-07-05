/*
 * @Author: zhoulf
 * @FilePath: /pc-ui/vue.config.js
 * @Date: 2022-06-23 17:39:42
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-06-23 17:40:01
 * @Description:
 */
module.exports = {
  publicPath: './',
  indexPath: 'index.html',
  outputDir: process.env.outputDir || 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  runtimeCompiler: true,
  parallel: require('os').cpus().length > 1,
  pwa: {},
  configureWebpack: {
    plugins: []
  },
  devServer: {
    port: 8900, // 端口
    proxy: {
      '^/hzfx-backend-ai': {
        target: 'http://10.10.160.184:8082/', // kaifa
        // target: 'http://10.10.160.186:8082/', // 测试
        changeOrigin: true
      },
      '^/file': {
        target: 'http://10.12.107.221:9006/', // kaifa
        // target: 'http://10.10.160.186:8082/', // 测试
        changeOrigin: true
      }
    }
  }
}
