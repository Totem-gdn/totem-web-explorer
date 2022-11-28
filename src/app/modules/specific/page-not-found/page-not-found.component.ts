import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  host: {
    class: 'flex flex-auto w-full h-full'
  }
})
export class PageNotFoundComponent implements OnInit, OnDestroy {

  constructor() {}

  async ngOnInit() {}

  ngOnDestroy(): void {}

}
