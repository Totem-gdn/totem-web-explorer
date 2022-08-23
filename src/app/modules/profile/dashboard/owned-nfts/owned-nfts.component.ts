import { Component, OnInit } from '@angular/core';
import { AlchemyService } from '@app/core/services/crypto/alchemy-api.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';

@Component({
  selector: 'owned-nfts',
  templateUrl: './owned-nfts.component.html',
  styleUrls: ['./owned-nfts.component.scss']
})
export class OwnedNftsComponent implements OnInit {

  constructor(private alchemyService: AlchemyService,
    private web3Service: Web3AuthService) { }

  nfts: any[] | undefined;

  async ngOnInit() {
    const account = await this.web3Service.getAccounts();
    if (!account) return;

    this.alchemyService.getNft(account).then((nfts: any) => {
      this.formatNfts(nfts.ownedNfts);
    }).catch(err => {
      console.log(err);
    })
  }

  formatNfts(nfts: any[]) {
    const formattedNfts: any[] = [];
    for(let nft of nfts) {
      const oldDate = nft.timeLastUpdated;
      nft.timeLastUpdated = new Date(oldDate).toLocaleDateString();
      formattedNfts.push(nft);
    }

    this.nfts = formattedNfts;
  }

}
