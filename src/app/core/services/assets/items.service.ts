import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AssetsABI } from "@app/core/web3auth/abi/assetsABI";
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
            const tokenContract = AssetsABI;
            const contract = new web3.eth.Contract(tokenContract, contractAddress);
        
            const tx = await contract.methods.ownerOf(2).call();
            console.log(tx);
            return tx;
    }

    async getListOfNfts() {
        if (!this.web3.provider) {
            console.log("provider not initialized yet");
            return;
        }
        const web3 = new Web3(this.web3.provider as any);
        const accounts = await web3.eth.getAccounts();
        // console.log(accounts);
        const Contracts = {
          Avatar: "0xEE7ff88E92F2207dBC19d89C1C9eD3F385513b35", // https://mumbai.polygonscan.com/address/0xEE7ff88E92F2207dBC19d89C1C9eD3F385513b35
          Item: "0xfC5654489b23379ebE98BaF37ae7017130B45086", // https://mumbai.polygonscan.com/address/0xfC5654489b23379ebE98BaF37ae7017130B45086
          Gem: "0x0e2a085063e15FEce084801C6806F3aE7eaDfBf5", // https://mumbai.polygonscan.com/address/0x0e2a085063e15FEce084801C6806F3aE7eaDfBf5
        };
        const contractAddress = Contracts.Gem;
        const contractABI = GetTokensABI;
        const wallet = accounts[0];
    
        // JSON.parse(JSON.stringify(contractABI))
        const contract = new web3.eth.Contract(GetTokensABI, contractAddress);
        console.log(contract);
        const balanceOf = await contract.methods.tokenOfOwnerByIndex(wallet).call();
        console.log('balance', balanceOf)
        // const lastClaimed = await contract.methods.lastClaimed(wallet).call();
        // console.log(lastClaimed)
        // const tokenURI = await contract.methods.ownerOf(2).call();
        // console.log('tokenUri', AssetsABI)
    
        // for(let i = 0; i < balanceOf; i++) {
        //   const tokenId = await contract.methods.tokenOfOwnerByIndex(wallet, i).call();
        //   console.log('tokenId', tokenId);
        //   const tokenURI = await contract.methods.tokenURI(tokenId).call();
        //   console.log('tokenUrl: ', tokenURI)
        // }
        return balanceOf;
      }
}