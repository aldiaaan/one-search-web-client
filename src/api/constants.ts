import { isDev } from '@/utils'

export const ONE_API_ROOT_URL = isDev() ? 'http://localhost:8080' : 'https://localhost:8080'

export const Endpoints = Object.freeze({
  DOMAINS: ONE_API_ROOT_URL + '/api/v1.0/domains',
  SEARCH: ONE_API_ROOT_URL + '/api/v1.0/overall_ranking/similarity',
  WEBPAGES: ONE_API_ROOT_URL + '/api/v1.0/webpages/',
  SIGN_IN: ONE_API_ROOT_URL + '/api/v1.0/auth/login',
  USERS: ONE_API_ROOT_URL + '/api/v1.0/accounts/',
  DELETE_USER: ONE_API_ROOT_URL + '/api/v1.0/accounts/<id>/delete/',
  CREATE_USER: ONE_API_ROOT_URL + '/api/v1.0/accounts/create',
  SEARCH_LOGS: ONE_API_ROOT_URL + '/api/v1.0/analytics/search_logs',
  WORDS: ONE_API_ROOT_URL + '/api/v1.0/words/',
  WORDCLOUD: ONE_API_ROOT_URL + '/api/v1.0/words/wordclouds',
  MOST_SEARCHED_WORDS: ONE_API_ROOT_URL + '/api/v1.0/analytics/top_searched_words'
})
