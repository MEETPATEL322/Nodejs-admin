import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {Category, CategoryQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
// const API_URL = 'http://localhost:5000'
const CATEGORY_URL = `${API_URL}/category`
const GET_CATEGORY_URL = `${API_URL}/category-list`
const UPDATE_CATEGORY_URL = `${API_URL}/category-update`

const getCategory = (query: string): Promise<CategoryQueryResponse> => {
  return axios
    .get(`${GET_CATEGORY_URL}?${query}`)
    .then((d: AxiosResponse<CategoryQueryResponse>) => d.data)
}

const getCategoryById = (id: ID): Promise<Category | undefined> => {
  return axios
    .get(`${CATEGORY_URL}/${id}`)
    .then((response: AxiosResponse<Response<Category>>) => response.data)
    .then((response: Response<Category>) => response.data)
}

const createCategory = (category: FormData): Promise<Category | undefined> => {
  console.log("category===", category);
  return axios
    .post(CATEGORY_URL, category)
    .then((response: AxiosResponse<Response<Category>>) => response.data)
    .then((response: Response<Category>) => response.data)
}

const updateCategory = (category: Category): Promise<Category | undefined> => {
  return axios
    .put(`${CATEGORY_URL}/${category._id}`, category)
    .then((response: AxiosResponse<Response<Category>>) => response.data)
    .then((response: Response<Category>) => response.data)
}

const deleteCategory = (categoryId: ID): Promise<void> => {
  return axios.delete(`${CATEGORY_URL}/${categoryId}`).then(() => {})
}

const deleteSelectedCategory = (categoryIds: Array<ID>): Promise<void> => {
  const requests = categoryIds.map((id) => axios.delete(`${CATEGORY_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

const updateSelectedCategory = (categoryIds: Array<ID>, status: String): Promise<void> => {
  const requests = categoryIds.map((id) => axios.put(`${UPDATE_CATEGORY_URL}/${id}`,{isActive: status}))
  return axios.all(requests).then(() => {})
}

export {getCategory, deleteCategory, deleteSelectedCategory, getCategoryById, createCategory, updateCategory, updateSelectedCategory}
