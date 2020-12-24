import types from "../types/channels";

const INIT_STATE = {
  current: null,
  all: [
    {
      name: "JavaScript",
      messages: [
        {
          user: "Vincent",
          message: "Hello world",
        },
        {
          name: "John",
          message: "World again",
        },
      ],
      users: [],
    },
    {
      name: "Python",
      messages: [],
      users: [],
    },
    {
      name: "C++",
      messages: [],
      users: [],
    },
    {
      name: "Java",
      messages: [],
      users: [],
    },
  ],
};

const channelsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case types.SET_CURRENT:
      return {
        ...state,
        current: state.all[action.payload],
      };
    case types.UPDATE_ALL_CHANNELS:
      return {
        ...state,
        all: [...action.payload],
      };
    case types.ADD_MESSAGE_TO_CHANNEL:
      console.log(action.payload);
      return {
        ...state,
        all: state.all.reduce((acc, cur) => {
          console.log(cur);
          if (cur.name === action.payload.channelName) {
            cur.messages.push({
              user: action.payload.user,
              message: action.payload.message,
            });
          }
          acc.push(cur);
          return acc;
        }, []),
      };
    case types.CHANGE_USERS_IN_CHANNELS:
      console.log(action.payload);
      return {
        ...state,
        all: state.all.reduce((acc, cur) => {
          if (cur.name === action.payload.channelName) {
            cur.users = action.payload.users;
          }
          acc.push(cur);
          return acc;
        }, []),
      };
    default:
      return state;
  }
};

export default channelsReducer;
