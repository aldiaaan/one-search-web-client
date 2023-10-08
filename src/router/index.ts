import { createRouter, createWebHistory } from 'vue-router'
import WebSearchView from '@/views/WebSearchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'webSearchView',
      component: WebSearchView
    }
  ]
})

export default router
