import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Animations } from '@app/core/animations/animations';
import { AssetDNAField, DNAField } from '@app/core/models/interfaces/dna-field.model';
import { Subject, Subscription } from 'rxjs';

enum queries {
  sm = '(min-width: 480px)',
  md = '(min-width: 768px)',
  lg = '(min-width: 1000px)',
}
@Component({
  selector: 'item-properties',
  templateUrl: './item-properties.component.html',
  styleUrls: ['./item-properties.component.scss'],
  animations: [
    Animations.animations
  ]
  // host: {
  //   class: 'flex'
  // }
})
export class ItemPropertiesComponent implements AfterViewInit, OnDestroy {

  constructor(private media: BreakpointObserver,
              private changeDetector: ChangeDetectorRef) { }

  subs = new Subject<void>();
  showViewAll: boolean | null = false;
  toggle = false;
  placeholdersSub!: Subscription;

  tagsWidth = [];
  _properties!: AssetDNAField[] | null;
  placeholders = [];
  timeout!: any;

  @ViewChild('grid') grid!: ElementRef;
  @ViewChild('tooltip') tooltip!: ElementRef;
  tooltipData!: any;

  @Input() set properties(properties: any[]) {
    if (!properties) return;
    this.handlePropertiesInput(properties);
  };

  isValueColor(value: string | undefined) {
    if (!value) return false;
    const s = new Option().style;
    s.color = value;
    return s.color !== '';
  }

  ngAfterViewInit(): void {
    this.checkTagsOverflow();
    // this.placeholders$();
    this.changeDetector.detectChanges();
  }

  onResize() {
    this.checkTagsOverflow();
  }

  onOver(e: any, propertie: any) {
    if (!this.tooltip) return;
    if (!(+e.firstChild.offsetWidth < +e.firstChild.scrollWidth)) return;
    const tooltip = this.tooltip.nativeElement;

    const tagRect = e.getBoundingClientRect();
    const width = e.offsetWidth;
    const height = e.offsetHeight;
    const x = e.offsetLeft + width / 2;
    const y = e.offsetTop + height / 2;

    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';

    this.tooltipData = { title: propertie.description, value: propertie.value }
    if (window.innerWidth - 80 < tagRect.x + width) {
      tooltip.style.left = `${x - width / 2}px`;
      tooltip.style.top = `${y}px`;
    } else {
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
    }
  }
  onLeave() {
    if (!this.tooltip) return;
    const tooltip = this.tooltip.nativeElement;
    tooltip.style.visibility = 'hidden';
    tooltip.style.opacity = '0';
  }

  handlePropertiesInput(properties: any[]) {
    let gridHeight: any;
    if(this.grid) {
      gridHeight = this.grid.nativeElement.getBoundingClientRect().height;
      // this.grid.nativeElement.style.height = `${gridHeight}px`;
    }
    this._properties = [];
    this.placeholders = [];
    this.placeholdersSub?.unsubscribe();
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      // if(this.grid) this.grid.nativeElement.style.height = 'auto';
      this._properties = properties;
      this.placeholders$();
      setTimeout(() => {
        this.checkTagsOverflow();
      }, 100)
    }, 400)
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
    if (!this._properties) return;
    if (this._properties.length < length) {
      this.placeholders = [].constructor(length - this._properties.length)
      return;
    }
    const placeholders = length % this._properties.length - this._properties.length % length;
    if (this._properties.length % length == 0) {
      this.placeholders = [];
    } else {
      this.placeholders = [].constructor(placeholders);
    }


    if (this._properties.length / length > 4) {
      this.showViewAll = true;
      this.calculateMaxHeight(4);
    } else {
      this.showViewAll = false;
    }
  }

  calculateMaxHeight(maxRows: number | null) {
    if (!this.grid) return;
    const grid = this.grid.nativeElement;

    if (maxRows == null) {
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
    if (!tags) return;

    for (let tag of tags) {
      if (+tag.firstChild.offsetWidth < +tag.firstChild.scrollWidth) {
        if (!tag.children[1]) return;
        tag.children[1].style.display = 'block'
      } else {
        if (!tag.children[1]) return;
        tag.children[1].style.display = 'none'
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
