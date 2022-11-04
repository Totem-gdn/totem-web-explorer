import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable, take } from "rxjs";


@Injectable({ providedIn: 'root' })

export class AdminService {

  baseUrl: string = environment.TOTEM_BASE_API_URL;

  constructor(private http: HttpClient) {
  }

  getGame(id: string) {
    this.http.get<any>(`${this.baseUrl}/games/${id}`).subscribe((data: any) => {
      console.log(data);

    })
  }
  getGames() {
    return this.http.get<any>(`${this.baseUrl}/games?approved=false`);
  }
  approveGame(id: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/games/${id}/approve`, {});
  }
  deleteGame(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/games/${id}`);
  }

}
