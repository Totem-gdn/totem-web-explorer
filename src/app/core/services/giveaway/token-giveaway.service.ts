import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { WelcomeUser } from "@app/core/models/interfaces/welcome-tokens.model";
import { environment } from "@env/environment";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})

export class TokenGiveawayService {

  baseUrl: string = environment.TOTEM_BASE_API_URL;

  constructor(
    private http: HttpClient,
    readonly matDialog: MatDialog,
    ) {}

  getActivity(): Observable<WelcomeUser> {
    return this.http.get<WelcomeUser>(`${this.baseUrl}/auth/me`);
  }

  setActivity(activityCode: number): Observable<WelcomeUser> {
    return this.http.patch<WelcomeUser>(`${this.baseUrl}/auth/me`, { welcomeTokens: activityCode });
  }

}
