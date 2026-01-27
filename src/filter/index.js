import dayjs from 'dayjs'
import rt from 'dayjs/plugin/relativeTime'
import useAppStore from '@/store/app'
import 'dayjs/locale/zh-cn'
// 加载相对时间插件
dayjs.extend(rt)
export const dateFilter = (value, format = 'YYYY-MM-DD') => {
  if (!isNaN(value)) {
    value = parseInt(value)
  }
  return dayjs(value).format(format)
}

function relativeTime(val) {
  const appStore = useAppStore()
  console.log(appStore.language, 'appStore.language')
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return dayjs().locale(appStore.language === 'zh' ? 'zh-cn' : 'en').to(dayjs(val))
}
export default app => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}
