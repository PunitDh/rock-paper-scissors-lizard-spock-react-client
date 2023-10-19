import { PickerAction } from "./actions";

export type State = {
  maxCarat: number;
  carat: number;
  context: CanvasRenderingContext2D | null;
  rgb: RGB;
  rect: DOMRect | null;
};

export type Action = {
  type: PickerAction;
  payload?: any;
}

export type RGB = {
  r: number;
  g: number;
  b: number;
};
