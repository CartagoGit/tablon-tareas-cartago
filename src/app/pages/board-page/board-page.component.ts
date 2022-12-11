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

  //FIXME - Borrar cuando se termine de testear
  public openTask() {
    this._modalService.open({ component: CreateTaskPageComponent });
  }
  public openObjetive() {
    this._modalService.open({ component: CreateObjetivePageComponent });
  }
  public openSection() {
    this._modalService.open({ component: CreateSectionPageComponent });
  }
  public openTech() {
    const modalRef = this._modalService.open({
      component: CreateTechPageComponent,
      options: {
        footer: {
          show: true,
          buttons: {
            cerrado: { action: () => console.log('po mira'), text: 'Po toma' },
          },
        },
      },
    });
    modalRef.afterClosed.subscribe({
      next: (resp) => console.log(resp),
    });
  }
  public openText(text: string) {
    const modalRef = this._modalService.open({ text });
    modalRef.afterClosed.subscribe({
      next: (resp) => console.log(resp),
    });
  }
}
