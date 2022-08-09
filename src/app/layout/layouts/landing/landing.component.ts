import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'landing-layout',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  host: {
    class: 'max-w-full w-full flex-auto relative flex'
  }
})
export class LandingLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
