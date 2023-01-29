import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CardPaymentResponse } from "@app/core/models/interfaces/payment.interface";
import { environment } from "@env/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class TransactionsService {

  faucetUrl: string = environment.TOTEM_FAUCET_API_URL;
  baseUrl: string = environment.TOTEM_BASE_API_URL;

  constructor(private http: HttpClient) { }

  getMaticViaFaucet() {

    return this.http.get<any>(`${this.faucetUrl}/gas`);
  }

  getMaticBalanceViaFaucet() {

    return this.http.get<any>(`${this.faucetUrl}/gas/balance`);
  }

  buyAssetWithCard(type: string): Observable<CardPaymentResponse> {
    return this.http.post<CardPaymentResponse>(`${this.baseUrl}/assets/${type}`, {});
  }

}
