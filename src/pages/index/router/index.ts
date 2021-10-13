import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/login',
    component: () => import('../views/login/index.vue'),
  },
  {
    path: '/about',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/temp',
    component: () => import('../views/temp/index.vue'),
  },
  {
    path: '/demo1',
    component: () => import('../views/demo1/index.vue'),
  },
  {
    path: '/form',
    component: () => import('../views/form/index.vue'),
  },
  {
    path: '/temporary',
    component: () => import('../views/temporary/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
