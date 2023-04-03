import {Response} from '../../../../../../_metronic/helpers'
export type News = {
  _id?: string
  newstitle?: string
  newsdescription?: string
  newsimage?:  string
}

export type NewsQueryResponse = Response<Array<News>>

export const initialNews: News = {
  newsimage: '',
  newstitle: '',
  newsdescription: ''
}
