import { TVSHOWS_LIST_CONTENT, TVSHOWS_LIST_LOAD_MORE } from "../constants";
import axios, {AxiosResponse} from 'axios'
import { TV_LIST_PAGE_API_URL } from "./apiConstants";

export function fetchTVList(id:number,lang:any,sort_by:any) {
    return (dispatch: any, getState: any) => {
        //API Call        
        return axios
        .get(`${TV_LIST_PAGE_API_URL}/?page=1&id=${id}&lang=${lang}&sort_by=${sort_by}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : TVSHOWS_LIST_CONTENT,
                data: d.data.data
            })
        })
    }
  }

export function fetchTVListLoadMore( page: number) {

    return (dispatch: any, getState: any) => {
        //API Call        
        return axios
        .get(`${TV_LIST_PAGE_API_URL}/?page=${page}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : TVSHOWS_LIST_LOAD_MORE,
                data: d.data.data
            })
        })
    }
  }