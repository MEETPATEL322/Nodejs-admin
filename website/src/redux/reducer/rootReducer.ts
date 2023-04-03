import { combineReducers } from "redux";
import { detailReducer } from "./detailReducer";
import { homeReducer } from "./homeReducer";
import { listReducer } from "./listReducer";
import { tvshowsReducer } from "./tvshowsReducer";
import { moviesdataReducer } from "./moviesdataReducer";
import { tvdetailReducer } from "./TvDetailReducer";
import { quratedReducer } from "./quratedReducer";
import { newsReducer } from "./newsReducer";
import { QuratedDetailReducer } from "./QuratedDetailReducer";
import { NewsDetailReducer } from "./NewsDetailReducer";
import { movieFilterReducer } from "./movieFilterReducer";
import { movielanguageFilterReducer } from "./movielanguageFilterReducer";
import { LanguageFilterReducer } from "./LanguageFilterReducer";
import { tvFilterReducer } from "./tvFilterReducer";


export const rootReducer = combineReducers({
  homeReducer,
  detailReducer,
  listReducer,
  tvshowsReducer,
  moviesdataReducer,
  tvdetailReducer,
  quratedReducer,
  newsReducer,
  QuratedDetailReducer,
  NewsDetailReducer,
  movieFilterReducer,
  movielanguageFilterReducer,
  LanguageFilterReducer,
  tvFilterReducer
});
