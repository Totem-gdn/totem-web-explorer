import { Injectable } from "@angular/core";
import { ItemParam } from "@app/core/models/interfaces/item-param.model";
import { Tag } from "@app/core/models/interfaces/tag-interface.model";
import { BehaviorSubject } from "rxjs";


@Injectable({ providedIn: 'root' })

export class TagsService {


    private _tags = new BehaviorSubject<Tag[]>([]);

    set addTag(tag: Tag) {
        
    }

}