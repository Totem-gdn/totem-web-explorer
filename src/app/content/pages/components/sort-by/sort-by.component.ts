import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { ASSET_PARAM_LIST } from '@app/core/models/enums/params.enum';

@Component({
  selector: 'sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss']
})
export class SortByComponent implements OnInit {
  get paramType() { return ASSET_PARAM_LIST }

  menuActive = false;

  @Input() type!: ASSET_TYPE | 'game';
  @ViewChild('dropdown') dropdown!: ElementRef;

  @Output() sort = new EventEmitter<ASSET_PARAM_LIST>();
  title:string = 'Newest'; // for translate

  ngOnInit() {
    // this.title = 'items.newest'
    // if(this.type == 'game') {
    //   this.title = 'items.my';
    // } else {
    //   this.title = 'items.newest';
    // }
  }

  onClickMenu (){
    this.menuActive = !this.menuActive;
  }

  onClick(isClickedInside: any) {
    if (this.dropdown.nativeElement.__ngContext__ === isClickedInside.context && isClickedInside.isInside === false && this.menuActive === true) {
        this.menuActive = false;
    }
  }

  onSort(option: ASSET_PARAM_LIST) {
    if(option == ASSET_PARAM_LIST.LATEST) this.title = 'Newest';
    if(option == ASSET_PARAM_LIST.POPULAR) this.title = 'Popular';

    // this.title = option;

    this.sort.emit(option);
    this.menuActive = false;
  }
}
