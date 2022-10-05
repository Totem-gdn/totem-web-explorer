import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlchemyService } from '@app/core/services/crypto/alchemy-api.service';
import { AvatarsService } from '@app/core/services/items/avatars.service';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-avatars',
  templateUrl: './user-avatars.component.html',
  styleUrls: ['./user-avatars.component.scss']
})
export class UserAvatarsComponent implements OnInit {

  constructor(private web3Service: Web3AuthService,
              private alchService: AlchemyService) { }

  sub!: Subscription;
  avatars!: any[];

  async ngOnInit() {
    const wallet = await this.web3Service.getAccounts();

    this.alchService.getNfts(wallet).subscribe((nfts: any[]) => {
      const avatars: any[] = [];
      for(let nft of nfts) {
        nft.id.tokenId = parseInt(nft.id.tokenId);
        if(nft.contractMetadata.name === 'Avatar') {
          avatars.push(nft);
        }
      }
      this.avatars = avatars;
    })

  }

  ngOnDestroy () {
    this.sub?.unsubscribe();
  }

}
