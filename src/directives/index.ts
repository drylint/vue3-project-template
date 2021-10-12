import type { App } from 'vue'

// 全局指令
import hide from './hide'
import focus from './focus'
import pin from './pin'

const install = (app: App, options = {}): void => {
  // 增加 v-hide 指令
  hide(app, options)
  focus(app)
  pin(app)
}

export default install
