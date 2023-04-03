import { MOVIE_LANGUAGE_FILTER_DETAIL_CONTENT } from "../constants";
import axios, {AxiosResponse} from 'axios'
import { FILTER_LANGUAGE_PAGE_API_URL } from "./apiConstants";

export function fetchMovieLanguageFilterDetail() {

    return (dispatch: any, getState: any) => {
        //API Call        
        // console.log("moviedetails..")
        return axios
        .get(`${FILTER_LANGUAGE_PAGE_API_URL}`)
        .then((d: AxiosResponse) => {            
            dispatch({
                type : MOVIE_LANGUAGE_FILTER_DETAIL_CONTENT,
                data: d.data.data
            })
        })
    }
  }