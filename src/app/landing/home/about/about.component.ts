import { Component, OnInit } from '@angular/core';
import { ItemsFilterService } from '../services/items-filter.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    class: 'h-full'
  }
})
export class AboutComponent implements OnInit {

  constructor(private itemsService: ItemsFilterService) { }


  ngOnInit(): void {
  }

}
