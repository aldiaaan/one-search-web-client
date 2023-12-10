import { Endpoints, request } from '@/api'
import type { CommonRequestOptions } from './types'
import { Pagination } from './pagination'
import { Webpage } from '.'

export type WordArgs = {
  value?: string
}

export class Word {
  value?: string
  id?: string

  constructor(args: WordArgs) {
    Object.assign(this, args)
  }

  static async getOccurrences(options: CommonRequestOptions & { word?: string } = {}) {
    const { page = 0, perPage = 20, query, resolves, sorts, word } = options

    const { data, pagination } = await request<{
      data: {
        description: string
        id: string | number
        tfidf_score: number
        title: string
        url: string
      }[]
      pagination: {
        total: number
        pages: number
      }
    }>({
      body: {},
      method: 'GET',
      params: {
        word
      },
      url: Endpoints.WORD_OCCURRENCES
    })

    return {
      webpages: data.map(
        (d) =>
          new Webpage({
            description: d.description,
            id: d.id as string,
            title: d.title,
            url: d.url
          })
      ),
      pagination: new Pagination({
        page,
        perPage,
        total: pagination.total,
        pages: pagination.pages
      })
    }
  }

  static async find(options: CommonRequestOptions = {}) {
    const { page = 0, perPage = 20, query, resolves, sorts } = options

    const { data, pagination } = await request<{
      data: {
        frequency: number
        id_word: number | string
        page_id: number | string
        tfidf_score: number
        word: string
      }[]
      pagination: {
        total: number
        pages: number
      }
    }>({
      method: 'GET',
      url: Endpoints.WORDS,
      body: {},
      params: {
        start: page * perPage,
        limit: perPage,
        query
      }
    })

    return {
      words: data.map((d) => ({
        value: d.word,
        id: d.id_word,
        frequency: d.frequency,
        tfidf: d.tfidf_score
      })),
      pagination: new Pagination({
        page,
        perPage,
        total: pagination.total,
        pages: pagination.pages
      })
    }
  }

  static async getMostSearchedWords(options: CommonRequestOptions = {}) {
    const { page = 0, perPage = 20, query, resolves, sorts } = options

    const { data, pagination } = await request<{
      data: { frequency: number; query: string }[]
      pagination: {
        total: number
        pages: number
      }
    }>({
      body: {},
      method: 'GET',
      params: {
        start: page * perPage,
        limit: perPage,
        query
      },
      url: Endpoints.MOST_SEARCHED_WORDS
    })

    return {
      pagination: new Pagination({
        page,
        perPage,
        total: pagination.total,
        pages: pagination.pages
      }),
      words: data.map((d) => ({ ...d, value: d.query }))
    }
  }

  static async getSearchLogs(options: CommonRequestOptions = {}) {
    const { page = 0, perPage = 20, query, resolves, sorts } = options

    const { data, pagination } = await request<{
      data: { id: string; ip: string; ua: string; query: string; created_at: string }[]
      pagination: {
        total: number
        pages: number
      }
    }>({
      body: {},
      method: 'GET',
      params: {
        start: page * perPage,
        limit: perPage,
        query
      },
      url: Endpoints.SEARCH_LOGS
    })

    return {
      pagination: new Pagination({
        page,
        perPage,
        total: pagination.total,
        pages: pagination.pages
      }),
      words: data.map((d) => ({ ...d, value: d.query, date: d.created_at }))
    }
  }
}
