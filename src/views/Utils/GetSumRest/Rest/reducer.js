import { RestAction } from "./actions";
import { AuthorizationType } from "./sections/request/AuthorizationTab/constants";
import { ContentType } from "./sections/request/BodyTab/constants";
import { updateList } from "./utils";

export const initialState = {
  loading: false,
  request: {
    url: {
      value: "http://localhost:5000/admin/settings",
      variables: [],
      display: "http://localhost:5000/admin/settings",
    },
    method: "GET",
    params: [],
    authorization: {
      type: AuthorizationType.NO_AUTH,
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
  },
  response: {
    output: {},
    json: true,
  },
  history: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case RestAction.SET_URL:
      return {
        ...state,
        request: {
          ...state.request,
          url: {
            ...state.request.url,
            value: action.payload,
          },
        },
      };
    case RestAction.SET_METHOD:
      return {
        ...state,
        request: {
          ...state.request,
          method: action.payload,
        },
      };
    case RestAction.SET_PARAMS:
      const params = updateList(state.request.params, action.payload);
      return {
        ...state,
        request: {
          ...state.request,
          params,
        },
      };
    case RestAction.SET_AUTHORIZATION:
      return {
        ...state,
        request: {
          ...state.request,
          authorization: action.payload,
        },
      };
    case RestAction.SET_AUTHORIZATION_TYPE:
      return {
        ...state,
        request: {
          ...state.request,
          authorization: {
            ...action.payload.authorization,
            type: action.payload,
          },
        },
      };
    case RestAction.SET_HEADERS:
      const headers = updateList(state.request.headers, action.payload);
      return {
        ...state,
        request: {
          ...state.request,
          headers,
        },
      };
    case RestAction.SET_BODY_CONTENT: {
      switch (action.payload.type) {
        case ContentType.JSON:
        case ContentType.XML:
          return {
            ...state,
            request: {
              ...state.request,
              body: {
                ...state.request.body,
                [action.payload.type]: action.payload.value,
              },
            },
          };
        case ContentType.FORM_DATA:
        case ContentType.FORM_ENCODED:
          const updated = updateList(
            state.request.body[action.payload.type],
            action.payload.value
          );
          return {
            ...state,
            request: {
              ...state.request,
              body: {
                ...state.request.body,
                [action.payload.type]: updated,
              },
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
        request: {
          ...state.request,
          contentType: action.payload,
        },
      };

    case RestAction.SET_OUTPUT: {
      return {
        ...state,
        response: {
          output: action.payload.data,
          json: typeof action.payload.data === "object",
        },
      };
    }
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
