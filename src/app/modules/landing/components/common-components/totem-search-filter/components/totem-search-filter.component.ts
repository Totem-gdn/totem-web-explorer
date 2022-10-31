import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarState } from '@app/core/models/sidebar-type-interface.model';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { SubmitGameService } from '@app/modules/add-your-game/services/submit-game.service';
import { SidenavStateService } from '@app/shared/services/sidenav-state.service';
import { BehaviorSubject, switchMap, debounceTime, of, Subscription, take, combineLatest, map} from 'rxjs';
import { Game, Items } from '../models/items-interface.model';
import { GradientService } from '../services/items-gradient.service';

/* const items: Items[] = [
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
] */

@Component({
  selector: 'totem-search-filter',
  templateUrl: './totem-search-filter.component.html',
  styleUrls: ['./totem-search-filter.component.scss']
})
export class TotemSearchFilterComponent implements OnInit, OnDestroy {
  searchInfo = new FormControl('');
  dropdownOpened: boolean = false;
  dropdownHovered: boolean = false;

  itemsArray = new BehaviorSubject<Items[] | null>(null);
  avatarsArray = new BehaviorSubject<Items[] | null>(null);
  gamesArray = new BehaviorSubject<Game[] | null>(null);

  activeTab: string = 'items';

  tabType = {
    ITEMS_TAB: 'items',
    AVATARS_TAB: 'avatars',
    GAMES_TAB: 'games',
  }

  subs: Subscription = new Subscription();
  itemsSub: Subscription = new Subscription();
  subbedToItemsListener: boolean = false;

  @Input()
  focusState: 'true' | 'false' | undefined = undefined;
  @Output()
  routingEvent: EventEmitter<any> = new EventEmitter();

  @ViewChild('searchInput') searchInput!: ElementRef;
  loading$ = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private sidenavStateService: SidenavStateService,
    private totemItemsService: TotemItemsService,
    private route: ActivatedRoute,
    private gradientService: GradientService) { }

  ngOnInit(): void {
    this.initFormListener();
    this.sidenavStateService.sidenavStatus.subscribe((data: SidebarState) => {
      if (data.isOpen) {
        setTimeout(() => {
          if (this.focusState === 'true') {
            this.searchInput.nativeElement.focus();
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.itemsSub.unsubscribe();
  }

  initFormListener() {
    this.subs.add(
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
      })
    );
  }

  getItems(params: string) {
    this.loading$.next(true);
    //this.submitGameService.getGame(params);
    combineLatest([
        this.totemItemsService.getGameByName(params),
        this.totemItemsService.getItemsByName(params),
        this.totemItemsService.getAvatarsByName(params)
      ]).pipe(
          take(1),
          map(([games, items, avatars]) => { return { games, items, avatars } })
        )
        .subscribe((data) => {
          this.gamesArray.next(data.games && data.games?.length ? data.games : null);
          data.items.map((item: Items) => item.gradient = this.getGradient());
          this.itemsArray.next(data.items && data.items?.length ? data.items : null);
          data.avatars.map((avatar: Items) => avatar.gradient = this.getGradient());
          this.avatarsArray.next(data.avatars && data.avatars?.length ? data.avatars : null);
          this.checkTabAfterSearch(data.items?.length || 0, data.avatars?.length | 0, data.games?.length | 0);
          this.loading$.next(false);
        });
      /* this.itemsSub.add(
        this.totemItemsService.getGameByName(params).pipe(take(1)).subscribe((games: any[]) => {
          if (!games?.length) {
            this.gamesArray.next(null);
            this.loading$.next(false);
            return;
          }
          this.gamesArray.next(games);
          this.loading$.next(false);
          console.log('SUBBED');
        })
      );

      this.itemsSub.add(
        this.totemItemsService.getItemsByName(params).pipe(take(1)).subscribe((items: Items[]) => {
          if (!items?.length) {
            this.itemsArray.next(null);
            this.loading$.next(false);
            return;
          }
          items.map((item: Items) => item.gradient = this.getGradient());
          this.itemsArray.next(items);
          this.loading$.next(false);
          console.log('SUBBED');
        })
      );

      this.itemsSub.add(
        this.totemItemsService.getAvatarsByName(params).pipe(take(1)).subscribe((avatars: Items[]) => {
          if (!avatars?.length) {
            this.avatarsArray.next(null);
            this.loading$.next(false);
            return;
          }
          avatars.map((avatar: Items) => avatar.gradient = this.getGradient());
          this.avatarsArray.next(avatars);
          this.loading$.next(false);
          console.log('SUBBED');
        })
      ); */



    /* setTimeout(() => {
      let itemsArray = items.filter((item: Items) => item.name.toLowerCase().includes(params));
      this.processItems(itemsArray && itemsArray.length ? itemsArray.slice(0, 4) : null);
      this.processAvatars(itemsArray && itemsArray.length ? itemsArray.slice(0, 4) : null);
    }, 1200); */
  }

  checkTabAfterSearch(itemsLength: number, avatarsLength: number, gamesLength: number) {
    if (itemsLength == 0 && avatarsLength == 0 && gamesLength == 0) {
      return;
    }
    if (this.activeTab == this.tabType.ITEMS_TAB) {
      if (itemsLength == 0 && avatarsLength == 0) {
        this.changeTab(this.tabType.GAMES_TAB);
      } else if (itemsLength == 0 && avatarsLength > 0) {
        this.changeTab(this.tabType.AVATARS_TAB);
      }
    }
    if (this.activeTab == this.tabType.AVATARS_TAB) {
      if (avatarsLength == 0 && gamesLength == 0) {
        this.changeTab(this.tabType.ITEMS_TAB);
      } else if (avatarsLength == 0 && gamesLength > 0) {
        this.changeTab(this.tabType.GAMES_TAB);
      }
    }
    if (this.activeTab == this.tabType.GAMES_TAB) {
      if (gamesLength == 0 && itemsLength == 0) {
        this.changeTab(this.tabType.AVATARS_TAB);
      } else if (gamesLength == 0 && itemsLength > 0) {
        this.changeTab(this.tabType.ITEMS_TAB);
      }
    }
  }

  processItems(items: Items[] | null) {
    this.loading$.next(false);
    this.itemsArray.next(items);
  }
  processAvatars(items: Items[] | null) {
    this.loading$.next(false);
    this.avatarsArray.next(items);
  }
  processGames(items: Game[] | null) {
    this.loading$.next(false);
    this.gamesArray.next(items);
  }

  getGradient(): any {
    const gradients = this.gradientService.gradients;
    const pick = Math.round(Math.random() * (gradients.length - 1));
    return `linear-gradient(${gradients[pick].colors[0]}, ${gradients[pick].colors[1]})`;
  }

  goToPage() {
    if (this.activeTab === this.tabType.ITEMS_TAB) {
      /* router */
      this.router.navigate(['../items'], { queryParams: { searchParams: this.searchInfo.value }});
    } else if (this.activeTab === this.tabType.AVATARS_TAB) {
      /* router */
      this.router.navigate(['../avatars'], { queryParams: { searchParams: this.searchInfo.value }});
    } else if (this.activeTab === this.tabType.GAMES_TAB) {
      /* router */
      this.router.navigate(['../games'], { queryParams: { searchParams: this.searchInfo.value }});
    }
    if (this.focusState === 'true') {
      this.routingEvent.next('closed');
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

  closeDropdown() {
    this.searchInfo.setValue(null);
    this.dropdownHovered = false;
    this.dropdownOpened = false;
  }

  onBlur() {
    if (!this.dropdownHovered) {
      this.dropdownOpened = false;
    }
  }

  onFocus() {
    //if (this.searchInfo.value) {
      this.dropdownOpened = true;
    //}
  }

  mouseEnter() {
    this.dropdownHovered = true;
  }
  mouseLeave() {
    this.searchInput.nativeElement.focus();
    this.dropdownHovered = false;
  }

  goToItem(id: string) {
    this.closeDropdown();
    this.router.navigateByUrl(`/item/${id}`);
  }
  goToAvatar(id: string) {
    this.closeDropdown();
    this.router.navigateByUrl(`/avatar/${id}`);
  }
  goToGame(id: string) {
    this.closeDropdown();
    this.router.navigateByUrl(`/game/${id}`);
  }

}
