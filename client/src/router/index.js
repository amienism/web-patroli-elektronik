import { createRouter, createWebHistory } from 'vue-router'
import authRouter from './auth'
import appRouter from './app'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'welcome-page',
    component: () => import('@/pages/welcome.vue')
  },
  ...authRouter,
  ...appRouter
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('SET_LOADER', true);
  next();
})

router.afterEach((to, from, next) => {
  store.commit('SET_LOADER', false)
  
})

export default router
