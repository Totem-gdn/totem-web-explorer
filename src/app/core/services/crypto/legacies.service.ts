import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, take } from "rxjs";

@Injectable({ providedIn: 'root' })

export class LegaciesService {

    constructor(private http: HttpClient) {

    }


    fetchLegacies(id: string) {
        return this.http.get<any>(`https://legacy-api.totem.gdn/${id}`).pipe(
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

}