export type PaginationArgs = {
  page: number
  perPage: number
  pages: number
  total: number
}

export class Pagination {
  page: number
  perPage: number
  pages: number
  total: number

  constructor(args: PaginationArgs) {
    this.page = args.page
    this.perPage = args.perPage
    this.pages = args.pages
    this.total = args.total
  }
}
