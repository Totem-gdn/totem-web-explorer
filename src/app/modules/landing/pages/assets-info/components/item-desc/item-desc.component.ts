import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { UserStateService } from '@app/core/services/auth.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { FavouritesService } from '@app/modules/profile/dashboard/favourites/favourites.service';
import { Subject, takeUntil } from 'rxjs';
import { PopupService } from '@app/layout/components/popup.service';

@Component({
  selector: 'item-desc',
  templateUrl: './item-desc.component.html',
  styleUrls: ['./item-desc.component.scss'],
  host: {
    class: 'flex grow'
  }
})
export class ItemDescComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private assetsService: AssetsService,
    private web3Service: Web3AuthService,
    private favouritesService: FavouritesService,
    private messageService: SnackNotifierService,
    private userService: UserStateService,
    private popupService: PopupService) { }

  @ViewChild('playContainer') playContainer!: ElementRef;

  subs = new Subject<void>();
  myWallet!: string;

  @Input() item!: any;
  @Input() type!: string;

  async ngOnInit() {
    this.userService.currentUser
    .pipe(takeUntil(this.subs))
    .subscribe(user => {
      if(user) {
        this.web3Service.getAccounts().then(wallet => {
          this.myWallet = wallet;
        }); 
      }
    })

  }

  onClickLike() {
    if (!this.web3Service.isLoggedIn()) {
      this.messageService.open('Unauthorized');
      return;
    }
    if (!this.item.isLiked) {
      this.favouritesService.addLike(this.type, this.item.id).subscribe(() => {
        this.assetsService.updateAsset(this.item.id, this.type).subscribe();
      });
    } else {
      this.favouritesService.removeLike(this.type, this.item.id).subscribe(() => {
        this.assetsService.updateAsset(this.item.id, this.type).subscribe();
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
