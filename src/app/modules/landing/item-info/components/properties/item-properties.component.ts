import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'item-properties',
  templateUrl: './item-properties.component.html',
  styleUrls: ['./item-properties.component.scss'],
  // host: {
  //   class: 'flex'
  // }
})
export class ItemPropertiesComponent implements OnInit, AfterViewChecked, AfterViewInit {

  constructor() { }

  showViewAll: boolean | null = false;
  toggle = false;

  @ViewChild('grid') grid!: ElementRef;
  tagsWidth = [];

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.checkTagsOverflow();
    
  }

  onResize() {
    this.checkTagsOverflow();
  }

  onOver() {
    console.log('over')
  }

  offset() {
    console.log('offset');
  }

  checkTagsOverflow() {
    const tags = this.grid.nativeElement.children;
    const tagWidth = tags[0].offsetWidth - 30;
    console.log(tagWidth);

    for(let tag of tags) {
      if(tagWidth > tag.firstChild.scrollWidth) {

      }
    }
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
