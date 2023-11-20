import { Endpoints, request } from '@/api'
import type { CommonRequestOptions } from './types'
import { NotFoundException } from '@/exceptions'
import { Pagination } from '.'
import { Facet } from './facet'
import { getCountryDetailsByCode } from '@/utils'

export type WebpageArgs = {
  id?: string
  pagerankScore?: number
  similarityScore?: number
  tfidfScore?: number
  url?: string
  title?: string
  description?: string
  content?: string
  webpage?: string
  country?: string
}

export class Webpage {
  id?: string
  content?: string
  pagerankScore?: number
  similarityScore?: number
  tfidfScore?: number
  url?: string
  title?: string
  description?: string
  image?: string
  country?: string

  constructor(args?: WebpageArgs) {
    Object.assign(this, args)
  }

  static async find(options: CommonRequestOptions<'pagerank'> = {}) {
    const { query = '', perPage = 20, page = 0, sorts = { pagerank: 'DESC' } } = options

    const { data, pagination, facets } = await request<{
      data: {
        keywords: string[]
        pagerank_score: number
        title: string
        total_words: number
        url: string
        id: string
        country: string
      }[]
      facets: {
        countries: {
          value: string | number
          total: number
        }[]
      }
      pagination: {
        current_page: number
        pages: number
        total: number
      }
    }>({
      method: 'GET',
      url: Endpoints.WEBPAGES,
      params: {
        query: query,
        limit: perPage,
        start: page * perPage,
        sort_pagerank_score: sorts?.pagerank
      }
    })

    return {
      facets: {
        countries: facets.countries.map(
          (c) =>
            new Facet({
              ...c,
              label: getCountryDetailsByCode(c.value as string)?.name || 'Unknown'
            })
        )
      },
      webpages: data.map(
        (d) =>
          new Webpage({
            url: d.url,
            title: d.title,
            id: d.id,
            pagerankScore: d.pagerank_score,
            country: d.country
          })
      ),
      pagination: new Pagination({
        page,
        pages: pagination.pages,
        total: pagination.total,
        perPage
      })
    }
  }

  static async overallSimilaritySearch(options: CommonRequestOptions = {}) {
    const { page = 0, perPage = 10, query = '' } = options

    const result = await request<{
      message: string
      ok: boolean
      pagination: { pages: number; per_page: number; total: number }
      data: {
        id_page: string
        pagerank_score: number
        similarity_score: number
        tfidf_total: number
        url: string
        description: string
        content_text: string
        title: string
      }[]
    }>({
      url: Endpoints.SEARCH,
      method: 'GET',
      params: {
        length: perPage,
        start: perPage * page,
        keyword: query
      }
    })

    if (!result.ok) throw new NotFoundException(result.message)

    return {
      pagination: new Pagination({
        page,
        pages: result.pagination.pages,
        perPage,
        total: result.pagination.total
      }),
      webpages: result.data.map(
        (d) =>
          new Webpage({
            title: d.title,
            description: d.description,
            id: d.id_page,
            pagerankScore: d.pagerank_score,
            tfidfScore: d.tfidf_total,
            similarityScore: d.similarity_score,
            url: d.url,
            content: d.content_text
          })
      )
    }
  }
}
