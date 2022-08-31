
import { Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { FiltersService } from '@app/core/services/filters/filters.service';
import { TagsService } from '@app/core/services/filters/tags.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss']
})
export class FilterMenuComponent implements OnDestroy{

  constructor(private tagsService: TagsService,
              private filtersService: FiltersService) { }

  menuActive = false;
  checkedItems: any = [];
  sub!: Subscription;

  @ViewChild('wrapper') wrapper!: ElementRef;
  @ViewChild('inputContainer') inputContainer!: ElementRef;

  @Input() inputType = 'checkbox';
  @Input() title = 'Title'
  @Input() searchType: string | null = 'search';
  @Input() items: any[] | undefined = [{ name: 'Game', genre: 'casual' }, { name: 'Game', genre: 'casual' }, { name: 'Game', genre: 'casual' }, { name: 'Game', genre: 'casual' }, { name: 'Game', genre: 'casual' }, { name: 'Game', genre: 'casual' },];


  ngOnInit() {
    this.onResetFilters();
  }

  onClickMenu() {
    this.menuActive = !this.menuActive;

    if (this.menuActive) {
      this.wrapper.nativeElement.style.maxHeight = '340px';
    } else if (!this.menuActive) {
      this.wrapper.nativeElement.style.maxHeight = '50px';
    }
  }

  onResetFilters() {
    this.sub = this.filtersService.resetFilters$().subscribe(() => {
      this.menuActive = false;

      if (this.menuActive) {
        this.wrapper.nativeElement.style.maxHeight = '340px';
      } else if (!this.menuActive) {
        this.wrapper.nativeElement.style.maxHeight = '50px';
      }
    })
  }

  onChangeInput(event: any) {
    const value = event.target.value;

    if (this.inputType === 'radio') {
      this.tagsService.removeTag(this.checkedItems[0]);
      this.checkedItems = [value];
      this.tagsService.addTag = value;
    }

    if (this.inputType === 'checkbox') {
      if (event.target.checked) {
        this.checkedItems.push(value);
        this.tagsService.addTag = value;
      }

      if (!event.target.checked) {
        const removeFromArray = function (arr: any[], ...theArgs: any) {
          return arr.filter(val => !theArgs.includes(val))
        };
        const newArray = removeFromArray(this.checkedItems, value);
        this.checkedItems = newArray;
        
        this.tagsService.removeTag(value);
      }
    }

  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
