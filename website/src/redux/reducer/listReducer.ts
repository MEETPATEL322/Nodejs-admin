import { MOVIE_LIST_CONTENT, MOVIE_LIST_LOAD_MORE } from "../constants";
const intialState = {
    listData : [],
    totalPage: 1,
    page: 1
};
export const listReducer = (state = intialState, action: any) => {
    switch (action.type) {
      case MOVIE_LIST_CONTENT:
        return {
            ...state,
            page: action.data.page,
            totalPage: action.data.total_pages,
            listData: action.data.results
        };;
      case MOVIE_LIST_LOAD_MORE:
        return {
            ...state,
            page: action.data.page,
            listData:[...state.listData, ...action.data.results]
        };;
      default:
        return state;
    }
  };