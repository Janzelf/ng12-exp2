import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selectinc',
  template: `
  <app-incassodashboard [isProef]="false"></app-incassodashboard>
  `,
  styles: []
})
export class SelectincComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
