import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss']
})
export class SortByComponent {

  menuActive = false;

  onClickMenu (){
    this.menuActive = !this.menuActive;
  }

}
