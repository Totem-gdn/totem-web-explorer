import { Component, OnInit } from "@angular/core";
import { NftService } from "@app/core/services/crypto/nft.service";
import { Web3Service } from "@app/core/services/crypto/web3auth/web3auth.service";

@Component({
    selector: 'app-nfts',
    templateUrl: './nfts.component.html',
    host: {
        class: 'h-full'
    }
})

export class NftsComponent implements OnInit {

    constructor(private nftService: NftService,
                private web3Service: Web3Service) {}

    error = false;
    wallet!: string;
    nfts!: any[];

    async ngOnInit() {
        const accounts = await this.web3Service.getAccounts();

        if(!accounts) return;
        this.wallet = accounts[0];

        this.nftService.getNft(this.wallet).then((nfts: any) => {
            this.nfts = nfts.ownedNfts;
            console.log('nfts: ',nfts.ownedNfts);
        }).catch(err => {
            console.log(err);
        })
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