import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import installElementPlus from './plugins/element'
import './styles/index.scss'
import installIcons from './icons'
import i18n, { setupI18n } from './i18n'
import './permission'
import installFilter from '@/filter'
import installDirectives from '@/directives'

// 忽略 ResizeObserver 良性错误（多由 Element Plus 等组件库引起，不影响功能）
const isResizeObserverError = (message) => {
  if (!message) return false
  const msg = String(message)
  return (
    msg.includes('ResizeObserver loop') ||
    msg.includes('ResizeObserver loop completed with undelivered notifications')
  )
}

// 处理同步错误
window.addEventListener(
  'error',
  (e) => {
    if (isResizeObserverError(e.message)) {
      e.stopImmediatePropagation()
      e.preventDefault()
      return false
    }
  },
  true
)

// 处理未捕获的 Promise rejection
window.addEventListener('unhandledrejection', (e) => {
  const reason = e.reason
  if (
    isResizeObserverError(reason?.message) ||
    isResizeObserverError(reason?.toString?.())
  ) {
    e.preventDefault()
  }
})

// 覆盖 console.error 以过滤 ResizeObserver 错误（针对 webpack-dev-server overlay）
const originalConsoleError = console.error
console.error = (...args) => {
  const message = args.join(' ')
  if (isResizeObserverError(message)) {
    return
  }
  originalConsoleError.apply(console, args)
}

const app = createApp(App)
const pinia = createPinia()
installElementPlus(app)
installIcons(app)
installFilter(app)
installDirectives(app)
app.use(pinia)
app.use(router)
app.use(i18n)
setupI18n()
app.mount('#app')
