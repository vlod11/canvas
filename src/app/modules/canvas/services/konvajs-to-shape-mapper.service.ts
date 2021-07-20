
import { Injectable } from '@angular/core';
import Konva from 'konva';
import { Circle } from 'src/app/modules/canvas/models/circle.model';
import { CanvasImage } from 'src/app/modules/canvas/models/image.model';
import { Rectangle } from 'src/app/modules/canvas/models/rectangle.model';
import { CanvasText } from 'src/app/modules/canvas/models/text.model';

@Injectable({
  providedIn: 'root'
})
export class KonvaJsElementToShapeMapper {

  constructor() { }

  getCircle(element: Konva.Circle) {
    return new Circle(
      element.id(),
      element.name(),
      element.x(),
      element.y()
    );
  }

  getRectangle(element: Konva.Rect) {
    return new Rectangle(
      element.id(),
      element.name(),
      element.x(),
      element.y()
    );
  }

  getImage(element: Konva.Image) {
    return new CanvasImage(
      element.name(),
      element.x(),
      element.y()
    );
  }

  getText(element: Konva.Text) {
    return new CanvasText(
      element.id(),
      element.name(),
      element.x(),
      element.y()
    );
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
