import { QURATED_CONTAINT_LIST_CONTENT, QURATED_CONTAINT_LIST_LOAD_MORE } from "../constants";
import axios, {AxiosResponse} from 'axios'
import { QUARATED_CONTAINT_PAGE_API_URL } from "./apiConstants";

export function fetchQuratedList( page: number) {

    return (dispatch: any, getState: any) => {
        //API Call     
           
        return axios
        .get(`${QUARATED_CONTAINT_PAGE_API_URL}/?page=${page}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : QURATED_CONTAINT_LIST_CONTENT,
                data: d.data.data
            })
        })
    }
  }

export function fetchQuratedListLoadMore( page: number) {

    return (dispatch: any, getState: any) => {
        //API Call        
        return axios
        .get(`${QUARATED_CONTAINT_PAGE_API_URL}/?page=${page}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : QURATED_CONTAINT_LIST_LOAD_MORE,
                data: d.data.data
            })
        })
    }
  }