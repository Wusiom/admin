import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: () => import('../layout/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
