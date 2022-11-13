import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subject, Subscription, takeUntil } from 'rxjs';

enum queries {
  sm = '(min-width: 480px)',
  md = '(min-width: 768px)',
  lg = '(min-width: 1000px)',
}
@Component({
  selector: 'item-properties',
  templateUrl: './item-properties.component.html',
  styleUrls: ['./item-properties.component.scss'],
  // host: {
  //   class: 'flex'
  // }
})
export class ItemPropertiesComponent implements AfterViewInit, OnDestroy {

  constructor(private media: BreakpointObserver) { }

  subs = new Subject<void>();
  showViewAll: boolean | null = false;
  toggle = false;
  placeholdersSub!: Subscription;

  tagsWidth = [];
  _properties!: any[];
  placeholders = [];

  @ViewChild('grid') grid!: ElementRef;

  @Input() set properties(properties: any[]) {
    this._properties = properties;
    this.placeholdersSub?.unsubscribe();
    this.placeholders$();
    setTimeout(() => {
      this.checkTagsOverflow();

    }, 100)
  };

  ngAfterViewInit(): void {
    this.checkTagsOverflow();
    this.placeholders$();
  }

  onResize() {
    this.checkTagsOverflow();
  }

  onOver(e: any) {
    const pos = e.target.getBoundingClientRect().x;
    const width = e.target.offsetWidth;

    if (window.innerWidth - 80 < pos + width) {
      const tooltip = e.target.getElementsByClassName('tooltip');
      if (!tooltip[0]) return;
      tooltip[0].style.left = '0px';
    } else {
      const tooltip = e.target.getElementsByClassName('tooltip');
      if (!tooltip[0]) return;
      tooltip[0].style.left = '50%';
    }
  }

  placeholders$() {
    this.placeholdersSub = this.media
      .observe(['(min-width: 480px)', '(min-width: 768px)', '(min-width: 1000px)'])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints[queries.lg] == true) {
          this.gridPlaceholders(8);
        } else if (state.breakpoints[queries.md] == true) {
          this.gridPlaceholders(6);
        } else if (state.breakpoints[queries.sm] == true) {
          this.gridPlaceholders(3);
        } else {
          this.gridPlaceholders(2);
        }
      });
  }

  gridPlaceholders(length: number) {
    if (this._properties.length < length) {
      this.placeholders = [].constructor(length % this._properties.length)
      return;
    }
    const placeholders = length % this._properties.length - this._properties.length % length;
    if(this._properties.length % length == 0) {
      this.placeholders = [];
    } else {
      this.placeholders = [].constructor(placeholders);
    }


    if(this._properties.length / length > 4) {
      this.showViewAll = true;
      this.calculateMaxHeight(4);
    } else {
      this.showViewAll = false;
    }
  }

  calculateMaxHeight(maxRows: number | null) {
    if(!this.grid) return;
    const grid = this.grid.nativeElement;

    if(maxRows == null) {
      grid.style.maxHeight = '1000px'
      return;
    }

    const tagHeight = (+grid.getElementsByClassName('item-tag')[0].offsetHeight) * maxRows;
    const gap = 12 * (maxRows - 1);
    const padding = 15;
    grid.style.maxHeight = `${gap + tagHeight + padding}px`;
  }

  checkTagsOverflow() {
    const tags = this.grid.nativeElement.getElementsByClassName('item-tag')
    if(!tags) return;

    for (let tag of tags) {
      if (+tag.firstChild.offsetWidth < +tag.firstChild.scrollWidth) {
        if (!tag.children[1] || !tag.children[3]) return;
        tag.children[1].style.display = 'block'
        tag.children[3].style.display = 'flex'
      } else {
        if (!tag.children[1] || !tag.children[3]) return;
        tag.children[1].style.display = 'none'
        tag.children[3].style.display = 'none'
      }
    }
  }


  onClickViewAll() {
    if (this.toggle === false) {
      this.calculateMaxHeight(null);
      this.toggle = true;
    } else if (this.toggle === true) {
      this.calculateMaxHeight(4);
      this.toggle = false;
    }
  }

  ngOnDestroy(): void {
    this.placeholdersSub?.unsubscribe();
    this.subs.next();
    this.subs.complete();
  }

}
