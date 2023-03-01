import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { BehaviorSubject, map, Observable } from "rxjs";
import { AccountEntity, AccountMetaBody } from "../models/interfaces/user-interface.model";

@Injectable({
    providedIn: 'root'
})

export class ProfileService {

    baseUrl: string = environment.TOTEM_BASE_API_URL;

    private totalAssets: BehaviorSubject<AccountMetaBody> = new BehaviorSubject({});
    totalAssets$: Observable<AccountMetaBody> = this.totalAssets.asObservable();

    constructor(private http: HttpClient) {}

    getUserAssetsCount(wallet: string): Observable<AccountMetaBody> {
        return this.getMyAccountInfo(wallet).pipe(
            map<AccountEntity, AccountMetaBody>((accountData: AccountEntity) => {
                this.totalAssets.next(accountData.meta);
                return accountData.meta;
            })
        );
    }

    getMyAccountInfo(wallet: string): Observable<AccountEntity> {
        // return this.http.get<AccountEntity>(`${this.baseUrl}/auth/me`);
        return this.http.get<AccountEntity>(`${this.baseUrl}/auth/me`);

    }

    getMessages(page: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/messages?page=${page}`);
    }

    setMessageAsRead(id: string): Observable<any> {
        return this.http.patch<any>(`${this.baseUrl}/messages/${id}/read`, {});
    }
}
