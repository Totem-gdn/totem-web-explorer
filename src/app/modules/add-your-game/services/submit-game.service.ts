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

    const authorization: string = `Bearer ${userInfo.userInfo.idToken} BMUaCGWAqX7ulSauE1dvkhhiGy1OUcVPaDNexeWCj8K9Hs4EFtOMGjhFGMnwxLOypcA4g6UlzAa8UF35POXQFtI`;
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': authorization
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    this.http.post<any>(`${this.baseUrl}/games`, body, requestOptions).subscribe((data: any) => {
      console.log(data);
    })
  }

}
