import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { errorsRoutes } from '@/router/modules/errors'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/Index.vue')
  },
  {
    path: '/debug',
    name: 'debug',
    component: () => import('@/views/Render.vue')
  },
  /**
   * Adding Error Routes.
   */
  ...errorsRoutes
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

router.beforeEach(() => {
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 100)
})

export default router
