import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})

export class ItemsService {

    private _items = new BehaviorSubject<any[]>([0,0,0,0,0,0,0,0,0,0,0,0]);


    get getItems() {
        return this._items.getValue();
    }
}