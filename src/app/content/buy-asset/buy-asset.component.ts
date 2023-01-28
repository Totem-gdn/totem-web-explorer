import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { BLOCK_TYPE } from '@app/core/models/enums/block-types.enum';
import { COLOR_POPUP_TYPE } from '@app/core/models/enums/popup.enum';
import { PaymentInfo } from '@app/core/models/interfaces/asset-info.model';
import { HomepageBlock } from '@app/core/models/interfaces/homepage-blocks.interface';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { BuyAssetService } from '@app/core/services/assets/buy-asset.service';
import { UserStateService } from '@app/core/services/auth.service';
import { HomepageBlocksService } from '@app/core/services/blocks/homepage-blocks.service';
import { CryptoUtilsService } from '@app/core/services/crypto/crypto-utils.service';
import { PopupService } from '@app/core/services/states/popup-state.service';
import { GamesStoreService } from '@app/core/store/games-store.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Gtag } from 'angular-gtag';
import { BehaviorSubject, catchError, of } from 'rxjs';


@Component({
  selector: 'buy-asset',
  templateUrl: './buy-asset.component.html',
  styleUrls: ['./buy-asset.component.scss'],
})
export class TotemBuyAssetComponent extends OnDestroyMixin implements OnInit, OnDestroy {

  games$: BehaviorSubject<GameDetail[]> = new BehaviorSubject<GameDetail[]>([]);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  assets: PaymentInfo[] = [{ type: ASSET_TYPE.ITEM }, { type: ASSET_TYPE.AVATAR }];

  constructor(
    private buyAssetService: BuyAssetService,
    private web3Service: Web3AuthService,
    private popupService: PopupService,
    private cryptoUtilsService: CryptoUtilsService,
    private userStateService: UserStateService,
    private snackService: SnackNotifierService,
    private gtag: Gtag
  ) {
    super();
    this.gtag.event('page_view');
  }

  ngOnInit(): void {
    this.updateAssets();
  }

  async onBuyItem(paymentInfo: PaymentInfo) {

    if(!paymentInfo?.paymentInfo?.address || !paymentInfo?.paymentInfo?.price) return;

    if (!this.web3Service.isLoggedIn()) {
      await this.userStateService.login();
      this.gtag.event(`${paymentInfo?.type}_purchase`, {
        'event_label': 'Generate item when user is not login',
      });
      return;
    }

    const usdcBalance = await this.cryptoUtilsService.getUSDCBalance();

    if (+usdcBalance < +paymentInfo?.paymentInfo?.price) {
      this.popupService.showColorPopup(COLOR_POPUP_TYPE.INSUFFICIENT_FUNDS);
      return;
    }

    this.popupService.showAssetTransaction('payment', paymentInfo);
  }

  updateAssets() {
    this.loading$.next(true);
    this.buyAssetService.getAssets().pipe(
      catchError((err: HttpErrorResponse) => {
        this.snackService.open(err?.error?.message || err.message);
        this.loading$.next(false);
        return of();
      })
      ).subscribe(assets => {
        this.paymentInfo(assets);
    })
  }

  paymentInfo(assets: any[]) {
    assets.forEach(asset => {
      this.buyAssetService.getPaymentInfo(asset).pipe(
        catchError((err: HttpErrorResponse) => {
          this.snackService.open(err?.error?.message || err.message);
          this.loading$.next(false);
          return of();
        })
        ).subscribe(info => {
          if (asset == 'item') this.assets[0].paymentInfo = info;
          if (asset == 'avatar') this.assets[1].paymentInfo = info;
          if (this.assets.length == 2) {
            this.loading$.next(false);
          }
      })
    })
  }

}
