import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './board-page/board-page.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {
        //FIXME - Cambiar cuando se haya terminado de depurar
        path: '',
        component: BoardPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
