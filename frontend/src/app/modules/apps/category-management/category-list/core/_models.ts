import {Response} from '../../../../../../_metronic/helpers'
export type Category = {
  _id?: string
  name?: string
  isActive?: boolean
}

export type CategoryQueryResponse = Response<Array<Category>>

export const initialCategory: Category = {
  name: '',
  isActive: true
}
