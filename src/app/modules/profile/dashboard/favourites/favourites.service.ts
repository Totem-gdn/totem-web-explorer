import { Injectable } from "@angular/core";
import { BaseStorageService } from "@app/core/services/base-storage.service";

@Injectable({providedIn: 'root'})

export class FavouritesService {
  constructor(private baseStorageService: BaseStorageService) {}

  addLike(item: any, key: string) {
    let items: any[] | null = JSON.parse(this.baseStorageService.getItem(key)!);
    if (items && items.length) {
      let itemsToStorage: any[] = [...items, item];
      this.baseStorageService.setItem(key, JSON.stringify(itemsToStorage));
    } else {
      this.baseStorageService.setItem(key, JSON.stringify([item]));
    }
  }

  removeLike(item: any, key: string) {
    let items: any[] | null = JSON.parse(this.baseStorageService.getItem(key)!);
    if (items && items.length) {
      let itemsToStorage: any[] = items.filter((storeItem: any) => storeItem?._id !== item?._id);
      this.baseStorageService.setItem(key, JSON.stringify(itemsToStorage));
    }
  }

  getItems(key: string): any[] {
    return JSON.parse(this.baseStorageService.getItem(key)!);
  }

}
