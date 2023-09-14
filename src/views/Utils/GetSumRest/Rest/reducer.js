import { RestAction } from "./actions";
import {
  APIKeyAddTo,
  ContentType,
  DisplayType,
  KeyValuePairType,
} from "./constants";
import Authorization from "./models/Authorization";
import KeyValuePair from "./models/KeyValuePair";
import Request from "./models/Request";
import RequestBody from "./models/RequestBody";
import Response from "./models/Response";
import { createBlankKeyValuePair, updateList } from "./utils";

export const initialState = {
  loading: false,
  requests: [new Request()],
  request: new Request({
    // url: new URL(
    //   "https://rpscls-punitdh-api-b70261e87515.herokuapp.com/admin/settings"
    // ),
    // urlDisplay: new URL(
    //   "https://rpscls-punitdh-api-b70261e87515.herokuapp.com/admin/settings"
    // ).href,
    url: new URL("http://localhost:5000/admin/settings"),
    urlDisplay: new URL("http://localhost:5000/admin/settings").href,
    // url: new URL(
    //   "https://jsonplaceholder.typicode.com/todos/"
    // ),
    // urlDisplay: new URL(
    //   "https://jsonplaceholder.typicode.com/todos/"
    // ).href,
    isValidUrl: true,
    authorization: new Authorization(),
    body: new RequestBody({
      json: {
        id: "6209c3403ebaa300084cec22",
        batchId: "6209c3403ebaa300084cec21",
        mimeType: "application/pdf",
        platformCode: "Aggregated",
        accountNumber: 16783845,
        reportKey: "PDF_PORTFOLIO_SUMMARY_AGGREGATED",
        test: null,
      },
    }),
    contentType: ContentType.NONE,
  }),
  response: new Response({
    output: null,
    json: false,
    displayType: DisplayType.PRETTY,
    time: 0,
    size: 0,
    error: false,
  }),
  history: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case RestAction.SET_URL:
      try {
        const url = new URL(action.payload);
        const params = [...url.searchParams.entries()].map(([key, value]) =>
          new KeyValuePair(key, value)
            .setInclude(true)
            .setUniqueId(KeyValuePairType.PARAM)
        );
        if (params[params.length - 1]?.filled) {
          params.push(createBlankKeyValuePair(KeyValuePairType.PARAM));
        }
        return {
          ...state,
          request: state.request
            .setUrl(url)
            .setIsValidUrl(true)
            .setUrlDisplay(url.href)
            .setParams(params),
        };
      } catch (e) {
        return {
          ...state,
          request: state.request
            .setUrl(action.payload)
            .setIsValidUrl(false)
            .setUrlDisplay(action.payload),
        };
      }

    case RestAction.SET_REQUEST_NAME:
      return {
        ...state,
        request: state.request.setName(action.payload),
      };

    case RestAction.SET_METHOD:
      return {
        ...state,
        request: state.request.setMethod(action.payload),
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
        request: state.request
          .setUrl(url)
          .setUrlDisplay(url.href)
          .setIsValidUrl(true)
          .setParams(params),
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

      if (params.length === 0) {
        params.push(createBlankKeyValuePair(KeyValuePairType.PARAM));
      }

      return {
        ...state,
        request: state.request
          .setParams(params)
          .setUrlDisplay(state.request.url.href)
          .setIsValidUrl(true),
      };
    }
    case RestAction.SET_AUTHORIZATION:
      return {
        ...state,
        request: state.request.setAuthorization({
          ...state.request.authorization,
          [action.payload.type]: {
            ...state.request.authorization[action.payload.type],
            [action.payload.key]: action.payload.value,
          },
        }),
      };
    case RestAction.SET_AUTHORIZATION_TYPE: {
      return {
        ...state,
        request: state.request.setAuthorization({
          ...state.request.authorization,
          type: action.payload,
        }),
      };
    }
    case RestAction.SET_HEADERS: {
      const headers = updateList(state.request.headers, action.payload);
      return {
        ...state,
        request: state.request.setHeaders(headers),
      };
    }
    case RestAction.DELETE_HEADERS: {
      const headers = state.request.headers.filter(
        (it) => it.id !== action.payload.id
      );

      if (headers.length === 0) {
        headers.push(createBlankKeyValuePair(KeyValuePairType.HEADER));
      }

      return {
        ...state,
        request: state.request.setHeaders(headers),
      };
    }
    case RestAction.SET_BODY_CONTENT: {
      switch (action.payload.type) {
        case ContentType.JSON:
        case ContentType.XML:
          return {
            ...state,
            request: state.request.setBody({
              ...state.request.body,
              [action.payload.type]: action.payload.value,
            }),
          };
        case ContentType.FORM_DATA:
        case ContentType.FORM_ENCODED:
          const updated = updateList(
            state.request.body[action.payload.type],
            action.payload.value
          );
          return {
            ...state,
            request: state.request.setBody({
              ...state.request.body,
              [action.payload.type]: updated,
            }),
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
        updatedList.push(createBlankKeyValuePair(action.payload.type, true));
      }

      switch (action.payload.type) {
        case ContentType.FORM_DATA:
        case ContentType.FORM_ENCODED:
          return {
            ...state,
            request: state.request.setBody({
              ...state.request.body,
              [action.payload.type]: updatedList,
            }),
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
        request: state.request.setContentType(action.payload),
      };

    case RestAction.SET_RESPONSE: {
      return {
        ...state,
        response: new Response({
          ...state.response,
          ...action.payload,
        }),
      };
    }

    case RestAction.SET_RESPONSE_TIME: {
      return {
        ...state,
        response: state.response.setTime(action.payload),
      };
    }

    case RestAction.SET_OUTPUT_DISPLAY_TYPE: {
      return {
        ...state,
        response: state.response.setDisplayType(action.payload),
      };
    }
    case RestAction.RESET_STATE:
    default:
      return initialState;
  }
};
