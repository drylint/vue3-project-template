export default (Vue, options = {}) => {
  const hooks = {
    inserted (el, binding, vnode) {
      const { value } = binding
      const valueType = Object.prototype.toString.call(value).slice(8, -1)
      if (!value || !['String', 'Array'].includes(valueType)) {
        throw new Error('Missing String value or Array value when using v-auth')
      }
      const { store } = options
      const { permissionList = [] } = store?.getters
      // 如果传入字符串，且有权限，不做操作，直接退出
      if (valueType === 'String' && permissionList.includes(value)) {
        return
      }
      // 如果传入数组，且有权限，不做操作，直接退出
      if (valueType === 'Array' && value.some(item => permissionList.includes(item))) {
        return
      }

      // 无权限，移除当前元素
      el.parentNode && el.parentNode.removeChild(el)
    },
  }

  Vue.directive('auth', hooks)
}
