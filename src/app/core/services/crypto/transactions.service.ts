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
  coreUrl: string = environment.TOTEM_API_GDN_URL;
  applicationUrl: string = environment.TOTEM_WEB_EXPLORER_URL;

  constructor(private http: HttpClient) { }

  getMaticViaFaucet() {

    return this.http.get<any>(`${this.faucetUrl}/gas`);
  }

  getMaticBalanceViaFaucet() {

    return this.http.get<any>(`${this.faucetUrl}/gas/balance`);
  }

  buyAssetWithCard(assetType: string, owner: string, paymentSystem: 'withpaper' | 'stripe' = 'withpaper'): Observable<CardPaymentResponse> {
    return this.http.post<CardPaymentResponse>(`${this.coreUrl}/payments/${paymentSystem}/${assetType}/link`, {successUrl: this.applicationUrl, ownerAddress: owner});
  }
  
  //buyAssetWithCard(assetType: string, owner: string, paymentSystem: 'withpaper' | 'stripe' = 'stripe'): Observable<CardPaymentResponse> {
  //  return this.http.post<CardPaymentResponse>(`${this.baseUrl}/payment/link/${paymentSystem}/${assetType}`, {successUrl: this.applicationUrl});
  //}

  //buyAssetWithCard(assetType: string, owner: string, paymentSystem: 'withpaper' | 'stripe' = 'stripe'): Observable<CardPaymentResponse> {
  //  return this.http.post<CardPaymentResponse>(`${this.baseUrl}/payment/link/${paymentSystem}/${assetType}`, {successUrl: this.applicationUrl});
  //}

}
