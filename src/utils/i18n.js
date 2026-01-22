import i18n from '@/i18n'
import { watch } from 'vue'
import useAppStore from '@/store/app'
export function generateTitle(title) {
  return i18n.global.t('msg.route.' + title)
}
export function watchSwitchLang(...cbs) {
  const appStore = useAppStore()
  watch(
    () => appStore.language,
    () => {
      cbs.forEach(cb => cb(appStore.language))
    }
  )
}
