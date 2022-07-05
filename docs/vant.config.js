/*
 * @Author: zhoulf
 * @FilePath: /pc-ui/docs/vant.config.js
 * @Date: 2022-04-24 10:38:58
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-06-14 15:41:53
 * @Description: 
 */
module.exports = {
  name: 'docs',
  build: {
    css: {
      preprocessor: 'sass',
    },
    site: {
      publicPath: './',
    },
  },
  site: {
    title: 'cm-pc-ui',
    logo: 'https://img.yzcdn.cn/vant/logo.png',
    hideSimulator: true,
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
          {
            path: 'quickstart',
            title: '快速上手',
          },
        ],
      },
      {
        title: '基础组件',
        items: [
          {
            path: 'search-form',
            title: 'form组件',
          },
          {
            path: 'base-table',
            title: 'table组件',
          },
          {
            path: 'search-table',
            title: '搜索table组件',
          },
          {
            path: 'small-dialog',
            title: '拖拽弹框',
          },
          {
            path: 'info-list',
            title: '多样式标题展示',
          },
          {
            path: 'steps',
            title: '步骤条',
          }
        ],
      },
    ],
  },
};
