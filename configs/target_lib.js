
module.exports = {
  lintOnSave: 'warning',
  outputDir: 'dist',
  productionSourceMap: false,
  configureWebpack (config) {
    // 构建目标为库时，设置此项会报错 ~entry 找不到
    config.output.libraryExport = 'default'
  },
  css: {
    extract: false,
  },
}
