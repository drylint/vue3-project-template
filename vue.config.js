const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')
const QrcodeTerminalWebpackPlugin = require('./configs/qrcode-terminal-webpack-plugin')

// 访问绝对路径
const pathJoin = dir => path.join(__dirname, dir)

// 环境变量获取
const { VUE_APP_BASE_URL, NODE_ENV, MOCK_SERVER, ENV_PX_TO_REM, VUE_APP_RUN_MODE } = process.env

// 是否是开发环境
const isDevelopment = NODE_ENV === 'development'
// 是否是生产环境
const isProduction = NODE_ENV === 'production'
// 是否构建目标为：库
const isTargetLib = VUE_APP_RUN_MODE === 'lib'

const targetAppConfig = {
  pages: require('./configs/getPages')('src/pages/*'), // 多页配置
  lintOnSave: 'warning',
  publicPath: './',
  outputDir: 'dist',
  productionSourceMap: false,
  configureWebpack (config) {

    // 构建目标为库时，不应设置此项，否则会报错 ~entry 找不到
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
      'FingerprintJS': '@fingerprintjs/fingerprintjs',
    }

  },
  chainWebpack (config) {
    // 启用 CSS 代码检查
    config
      .plugin('stylelint-webpack-plugin')
      .use(StylelintWebpackPlugin, [{
        files: ['**/*.{vue,html,css,scss,sass,less,styl}'],
        failOnError: false,
        failOnWarning: false,
        emitWarning: true,
        emitError: false,
        cache: false,
      }])

    // 开发环境的配置
    config.when(isDevelopment, config => {
      // 开发环境，开启二维码地址
      config
        .plugin('qrcode-terminal-webpack-plugin')
        .use(QrcodeTerminalWebpackPlugin, [{
          small: true,
        }])

    })

    // 生产环境的配置
    config.when(isProduction, config => {
      // terser 插件压缩代码配置
      config.optimization.minimizer('terser').tap(options => {
        const { compress } = options[0].terserOptions
        compress.drop_console = false
        compress.drop_debugger = true
        return options
      })

      // 启用 gzip 压缩插件
      config
        .plugin('compression-webpack-plugin')
        .use(CompressionWebpackPlugin, [{
          test: /\.js$|\.html$|\.css$/u,
          threshold: 4096, // 超过 4kb 压缩
        }])

      // 启用打包分析插件
      config
        .plugin('webpack-bundle-analyzer')
        .use(BundleAnalyzerPlugin, [{
          analyzerMode: 'disabled', // static | disabled
          openAnalyzer: false,
        }])
    })
  },
  devServer: {
    // open: true,
    proxy: {
      '/api': {
        target: VUE_APP_BASE_URL,
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
    before: MOCK_SERVER === 'open' && require('./mock/server'),
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: ENV_PX_TO_REM === 'open'
          ? [
            require('postcss-pxtorem')({
              rootValue: 100, // rem 大小
              propList: ['*'],
            }),
          ]
          : [],
      },
      scss: {
        prependData: `
          @use "~@/styles/vars.scss" as *;
          @use "~@/styles/mixins.scss" as *;
          @use "~@/styles/theme.scss" as *;
        `,
      },
    },
  },
}

module.exports = isTargetLib ? require('./configs/target_lib') : targetAppConfig
