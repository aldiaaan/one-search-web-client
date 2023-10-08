export type WebPage = {
  title?: string
  domain?: {
    name?: string
    icon?: string
  }
  ranking?: Ranking
  image?: string
}

export type Domain = {
  ranking?: Ranking
  name?: string;
  id?: string;
  image?: string;
}

export type Ranking = {
  previous?: number
  current?: number
}

export type Pagination = {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}
