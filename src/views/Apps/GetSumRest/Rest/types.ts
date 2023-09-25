import { RestAction } from "./actions";
import { ContentType } from "./constants";
import Authorization from "./models/Authorization";
import Request from "./models/Request";
import RequestBody from "./models/RequestBody";
import Response from "./models/Response";

export type State = {
  loading: boolean;
  requests: Request[];
  request: Request;
  response: Response;
  history: [];
};

export type Action = {
  type: RestAction;
  payload?: any;
}