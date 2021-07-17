
import { Injectable } from '@angular/core';
import Konva from 'konva';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {

  constructor() { }

  circle() {
    return new Konva.Circle({
      name: "circle",
      x: 100,
      y: 100,
      radius: 70,
      stroke: 'black',
      strokeWidth: 2,
      draggable: true
    });
  }

  line(pos: any, mode: string = 'brush') {
    return new Konva.Line({
      stroke: 'red',
      strokeWidth: 2,
      globalCompositeOperation:
        mode === 'brush' ? 'source-over' : 'destination-out',
      points: [pos.x, pos.y],
      draggable: false
    });
  }

  rectangle() {
    return new Konva.Rect({
      name: "rect",
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
