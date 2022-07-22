import { Injectable } from "@angular/core";
import { ItemsService } from "@app/core/services/crypto/items.service";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})

export class ItemsFilterService {

    constructor(private itemsService: ItemsService) {

    }

    mostPopularItems() {
        return this.itemsService.fetchItems();
    }

}