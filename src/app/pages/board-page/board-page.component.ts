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

  public dataRecibida: any;

  // ANCHOR Constructor
  constructor(private _modalSvc: ModalService) {}

  ngOnInit(): void {}

  // ANCHOR - Métodos

  //FIXME - Borrar cuando se termine de testear
  public openTask() {
    this._modalSvc.open({ component: CreateTaskPageComponent });
  }
  public openObjetive() {
    const modalRef = this._modalSvc.open({
      component: CreateObjetivePageComponent,
      data: 'jouoju',
      options: {
        header: {
          justify: 'center',
          show: true,
          buttons: {
            cerrar: {
              text: 'cerralo',
              action: () => this._modalSvc.close('cerrao'),
              class: 'modal__button modal__button--ok',
            },
          },
        },
        footer: {
          show: true,
          buttons: {
            close: this._modalSvc.defaultButtons.close,
            ok: this._modalSvc.defaultButtons.ok,
            save: this._modalSvc.defaultButtons.save,
            modify: this._modalSvc.defaultButtons.modify,
            cancel: this._modalSvc.defaultButtons.cancel,
            create: this._modalSvc.defaultButtons.create,
          },
        },
      },
    });

    modalRef.afterClosed.subscribe({
      next: (modalData) => {
        console.log(modalData.data);
        this.dataRecibida = modalData.typeClose;
        // this.dataRecibida = modalData.data;
      },
    });
  }

  /**
   * ? Crea Modal para crear una nueva Sección
   */
  public openSection() {
    this._modalSvc.open({
      component: CreateSectionPageComponent,
      options: {
        title: {
          show: true,
          text: 'Nueva Sección',
          style: `
          font-weight: bold;
          position: absolute;
          display:flex;
          justify-content: center;
          width: 100%;
          left: 0`,
        },
        header: {
          direction: 'row',
          show: true,
          style:
            'justify-content: end; align-items: center; position: relative;',
        },
        footer: {
          show: true,
          buttons: {
            crear: {
              action: () => this._modalSvc.create(),
              text: 'Crear Sección',
              position: 2,
              class: 'modal__button modal__button--create',
            },
            cancelar: {
              ...this._modalSvc.defaultButtons.cancel!,
              position: 1,
            },
          },
        },
      },
      data: 'Envio este textooooo',
    });
  }
  public openTech() {
    const modalRef = this._modalSvc.open({
      component: CreateTechPageComponent,
      options: {
        footer: {
          show: true,
          buttons: {
            cerrado: {
              action: () => console.log('po mira'),
              text: 'Po toma',
              class: 'modal__button modal__button--cancel',
            },
          },
        },
      },
    });
    modalRef.afterClosed.subscribe({
      next: (resp) => console.log(resp),
    });
  }
  public openText(text: string) {
    const modalRef = this._modalSvc.open({ text });
    modalRef.afterClosed.subscribe({
      next: (resp) => console.log(resp),
    });
  }
}
