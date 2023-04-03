import { MOVIE_DETAIL_CONTENT } from "../constants";
const intialState = {
    detailData : []
};
export const detailReducer = (state = intialState, action: any) => {
    switch (action.type) {
      case MOVIE_DETAIL_CONTENT:
        return {
            ...state,
            detailData:action.data
        };;
      default:
        return state;
    }
  };