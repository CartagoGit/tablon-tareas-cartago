import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  IModalData,
  IModalOptions,
  TModalButtonsDefault,
} from '../structures/interfaces/modal.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  // ANCHOR - Variables

  /**
   * ? Botones predefinidos del modal
   */
  private _defaultButtons: TModalButtonsDefault = {
    close: {
      class: 'modal__button modal__button--close',
      text: 'Cerrar',
      action: () => this.close(),
      position: 1,
    },
    cancel: {
      class: 'modal__button modal__button--cancel',
      text: 'Cancelar',
      action: () => this.cancel(),
      position: 2,
    },
    modify: {
      class: 'modal__button modal__button--modify',
      text: 'Modificar',
      action: () => this.modify(),
      position: 3,
    },
    ok: {
      class: 'modal__button modal__button--ok',
      text: 'Aceptar',
      action: () => this.ok(),
      position: 4,
    },
    save: {
      class: 'modal__button modal__button--save',
      text: 'Guardar',
      action: () => this.save(),
      position: 5,
    },
    create: {
      class: 'modal__button modal__button--create',
      text: 'Crear',
      action: () => this.create(),
      position: 6,
    },
  };

  /**
   * ? Opciones default del modal si no se sobreescriben al crear el modal con otras opciones
   */
  private _defaultOptions: IModalOptions = {
    class: 'modal',
    title: { text: 'Modal Title', class: 'modal__title' },
    backdrop: { class: 'modal__backdrop', closeOnClick: false },
    header: {
      direction: 'column',
      justify: 'between',
      buttons: {
        close: {
          ...this._defaultButtons.close!,
          text: 'X',
          position: 30,
          // action: () => console.log('prueba'),
        },
        close2: {
          ...this._defaultButtons.close!,
          text: 'X2',
          position: 1,
          // action: () => console.log('prueba'),
        },
        other: {
          action: () => console.log('otro rula'),
          text: 'Otro boton',
          position: 2,
        },
      },
      show: true,
      style: 'background: purple; color: blue;',
      class: 'modal__header',
    },
    body: {
      class: 'modal__body',
    },
    footer: {
      show: true,
      style: 'background: yellow; color:black;',
      justify: 'evenly',
      direction: 'column',
      class: 'modal__footer',
      buttons: {
        close: this._defaultButtons.close,
        guardar: this._defaultButtons.save,
      },
    },
  };

  /**
   * ? Datos del Modal por default
   */
  private _defaultModalData: IModalData = {
    component: undefined,
    text: 'Default text Modal',
    options: this._defaultOptions,
    data: undefined,
    state: 'close',
  };

  /**
   * ? Inializador del contenido y de las opciones
   */
  private _modalData: IModalData = this._defaultModalData;

  /**
   * ? Subject a observar de todos los datos del modal
   * + Se inicializa con los datos por defecto
   */
  private _display: BehaviorSubject<IModalData> =
    new BehaviorSubject<IModalData>(this._modalData);

  // ANCHOR - Constructor
  constructor() {}

  // ANCHOR - Métodos
  /**
   * ? Retorna el observable del estado del modal
   * @return {Observable<BehaviorSubject<TModalState>}
   */
  public watch(): Observable<IModalData> {
    return this._display.asObservable();
  }

  /**
   * ? Abre el modal y recibe los datos para configurar la ventana
   * @params {IModalData} - Datos a recibir al abrir el modal
   */
  public open(modalData: IModalData | undefined = undefined): void {
    // * Sobreponemos los datos al abrir el modal sobre los datos por default
    this._modalData = {
      ...this._defaultModalData,
      ...modalData,
      text: modalData?.component ? undefined : modalData?.text,
      state: 'open',
    };
    this._display.next({ ...this._modalData });
  }

  /**
   * ? Close - Cierra el modal
   */
  public close(): void {
    console.log('close');
    this._modalData = {
      ...this._modalData,
      state: 'close',
    };
    this._display.next(this._modalData);
  }

  /**
   * ? Cancel - Cancela el modal
   * TODO
   */
  public cancel(): void {
    console.log('cancel');
  }

  /**
   * ? Save - Guarda los datos del modal
   * TODO
   */
  public save(): void {
    console.log('save');
  }
  /**
   * ? Create - Crea los datos del modal
   * TODO
   */
  public create(): void {
    console.log('create');
  }

  /**
   * ? Modify - Modifica los datos del modal
   * TODO
   */
  public modify(): void {
    console.log('modify');
  }
  /**
   * ? Ok - Acepta los datos del modal
   * TODO
   */
  public ok(): void {
    console.log('ok');
  }
}
