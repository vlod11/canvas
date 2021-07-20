import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CanvasElement } from 'src/app/modules/canvas/models/interfaces/canvas-elements';
import { CommandStoreService } from 'src/app/modules/canvas/services/command.service';
import { ShapesService } from 'src/app/modules/canvas/services/shapes.service';

@Component({
  selector: 'app-canvas-grid-sidebar',
  templateUrl: './canvas-grid-sidebar.component.html',
  styleUrls: ['./canvas-grid-sidebar.component.scss'],
})
export class CanvasGridSidebarComponent implements OnInit {
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

  shapeElements$: Observable<CanvasElement[]>;

  selectedMenuItem: any;

  constructor(private commandStoreService: CommandStoreService,
    private shapesService: ShapesService) {
    this.shapeElements$ = shapesService.shapes$;
  }

  ngOnInit(): void {
  }

  setSelectedMenuItem(item: any) {
    this.selectedMenuItem = item;
  }

  addShape(type: string) {
    if (type == 'circle') {
      this.commandStoreService.addCircle();
    }
    else if (type == 'rectangle') {
      this.commandStoreService.addRectangle();
    }
    else if (type == 'text') {
      this.commandStoreService.addText();
    } else if (type == 'image') {
      this.commandStoreService.addImage();
    }
  }
}
