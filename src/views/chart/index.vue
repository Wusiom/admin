<template>
  <div class="chart-container">
    <div class="chart-section">
      <trend-vue></trend-vue>
    </div>
    <el-row class="chart-row" :gutter="20">
      <el-col :xs="24" :sm="24" :md="16" :lg="16">
        <div class="chart-card">
          <horizontal-bar-vue></horizontal-bar-vue>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8">
        <div class="chart-card">
          <calendar-vue></calendar-vue>
        </div>
      </el-col>
    </el-row>
    <el-row class="chart-row" :gutter="20">
      <el-col :xs="24" :sm="24" :md="6" :lg="6">
        <div class="chart-map-left">
          <div class="chart-card">
            <pie-vue></pie-vue>
          </div>
          <div class="chart-card chart-card--spaced">
            <word-cloud-vue></word-cloud-vue>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="18" :lg="18">
        <div class="chart-card">
          <b-map-vue></b-map-vue>
        </div>
      </el-col>
    </el-row>
    <div class="chart-section">
      <table-sheet-vue></table-sheet-vue>
    </div>
  </div>
</template>
<script setup>
import TrendVue from './components/trend/index.vue'
import horizontalBarVue from './components/horizontal-bar/index.vue'
import calendarVue from './components/calendar/index.vue'
import pieVue from './components/pie/index.vue'
import wordCloudVue from './components/word-cloud/index.vue'
import bMapVue from './components/b-map/index.vue'
import tableSheetVue from './components/table-sheet/index.vue'
</script>
<style lang="scss" scoped>
.chart-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100%;
  box-sizing: border-box;
}

.chart-section {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.chart-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  :deep(.el-col) {
    margin-bottom: 20px;

    @media (min-width: 768px) {
      margin-bottom: 0;
    }
  }
}

.chart-card {
  background: #fff;
  // border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: 100%;

  &--spaced {
    margin-top: 20px;
  }
}

.chart-map-left {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
