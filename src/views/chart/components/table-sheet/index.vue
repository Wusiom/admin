<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <s2Vue :data="sheetData"></s2Vue>
    </el-col>
    <el-col :span="6">
      <sheetLabelVue
        v-for="(item, index) in regionsData"
        :key="item.id"
        class="mb-20"
        :isSelected="index === selectedRegionIndex"
        @click="onChangeRegion(index)"
        :data="item"
      ></sheetLabelVue>
    </el-col>
  </el-row>
</template>

<script setup>
import sheetLabelVue from './components/sheet-label.vue'
import s2Vue from './components/s2.vue'
import { getChartRegions, getChartSheet } from '@/api/chart'
import { ref } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
const regionsData = ref([])
const getRegions = async () => {
  const res = await getChartRegions()
  regionsData.value = res.regions
  getSheetData(regionsData.value[0].id)
}
getRegions()
watchSwitchLang(getRegions)
const selectedRegionIndex = ref(null)
const onChangeRegion = (index) => {
  selectedRegionIndex.value = index
  getSheetData(regionsData.value[index].id)
}
const sheetData = ref([])
const getSheetData = async (id) => {
  const res = await getChartSheet(id)
  sheetData.value = res
}
getSheetData()
// watch(selectedRegionIndex, getSheetData)
</script>

<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 20px;
}
</style>
