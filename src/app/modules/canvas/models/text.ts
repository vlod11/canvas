import { CanvasElement, CanvasElementState } from 'src/app/modules/canvas/models/interfaces/canvas-elements';

export class CanvasText implements CanvasElement {
  name: string;
  x: number;
  y: number;
  states: CanvasElementState[] = [];

  addCurrentState(): void {
    this.states.push({
      name: this.name,
      x: this.x,
      y: this.y
    })
  };

  constructor(name: string, x: number, y: number) {
    this.name = name;
    this.x = x;
    this.y = y;
  }
}
