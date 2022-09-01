import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})

export class AvatarsService {

    private _avatars = new BehaviorSubject<any[]>([0,0,0,0,0,0,0,0,0,0,0,0]);


    get getAvatars() {
        return this._avatars.getValue();
    }
}