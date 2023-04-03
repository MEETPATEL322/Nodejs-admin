import { MOVIESDATA_LIST_CONTENT, MOVIESDATA_LIST_LOAD_MORE } from "../constants";
import axios, {AxiosResponse} from 'axios'
import { MOVIESDATA_PAGE_API_URL , MOVIE_LIST_PAGE_API_URL_SORT} from "./apiConstants";

export function fetchMovieList(page: number,sort_by:any) {
    if(sort_by == ''){
        return (dispatch: any, getState: any) => {
            //API Call        
            return axios
            .get(`${MOVIESDATA_PAGE_API_URL}/?page=${page}`)
            .then((d: AxiosResponse) => {            
                dispatch({
                    type : MOVIESDATA_LIST_CONTENT,
                    data: d.data.data
                })
            })
        }
    }else{
        return (dispatch: any, getState: any) => {
            //API Call        
            return axios
                .get(`${MOVIE_LIST_PAGE_API_URL_SORT}/0/${sort_by}`)
                .then((d: AxiosResponse) => {            
                    dispatch({
                        type : MOVIESDATA_LIST_CONTENT,
                        data: d.data.data
                    })
                })
        }
    }
  }

export function fetchMovieListLoadMore( page: number) {

    return (dispatch: any, getState: any) => {
        //API Call        
        return axios
        .get(`${MOVIESDATA_PAGE_API_URL}/?page=${page}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : MOVIESDATA_LIST_LOAD_MORE,
                data: d.data.data
            })
        })
    }
  }