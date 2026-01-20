import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/user'
import { isTimeout } from '@/utils/auth'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use(config => {
  config.headers.icode = 'helloqianduanxunlianying'
  const userStore = useUserStore()
  if (userStore.token) {
    if (isTimeout()) {
      userStore.logout()
      return Promise.reject(new Error('Token has expired'))
    }
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  const { data, message, success } = response.data
  if (success) {
    return data
  } else {
    ElMessage.error(message)
    return Promise.reject(new Error(message))
  }
}, error => {
  const userStore = useUserStore()

  // 处理 token 超时问题
  if (
    error.response &&
    error.response.data &&
    error.response.data.code === 401
  ) {
    // token超时
    userStore.logout()
  }
  ElMessage.error(error.message) // 提示错误信息
  return Promise.reject(error)
})
export default service
