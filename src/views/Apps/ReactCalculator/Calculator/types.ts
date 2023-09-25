import { CalculatorAction } from "./actions";

export type State = {
  // input: "4sin(90)+8cos(10)+9tan(80)+4log(4)+2.5ln(5)+24atan(4)+14Ans+14E-4π-2√3",
  input: string[];
  output: number;
  graph: {
    coords: Coord[];
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
  };
  evaled: boolean;
  degrees: boolean;
  inverse: boolean;
  answer: number;
  parsedInput: string;
  memory: {
    M1: Memory;
    M2: Memory;
    M3: Memory;
    M4: Memory;
    M5: Memory;
    M6: Memory;
    M7: Memory;
    M8: Memory;
  };
  history: HistoryItem[];
};

export type Coord = {
  x: number;
  y: number;
};

export type Memory = {
  value: number;
  filled: boolean;
};

export type HistoryItem = {
  input: string[];
  output: string;
};

export type Action = {
  type: CalculatorAction;
  payload?: any;
};

export type Output = {
  value: string;
  values: Coord[];
  parsedInput: any;
  error: boolean;
};

export type Address = {
  address: string;
  value: string;
};
