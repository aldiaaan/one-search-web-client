import type { Domain } from '@/models'
import { DEFAULT_PAGINATION_OPTIONS, Endpoints } from './common/constants'
import type { PaginatedResult, PaginationOptions } from './common/types'
import request from './common/utils'

export async function fetchDomains(
  options: PaginationOptions = { ...DEFAULT_PAGINATION_OPTIONS }
): Promise<PaginatedResult<Domain[]>> {
  try {
    const response = await request<{
      data: {
        id: string
        name: string
        image: string
        ranking: {
          previous?: number
          current?: number
        }
      }[]
      pagination: {
        total: number
        per_page: number
        current_page: number
        last_page: number
        previous_page: number
        next_page: number
      }
    }>({
      url: Endpoints.DOMAINS,
      method: 'GET',
      params: options
    })

    return {
      data: response.data.map((d) => ({
        id: d.id,
        domain: d.name,
        image: d.image,
        ranking: d.ranking,
        name: d.name
      })),
      pagination: {
        currentPage: response.pagination.current_page,
        hasNextPage: Boolean(response.pagination.next_page),
        lastPage: response.pagination.last_page,
        hasPreviousPage: Boolean(response.pagination.previous_page),
        total: response.pagination.total,
        perPage: response.pagination.total
      }
    }
  } catch (err) {
    throw new Error((err as Error).message)
  }
}
