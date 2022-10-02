import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlchemyService } from '@app/core/services/crypto/alchemy-api.service';
import { ItemsService } from '@app/core/services/items/items.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss']
})
export class UserItemsComponent implements OnInit {

  constructor(private itemsService: ItemsService,
              private web3Service: Web3AuthService,
              private alchService: AlchemyService) { }
  sub!: Subscription;

  items: any[] = [];
  totalItems: undefined | number;

  async ngOnInit() {
    const wallet = await this.web3Service.getAccounts();

    this.itemsService.fetchItems(wallet).subscribe(items => {
      this.items = this.items.concat(items);
    });

    this.alchService.getNfts(wallet).subscribe((nfts: any[]) => {

      for(let nft of nfts) {
        nft.id.tokenId = parseInt(nft.id.tokenId);
        if(nft.contractMetadata.name === 'Item') {
          this.items.unshift(nft);
        }
      }
    })

    this.alchService.totalItems.subscribe(total => {
      console.log('totalItems')
      this.totalItems = total.totalItems;
    });
  }

  ngOnDestroy () {
    this.sub?.unsubscribe();
  }

}
