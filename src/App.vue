<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import useAppStore from '@/store/app'
const appStore = useAppStore()
const locale = computed(() => (appStore.language === 'zh' ? zhCn : en))
</script>

<style></style>
