import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { BehaviorSubject, map, tap } from "rxjs";

@Injectable({providedIn: 'root'})

export class UserAssetsService {
    baseUrl: string = environment.TOTEM_BASE_API_URL;

    constructor(private http: HttpClient) {}

    private _currentAsset = new BehaviorSubject<any | undefined>(undefined);
    private _avatars = new BehaviorSubject<any[] | null>(null);
    private _gems = new BehaviorSubject<any[] | null>(null);
    private _items = new BehaviorSubject<any[] | null>(null);

    get avatars$() { return this._avatars.asObservable() }
    get items$() { return this._items.asObservable() }
    get gems$() { return this._gems.asObservable() }

    get currentAsset$() { return this._currentAsset.asObservable() }

    updateAssets(type: string) {
        if(type == 'avatar') type = 'avatars';
        if(type == 'item') type = 'items';
        if(type == 'gem') type = 'gems';

        return this.http.get<any[]>(`${this.baseUrl}/assets/${type}?list=my`).pipe(map(assets => {
            if(type == 'avatars') this._avatars.next(assets);
            if(type == 'gems') this._gems.next(assets);
            if(type == 'items') this._items.next(assets);
            console.log('assets',assets)
        }));
    }

    updateAsset(id: string, type: string) {
        if(type == 'item') type = 'items';
        if(type == 'avatar') type = 'avatars';
        if(type == 'gem') type = 'gems';

        return this.http.get<any>(`${this.baseUrl}/assets/${type}/${id}`).pipe(map(asset => {
            this._currentAsset.next(asset);
        }));
    }
}