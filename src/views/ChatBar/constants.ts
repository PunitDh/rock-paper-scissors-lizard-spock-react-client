export enum ChatBoxStatus {
  OPEN,
  CLOSED,
  MINIMIZED,
}

export const formatDate = (date: string | number | Date) =>
  new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(date));
