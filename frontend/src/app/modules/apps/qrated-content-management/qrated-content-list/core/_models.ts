import { Response} from '../../../../../../_metronic/helpers'
export type QratedContent = {
  _id?: string
  title?: string
  description?: string
  image?:  string
  fileData?: any
}

export type QratedContentQueryResponse = Response<Array<QratedContent>>

export const initialQratedContent: QratedContent = {
  image: '',
  title: '',
  description: ''
}
