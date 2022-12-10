import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import {
  IModalData,
  TModalButtonsDefault,
} from 'src/app/shared/structures/interfaces/modal.interfaces';

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

  /**!
   * ? ElementRef de Cabecera, Body y Footer del modal
   */
  @ViewChild('modal') modal!: ElementRef<HTMLDivElement>;
  @ViewChild('modalHeader') modalHeader!: ElementRef<HTMLDivElement>;
  @ViewChild('modalBody') modalBody!: ElementRef<HTMLDivElement>;
  @ViewChild('modalFooter') modalFooter!: ElementRef<HTMLDivElement>;

  /**
   * ? Div donde insertar el texto plano enviado al modal
   */
  // @ViewChild('contentString', { read: ViewContainerRef })
  // contentString!: ViewContainerRef;

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
        if (modalData.state === 'close') return;

        //* Limpiamos los contenedores
        this._cleanContent();

        //* Rellenamos el contenido segun los enviado al abrir el modal
        this._fillContent();

        //* Inyectamos los estilos y las clases a las secciones
        this._setSectionStylesAndClasses();
      },
    });
  }

  // ANCHOR - Métodos

  /**
   * ? Limpia los contenedores
   */
  private _cleanContent(): void {
    this.modalBody && this.contentComponent.clear();
  }

  /**
   * ? Rellena el contenido pasado al modal
   */
  private _fillContent(): void {
    if (!!this.display?.component) {
      {
        this.display.text = undefined;
        this.contentComponent.createComponent(this.display.component);
      }
    }
  }

  /**
   * ? Fija los estilos y clases de las secciones de la modal recibidos al crear el modal
   */
  private _setSectionStylesAndClasses(): void {
    const { options } = this.display!;
    //* Modal
    this._setStylesAndClasses(
      this.modal.nativeElement,
      options?.style,
      options?.class
    );
    //* Header
    this.modalHeader &&
      this._setStylesAndClasses(
        this.modalHeader.nativeElement,
        options?.header?.style,
        options?.header?.class
      );
    //* Body
    this.modalBody &&
      this._setStylesAndClasses(
        this.modalBody.nativeElement,
        options?.body?.style,
        options?.body?.class
      );
    //* Footer
    this.modalFooter &&
      this._setStylesAndClasses(
        this.modalFooter.nativeElement,
        options?.footer?.style,
        options?.footer?.class
      );
  }

  /**
   * ? Fija las clases y estilos por cada elemento
   * @params {HTMLDivElement} element
   * @param {string} style
   * @param {string} className
   */
  private _setStylesAndClasses(
    element: HTMLElement,
    style: string = '',
    className: string = ''
  ): void {
    style && (element.style.cssText = style);
    className && (element.className = className);
  }

  /**
   * ? Método al hacer click en cualquiera de los tipos de botones del modal
   * @param typeButton {TModalButtons} - Tipo de botón pulsado
   */
  public clickType(typeButton: TModalButtonsDefault): void {
    // const buttonMethods: { [type in TModalButtons]: () => void } = {
    //   ok: () => {},
    //   close: () => this._modalSvc.close(),
    //   save: () => {},
    //   cancel: () => {},
    //   modify: () => {},
    // };
    // console.log(typeButton);
    // buttonMethods[typeButton]();
    this._modalSvc.close();
  }
}
