import { ComponentRef, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { TPositionDirection, TPositions } from './position.interfaces';

/**
 * ? Tipo de posibles estados del modal
 */
export type TModalState = 'open' | 'close';

/**
 * ? Tipo de botones posibles en el modal
 */
export type TModalButtonDefault =
  | 'close'
  | 'cancel'
  | 'modify'
  | 'ok'
  | 'save'
  | 'create';

/**
 * ? Opciones de cada Botón
 */
export type TModalButtonOptions = {
  style?: string;
  class?: string;
  text?: string;
  position?: number;
  action: () => void;
  // show: boolean;
  // self?: TPositions;
};

/**
 * ? Tipo de las opciones de los botones del modal
 */
export type TModalButtonsDefault = {
  [type in TModalButtonDefault]?: TModalButtonOptions;
};

export type TModalButtonAny = { [key: string]: TModalButtonOptions };

/**
 * ? Parametros de todas las secciones
 */
export interface IModalSectionParams {
  style?: string;
  class?: string;
}

/**
 * ? Parametros extendidos de las secciones de Header y Footer
 */
export interface IModalSectionParamsHeaderAndFooter
  extends IModalSectionParams {
  show: boolean;
  justify?: TPositions;
  direction?: TPositionDirection;
  buttons?: TModalButtonsDefault | TModalButtonAny;
}

/**
 * ? Opciones del modal a abrir
 */
export interface IModalOptions extends IModalSectionParams {
  backdrop?: IModalSectionParams & { closeOnClick?: boolean };
  title?: IModalSectionParams & { text: string; show: boolean };
  header?: IModalSectionParamsHeaderAndFooter;
  body?: IModalSectionParams;
  footer?: IModalSectionParamsHeaderAndFooter;
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

/**
 * ? Datos a devolver cuando el modal se cierra
 */
export interface IModalDataClosed {
  typeClose: string;
  data?: any;
}

/**
 * ? Interfaz de la referencia del modal
 */
export interface IModalRef {
  afterClosed: Observable<IModalDataClosed>;
  close: () => void;
  componentRef?: ComponentRef<any>;
  state?: TModalState;
  options?: IModalOptions;
  data?: any;
  text?: string;
  component?: Type<any>;
}
