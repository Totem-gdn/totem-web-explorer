import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { BehaviorSubject, Observable } from "rxjs";

const NEWEST_ITEMS: any[] = [
  {
    _id: '23547779',
    image: 'assets/images/item-img-1.png', updatedAt: '04.09.2022'},
  {
    _id: '08907867',
    image: 'assets/images/item-img-2.png', updatedAt: '11.09.2022'},
  {
    _id: '493579',
    image: 'assets/images/item-img-3.png', updatedAt: '06.09.2022'},
  {
    _id: '25695939',
    image: 'assets/images/item-img-4.png', updatedAt: '12.09.2022'},
  {
    _id: '3569593569',
    image: 'assets/images/item-img-1.png', updatedAt: '09.09.2022'},
  {
    _id: '356956929',
    image: 'assets/images/item-img-1.png', updatedAt: '15.09.2022'},
  {
    _id: '35693592',
    image: 'assets/images/item-img-1.png', updatedAt: '13.09.2022'}
]
const MOST_USED_ITEMS: any[] = [
  {
    _id: '124325565',
    image: 'assets/images/item-img-1.png', updatedAt: '04.09.2022'},
  {
    _id: '563477777',
    image: 'assets/images/item-img-2.png', updatedAt: '06.09.2022'},
  {
    _id: '5555555555',
    image: 'assets/images/item-img-3.png', updatedAt: '05.09.2022'},
  {
    _id: '333333333',
    image: 'assets/images/item-img-4.png', updatedAt: '11.09.2022'},
  {
    _id: '11111111',
    image: 'assets/images/item-img-1.png', updatedAt: '12.09.2022'},
  {
    _id: '44444444444',
    image: 'assets/images/item-img-1.png', updatedAt: '13.09.2022'},
  {
    _id: '555555666',
    image: 'assets/images/item-img-1.png', updatedAt: '15.09.2022'}
]
const AVATARS: any[] = [
  {
    _id: '214553',
    image: 'assets/images/item-img-1.png', updatedAt: '01.09.2022'
  },
  {
    _id: '5523553',
    image: 'assets/images/item-img-2.png', updatedAt: '02.09.2022'
  },
  {
    _id: '35723572',
    image: 'assets/images/item-img-3.png', updatedAt: '05.09.2022'
  },
  {
    _id: '3425246326',
    image: 'assets/images/item-img-4.png', updatedAt: '12.09.2022'
  },
  {
    _id: '3454567',
    image: 'assets/images/item-img-1.png', updatedAt: '14.09.2022'
  },
  {
    _id: '94796',
    image: 'assets/images/item-img-1.png', updatedAt: '11.09.2022'
  },
  {
    _id: '235236',
    image: 'assets/images/item-img-1.png', updatedAt: '16.09.2022'
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

  constructor(private http: HttpClient) {
  }

  getNewestItems() {
    this.newestItems$.next(NEWEST_ITEMS);
    //this.http.get<any>(`${this.baseUrl}/games`).subscribe((data: any) => {
    //  console.log(data);
    //  if (data && data?.length) {
    //    this.games$.next(data);
    //  }
    //})
  }

  getMostUsedItems() {
    this.mostUsedItems$.next(MOST_USED_ITEMS);
    //this.http.get<any>(`${this.baseUrl}/games`).subscribe((data: any) => {
    //  console.log(data);
    //  if (data && data?.length) {
    //    this.games$.next(data);
    //  }
    //})
  }

  getAvatars() {
    this.avatars$.next(AVATARS);
    this.http.get<any>(`${this.baseUrl}/assets/avatars`).subscribe((data: any) => {
      console.log(data);
      if (data && data?.length) {
        this.games$.next(data);
      }
    })
  }

  getGames() {
    this.games$.next(POPULAR_GAMES);
    this.http.get<any>(`${this.baseUrl}/games`).subscribe((data: any) => {
      console.log(data);
      if (data && data?.length) {
        this.games$.next(data);
      }
    })
  }

}
