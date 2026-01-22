import { defineStore } from 'pinia'
import { getItem, setItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR, TAGS_VIEW } from '@/constant'
import variables from '@/styles/variables.module.scss'
import { generateColors } from '@/utils/theme'
export default defineStore('app', {
  state: () => ({
    sidebarOpened: true,
    language: getItem('LANG') || 'zh',
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variables: variables,
    tagsViewList: getItem(TAGS_VIEW) || []
  }),
  getters: {
    cssVar: (state) => {
      return {
        ...state.variables,
        ...generateColors(state.mainColor)
      }
    }
  },
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
      this.variables.menuBg = color
    },
    addTagsViewList(tag) {
      const isFind = this.tagsViewList.find(item => {
        return item.path === tag.path
      })
      // 处理重复
      if (!isFind) {
        this.tagsViewList.push(tag)
        setItem(TAGS_VIEW, this.tagsViewList)
      }
    },
    /**
    * 为指定的 tag 修改 title
    */
    changeTagsView({ index, tag }) {
      this.tagsViewList[index] = tag
      setItem(TAGS_VIEW, this.tagsViewList)
    }
  }
})
