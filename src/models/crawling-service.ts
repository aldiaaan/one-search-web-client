import { Endpoints, request } from '@/api'

export type CrawlingServiceArgs = {
  id?: string
  startTime?: number
  status?: 'RUNNING' | 'IDLE'
  duration?: number
  threads?: number
}

export class CrawlingService {
  id?: string
  startTime?: number
  status?: 'RUNNING' | 'IDLE'
  duration?: number
  threads?: number

  constructor(args?: CrawlingServiceArgs) {
    Object.assign(this, args)
  }

  static async getAvaiableCPUs() {
    const { available_cpus } = await request<{ available_cpus: number }>({
      url: Endpoints.CRAWLING_SPECS,
      method: 'GET',
      params: {},
      body: {}
    })

    return available_cpus
  }

  static async start(options: Pick<CrawlingServiceArgs, 'duration' | 'threads'>) {
    await request({
      url: Endpoints.CRAWLING_START,
      params: {
        threads: options.threads || 8,
        duration: options.duration || 300
      },
      body: {},
      method: 'GET'
    })
    return true
  }

  static async metrics() {
    const metrics = await request<{
      domains_stats: { [key in string]: string[] }
      total_domains: number
      total_webpages: number
      total_webpages_size: number
    }>({
      url: Endpoints.CRAWLING_METRICS,
      params: {},
      body: {},
      method: 'GET'
    })
    return {
      domainsStats: metrics.domains_stats,
      totalDomains: metrics.total_domains,
      totalWebpages: metrics.total_webpages,
      totalWebpagesSize: metrics.total_webpages_size
    }
  }

  static async status() {
    const { start_time, status, duration, threads } = await request<{
      status: 'RUNNING' | 'IDLE'
      start_time: number
      threads: number
      duration: number
    }>({
      url: Endpoints.CRAWLING_STATUS,
      params: {},
      body: {},
      method: 'GET'
    })
    return {
      service: new CrawlingService({
        startTime: start_time,
        status,
        threads,
        duration
      })
    }
  }

  static async stop() {
    await request({
      url: Endpoints.CRAWLING_STOP,
      params: {},
      body: {},
      method: 'GET'
    })
    return true
  }
}
