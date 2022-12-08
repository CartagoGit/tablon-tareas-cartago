import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.service';
import {
  TModalState,
  TModalContaint,
  IModalData,
} from '../../shared/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  // ANCHOR - Variables
  /**
   * ? Observable del estado del modal
   */
  public display$: Observable<IModalData> = this.modalSvc.watch();

  // /**
  //  * ? Componente a mostrar en el modal
  //  */
  // public component: Component | undefined = undefined;

  // /**
  //  * ? Componente a mostrar en el modal
  //  */
  // public toShow$: Observable<TModalContaint>  = this.modalSvc.watchContain()

  /**
   * ? Div donde insertar el componente
   */
  @ViewChild('content') content: ElementRef<Component> | undefined = undefined;

  // ANCHOR - Constructor
  constructor(private modalSvc: ModalService) {}

  ngOnInit(): void {}

  // ANCHOR - Métodos
  public close(): void {
    this.modalSvc.close();
  }
}
