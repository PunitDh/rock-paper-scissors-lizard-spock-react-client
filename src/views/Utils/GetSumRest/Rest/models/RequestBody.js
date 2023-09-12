import { createKeyValuePair } from "../utils";

export default class RequestBody {
  constructor(obj = {}) {
    this.json = obj.json || {};
    this.formData = obj.formData || [createKeyValuePair("formData")];
    this.formEncoded = obj.formEncoded || [createKeyValuePair("formEncoded")];
    this.xml = obj.xml || "";
  }

  setJson(json) {
    this.json = json;
    return this;
  }

  addField(field, keyValuePair) {
    this[field].push(keyValuePair);
    return this;
  }

  removeField(field, keyValuePair) {
    this[field].filter((it) => it.id !== keyValuePair.id);
    if (this[field].length === 0) {
      this[field].push(createKeyValuePair(field));
    }
    return this;
  }
}
