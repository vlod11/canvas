import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
