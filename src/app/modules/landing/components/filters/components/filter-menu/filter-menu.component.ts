import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss']
})
export class FilterMenuComponent {

  menuActive = false;

  @ViewChild('container') container!: ElementRef;

  @Input() inputType = 'checkbox';
  @Input() title = 'Title'
  @Input() games = [
    {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, 
  ];


  

  onClickMenu() {
    this.menuActive = !this.menuActive;


    if(this.menuActive) {
      this.container.nativeElement.style.maxHeight = '340px';
    } else if (!this.menuActive) {
      this.container.nativeElement.style.maxHeight = '50px';
    }
  }
}
