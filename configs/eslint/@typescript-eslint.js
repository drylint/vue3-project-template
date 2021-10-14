module.exports = {
  rules: {
    // 解决冲突报错，关闭 indent，启用 @typescript-eslint/indent
    'indent': 'off',
    '@typescript-eslint/indent': [2, 2],

    '@typescript-eslint/no-var-requires': [0],

    // 在 ts 中开启时，直接使用声明文件的变量会报错
    'no-undef': [0],

    // 避免冲突，关闭 eslint 对应规则，开启 @typescript-eslint 规则
    'no-unused-vars': [0],
    '@typescript-eslint/no-unused-vars': [2, { // 禁止出现未使用过的变量，仅被声明以及被赋值视为未使用，其他情况视为使用
      vars: 'all', // 默认 all 检测所有变量，包括全局环境中的变量；local 仅检测本作用域，允许不使用全局环境中的变量。
      varsIgnorePattern: 'ignore', // 正则字符串，只要未使用的变量名中，包含匹配该正则的字符串，则不报错，比如 const ignoreVar = 1
      args: 'none', // 默认 after-used 只警告最后使用过的参数之后的参数， all 所有未使用参数报错，none 参数不报该错
      argsIgnorePattern: '', // 正则字符串，未使用的函数参数名包含该正则匹配，则不报错
      ignoreRestSiblings: true, // 默认 false，是否忽略剩余参数的兄弟，比如 const { a, b, ...rest} = obj 只检查 rest 是否被使用
      caughtErrors: 'none', // 默认 none 不警告 catch(err){} 参数未被使用， all 警告 catch(err){} 所有未使用的参数
    }],

    // 禁止不必要的 constructor，ES2015 为没有指定构造函数的类提供了默认构造函数。没必要写空的或仅调用了 super() 的构造函数
    'no-useless-constructor': [0],
    '@typescript-eslint/no-useless-constructor': [2],
  },
  overrides: [
    {
      files: ['*.d.ts'], // 所有 ts 声明文件
      rules: {
        // 声明变量必须初始化值，ts 声明文件中不应该初始化，所以关闭
        'init-declarations': [0],
        // 禁止重复声明变量，ts 声明文件中函数重载时需要，所以关闭
        'no-redeclare': [0],
      },
    },
  ],
}
