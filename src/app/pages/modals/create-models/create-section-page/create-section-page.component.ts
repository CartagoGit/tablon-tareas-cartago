import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-section-page',
  templateUrl: './create-section-page.component.html',
  styleUrls: ['./create-section-page.component.scss']
})
export class CreateSectionPageComponent implements OnInit {

  /**
   * ? Datos recibido y a enviar al crear/cerrar el modal que crea el componente
   */
  public dataRecived: any;
  public dataToSend : any;

  constructor() { }

  ngOnInit(): void {
  }

}
