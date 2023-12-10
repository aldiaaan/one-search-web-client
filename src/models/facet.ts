export type FacetArgs = {
  value: string | number
  total: number
  label?: string
}

export class Facet {
  value: string = '';
  total: number = 0;
  label?: string
  constructor(args?: FacetArgs) {
    Object.assign(this, args)
  }
}
