import { uniqueId } from "lodash";

export default class KeyValuePair {
  constructor(key, value, description) {
    this.key = key || "";
    this.value = value || "";
    this.description = description || "";
    this.include = true;
    this.type = "Text";
    this.id = null;
    this.files = [];
  }

  get filled() {
    return Boolean(
      this.key?.length > 0 || this.value?.length > 0 || this.isFile
    );
  }

  get isFile() {
    return Boolean(this.type === "File");
  }

  setUniqueId(prefix) {
    this.id = uniqueId(`${prefix}-`);
    return this;
  }

  setInclude(include) {
    this.include = Boolean(include);
    return this;
  }

  setType(type) {
    this.type = type;
    return this;
  }
}
