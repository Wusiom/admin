import { defineStore } from 'pinia'
import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
export default defineStore('user', {
  state: () => ({
    userInfo: {},
    token: getItem(TOKEN) || ''
  }),
  getters: {
    hasUserInfo: (state) => {
      return JSON.stringify(state.userInfo) !== '{}'
    }
  },
  actions: {
    login(userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username, password: md5(password) }).then(res => {
          this.setToken(res.token)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    setToken(token) {
      this.token = token
      setItem(TOKEN, token)
    },
    async getUserInfo() {
      const res = await getUserInfo()
      console.log(res, 123)
      this.userInfo = res.data
    }
  }
})
