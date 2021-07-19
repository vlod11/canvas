import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxButtonModule, DxDrawerModule, DxListModule, DxRadioGroupModule, DxToolbarModule } from 'devextreme-angular';
import { CanvasGridContainerComponent } from 'src/app/modules/canvas/components/canvas-grid-container/canvas-grid-container.component';
import { CanvasGridSidebarComponent } from 'src/app/modules/canvas/components/canvas-grid-container/canvas-grid-sidebar/canvas-grid-sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasGridComponent } from './modules/canvas/components/canvas-grid-container/canvas-grid/canvas-grid.component';
import { ShapePropertiesPanelComponent } from './modules/canvas/components/canvas-grid-container/shape-properties-panel/shape-properties-panel.component';


@NgModule({
  declarations: [
    AppComponent,
    CanvasGridComponent,
    CanvasGridContainerComponent,
    CanvasGridSidebarComponent,
    ShapePropertiesPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DxButtonModule,
    DxDrawerModule,
    DxListModule,
    DxRadioGroupModule,
    DxToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
