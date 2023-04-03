import { NEWS_DATA_DETAIL_CONTENT } from "../constants";
import axios, {AxiosResponse} from 'axios'
import { NEWS_DATA_DETAIL_PAGE_API_URL } from "./apiConstants";

export function fetchNewsDataDetail(id:any) {

    return (dispatch: any, getState: any) => {
        //API Call        
        return axios
        .get(`${NEWS_DATA_DETAIL_PAGE_API_URL}/${id}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : NEWS_DATA_DETAIL_CONTENT,
                data: d.data.data
            })
        })
    }
  }