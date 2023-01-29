import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { BLOCK_TYPE } from '@app/core/models/enums/block-types.enum';
import { COLOR_POPUP_TYPE } from '@app/core/models/enums/popup.enum';
import { PaymentInfo } from '@app/core/models/interfaces/asset-info.model';
import { HomepageBlock } from '@app/core/models/interfaces/homepage-blocks.interface';
import { CardPaymentResponse } from '@app/core/models/interfaces/payment.interface';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { BuyAssetService } from '@app/core/services/assets/buy-asset.service';
import { UserStateService } from '@app/core/services/auth.service';
import { HomepageBlocksService } from '@app/core/services/blocks/homepage-blocks.service';
import { CryptoUtilsService } from '@app/core/services/crypto/crypto-utils.service';
import { TransactionsService } from '@app/core/services/crypto/transactions.service';
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
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  assets: PaymentInfo[] = [{ type: ASSET_TYPE.ITEM }, { type: ASSET_TYPE.AVATAR }];

  constructor(
    private buyAssetService: BuyAssetService,
    private web3Service: Web3AuthService,
    private popupService: PopupService,
    private cryptoUtilsService: CryptoUtilsService,
    private userStateService: UserStateService,
    private snackService: SnackNotifierService,
    private transactionsService: TransactionsService,
    private gtag: Gtag
  ) {
    super();
    this.gtag.event('page_view');
  }

  ngOnInit(): void {
    this.updateAssets();
    this.playAnimation();
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

  // paymentInfo(assets: any[]) {
  //   assets.forEach(asset => {
  //     this.buyAssetService.getPaymentInfo(asset).subscribe(info => {
  //       if (asset == 'item') this.assets[0].paymentInfo = info;
  //       if (asset == 'avatar') this.assets[1].paymentInfo = info;
  //       if (asset == 'gem') this.assets[2].paymentInfo = info;
  //       if (this.assets.length == 3) {
  //         this.playAnimation();
  //       }
  //     })
  //   })
  // }

  @ViewChild('item1') item1!: ElementRef;
  @ViewChild('item2') item2!: ElementRef;

  @ViewChild('movingCircle') movingCircle!: any;
  disableLoop = { disable: false, immutable: false };
  loop: any;

  playAnimation() {
    let currentItemIndex = 0;
    let reverse = false;

    this.loop = setInterval(() => {
      if (this.disableLoop.disable === true) {
        return;
      }
      console.log('loop')
      this.animateItem(currentItemIndex == 0 ? 1 : 0, false);
      currentItemIndex = currentItemIndex == 0 ? 1 : 0;

    }, 2500);

  }

  animateItem(index: number, disableLoop: boolean) {
    console.log('animate', index)
    let item = index == 0 ? this.item1.nativeElement : this.item2.nativeElement;
    if (disableLoop && this.disableLoop.immutable == false) {
      this.disableLoop.disable = true;
    }
    const circles = item.getElementsByClassName('circle-wrapper')[0];
    const icon = item.getElementsByClassName('icon')[0];
    item.style.color = 'white';
    item.style.transform = 'translateY(-6px)';
    circles.style.opacity = '0.5';
    icon.style.color = 'white';
    this.resetWithExeption(index, false);
    this.moveCircle(item);
    

  }
  resetWithExeption(index: number, userLeave: boolean) {
    let item = index == 1 ? this.item1.nativeElement : this.item2.nativeElement;

    if (userLeave && this.disableLoop.immutable == false) {
      this.disableLoop.disable = false;
    }
    const circles = item.getElementsByClassName('circle-wrapper')[0];
    const icon = item.getElementsByClassName('icon')[0];
    item.style.color = '#353840';
    item.style.transform = 'translateY(0px)';
    circles.style.opacity = '0';
    icon.style.color = '#353840';
  }

  moveCircle(item: any) {
    const itemX = item.offsetLeft + (item.offsetWidth / 2) - 150;
    const itemY = item.offsetTop + (item.offsetHeight / 2) - 200;
    // console.log('item x', itemX, 'item y', itemY)
    this.movingCircle.nativeElement.style.transform = `translate(${itemX}px,${itemY}px)`;
    this.movingCircle.nativeElement.style.transition = 'transform .8s ease-in-out, opacity 1s .5s';
    this.movingCircle.nativeElement.style.opacity = `1`;
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

  buyWithCard(type: string) {
    this.loading$.next(true);
    this.transactionsService.buyAssetWithCard(type).pipe(
      catchError((err: HttpErrorResponse) => {
        this.snackService.open(err.error.message || err.message);
        this.loading$.next(false);
        return of();
      }))
      .subscribe((data: CardPaymentResponse) => {
        if (data && data.url) {
          this.openInNewWindow(data.url);
        }
        console.log(data);
        this.loading$.next(false);
      });
  }

  openInNewWindow(url: string) {
    window.open(url, '_self');
  }

}
