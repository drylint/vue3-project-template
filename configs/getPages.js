const glob = require('glob')

const { VUE_APP_RUN_PAGE = '' } = process.env
console.log(`正在运行/打包的页面是 src/pages/${VUE_APP_RUN_PAGE}`)
const RUN_PAGE_LIST = VUE_APP_RUN_PAGE.split(/\s*,\s*/iu)

// glob 匹配获取多页路径方法
const getPages = basePath => {
  const pages = {}
  // glob.sync(basePath) 返回匹配到的路径组成的数组，例如：['src/pages/students', 'src/pages/teachers']
  const pagePathList = glob.sync(basePath)
  // pages 下的目录名组成的数组
  const pageNameList = pagePathList.map(pagePath => pagePath.split('/').slice(-1)[0])
  const pageCount = pageNameList.length
  // 是否存在运行的 page 目录名称
  const isRunPageExists = pageNameList.some(page => RUN_PAGE_LIST.includes(page))

  // 遍历 pages 下的目录名
  pageNameList.forEach(pageName => {
    // 如果有 2 个及以上页面，且指定了运行页面，且指定页面不包含当前页面，直接返回
    if (pageCount > 1 && VUE_APP_RUN_PAGE && isRunPageExists && !RUN_PAGE_LIST.includes(pageName)) {
      return
    }
    // pages的key值，使用目录结构。生成的静态资源，就会按这个目录存放。
    // 比如可以使用 pages[`../${pageName}/js/${pageName}`] = {}
    // 同时会影响引入路径，打包的 css 等静态资源也会被放入这个目录。
    // 注意，不是chunks的值决定了静态资源的存放目录，是pages的key。
    pages[`${pageName}`] = {
      entry: `src/pages/${pageName}/main.ts`,
      template: `src/pages/${pageName}/index.html`,
      // 除首页外的页面单独放置于文件夹内
      // filename: pageName === 'index' ? 'index.html' : `${pageName}/index.html`,
      filename: `${pageCount === 1 || (isRunPageExists && RUN_PAGE_LIST.length === 1) ? 'index' : pageName}.html`,
      title: '',
      // chunks: ['chunk-vendors', 'chunk-common', pageName]
    }
  })
  return pages
}

module.exports = getPages
