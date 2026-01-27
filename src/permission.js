import router from '@/router'
import useUserStore from '@/store/user'
import useAppStore from '@/store/app'
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const appStore = useAppStore()
  if (userStore.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否获取
      // 若不存在用户信息，则需要获取用户信息
      if (!userStore.hasUserInfo) {
        const { permission } = await userStore.getUserInfo()
        console.log(permission)
        // 处理用户权限，筛选出需要添加的权限
        const filterRoutes = appStore.filterRoutes(permission.menus)
        // 利用 addRoute 循环添加
        filterRoutes.forEach(item => {
          router.addRoute(item)
        })
        console.log(router.getRoutes(), 'router.getRoutes()')
        // 添加完动态路由之后，需要在进行一次主动跳转
        return next(to.path)
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
