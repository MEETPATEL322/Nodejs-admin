import { MOVIESDATA_LIST_CONTENT, MOVIESDATA_LIST_LOAD_MORE } from "../constants";
const intialState = {
    listData : [],
    totalPage: 1,
    page: 1
};
export const moviesdataReducer = (state = intialState, action: any) => {
    switch (action.type) {
      case MOVIESDATA_LIST_CONTENT:
        return {
            ...state,
            page: action.data.page,
            totalPage: action.data.total_pages,
            listData: action.data.results
        };;
      case MOVIESDATA_LIST_LOAD_MORE:
        return {
            ...state,
            page: action.data.page,
            listData:[...state.listData, ...action.data.results]
        };;
      default:
        return state;
    }
  };