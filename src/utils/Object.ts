import { List, listOf, toList } from "./List";

type SearchResult = {
  key: string;
  value: string;
};

export default class ObjectExtended {
  constructor(object: { [key: string]: any }) {
    Object.keys(object).forEach((key) => {
      // if (object[key] !== null && typeof object[key] === "object") {
      //   this[key] = new ObjectExtended(object[key]);
      // } else {
      this[key] = object[key];
      // }
    });
  }

  get length(): number {
    return Object.keys(this).length;
  }

  copy(updateValues: { [key: string]: any }): ObjectExtended {
    return Object.keys(updateValues).reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: updateValues[cur],
      }),
      this,
    );
  }

  to(Constructor: new (arg0: this) => any) {
    return new Constructor(this);
  }

  forEach(
    forEachFunction: (value: any, index: number, list: any[]) => void,
  ): void {
    Object.keys(this).forEach(forEachFunction);
  }

  map(
    mapFunction: (value: any, index: number, list: any[]) => List<any>,
  ): List<any> {
    return toList(Object.keys(this).map(mapFunction));
  }

  keys(): List<string> {
    return toList(Object.keys(this));
  }

  values(): List<any> {
    return toList(Object.values(this));
  }

  entries(): List<List<any>> {
    return toList(Object.entries(this));
  }

  freeze(): ObjectExtended {
    return Object.freeze(this);
  }

  isFrozen(): boolean {
    return Object.isFrozen(this);
  }

  includes(
    pairOrKey: { [key: string]: any } | string,
    value?: string,
  ): boolean {
    if (typeof pairOrKey === "object") {
      const key = Object.keys(pairOrKey)[0];
      const value = Object.values[0];
      return this.has(key) && value === this[key];
    } else {
      return this.has(pairOrKey) && value === this[pairOrKey];
    }
  }

  mapKeys(
    mapFunction: (value: string, index: number, list: string[]) => List<any>,
  ): List<any> {
    return toList(Object.keys(this).map(mapFunction));
  }

  mapValues(
    mapFunction: (value: any, index: number, list: string[]) => List<any>,
  ): List<any> {
    return toList(Object.values(this).map(mapFunction));
  }

  mapEntries(
    mapFunction: (
      value: [string, any],
      index: number,
      list: [string, any][],
    ) => List<any>,
  ): List<any> {
    return toList(Object.entries(mapFunction).map(mapFunction));
  }

  has(key: string): boolean {
    return key in this;
  }

  findKey(value: unknown): string | undefined {
    return Object.keys(this).find((key) => {
      if (value && typeof value === "object") {
        return new ObjectExtended(this[key]).equals(new ObjectExtended(value));
      } else {
        return this[key] === value;
      }
    });
  }

  flip(): ObjectExtended {
    const newObject = this.entries().reduce((acc, [key, value]) => {
      return {
        ...acc,
        [value]: key,
      };
    }, {});

    return new ObjectExtended(newObject);
  }

  search(query: string, caseSensitive = false): List<SearchResult> {
    const getResults = (
      object: { [key: string]: any },
      results = listOf<SearchResult>(),
    ) => {
      const keys = Object.keys(object);
      for (const key of keys) {
        if (object[key] && typeof object[key] === "object") {
          getResults(new ObjectExtended(object[key]), results);
        } else {
          if (caseSensitive) {
            const found = (String(object[key]) as string).includes(query);
            if (found) {
              results.push({ key, value: object[key] });
            }
          } else {
            const found = (
              String(object[key]).toLowerCase() as string
            ).includes(query.toLowerCase());
            if (found) {
              results.push({ key, value: object[key] });
            }
          }
        }
      }
      return results;
    };

    return getResults(this);
  }

  exclude(key: string): ObjectExtended {
    return Object.keys(this)
      .filter((thisKey) => thisKey !== key)
      .reduce((acc, cur) => {
        return {
          ...acc,
          [cur]: this[cur],
        };
      }, this);
  }

  plus(object: { [key: string]: any }): ObjectExtended {
    return new ObjectExtended({ ...this, ...object });
  }

  apply(object: { [key: string]: any }): { [key: string]: any } {
    return Object.keys(object).reduce(
      (acc, cur) =>
        object[cur]
          ? {
              ...acc,
              [cur]: object[cur],
            }
          : acc,
      this,
    );
  }

  applyEach(applyFn: (...args: any[]) => any): { [key: string]: any } {
    return Object.keys(this).reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: applyFn(this[cur]),
      }),
      this,
    );
  }

  equals(object: { [key: string]: any }): boolean {
    const thisKeys = this.keys();
    const objectKeys = Object.keys(object);

    if (!object) return false;

    if (thisKeys.length !== objectKeys.length) {
      return false;
    }

    for (const key of thisKeys) {
      if (!(key in object)) {
        return false;
      }

      const isObject =
        this[key] &&
        typeof this[key] === "object" &&
        object[key] &&
        typeof object[key] === "object";

      if (isObject) {
        const newObj = new ObjectExtended(this[key]);
        if (!newObj.equals(object[key])) {
          return false;
        }
      } else if (Array.isArray(this[key]) && Array.isArray(object[key])) {
        if (!arraysEqual(this[key], object[key])) {
          return false;
        }
      } else if (this[key] !== object[key]) {
        return false;
      }
    }

    return true;
  }

  delta(object: { [key: string]: any }): { [key: string]: any } {
    const diff: { [key: string]: any } = {};

    for (const key in object) {
      if (!(key in this)) {
        diff[key] = object[key]; // Key exists in object but not in this
      } else if (Array.isArray(this[key]) && Array.isArray(object[key])) {
        if (!arraysEqual(this[key], object[key])) {
          diff[key] = object[key]; // Arrays are not equal
        }
      } else if (
        typeof this[key] === "object" &&
        typeof object[key] === "object"
      ) {
        const nestedDiff = new ObjectExtended(this[key]).delta(object[key]);
        if (Object.keys(nestedDiff).length > 0) {
          diff[key] = nestedDiff; // Nested objects have differences
        }
      } else if (this[key] !== object[key]) {
        diff[key] = object[key]; // Values are different
      }
    }
    for (const key in this) {
      if (!(key in object)) {
        diff[key] = undefined;
      }
    }

    return diff;
  }
}

const arraysEqual = (arr1: any[], arr2: any[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
};

export function objectOf(object: { [key: string]: any }): ObjectExtended {
  return new ObjectExtended(object);
}
