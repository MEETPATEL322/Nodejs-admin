import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducer/rootReducer";

export const appStore = createStore(rootReducer, applyMiddleware(thunk));