import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss']
})
export class SortByComponent implements OnInit {

  menuActive = false;

  @Input() extendedSort = false;
  @ViewChild('dropdown') dropdown!: ElementRef;
  @Output() sort = new EventEmitter<string>();
  title = 'items.sort_by'; // for translate

  ngOnInit() {
    if(this.extendedSort) {
      this.title = 'items.my';
    } else {
      this.title = 'items.newest';
    }
  }

  onClickMenu (){
    this.menuActive = !this.menuActive;
  }

  onClick(isClickedInside: any) {
    if (this.dropdown.nativeElement.__ngContext__ === isClickedInside.context && isClickedInside.isInside === false && this.menuActive === true) {
        this.menuActive = false;
    }
  }

  onSort(option: string) {
    if(option == 'my') this.title = 'items.my';
    if(option == 'latest') this.title = 'items.newest'; // for translate
    if(option == 'popular') this.title = 'items.most_popular'; // for translate

    this.sort.emit(option);
    this.menuActive = false;
  }
}
