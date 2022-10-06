import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FiltersService } from '@app/modules/landing/components/filters-components/services/filters.service';

@Component({
  selector: 'sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss']
})
export class SortByComponent {

  menuActive = false;

  @ViewChild('dropdown') dropdown!: ElementRef;

  constructor(private filtersService: FiltersService) {}

  onClickMenu (){
    this.menuActive = !this.menuActive;
  }

  onClick(isClickedInside: any) {
    if (this.dropdown.nativeElement.__ngContext__ === isClickedInside.context && isClickedInside.isInside === false && this.menuActive === true) {
        this.menuActive = false;
    }
  }

  onSort(option: string) {
    this.filtersService.sort = option;
  }
}
