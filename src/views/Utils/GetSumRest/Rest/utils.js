import { uniqueId } from "lodash";
import { initialState } from "./reducer";
import KeyValuePair from "./models/KeyValuePair";

export const createKeyValue = (prefix, include = true) => {
  return new KeyValuePair().setId(uniqueId(`${prefix}-`)).setInclude(include);
};

export const updateList = (currentList, payload) => {
  const index = currentList.findIndex((it) => it.id === payload.id);
  const updatedList = [...currentList];
  updatedList[index] = payload;
  const prefix = currentList[index].id.split("-")[0];
  if (index === currentList.length - 1 && updatedList[index].filled) {
    updatedList.push(createKeyValue(prefix, true));
  }
  return updatedList;
};

export const initializeState = () => {
  return {
    ...initialState,
    request: {
      ...initialState.request,
      params: [createKeyValue("params")],
      headers: [createKeyValue("headers")],
      body: {
        ...initialState.request.body,
        formData: [createKeyValue("formData")],
        formEncoded: [createKeyValue("formEncoded")],
      },
    },
  };
};
