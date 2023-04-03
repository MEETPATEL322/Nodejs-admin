import axios, {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {News, NewsQueryResponse} from './_models'

const API_URL = process.env.REACT_APP_API_URL
// const API_URL = 'http://localhost:5000'
const NEWS_URL = `${API_URL}/news`
const GET_NEWS_URL = `${API_URL}/news-list`

const getNews = (query: string): Promise<NewsQueryResponse> => {
  return axios
    .get(`${GET_NEWS_URL}?${query}`)
    .then((d: AxiosResponse<NewsQueryResponse>) => d.data)
}

const getNewsById = (id: ID): Promise<News | undefined> => {
  return axios
    .get(`${NEWS_URL}/${id}`)
    .then((response: AxiosResponse<Response<News>>) => response.data)
    .then((response: Response<News>) => response.data)
}

const createNews = (news: FormData): Promise<News | undefined> => {
  console.log("news===", news);
  return axios
    .post(NEWS_URL, news)
    .then((response: AxiosResponse<Response<News>>) => response.data)
    .then((response: Response<News>) => response.data)
}

const updateNews = (news: FormData, id: string): Promise<News | undefined> => {
  return axios
    .put(`${NEWS_URL}/${id}`, news)
    .then((response: AxiosResponse<Response<News>>) => response.data)
    .then((response: Response<News>) => response.data)
}

const deleteNews = (newsId: ID): Promise<void> => {
  return axios.delete(`${NEWS_URL}/${newsId}`).then(() => {})
}

const deleteSelectedNews = (newsIds: Array<ID>): Promise<void> => {
  const requests = newsIds.map((id) => axios.delete(`${NEWS_URL}/${id}`))
  return axios.all(requests).then(() => {})
}

export {getNews, deleteNews, deleteSelectedNews, getNewsById, createNews, updateNews}
