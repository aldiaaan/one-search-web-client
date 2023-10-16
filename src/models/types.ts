export type CommonRequestOptions<
  TSortables extends string | number | symbol = string,
  TResolves extends string = string
> = {
  page?: number // start with 0
  perPage?: number
  resolves?: TResolves[]
  sorts?: { [key in TSortables]: 'ASC' | 'DESC' }
  query?: string
}
