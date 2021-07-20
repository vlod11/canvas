import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { CanvasElement } from 'src/app/modules/canvas/models/interfaces/canvas-elements';
import { CommandStoreService } from 'src/app/modules/canvas/services/command.service';
import { KonvaShapesFactoryService } from 'src/app/modules/canvas/services/konva-shapes-factory.service';
import { KonvaJsElementToShapeMapper } from 'src/app/modules/canvas/services/konvajs-to-shape-mapper.service';
import { ShapesService } from 'src/app/modules/canvas/services/shapes.service';
import { TextNodeService } from 'src/app/modules/canvas/services/text-node.service';

@Component({
  selector: 'app-canvas-grid',
  templateUrl: './canvas-grid.component.html',
  styleUrls: ['./canvas-grid.component.scss']
})
export class CanvasGridComponent implements OnInit {

  shapes: any[] = [];

  selectedShapeElement: CanvasElement | undefined;

  selectedShape: any;

  stage!: Konva.Stage;
  layer!: Konva.Layer;

  isPropertiesDisplayed: boolean = false;
  erase: boolean = false;
  transformers: Konva.Transformer[] = [];
  selectionRectangle: Konva.Rect = new Konva.Rect({
    fill: 'rgba(0,0,255,0.5)',
    visible: false,
  });
  transformer = new Konva.Transformer();


  constructor(
    private shapeService: KonvaShapesFactoryService,
    private shapesService: ShapesService,
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

    this.commandStoreService.circle$.subscribe(() => {
      let shape = this.addCircle();
      this.displayProperties(shape);
    });

    this.commandStoreService.rectangle$.subscribe(() => {
      let shape = this.addRectangle();
      this.displayProperties(shape);
    });

    this.commandStoreService.image$.subscribe(() => {
      let shape = this.addImage();
      this.displayProperties(shape);
    });

    this.commandStoreService.text$.subscribe(() => {
      let shape = this.addText();
      this.displayProperties(shape);
    });

    this.shapesService.selectedShape$.subscribe((s) => {
      this.selectedShapeElement = s;
    });
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
    this.shapesService.addShape(appCircle);

    this.layer.add(circle);
    this.stage.add(this.layer);
    this.addTransformerListeners(circle);

    return circle;
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
    this.shapesService.addShape(appCircle);

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


      const isSelected = this.transformer.nodes().indexOf(e.target) >= 0;

      if (!isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        let selectedShape = e.target;
        this.transformer.nodes([selectedShape]);

        if (selectedShape instanceof Konva.Shape) {
          this.displayProperties(selectedShape);
        }
      }
    });

    this.stage.on('dragstart', function (e) {
      console.log('dragstart');
    });

    // and core function - drawing
    this.stage.on('dragend', (e) => {
      let shape = e.target;

      if (shape instanceof Konva.Circle) {
        this.shapesService.updateShape(e.target as Konva.Circle);
      }
      if (shape instanceof Konva.Rect) {
        this.shapesService.updateShape(e.target as Konva.Rect);
      }
      if (shape instanceof Konva.Image) {
        this.shapesService.updateShape(e.target as Konva.Image);
      }
      if (shape instanceof Konva.Text) {
        this.shapesService.updateShape(e.target as Konva.Text);
      }

      console.log('dragend');
    });
  }

  displayProperties(selectedShape: Konva.Shape) {
    this.isPropertiesDisplayed = true;
    this.selectedShape = selectedShape;
    let id = selectedShape.id();
    this.shapesService.selectShape(id);
  }
}
