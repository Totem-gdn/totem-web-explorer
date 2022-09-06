import { Component, OnInit } from '@angular/core';
import { PaginationEvent } from '@app/core/models/page-event-interface.model';

@Component({
  selector: 'totem-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  allChecked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  pageEvent(pagination: PaginationEvent) {
    console.log(pagination);

  }

  notify() {
    console.log('LONG');

  }

}
