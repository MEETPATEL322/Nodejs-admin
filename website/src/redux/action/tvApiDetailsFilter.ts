import { TV_FILTER_DETAIL_CONTENT } from "../tvconstants";
import axios, {AxiosResponse} from 'axios'
import { TV_DETAIL_FILTER_PAGE_API_URL } from "./apiConstants";

export function tvApiDetailsFilter() {

    return (dispatch: any, getState: any) => {
        //API Call    
        console.log("tvdetails page..");    
        return axios
        .get(`${TV_DETAIL_FILTER_PAGE_API_URL}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : TV_FILTER_DETAIL_CONTENT,
                data: d.data.data
            })
        })
    }
  }