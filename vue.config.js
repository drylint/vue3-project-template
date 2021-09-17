const path = require('path')
// 访问绝对路径
const pathJoin = dir => path.join(__dirname, dir)

module.exports = {
  // pages: getPages('src/pages/*'), // 多页配置
  lintOnSave: 'warning',
  publicPath: './',
  outputDir: 'dist',
  productionSourceMap: false,
  configureWebpack (config) {

    config.resolve = {
      extensions: ['.vue', '.tsx', '.ts', '.jsx', '.js', '.json'],
      alias: {
        '@': pathJoin('src'),
      },
    }

    // 从外部引入的库，比如在 index.html 中引入 cdn 地址
    config.externals = {
      // key 表示 import x from 'key'
      // value 表示外部引入的库暴露的全局变量名
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'axios': 'axios',
      'vant': 'vant',
      'element-ui': 'ELEMENT',
      'echarts': 'echarts',
      'BMap': 'BMap',
      'videojs': 'videojs',
      'lodash': '_',
      'qq': 'qq',
      'wx': 'wx',
      'callapp-lib': 'CallApp',
      'xlsx': 'XLSX',
      'tinymce': 'tinymce',
      'nprogress': 'NProgress',
      'compressorjs': 'Compressor',
    }
  },
}
