import { uniqueId } from "lodash";
import { initialState } from "./reducer";
import KeyValuePair from "./models/KeyValuePair";

export const createKeyValue = (prefix) => {
  return new KeyValuePair().setId(uniqueId(prefix));
};

export const updateList = (currentList, payload) => {
  const index = currentList.findIndex((it) => it.id === payload.id);
  const updatedList = [...currentList];
  updatedList[index] = payload;
  const prefix = currentList[index].id.split("-")[0];
  if (index === currentList.length - 1 && updatedList[index].filled) {
    updatedList.push(createKeyValue(prefix));
  }
  return updatedList;
};

export const initializeState = () => {
  return {
    ...initialState,
    params: [createKeyValue("params-")],
    headers: [createKeyValue("headers-")],
    body: {
      ...initialState.body,
      formData: [createKeyValue("formData-")],
      formEncoded: [createKeyValue("formEncoded-")],
    },
  };
};
