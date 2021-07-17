import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CanvasGridComponent } from './canvas-grid/canvas-grid.component';
import { DxButtonModule, DxDrawerModule, DxListModule, DxRadioGroupModule, DxToolbarModule } from 'devextreme-angular';
import { CanvasDrawerComponent } from './canvas-drawer/canvas-drawer.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasGridComponent,
    CanvasDrawerComponent
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
