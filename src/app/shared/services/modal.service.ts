import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * ? Tipo de posibles estados del modal
 */
export type TModalState = 'open' | 'close';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  // ANCHOR - Variables

  /**
   * ? Subject a observar para contemplar si el modal esta abierto o cerrado
   * Se inicializa cerrado
   */
  private _display: BehaviorSubject<TModalState> =
    new BehaviorSubject<TModalState>('close');

  // ANCHOR - Constructor
  constructor() {}

  // ANCHOR - Métodos
  /**
   * ? Retorna el observable del estado del modal
   * @return {Observable<BehaviorSubject<TModalState>}
   */
  public watch(): Observable<TModalState> {
    return this._display.asObservable();
  }

  /**
   * ? Cambia el estado del modal a abierto
   */
  public open(): void {
    this._display.next('open');
  }

  /**
   * ? Cambia el estado del modal a cerrado
   */
  public close(): void {
    this._display.next('close');
  }
}
