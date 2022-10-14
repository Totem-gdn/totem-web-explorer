import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CARD_TYPE } from '@app/core/enums/card-types.enum';
import { StorageKey } from '@app/core/enums/storage-keys.enum';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { SnackNotifierService } from '@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service';
import { FavouritesService } from '@app/modules/profile/dashboard/favourites/favourites.service';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['../cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ItemCardComponent {

  constructor(private router: Router,
    private favouritesService: FavouritesService,
    private itemsService: TotemItemsService,
    private messageService: SnackNotifierService,
    private web3Service: Web3AuthService) { }

  @Input() width = 'full';
  @Input() item: any | null;

  onClickLike() {
    if (!this.web3Service.isLoggedIn()) {
      this.messageService.open('Unauthorized');
      return;
    }
    this.item.isLiked = !this.item.isLiked;
    if (this.item.isLiked) {
      this.favouritesService.addLike(CARD_TYPE.ITEM, this.item.id);
    } else {
      this.favouritesService.removeLike(CARD_TYPE.ITEM, this.item.id);
    }
  }

  onNavigate() {
    const id = this.item?.id || this.item?.id?.tokenId;
    let type = 'asset';
    if (this.item?.id?.tokenId) type = 'nft';
    this.itemsService.testItem.next({ type: 'item', item: this.item });
    this.router.navigate(['/item-info'], { queryParams: { id: id, assetType: 'item', type: type } });
  }

}
