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
    './configs/eslint/@typescript-eslint.js',
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
}
