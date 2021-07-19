import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { CommandStoreService } from 'src/app/modules/canvas/services/command.service';
import { KonvaJsElementToShapeMapper } from 'src/app/modules/canvas/services/konvajs-to-shape-mapper.service';
import { ShapeService } from 'src/app/modules/canvas/services/shape.service';
import { TextNodeService } from 'src/app/modules/canvas/services/text-node.service';
import { CanvasElement } from 'src/app/modules/canvas/models/interfaces/canvas-elements';

@Component({
  selector: 'app-canvas-grid',
  templateUrl: './canvas-grid.component.html',
  styleUrls: ['./canvas-grid.component.scss']
})
export class CanvasGridComponent implements OnInit {

  shapes: any[] = [];

  shapeElements: CanvasElement[] = [];
  selectedShapeElement: CanvasElement | undefined;

  selectedShape: any;

  stage!: Konva.Stage;
  layer!: Konva.Layer;
  selectedButton: any = {
    'circle': false,
    'rectangle': false,
    'line': false,
    'undo': false,
    'erase': false,
    'text': false
  }
  isPropertiesDisplayed: boolean = false;
  erase: boolean = false;
  transformers: Konva.Transformer[] = [];
  selectionRectangle: Konva.Rect = new Konva.Rect({
    fill: 'rgba(0,0,255,0.5)',
    visible: false,
  });
  transformer = new Konva.Transformer();


  constructor(
    private shapeService: ShapeService,
    private textNodeService: TextNodeService,
    private commandStoreService: CommandStoreService,
    private konvaJsElementToShapeMapper: KonvaJsElementToShapeMapper,
  ) { }

  ngOnInit() {
    let width = window.innerWidth - 160;
    let height = window.innerHeight;
    this.stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    this.addTransformer();

    this.commandStoreService.circle$.subscribe(() =>
    {
      this.clearSelection();
      let shape = this.addCircle();
      this.displayProperties(shape);
    });

    this.commandStoreService.rectangle$.subscribe(() =>
    {
      this.clearSelection();
      let shape = this.addRectangle();
      this.displayProperties(shape);
    });

    this.commandStoreService.image$.subscribe(() =>
    {
      this.clearSelection();
      let shape = this.addImage();
      this.displayProperties(shape);
    });

    this.commandStoreService.text$.subscribe(() =>
    {
      this.clearSelection();
      let shape = this.addText();
      this.displayProperties(shape);
    });
  }


  clearSelection() {
    Object.keys(this.selectedButton).forEach(key => {
      this.selectedButton[key] = false;
    })
  }

  addText(): any {
    const text = this.textNodeService.textNode(this.stage, this.layer);
    this.shapes.push(text.textNode);
    this.transformers.push(text.tr);
  }

  addCircle(): any {
    const circle = this.shapeService.circle();
    this.shapes.push(circle);
    let appCircle = this.konvaJsElementToShapeMapper.getCircle(circle)
    appCircle.addCurrentState();
    this.shapeElements.push(appCircle);

    this.layer.add(circle);
    this.stage.add(this.layer);
    this.addTransformerListeners(circle);

    return circle;
  }


  updateCircle(circle: Konva.Circle) {
    let index = this.shapeElements.findIndex(s => s.name === circle.name());
    let currentElement = this.shapeElements[index];
    currentElement.name = circle.name();
    currentElement.x = circle.x();
    currentElement.y = circle.y();

    currentElement.addCurrentState();
  }

  updateRectangle(circle: Konva.Rect) {
    let index = this.shapeElements.findIndex(s => s.name === circle.name());
    let currentElement = this.shapeElements[index];
    currentElement.name = circle.name();
    currentElement.x = circle.x();
    currentElement.y = circle.y();

    currentElement.addCurrentState();
  }

  updateImage(circle: Konva.Image) {
    let index = this.shapeElements.findIndex(s => s.name === circle.name());
    let currentElement = this.shapeElements[index];
    currentElement.name = circle.name();
    currentElement.x = circle.x();
    currentElement.y = circle.y();

    currentElement.addCurrentState();
  }

  updateText(circle: Konva.Text) {
    let index = this.shapeElements.findIndex(s => s.name === circle.name());
    let currentElement = this.shapeElements[index];
    currentElement.name = circle.name();
    currentElement.x = circle.x();
    currentElement.y = circle.y();

    currentElement.addCurrentState();
  }

  addImage(): any {
    const image = this.shapeService.image();
    this.shapes.push(image);
    this.layer.add(image);
    this.stage.add(this.layer);
    this.addTransformerListeners(image);

    return image;
  }

  addRectangle(): any {
    const rectangle = this.shapeService.rectangle();
    this.shapes.push(rectangle);
    let appCircle = this.konvaJsElementToShapeMapper.getRectangle(rectangle)
    appCircle.addCurrentState();
    this.shapeElements.push(appCircle);

    this.layer.add(rectangle);
    this.stage.add(this.layer);
    this.addTransformerListeners(rectangle);

    return rectangle;
  }


  addTransformer() {
    this.layer.add(this.selectionRectangle);
    this.layer.add(this.transformer);
  }

  addTransformerListeners(shape: any) {
    this.transformer.nodes([shape]);
    // clicks should select/deselect shapes
    this.stage.on('click tap', (e) => {
      // if we are selecting with rect, do nothing
      if (this.selectionRectangle.visible()) {
        return;
      }

      // if click on empty area - remove all selections
      if (e.target === this.stage) {
        this.transformer.nodes([]);
        this.isPropertiesDisplayed = false;

        return;
      }

      // // do nothing if clicked NOT on our rectangles
      // if (!e.target.hasName('rect')) {
      //   return;
      // }

      // do we pressed shift or ctrl?
      const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
      const isSelected = this.transformer.nodes().indexOf(e.target) >= 0;

      if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        let selectedShape = e.target;
        this.transformer.nodes([selectedShape]);
        this.displayProperties(selectedShape);
      } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = this.transformer.nodes().slice(); // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(e.target), 1);
        this.transformer.nodes(nodes);
      } else if (metaPressed && !isSelected) {
        // add the node into selection
        const nodes = this.transformer.nodes().concat([e.target]);
        this.transformer.nodes(nodes);
      }
    });

    this.stage.on('dragstart', function (e) {
      console.log('dragstart');
    });

    // and core function - drawing
    this.stage.on('dragend', (e) => {
      let shape = e.target;

      if (shape instanceof Konva.Circle) {
        this.updateCircle(e.target as Konva.Circle);
      }
      if (shape instanceof Konva.Rect) {
        this.updateRectangle(e.target as Konva.Rect);
      }
      if (shape instanceof Konva.Image) {
        this.updateImage(e.target as Konva.Image);
      }
      if (shape instanceof Konva.Text) {
        this.updateText(e.target as Konva.Text);
      }

      console.log('dragend');
    });
  }

  displayProperties(selectedShape: any) {
    this.isPropertiesDisplayed = true;
    this.selectedShape = selectedShape;
    this.selectedShapeElement = this.shapeElements.filter(s => s.name === selectedShape.name())[0];
  }
}
