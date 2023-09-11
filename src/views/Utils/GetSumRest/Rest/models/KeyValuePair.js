import { uniqueId } from "lodash";

export default class KeyValuePair {
  constructor(key, value, description, include, id) {
    this.key = key;
    this.value = value;
    this.description = description;
    this.include = Boolean(include);
    this.type = "Text";
    this.id = id || uniqueId();
    this.files = [];
  }

  get filled() {
    return Boolean(this.key?.length > 0 || this.value?.length > 0);
  }

  get isFile() {
    return Boolean(this.type === "File");
  }

  setId(id) {
    this.id = id;
    return this;
  }

  setInclude(include) {
    this.include = include;
    return this;
  }

  setType(type) {
    this.type = type;
    return this;
  }
}
