import { HOME_CONTENT } from "../constants";
import axios, {AxiosResponse} from 'axios'
import { HOME_PAGE_API_URL } from "./apiConstants";

export function fetchHomeContent() {

    return (dispatch: any, getState: any) => {
        //API Call        
        return axios
        .get(`${HOME_PAGE_API_URL}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : HOME_CONTENT,
                data: d.data.data
            })
        })
    }
  }