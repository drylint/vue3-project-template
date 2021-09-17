module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
  ],
  ignoreFiles: [
    '**/node_modules/**/*',
    '**/dist/**/*',
    '**/wxcomponents/**/*',
    '**/_*.css',
    '**/iconfont.css',
    '**/ant-design*.css',
  ],
  rules: {
    // 规则前空行
    'rule-empty-line-before': null, // 'always'|'never'|'always-multi-line'|'never-multi-line'
    // 命名颜色值
    'color-named': 'never', // 'always-where-possible'|'never'
    // 颜色大小写
    'color-hex-case': null, // 'lower'|'upper'
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    // 对未知的单位抛出错误，忽略小程序的 rpx
    'unit-no-unknown': [true, {
      ignoreUnits: ['rpx'],
    }],
    // 检查单位的大小写，比如 px, PX, Px，不启用
    'unit-case': null,
    // 对未知的伪类报错，忽略 vue 使用的 ::v-deep
    'selector-pseudo-element-no-unknown': [true, {
      ignorePseudoElements: ['v-deep'],
    }],
    'selector-max-id': 1,
    'max-nesting-depth': null,
    'selector-no-qualifying-type': null,
  },
}
