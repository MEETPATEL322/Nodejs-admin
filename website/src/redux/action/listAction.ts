import { MOVIE_LIST_CONTENT, MOVIE_LIST_LOAD_MORE } from "../constants";
import axios, {AxiosResponse} from 'axios'
import { MOVIE_LIST_PAGE_API_URL,MOVIE_LIST_PAGE_API_URL_LANG,MOVIE_LIST_PAGE_API_URL_LANG_list,MOVIE_LIST_PAGE_API_URL_SORT } from "./apiConstants";

export function fetchList(id:any, page: number,sort_by:any) {
    var regex=/^[0-9]+$/;
    if (id == undefined){
        alert(123)
        return (dispatch: any, getState: any) => {
            //API Call        
            return axios
            .get(`${MOVIE_LIST_PAGE_API_URL}/0/?page=${page}`)
            .then((d: AxiosResponse) => {            
                dispatch({
                    type : MOVIE_LIST_CONTENT,
                    data: d.data.data
                })
            })
        }
    }else if(id.match(regex) && sort_by == ''){
        return (dispatch: any, getState: any) => {
            //API Call        
            return axios
            .get(`${MOVIE_LIST_PAGE_API_URL}/${id}?page=${page}`)
            .then((d: AxiosResponse) => {            
                dispatch({
                    type : MOVIE_LIST_CONTENT,
                    data: d.data.data
                })
            })
        }
    }else{
        if(sort_by != ''){
            return (dispatch: any, getState: any) => {
                //API Call        
                return axios
                .get(`${MOVIE_LIST_PAGE_API_URL_SORT}/${id}/${sort_by}`)
                .then((d: AxiosResponse) => {            
                    dispatch({
                        type : MOVIE_LIST_CONTENT,
                        data: d.data.data
                    })
                })
            }
        }else{

            return (dispatch: any, getState: any) => {
                //API Call        
                return axios
                .get(`${MOVIE_LIST_PAGE_API_URL_LANG_list}/?language=${id}`)
                .then((d: AxiosResponse) => {            
                    dispatch({
                        type : MOVIE_LIST_CONTENT,
                        data: d.data.data
                    })
                })
            }
        }
    }
   
  }

export function fetchListLoadMore(id:any, page: number) {

    return (dispatch: any, getState: any) => {
        //API Call        
        return axios
        .get(`${MOVIE_LIST_PAGE_API_URL}/${id}?page=${page}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : MOVIE_LIST_LOAD_MORE,
                data: d.data.data
            })
        })
    }
  }

  export function fetchMultiList(id: any, page: number,lang:any,sort_by:any) {
    if(sort_by == ''){
        return (dispatch: any, getState: any) => {
            //API Call        
            return axios
                .get(`${MOVIE_LIST_PAGE_API_URL_LANG}/${id}/${lang}?page=${page}`)
                .then((d: AxiosResponse) => {
                    dispatch({
                        type: MOVIE_LIST_CONTENT,
                        data: d.data.data
                    })
                })
        }
    }else{
        return (dispatch: any, getState: any) => {
            //API Call        
            return axios
            .get(`${MOVIE_LIST_PAGE_API_URL_SORT}/${id}/${lang}/${sort_by}`)
            .then((d: AxiosResponse) => {            
                dispatch({
                    type : MOVIE_LIST_CONTENT,
                    data: d.data.data
                })
            })
        }
    }
   
}

export function fetchListMultiLoadMore(id: any, page: number,lang:any) {

    return (dispatch: any, getState: any) => {
        //API Call        
        return axios
            .get(`${MOVIE_LIST_PAGE_API_URL_LANG}/${id}/${lang}?page=${page}`)
            .then((d: AxiosResponse) => {
                dispatch({
                    type: MOVIE_LIST_LOAD_MORE,
                    data: d.data.data
                })
            })
    }
}