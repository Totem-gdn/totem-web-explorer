import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, ReplaySubject, Subject, take } from "rxjs";


@Injectable({ providedIn: 'root' })

export class TagsService {

    private _tags = new BehaviorSubject<string[]>([]);
    // private _tags: any[] = [];

    set addTag(tag: string) {
        const tags = this._tags.getValue();
        tags.push(tag);
        this._tags.next(tags);
    }

    get getTags$() {
        return this._tags.asObservable();
    }

    removeTag(tagToRemove: string) {
        const tags = this._tags.getValue();

        const removeFromArray = function (arr:any[] , ...theArgs: any) {
            return arr.filter( val => !theArgs.includes(val) )
        };

        const newList = removeFromArray(tags, tagToRemove);
        this._tags.next(newList);
    }
}