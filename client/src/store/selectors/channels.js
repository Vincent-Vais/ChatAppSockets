const selectAllChannels = (state) => state.channels.all;
const selectCurrentChannel = (state) => state.channels.current;
const selectCurrentMessages = (state) => state.channels.current.messages;
const selectCurrentUsers = (state) => state.channels.current.users;

const channelsSelectors = {
  selectAllChannels,
  selectCurrentChannel,
  selectCurrentMessages,
  selectCurrentUsers,
};

export default channelsSelectors;
