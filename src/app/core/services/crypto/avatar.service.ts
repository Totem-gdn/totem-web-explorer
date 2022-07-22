import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, take, tap } from "rxjs";
import { CryptoService } from "./crypto.service";


@Injectable({ providedIn: 'root' })


export class AvatarService {

    constructor(private cryptoService: CryptoService,
                private http: HttpClient) {}

    private _avatars = new BehaviorSubject<null | any>(null);

    get avatars() {
        return this._avatars.getValue();
    }

    get $avatars() {
        return this._avatars.asObservable();
    }

    set avatars(value: any) {
        this._avatars.next(value);
    }

                
    fetchAvatars() {
        const publicKey = this.cryptoService.publicKey;

        return this.http.get<any>(`https://simple-api.totem.gdn/default/avatars/${publicKey}`)
        .pipe(
            take(1),
            map(avatars => avatars = this.formatAvatar(avatars.data)),
            tap(avatars => this._avatars.next(avatars)))

    }

    getAvatarById(id: any) {

        let avatars = this.avatars;

        if (!avatars) { return null }

        for (let avatar of avatars) {
            if (avatar._id == id) {
                return avatar;
            }
        }
        return null;
    }



    formatAvatar(avatars: any) {
        let formattedAvatars: any = [];

        for(let avatar of avatars) {

            switch(avatar.avatar.bodyFat) {
                case 0:
                    avatar.avatar.bodyFat = 'Thin';
                    break;
                case 1:
                    avatar.avatar.bodyFat = 'Fat';
                    break;
            }
            

            switch(avatar.avatar.bodyMuscles) {
                case 0:
                    avatar.avatar.bodyMuscles = 'Wimp';
                    break;
                case 1:
                    avatar.avatar.bodyMuscles = 'Muscular';
                    break;
            }

            switch(avatar.avatar.hairStyle) {
                case 0:
                    avatar.avatar.hairStyle = 'Afro';
                    break;
                case 1:
                    avatar.avatar.hairStyle = 'Asymmetrical';
                    break;
                case 2:
                    avatar.avatar.hairStyle = 'Braids';
                    break;
                case 3:
                    avatar.avatar.hairStyle = 'BuzzCut';
                    break;
                case 4:
                    avatar.avatar.hairStyle = 'DraidLocks';
                    break;
                case 5:
                    avatar.avatar.hairStyle = 'Long';
                    break;
                case 6:
                    avatar.avatar.hairStyle = 'Ponytail';
                    break;
                case 7:
                    avatar.avatar.hairStyle = 'Short';
                    break;
            }

            switch(avatar.avatar.sex) {
                case 0:
                    avatar.avatar.sex = 'Male';
                    break;
                case 1:
                    avatar.avatar.sex = 'Female';
                    break;
            }

            formattedAvatars.push(avatar);
        }

        return formattedAvatars;

    }

    get(): Observable<any> {

        return this.fetchAvatars();

    }

    
}