import { ComponentRef, Injectable } from '@angular/core';
import { TModalButtonAny } from '../structures/interfaces/modal.interfaces';
import {
  BehaviorSubject,
  filter,
  Observable,
  Subject,
  take,
  takeWhile,
} from 'rxjs';
import {
  IModalDataClosed,
  IModalRef,
} from '../structures/interfaces/modal.interfaces';
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
  public defaultButtons: TModalButtonsDefault = {
    close: {
      class: 'modal__button modal__button--close',
      text: 'Cerrar',
      action: () => this.close('close'),
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
    title: { text: 'Modal Title', class: 'modal__title', show: false },
    backdrop: { class: 'modal__backdrop', closeOnClick: true },
    header: {
      justify: 'end',
      direction: 'column',
      buttons: {
        close: {
          ...this.defaultButtons.close!,
          text: 'X',
        },
      },
      show: true,
      class: 'modal__header',
    },
    body: {
      class: 'modal__body',
    },
    footer: {
      show: false,
      justify: 'evenly',
      direction: 'column',
      class: 'modal__footer',
      buttons: {
        cancelar: this.defaultButtons.cancel!,
        guardar: this.defaultButtons.save!,
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

  /**
   * ? Subject a observar cuando el modal se cierra
   * + Devuelve la data y el tipo de cierre
   */
  private _displayClosed: Subject<IModalDataClosed> =
    new Subject<IModalDataClosed>();

  /**
   * ? Refencia al Componente del Modal
   */
  private _componentRef: ComponentRef<any> | undefined;
  set componentRef(value: ComponentRef<any> | undefined) {
    this._componentRef = value;
  }
  get componentRef() {
    return this._componentRef;
  }

  /**
   * ? Referencia al modal en si
   */
  private _modalRef: IModalRef = {
    afterClosed: this._afterClosed(),
    close: () => this.close('close'),
    componentRef: this.componentRef,
    state: this._modalData.state,
    options: this._modalData.options,
    data: this._modalData.data,
    text: this._modalData.text,
    component: this._modalData.component,
  };

  /**
   * ? Tipo de boton pulsado al cerrar el modal
   */
  private _typeClose: keyof TModalButtonsDefault | keyof TModalButtonAny = '';

  // ANCHOR - Constructor
  /**
   * NOTE - El modal creara en el componente una variable "dataRecived" con los datos pasados al modal
   * NOTE - A su vez devolvera al cerrar el modal la variable 'dataToSend' del componente
   * NOTE - En caso de no tener devolvera undefined
   */

  constructor() {}

  // ANCHOR - Métodos
  /**
   * ? Retorna el observable del estado del modal
   * @return {Observable<IModalData>}
   */
  public watch(): Observable<IModalData> {
    return this._display.asObservable();
  }

  /**
   * ? Retorna el observable con el resultado al cerrar el modal y termina la subscripción
   * @return {Observable<Subject<TModalDataClosed>}
   */
  private _afterClosed(): Observable<IModalDataClosed> {
    return this._displayClosed.asObservable().pipe(take(1));
  }

  /**
   * ? Crea subscripción hasta que el modal se cierre
   */
  private _createSubscriptionUntilClose(): void {
    //* Nos subscribimos al cierre del modal para devolver los datos de cierre
    this.watch()
      .pipe(
        filter((display) => display.state === 'close'),
        take(1)
      )
      .subscribe({
        next: (modalData) => {
          this._displayClosed.next({
            data: this._componentRef?.instance.dataToSend,
            typeClose: this._typeClose as string,
          });
        },
      });
  }

  /**
   * ? Devuelve las opciones mixeadas entre las recibidas y las default.
   * @param {IModalOptions | undefined} injectedOptions - Opciones recibidas al crear el modal
   */
  private _getMixedOptions(
    injectedOptions: IModalOptions | undefined
  ): IModalOptions | undefined {
    if (!injectedOptions) return this._defaultOptions;
    const {
      backdrop = undefined,
      body = undefined,
      class: className = undefined,
      footer = undefined,
      header = undefined,
      style = undefined,
      title = undefined,
    } = injectedOptions;
    const newOptions: IModalOptions = {
      style: style || this._defaultOptions.style,
      class: className || this._defaultOptions.class,
      backdrop: { ...this._defaultOptions.backdrop, ...backdrop },
      body: { ...this._defaultOptions.body, ...body },
      footer: { ...this._defaultOptions.footer!, ...footer },
      header: { ...this._defaultOptions.header!, ...header },
      title: { ...this._defaultOptions.title!, ...title },
    };
    return newOptions;
  }

  /**
   * ? Abre el modal y recibe los datos para configurar la ventana
   * @param {IModalData | undefined } modalData - Datos a recibir al abrir el modal / default = undefined
   * @return {IModalRef}  Datos y metodos de referencia del modal
   */
  public open(modalData: IModalData | undefined = undefined): IModalRef {
    // * Sobreponemos los datos al abrir el modal sobre los datos por default
    this._typeClose = '';
    const newOptions = this._getMixedOptions(modalData?.options);
    this._modalData = {
      ...this._defaultModalData,
      ...modalData,
      options: { ...newOptions },
      text: modalData?.component ? undefined : modalData?.text,
      state: 'open',
    };
    this._display.next({ ...this._modalData });
    this._createSubscriptionUntilClose();
    return this._modalRef;
  }

  /**
   * ? Close - Cierra el modal
   * @param {string} typeClose - Nombre del tipo de cierre del modal / default = close
   * @param {any} dataClose - Datos a devolver cuando el componente se cierre / default = undefined
   */
  public close(typeClose: string): void {
    this._modalData = {
      ...this._modalData,
      state: 'close',
    };
    this._typeClose = typeClose;
    this._display.next(this._modalData);
  }

  /**
   * ? Cancel - Cancela el modal
   * TODO
   */
  public cancel(): void {
    this.close('cancel');
  }

  /**
   * ? Save - Guarda los datos del modal
   * TODO
   */
  public save(): void {
    this.close('save');
  }
  /**
   * ? Create - Crea los datos del modal
   * TODO
   */
  public create(): void {
    this.close('create');
  }

  /**
   * ? Modify - Modifica los datos del modal
   * TODO
   */
  public modify(): void {
    this.close('modify');
  }
  /**
   * ? Ok - Acepta los datos del modal
   * TODO
   */
  public ok(): void {
    this.close('ok');
  }
}
