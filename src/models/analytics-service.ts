import { Endpoints, request } from '@/api'

export class AnalyticsService {
  static async trackQuery(query?: string) {
    if (query) {
      await request({
        method: 'POST',
        url: Endpoints.EVENT_ANALYTICS_SEARCH,
        body: {
          query
        }
      })
    }
  }
}
