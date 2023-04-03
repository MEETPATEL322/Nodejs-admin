import { QURATED_DATA_DETAIL_CONTENT } from "../constants";
import axios, {AxiosResponse} from 'axios'
import { QURATED_DATA_DETAIL_PAGE_API_URL } from "./apiConstants";

export function fetchQuratedDataDetail(id:any) {

    return (dispatch: any, getState: any) => {
        //API Call        
        return axios
        .get(`${QURATED_DATA_DETAIL_PAGE_API_URL}/${id}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : QURATED_DATA_DETAIL_CONTENT,
                data: d.data.data
            })
        })
    }
  }