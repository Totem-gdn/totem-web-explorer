import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, take } from "rxjs";



@Injectable({ providedIn: 'root' })


export class PaymentService {
    
    constructor(private http: HttpClient) {

    }

    getAssets() {
        return this.http.get<any>('https://payment.totem.gdn/assets').pipe(
            take(1),
            map(assets => assets.assets));
    }

    getPaimentInfo(asset: string) {
        return this.http.get<any>(`https://payment.totem.gdn/assets/${asset}/payment-info`).pipe(take(1));
    }
}