import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { Achievement, ItemLegacy, Legacy, LegacyData, LegacyEvent, LegacyResponse } from "@app/core/models/interfaces/legacy.model";
import { environment } from "@env/environment";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({providedIn: 'root'})

export class LegacyService {
    baseUrl: string = environment.TOTEM_BASE_API_URL;
    gdnApiUrl: string = environment.TOTEM_API_GDN_URL;

    constructor(private http: HttpClient) {}

    fetchLegacies(type: string, id?: string | number, query?: string): Observable<LegacyResponse<LegacyData[]>> {
        const checkedQuery: string | undefined = id ? query : query?.substring(1);

        return this.http.get<LegacyResponse<LegacyData[]>>(`${this.gdnApiUrl}/asset-legacy/${type}?${id ? 'assetId=' + id : ''}${checkedQuery || ''}`).pipe(
          catchError((error: any) => of()),
          map<LegacyResponse<LegacyData[]>, LegacyResponse<LegacyData[]>>((result: LegacyResponse<LegacyData[]>) => {
            if (result.results && result.results.length) {
              result.results.map((legacy: LegacyData) => {
                legacy.type = type;
              })
            }
            return result;
          })
        );

        /* return this.http.get<Legacy>(`https://legacy-api.totem.gdn/${id}`); */

        // return this.http.get<Legacy>(`https://legacy-api.totem.gdn/itemId-000000`);
    }

    createLegacyEvent(type: string, data: LegacyEvent): Observable<{txHash: string}> {
      return this.http.post<{txHash: string}>(`${this.gdnApiUrl}/asset-legacy/${type}`, data);
    }

    getGameFromCore(): Observable<any> {
      return this.http.get(`${this.gdnApiUrl}/games-directory/0xBdddAA60C2F104cC9f4c65dE5A11e9c08636daBC`);
    }

    fetchAssetLegacies(type: ASSET_TYPE) {
        return this.http.get<ItemLegacy>(`${this.gdnApiUrl}/asset-legacy/${type}?limit=10&offset=0`);
    }
    fetchAssetLegacyById(type: ASSET_TYPE, id: string | number) {
        return this.http.get(`${this.baseUrl}/asset-legacy/${type}/${id}`).pipe(map(legacy => {
        }))
    }
    createLegacy(type: ASSET_TYPE, body: any) {
        // return this.http.post(`${this.baseUrl}/asset-legacy/${type}`);
    }

    fetchGameLegacies() {
        return this.http.get(`${this.baseUrl}/game-legacy`);
    }
    fetchGameLegacyById( id: string | number) {
        return this.http.get(`${this.baseUrl}/game-legacy/${id}`).pipe(map(legacy => {
        }))
    }



    sortAchievements(legacies: any) {

        let formattedLegacies: any = [];

        legacies.sort((a: any, b: any) => (a.timestamp > b.timestamp) ? -1 : 1);

        for(let legacy of legacies) {
            // let date = new Date(legacy.timestamp).toLocaleString();
            // legacy.timestamp = date;
            formattedLegacies.push(legacy);
        }

        return formattedLegacies;
    }
}
