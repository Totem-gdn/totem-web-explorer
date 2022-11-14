import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { UserStateService } from '@app/core/services/auth.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { PopupService } from '@app/layout/components/popup.service';
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
    private route: ActivatedRoute,
    private assetsService: AssetsService,
    private web3Service: Web3AuthService,
    private favouritesService: FavouritesService,
    private messageService: SnackNotifierService,
    private userService: UserStateService,
    private popupService: PopupService
  ) {
    super();
  }

  @ViewChild('playContainer') playContainer!: ElementRef;

  myWallet!: string;

  @Input() item!: any;
  @Input() type!: string;

  ngOnInit() {
    // uncomite after make logic for pay item
    // this.userService.currentUser
    // .pipe(untilComponentDestroyed(this))
    // .subscribe(user => {
    //   if(user) {
    //     this.web3Service.getAccounts().then(wallet => {
    //       this.myWallet = wallet;
    //     }); 
    //   }
    // })

    // delete after make logic for pay item
    this.myWallet = 'disable'
    this.item.owner = 'disable'

  }

  onClickLike() {
    if (!this.web3Service.isLoggedIn()) {
      this.messageService.open('Unauthorized');
      return;
    }
    if (!this.item.isLiked) {
      this.favouritesService.addLike(this.type, this.item.id).pipe(
        untilComponentDestroyed(this),
      ).subscribe(() => {
        this.assetsService.updateAsset(this.item.id, this.type).pipe(
          untilComponentDestroyed(this),
        ).subscribe();
      });
    } else {
      this.favouritesService.removeLike(this.type, this.item.id).pipe(
        untilComponentDestroyed(this),
      ).subscribe(() => {
        this.assetsService.updateAsset(this.item.id, this.type).pipe(
          untilComponentDestroyed(this),
        ).subscribe();
      });
    }

  }

  walletCopied() {
    this.messageService.open('Copied to the clipboard');
  }

  onClickBuy() {
    if (!this.web3Service.isLoggedIn()) {
      this.messageService.open('Unauthorized');
      return;
    }

    this.popupService.showAssetTransaction(this.item);
  }


}
