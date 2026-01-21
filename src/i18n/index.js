import { createI18n } from 'vue-i18n'
import mZhLocale from './lang/zh'
import mEnLocale from './lang/en'
import useAppStore from '@/store/app'
import { getItem } from '@/utils/storage'
import { LANG } from '@/constant'
const messages = {
  en: {
    msg: {
      ...mEnLocale
    }
  },
  zh: {
    msg: {
      ...mZhLocale
    }
  }
}
const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: getItem(LANG) || 'zh',
  messages
})
// 在应用初始化后更新语言
export function setupI18n() {
  const appStore = useAppStore()
  i18n.global.locale.value = appStore.language
}
export default i18n
