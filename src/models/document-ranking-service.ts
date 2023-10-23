import { Endpoints, request } from '@/api'

export type DocumentRankingServiceArgs = {
  id?: string
  startTime?: number
  status?: 'RUNNING' | 'IDLE'
}

export class DocumentRankingService {
  id?: string
  startTime?: number
  status?: 'RUNNING' | 'IDLE'

  constructor(args?: DocumentRankingServiceArgs) {
    Object.assign(this, args)
  }

  static async start() {
    await request({
      url: Endpoints.DOCUMENT_RANKING_START,
      params: {},
      body: {},
      method: 'POST'
    })
    return true
  }

  static async status() {
    const { start_time, status } = await request<{
      status: 'RUNNING' | 'IDLE'
      start_time: number
    }>({
      url: Endpoints.DOCUMENT_RANKING_STATUS,
      params: {},
      body: {},
      method: 'GET'
    })
    return {
      service: new DocumentRankingService({
        startTime: start_time,
        status
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
