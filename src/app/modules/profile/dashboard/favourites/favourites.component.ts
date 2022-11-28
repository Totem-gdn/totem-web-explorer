import { Component, OnDestroy, OnInit } from '@angular/core';
import { StorageKey } from '@app/core/models/enums/storage-keys.enum';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { FavoritesAssets, FavoritesService } from '@app/core/services/favorites.service';
import { BaseStorageService } from '@app/core/services/utils/base-storage.service';
import { BehaviorSubject, Subscription, take } from 'rxjs';

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

  constructor(
    private favoritesService: FavoritesService,
    private baseStorageService: BaseStorageService,
  ) { }

  ngOnInit(): void {
    this.imageUrl = JSON.parse(this.baseStorageService.getItem('profile-image')!);
    this.loadMore(this.activeTab, 1);
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

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
