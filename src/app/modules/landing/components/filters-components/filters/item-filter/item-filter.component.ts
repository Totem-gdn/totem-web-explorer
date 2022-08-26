import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ProfileService } from '@app/core/services/filters/dropup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'item-filters',
  templateUrl: './item-filter.component.html',
  styleUrls: ['./item-filter.component.scss']
})
export class ItemFilterComponent implements AfterViewInit, OnDestroy {

  constructor(private profileService: ProfileService) {}

  @ViewChild('dropupMenu') dropupMenu!: ElementRef;

  isDropupOpen!: boolean;
  sub!: Subscription;
  
  ngAfterViewInit() {
    this.sub = this.profileService.dropupOpen$.subscribe(isOpen => {
      this.isDropupOpen = isOpen;

      this.updateMenu();
    })
  }

  toggleMenu() {
    this.profileService.dropupOpen = !this.profileService.dropupOpen;
  }

  onCloseMenu() {
    this.profileService.dropupOpen = false;
  }

  updateMenu() {

    if (this.isDropupOpen) {
      this.dropupMenu.nativeElement.style.maxHeight = '1000px';
    }
    if (!this.isDropupOpen) {
      this.dropupMenu.nativeElement.style.maxHeight = '25px';
    }
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
