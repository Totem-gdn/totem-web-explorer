import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FiltersService } from '@app/core/services/filters/filters.service';

import { concat, exhaustMap, fromEvent, map, Subscription, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'item-filters',
  templateUrl: './item-filter.component.html',
  styleUrls: ['./item-filter.component.scss']
})
export class ItemFilterComponent implements AfterViewInit, OnDestroy {

  constructor(private filtersService: FiltersService,
              @Inject(DOCUMENT) private document: Document) {}

  @ViewChild('dropupMenu') dropupMenu!: ElementRef;

  isDropupOpen!: boolean;
  sub!: Subscription;
  
  ngAfterViewInit() {
    this.sub = this.filtersService.dropupOpen$.subscribe(isOpen => {
      this.isDropupOpen = isOpen;

      this.updateMenu();
    })
  }

  toggleMenu() {
    this.filtersService.dropupOpen = !this.filtersService.dropupOpen;
  }

  onCloseMenu() {
    this.filtersService.dropupOpen = false;
  }

  updateMenu() {
    if (this.isDropupOpen) {
      this.document.body.style.position = 'fixed';
      this.dropupMenu.nativeElement.style.maxHeight = '80vh';
      this.dropupMenu.nativeElement.style.overflowY = 'auto';
    }
    if (!this.isDropupOpen) {
      this.document.body.style.position = 'inherit';
      this.dropupMenu.nativeElement.style.maxHeight = '25px';
      this.dropupMenu.nativeElement.style.overflowY = 'hidden';
    }
  }

  onClickApply() {
    this.filtersService.dropupOpen = false;
  }

  onClickClear() {
    this.filtersService.doResetFilters();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }



  games = [{ name: 'Mr.Krabs kills', subName: 'horror' }, { name: 'GTA 6', subName: 'arcade' }, { name: 'Mr.Krabs kills', subName: 'horror' }, { name: 'GTA 6', subName: 'arcade' }, { name: 'Mr.Krabs kills', subName: 'horror' }, { name: 'GTA 6', subName: 'arcade' }, { name: 'Mr.Krabs kills', subName: 'horror' }, { name: 'GTA 6', subName: 'arcade' },]
  elements = [{ name: 'Fire' }, { name: 'Earth' }, { name: 'Air' }, { name: 'Water' }]
  colors = [{ name: 'Red' }, { name: 'Blue' }, { name: 'Yellow' }, { name: 'Green' }, { name: 'Orange' }]
  itemTypes = [{ name: 'Armour', subName: 'Slot' }, { name: 'Arms', subName: 'Slot' }, { name: 'Body', subName: 'Head' }, { name: 'Armour', subName: 'Slot' }]
  materials = [{ name: 'Bone' }, { name: 'Stone' }, { name: 'Wood' }, { name: 'Metall' }]
}
