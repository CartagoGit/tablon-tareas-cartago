import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTechPageComponent } from './create-models/create-tech-page/create-tech-page.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        //FIXME - Cambiar cuando se haya terminado de depurar
        path: '',
        component: CreateTechPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
