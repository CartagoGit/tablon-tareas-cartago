import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { CreateTaskPageComponent } from '../modals/create-models/create-task-page/create-task-page.component';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  // ANCHOR Variables

  // ANCHOR Constructor
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  // ANCHOR - Métodos
  public open() {
    this.modalService.open(new CreateTaskPageComponent());
  }
}
