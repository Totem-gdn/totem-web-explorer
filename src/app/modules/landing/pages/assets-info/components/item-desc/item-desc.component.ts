import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { FavouritesService } from '@app/modules/profile/dashboard/favourites/favourites.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { take } from 'rxjs';

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
    public router: Router
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
      this.web3Service.login();
      return;
    }
    if (!this.item.isLiked) {
      this.favouritesService.addLike(this.type, this.item.id).pipe(
        untilComponentDestroyed(this),
      ).subscribe(() => {
        this.updateAsset();
      });
    } else {
      this.favouritesService.removeLike(this.type, this.item.id).pipe(
        untilComponentDestroyed(this),
      ).subscribe(() => {
        this.updateAsset();
      });
    }

  }

  walletCopied() {
    this.messageService.open('Copied to the clipboard');
  }

  updateAsset() {
    this.assetsService.updateAsset(this.item.id, this.type)
    .pipe(take(1))
    .subscribe(asset => {
      this.item = asset;
    });
  }

  onClickBuy() {

  }

}
