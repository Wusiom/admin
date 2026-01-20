import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'
import { setItem, getItem } from '@/utils/storage'

// 获取时间戳
export const getTimeStamp = () => {
  return getItem(TIME_STAMP)
}
// 设置时间戳
export const setTimeStamp = () => {
  setItem(TIME_STAMP, Date.now())
}
// 是否超时
export const isTimeout = () => {
  const timeStamp = getTimeStamp()
  const currentTime = Date.now()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
