import { defineStore } from 'pinia'
import { getItem, setItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
export default defineStore('app', {
  state: () => ({
    sidebarOpened: true,
    language: getItem('LANG') || 'zh',
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR
  }),
  actions: {
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    },
    setLanguage(language) {
      this.language = language
      setItem('LANG', language)
    },
    setMainColor(color) {
      this.mainColor = color
      setItem(MAIN_COLOR, color)
    }
  }
})
