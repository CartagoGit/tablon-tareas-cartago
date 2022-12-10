import { Type } from '@angular/core';
import { TPositionDirection, TPositions } from './position.interfaces';

/**
 * ? Tipo de posibles estados del modal
 */
export type TModalState = 'open' | 'close';

/**
 * ? Tipo de botones posibles en el modal
 */
export type TModalButtonsDefault =
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
export type TModalButtons = {
  [type in TModalButtonsDefault]?: TModalButtonOptions;
  // [key in string]: TModalButtonOptions ;
};

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
  buttons?: TModalButtons;
}

/**
 * ? Opciones del modal a abrir
 */
export interface IModalOptions extends IModalSectionParams {
  header?: IModalSectionParamsHeaderAndFooter & { title: string };
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
