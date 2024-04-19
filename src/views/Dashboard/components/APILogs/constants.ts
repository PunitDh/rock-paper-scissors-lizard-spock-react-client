export const limits = [50, 100, 200] as const;

export const times = [
  {
    label: "ALL",
    value: 0,
  },
  {
    label: "Last 15 mins",
    value: 15 * 60 * 1000,
  },
  {
    label: "Last 1 hour",
    value: 3600 * 1000,
  },
  {
    label: "Last 1 day",
    value: 3600 * 1000 * 24,
  },
] as const;

export type LogType = "ALL" | "INFO" | "ERROR" | "WARN";

export const logTypes = ["ALL", "INFO", "ERROR", "WARN"] as const;
