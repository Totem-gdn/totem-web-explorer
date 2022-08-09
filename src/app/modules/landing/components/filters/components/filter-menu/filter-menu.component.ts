import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss']
})
export class FilterMenuComponent {

  menuActive = false;

  @ViewChild('container') container!: ElementRef;
  @ViewChild('slider') slider!: ElementRef;

  @Input() inputType = 'checkbox';
  @Input() title = 'Title'
  @Input() searchType: string | null = 'search';

  @Input() games = [
    {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, {name: 'Cyberpunk', genre: 'casual'}, 
  ];


  onChangeValue(slider: any) {
    console.log(slider);
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
