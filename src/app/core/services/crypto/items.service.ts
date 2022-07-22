import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, take, tap } from "rxjs";
import { CryptoService } from "./crypto.service";


@Injectable({ providedIn: 'root' })

export class ItemsService {

    _items = new BehaviorSubject<any[] | null>(null);

    constructor(private http: HttpClient,
        private cryptoService: CryptoService) {

    }

    get items() {
        return this._items.getValue();
    }

    set items(value: any) {
        this._items.next(value);
    }

    get $items() {
        return this._items.asObservable();
    }



    fetchItems() {
        const publicKey = this.cryptoService.publicKey;

        return this.http.get<any>(`https://simple-api.totem.gdn/default/items/${publicKey}`).pipe(
            take(1),
            map(items => this.formatItems(items.data)),
            tap(items => {
                this.items = items;
            }))
            
    }

    
    getItemById(id: any) {

        let items = this.items;

        if (!items) { return null }

        for (let item of items) {
            if (item._id == id) {
                return item;
            }
        }
        return null;
    }


    private formatItems(items: any) {
        let formattedItems: any = [];

        for (let item of items) {
            // Format Time
            const creationDate = new Date(item.createdAt).toLocaleDateString();
            item.createdAt = creationDate;
            const updateDate = new Date(item.updatedAt).toLocaleDateString();
            item.updatedAt = updateDate;
        
            // Format Tip
            switch(item.item.tipMaterial) {
                case 0:
                    item.item.tipMaterial = 'Wood';
                    break;
                case 1:
                    item.item.tipMaterial = 'Bone';
                    break;
                case 3:
                    item.item.tipMaterial = 'Flint';
                    break;
                case 4:
                    item.item.tipMaterial = 'Obsidian';
                    break;
            }

            // Format element
            switch(item.item.element) {
                case 0:
                    item.item.element = 'Air';
                    break;
                case 1:
                    item.item.element = 'Earth';
                    break;
                case 3:
                    item.item.element = 'Water';
                    break;
                case 4:
                    item.item.element = 'Fire';
                    break;
            }

            formattedItems.push(item);
        }

        return formattedItems;
    }

    /** 
     * Base64 decode
     */
    b64decodeWithoutParse(str: string): string
    {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        let output = '';

        str = String(str).replace(/=+$/, '');

        if ( str.length % 4 === 1 )
        {
            throw new Error(
                '\'atob\' failed: The string to be decoded is not correctly encoded.'
            );
        }

        /* eslint-disable */
        for (
            // initialize result and counters
            let bc = 0, bs: any, buffer: any, idx = 0;
            // get next character
            (buffer = str.charAt(idx++));
            // character found in table? initialize bit storage and add its ascii value;
            ~buffer &&
            (
                (bs = bc % 4 ? bs * 64 + buffer : buffer),
                    // and if not first of each 4 characters,
                    // convert the first 8 bits to one ascii character
                bc++ % 4
            )
                ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
                : 0
        )
        {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer);
        }
        /* eslint-enable */

        return output;
    }


}