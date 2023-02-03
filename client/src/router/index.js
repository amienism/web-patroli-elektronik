import {
  createRouter,
  createWebHistory
} from 'vue-router'
import authRouter from './auth'
import appRouter from './app'
import adminRouter from './admin'
import store from '@/store'
import axios from 'axios'

const routes = [{
    path: '/',
    name: 'welcome-page',
    component: () => import('@/pages/welcome.vue')
  },
  ...authRouter,
  ...appRouter,
  ...adminRouter,
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  store.commit('SET_LOADER', true);

  if (to.path.includes("/auth/") || to.path == "/") {
    next();
    return;
}

  try {
    const {data: {data:{token, user}}} = await axios.get("/auth/validate");
    localStorage.setItem('token', token);
    store.commit('SET_USER', user);
    if(to.path === '/app' && user.role === 'admin'){
      next({path: '/admin/dashboard'})
      return;
    }
    next();
  } catch (error) {
    next({
      path: '/auth/login'
    });
  }
  
})

router.afterEach((to, from, next) => {
  store.commit('SET_LOADER', false)

})

export default router