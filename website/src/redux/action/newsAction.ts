import { NEWS_LIST_CONTENT, NEWS_LIST_LOAD_MORE } from "../constants";
import axios, {AxiosResponse} from 'axios'
import { NEWS_PAGE_API_URL } from "./apiConstants";

export function fetchNewsList( page: number) {

    return (dispatch: any, getState: any) => {
        //API Call     
           
        return axios
        .get(`${NEWS_PAGE_API_URL}/?page=${page}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : NEWS_LIST_CONTENT,
                data: d.data.data
            })
        })
    }
  }

export function fetchNewsListLoadMore( page: number) {

    return (dispatch: any, getState: any) => {
        //API Call        
        return axios
        .get(`${NEWS_PAGE_API_URL}/?page=${page}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : NEWS_LIST_LOAD_MORE,
                data: d.data.data
            })
        })
    }
  }