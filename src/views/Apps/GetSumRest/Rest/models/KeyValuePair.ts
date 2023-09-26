import { uniqueId } from "lodash";
import { FormDataFieldType } from "../constants";

export default class KeyValuePair {
  key: string;
  value: string;
  description: string;
  include: boolean;
  type: FormDataFieldType;
  id: string | null;
  files: FileList | null;

  constructor(key: string = "", value: string = "", description: string = "") {
    this.key = key || "";
    this.value = value || "";
    this.description = description || "";
    this.include = true;
    this.type = FormDataFieldType.TEXT;
    this.id = null;
    this.files = null;
    // this.type =
  }

  get filled(): boolean {
    return Boolean(
      this.key?.length > 0 || this.value?.length > 0 || this.isFile
    );
  }

  get isFile(): boolean {
    return Boolean(this.type === "File");
  }

  setId(id: string): KeyValuePair {
    this.id = id;
    return this;
  }

  setType(type: FormDataFieldType): KeyValuePair {
    this.type = type;
    return this;
  }

  setUniqueId(prefix: string): KeyValuePair {
    this.id = uniqueId(`${prefix}-`);
    return this;
  }

  setInclude(include: boolean): KeyValuePair {
    this.include = Boolean(include);
    return this;
  }
}
