export const Status = {
  SUCCESS: "success",
  ERROR: "error",
  UNAUTHORIZED: "unauthorized",
};

export function isSuccess(response) {
  return new Promise((resolve, reject) =>
    ![Status.ERROR, Status.UNAUTHORIZED].includes(response.status)
      ? resolve(response.payload)
      : reject(response.payload)
  );
}

export const formatDate = (date) =>
  new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).format(new Date(date));

export const isNumber = (value) => {
  return (
    typeof value === "number" ||
    (typeof value === "string" && /^-?\d*\.?\d+$/.test(value))
  );
};

export const isFalsy = (value) => {
  return value === undefined || value === null || value === false;
};

export const isString = (value) => {
  return typeof value === "string" || value instanceof String;
};

export const isObject = (value) => {
  return value && typeof value === "object";
};

export const isInstance = (value, clazz) => {
  return isObject(value) && value instanceof clazz;
};

export const isBoolean = (value) => {
  return typeof value === "boolean";
};
