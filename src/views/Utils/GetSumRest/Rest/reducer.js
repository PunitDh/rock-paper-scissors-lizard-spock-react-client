import { RestAction } from "./actions";
import { ContentType } from "./sections/Body/constants";

export const initialState = {
  // input: "4sin(90)+8cos(10)+9tan(80)+4log(4)+2.5ln(5)+24atan(4)+14Ans+14E-4π-2√3",
  url: {
    value: "",
    variables: [],
    display: "",
  },
  loading: false,
  method: "GET",
  params: {},
  authorization: {
    type: null,
  },
  headers: {},
  body: {
    id: "6209c3403ebaa300084cec22",
    batchId: "6209c3403ebaa300084cec21",
    mimeType: "application/pdf",
    platformCode: "Aggregated",
    accountNumber: 16783845,
    reportKey: "PDF_PORTFOLIO_SUMMARY_AGGREGATED",
    test: null,
  },
  contentType: ContentType[0].id,
  history: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case RestAction.SET_URL:
      return {
        ...state,
        url: {
          ...state.url,
          value: action.payload,
        },
      };
    case RestAction.SET_METHOD:
      return {
        ...state,
        method: action.payload,
      };
    case RestAction.SET_PARAMS:
      return {
        ...state,
        params: action.payload,
      };
    case RestAction.SET_AUTHORIZATION:
      return {
        ...state,
        authorization: action.payload,
      };
    case RestAction.SET_AUTHORIZATION_TYPE:
      return {
        ...state,
        authorization: {
          ...action.payload.authorization,
          type: action.payload,
        },
      };
    case RestAction.SET_HEADERS:
      return {
        ...state,
        headers: action.payload,
      };
    case RestAction.SET_BODY:
      return {
        ...state,
        body: action.payload,
      };
    case RestAction.SET_CONTENT_TYPE:
      return {
        ...state,
        contentType: action.payload,
      };
    case RestAction.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case RestAction.RESET_STATE:
    default:
      return initialState;
  }
};
