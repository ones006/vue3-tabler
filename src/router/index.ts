import { createRouter, createWebHistory } from 'vue-router'
import ShowcaseView from '../views/ShowcaseView.vue'
import LayoutShowcaseView from '../views/LayoutShowcaseView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'showcase',
      component: ShowcaseView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/layouts',
      name: 'layouts',
      component: LayoutShowcaseView
    }
  ]
})

export default router
