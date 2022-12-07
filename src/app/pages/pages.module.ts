import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateModelsModule } from './create-models/create-models.module';
import { BoardPageComponent } from './board-page/board-page.component';
import { PagesRoutingModule } from './pages-routing.module';



@NgModule({
  declarations: [
    BoardPageComponent
  ],
  imports: [
    CommonModule,
    CreateModelsModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
