import router from '@/router'
import useUserStore from '@/store/user'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  if (userStore.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否获取
      // 若不存在用户信息，则需要获取用户信息
      if (!userStore.hasUserInfo) {
        await userStore.getUserInfo()
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
