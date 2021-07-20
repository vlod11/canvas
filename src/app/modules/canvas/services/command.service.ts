import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CommandStoreService {

  private readonly addCircleSource = new Subject<void>();
  private readonly addRectangleSource = new Subject<void>();
  private readonly addImageSource = new Subject<void>();
  private readonly addTextSource = new Subject<void>();

  readonly circle$ = this.addCircleSource.asObservable();
  readonly rectangle$ = this.addRectangleSource.asObservable();
  readonly image$ = this.addImageSource.asObservable();
  readonly text$ = this.addTextSource.asObservable();

  constructor() {}

  addCircle(): void {
    this.addCircleSource.next();
  }

  addRectangle(): void {
    this.addRectangleSource.next();
  }

  addImage(): void {
    this.addImageSource.next();
  }

  addText(): void {
    this.addTextSource.next();
  }


}
