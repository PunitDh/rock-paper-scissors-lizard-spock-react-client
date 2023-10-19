import { SheetId } from "../types";
import SheetContent from "./SheetContent";

export default class Sheet {
  id: SheetId;
  index: number;
  name: string;
  content: SheetContent;
  initialContent: SheetContent;
  protected: boolean;
  password?: string;

  constructor(
    id: SheetId,
    index: number,
    name: string,
    content: SheetContent,
    initialContent: SheetContent,
    protect: boolean,
    password?: string
  ) {
    this.id = id;
    this.index = index;
    this.name = name;
    this.content = content;
    this.initialContent = initialContent;
    this.protected = protect;
    this.password = password;
  }

  setIndex(index: number): Sheet {
    this.index = index;
    return this;
  }

  setName(name: string): Sheet {
    this.name = name;
    return this;
  }

  setContent(content: SheetContent): Sheet {
    this.content = content;
    return this;
  }

  setProtected(protect: boolean): Sheet {
    this.protected = protect;
    return this;
  }

  setPassword(password: string): Sheet {
    this.password = password;
    return this;
  }
}
