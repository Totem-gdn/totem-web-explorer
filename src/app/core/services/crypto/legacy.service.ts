import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { Legacy } from "@app/core/models/interfaces/legacy.model";
import { environment } from "@env/environment";
import { map, Observable } from "rxjs";


@Injectable({providedIn: 'root'})

export class LegacyService {
    baseUrl: string = environment.TOTEM_BASE_API_URL;

    constructor(private http: HttpClient) {}

    fetchLegacies(id: string | number) {
        
        return this.http.get<Legacy>(`https://legacy-api.totem.gdn/${id}`);

        // return this.http.get<Legacy>(`https://legacy-api.totem.gdn/itemId-000000`);
    }

    fetchAssetLegacies(type: ASSET_TYPE) {
        return this.http.get(`${this.baseUrl}/asset-legacy/${type}`);
    }
    fetchAssetLegacyById(type: ASSET_TYPE, id: string | number) {
        return this.http.get(`${this.baseUrl}/asset-legacy/${type}/${id}`).pipe(map(legacy => {
            console.log(legacy)
        }))
    }

    fetchGameLegacies() {
        return this.http.get(`${this.baseUrl}/game-legacy`);
    }
    fetchGameLegacyById( id: string | number) {
        return this.http.get(`${this.baseUrl}/game-legacy/${id}`).pipe(map(legacy => {
            console.log(legacy)
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