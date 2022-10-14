import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'item-properties',
  templateUrl: './item-properties.component.html',
  styleUrls: ['./item-properties.component.scss'],
  // host: {
  //   class: 'flex'
  // }
})
export class ItemPropertiesComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private media: BreakpointObserver) { }

  subs = new Subject<void>();
  showViewAll: boolean | null = false;
  toggle = false;

  @Input() properties!: any[];
  @ViewChild('grid') grid!: ElementRef;

  tagsWidth = [];
  placeholders = [];

  ngOnInit(): void {
    const queries = {sm: '(min-width: 480px)', md: '(min-width: 768px)', lg: '(min-width: 1000px)'}
    this.media
      .observe(['(min-width: 480px)', '(min-width: 768px)', '(min-width: 1000px)'])
      .pipe(takeUntil(this.subs))
      .subscribe((state: BreakpointState) => {
        if(state.breakpoints[queries.lg] == true) {
          if(this.properties.length < 8) {
            this.placeholders = [].constructor(8 % this.properties.length)
            return;
          }
          const placeholders = 8 % this.properties.length - this.properties.length % 8;
          this.placeholders = [].constructor(placeholders);
        } else if(state.breakpoints[queries.md] == true) {
          if(this.properties.length < 6) {
            this.placeholders = [].constructor(6 % this.properties.length)
            return;
          }
          const placeholders = 6 % this.properties.length - this.properties.length % 6;
          this.placeholders = [].constructor(placeholders);
        } else if(state.breakpoints[queries.sm] == true) {
          if(this.properties.length < 3) {
            this.placeholders = [].constructor(3 % this.properties.length)
            return;
          }
          const placeholders = 3 % this.properties.length - this.properties.length % 3;
          this.placeholders = [].constructor(placeholders);
        } else {
          if(this.properties.length < 2) {
            this.placeholders = [].constructor(2 % this.properties.length)
            return;
          }
          const placeholders = 2 % this.properties.length - this.properties.length % 2;
          this.placeholders = [].constructor(placeholders);
        }
        // for(let br of state.breakpoints) {
        //   console.log(br)
        //   // if(br == queries.sm) {
        //   //   console.log('small')
        //   // } else if(br == queries.md) {
        //   //   console.log(',edium')
        //   // } else if (br == queries.lg) {
        //   //   console.log('large')
        //   // }
        // }
      });
  }

  ngAfterViewInit(): void {
    this.checkTagsOverflow();
  }

  onResize() {
    this.checkTagsOverflow();
  }

  onOver() {
  }

  offset() {
  }

  checkTagsOverflow() {
    const tags = this.grid.nativeElement.getElementsByClassName('item-tag')
    const tagWidth = tags[0].offsetWidth - 20;

    for (let tag of tags) {
      if (tagWidth + 1 < tag.firstChild.scrollWidth) {
        tag.children[1].style.display = 'block'
      } else {
        tag.children[1].style.display = 'none'
      }
    }
  }


  onClickViewAll() {
    if (this.toggle === false) {
      this.grid.nativeElement.style.maxHeight = '1500px';
      this.toggle = true;
    } else if (this.toggle === true) {
      this.grid.nativeElement.style.maxHeight = '687px';
      this.toggle = false;
    }

    // this.showViewAll = null;
  }

  ngAfterViewChecked(): void {
    if (this.grid.nativeElement.scrollHeight > 690 && this.showViewAll != null) {
      this.showViewAll = true;
    }
    if (this.grid.nativeElement.scrollHeight <= 690 && this.showViewAll != null) {
      this.showViewAll = false;
    }
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }

}
