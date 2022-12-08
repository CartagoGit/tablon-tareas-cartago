import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { CreateTaskPageComponent } from '../modals/create-models/create-task-page/create-task-page.component';
import { CreateObjetivePageComponent } from '../modals/create-models/create-objetive-page/create-objetive-page.component';
import { CreateSectionPageComponent } from '../modals/create-models/create-section-page/create-section-page.component';
import { CreateTechPageComponent } from '../modals/create-models/create-tech-page/create-tech-page.component';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  // ANCHOR Variables

  // ANCHOR Constructor
  constructor(private _modalService: ModalService) {}

  ngOnInit(): void {}

  // ANCHOR - Métodos
  public openTask() {
    this._modalService.open(CreateTaskPageComponent);
  }
  public openObjetive() {
    this._modalService.open(CreateObjetivePageComponent);
  }
  public openSection() {
    this._modalService.open(CreateSectionPageComponent);
  }
  public openTech() {
    this._modalService.open(CreateTechPageComponent);
  }
  public openText(text: string) {
    this._modalService.open(text);
  }
}
