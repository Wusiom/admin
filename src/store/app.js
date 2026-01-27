import { defineStore } from 'pinia'
import { getItem, setItem } from '@/utils/storage'
import { MAIN_COLOR, DEFAULT_COLOR, TAGS_VIEW } from '@/constant'
import variables from '@/styles/variables.module.scss'
import { generateColors } from '@/utils/theme'
import { publicRoutes, asyncRoutes } from '@/router'
export default defineStore('app', {
  state: () => ({
    sidebarOpened: true,
    language: getItem('LANG') || 'zh',
    mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
    variables: variables,
    tagsViewList: getItem(TAGS_VIEW) || [],
    routes: publicRoutes
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
    },
    /**
     * 删除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTagsView(payload) {
      if (payload.type === 'index') {
        this.tagsViewList.splice(payload.index, 1)
        return
      } else if (payload.type === 'other') {
        this.tagsViewList.splice(
          payload.index + 1,
          this.tagsViewList.length - payload.index + 1
        )
        this.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        this.tagsViewList.splice(
          payload.index + 1,
          this.tagsViewList.length - payload.index + 1
        )
      }
      setItem(TAGS_VIEW, this.tagsViewList)
    },

    /**
     * 增加路由
     */
    setRoutes(newRoutes) {
      // 永远在静态路由的基础上增加新路由
      this.routes = [...publicRoutes, ...newRoutes]
    },

    /**
     * 根据权限筛选路由
     */
    filterRoutes(menus) {
      const routes = []
      // 路由权限匹配
      menus.forEach((key) => {
        // 权限名 与 路由的 name 匹配
        routes.push(...asyncRoutes.filter(item => item.name === key))
      })
      // 最后添加 不匹配路由进入 404
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      this.setRoutes(routes)
      return routes
    }
  }
})
