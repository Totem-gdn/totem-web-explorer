
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { FiltersService } from '@app/core/services/filters/filters.service';
import { TagsService } from '@app/core/services/filters/tags.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss']
})
export class FilterMenuComponent implements AfterViewInit, OnDestroy {

  constructor(private tagsService: TagsService,
              private filtersService: FiltersService) { }

  menuActive = false;
  checkedItems: any = [];
  sub!: Subscription;

  @ViewChild('wrapper') wrapper!: ElementRef;
  @ViewChild('inputContainer') inputContainer!: ElementRef;
  @ViewChild('menuHeight') menuHeightRef!: ElementRef;

  @Input() inputType = 'checkbox';
  @Input() title = 'Title'
  @Input() menuHeight = '200px';
  @Input() searchType: string | null = 'search';
  @Input() items: any[] = [{ name: 'Game', genre: 'casual', selected: false }, { name: 'Game', genre: 'casual', selected: true }, { name: 'Game', genre: 'casual', selected: true }, { name: 'Game', genre: 'casual', selected: true }, { name: 'Game', genre: 'casual', selected: true }, { name: 'Game', genre: 'casual', selected: true },];


  ngOnInit() {
    this.resetFilters$();
  }

  ngAfterViewInit(): void {
    this.menuHeightRef.nativeElement.style.height = this.menuHeight;
  }

  onClickMenu() {
    this.menuActive = !this.menuActive;

    if (this.menuActive) {
      this.wrapper.nativeElement.style.maxHeight = '340px';
    } else if (!this.menuActive) {
      this.wrapper.nativeElement.style.maxHeight = '50px';
    }
  }

  resetFilters$() {
    this.sub = this.filtersService.onResetFilters$().subscribe(() => {
      this.menuActive = false;

      if (this.menuActive) {
        this.wrapper.nativeElement.style.maxHeight = '340px';
      } else if (!this.menuActive) {
        this.wrapper.nativeElement.style.maxHeight = '50px';
      }

      this.checkedItems.forEach((tag: any) => {
        tag.reference.checked = false;
      })
      this.checkedItems = [];
    })
  }

  onChangeInput(event: any) {
    const value = event.target.value;
    const reference = event.target;
    if (this.inputType === 'radio') {
      this.tagsService.removeTag(this.checkedItems[0]);
      this.checkedItems = [{value: value, reference: reference}];
      this.tagsService.addTag = {value: value, reference: reference};
    }

    if (this.inputType === 'checkbox') {
      if (event.target.checked) {
        this.checkedItems.push({value: value, reference: reference});
        this.tagsService.addTag = {value: value, reference: reference};
      }

      if (!event.target.checked) {
        const removeFromArray = function (arr: any[], ...theArgs: any) {
          return arr.filter(val => !theArgs.includes(val.value))
        };
        const newArray = removeFromArray(this.checkedItems, value);
        this.checkedItems = newArray;
        
        this.tagsService.removeTag({value: value, reference: reference});
      }
    }

  }

  onInput(e: any) {
    e.target.checked = false;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
