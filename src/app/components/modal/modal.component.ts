import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { IModalData, TModalButtons } from 'src/app/shared/structures/interfaces/modal.interfaces';

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
   * ? Div donde insertar el texto plano enviado al modal
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
    // ? Subscripción para recuperar los datos recibidos al abrir el modal
    this._modalSvc.watch().subscribe({
      next: (modalData: IModalData) => {
        this.display = modalData;

        //* Limpiamos los contenedores
        if (!!this.contentString)
          (this.contentString.element.nativeElement as HTMLElement).innerHTML =
            '';
        if (!!this.contentComponent) this.contentComponent.clear();

        //* Rellenamos el contenido segun los enviado al abrir el modal
        if (!!modalData.component) {
          this.contentComponent.createComponent(modalData.component);
        } else if (!!modalData.text) {
          (this.contentString.element.nativeElement as HTMLElement).innerHTML =
            modalData.text;
        }
      },
    });
  }

  // ANCHOR - Métodos

  /**
   * ? Método al hacer click en cualquiera de los tipos de botones del modal
   * @param typeButton {TModalButtons} - Tipo de botón pulsado
   */
  public clickType(typeButton: TModalButtons): void {
    const buttonMethods: { [type in TModalButtons]: () => void } = {
      ok: () => {},
      close: () => this._modalSvc.close(),
      save: () => {},
      cancel: () => {},
      modify: () => {},
    };
    console.log(typeButton);

    buttonMethods[typeButton]();
  }
}
