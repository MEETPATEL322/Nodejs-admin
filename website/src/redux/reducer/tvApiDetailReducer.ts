import { TV_FILTER_DETAIL_CONTENT } from "../tvconstants";
const intialState = {
    tvApiFilterData : [],
};
export const tvApiDetailReducer = (state = intialState, action: any) => {
    switch (action.type) {
      case TV_FILTER_DETAIL_CONTENT:
        return {
            ...state,
            tvApiFilterData: action.data
        };;
      
      default:
        return state;
    }
  };