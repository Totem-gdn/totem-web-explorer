
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { FiltersService } from '@app/components/common/filters-components/services/filters.service';
import { TagsService } from '@app/components/common/filters-components/services/tags.service';
import { GamesService } from '@app/core/services/assets/games.service';
import { concatMap, Subscription } from 'rxjs';

@Component({
  selector: 'filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss']
})
export class FilterMenuComponent implements AfterViewInit, OnDestroy {

  constructor(
    private tagsService: TagsService,
    private filtersService: FiltersService,
    private gamesService: GamesService,
  ) { }

  menuActive = false;
  checkedItems: any = [];
  loadingItems: boolean | null = false;
  sub!: Subscription;
  page = 1;

  @ViewChild('wrapper') wrapper!: ElementRef;
  @ViewChild('inputContainer') inputContainer!: ElementRef;
  @ViewChild('menuHeight') menuHeightRef!: ElementRef;

  @Input() inputType = 'checkbox';
  @Input() title = 'Title'
  @Input() type = '';
  @Input() menuHeight = '200px';
  @Input() searchType: string | null = 'search';
  @Input() items!: any[];


  ngOnInit() {
    this.resetFilters$();
    this.processMenuContent();
  }

  ngAfterViewInit() {
    if (this.items && this.searchType != 'graph' && this.searchType != 'range') {
      this.menuHeightRef.nativeElement.style.height = this.menuHeight;
    }
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
    console.log('radio value', event.target.value);
    if (this.inputType === 'radio') {
      if(this.checkedItems[0]) this.tagsService.removeTag(this.checkedItems[0]);
      this.checkedItems = [{ value: value, type: this.title, reference: reference }];
      this.tagsService.addTag = { value: value, type: this.title, inputType: this.inputType, reference: reference };
    }

    if (this.inputType === 'checkbox') {
      if (event.target.checked) {
        this.checkedItems.push({ value: value, type: this.title, reference: reference });
        this.tagsService.addTag = { value: value, type: this.title, inputType: this.inputType, reference: reference };
      }

      if (!event.target.checked) {
        const removeFromArray = function (arr: any[], ...theArgs: any) {
          return arr.filter(val => !theArgs.includes(val.value))
        };
        const newArray = removeFromArray(this.checkedItems, value);
        this.checkedItems = newArray;

        this.tagsService.removeTag({ value: value, type: this.title, inputType: this.inputType, reference: reference });
      }
    }
  }

  processMenuContent() {
    if (this.type == 'games') {
        this.loadMoreGames();
    }
  }

  onInput(e: any) {
    e.target.checked = false;
  }

  loadMoreGames() {
    if(this.loadingItems == true && this.type =='games') return;
    this.loadingItems = true;
    this.gamesService.fetchGames(this.page)
        .subscribe(games => {
          if (!this.items) this.items = [];

          for (let game of games) this.items.push(game);

          if(games?.length < 10) {
            this.loadingItems = null;
            return;
          }
          this.loadingItems = false;
          this.page++;
        });
  }
  scrolledToBottom() {
    this.loadMoreGames();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
