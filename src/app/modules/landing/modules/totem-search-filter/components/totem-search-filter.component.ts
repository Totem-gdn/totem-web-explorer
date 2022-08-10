import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'totem-search-filter',
  templateUrl: './totem-search-filter.component.html',
  styleUrls: ['./totem-search-filter.component.scss']
})
export class TotemSearchFilterComponent implements OnInit {
  searchInfo = new FormControl('');

  constructor() { }

  ngOnInit(): void {
  }

}
