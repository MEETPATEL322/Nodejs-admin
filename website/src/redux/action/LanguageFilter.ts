import { LANGUAGE_DETAIL_CONTENT } from "../constants";
import axios, {AxiosResponse} from 'axios'
import { LANGUAGE_API_PAGE_API_URL } from "./apiConstants";

export function fetchLanguageApiFilterDetail(language:any,id:number) {
    return (dispatch: any, getState: any) => {
        //API Call        
       
        
        return axios
        .get(`${LANGUAGE_API_PAGE_API_URL}?language=${id}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : LANGUAGE_DETAIL_CONTENT,
                data: d.data.data
            })
        })
    }
  }