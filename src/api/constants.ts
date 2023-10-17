import { isDev } from '@/utils'

export const ONE_API_ROOT_URL = isDev() ? 'http://localhost:8080' : 'https://localhost:8080'

export const Endpoints = Object.freeze({
  DOMAINS: ONE_API_ROOT_URL + '/api/v1.0/domains/xx',
  SEARCH: ONE_API_ROOT_URL + '/api/v1.0/overall_ranking/similarity',
  WEBPAGES: ONE_API_ROOT_URL + '/api/v1.0/webpages',
  SIGN_IN: ONE_API_ROOT_URL + '/api/v1.0/auth/login'
})
