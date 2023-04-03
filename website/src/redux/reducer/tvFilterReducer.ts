import { TV_FILTER_DETAIL_CONTENT } from "../tvconstants";
const intialState = {
    TvFilterData : [],
};
  export const tvFilterReducer = (state = intialState, action: any) => {
    switch (action.type) {
      case TV_FILTER_DETAIL_CONTENT:
        return {
            ...state,
            TvFilterData: action.data.genres
        };;
      
      default:
        return state;
    }
  };