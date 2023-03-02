import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { OwnershipHistory } from "@app/core/models/interfaces/ownership-history.modle";
import { environment } from "@env/environment";

@Injectable({ providedIn: 'root'})

export class AssetHistoryService {

    constructor(private http: HttpClient) {}
    baseUrl: string = environment.TOTEM_BASE_API_URL;

    getHistory(type: string, id: number) {
        return this.http.get<OwnershipHistory[]>(`${this.baseUrl}/assets/${type}/${id}/ownership-history`)
    }
}
