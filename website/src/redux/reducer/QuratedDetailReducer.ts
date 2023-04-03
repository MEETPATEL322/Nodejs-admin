import { QURATED_DATA_DETAIL_CONTENT } from "../constants";
const intialState = {
    QuratedDetailData : []
};
export const QuratedDetailReducer = (state = intialState, action: any) => {
    switch (action.type) {
      case QURATED_DATA_DETAIL_CONTENT:
        return {
            ...state,
            QuratedDetailData:action.data
        };;
      default:
        return state;
    }
  };