import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasDrawerComponent } from 'src/app/canvas-drawer/canvas-drawer.component';
import { CanvasGridComponent } from 'src/app/canvas-grid/canvas-grid.component';

const routes: Routes = [
  { path: '', component: CanvasGridComponent },
  { path: '**', component: CanvasGridComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
