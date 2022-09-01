import { Injectable } from "@angular/core";
import { environment } from "@env/environment";

import * as NFTStorage from 'nft.storage';

@Injectable({providedIn: 'root'})


export class CreateNftService {

    async createNft(image: any, name: string, desc: string) {
        // const nftStorage = new NFTStorage.NFTStorage({ token: environment.IPFS_KEY});

        const metaData =  {
            image: image,
            name: name,
            description: desc
        }

        // const nft = await nftStorage.store(metaData);
        
        // return nft;

    }

}