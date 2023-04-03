import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {QratedContent, QratedContentQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
// const API_URL = 'http://localhost:5000'
const QRATED_CONTENT_URL = `${API_URL}/qrated-content`
const GET_QRATED_CONTENT_URL = `${API_URL}/qrated-content-list`

const getQratedContent = (query: string): Promise<QratedContentQueryResponse> => {
  return axios
    .get(`${GET_QRATED_CONTENT_URL}?${query}`)
    .then((d: AxiosResponse<QratedContentQueryResponse>) => d.data)
}

const getQratedContentById = (id: ID): Promise<QratedContent | undefined> => {
  return axios
    .get(`${QRATED_CONTENT_URL}/${id}`)
    .then((response: AxiosResponse<Response<QratedContent>>) => response.data)
    .then((response: Response<QratedContent>) => response.data)
}

const createQratedContent = (qratedContent: FormData): Promise<QratedContent | undefined> => {
  console.log("qratedContent===", qratedContent);
  return axios
    .post(QRATED_CONTENT_URL, qratedContent)
    .then((response: AxiosResponse<Response<QratedContent>>) => response.data)
    .then((response: Response<QratedContent>) => response.data)
}

const updateQratedContent = (qratedContent: FormData, id: string): Promise<QratedContent | undefined> => {
  return axios
    .put(`${QRATED_CONTENT_URL}/${id}`, qratedContent)
    .then((response: AxiosResponse<Response<QratedContent>>) => response.data)
    .then((response: Response<QratedContent>) => response.data)
}

const deleteQratedContent = (qratedContentId: ID): Promise<void> => {
  return axios.delete(`${QRATED_CONTENT_URL}/${qratedContentId}`).then(() => {})
}

const deleteSelectedQratedContent = (qratedContentIds: Array<ID>): Promise<void> => {
  const requests = qratedContentIds.map((id) => axios.delete(`${QRATED_CONTENT_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getQratedContent, deleteQratedContent, deleteSelectedQratedContent, getQratedContentById, createQratedContent, updateQratedContent}
