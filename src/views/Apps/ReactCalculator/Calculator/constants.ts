export const Calc = {
  ANS: "Ans",
  DEG: "Deg",
  OPERATIONS: ["+", "-", "×", "÷", "^"],
} as const;

export const MemoryOperation = {
  ADD: "M+",
  REMOVE: "M-",
  RECALL: "MR",
  CLEAR: "MC",
} as const;
