import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SubmitGame } from "@app/core/models/submit-game-interface.model";
import { environment } from "@env/environment";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn: 'root'})

export class SubmitGameService {

  baseUrl: string = environment.TOTEM_BASE_API_URL;

  constructor(private http: HttpClient) {
  }

  postGame(body: SubmitGame | null) {
    let userInfo: any = JSON.parse(localStorage.getItem('userinfo')!);
    console.log(userInfo);

    const authorization: string = `Bearer ${userInfo.userInfo.idToken} ${userInfo.key}`;
    const headerDict = {
      'Authorization': authorization
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    this.http.post<any>(`${this.baseUrl}/games`, body, requestOptions).subscribe((data: any) => {
      console.log(data);

    })
  }

  getGame() {
    this.http.get<any>(`${this.baseUrl}/games/6336d28dac1ce79bc5b7604f`).subscribe((data: any) => {
      console.log(data);

    })
  }
  approveGame() {
    this.http.patch<any>(`${this.baseUrl}/games/6336d28dac1ce79bc5b7604f/approve`, {}).subscribe((data: any) => {
      console.log(data);

    })
  }

}
