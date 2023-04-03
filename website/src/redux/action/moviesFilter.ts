import { MOVIE_FILTER_DETAIL_CONTENT } from "../constants";
import axios, {AxiosResponse} from 'axios'
import { FILTER_MOVIES_PAGE_API_URL } from "./apiConstants";

export function fetchMovieFilterDetail() {

    return (dispatch: any, getState: any) => {
        //API Call        
        return axios
        .get(`${FILTER_MOVIES_PAGE_API_URL}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : MOVIE_FILTER_DETAIL_CONTENT,
                data: d.data.data
            })
        })
    }
  }