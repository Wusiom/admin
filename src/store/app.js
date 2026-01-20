import { defineStore } from 'pinia'
import { getItem, setItem } from '@/utils/storage'
export default defineStore('app', {
  state: () => ({
    sidebarOpened: true,
    language: getItem('LANG') || 'zh'
  }),
  actions: {
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened
    },
    setLanguage(language) {
      this.language = language
      setItem('LANG', language)
    }
  }
})
