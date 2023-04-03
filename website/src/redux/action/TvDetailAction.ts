import { TV_DETAIL_CONTENT } from "../constants";
import axios, {AxiosResponse} from 'axios'
import { TV_DETAIL_PAGE_API_URL } from "./apiConstants";

export function fetchTvDetail(id:any) {

    return (dispatch: any, getState: any) => {
        //API Call        
        return axios
        .get(`${TV_DETAIL_PAGE_API_URL}/${id}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : TV_DETAIL_CONTENT,
                data: d.data.data
            })
        })
    }
  }