export interface CanvasElement {
  name: string;
  x: number;
  y: number;
  states?: CanvasElementState[];
}

export interface CanvasElementState {
  name: string;
  x: number;
  y: number;
}
