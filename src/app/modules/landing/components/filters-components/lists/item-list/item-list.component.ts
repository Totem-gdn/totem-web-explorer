import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  host: {
    class: 'w-full'
  }
})
export class ItemListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
