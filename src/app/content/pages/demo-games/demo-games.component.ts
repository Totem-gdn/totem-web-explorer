import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-games',
  templateUrl: './demo-games.component.html',
  styleUrls: ['./demo-games.component.scss'],
  host: {
    class: 'w-full'
  }
})
export class DemoGamesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
