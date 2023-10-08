export const DEFAULT_PAGINATION_OPTIONS = Object.freeze({
  perPage: 10,
  currentPage: 0
})

export const ONE_API_ROOT_URL = import.meta.env.DEV
  ? 'http://localhost:5173'
  : 'https://localhost:8080'

export const Endpoints = Object.freeze({
  DOMAINS: '/api/v1.0/domains'
})
