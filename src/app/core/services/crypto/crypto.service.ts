import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take, tap } from "rxjs";


@Injectable({ providedIn: 'root'})

export class CryptoService {

    
    constructor(private http: HttpClient) {}

    
    set publicKey(key: string)
    {
        localStorage.setItem('publicKey', key);
    }

    get publicKey(): string
    {
        return localStorage.getItem('publicKey') ?? '';
    }


    fetchPublicKey() 
    {
        return this.http.get<any>('https://account.totem.gdn/me')
        .pipe(
        take(1),
        tap(resData => {
            this.publicKey = resData.publicKey;
        }
        ))
    }

}