import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/user'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use(config => {
  config.headers.icode = 'helloqianduanxunlianying'
  const userStore = useUserStore()
  if (userStore.token) {
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
  return Promise.reject(error)
})
export default service
