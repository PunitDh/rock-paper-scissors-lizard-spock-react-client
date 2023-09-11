import prettyBytes from "pretty-bytes";
import { RestAction } from "./actions";
import KeyValuePair from "./models/KeyValuePair";
import { AuthorizationType } from "./sections/request/AuthorizationTab/constants";
import { ContentType } from "./sections/request/BodyTab/constants";
import { DisplayType } from "./sections/response/constants";
import { createKeyValue, updateList } from "./utils";

export const initialState = {
  loading: false,
  request: {
    url: new URL("http://localhost:5000/admin/settings?test=1223"),
    urlDisplay: new URL("http://localhost:5000/admin/settings?test=1223").href,
    isValidUrl: true,
    method: "GET",
    params: [],
    authorization: {
      type: AuthorizationType.NO_AUTH,
      [AuthorizationType.BASIC_AUTH]: {
        username: "",
        password: "",
      },
      [AuthorizationType.BEARER_TOKEN]: {
        prefix: "",
        token: "",
      },
      [AuthorizationType.API_KEY]: {
        key: "",
        value: "",
      },
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
    output: null,
    json: false,
    displayType: DisplayType.PRETTY,
    time: 0,
    size: 0,
  },
  history: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case RestAction.SET_URL:
      try {
        const url = new URL(action.payload);
        const params = [...url.searchParams.entries()].map(([key, value]) =>
          new KeyValuePair(key, value).setInclude(true).setUniqueId("param")
        );
        if (params[params.length - 1]?.filled) {
          params.push(createKeyValue("param"));
        }
        return {
          ...state,
          request: {
            ...state.request,
            url,
            isValidUrl: true,
            urlDisplay: url.href,
            params,
          },
        };
      } catch (e) {
        console.log(e);
        return {
          ...state,
          request: {
            ...state.request,
            url: state.request.url,
            isValidUrl: false,
            urlDisplay: action.payload,
          },
        };
      }
    case RestAction.SET_METHOD:
      return {
        ...state,
        request: {
          ...state.request,
          method: action.payload,
        },
      };
    case RestAction.SET_PARAMS: {
      const params = updateList(state.request.params, action.payload);
      const url = new URL(state.request.url.pathname, state.request.url.origin);
      params.forEach((it) => {
        if (it.key?.length > 0) {
          url.searchParams.append(it.key, it.value);
        }
      });

      return {
        ...state,
        request: {
          ...state.request,
          url,
          urlDisplay: url.href,
          isValidUrl: true,
          params,
        },
      };
    }
    case RestAction.DELETE_PARAMS: {
      const params = state.request.params.filter((it) => {
        state.request.url.searchParams.delete(
          action.payload.key,
          action.payload.value
        );
        return it.id !== action.payload.id;
      });

      return {
        ...state,
        request: {
          ...state.request,
          params,
          urlDisplay: state.request.url.href,
          isValidUrl: true,
        },
      };
    }
    case RestAction.SET_AUTHORIZATION:
      return {
        ...state,
        request: {
          ...state.request,
          authorization: {
            ...state.request.authorization,
            [action.payload.type]: {
              ...state.request.authorization[action.payload.type],
              [action.payload.key]: action.payload.value,
            },
          },
        },
      };
    case RestAction.SET_AUTHORIZATION_TYPE:
      return {
        ...state,
        request: {
          ...state.request,
          authorization: {
            ...state.request.authorization,
            type: action.payload,
          },
        },
      };
    case RestAction.SET_HEADERS: {
      const headers = updateList(state.request.headers, action.payload);
      return {
        ...state,
        request: {
          ...state.request,
          headers,
        },
      };
    }
    case RestAction.DELETE_HEADERS: {
      const headers = state.request.headers.filter(
        (it) => it.id !== action.payload.id
      );
      return {
        ...state,
        request: {
          ...state.request,
          headers,
        },
      };
    }
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
    case RestAction.DELETE_BODY_CONTENT: {
      const updatedList = state.request.body[action.payload.type].filter(
        (it) => it.id !== action.payload.value.id
      );

      if (updatedList.length === 0) {
        updatedList.push(createKeyValue(action.payload.type, true));
      }

      switch (action.payload.type) {
        case ContentType.FORM_DATA:
        case ContentType.FORM_ENCODED:
          return {
            ...state,
            request: {
              ...state.request,
              body: {
                ...state.request.body,
                [action.payload.type]: updatedList,
              },
            },
          };
        case ContentType.JSON:
        case ContentType.XML:
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
      const payload = action.payload;
      const data = payload.data || payload.response.data;
      const headers = payload.headers || payload.response.headers;
      const status = payload.status || payload.response.status;
      const statusText = payload.statusText || payload.response.statusText;
      if (data) {
        const isObject = typeof data === "object";
        const dataLength = isObject
          ? +JSON.stringify(data).length
          : +String(data).length + JSON.stringify(headers).length;
        return {
          ...state,
          response: {
            ...state.response,
            output: data,
            json: isObject,
            status,
            statusText,
            headers,
            size: prettyBytes(dataLength),
          },
        };
      }
      return state;
    }

    case RestAction.SET_RESPONSE_TIME: {
      return {
        ...state,
        response: {
          ...state.response,
          time: action.payload,
        },
      };
    }

    case RestAction.SET_OUTPUT_DISPLAY_TYPE: {
      return {
        ...state,
        response: {
          ...state.response,
          displayType: action.payload,
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
