import { Endpoints, request } from '@/api'
import { DEFAULT_REQUEST_OPTIONS } from './constants'
import type { CommonRequestOptions } from './types'
import { Pagination } from '.'
import { Facet } from './facet'

export type DomainArgs = {
  name?: string
  id?: string
  country?: string
  image?: string
  totalPages?: number
}

export class Domain {
  constructor(args: DomainArgs) {
    Object.assign(this, args)
  }

  name?: string
  id?: string
  country?: string = 'UNKNOWN'
  image?: string
  totalPages?: number = 0

  static async find(options: CommonRequestOptions<'totalPages', ''> = {}) {
    const { page = 0, perPage = 10, query = '', sorts = { totalPages: 'DESC' } } = options

    const { data, pagination } = await request<{
      data: {
        country: string
        name: string
        total_pages: number
      }[]
     
      pagination: {
        current_page: number
        pages: number
        total: number
      }
    }>({
      url: Endpoints.DOMAINS,
      body: {},
      method: 'GET',
      params: {
        query,
        limit: perPage,
        start: page * perPage,
        sort_total_pages: sorts.totalPages
      }
    })

    return {
      pagination: new Pagination({
        page: pagination.current_page,
        pages: pagination.pages,
        perPage: perPage,
        total: pagination.total
      }),     
      domains: data.map(
        (d) =>
          new Domain({
            name: d.name,
            country: d.country,
            totalPages: d.total_pages || 0
          })
      )
    }
  }
}
