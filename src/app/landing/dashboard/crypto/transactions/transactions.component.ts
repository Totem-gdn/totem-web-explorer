import { Component, OnInit } from '@angular/core';
import { NftService } from '@app/core/services/crypto/nft.service';
import { Web3Service } from '@app/core/services/crypto/web3auth/web3auth.service';
import { Web3Auth } from '@web3auth/web3auth';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  host: {
    class: 'h-full'
  }
})
export class TransactionsComponent implements OnInit {


  constructor(private nftService: NftService,
                private web3Service: Web3Service) {}

    error = false;
    wallet!: string;
    nfts!: any[];

    async ngOnInit() {
        const accounts = await this.web3Service.getAccounts();

        console.log(accounts);
        if(!accounts) return;
        this.wallet = accounts[0];

        this.nftService.getNft(this.wallet).then((nfts: any) => {
            this.nfts = nfts.ownedNfts;
            console.log(nfts.ownedNfts);
            console.log(nfts.ownedNfts[8].id.tokenMetadata.tokenType)
            console.log(nfts.ownedNfts[8].metadata.name)
            console.log(nfts.ownedNfts[8].metadata.description)
            console.log(nfts.ownedNfts[8].metadata.image)
        }).catch(err => {
            console.log(err);
        })
    }

}
