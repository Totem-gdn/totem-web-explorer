import { Component, OnInit } from '@angular/core';
import { AlchemyService } from '@app/core/services/crypto/alchemy-api.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';

@Component({
  selector: 'user-gems',
  templateUrl: './user-gems.component.html',
  styleUrls: ['./user-gems.component.scss']
})
export class UserGemsComponent implements OnInit {

  constructor(private alchemyService: AlchemyService,
              private web3Service: Web3AuthService) { }

  gems!: any[];

  async ngOnInit() {
    const wallet = await this.web3Service.getAccounts();

    this.alchemyService.getNfts(wallet).subscribe((nfts: any[]) => {
      const gems: any[] = [];
      for (let nft of nfts) {
        nft.id.tokenId = parseInt(nft.id.tokenId);
        if (nft.contractMetadata.name === 'Gem') {
          gems.push(nft);
        }
      }
      this.gems = gems;
    })
  }


}
