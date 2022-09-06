import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GetTokensABI } from "@app/core/web3auth/abi/getTokens.abi";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { BehaviorSubject, from, map, take, tap } from "rxjs";
import Web3 from "web3";

@Injectable({providedIn: 'root'})

export class ItemsService {

    _items = new BehaviorSubject<any[] | null>(null);

    constructor(private http: HttpClient,
        private web3: Web3AuthService) {

    }

    get items() {
        return this._items.getValue();
    }
    set items(value: any) {
        this._items.next(value);
    }
    get $items() {
        // this.fetchItems();
        return this._items.asObservable();
    }

    fetchItems(wallet: string) {
        return this.http.get<any>(`https://simple-api.totem.gdn/default/items/${wallet}`).pipe(
            map(items => this.formatTime(items.data)),
            tap(items => {
                this.items = items;
            }))         
    }

    async getItemsIds() {
        console.log('get ids')
        if (!this.web3.provider) {
            console.log("provider not initialized yet");
            return;
        }
        console.log('Get tokens');
        const getTokens = await this.getIds();
        return getTokens;
    }

    async getIds() {
            const web3 = new Web3(this.web3.provider as any);
            const accounts = await web3.eth.getAccounts();
        
            const contractAddress ='0xfC5654489b23379ebE98BaF37ae7017130B45086';
            const wallet = accounts[0]
            console.log('account', wallet);
            const tokenContract = GetTokensABI;
            const contract = new web3.eth.Contract(tokenContract, contractAddress);
        
            const tx = await contract.methods.ownerOf(2).call();
            console.log(tx);
            return tx;
    }

    formatTime(items: any[]) {
        const formattedItems: any[] = [];

        for(let item of items) {
            item.updatedAt = new Date(item.updatedAt).toLocaleDateString();
            formattedItems.push(item);
        }

        return formattedItems;
    }
}