import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { BehaviorSubject, forkJoin, Observable } from "rxjs";
import { AssetsCache, TotalAssets } from "../models/interfaces/assets.modle";



@Injectable({
    providedIn: 'root'
})

export class ProfileService
{
    constructor(private http: HttpClient) {}

    baseUrl: string = environment.TOTEM_BASE_API_URL;

    private _totalAssets = new BehaviorSubject<AssetsCache>({});

    get totalAssets$(): Observable<AssetsCache> { return this._totalAssets.asObservable() }
    get totalAssets(): AssetsCache { return this._totalAssets.getValue() }
    set totalAssets(total: any) { this._totalAssets.next(total) }

    cacheTotalAssets(): void
    {
        this.http.get<any>(`${this.baseUrl}/auth/me`).subscribe(total => {

            let _total = this.totalAssets;

            _total.totalAvatars = total.avatars;
            _total.totalItems = total.items;
            _total.totalGems = total.gems;
            this.totalAssets = _total;

        })
    }
    cacheTotalFavAssets(): void
    {
        let _total = this.totalAssets;
        const assets = ['items', 'avatars', 'gems'];

        for(let asset of assets)
        {
            this.http.get<any>(`${this.baseUrl}/assets/favorites/${asset}`).subscribe(total => {
                if(asset = 'items') _total.totalFavItems = total.length;
                if(asset = 'avatars') _total.totalFavAvatars = total.length;
                if(asset = 'gems') _total.totalFavGems = total.length;
                console.log(_total)
                this.totalAssets = _total;
            })
        }
    }

    getMessages(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/messages`);
    }

    setMessageAsRead(id: string): Observable<any> {
        return this.http.patch<any>(`${this.baseUrl}/messages/${id}/read`, {});
    }
}
