import { rest, setupWorker, type SetupWorker } from 'msw'

const handlers = [
  rest.get('/api/v1.0/domains', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1000),
      ctx.json({
        pagination: {},
        data: [
          {
            id: 1,
            name: 'kumparan.com',
            image: 'https://kumparan.com/favicon.ico',
            ranking: {
              previous: undefined,
              current: 1
            }
          },
          {
            id: 2,
            name: 'kumparan.com',
            image: 'https://kumparan.com/favicon.ico',
            ranking: {
              previous: undefined,
              current: 1
            }
          },
          {
            id: 2,
            name: 'kumparan.com',
            image: 'https://kumparan.com/favicon.ico',
            ranking: {
              previous: undefined,
              current: 1
            }
          },
          {
            id: 2,
            name: 'kumparan.com',
            image: 'https://kumparan.com/favicon.ico',
            ranking: {
              previous: undefined,
              current: 1
            }
          },
          {
            id: 2,
            name: 'kumparan.com',
            image: 'https://kumparan.com/favicon.ico',
            ranking: {
              previous: undefined,
              current: 1
            }
          }
        ]
      })
    )
  })
]

const worker: SetupWorker = setupWorker(...handlers)

export default worker
