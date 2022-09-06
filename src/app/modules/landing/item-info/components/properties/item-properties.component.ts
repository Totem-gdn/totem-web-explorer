import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'item-properties',
  templateUrl: './item-properties.component.html',
  styleUrls: ['./item-properties.component.scss'],
  // host: {
  //   class: 'flex'
  // }
})
export class ItemPropertiesComponent implements OnInit, AfterViewChecked {

  constructor() { }

  showViewAll: boolean | null = false;
  toggle = false;

  @ViewChild('grid') grid!: ElementRef;

  ngOnInit(): void {
  }

  onClickViewAll() {
    if(this.toggle === false) {
      this.grid.nativeElement.style.maxHeight = '1500px';
      this.toggle = true;
    } else if(this.toggle === true) {
      this.grid.nativeElement.style.maxHeight = '687px';
      this.toggle = false;
    }
    
    // this.showViewAll = null;
  }
 
  ngAfterViewChecked(): void {
    if(this.grid.nativeElement.scrollHeight > 690 && this.showViewAll != null) {
      this.showViewAll = true;
    }
    if(this.grid.nativeElement.scrollHeight <= 690 && this.showViewAll != null) {
      this.showViewAll = false;
    }
  }

}
