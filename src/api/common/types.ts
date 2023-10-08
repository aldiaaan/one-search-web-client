import type { Pagination } from '@/models'

export type PaginationOptions = {
  perPage?: number
  currentPage?: number
}

export type PaginatedResult<T> = {
  data?: T
  pagination: Pagination
}
