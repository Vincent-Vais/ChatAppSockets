import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./reducers";

let middleware, store;

middleware = [thunk];

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
  );
} else {
  store = createStore(reducer, applyMiddleware(...middleware));
}

export default store;
