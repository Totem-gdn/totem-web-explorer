import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { FavouritesService } from '@app/modules/profile/dashboard/favourites/favourites.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'item-desc',
  templateUrl: './item-desc.component.html',
  styleUrls: ['./item-desc.component.scss'],
  host: {
    class: 'flex grow'
  }
})
export class ItemDescComponent extends OnDestroyMixin implements OnInit {

  constructor(
    private assetsService: AssetsService,
    private web3Service: Web3AuthService,
    private favouritesService: FavouritesService,
    private messageService: SnackNotifierService,
  ) {
    super();
  }

  @ViewChild('playContainer') playContainer!: ElementRef;

  myWallet!: string;

  @Input() item!: any;
  @Input() type!: string;

  ngOnInit() {

  }

  onClickLike() {
    if (!this.web3Service.isLoggedIn()) {
      this.messageService.open('Unauthorized');
      return;
    }
    console.log('addd like')
    if (!this.item.isLiked) {
      this.favouritesService.addLike(this.type, this.item.id).pipe(
        untilComponentDestroyed(this),
      ).subscribe(() => {
        console.log('update asset')
        this.assetsService.updateAsset(this.item.id, this.type)
        .pipe(untilComponentDestroyed(this))
        .subscribe(asset => {
          this.item = asset;
        });
      });
    } else {
      this.favouritesService.removeLike(this.type, this.item.id).pipe(
        untilComponentDestroyed(this),
      ).subscribe(() => {
        this.assetsService.updateAsset(this.item.id, this.type)
        .pipe(untilComponentDestroyed(this))
        .subscribe(asset => {
          this.item = asset;
        });
      });
    }

  }

  walletCopied() {
    this.messageService.open('Copied to the clipboard');
  }

  onClickBuy() {
    // if (!this.web3Service.isLoggedIn()) {
    //   this.messageService.open('Unauthorized');
    //   return;
    // }

    // this.popupService.showAssetTransaction(this.item);
  }


}
