import { RestAction } from "./actions";
import { ContentType, ContentTypeMenuItems } from "./sections/request/BodyTab/constants";
import { updateList } from "./utils";

export const initialState = {
  // input: "4sin(90)+8cos(10)+9tan(80)+4log(4)+2.5ln(5)+24atan(4)+14Ans+14E-4π-2√3",
  url: {
    value:
      "https://rpscls-punitdh-api-b70261e87515.herokuapp.com/admin/settings",
    variables: [],
    display:
      "https://rpscls-punitdh-api-b70261e87515.herokuapp.com/admin/settings",
  },
  loading: false,
  method: "GET",
  params: [],
  authorization: {
    type: null,
  },
  headers: [],
  body: {
    json: {
      id: "6209c3403ebaa300084cec22",
      batchId: "6209c3403ebaa300084cec21",
      mimeType: "application/pdf",
      platformCode: "Aggregated",
      accountNumber: 16783845,
      reportKey: "PDF_PORTFOLIO_SUMMARY_AGGREGATED",
      test: null,
    },
    formData: [],
    formEncoded: [],
    xml: "",
  },
  contentType: ContentType.NONE,
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
      const params = updateList(state.params, action.payload);
      return {
        ...state,
        params,
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
      const headers = updateList(state.headers, action.payload);
      return {
        ...state,
        headers,
      };
    case RestAction.SET_BODY_CONTENT: {
      switch (action.payload.type) {
        case ContentType.JSON:
        case ContentType.XML:
          return {
            ...state,
            body: {
              ...state.body,
              json: action.payload.value,
            },
          };
        case ContentType.FORM_DATA:
        case ContentType.FORM_ENCODED:
          const updated = updateList(
            state.body[action.payload.type],
            action.payload.value
          );
          return {
            ...state,
            body: {
              ...state.body,
              [action.payload.type]: updated,
            },
          };
        case ContentType.NONE:
        default:
          return state;
      }
    }
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
