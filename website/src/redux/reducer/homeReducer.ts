import { HOME_CONTENT } from "../constants";
const intialState = {
    homeData : []
};
export const homeReducer = (state = intialState, action: any) => {
    switch (action.type) {
      case HOME_CONTENT:
        return {
            ...state,
            homeData:action.data
        };;
      default:
        return state;
    }
  };