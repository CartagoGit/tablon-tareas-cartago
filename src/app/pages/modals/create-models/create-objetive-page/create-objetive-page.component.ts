import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-objetive-page',
  templateUrl: './create-objetive-page.component.html',
  styleUrls: ['./create-objetive-page.component.scss'],
})
export class CreateObjetivePageComponent implements OnInit {
  public varPrueba: string = 'Hola';

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    console.log(this.varPrueba);
  }
}
