import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, switchMap, debounceTime, of} from 'rxjs';
import { Items } from '../models/items-interface.model';

const items: Items[] = [
  {
    name: 'Mr.Krabs kills',
    type: 'Horror',
    img: 'assets/images/promo-game.png'
  },
  {
    name: 'GTA 6',
    type: 'Arcade',
    img: 'assets/images/promo-game.png'
  },
  {
    name: 'Conta City',
    type: 'Shooter',
    img: 'assets/images/promo-game.png'
  },
  {
    name: 'Mineground',
    type: 'Sandbox',
    img: 'assets/images/promo-game.png'
  },
  {
    name: 'Crysis 5',
    type: 'Shooter',
    img: 'assets/images/promo-game.png'
  },
  {
    name: 'Stalker: killzone',
    type: 'Action',
    img: 'assets/images/promo-game.png'
  },
  {
    name: 'Survival Zone Craft',
    type: 'Survival',
    img: 'assets/images/promo-game.png'
  },
]

@Component({
  selector: 'totem-search-filter',
  templateUrl: './totem-search-filter.component.html',
  styleUrls: ['./totem-search-filter.component.scss']
})
export class TotemSearchFilterComponent implements OnInit {
  searchInfo = new FormControl('');
  dropdownOpened: boolean = false;
  dropdownHovered: boolean = false;

  itemsArray = new BehaviorSubject<Items[] | null>(null);
  avatarsArray = new BehaviorSubject<Items[] | null>(null);
  gamesArray = new BehaviorSubject<Items[] | null>(null);

  activeTab: string = 'items';

  tabType = {
    ITEMS_TAB: 'items',
    AVATARS_TAB: 'avatars',
    GAMES_TAB: 'games',
  }

  @ViewChild('searchInput') searchInput!: ElementRef;
  loading$ = new BehaviorSubject(false);

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.initFormListener();
  }

  initFormListener() {
    this.searchInfo.valueChanges.pipe(
      debounceTime(600),
      switchMap((id: string | null) => {
        return of(id);
      })
    )
    .subscribe((text: string | null) => {
      console.log(text);
      if (text?.length) {
        this.dropdownOpened = true;
        this.getItems(text);
      }
    });
  }

  getItems(params: string) {
    this.loading$.next(true);
    setTimeout(() => {
      let itemsArray = items.filter((item: Items) => item.name.toLowerCase().includes(params));
      this.processItems(itemsArray && itemsArray.length ? itemsArray.slice(0, 4) : null);
    }, 1200);
  }

  processItems(items: Items[] | null) {
    this.loading$.next(false);
    this.itemsArray.next(items);
  }

  goToPage() {
    if (this.activeTab === this.tabType.ITEMS_TAB) {
      /* router */
      this.router.navigate(['/items']);
    } else if (this.activeTab === this.tabType.AVATARS_TAB) {
      /* router */
      this.router.navigate(['/avatars']);
    } else if (this.activeTab === this.tabType.GAMES_TAB) {
      /* router */
      this.router.navigate(['/games']);
    }
    this.dropdownOpened = false;
  }

  changeTab(tab: string) {
    this.activeTab = tab;
  }

  eraseInput() {
    this.searchInfo.setValue(null);
    this.searchInput.nativeElement.focus();
  }

  onBlur() {
    if (!this.dropdownHovered) {
      this.dropdownOpened = false;
    }
  }

  onFocus() {
    if (this.searchInfo.value) {
      this.dropdownOpened = true;
    }
  }

  mouseEnter() {
    this.dropdownHovered = true;
  }
  mouseLeave() {
    this.searchInput.nativeElement.focus();
    this.dropdownHovered = false;
  }

}
