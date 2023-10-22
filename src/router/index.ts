import { createRouter, createWebHistory } from 'vue-router'
import WebSearchView from '@/views/WebSearchView.vue'
import WebSearchResultView from '@/views/WebSearchResultView.vue'
import StaffLoginView from '@/views/StaffLoginView.vue'
import DashboardView from '@/views/dashboard/DashboardView.vue'
import DashboardStaffListView from '@/views/dashboard/staff/StaffListView.vue'
import AddStaffView from '@/views/dashboard/staff/AddStaffView.vue'
import DocumentRankingView from '@/views/dashboard/document-ranking/DocumentRankingView.vue'
import DocumentRankingOverviewView from '@/views/dashboard/document-ranking/DocumentRankingOverviewView.vue'
import DocumentRankingSearchLogs from '@/views/dashboard/document-ranking/DocumentRankingSearchLogs.vue'
import DocumentRankingDocumentsView from '@/views/dashboard/document-ranking/DocumentRankingDocumentsView.vue'
import DocumentRankingWordsView from '@/views/dashboard/document-ranking/DocumentRankingWordsView.vue'

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
    },
    {
      path: '/dashboard',
      name: 'DashbaordView',
      component: DashboardView,
      children: [
        {
          path: '/dashboard/services/document-ranking',
          name: 'DocumentRanking',
          redirect: '/dashboard/services/document-ranking/overview',
          component: DocumentRankingView,
          children: [
            {
              component: DocumentRankingOverviewView,
              name: 'DocumentRankingOverviewView',
              path: '/dashboard/services/document-ranking/overview'
            },
            {
              component: DocumentRankingSearchLogs,
              name: 'DocumentRankingSearchLogs',
              path: '/dashboard/services/document-ranking/search-logs'
            },
            {
              component: DocumentRankingDocumentsView,
              name: 'DocumentRankingDocumentsView',
              path: '/dashboard/services/document-ranking/documents'
            },
            {
              component: DocumentRankingWordsView,
              name: 'DocumentRankingWordsView',
              path: '/dashboard/services/document-ranking/words'
            }
          ]
        },
        {
          path: '/dashboard/staff',
          name: 'DashboardStaffListView',
          component: DashboardStaffListView
        },
        {
          path: '/dashboard/staff/add',
          name: 'AddStaffView',
          component: AddStaffView
        }
      ]
    }
  ]
})

export default router
