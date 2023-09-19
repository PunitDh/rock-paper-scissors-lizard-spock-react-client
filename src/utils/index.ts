import { Status } from "./constants";

export function isSuccess(response: {
  status: Status;
  payload: unknown;
}): Promise<unknown> {
  return new Promise((resolve, reject) =>
    ![Status.ERROR, Status.UNAUTHORIZED].includes(response.status)
      ? resolve(response.payload)
      : reject(response.payload)
  );
}

export const formatDate = (date: string | number | Date): string =>
  new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(new Date(date));

export const isNumber = (value: unknown): boolean =>
  typeof value === "number" ||
  (typeof value === "string" && /^-?\d*\.?\d+$/.test(value));

export const isFalsy = (value: unknown): boolean =>
  value === undefined || value === null || value === false;

export const isString = (value: unknown): boolean =>
  typeof value === "string" || value instanceof String;

export const isObject = (value: unknown): boolean =>
  Boolean(value && typeof value === "object");

type Class = { new (...args: any[]): any };

export const isInstance = (value: unknown, clazz: Class): boolean =>
  Boolean(isObject(value) && value instanceof clazz);

export const isBoolean = (value: unknown): boolean =>
  typeof value === "boolean";
