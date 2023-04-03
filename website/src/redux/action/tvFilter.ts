import { TV_FILTER_DETAIL_CONTENT } from "../tvconstants";
import axios, {AxiosResponse} from 'axios'
import { FILTER_TV_PAGE_API_URL } from "./apiConstants";

export function fetchTvFilterDetail() {

    return (dispatch: any, getState: any) => {
        //API Call        
        return axios
        .get(`${FILTER_TV_PAGE_API_URL}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : TV_FILTER_DETAIL_CONTENT,
                data: d.data.data
            })
        })
    }
  }
  