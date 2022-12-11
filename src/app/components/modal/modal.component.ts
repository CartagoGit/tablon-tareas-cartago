import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import {
  TPositionDirection,
  TPositions,
} from '../../shared/structures/interfaces/position.interfaces';
import {
  IModalData,
  TModalButtonDefault,
  TModalButtonOptions,
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
  @ViewChild('modalTitle') modalTitle!: ElementRef<HTMLDivElement>;
  @ViewChild('modalBackdrop') modalBackdrop!: ElementRef<HTMLDivElement>;
  @ViewChild('modalHeader') modalHeader!: ElementRef<HTMLDivElement>;
  @ViewChild('modalHeaderButtons')
  modalHeaderButtons!: ElementRef<HTMLDivElement>;
  @ViewChild('modalBody') modalBody!: ElementRef<HTMLDivElement>;
  @ViewChild('modalFooter') modalFooter!: ElementRef<HTMLDivElement>;
  @ViewChild('modalFooterButtons')
  modalFooterButtons!: ElementRef<HTMLDivElement>;

  /**
   * ? Div donde insertar el componente
   */
  @ViewChild('contentComponent', { read: ViewContainerRef })
  contentComponent!: ViewContainerRef;

  /**
   * ? Lista de botones a mostrar
   */
  public buttonsGroup = {
    header: [] as TModalButtonOptions[],
    footer: [] as TModalButtonOptions[],
  };

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

        //* Añadimos la posición de las secciones de header y footer respecto al flex
        this._setSectionPosition();

        //* Creamos botones
        this._createButtons();
      },
    });
  }

  // ANCHOR - Métodos

  /**
   * ? Limpia los contenedores
   */
  private _cleanContent(): void {
    this.modalBody && this.contentComponent.clear();
    this._modalSvc.componentRef = undefined;
  }

  /**
   * ? Rellena el contenido pasado al modal
   */
  private _fillContent(): void {
    if (!!this.display?.component) {
      this.display.text = undefined;
      const componentRef = this.contentComponent.createComponent(
        this.display.component
      );
      this._modalSvc.componentRef = componentRef;
    }
  }

  /**
   * ? Fija los estilos y clases de las secciones de la modal recibidos al crear el modal
   */
  private _setSectionStylesAndClasses(): void {
    const {
      style,
      class: className,
      title,
      header,
      footer,
      backdrop,
      body,
    } = this.display?.options!;
    //* Modal
    this._setStylesAndClasses(this.modal.nativeElement, style, className);
    //* Título
    this.modalTitle &&
      this._setStylesAndClasses(
        this.modalTitle.nativeElement,
        title?.style,
        title?.class
      );
    //* Header
    this.modalHeader &&
      this._setStylesAndClasses(
        this.modalHeader.nativeElement,
        header?.style,
        header?.class
      );
    //* Body
    this.modalBody &&
      this._setStylesAndClasses(
        this.modalBody.nativeElement,
        body?.style,
        body?.class
      );
    //* Footer
    this.modalFooter &&
      this._setStylesAndClasses(
        this.modalFooter.nativeElement,
        footer?.style,
        footer?.class
      );
    //* Backdrop
    this.modalBackdrop &&
      this._setStylesAndClasses(
        this.modalBackdrop.nativeElement,
        backdrop?.style,
        backdrop?.class
      );
  }

  /**
   * ? Fija las clases y estilos por cada elemento
   * @param {HTMLDivElement} element
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
   * ? Fija la posicion de los elementos de la sección
   */
  private _setSectionPosition(): void {
    const { header, footer } = this.display?.options!;

    header?.direction &&
      this.modalHeader?.nativeElement.classList.add(
        'position__direction--' + header?.direction
      );
    footer?.direction &&
      this.modalFooter?.nativeElement.classList.add(
        'position__direction--' + footer?.direction
      );

    header?.justify &&
      this.modalHeaderButtons?.nativeElement.classList.add(
        'position__justify--' + header.justify
      );
    footer?.justify &&
      this.modalFooterButtons?.nativeElement.classList.add(
        'position__justify--' + footer.justify
      );
  }

  /**
   * ? Crea botones segun las opciones recibidas al crear el modal
   */
  private _createButtons(): void {
    const { options } = this.display!;

    const orderByPosition =
      () => (a: TModalButtonOptions, b: TModalButtonOptions) => {
        let x: number = a.position || 0;
        let y: number = b.position || 0;

        return x - y;
      };

    //* Ordenar los botones segun su posición dada al crear el boton
    this.buttonsGroup.header = options?.header?.buttons
      ? Object.values(options?.header?.buttons!).sort(orderByPosition())
      : [];
    this.buttonsGroup.footer = options?.footer?.buttons
      ? Object.values(options?.footer?.buttons!).sort(orderByPosition())
      : [];
  }

  /**
   * ? Método al hacer click en el backdrop
   * @param typeClick {string} - Tipo de botón pulsado
   */
  public clickBackdrop(typeClick: string): void {
    this._modalSvc.close(typeClick);
  }
}
