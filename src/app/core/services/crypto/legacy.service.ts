import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Legacy } from "@app/core/models/interfaces/legacy.model";


@Injectable({providedIn: 'root'})

export class LegacyService {

    constructor(private http: HttpClient) {}

    fetchLegacies(id: string | number) {
        
        return this.http.get<Legacy>(`https://legacy-api.totem.gdn/${id}`);

        // return this.http.get<Legacy>(`https://legacy-api.totem.gdn/itemId-000000`);
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