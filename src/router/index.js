import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import KeyboardViewVue from '@/views/KeyboardView.vue'
import TreasureHuntViewVue from '@/views/TreasureHuntView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
  {
    path: '/keyboard',
    name: 'keyboard',
    component: KeyboardViewVue
  },
  {
    path: '/treasurehunt',
    name: 'treasurehunt',
    component: TreasureHuntViewVue
  }
  ]
})

export default router
