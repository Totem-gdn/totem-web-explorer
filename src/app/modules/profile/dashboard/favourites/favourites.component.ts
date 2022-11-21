import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageKey } from '@app/core/models/enums/storage-keys.enum';
import { BaseStorageService } from '@app/core/services/utils/base-storage.service';
import { CacheService } from '@app/core/services/assets/cache.service';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { FavoritesAssets, FavoritesService } from '@app/core/services/favorites.service';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';

@Component({
  selector: 'totem-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit, OnDestroy {
  user: any;
  imageUrl: string | null = '';
  messageList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  activeTab = 'items';
  items: any[] | null = null;
  avatars: any[] | null = null;
  games: any[] | null = null;
  subs: Subscription = new Subscription();

  constructor(private cacheService: CacheService,
    private totemItemsService: TotemItemsService,
    private favoritesService: FavoritesService,
    private baseStorageService: BaseStorageService,
    ) { }

  ngOnInit(): void {
    //this.items = this.favouritesService.getItems(StorageKey.ITEMS);
    //this.avatars = this.favouritesService.getItems(StorageKey.AVATARS);
    //this.games = this.favouritesService.getItems(StorageKey.GAMES);
    this.imageUrl = JSON.parse(this.baseStorageService.getItem('profile-image')!);
    //this.initItemsListener();
    //this.getAllItems();
    this.loadMore(this.activeTab, 1);
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  /* getAllItems() {
    this.totemItemsService.getAvatars();
    this.totemItemsService.getGames();
    this.totemItemsService.getMostUsedItems();
    this.totemItemsService.getNewestItems();
  } */

  loadMore(type: string, page: number) {
    if (type == StorageKey.GAMES) {
      this.favoritesService.getFavotireGames(page.toString()).pipe(take(1)).subscribe((games: GameDetail[]) => {
        this.games = games;
      });
    }
    if (type == StorageKey.AVATARS || type == StorageKey.ITEMS) {
      this.favoritesService.getFavotireAssets(type, page.toString()).pipe(take(1)).subscribe((data: FavoritesAssets) => {
        if (data && data.type == StorageKey.ITEMS) {
          this.items = data.assets;
        }
        if (data && data.type == StorageKey.AVATARS) {
          this.avatars = data.assets;
        }
      });
    }
  }

  /* initItemsListener() {
    this.subs.add(
      this.totemItemsService.games.subscribe((games: any[] | null) => {
        if (games) {
          this.games = games.filter((item: any) => item.isLiked);
        }
      })
    );
    this.subs.add(
      this.totemItemsService.mostUsedItems.subscribe((items: any[] | null) => {
        if (items) {
          this.items = items.filter((item: any) => item.isLiked);
          this.cacheService.setItemCache('fav_item', this.items.length);
        }
      })
    );
    this.subs.add(
      this.totemItemsService.avatars.subscribe((avatars: any[] | null) => {
        if (avatars) {
          this.avatars = avatars.filter((item: any) => item.isLiked);
          this.cacheService.setItemCache('fav_avatar', this.avatars.length);
        }
      })
    );
  } */

  clearItems() {
    if (this.activeTab == StorageKey.GAMES) {
      this.games = null;
    }
    if (this.activeTab == StorageKey.ITEMS) {
      this.items = null;
    }
    if (this.activeTab == StorageKey.AVATARS) {
      this.avatars = null;
    }
  }

  onChangeTab(tab: string) {
    this.clearItems();
    this.activeTab = tab;
    this.loadMore(this.activeTab, 1);
  }

  setImageUrl(event: string) {
    this.baseStorageService.setItem('profile-image', JSON.stringify(event));
    this.imageUrl = event;
  }

}
