import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { map, Observable } from "rxjs";
import { AssetInfo } from "../models/interfaces/asset-info.model";
import { GameDetail } from "../models/interfaces/submit-game-interface.model";

export interface FavoritesAssets {
  type?: string;
  assets: AssetInfo[];
}

@Injectable({providedIn: 'root'})

export class FavoritesService {

  baseUrl: string = environment.TOTEM_BASE_API_URL;

  constructor(
    private http: HttpClient
  ) {}

    getFavotireAssets(type: string, page: string): Observable<FavoritesAssets> {
      return this.http.get<AssetInfo[]>(`${this.baseUrl}/assets/favorites/${type}?page=${page}`).pipe(
        map<AssetInfo[], FavoritesAssets>((assets: AssetInfo[]) => {
          return {
            type: type,
            assets: assets
          }
        })
      );
    }

    getFavotireGames(page: string): Observable<GameDetail[]> {
      return this.http.get<GameDetail[]>(`${this.baseUrl}/games/favorites?page=${page}`);
    }

}
