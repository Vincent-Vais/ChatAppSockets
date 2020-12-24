import types from "../types/channels";

export const setCurrent = (idx) => ({
  type: types.SET_CURRENT,
  payload: idx,
});

export const fetchAllChannels = () => {
  return (dispatch) => {
    fetch("/api")
      .then((response) => {
        if (response.status === 200) return response.json();
        else throw new Error("Something went wrong");
      })
      .then((jsonResp) => dispatch(updateAllChannels(jsonResp.channels)))
      .catch((err) => console.log(err));
  };
};
const updateAllChannels = (channels) => ({
  type: types.UPDATE_ALL_CHANNELS,
  payload: channels,
});

export const addMessageToChannel = (data) => ({
  type: types.ADD_MESSAGE_TO_CHANNEL,
  payload: data,
});

export const changeUsersInChannel = (data) => ({
  type: types.CHANGE_USERS_IN_CHANNELS,
  payload: data,
});

export const handleSystemNotification = (data) => (dispatch) => {
  console.log(data);
  const { channelName, users, message } = data;
  dispatch(addMessageToChannel({ channelName, message }));
  dispatch(changeUsersInChannel({ channelName, users }));
};

const channelsActions = {
  setCurrent,
  fetchAllChannels,
  addMessageToChannel,
  handleSystemNotification,
};

export default channelsActions;
