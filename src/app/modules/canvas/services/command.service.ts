import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CommandStoreService {
  // Make _puppiesSource private so it's not accessible from the outside,
  // expose it as puppies$ observable (read-only) instead.
  // Write to _puppiesSource only through specified store methods below.
  private readonly _addCircleSource = new Subject<void>();
  private readonly _addRectangleSource = new Subject<void>();
  private readonly _addImageSource = new Subject<void>();
  private readonly _addTextSource = new Subject<void>();


  // Exposed observable (read-only).
  readonly circle$ = this._addCircleSource.asObservable();
  readonly rectangle$ = this._addRectangleSource.asObservable();
  readonly image$ = this._addImageSource.asObservable();
  readonly text$ = this._addTextSource.asObservable();

  constructor() {}


  addCircle(): void {
    this._addCircleSource.next();
  }

  addRectangle(): void {
    this._addRectangleSource.next();
  }

  addImage(): void {
    this._addImageSource.next();
  }

  addText(): void {
    this._addTextSource.next();
  }


}
