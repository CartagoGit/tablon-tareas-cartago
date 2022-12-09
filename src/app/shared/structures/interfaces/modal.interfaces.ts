import { Type } from '@angular/core';

/**
 * ? Tipo de posibles estados del modal
 */
export type TModalState = 'open' | 'close';

/**
 * ? Tipo de botones posibles en el modal
 */
export type TModalButtons = 'save' | 'ok' | 'cancel' | 'close' | 'modify';

/**
 * ? IModalButtonsOptions
 */
export type TModalButtonOptions = {
  [type in TModalButtons]?: {
    style?: string;
    text?: string;
    position?: {};
  };
};

/**
 * REVIEW Implementar opciones
 * ? Opciones del modal a abrir
 */
//TODO
export interface IModalOptions {
  header?: {
    style?: string;
    buttons?: TModalButtonOptions;
  };
  footer?: {
    style?: string;
    buttons?: TModalButtonOptions;
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
