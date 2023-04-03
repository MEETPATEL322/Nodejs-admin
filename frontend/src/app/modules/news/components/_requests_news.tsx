import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export const NEWS_URL = `${API_URL}/news`

export function createNews(newstitle: string,
    newsdescription: string,
    body: any) {
    return axios.post(NEWS_URL, {
        newstitle,
        newsdescription,
        body
    })
}