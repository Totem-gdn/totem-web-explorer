import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageKey } from '@app/core/enums/storage-keys.enum';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { CacheService } from '@app/core/services/cache.service';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FavouritesService } from './favourites.service';

@Component({
  selector: 'totem-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit, OnDestroy {
  user: any;
  messageList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  activeTab = 'items';
  items: any[] = [];
  avatars: any[] = [];
  games: any[] = [];
  subs: Subscription = new Subscription();

  constructor(private cacheService: CacheService, private totemItemsService: TotemItemsService, private favouritesService: FavouritesService) { }

  ngOnInit(): void {
    //this.items = this.favouritesService.getItems(StorageKey.ITEMS);
    //this.avatars = this.favouritesService.getItems(StorageKey.AVATARS);
    //this.games = this.favouritesService.getItems(StorageKey.GAMES);
    this.initItemsListener();
    this.getAllItems();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getAllItems() {
    this.totemItemsService.getAvatars();
    this.totemItemsService.getGames();
    this.totemItemsService.getMostUsedItems();
    this.totemItemsService.getNewestItems();
  }

  initItemsListener() {
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
      this.totemItemsService.newestItems.subscribe((items: any[] | null) => {
        console.log(items);

        if (items) {
          this.items = items.filter((item: any) => item.isLiked);
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
  }

  onChangeTab(tab: string) {
    this.activeTab = tab;
  }

}
