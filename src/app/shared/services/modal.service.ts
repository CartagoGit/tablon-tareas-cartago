import { Component, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * ? Tipo de posibles estados del modal
 */
export type TModalState = 'open' | 'close';

export type TModalContent = Component | string | undefined;

/**
 * REVIEW Implementar opciones
 * ? Opciones del modal a abrir
 */
export interface IModalOptions {}

/**
 * ? Datos necesarios para precargar el modal
 */
export interface IModalData {
  content?: TModalContent;
  options?: IModalOptions | undefined;
  state: TModalState;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  // ANCHOR - Variables

  /**
   * ? Subject a observar de todos los datos del modal
   * + Se inicializa cerrado
   */
  private _display: BehaviorSubject<IModalData> =
    new BehaviorSubject<IModalData>({
      content: undefined,
      options: undefined,
      state: 'close',
    });

  /**
   * ? Inializador del contenido y de las opciones
   */
  private _content: TModalContent = undefined;
  private _options: IModalOptions | undefined = undefined;

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
   * ? Abre el modal
   * + 4 Sobrecargas
   * ----
   * @option1 () => void;
   * @option2 (options : IModalOptions) => void;
   * @option3 (content: string | Component) => void;
   * @option4 (content: string | Component, options: IModalOptions) => void
   */
  public open(): void;
  public open(options: IModalOptions): void;
  public open(content: TModalContent): void;
  public open(content: TModalContent, options: IModalOptions): void;
  public open(
    content: TModalContent = undefined,
    options: IModalOptions | undefined = undefined
  ): void {
    this._content = content;
    this._options = options;
    this._display.next({ content, options, state: 'open' });
  }

  /**
   * ? Cierra el modal
   */
  public close(): void {
    this._display.next({
      content: this._content,
      options: this._options,
      state: 'close',
    });
  }
}
