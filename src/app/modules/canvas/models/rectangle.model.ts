import { CanvasElementState } from 'src/app/modules/canvas/models/interfaces/canvas-element-state';
import { CanvasElement } from 'src/app/modules/canvas/models/interfaces/canvas-elements';

export class Rectangle implements CanvasElement {
  id: string;
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

  constructor(id: string, name: string, x: number, y: number) {
    this.id = id
    this.name = name;
    this.x = x;
    this.y = y;
  }
}
