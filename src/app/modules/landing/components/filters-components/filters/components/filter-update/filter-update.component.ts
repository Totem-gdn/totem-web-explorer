import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'filter-update',
  templateUrl: './filter-update.component.html',
  styleUrls: ['./filter-update.component.scss']
})

export class FilterUpdateComponent {

@Input() number = 1000;

}
