import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, take } from "rxjs";

@Injectable({ providedIn: 'root' })

export class LegaciesService {

    constructor(private http: HttpClient) {

    }


    fetchLegacies() {
        return this.http.get<any>('https://legacy-api.totem.gdn/itemId-000000').pipe(
            take(1),
            map(legacies => this.formatLegacies(legacies.achievements)));
    }
    
    
    formatLegacies(legacies: any) {

        let formattedLegacies: any = [];

        for(let legacy of legacies) {
            let date = new Date(legacy.timestamp).toLocaleDateString();
            legacy.timestamp = date;
            formattedLegacies.push(legacy); 
        }

        return formattedLegacies;
    }

    updateLegacies() {
        this.fetchLegacies().pipe(take(1)).subscribe();
    }

}