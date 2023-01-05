import { EventEmitter, Injectable, Input } from "@angular/core";
import { INPUT_TYPE } from "@app/core/models/enums/input-type.enum";
import { InputTag } from "@app/core/models/interfaces/input-tag.model";
import { BehaviorSubject } from "rxjs";


@Injectable({ providedIn: 'root' })

export class FiltersService {

    private _tags = new BehaviorSubject<InputTag[] | null>(null);
    private _dropupActive = new BehaviorSubject<boolean>(false);
    private _reset = new EventEmitter<void>();

    get tags$() { return this._tags.asObservable() }

    set dropupActive(open: boolean) { this._dropupActive.next(open) }
    get dropupActive() { return this._dropupActive.getValue(); }
    get dropupActive$() { return this._dropupActive.asObservable(); }

    get reset$() { return this._reset.asObservable(); }
    reset() { 
        this._reset.emit(); 
        this._dropupActive.next(false);
        this.resetTags();
    }


    addTag(tag: InputTag, inputType: INPUT_TYPE) {
        let tags = this._tags.getValue();
        if(!tags) tags = [];

        if(inputType != INPUT_TYPE.CHECKBOX) {
            const index = tags.findIndex(_tag => {
                return _tag.group == tag.group;
            })
            if(index == -1) {
                tags.push(tag);
            } else {
                tags[index] = tag;
            }
        }

        if(inputType == INPUT_TYPE.CHECKBOX) {
            tags.push(tag);
        }

        this._tags.next(tags);
    }

    removeTag(tag: InputTag) {
        const tags = this._tags.getValue();
        if(!tags) return;

        const filteredTags = tags.filter(_tag => {
            if(_tag.ref == tag.ref) {
                tag.ref.checked = false;
            }
            return _tag.ref != tag.ref;
        })
        this._tags.next(filteredTags);
    }

    resetTags() {
        const tags = this._tags.getValue();
        if(!tags) return;
        for(let tag of tags) {
            this.removeTag(tag);
        }
    }

}