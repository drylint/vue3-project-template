const path = require('path')
// 访问绝对路径
const pathJoin = dir => path.join(__dirname, dir)

module.exports = config => {
  const addStyleResource = rule => {
    rule.use('style-resource')
      .loader('style-resources-loader')
      .options({
        patterns: [
          pathJoin('src/styles/variables.scss'),
          pathJoin('src/styles/mixins.scss'),
        ],
      })
  }
  const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
  types.forEach(type => addStyleResource(config.module.rule('scss').oneOf(type)))
}
