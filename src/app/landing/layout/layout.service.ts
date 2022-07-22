import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({ providedIn: 'root'})

export class LayoutService {

    /**
     * Save layout state when navigation between components
     */
    _layoutConfig = new BehaviorSubject<string>('empty');

    // Set Layout
    set layout(layout:string) {
        this._layoutConfig.next(layout);
    }

    // Get layout
    get layout() {
        return this._layoutConfig.getValue();
    }

}