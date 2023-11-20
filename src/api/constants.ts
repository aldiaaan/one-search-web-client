import { isDev } from '@/utils'

export const ONE_API_ROOT_URL = isDev() ? 'http://localhost:8080' : 'https://localhost:8080'

export const Endpoints = Object.freeze({
  DOMAINS: ONE_API_ROOT_URL + '/api/v1.0/domains/',
  SEARCH: ONE_API_ROOT_URL + '/api/v1.0/overall_ranking/similarity',
  WEBPAGES: ONE_API_ROOT_URL + '/api/v1.0/webpages/',
  SIGN_IN: ONE_API_ROOT_URL + '/api/v1.0/auth/login',
  USERS: ONE_API_ROOT_URL + '/api/v1.0/accounts/',
  ME: ONE_API_ROOT_URL + '/api/v1.0/accounts/me',
  DELETE_USER: ONE_API_ROOT_URL + '/api/v1.0/accounts/<id>/delete/',
  UPDATE_USER: ONE_API_ROOT_URL + '/api/v1.0/accounts/<id>/update/',
  CREATE_USER: ONE_API_ROOT_URL + '/api/v1.0/accounts/create',
  SEARCH_LOGS: ONE_API_ROOT_URL + '/api/v1.0/analytics/search_logs',
  WORDS: ONE_API_ROOT_URL + '/api/v1.0/words/',
  WORDCLOUD: ONE_API_ROOT_URL + '/api/v1.0/words/wordclouds',
  WORD_OCCURRENCES: ONE_API_ROOT_URL + '/api/v1.0/words/occurrences',
  DOCUMENT_WORD_CLOUDS: ONE_API_ROOT_URL + '/api/v1.0/words/wordclouds',
  DOCUMENT_RANKING_START: ONE_API_ROOT_URL + '/api/v1.0/document_ranking/start',
  DOCUMENT_RANKING_STOP: ONE_API_ROOT_URL + '/api/v1.0/document_ranking/stop',
  DOCUMENT_RANKING_STATUS: ONE_API_ROOT_URL + '/api/v1.0/document_ranking/status',
  MOST_SEARCHED_WORDS: ONE_API_ROOT_URL + '/api/v1.0/analytics/top_searched_words',
  CRAWLING_METRICS: ONE_API_ROOT_URL + '/api/v1.0/crawling/metrics',
  CRAWLING_STATUS: ONE_API_ROOT_URL + '/api/v1.0/crawling/status',
  CRAWLING_START: ONE_API_ROOT_URL + '/api/v1.0/crawling/start',
  CRAWLING_STOP: ONE_API_ROOT_URL + '/api/v1.0/crawling/stop',
  CRAWLING_SPECS: ONE_API_ROOT_URL + '/api/v1.0/crawling/specs',
  PAGE_RANKING_START: ONE_API_ROOT_URL + '/api/v1.0/page_ranking/start',
  PAGE_RANKING_STOP: ONE_API_ROOT_URL + '/api/v1.0/page_ranking/stop',
  PAGE_RANKING_STATUS: ONE_API_ROOT_URL + '/api/v1.0/page_ranking/status',
  PAGE_RANKING_METRICS: ONE_API_ROOT_URL + '/api/v1.0/page_ranking/metrics'
})

export const ErrorCode = Object.freeze({
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS'
})
