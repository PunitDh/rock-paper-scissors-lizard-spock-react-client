import { uniqueId } from "lodash";

export default class KeyValuePair {
  constructor(key, value, description, include, id) {
    this.key = key;
    this.value = value;
    this.description = description;
    this.include = Boolean(include);
    this.id = id || uniqueId();
  }

  get filled() {
    return Boolean(this.key?.length > 0 || this.value?.length > 0);
  }

  setId(id) {
    this.id = id;
    return this;
  }
}
