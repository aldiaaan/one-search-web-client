import { Endpoints, request } from '@/api'

export type DocumentRankingServiceArgs = {
  id?: string
  startTime?: number
  status?: 'RUNNING' | 'IDLE'

  algorithm?: 'tfidf' | 'inverted-index'
}

export class DocumentRankingService {
  id?: string
  startTime?: number
  status?: 'RUNNING' | 'IDLE'
  algorithm?: 'tfidf' | 'inverted-index'

  constructor(args?: DocumentRankingServiceArgs) {
    Object.assign(this, args)
  }

  static async start(options: { algorithm?: string; useGST?: string } = {}) {
    const { algorithm = 'tfidf', useGST = false } = options

    await request({
      url: Endpoints.DOCUMENT_RANKING_START,
      params: {
        algorithm,
        use_gst: useGST
      },
      body: {},
      method: 'POST'
    })
    return true
  }

  static async status() {
    const { start_time, status, algorithm } = await request<{
      status: 'RUNNING' | 'IDLE'
      start_time: number
      algorithm: 'tfidf' | 'inverted-index'
    }>({
      url: Endpoints.DOCUMENT_RANKING_STATUS,
      params: {},
      body: {},
      method: 'GET'
    })
    return {
      service: new DocumentRankingService({
        startTime: start_time,
        status,
        algorithm
      })
    }
  }

  static async stop() {
    await request({
      url: Endpoints.DOCUMENT_RANKING_STOP,
      params: {},
      body: {},
      method: 'POST'
    })
    return true
  }
}
