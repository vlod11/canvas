import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDrawerComponent } from 'devextreme-angular';

@Component({
  selector: 'app-canvas-drawer',
  templateUrl: './canvas-drawer.component.html',
  styleUrls: ['./canvas-drawer.component.scss']
})
export class CanvasDrawerComponent implements OnInit {


  @ViewChild(DxDrawerComponent, { static: false }) drawer: DxDrawerComponent | undefined;
    navigation: any[];
    showSubmenuModes: string[] = ['slide', 'expand'];
    positionModes: string[] = ['left', 'right'];
    showModes: string[] = ['push', 'shrink', 'overlap'];
    text: string;
    selectedOpenMode: string = 'shrink';
    selectedPosition: string = 'left';
    selectedRevealMode: string = 'slide';
    isDrawerOpen: boolean = true;
    elementAttr: any;

    constructor() {
        this.text = "<app-canvas-grid></app-canvas-grid>";
        this.navigation = [
          { id: 1, text: "Products", icon: "product" },
          { id: 2, text: "Sales", icon: "money" },
          { id: 3, text: "Customers", icon: "group" },
          { id: 4, text: "Employees", icon: "card" },
          { id: 5, text: "Reports", icon: "chart" }
      ];
    }

  ngOnInit(): void {
  }

    toolbarContent = [{
        widget: 'dxButton',
        location: 'before',
        options: {
            icon: 'menu',
            onClick: () => this.isDrawerOpen = !this.isDrawerOpen
        }
    }];
}
