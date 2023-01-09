import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root' })

export class AdminService {

  baseUrl: string = environment.TOTEM_BASE_API_URL; // http://534e-45-128-191-180.ngrok.io

  constructor(private http: HttpClient) {
  }

  getGame(id: string) {
    this.http.get<any>(`${this.baseUrl}/games/${id}`).subscribe((data: any) => { })
  }
  getGames() {
    return this.http.get<any>(`${this.baseUrl}/games?approved=false&page=1`);
  }
  getApprovedGames(owner: string) {
    return this.http.get<any>(`${this.baseUrl}/games?owner=${owner}`);
  }
  approveGame(id: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/games/${id}/approve`, {});
  }
  rejectGame(id: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/games/${id}/reject`, {});
  }
  deleteGame(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/games/${id}`);
  }

}
