import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FiltersService } from '@app/components/common/filters-components/services/filters.service';

@Component({
  selector: 'sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss']
})
export class SortByComponent {

  menuActive = false;

  @ViewChild('dropdown') dropdown!: ElementRef;
  @Output() sort = new EventEmitter<string>();
  title = 'Sort by';

  onClickMenu (){
    this.menuActive = !this.menuActive;
  }

  onClick(isClickedInside: any) {
    if (this.dropdown.nativeElement.__ngContext__ === isClickedInside.context && isClickedInside.isInside === false && this.menuActive === true) {
        this.menuActive = false;
    }
  }

  onSort(option: string) {
    if(option == 'latest') this.title = 'Newest';
    if(option == 'popular') this.title = 'Most Popular';

    this.sort.emit(option);
  }
}
