import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardPageComponent } from './board-page/board-page.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ModalsModule } from './modals/modals.module';



@NgModule({
  declarations: [
    BoardPageComponent
  ],
  imports: [
    CommonModule,
    ModalsModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
