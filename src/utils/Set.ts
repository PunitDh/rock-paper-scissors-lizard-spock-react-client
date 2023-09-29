import { List, toList } from "./List";

export default class SetExtended<T> extends Set<T> {
  get length() {
    return this.size;
  }

  first(): T {
    return this.toList().first();
  }

  second(): T {
    return this.toList().second();
  }

  last(): T {
    return this.toList().last();
  }

  sort(sortFunction: ((a: T, b: T) => number) | undefined): SetExtended<T> {
    return this.toList().sort(sortFunction).toSetExtended();
  }

  addAll(array: Array<T>): SetExtended<T> {
    array.forEach((element) => {
      this.add(element);
    });
    return this;
  }

  mergeWith(set: Set<T> | SetExtended<T>): SetExtended<T> {
    set.forEach((element) => {
      this.add(element);
    });
    return this;
  }

  toArray(): Array<T> {
    return Array.from(this);
  }

  toList(): List<T> {
    return new List(...this);
  }

  filter(
    filterFn: (value: T, index: number, array: List<T>) => boolean
  ): SetExtended<T> {
    return toList(
      this.toArray().filter((value, index, array) =>
        filterFn(value, index, toList(array))
      )
    ).toSetExtended();
  }

  find(
    findFn: (value: T, index: number, array: List<T>) => boolean
  ): T | undefined {
    return this.toArray().find((value, index, array) =>
      findFn(value, index, toList(array))
    );
  }
}

export function setOf<T>(...args: any[]): SetExtended<T> {
  return new SetExtended(...args);
}
