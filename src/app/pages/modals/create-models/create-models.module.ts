import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateObjetivePageComponent } from './create-objetive-page/create-objetive-page.component';
import { CreateSectionPageComponent } from './create-section-page/create-section-page.component';
import { CreateTaskPageComponent } from './create-task-page/create-task-page.component';
import { CreateTechPageComponent } from './create-tech-page/create-tech-page.component';

@NgModule({
  declarations: [
    CreateObjetivePageComponent,
    CreateSectionPageComponent,
    CreateTaskPageComponent,
    CreateTechPageComponent,
  ],
  imports: [CommonModule],
  exports: [
    CreateObjetivePageComponent,
    CreateSectionPageComponent,
    CreateTaskPageComponent,
    CreateTechPageComponent,
  ],
})
export class CreateModelsModule {}
