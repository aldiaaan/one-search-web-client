import { Endpoints, request } from '@/api'

export type PageRankingServiceArgs = {
  iteration: number
  maxIterations: number
  startTime: number
  status?: 'IDLE' | 'RUNNING'
}

export class PageRankingService {
  iteration?: number = 0
  maxIterations?: number = 0
  startTime?: number = 0
  status?: 'IDLE' | 'RUNNING' = 'IDLE'

  constructor(args: PageRankingServiceArgs) {
    Object.assign(this, args)
  }

  static async metrics() {
    const {
      size: fileSize,
      total_linking: totalLinking,
      total_nodes: totalNodes
    } = await request<{ size: number; total_linking: number; total_nodes: number }>({
      url: Endpoints.PAGE_RANKING_METRICS
    })

    return {
      fileSize,
      totalLinking,
      totalNodes,
      vectorSize: 1
    }
  }

  static async status() {
    const {
      iteration: iteration,
      max_iterations: maxIterations,
      start_time: startTime,
      status
    } = await request<{
      max_iterations: number
      iteration: number
      start_time: number
      status: 'IDLE' | 'RUNNING'
    }>({
      method: 'GET',
      url: Endpoints.PAGE_RANKING_STATUS
    })

    return new PageRankingService({
      iteration,
      maxIterations,
      startTime,
      status
    })
  }

  static async start(options: { iterations?: number; dampingFactor?: number } = {}) {
    const { iterations = 20, dampingFactor = 0.8 } = options
    await request({
      url: Endpoints.PAGE_RANKING_START,
      method: 'POST',
      params: {
        max_iterations: iterations,
        damping_factor: dampingFactor
      }
    })
  }

  static async stop() {
    await request({
      url: Endpoints.PAGE_RANKING_STOP,
      method: 'POST'
    })
  }
}
