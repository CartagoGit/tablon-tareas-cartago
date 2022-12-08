import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { IModalData } from '../../shared/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  // ANCHOR - Variables
  // /**
  //  * ? Observable del estado del modal
  //  */
  // public display$: Observable<IModalData> = this._modalSvc.watch();

  /**
   * ? Datos recibidos desde el observable del servicio del modal
   */
  public display: IModalData | undefined = undefined;

  /**
   * ? Div donde insertar el componente
   */
  @ViewChild('content', { read: ViewContainerRef }) content!: ViewContainerRef;

  // ANCHOR - Constructor
  constructor(private _modalSvc: ModalService) {}

  ngOnInit(): void {
    this._modalSvc.watch().subscribe({
      next: (modalData: IModalData) => {
        this.display = modalData;
        if (!!modalData.content) {
          (this.content.element.nativeElement as HTMLElement).innerHTML = '';
          this.content.clear();
          if (typeof modalData.content !== 'string') {
            this.content.createComponent(modalData.content as any);
          } else if (typeof modalData.content === 'string') {
            (this.content.element.nativeElement as HTMLElement).innerHTML =
              modalData.content;
          }
        }
      },
    });
  }

  //FIXME Arreglar ng100
  ngAfterViewInit(): void {}

  // ANCHOR - Métodos
  public close(): void {
    this._modalSvc.close();
  }
}
