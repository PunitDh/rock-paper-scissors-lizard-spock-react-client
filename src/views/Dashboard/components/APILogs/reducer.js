import { APILogsAction } from "./actions";

export const initialState = {
  type: "ALL",
  limit: 50,
  time: 0,
  confirmClear: false,
  logs: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case APILogsAction.SET_FILTER:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case APILogsAction.SET_CONFIRM_CLEAR:
      return {
        ...state,
        confirmClear: action.payload,
      };
    case APILogsAction.SET_LOGS:
      return {
        ...state,
        logs: action.payload,
      };
    case APILogsAction.RESET_STATE:
    default:
      return initialState;
  }
};
