import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { IModalData } from '../../shared/services/modal.service';

/**
 * ? Tipo de botones posibles en el modal
 */
export type TModalButtons = 'save' | 'ok' | 'cancel' | 'close' | 'modify';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  // ANCHOR - Variables

  /**
   * ? Datos recibidos desde el observable del servicio del modal
   */
  public display: IModalData | undefined = undefined;

  /**
   * ? Div donde insertar el componente
   */
  @ViewChild('contentString', { read: ViewContainerRef })
  contentString!: ViewContainerRef;

  /**
   * ? Div donde insertar el componente
   */
  @ViewChild('contentComponent', { read: ViewContainerRef })
  contentComponent!: ViewContainerRef;

  // ANCHOR - Constructor
  constructor(private _modalSvc: ModalService) {}

  ngOnInit(): void {
    this._modalSvc.watch().subscribe({
      next: (modalData: IModalData) => {
        this.display = modalData;
        if (!!modalData.content) {
          (this.contentString.element.nativeElement as HTMLElement).innerHTML =
            '';
          this.contentComponent.clear();
          if (typeof modalData.content !== 'string') {
            this.contentComponent.createComponent(modalData.content as any);
          } else if (typeof modalData.content === 'string') {
            (
              this.contentString.element.nativeElement as HTMLElement
            ).innerHTML = modalData.content;
          }
        }
      },
    });
  }

  // ANCHOR - Métodos
  public clickType(typeButton: TModalButtons): void {
    const buttonMethods: { [type in TModalButtons]: () => void } = {
      ok: () => {},
      close: () => this._modalSvc.close(),
      save: () => {},
      cancel: () => {},
      modify: () => {},
    };
    console.log(typeButton);

    buttonMethods[typeButton]()
  }
}
