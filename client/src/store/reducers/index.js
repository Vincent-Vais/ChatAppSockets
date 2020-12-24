import userReducer from "./user";
import channelsReducer from "./channels";
import { combineReducers } from "redux";

const reducer = combineReducers({
  user: userReducer,
  channels: channelsReducer,
});

export default reducer;
