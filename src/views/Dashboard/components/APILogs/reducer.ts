import { APILogsAction } from "./actions";
import { Action, State } from "./types";

export const initialState: State = {
  type: "ALL",
  limit: 50,
  time: 0,
  confirmClear: false,
  logs: [],
};

export const reducer = (state: State, action: Action): State => {
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
