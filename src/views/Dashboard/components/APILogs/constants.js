export const limits = Object.freeze([50, 100, 200]);

export const times = Object.freeze([
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
]);

export const logTypes = Object.freeze(["ALL", "INFO", "ERROR", "WARN"]);
