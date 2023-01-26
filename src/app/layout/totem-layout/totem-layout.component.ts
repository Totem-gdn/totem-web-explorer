import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'totem-layout',
  templateUrl: './totem-layout.component.html',
  styleUrls: ['./totem-layout.component.scss'],
  host: {
    class: 'max-w-full w-full flex-auto relative flex h-full'
  }

})
export class TotemLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
