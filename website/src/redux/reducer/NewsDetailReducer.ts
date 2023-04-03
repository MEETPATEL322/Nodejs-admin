import { NEWS_DATA_DETAIL_CONTENT } from "../constants";
const intialState = {
    NewsDetailData : []
};
export const NewsDetailReducer = (state = intialState, action: any) => {
    switch (action.type) {
      case NEWS_DATA_DETAIL_CONTENT:
        return {
            ...state,
            NewsDetailData:action.data
        };;
      default:
        return state;
    }
  };