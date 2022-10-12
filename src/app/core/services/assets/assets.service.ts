import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { BehaviorSubject, map, tap } from "rxjs";

@Injectable({providedIn: 'root'})

export class AssetsService {
    baseUrl: string = environment.TOTEM_BASE_API_URL;

    constructor(private http: HttpClient) {}

    private _asset = new BehaviorSubject<any | null>(null);

    get asset$() {
        return this._asset.asObservable();
    }

    updateAsset(id: string, type: string) {
        if(type == 'item') type = 'items';
        if(type == 'avatar') type = 'avatars';
        if(type == 'gem') type = 'gems';

        return this.http.get<any>(`${this.baseUrl}/assets/${type}/${id}`).pipe(map(asset => {
            this._asset.next(asset);
        }));
    }
}