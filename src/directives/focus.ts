import type { App } from 'vue'

export default (app: App): void => {
  app.directive('focus', {
    // 当被绑定的元素挂载到 DOM 中后
    mounted (el) {
      el.focus()
    },
  })
}
