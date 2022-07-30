import { Component, OnInit } from '@angular/core';
import { AlchemyApiService } from '@app/core/services/crypto/alchemy-api.service';
import { Web3Service } from '@app/core/services/crypto/web3auth/web3auth.service';

@Component({
  selector: 'app-nft-metadata',
  templateUrl: './nft-metadata.component.html',
  host: {
    class: 'h-full'
}
})
export class NftMetadataComponent implements OnInit {

  constructor(private alchemyService: AlchemyApiService,
    private web3Service: Web3Service) { }

  wallet!: string;
  nfts!: any[];

  async ngOnInit() {
    const accounts = await this.web3Service.getAccounts();

    if (!accounts) return;
    this.wallet = accounts[0];

    this.alchemyService.getNft(this.wallet).then((nfts: any) => {
      this.nfts = nfts.ownedNfts;
      console.log(nfts.ownedNfts);
    }).catch(err => {
      console.log(err);
    })
  }

}
