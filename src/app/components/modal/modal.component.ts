import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { IModalOptions } from '../../shared/structures/interfaces/modal.interfaces';
import {
  IModalData,
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

  /**
   * ? Opciones recibidas desde el observable del servicio del modal
   */
  public options: IModalOptions | undefined = undefined;

  /**
   * ? Clase de los grupos de botones
   */
  public headerButtonsClass: string = '';
  public footerButtonsClass: string = '';
  public headerClass: string = '';
  public footerClass: string = '';

  /**
   * ? Listener cuando el modal termine la transicion del css
   */
  @ViewChild('modalBackdrop')
  private _modalBackdrop!: ElementRef<HTMLDivElement>;

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
    // * Subscripción para recuperar los datos recibidos al abrir el modal
    this._modalSvc.watch().subscribe({
      next: (modalData: IModalData) => {
        //* Asignamos las variables
        this.display = modalData;
        this.options = modalData.options;
        if (modalData.state === 'close') return;

        //* Limpiamos los contenedores
        this._cleanContent();

        //* Rellenamos el contenido segun los enviado al abrir el modal
        this._fillContent();

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
    this.headerClass = '';
    this.footerClass = '';
    this.headerButtonsClass = '';
    this.footerButtonsClass = '';
    this.contentComponent.clear();
    this._modalSvc.componentRef?.destroy();
  }

  /**
   * ? Activa el metodo cuando la transicion del modal termina
   */
  public transitionModalEnd(): void {
    if (this._modalBackdrop.nativeElement.classList.contains('modal--close')) {
      this._cleanContent();
    }
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
   * ? Fija la posicion de los elementos de la sección y sus clases
   */
  private _setSectionPosition(): void {
    const { header, footer } = this.display?.options!;

    this.headerClass = this.options?.header?.class || '';
    this.footerClass = this.options?.footer?.class || '';

    header?.direction &&
      (this.headerClass += ' position__direction--' + header?.direction);
    footer?.direction &&
      (this.footerClass += ' position__direction--' + footer?.direction);

    header?.justify &&
      (this.headerButtonsClass += ' position__justify--' + header.justify);
    footer?.justify &&
      (this.footerButtonsClass += ' position__justify--' + footer.justify);
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
   * @param typeClick {string} - Lugar donde se hizo click
   */
  public clickBackdrop(typeClick: string): void {
    this._modalSvc.close(typeClick);
  }
}
