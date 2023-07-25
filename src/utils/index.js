export function isSuccess(response) {
  return new Promise((resolve, reject) => {
    return response.status === "success"
      ? resolve(response.payload)
      : reject(response.payload);
  });
}
