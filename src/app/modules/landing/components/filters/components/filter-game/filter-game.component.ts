import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'filter-game',
  templateUrl: './filter-game.component.html',
  styleUrls: ['./filter-game.component.scss']
})
export class FilterGameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() games = [
    {name: 'Cyberpunk', genre: 'Casual'}, {name: 'Cyberpunk', genre: 'Casual'}, {name: 'Cyberpunk', genre: 'Casual'}, {name: 'Cyberpunk', genre: 'Casual'}, {name: 'Cyberpunk', genre: 'Casual'}, {name: 'Cyberpunk', genre: 'Casual'}, {name: 'Cyberpunk', genre: 'Casual'}, {name: 'Cyberpunk', genre: 'Casual'}, {name: 'Cyberpunk', genre: 'Casual'}, 
  ];

}
