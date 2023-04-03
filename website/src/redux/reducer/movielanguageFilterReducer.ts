import { MOVIE_LANGUAGE_FILTER_DETAIL_CONTENT } from "../constants";
const intialState = {
    MovieLanguageFilterData : [],
};
export const movielanguageFilterReducer = (state = intialState, action: any) => {
    switch (action.type) {
      case MOVIE_LANGUAGE_FILTER_DETAIL_CONTENT:
        return {
            ...state,
            MovieLanguageFilterData: action.data
        };;
      
      default:
        return state;
    }
  };