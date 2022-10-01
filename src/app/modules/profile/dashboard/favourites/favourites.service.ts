import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseStorageService } from "@app/core/services/base-storage.service";
import { environment } from "@env/environment";

@Injectable({providedIn: 'root'})

export class FavouritesService {
  baseUrl: string = environment.TOTEM_BASE_API_URL;
  constructor(private baseStorageService: BaseStorageService, private http: HttpClient) {}

  //addLike(item: any, key: string) {
  //  let items: any[] | null = JSON.parse(this.baseStorageService.getItem(key)!);
  //  if (items && items.length) {
  //    let itemsToStorage: any[] = [...items, item];
  //    this.baseStorageService.setItem(key, JSON.stringify(itemsToStorage));
  //  } else {
  //    this.baseStorageService.setItem(key, JSON.stringify([item]));
  //  }
  //}

  addLike(itemType: string, itemId: string): any {
    let apiRoute: string = '';
    if (itemType === 'item' || 'avatar' || 'gem') {
      apiRoute = 'assets/' + itemType + 's';
    }
    if (itemType === 'game') {
      apiRoute = 'games'
    }
    this.http.patch<any>(`${this.baseUrl}/${apiRoute}/${itemId}/like`, {}).subscribe((data: any) => {
      console.log(data);
    })
  }

  removeLike(itemType: string, itemId: string): any {
    let apiRoute: string = '';
    if (itemType === 'item' || 'avatar' || 'gem') {
      apiRoute = 'assets/' + itemType + 's';
    }
    if (itemType === 'game') {
      apiRoute = 'games'
    }
    this.http.patch<any>(`${this.baseUrl}/${apiRoute}/${itemId}/dislike`, {}).subscribe((data: any) => {
      console.log(data);
    })
  }

  //removeLike(item: any, key: string) {
  //  let items: any[] | null = JSON.parse(this.baseStorageService.getItem(key)!);
  //  if (items && items.length) {
  //    let itemsToStorage: any[] = items.filter((storeItem: any) => storeItem?._id !== item?._id);
  //    this.baseStorageService.setItem(key, JSON.stringify(itemsToStorage));
  //  }
  //}

  getItems(key: string): any[] {
    return JSON.parse(this.baseStorageService.getItem(key)!);
  }

}
