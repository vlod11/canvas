import { Injectable } from '@angular/core';
import Konva from 'konva';
import { BehaviorSubject } from 'rxjs';
import { CanvasElement } from 'src/app/modules/canvas/models/interfaces/canvas-elements';

@Injectable({ providedIn: 'root' })
export class ShapesService {

  private readonly shapesSource = new BehaviorSubject<CanvasElement[]>([]);
  private readonly selectedShapeSource = new BehaviorSubject<CanvasElement | undefined>(undefined);

  getElements(): CanvasElement[] {
    return this.shapesSource.getValue();
  }

  readonly shapes$ = this.shapesSource.asObservable();
  readonly selectedShape$ = this.selectedShapeSource.asObservable();

  constructor() { }


  selectShape(elementId: string): void {
    let shapeElements = this.getElements();
    let shapeElement = shapeElements.filter(e => e.id === elementId)[0];

    this.selectedShapeSource.next(shapeElement);
  }

  addShape(element: CanvasElement): void {
    const elements = [...this.getElements(), element];
    this.shapesSource.next(elements);
  }

  updateShape(element: Konva.Shape): void {
    let shapeElements = this.getElements();
    let index = shapeElements.findIndex(s => s.name === element.name());
    let currentElement = shapeElements[index];
    currentElement.name = element.name();
    currentElement.x = element.x();
    currentElement.y = element.y();

    currentElement.addCurrentState();
  }
}
