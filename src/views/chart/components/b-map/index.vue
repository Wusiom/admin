<template>
  <el-card class="container">
    <div class="title">{{ $t('msg.chart.bmapChartTitle') }}</div>
    <div class="box" ref="target"></div>
  </el-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
// 导入 bmap 模块
import 'echarts/extension/bmap/bmap.js'
import { getChartMap } from '@/api/chart'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const chartData = ref({})
const getChartData = async () => {
  const res = await getChartMap()
  chartData.value = res
  // 渲染图表
  renderBMap()
}
getChartData()

// 数据转换
const convertData = (data) => {
  const res = []
  data.forEach((item) => {
    const geoCoord = chartData.value.geoCoordMap[item.name]
    if (geoCoord) {
      res.push({
        name: item.name,
        value: [geoCoord[0], geoCoord[1], item.value]
      })
    }
  })
  console.log(res, 'res')
  return res
}
const target = ref(null)
let mChart
onMounted(() => {
  mChart = echarts.init(target.value)
})
/**
 * 渲染地图数据
 */
const renderBMap = () => {
  const options = {
    tooltip: {
      trigger: 'item'
    },
    // 地图配置
    bmap: {
      // 中心点
      center: [109.114129, 36.550339],
      // 缩放级别
      zoom: 5,
      // 是否可拖动
      roam: true
    },
    series: [
      {
        name: `营收（${i18n.t('msg.chart.unit')}）`,
        // 散点图
        type: 'scatter',
        // 使用的表坐标
        coordinateSystem: 'bmap',
        // 数据源
        data: convertData(chartData.value.data),
        // 散点的大小
        symbolSize: function (val) {
          return val[2] / 10
        },
        // 数据使用下标为2的值（item.value[2]）
        encode: {
          value: 2
        },
        // 鼠标移入时，高亮的标签样式
        emphasis: {
          label: {
            // 鼠标移入时，显示高亮
            show: true
          }
        },
        // 散点色值
        color: '#15803d'
      },
      {
        name: `营收 TOP 5（${i18n.t('msg.chart.unit')}）`,
        // 包含涟漪特效动画的散点的散点图
        type: 'effectScatter',
        // 使用的表坐标
        coordinateSystem: 'bmap',
        // 数据源（top 5）
        data: convertData(
          chartData.value.data
            .sort(function (a, b) {
              return b.value - a.value
            })
            .slice(0, 6)
        ),
        // 散点的大小
        symbolSize: function (val) {
          return val[2] / 10
        },
        // 数据使用下标为2的值（item.value[2]）
        encode: {
          value: 2
        },
        // 涟漪特效
        rippleEffect: {
          // stroke 类型的波纹
          brushType: 'stroke'
        },
        // 显示地名
        label: {
          formatter: '{b}',
          position: 'right',
          show: true
        },
        // 散点层级
        zlevel: 2,
        // 散点色值
        color: '#166534'
      }
    ]
  }

  mChart.setOption(options)
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  .title {
    position: absolute;
    top: 28px;
    margin-left: 50%;
    transform: translateX(-50%);
    color: #333;
    font-size: 22px;
    font-weight: bold;
    z-index: 9;
  }
  .box {
    height: 462px;
  }
}
</style>
