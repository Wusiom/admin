<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import useAppStore from '@/store/app'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'
import { watchSwitchLang } from '@/utils/i18n'
import useUserStore from '@/store/user'
import router from '@/router'
const userStore = useUserStore()
const appStore = useAppStore()
const locale = computed(() => (appStore.language === 'zh' ? zhCn : en))
generateNewStyle(appStore.mainColor).then((newStyleText) => {
  writeNewStyle(newStyleText)
})
watchSwitchLang(() => {
  if (userStore.token) {
    userStore.getUserInfo()
  }
})
onMounted(() => {
  console.log(router.getRoutes(), 'router')
})
</script>

<style></style>
