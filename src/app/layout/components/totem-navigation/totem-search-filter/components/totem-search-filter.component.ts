import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { SidebarState } from '@app/core/models/interfaces/sidebar-type-interface.model';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { GamesService } from '@app/core/services/assets/games.service';
import { SidenavStateService } from '@app/core/services/states/sidenav-state.service';
import { environment } from '@env/environment';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { BehaviorSubject, combineLatest, debounceTime, map, of, switchMap, take } from 'rxjs';
import { Items } from '../models/items-interface.model';
import { GradientService } from '../services/items-gradient.service';

@Component({
  selector: 'totem-search-filter',
  templateUrl: './totem-search-filter.component.html',
  styleUrls: ['./totem-search-filter.component.scss']
})
export class TotemSearchFilterComponent extends OnDestroyMixin implements OnInit, OnDestroy {
  searchInfo = new FormControl('');
  dropdownOpened: boolean = false;
  dropdownHovered: boolean = false;

  itemsArray = new BehaviorSubject<Items[] | null>(null);
  avatarsArray = new BehaviorSubject<Items[] | null>(null);
  gamesArray = new BehaviorSubject<GameDetail[] | null>(null);

  activeTab: string = 'items';

  tabType = {
    ITEMS_TAB: 'items',
    AVATARS_TAB: 'avatars',
    GAMES_TAB: 'games',
  }

  subbedToItemsListener: boolean = false;

  @Input()
  focusState: 'true' | 'false' | undefined = undefined;
  @Output()
  routingEvent: EventEmitter<any> = new EventEmitter();

  @ViewChild('searchInput') searchInput!: ElementRef;
  loading$ = new BehaviorSubject(false);
  assetRendererUrl = environment.ASSET_RENDERER_URL;

  constructor(
    private router: Router,
    private sidenavStateService: SidenavStateService,
    // private totemItemsService: TotemItemsService,
    private assetsService: AssetsService,
    private gamesService: GamesService,
    private gradientService: GradientService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initFormListener();
    this.sidenavStateService.sidenavStatus.pipe(
      untilComponentDestroyed(this),
    ).subscribe((data: SidebarState) => {
      if (data.isOpen) {
        setTimeout(() => {
          if (this.focusState === 'true') {
            this.searchInput.nativeElement.focus();
          }
        });
      }
    });
  }

  initFormListener() {
    this.searchInfo.valueChanges.pipe(
      untilComponentDestroyed(this),
      debounceTime(600),
      switchMap((id: string | null) => {
        return of(id);
      })
    ).subscribe((text: string | null) => {
      if (text?.length) {
        this.dropdownOpened = true;
        this.getItems(text);
      }
    })
  }

  getItems(params: string) {
    this.loading$.next(true);
    //this.submitGameService.getGame(params);
    combineLatest([
      this.gamesService.getGamesByFilter(params),
      this.assetsService.getAssetsByName(ASSET_TYPE.ITEM, params),
      this.assetsService.getAssetsByName(ASSET_TYPE.AVATAR, params)
      // this.totemItemsService.getGameByName(params),
      // this.totemItemsService.getItemsByName(params),
      // this.totemItemsService.getAvatarsByName(params)
    ]).pipe(
      untilComponentDestroyed(this),
      take(1),
      map(([games, items, avatars]) => { return { games, items, avatars } })
    ).subscribe((data) => {
      
      this.gamesArray.next(data.games && data.games?.length ? data.games : null);
      
      data.items.map((item: Items) => item.gradient = this.getGradient());
      this.itemsArray.next(data.items && data.items?.length ? data.items : null);
      data.avatars.map((avatar: Items) => avatar.gradient = this.getGradient());
      this.avatarsArray.next(data.avatars && data.avatars?.length ? data.avatars : null);
      this.checkTabAfterSearch(data.items?.length || 0, data.avatars?.length | 0, data.games?.length | 0);
      this.loading$.next(false);
    });
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
  processGames(items: GameDetail[] | null) {
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
      this.router.navigate(['../items'], { queryParams: { searchParams: this.searchInfo.value } });
    } else if (this.activeTab === this.tabType.AVATARS_TAB) {
      /* router */
      this.router.navigate(['../avatars'], { queryParams: { searchParams: this.searchInfo.value } });
    } else if (this.activeTab === this.tabType.GAMES_TAB) {
      /* router */
      this.router.navigate(['../games'], { queryParams: { searchParams: this.searchInfo.value } });
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
    this.clearSearchResult();
    this.router.navigateByUrl(`/item/${id}`);
    this.routingEvent.next('closed');
  }
  goToAvatar(id: string) {
    this.closeDropdown();
    this.clearSearchResult();
    this.router.navigateByUrl(`/avatar/${id}`);
    this.routingEvent.next('closed');
  }
  goToGame(id: string) {
    this.closeDropdown();
    this.clearSearchResult();
    this.router.navigateByUrl(`/game/${id}`);
    this.routingEvent.next('closed');
  }

  clearSearchResult(): void{
    this.itemsArray.next(null);
    this.avatarsArray.next(null);
    this.gamesArray.next(null);
  }

}
