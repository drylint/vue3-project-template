module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:markdown/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/standard',
    '@vue/typescript/recommended',
    './configs/eslint/vue.js',
    'better',
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // 解决冲突报错，关闭 indent，启用 @typescript-eslint/indent
    'indent': 'off',
    '@typescript-eslint/indent': [2, 2],
    '@typescript-eslint/no-var-requires': [0],
  }
}
