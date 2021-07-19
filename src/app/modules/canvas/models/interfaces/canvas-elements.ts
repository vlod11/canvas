import { CanvasElementState } from 'src/app/modules/canvas/models/interfaces/canvas-element-state';

export interface CanvasElement {
  name: string;
  x: number;
  y: number;
  states: CanvasElementState[];
  addCurrentState(): void;
}

