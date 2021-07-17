import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { ShapeService } from 'src/app/core/services/shape.service';
import { TextNodeService } from 'src/app/core/services/text-node.service';
import { CanvasElement } from 'src/app/models/canvas-elements';

@Component({
  selector: 'app-canvas-grid',
  templateUrl: './canvas-grid.component.html',
  styleUrls: ['./canvas-grid.component.scss']
})
export class CanvasGridComponent implements OnInit {

  shapes: any[] = [];

  selectedMenuItem: any;

  menuItems: any[] = [
    {
      name: "Draw",
      isSelected: true
    },
    {
      name: "Elements",
      isSelected: false
    }
  ];
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
  properties: boolean = false;
  erase: boolean = false;
  transformers: Konva.Transformer[] = [];
  selectionRectangle: Konva.Rect = new Konva.Rect({
    fill: 'rgba(0,0,255,0.5)',
    visible: false,
  });
  transformer = new Konva.Transformer();


  constructor(
    private shapeService: ShapeService,
    private textNodeService: TextNodeService
  ) { }

  ngOnInit() {
    let width = window.innerWidth * 0.9;
    let height = window.innerHeight;
    this.stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height
    });
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this.addLineListeners();

    this.addTransformer();
  }

  setSelectedMenuItem(item: any) {
    this.selectedMenuItem = item;
  }

  setSelection(type: string) {
    this.selectedButton[type] = true;
  }

  clearSelection() {
    Object.keys(this.selectedButton).forEach(key => {
      this.selectedButton[key] = false;
    })
  }

  addShape(type: string) {
    this.clearSelection();
    this.setSelection(type);
    if (type == 'circle') {
      this.addCircle();
    }
    else if (type == 'line') {
      this.addLine();
    }
    else if (type == 'rectangle') {
      this.addRectangle();
    }
    else if (type == 'text') {
      this.addText();
    } else if (type == 'image') {
      this.addImage();
    }
  }

  addText() {
    const text = this.textNodeService.textNode(this.stage, this.layer);
    this.shapes.push(text.textNode);
    this.transformers.push(text.tr);
  }

  addCircle() {
    const circle = this.shapeService.circle();
    this.shapes.push(circle);
    this.layer.add(circle);
    this.stage.add(this.layer);
    this.addTransformerListeners(circle);
  }

  addImage() {
    const image = this.shapeService.image();
    this.shapes.push(image);
    this.layer.add(image);
    this.stage.add(this.layer);
    this.addTransformerListeners(image);
  }

  addRectangle() {
    const rectangle = this.shapeService.rectangle();
    this.shapes.push(rectangle);
    this.layer.add(rectangle);
    this.stage.add(this.layer);
    this.addTransformerListeners(rectangle);
  }

  addLine() {
    this.selectedButton['line'] = true;
  }

  addLineListeners() {
    const component = this;
    let lastLine: any;
    let isPaint: any;
    this.stage.on('mousedown touchstart', function (e) {
      if (!component.selectedButton['line'] && !component.erase) {
        return;
      }
      isPaint = true;
      let pos = component.stage.getPointerPosition();
      const mode = component.erase ? 'erase' : 'brush';
      lastLine = component.shapeService.line(pos, mode)
      component.shapes.push(lastLine);
      component.layer.add(lastLine);
    });
    this.stage.on('mouseup touchend', function () {
      isPaint = false;
    });
    // and core function - drawing
    this.stage.on('mousemove touchmove', function () {
      if (!isPaint) {
        return;
      }
      const position: any = component.stage.getPointerPosition();
      var newPoints = lastLine.points().concat([position.x, position.y]);
      lastLine.points(newPoints);
      component.layer.batchDraw();
    });
  }

  helloWorld() {
    alert('Hello world!');
  }

  undo() {
    const removedShape = this.shapes.pop();
    this.transformers.forEach(t => {
      t.detach();
    });
    if (removedShape) {
      removedShape.remove();
    }
    this.layer.draw();
  }

  addTransformer() {
    this.layer.add(this.selectionRectangle);
    this.layer.add(this.transformer);
  }

  addTransformerListeners(shape: any) {


    this.transformer.nodes([shape]);
    // this.stage.on('click', function (e) {
    //   if (!this.clickStartShape) {
    //     return;
    //   }
    //   if (e.target._id == this.clickStartShape._id) {
    //     component.addDeleteListener(e.target);
    //     component.layer.add(tr);
    //     tr.attachTo(e.target);
    //     component.transformers.push(tr);
    //     component.layer.draw();
    //   }
    //   else {
    //     tr.detach();
    //     component.layer.draw();
    //   }
    // });

    // let x1: any, y1: any, x2: any, y2: any;
    // this.stage.on('mousedown touchstart', (e) => {
    //   // do nothing if we mousedown on any shape
    //   if (e.target !== this.stage) {
    //     return;
    //   }
    //   x1 = this.stage.getPointerPosition()?.x;
    //   y1 = this.stage.getPointerPosition()?.y;
    //   x2 = this.stage.getPointerPosition()?.x;
    //   y2 = this.stage.getPointerPosition()?.y;

    //   this.selectionRectangle.visible(true);
    //   this.selectionRectangle.width(0);
    //   this.selectionRectangle.height(0);
    // });

    // this.stage.on('mousemove touchmove', () => {
    //   // no nothing if we didn't start selection
    //   if (!this.selectionRectangle.visible()) {
    //     return;
    //   }
    //   x2 = this.stage.getPointerPosition()?.x;
    //   y2 = this.stage.getPointerPosition()?.y;

    //   this.selectionRectangle.setAttrs({
    //     x: Math.min(x1, x2),
    //     y: Math.min(y1, y2),
    //     width: Math.abs(x2 - x1),
    //     height: Math.abs(y2 - y1),
    //   });
    // });

    // this.stage.on('mouseup touchend', () => {
    //   // no nothing if we didn't start selection
    //   if (!this.selectionRectangle.visible()) {
    //     return;
    //   }
    //   // update visibility in timeout, so we can check it in click event
    //   setTimeout(() => {
    //     this.selectionRectangle.visible(false);
    //   });

    //   var shapes = this.stage.find('.rect');
    //   var box = this.selectionRectangle.getClientRect();
    //   var selected = shapes.filter((shape) =>
    //     Konva.Util.haveIntersection(box, shape.getClientRect())
    //   );
    //   this.transformer.nodes(selected);
    // });

    // clicks should select/deselect shapes
    this.stage.on('click tap', (e) => {
      // if we are selecting with rect, do nothing
      if (this.selectionRectangle.visible()) {
        return;
      }

      // if click on empty area - remove all selections
      if (e.target === this.stage) {
        this.transformer.nodes([]);
        this.properties = false;

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
  }

  addDeleteListener(shape: any) {
    const component = this;
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Delete') {
        shape.remove();
        component.transformers.forEach(t => {
          t.detach();
        });
        const selectedShape = component.shapes.find((s: any) => s._id == shape._id);
        selectedShape.remove();
        e.preventDefault();
      }
      component.layer.batchDraw();
    });
  }

  displayProperties(selectedShape: any) {
    this.properties = true;
    this.selectedShape = selectedShape;
  }

  clearBoard() {
    location.reload();
  }
}
