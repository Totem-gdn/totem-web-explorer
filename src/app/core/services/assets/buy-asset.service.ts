import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { take, map } from "rxjs";


@Injectable({providedIn: 'root'})

export class BuyAssetService {

  gdnApiUrl: string = environment.TOTEM_API_GDN_URL;

  constructor(private http: HttpClient) {}
  /* getPaymentHistory() {
      return this.http.get<any>('https://payment.totem.gdn/payments').pipe(
          take(1),
      )
  }

  getAssets() {
      return this.http.get<any>('https://payment.totem.gdn/assets').pipe(
          take(1),
          map(assets => assets.assets));
  }

  getPaymentInfo(asset: string) {
      return this.http.get<any>(`https://payment.totem.gdn/assets/${asset}/payment-info`).pipe(take(1));
  } */

  getAssetPriceAndContractAddress(assetType: 'item' | 'avatar' | 'gem') {
      return this.http.get<any>(`${this.gdnApiUrl}/assets/${assetType}`).pipe(take(1));
  }
}
