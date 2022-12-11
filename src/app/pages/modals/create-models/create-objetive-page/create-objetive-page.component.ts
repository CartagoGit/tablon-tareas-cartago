import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-objetive-page',
  templateUrl: './create-objetive-page.component.html',
  styleUrls: ['./create-objetive-page.component.scss'],
})
export class CreateObjetivePageComponent implements OnInit {
  // public varPrueba: string = 'Hola';
  // dataRecived: any;
  dataToSend: any = 'algo123';

  constructor() {}

  ngOnInit(): void {
    // console.log(1, this.dataRecived);
  }

  ngOnDestroy(): void {
    // console.log(this.varPrueba);
  }
}
