import { APILogAction } from "./actions";

export const initialState = {
  type: "ALL",
  limit: 50,
  time: 0,
  logs: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case APILogAction.SET_LIMIT:
      return {
        ...state,
        limit: action.payload,
      };
    case APILogAction.SET_TIME:
      return {
        ...state,
        time: action.payload,
      };
    case APILogAction.SET_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    case APILogAction.SET_LOGS:
      return {
        ...state,
        logs: action.payload,
      };
    case APILogAction.RESET_STATE:
      return initialState;
    default:
      return initialState;
  }
};
