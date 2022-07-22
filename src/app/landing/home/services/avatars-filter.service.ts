import { Injectable } from "@angular/core";
import { ItemsService } from "@app/core/services/crypto/items.service";


@Injectable({providedIn: 'root'})

export class AvatarsFilterService {

    constructor(private itemsService: ItemsService) {

    }
    mostPopularAvatars() {
        return this.itemsService.fetchItems();
    }

}