import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanvasGridSidebarComponent } from 'src/app/modules/canvas/components/canvas-grid-container/canvas-grid-sidebar/canvas-grid-sidebar.component';

const routes: Routes = [
  { path: '', component: CanvasGridSidebarComponent },
  { path: '**', component: CanvasGridSidebarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
