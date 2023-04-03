import { TV_DETAIL_CONTENT } from "../constants";
const intialState = {
    TvdetailData : []
};
export const tvdetailReducer = (state = intialState, action: any) => {
    switch (action.type) {
      case TV_DETAIL_CONTENT:
        return {
            ...state,
            TvdetailData:action.data
        };;
      default:
        return state;
    }
  };