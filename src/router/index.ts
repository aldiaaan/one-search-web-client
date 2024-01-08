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
import DocumentDetailView from '@/views/dashboard/DocumentDetailView.vue'
import WordDetailView from '@/views/dashboard/WordDetailView.vue'
import CrawlingDocumentsView from '@/views/dashboard/crawling/CrawlingDocumentsView.vue'
import CrawlingDomainsView from '@/views/dashboard/crawling/CrawlingDomainsView.vue'
import CrawlingOverviewView from '@/views/dashboard/crawling/CrawlingOverviewView.vue'
import CrawlingView from '@/views/dashboard/crawling/CrawlingView.vue'
import PageRankingView from '@/views/dashboard/page-ranking/PageRankingView.vue'
import PageRankingSettingsView from '@/views/dashboard/page-ranking/PageRankingSettingsView.vue'
import PageRankingOverviewView from '@/views/dashboard/page-ranking/PageRankingOverviewView.vue'
import PageRankingDocumentsView from '@/views/dashboard/page-ranking/PageRankingDocumentsView.vue'
import EditProfileView from '@/views/dashboard/EditProfileView.vue'
import Sitemap3DView from '@/views/Sitemap3DView.vue'
import DashboardOverviewView from '@/views/dashboard/DashboardOverview.vue'
import DocumentListView from '@/views/dashboard/DocumentListView.vue'

const prefix = `${
  import.meta.env.VITE_WEB_CLIENT_URL_PREFIX && '/' + import.meta.env.VITE_WEB_CLIENT_URL_PREFIX
}`

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: prefix + '/',
      name: 'WebSearchView',
      component: WebSearchView
    },
    {
      path: prefix + '/sitemap/3d',
      component: Sitemap3DView,
      name: 'Sitemap3DView'
    },
    {
      path: prefix + '/search',
      name: 'WebSearchResultView',
      component: WebSearchResultView
    },
    {
      path: prefix + '/login',
      name: 'StaffLoginView',
      component: StaffLoginView
    },
    {
      path: prefix + '/dashboard',
      name: 'DashboardView',
      component: DashboardView,
      redirect: prefix + '/dashboard/overview',
      children: [
        {
          path: prefix + '/dashboard/overview',
          component: DashboardOverviewView,
          name: 'DashboardOverviewView'
        },
        {
          path: prefix + '/dashboard/documents/list',
          component: DocumentListView,
          name: 'DocumentListView'
        },
        {
          path: prefix + '/dashboard/profile/edit',
          component: EditProfileView,
          name: 'EditProfileView'
        },
        {
          path: prefix + '/dashboard/documents',
          component: DocumentDetailView,
          name: 'DocumentDetailView'
        },
        {
          path: prefix + '/dashboard/words',
          component: WordDetailView,
          name: 'WordDetailView'
        },
        {
          path: prefix + '/dashboard/services/crawling',
          name: 'CrawlingView',
          redirect: prefix + '/dashboard/services/crawling/overview',
          component: CrawlingView,
          children: [
            {
              path: prefix + '/dashboard/services/crawling/overview',
              component: CrawlingOverviewView,
              name: 'CrawlingOverviewView'
            },
            {
              path: prefix + '/dashboard/services/crawling/domains',
              component: CrawlingDomainsView,
              name: 'CrawlingDomainsView'
            },
            {
              path: prefix + '/dashboard/services/crawling/documents',
              component: CrawlingDocumentsView,
              name: 'CrawlingDocumentsView'
            }
          ]
        },
        {
          path: prefix + '/dashboard/services/page-ranking',
          name: 'PageRankingView',
          redirect: prefix + '/dashboard/services/page-ranking/overview',
          component: PageRankingView,
          children: [
            {
              path: prefix + '/dashboard/services/page-ranking/overview',
              component: PageRankingOverviewView,
              name: 'PageRankingOverviewView'
            },
            {
              path: prefix + '/dashboard/services/page-ranking/documents',
              component: PageRankingDocumentsView,
              name: 'PageRankingDocumentsView'
            },
            {
              path: prefix + '/dashboard/services/page-ranking/settings',
              component: PageRankingSettingsView,
              name: 'PageRankingSettingsView'
            }
          ]
        },
        {
          path: prefix + '/dashboard/services/document-ranking',
          name: 'DocumentRankingView',
          redirect: prefix + '/dashboard/services/document-ranking/overview',
          component: DocumentRankingView,
          children: [
            {
              component: DocumentRankingOverviewView,
              name: 'DocumentRankingOverviewView',
              path: prefix + '/dashboard/services/document-ranking/overview'
            },
            {
              component: DocumentRankingSearchLogs,
              name: 'DocumentRankingSearchLogsView',
              path: prefix + '/dashboard/services/document-ranking/search-logs'
            },
            {
              component: DocumentRankingDocumentsView,
              name: 'DocumentRankingDocumentsView',
              path: prefix + '/dashboard/services/document-ranking/documents'
            },
            {
              component: DocumentRankingWordsView,
              name: 'DocumentRankingWordsView',
              path: prefix + '/dashboard/services/document-ranking/words'
            }
          ]
        },
        {
          path: prefix + '/dashboard/staff',
          name: 'DashboardStaffListView',
          component: DashboardStaffListView
        },
        {
          path: prefix + '/dashboard/staff/add',
          name: 'AddStaffView',
          component: AddStaffView
        }
      ]
    }
  ]
})

export default router
