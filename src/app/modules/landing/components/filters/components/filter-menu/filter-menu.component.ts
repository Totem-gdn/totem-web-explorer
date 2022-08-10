import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss']
})
export class FilterMenuComponent {

  menuActive = false;
  minValue = 0;
  maxValue = 5;

  @ViewChild('container') container!: ElementRef;

  @Input() inputType = 'checkbox';
  @Input() title = 'Title'
  @Input() searchType: string | null = 'search';

  @Input() games = [
    {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, 
  ];


  onChangeMinValue(minValue: any) {
    this.minValue = minValue;
  }
    
  onChangeMaxValue(maxValue: any) {
    this.maxValue = maxValue;
  }

  onClickMenu() {
    this.menuActive = !this.menuActive;

    if(this.menuActive) {
      this.container.nativeElement.style.maxHeight = '340px';
    } else if (!this.menuActive) {
      this.container.nativeElement.style.maxHeight = '50px';
    }
  }
}
