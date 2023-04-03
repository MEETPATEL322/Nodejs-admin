import { MOVIE_FILTER_DETAIL_CONTENT } from "../constants";
const intialState = {
    MovieFilterData : [],
};
export const movieFilterReducer = (state = intialState, action: any) => {
    switch (action.type) {
      case MOVIE_FILTER_DETAIL_CONTENT:
        return {
            ...state,
            MovieFilterData: action.data.genres
        };;
      
      default:
        return state;
    }
  };