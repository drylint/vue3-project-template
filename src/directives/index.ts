import type { App } from 'vue'

// 自定义指令
import hide from './hide'
import focus from './focus'
import pin from './pin'

const install = (app: App): void => {
  hide(app) // v-hide
  focus(app) // v-focus
  pin(app) // v-pin
}

export default install
