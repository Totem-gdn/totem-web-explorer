import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
  host: {
    class: 'flex flex-auto w-full h-full'
  }
})
export class PageNotFoundComponent implements OnInit, OnDestroy {

  constructor(private router: Router) {}

  async ngOnInit() {}

  ngOnDestroy(): void {}

}
