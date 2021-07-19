import { Component, Input, OnInit } from '@angular/core';
import { CanvasElement } from 'src/app/modules/canvas/models/interfaces/canvas-elements';

@Component({
  selector: 'app-shape-properties-panel',
  templateUrl: './shape-properties-panel.component.html',
  styleUrls: ['./shape-properties-panel.component.scss']
})
export class ShapePropertiesPanelComponent implements OnInit {

  @Input() public selectedShapeElement: CanvasElement | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
