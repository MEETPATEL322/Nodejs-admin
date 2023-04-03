import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import { Cms, CmsQueryResponse } from './_models'

const API_URL = process.env.REACT_APP_API_URL

const CMS_URL = `${API_URL}/cms`
const GET_CMS_URL = `${API_URL}/cms-list`
const UPDATE_CMS_URL = `${API_URL}/cms-update`

console.log("cms list==========>>>>>>>>>>>",GET_CMS_URL);


const getCms = (query: string): Promise<CmsQueryResponse> => {
  // alert("hii");
  return axios
    .get(`${GET_CMS_URL}?${query}`)
    .then((d: AxiosResponse<CmsQueryResponse>) => d.data)
}

const getCmsById = (id: ID): Promise<Cms | undefined> => {
  return axios
    .get(`${CMS_URL}/${id}`)
    .then((response: AxiosResponse<Response<Cms>>) => response.data)
    .then((response: Response<Cms>) => response.data)
}

const createCms = (cms: Cms): Promise<Cms | undefined> => {
  console.log("cms===", cms);
  return axios
    .post(CMS_URL, cms)
    .then((response: AxiosResponse<Response<Cms>>) => response.data)
    .then((response: Response<Cms>) => response.data)
}

const updateCms = (cms: Cms): Promise<Cms | undefined> => {
  return axios
    .put(`${CMS_URL}/${cms._id}`, cms)
    .then((response: AxiosResponse<Response<Cms>>) => response.data)
    .then((response: Response<Cms>) => response.data)
}

const deleteCms = (cmsId: ID): Promise<void> => {
  return axios.delete(`${CMS_URL}/${cmsId}`).then(() => {})
}

const deleteSelectedCms = (cmsIds: Array<ID>): Promise<void> => {
  const requests = cmsIds.map((id) => axios.delete(`${CMS_URL}/${id}`))
  return axios.all(requests).then(() => {})
}
const updateSelectedCMS = (cmsIds: Array<ID>, status: String): Promise<void> => {
  const requests = cmsIds.map((id) => axios.put(`${UPDATE_CMS_URL}/${id}`,{isActive: status}))
  return axios.all(requests).then(() => {})
}

export {getCms, deleteCms, deleteSelectedCms, getCmsById, createCms, updateCms}
