import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";

@Injectable({ providedIn: 'root'})

export class AssetHistoryService {

    constructor(private http: HttpClient) {}
    baseUrl: string = environment.TOTEM_BASE_API_URL;
    
    getHistory(type: string, id: string) {
        return this.http.get<any>(`https://dev-api.totem-explorer.com/assets/${type}/${id}/ownershipHistory`);
    }
}