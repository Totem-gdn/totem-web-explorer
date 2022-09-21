import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class ScrollRestorationService {
    constructor(private route: ActivatedRoute,) {}

    private _scrollPosition = new BehaviorSubject<any>(0);

    set scrollPosition(y: any) {
        this._scrollPosition.next(y);
    }

    get scrollPosition() {
        return this._scrollPosition.getValue();
    }

}