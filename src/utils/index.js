export const Status = {
  SUCCESS: "success",
  ERROR: "error",
  UNAUTHORIZED: "unauthorized",
};

export function isSuccess(response) {
  return new Promise((resolve, reject) => {
    return response.status === Status.SUCCESS
      ? resolve(response.payload)
      : reject(response.payload);
  });
}
