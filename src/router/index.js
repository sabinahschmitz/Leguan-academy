import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PrivacyPolicyViewVue from '@/views/PrivacyPolicyView.vue'
import KeyboardViewVue from '@/views/KeyboardView.vue'
import TreasureHuntViewVue from '@/views/TreasureHuntView.vue'
import CrocsLunchViewVue from '@/views/CrocsLunchView.vue'


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
  },
  {
    path: '/crocoslunch',
    name: 'crocoslunch',
    component: CrocsLunchViewVue
  },
  {
    path: '/privacy',
    name:'privacy',
    component: PrivacyPolicyViewVue
  },
  {
    path: '/opensource',
    name: 'OpenSource',
    beforeEnter: (to, from, next) => {
      window.location.href = 'https://github.com/sabinahschmitz/Leguan-academy/';
    }
  },
  ]
})

export default router
