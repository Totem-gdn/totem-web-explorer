import { Component, OnInit } from "@angular/core";
import { AlchemyApiService } from "@app/core/services/crypto/alchemy-api.service";
import { Web3Service } from "@app/core/services/crypto/web3auth/web3auth.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-nfts',
    templateUrl: './nfts.component.html',
    host: {
        class: 'h-full'
    }
})

export class NftsComponent implements OnInit {

    constructor(private alchemyService: AlchemyApiService,
                private web3Service: Web3Service) {}

    error = false;
    wallet!: string;
    nfts!: any[];

    async ngOnInit() {
        const accounts = await this.web3Service.getAccounts();

        if(!accounts) return;
        this.wallet = accounts[0];

        this.alchemyService.getNft(this.wallet).then((nfts: any) => {
            this.nfts = this.nftsHandler(nfts.ownedNfts);
            console.log('nfts: ',nfts.ownedNfts);
        }).catch(err => {
            console.log(err);
        })

    }

    nftsHandler(nfts: any) {
        console.log(nfts);
        const formattedNfts: any[] = [];
        for(let nft of nfts) {
            nft.timeLastUpdated = new Date(nft.timeLastUpdated).toLocaleString();
            formattedNfts.push(nft);
        }
        const sortedNfts = formattedNfts.sort(function(a, b): any {
            return Date.parse(a.timeLastUpdated) - Date.parse(b.timeLastUpdated);
    
        });
        return sortedNfts.reverse();
    }

    onClickBack() {
        this.error = false;
    }

    async onClickGenerate() {
        const balance = await this.web3Service.getBalance();
        if(balance === '0') {
            console.log(balance);
            this.error = true;
            return;
        }
        const res = await this.web3Service.mintNft().catch(err => {
            console.log(err);
        });
        console.log(res);
    }

    async onClickDeploy() {
        const balance = await this.web3Service.getBalance();
        if(balance === '0') {
            console.log(balance);
            this.error = true;
            return;
        }
        const res = await this.web3Service.deployNft().catch(err => {
            console.log(err);
        });
        console.log(res);
    }

}