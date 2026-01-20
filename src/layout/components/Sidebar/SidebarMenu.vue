<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :collapse="!appStore.sidebarOpened"
    :uniqueOpened="true"
    :background-color="userStore.cssVar.menuBg"
    :text-color="userStore.cssVar.menuText"
    :active-text-color="userStore.cssVar.menuActiveText"
    router
    :default-active="activeMenu"
  >
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { filterRoutes, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem.vue'
import useUserStore from '@/store/user'
import useAppStore from '@/store/app'
const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()
const routes = computed(() => {
  // getRoutes() 获取所有路由, 包括子集路由（二层的路由）所以要过滤掉，拿到实际的一级路由
  const filterRoute = filterRoutes(router.getRoutes())
  return generateMenus(filterRoute)
})
// 计算高亮 menu 的方法
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style lang="scss" scoped></style>
