import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";

@Injectable({
  providedIn: 'root'
})

export class TransactionsService {

  faucetUrl: string = environment.TOTEM_FAUCET_API_URL;

  constructor(private http: HttpClient) { }

  getMaticViaFaucet() {

    return this.http.get<any>(`${this.faucetUrl}/gas`);
  }

  getMaticBalanceViaFaucet() {

    return this.http.get<any>(`${this.faucetUrl}/gas/balance`);
  }



}
