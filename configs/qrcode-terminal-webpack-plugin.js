const qrcode = require('qrcode-terminal')
const ip = require('ip')

// L M Q H 精度从低到高
qrcode.setErrorLevel('H')

module.exports = class QrcodeTerminalWebpackPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    console.log('--------------------------------------------------------------')
    console.log('qrcode-terminal options', this.options)
    // compiler.hooks.beforeCompile.tap(
    //   'QrcodeTerminalWebpackPlugin',
    //   stats => {
    //     console.log('stats', Object.keys(stats))
    //     const url = `http://${ip.address()}`
    //     qrcode.generate(url, this.options)
    //     // console.log('stats', stats)
    //     // console.log('--------------------------------------------------------------')
    //     // console.log('stats.hash', stats.hash)
    //     // console.log('stats.startTime', stats.startTime)
    //     // console.log('stats.endTime', stats.endTime)
    //     // console.log('stats.compilation', stats.compilation)
    //     // console.log('--------------------------------------------------------------')
    //   },
    // )
  }
}
