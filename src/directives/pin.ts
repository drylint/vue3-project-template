import type { App } from 'vue'

export default (app: App): void => {
  app.directive('pin', {
    // 当被绑定的元素挂载到 DOM 中后
    mounted (el, binding) {
      // 比如，v-pin:top="'3em'" 时，arg 为 'top', value 为 '3em'
      const { arg, value } = binding
      el.style.position = 'fixed'
      el.style[arg || 'top'] = value
    },
  })
}
