import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selectproef',
  template: `
  <app-incassodashboard [isProef]="true"></app-incassodashboard>
  `,
  styles: []
})
export class SelectproefComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
