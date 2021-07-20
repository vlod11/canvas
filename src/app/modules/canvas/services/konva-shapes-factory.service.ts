
import { Injectable } from '@angular/core';
import Konva from 'konva';

@Injectable({
  providedIn: 'root'
})
export class KonvaShapesFactoryService {
  counter: number = 1;

  constructor() { }

  circle() {
    return new Konva.Circle({
      id: String(this.counter),
      name: "circle" + this.counter++,
      x: 100,
      y: 100,
      radius: 70,
      stroke: 'black',
      strokeWidth: 2,
      draggable: true
    });
  }

  rectangle() {
    return new Konva.Rect({
      id: String(this.counter),
      name: "rect" ,
      x: 20,
      y: 20,
      width: 100,
      height: 50,
      stroke: 'black',
      strokeWidth: 2,
      draggable: true
    });
  }

  image() {
    var imageObj = new Image();

    imageObj.src = '/assets/green-jobs.png';

    var image = new Konva.Image({
      id: String(this.counter),
      name: "image",
      x: 50,
      y: 50,
      image: imageObj,
      width: 106,
      height: 118,
      draggable: true
    });

    return image;
  }
}
