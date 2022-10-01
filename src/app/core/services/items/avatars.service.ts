import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { BehaviorSubject, map, take, tap } from "rxjs";

@Injectable({providedIn: 'root'})

export class AvatarsService {


    constructor(private web3Service: Web3AuthService,
                private http: HttpClient) {}

    private _avatars = new BehaviorSubject<any[] | null>(null);


    get avatars() {
        return this._avatars.getValue();
    }
    get $avatars() {
        return this._avatars.asObservable();
    }
    set avatars(value: any) {
        this._avatars.next(value);
    }

    fetchAvatars(wallet: string) {
        return this.http.get<any>(`https://simple-api.totem.gdn/default/avatars/${wallet}`).pipe(
            // map(avatars => this.formatTime(avatars.data)),
            tap(avatars => {
                this.avatars = avatars;
            }))         
    }

    // formatTime(avatars: any[]) {
    //     const formattedItems: any[] = [];
    //     console.log(avatars)
    //     for(let avatar of avatars) {
    //         avatar.updatedAt = new Date(avatar.updatedAt).toLocaleDateString();
    //         formattedItems.push(avatar);
    //     }

    //     return formattedItems;
    // }
}