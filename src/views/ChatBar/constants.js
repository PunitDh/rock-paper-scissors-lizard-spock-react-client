export const Status = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
  MINIMIZED: "MINIMIZED",
};

export const formatDate = (date) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date));
