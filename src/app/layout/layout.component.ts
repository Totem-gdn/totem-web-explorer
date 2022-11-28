import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  host: {
    class: 'max-w-full w-full flex-auto relative flex h-full'
  }

})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  

}
