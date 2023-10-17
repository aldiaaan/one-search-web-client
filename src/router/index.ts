import { createRouter, createWebHistory } from 'vue-router'
import WebSearchView from '@/views/WebSearchView.vue'
import WebSearchResultView from '@/views/WebSearchResultView.vue'
import StaffLoginView from '@/views/StaffLoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'WebSearchView',
      component: WebSearchView
    },
    {
      path: '/search',
      name: 'WebSearchResultView',
      component: WebSearchResultView
    },
    {
      path: '/login',
      name: 'StaffLoginView',
      component: StaffLoginView
    }
  ]
})

export default router
