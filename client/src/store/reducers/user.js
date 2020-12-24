import types from "../types/user";

const INIT_STATE = {
  name: "",
  channel: "",
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case types.SET_USER_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case types.SET_USER_CHANNEL:
      return {
        ...state,
        channel: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
