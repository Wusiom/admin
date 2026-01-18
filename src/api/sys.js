import request from '@/utils/request'

export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export const getUserInfo = () => {
  return request({
    url: '/sys/profile'
  })
}
