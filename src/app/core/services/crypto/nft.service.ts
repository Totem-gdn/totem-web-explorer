import { Injectable } from "@angular/core";

import { createAlchemyWeb3 } from"@alch/alchemy-web3";
import { environment } from "@env/environment";
import { HttpClient } from "@angular/common/http";
import { from, map, take } from "rxjs";

const ALCHEMY_KEY = environment.ALCHEMY_KEY;
const web3 = createAlchemyWeb3(ALCHEMY_KEY)

@Injectable({ providedIn: 'root' })

export class NftService {

    constructor(private http: HttpClient) {}

    async getNft(wallet: string) {

       return web3.alchemy.getNfts({ owner: wallet });

    }

    createNft(items: any) {

        
    }

}