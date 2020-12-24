import types from "../types/user";

export const setUserName = (name) => ({
  type: types.SET_USER_NAME,
  payload: name,
});

export const setUserChannel = (channel) => ({
  type: types.SET_USER_CHANNEL,
  payload: channel,
});

const actions = {
  setUserName,
  setUserChannel,
};

export default actions;
