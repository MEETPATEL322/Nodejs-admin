import { MOVIESDATA_LIST_CONTENT, MOVIESDATA_LIST_LOAD_MORE } from "../constants";
import axios, {AxiosResponse} from 'axios'
import { LANGUAGE_API_PAGE_API_URL } from "./apiConstants";

export function fetchMovieLanguageList(page: number) {

    return (dispatch: any, getState: any) => {
        //API Call        
        return axios
        .get(`${LANGUAGE_API_PAGE_API_URL}/?page=${page}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : MOVIESDATA_LIST_CONTENT,
                data: d.data.data
            })
        })
    }
  }

export function fetchMovieLanguageListLoadMore( page: number) {

    return (dispatch: any, getState: any) => {
        //API Call        
        return axios
        .get(`${LANGUAGE_API_PAGE_API_URL}/?page=${page}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : MOVIESDATA_LIST_LOAD_MORE,
                data: d.data.data
            })
        })
    }
  }