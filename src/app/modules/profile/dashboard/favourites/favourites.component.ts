import { Component, OnInit } from '@angular/core';
import { StorageKey } from '@app/core/enums/storage-keys.enum';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { BehaviorSubject } from 'rxjs';
import { FavouritesService } from './favourites.service';

@Component({
  selector: 'totem-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  user: any;
  messageList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  activeTab = 'items';
  items: any[] = [];
  avatars: any[] = [];
  games: any[] = [];

  constructor(private favouritesService: FavouritesService) { }

  ngOnInit(): void {
    this.items = this.favouritesService.getItems(StorageKey.ITEMS);
    this.avatars = this.favouritesService.getItems(StorageKey.AVATARS);
    this.games = this.favouritesService.getItems(StorageKey.GAMES);
  }

  onChangeTab(tab: string) {
    this.activeTab = tab;
  }

}
