import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AssetsABI } from "@app/core/web3auth/abi/assetsABI";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { environment } from "@env/environment";
import { BehaviorSubject, map, Subject, tap } from "rxjs";
import Web3 from "web3";
import { CacheService } from "./cache.service";

@Injectable({ providedIn: 'root' })

export class AssetsService {
    baseUrl: string = environment.TOTEM_BASE_API_URL;

    constructor(private http: HttpClient,
        private web3: Web3AuthService,
        private cacheService: CacheService) { }

    private _avatars = new BehaviorSubject<any[] | null>(null);
    private _gems = new BehaviorSubject<any[] | null>(null);
    private _items = new BehaviorSubject<any[] | null>(null);
    private _avatar = new BehaviorSubject<any[] | null>(null);
    private _gem = new BehaviorSubject<any[] | null>(null);
    private _item = new BehaviorSubject<any[] | null>(null);

    get avatars$() { return this._avatars.asObservable() }
    get items$() { return this._items.asObservable() }
    get gems$() { return this._gems.asObservable() }
    get avatar$() { return this._avatar.asObservable()}
    get item$() { return this._item.asObservable() }
    get gem$() { return this._gem.asObservable() }

    set avatars(value: any) { this._avatars.next(value) }
    set items(value: any) { this._items.next(value) }
    set gems(value: any) { this._gems.next(value) }
    set avatar(value: any) { this._avatar.next(value) }
    set item(value: any) { this._item.next(value) }
    set gem(value: any) { this._gem.next(value) }

    updateAssets(type: string, page: number, list: string) {
        if (type == 'avatar') type = 'avatars';
        if (type == 'item') type = 'items';
        if (type == 'gem') type = 'gems';

        return this.http.get<any[]>(`${this.baseUrl}/assets/${type}?list=${list}&page=${page}`).pipe(map(assets => {
            if (type == 'avatars') this._avatars.next(assets);
            if (type == 'gems') this._gems.next(assets);
            if (type == 'items') this._items.next(assets);
            console.log('assets', assets)
        }));
    }

    updateAsset(id: string, type: string) {
        if (type == 'item') type = 'items';
        if (type == 'avatar') type = 'avatars';
        if (type == 'gem') type = 'gems';

        return this.http.get<any>(`${this.baseUrl}/assets/${type}/${id}`).pipe(tap(asset => {
            // console.log('asset', asset)
            if(type == 'items') this._item.next(asset);
            if(type == 'avatars') this._avatar.next(asset);
            if(type == 'gems') this._gem.next(asset);
        }));
    }

    reset() {
        this._avatars.next(null);
        this._gems.next(null);
        this._items.next(null);
        this._avatar.next(null);
        this._gem.next(null);
        this._item.next(null);
    }

    async cacheTotal() {
        const web3 = new Web3(this.web3.provider as any);
        const wallet = await this.web3.getAccounts();
        const contractAddress = {
            Avatar: "0xEE7ff88E92F2207dBC19d89C1C9eD3F385513b35",
            Item: "0xfC5654489b23379ebE98BaF37ae7017130B45086",
            Gem: "0x0e2a085063e15FEce084801C6806F3aE7eaDfBf5"
        }

        const assetsABI = AssetsABI;

        const avatarContract = new web3.eth.Contract(assetsABI, contractAddress.Avatar);
        avatarContract.methods.balanceOf(wallet).call().then((total: any) => {
            this.cacheService.setItemCache('avatar', total);
        })
        const itemContract = new web3.eth.Contract(assetsABI, contractAddress.Item);
        itemContract.methods.balanceOf(wallet).call().then((total: any) => {
            this.cacheService.setItemCache('item', total);
        })
        const gemContract = new web3.eth.Contract(assetsABI, contractAddress.Gem);
        gemContract.methods.balanceOf(wallet).call().then((total: any) => {
            this.cacheService.setItemCache('gem', total);
        })

        return true;
    }
}