import { MOVIE_DETAIL_CONTENT } from "../constants";
import axios, {AxiosResponse} from 'axios'
import { DETAIL_PAGE_API_URL } from "./apiConstants";

export function fetchDetail(id:any) {

    return (dispatch: any, getState: any) => {
        //API Call        
        return axios
        .get(`${DETAIL_PAGE_API_URL}/${id}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : MOVIE_DETAIL_CONTENT,
                data: d.data.data
            })
        })
    }
  }