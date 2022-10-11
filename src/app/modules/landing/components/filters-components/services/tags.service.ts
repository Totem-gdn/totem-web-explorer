import { ElementRef, Injectable } from "@angular/core";
import { ItemParam } from "@app/core/models/item-param.model";
import { Tag } from "@app/core/models/tag-interface.model";
import { TotemItemsService } from "@app/core/services/totem-items.service";
import { BehaviorSubject, map, Observable, of, ReplaySubject, Subject, take, tap } from "rxjs";


@Injectable({ providedIn: 'root' })

export class TagsService {

    constructor(private itemsService: TotemItemsService) { }

    private _tags = new BehaviorSubject<Tag[]>([]);

    set addTag(tag: Tag) {
        const tags = this._tags.getValue();
        tags.push(tag);
        this._tags.next(tags);
        this.tagsChanged();
    }

    get getTags$() {
        return this._tags.asObservable();
    }

    removeTag(tagToRemove: Tag) {
        const tags = this._tags.getValue();

        const removeFromArray = function (arr: any[], ...theArgs: any) {
            return arr.filter(val => !theArgs.includes(val.value))
        };

        const newList = removeFromArray(tags, tagToRemove.value);
        tagToRemove.reference.checked = false;
        this._tags.next(newList);
        this.tagsChanged();
    }

    handleRangeTag(rangeTag: Tag) {
        let isTagInArray = false;
        const tags = this._tags.getValue();

        for (let tag of tags) {
            if (tag.reference === rangeTag.reference) {
                tag.value = rangeTag.value;
                isTagInArray = true;
            }
        }

        if (isTagInArray === false) {
            this.addTag = rangeTag;
        }
    }

    removeTagByReference(reference: any) {
        const tags = this._tags.getValue();
        console.log(reference);


        const removeFromArray = function (arr: any[], ...theArgs: any) {
            return arr.filter(val => !theArgs.includes(val.reference))
        };

        const newList = removeFromArray(tags, reference);
        this._tags.next(newList);
        this.tagsChanged();
    }

    tagsChanged() {
        const tags = this._tags.getValue();
        const queryArray: ItemParam[] = [];
        loop: for (let tag of tags) {
            if(tag.inputType == 'range' || tag.inputType == 'graph') {
                const indexOfSpace = tag.value.indexOf(' ');
                tag.value = tag.value.substring(indexOfSpace + 1);
                console.log('tag value', tag.value);
            }
            const query: ItemParam = { values: [tag.value], type: tag.type };
            for (let fields of queryArray) {
                if (fields.type == query.type) {
                    fields.values = fields.values.concat(query.values);
                    continue loop;
                }
                
            }
            queryArray.push(query);
        }
        this.itemsService.filters = queryArray;
    }

    clear() {
        console.log('clear')
        this._tags.next([]);
    }
}