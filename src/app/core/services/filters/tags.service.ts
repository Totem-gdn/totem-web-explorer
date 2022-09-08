import { ElementRef, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, ReplaySubject, Subject, take } from "rxjs";


@Injectable({ providedIn: 'root' })

export class TagsService {

    private _tags = new BehaviorSubject<any[]>([]);
    // private _tags: any[] = [];

    set addTag(tag: any) {
        const tags = this._tags.getValue();
        tags.push(tag);
        this._tags.next(tags);
    }

    get getTags$() {
        return this._tags.asObservable();
    }

    removeTag(tagToRemove: any) {
        const tags = this._tags.getValue();

        const removeFromArray = function (arr:any[] , ...theArgs: any) {
            return arr.filter( val => !theArgs.includes(val.value) )
        };

        const newList = removeFromArray(tags, tagToRemove.value);
        tagToRemove.reference.checked = false;
        this._tags.next(newList);
    }

    handleRangeTag(rangeTag: any) {
        let isTagInArray = false;
        const tags = this._tags.getValue();

        for(let tag of tags) {
            if(tag.reference === rangeTag.reference) {
                tag.value = rangeTag.value;
                isTagInArray = true;
            }
        }

        if(isTagInArray === false) {
            this.addTag = rangeTag;
        }
    }

    removeTagByReference(reference: any) {
        const tags = this._tags.getValue();
        console.log(reference);
        

        const removeFromArray = function (arr:any[] , ...theArgs: any) {
            return arr.filter( val => !theArgs.includes(val.reference) )
        };

        const newList = removeFromArray(tags, reference);
        this._tags.next(newList);
    }

    clear() {
        console.log('clear')
        this._tags.next([]);
    }
}