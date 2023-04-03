import {ID, Response} from '../../../../../../_metronic/helpers'
export type Cms = {
  _id?: string
  cmsTitle?: string
  cmsDescription?: string
  cmsStatus?: boolean
  fileData?: any
}

export type CmsQueryResponse = Response<Array<Cms>>

export const initialCms: Cms = {
  cmsTitle: '',
  cmsDescription: '',
  cmsStatus: false,
}
