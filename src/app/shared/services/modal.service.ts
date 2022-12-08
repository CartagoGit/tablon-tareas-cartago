import { Component, Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * ? Tipo de posibles estados del modal
 */
export type TModalState = 'open' | 'close';

/**
 * REVIEW Implementar opciones
 * ? Opciones del modal a abrir
 */
//TODO
export interface IModalOptions {
  buttons?: {
    ok: boolean;
    cancel: boolean;
    close: boolean;
    modify: boolean;
  };
}

/**
 * ? Datos necesarios del modal
 */
export interface IModalData {
  component?: Type<any>;
  text?: string;
  options?: IModalOptions;
  state?: TModalState;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  // ANCHOR - Variables

  /**
   * ? Inializador del contenido y de las opciones
   */
  private _modalData: IModalData = {
    component: undefined,
    text: undefined,
    options: undefined,
    data: undefined,
    state: 'close',
  };

  /**
   * ? Subject a observar de todos los datos del modal
   * + Se inicializa cerrado
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
    console.log(this._modalData);
    this._modalData = { ...modalData, state: 'open' };
    this._display.next({ ...this._modalData });
  }

  /**
   * ? Cierra el modal
   */
  public close(): void {
    this._modalData = {
      ...this._modalData,
      state: 'close',
    };
    this._display.next(this._modalData);
  }
}
