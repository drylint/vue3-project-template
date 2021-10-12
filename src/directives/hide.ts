import type { App } from 'vue'

export default (app: App): void => {
  app.directive('hide', {
    mounted (el, binding) {
      const { value } = binding
      if (value) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    },
  })
}
