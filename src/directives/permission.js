import useUserStore from '@/store/user'
function checkPermission(el, binding) {
  const userStore = useUserStore()
  // 获取绑定的值，此处为权限
  const { value } = binding
  // 获取所有的功能指令
  const points = userStore.userInfo?.permission?.points || []
  // 当传入的指令集为数组时
  if (value && Array.isArray(value)) {
    const hasPermission = points.some(point => value.includes(point))
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('v-permission value is ["admin","editor"]')
  }
}

export default {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  // Vue 3 中 updated 钩子在包含组件的 VNode 及其子组件的 VNode 更新后调用
  updated(el, binding) {
    checkPermission(el, binding)
  }
}
