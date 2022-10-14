import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { BehaviorSubject, map, Observable, take } from "rxjs";
import { ItemParam } from "../models/item-param.model";
import { CacheService } from "./assets/cache.service";

const NEWEST_ITEMS: any[] = [
  {
    _id: '23547779',
    image: 'assets/images/item-img-1.png', updatedAt: '2022-10-01T16:31:42.160Z'},
  {
    _id: '08907867',
    image: 'assets/images/item-img-2.png', updatedAt: '2022-10-01T16:31:42.160Z'},
  {
    _id: '493579',
    image: 'assets/images/item-img-3.png', updatedAt: '2022-10-01T16:31:42.160Z'},
  {
    _id: '25695939',
    image: 'assets/images/item-img-4.png', updatedAt: '2022-10-01T16:31:42.160Z'},
  {
    _id: '3569593569',
    image: 'assets/images/item-img-1.png', updatedAt: '2022-10-01T16:31:42.160Z'},
  {
    _id: '356956929',
    image: 'assets/images/item-img-1.png', updatedAt: '2022-10-01T16:31:42.160Z'},
  {
    _id: '35693592',
    image: 'assets/images/item-img-1.png', updatedAt: '2022-10-01T16:31:42.160Z'}
]
const MOST_USED_ITEMS: any[] = [
  {
    _id: '124325565',
    image: 'assets/images/item-img-1.png', updatedAt: '2022-10-01T16:31:42.160Z'},
  {
    _id: '563477777',
    image: 'assets/images/item-img-2.png', updatedAt: '2022-10-01T16:31:42.160Z'},
  {
    _id: '5555555555',
    image: 'assets/images/item-img-3.png', updatedAt: '2022-10-01T16:31:42.160Z'},
  {
    _id: '333333333',
    image: 'assets/images/item-img-4.png', updatedAt: '2022-10-01T16:31:42.160Z'},
  {
    _id: '11111111',
    image: 'assets/images/item-img-1.png', updatedAt: '2022-10-01T16:31:42.160Z'},
  {
    _id: '44444444444',
    image: 'assets/images/item-img-1.png', updatedAt: '2022-10-01T16:31:42.160Z'},
  {
    _id: '555555666',
    image: 'assets/images/item-img-1.png', updatedAt: '2022-10-01T16:31:42.160Z'}
]
const AVATARS: any[] = [
  {
    _id: '214553',
    image: 'assets/images/item-img-1.png', updatedAt: '2022-10-01T16:31:42.160Z'
  },
  {
    _id: '5523553',
    image: 'assets/images/item-img-2.png', updatedAt: '2022-10-01T16:31:42.160Z'
  },
  {
    _id: '35723572',
    image: 'assets/images/item-img-3.png', updatedAt: '2022-10-01T16:31:42.160Z'
  },
  {
    _id: '3425246326',
    image: 'assets/images/item-img-4.png', updatedAt: '2022-10-01T16:31:42.160Z'
  },
  {
    _id: '3454567',
    image: 'assets/images/item-img-1.png', updatedAt: '2022-10-01T16:31:42.160Z'
  },
  {
    _id: '94796',
    image: 'assets/images/item-img-1.png', updatedAt: '2022-10-01T16:31:42.160Z'
  },
  {
    _id: '235236',
    image: 'assets/images/item-img-1.png', updatedAt: '2022-10-01T16:31:42.160Z'
  }
]
const POPULAR_GAMES: any[] = [
  {
    _id: '234',
    contractMetadata: {
      symbol: 'GTA 6'
    }
  },
  {
    _id: '4434',
    contractMetadata: {
      symbol: 'Mr Krabs'
    }
  },
  {
    _id: '223423434',
    contractMetadata: {
      symbol: 'Mineground'
    }
  },
  {
    _id: '24434',
    contractMetadata: {
      symbol: 'SontaCity'
    }
  },
  {
    _id: '32222',
    contractMetadata: {
      symbol: 'ABC Craft'
    }
  },
  {
    _id: '64757',
    contractMetadata: {
      symbol: 'Crysis 5'
    }
  },
]

@Injectable({providedIn: 'root'})

export class TotemItemsService {

  baseUrl: string = environment.TOTEM_BASE_API_URL;

  private games$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  games: Observable<any[] | null> = this.games$.asObservable();

  private mostUsedItems$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  mostUsedItems: Observable<any[] | null> = this.mostUsedItems$.asObservable();

  private newestItems$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  newestItems: Observable<any[] | null> = this.newestItems$.asObservable();

  private avatars$: BehaviorSubject<any[] | null> = new BehaviorSubject<any[] | null>(null);
  avatars: Observable<any[] | null> = this.avatars$.asObservable();

  private _filters = new BehaviorSubject<ItemParam[]>([]);

  testItem = new BehaviorSubject<any>({});

  constructor(private http: HttpClient,
              private cacheService: CacheService) {
  }

  set filters(filters: ItemParam[]) {
    this._filters.next(filters);
  }
  get filters$() {
    return this._filters.asObservable();
  }
  resetFilters() {
    this._filters.next([]);
  }

  handleParams(filters: ItemParam[] | undefined) {
    console.log(JSON.stringify(filters))
    let params = new HttpParams();
    if(!filters) return params;
    params = params.append('filters', JSON.stringify(filters));

    return params;
  }

  getAvatars$(filters?: ItemParam[]) {
    const queryFilters = this._filters.getValue();
    let params = this.handleParams(queryFilters);

    return this.http.get<any>(`${this.baseUrl}/assets/avatars`, {params: params}).pipe(
      map(avatars => {
        if(avatars && avatars?.length) {
          // this.cacheService.setItemCache('avatar', avatars.length);
          return avatars;
        } else {
          return [0,0,0,0,0];
        }
      }))

  }

  getGems$(filters?: ItemParam[]) {
    const queryFilters = this._filters.getValue();
    let params = this.handleParams(queryFilters);

    return this.http.get<any>(`${this.baseUrl}/assets/gems`, {params: params}).pipe(
      map(gems => {
        if(gems && gems?.length) {
          // this.cacheService.setItemCache('gem', gems.length);
          return gems;
        } else {
          return [0,0,0,0,0];
        }
      }))
  }

  getItems$(filters?: ItemParam[]) {
    const queryFilters = this._filters.getValue();
    let params = this.handleParams(queryFilters);

    return this.http.get<any>(`${this.baseUrl}/assets/items`, {params: params}).pipe(
      map(items => {
        console.log('items', items)
        if(items && items?.length) {
          // this.cacheService.setItemCache('item', items.length);
          return items;
        } else {
          return [0,0,0,0,0];
        }
      }))
  }

  getGames$(filters?: ItemParam[]) {
    const queryFilters = this._filters.getValue();
    let params = this.handleParams(queryFilters);
    return this.http.get<any>(`${this.baseUrl}/games`,  {params: params}).pipe(
      map(games => {
        console.log(games);
        if(games && games?.length) {
          // this.cacheService.setItemCache('game', games.length);
          return games;
        } else {
          return [0,0,0,0,0];
        }
      }))
  }

  getGameById(id: string) {
    return this.http.get(`${this.baseUrl}/games/${id}`);
  }

  getAssetById(id: string, type: string) {
    if(type == 'item') type = 'items';
    if(type == 'avatar') type = 'avatars';
    if(type == 'gem') type = 'gems';

    return this.http.get(`${this.baseUrl}/assets/${type}/${id}`).pipe(take(1))
  }

  getNewestItems() {
    this.http.get<any>(`${this.baseUrl}/assets/items`).subscribe((data: any) => {
      if(data && data?.length) {
        this.newestItems$.next(data);
      } else {
        this.newestItems$.next(NEWEST_ITEMS);
      }
    })
  }

  getMostUsedItems() {
    this.http.get<any>(`${this.baseUrl}/assets/items`).subscribe((data: any) => {
      if(data && data?.length) {
        this.mostUsedItems$.next(data);
      } else {
        this.mostUsedItems$.next(MOST_USED_ITEMS);
      }
    })
  }

  getAvatars() {
    this.http.get<any>(`${this.baseUrl}/assets/avatars`).subscribe((data: any) => {
      if(data && data?.length) {
        this.avatars$.next(data);
      } else {
        this.avatars$.next(AVATARS);
      }
    })
  }

  getGames() {
    this.http.get<any>(`${this.baseUrl}/games`).subscribe((data: any) => {
      console.log('games', data)
      if(data && data?.length) {
        this.games$.next(data);
      } else {
        this.games$.next(POPULAR_GAMES);
      }
    })
  }

  getGameByName(word: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/games?search=${word}`);
  }
  getItemsByName(word: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/assets/items?search=${word}`);
  }
  getAvatarsByName(word: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/assets/avatars?search=${word}`);
  }

}
