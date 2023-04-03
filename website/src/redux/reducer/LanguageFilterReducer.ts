import { LANGUAGE_DETAIL_CONTENT } from "../constants";
const intialState = {
    MovieLanguageApiFilterData : [],
    totalPage: 1,
    page: 1,
};
export const LanguageFilterReducer = (state = intialState, action: any) => {
    switch (action.type) {
      case LANGUAGE_DETAIL_CONTENT:
        return {
            ...state,
            MovieLanguageApiFilterData: action.data.results
        };;
      
      default:
        return state;
    }
  };