import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  host: {
    class: 'max-w-full w-full flex-auto relative flex'
  }

})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}