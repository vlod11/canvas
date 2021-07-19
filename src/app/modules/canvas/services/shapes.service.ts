import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CanvasElement } from 'src/app/modules/canvas/models/interfaces/canvas-elements';


@Injectable({ providedIn: 'root' })
export class ShapesService {
  // Make _puppiesSource private so it's not accessible from the outside,
  // expose it as puppies$ observable (read-only) instead.
  // Write to _puppiesSource only through specified store methods below.
  private readonly shapesSource = new BehaviorSubject<CanvasElement[]>([]);

  getElements(): CanvasElement[] {
    return this.shapesSource.getValue();
  }

  // Exposed observable (read-only).
  readonly shapes$ = this.shapesSource.asObservable();

  constructor() {}

  addShapes(element: CanvasElement): void {
    const elements = [...this.getElements(), element];
    this.shapesSource.next(elements);
  }
}
