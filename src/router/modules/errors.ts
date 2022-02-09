import { RouteRecordRaw } from 'vue-router'

export const errorsRoutes: RouteRecordRaw[] = [
  {
    name: 'error.internal',
    path: '/error',
    component: () => import('@/views/Error/400.vue')
  },
  {
    name: 'error.not-found',
    path: '/error/not-found',
    component: () => import('@/views/Error/404.vue'),
    props: true
  }
]
