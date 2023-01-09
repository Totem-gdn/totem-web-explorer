import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fadeInBotAnimation } from '@app/core/animations/fade-in';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { COLOR_POPUP_TYPE } from '@app/core/models/enums/popup.enum';
import { AssetInfo, PaymentInfo } from '@app/core/models/interfaces/asset-info.model';

import { BuyAssetService } from '@app/core/services/assets/buy-asset.service';
import { CryptoUtilsService } from '@app/core/services/crypto/crypto-utils.service';
import { TransferService } from '@app/core/services/crypto/transfer.service';
import { PopupService } from '@app/core/services/states/popup-state.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { Gtag } from 'angular-gtag';
import { fromEvent, Subject, takeUntil } from 'rxjs';
import { SnackNotifierService } from '../../../../../components/utils/snack-bar-notifier/snack-bar-notifier.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
  animations: [
    fadeInBotAnimation
  ]
})
export class BuyComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private buyAssetService: BuyAssetService,
    private web3Service: Web3AuthService,
    private breakpointObserver: BreakpointObserver,
    private popupService: PopupService,
    private cryptoUtilsService: CryptoUtilsService,
    private snackService: SnackNotifierService,
    private gtag: Gtag
  ) {
    this.gtag.event('page_view');
  }

  assets: PaymentInfo[] = [{ type: ASSET_TYPE.ITEM }, { type: ASSET_TYPE.AVATAR }, { type: ASSET_TYPE.GEM },];

  // disableButton: boolean | null = null;
  disableLoop = { disable: false, immutable: false };
  loop: any;

  @ViewChild('itemsRef') itemsRef!: ElementRef;
  @ViewChild('movingCircle') movingCircle!: any;
  subs = new Subject();

  ngOnInit(): void {
    this.updateAssets();
  }

  ngAfterViewInit(): void {
    this.screenObserver();
  }

  screenObserver() {
    this.breakpointObserver
      .observe(['(min-width: 745px)'])
      .pipe(takeUntil(this.subs))
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.disableLoop = { disable: false, immutable: false };
        } else {
          this.disableLoop = { disable: true, immutable: true };

          fromEvent(window, 'scroll')
            .pipe(takeUntil(this.subs))
            .subscribe(() => {
              let items = this.itemsRef.nativeElement.getElementsByClassName('item-wrapper');
              for (let i = 0; i < items.length; i++) {
                const offset = items[i].getBoundingClientRect().y;
                if (offset > 0) {
                  this.animateItem(items[i], false);
                  return;
                }
              }
            })
        }
      });
  }

  async onBuyItem(paymentInfo: PaymentInfo) {
    if(!paymentInfo?.paymentInfo?.address || !paymentInfo?.paymentInfo?.price) return;

    if (!this.web3Service.isLoggedIn()) {
      // this.snackService.open('PLEASE Login');
      this.web3Service.login();
      this.gtag.event(`${paymentInfo?.type}_purchase`, {
        'event_label': 'Generate item when user is not login',
      });
      return;
    }

    const usdcBalance = await this.cryptoUtilsService.getUSDCBalance();

    if (+usdcBalance < +paymentInfo?.paymentInfo?.price) {
      this.popupService.showColorPopup(COLOR_POPUP_TYPE.INSUFFICIENT_FUNDS);
      // this.snackService.open('Insufficient USDC balance');
      return;
    }

    this.popupService.showAssetTransaction('payment', paymentInfo);
  }

  updateAssets() {
    this.buyAssetService.getAssets().subscribe(assets => {
      this.paymentInfo(assets);
    })
  }

  paymentInfo(assets: any[]) {
    assets.forEach(asset => {
      this.buyAssetService.getPaymentInfo(asset).subscribe(info => {
        if (asset == 'item') this.assets[0].paymentInfo = info;
        if (asset == 'avatar') this.assets[1].paymentInfo = info;
        if (asset == 'gem') this.assets[2].paymentInfo = info;
        console.log(this.assets)
        if (this.assets.length == 3) {
          this.playAnimation();
        }
      })
    })
  }

  playAnimation() {
    let currentItemIndex = 0;
    let reverse = false;

    this.loop = setInterval(() => {
      if (this.disableLoop.disable === true) {
        return;
      }
      let items = this.itemsRef.nativeElement.getElementsByClassName('item-wrapper');
      const itemsCount = items.length - 1;

      this.animateItem(items[currentItemIndex], false);

      if (currentItemIndex == itemsCount && reverse === false && currentItemIndex != 0) {
        currentItemIndex = itemsCount - 1;
        reverse = true;
        return;
      }
      if (currentItemIndex == 0 && reverse === true && currentItemIndex != itemsCount) {
        currentItemIndex = 1;
        reverse = false;
        return;
      }
      if (reverse == false) {
        currentItemIndex++;
      } else {
        currentItemIndex--;
      }
    }, 2000);

  }

  animateItem(item: any, disableLoop: boolean) {
    if (disableLoop && this.disableLoop.immutable == false) {
      this.disableLoop.disable = true;
    }

    item.style.color = 'white';
    item.firstChild.style.opacity = '0.5';
    this.resetWithExeption(item, false);
    this.moveCircle(item);

  }
  resetWithExeption(exeption: any, userLeave: boolean) {
    if (userLeave && this.disableLoop.immutable == false) {
      this.disableLoop.disable = false;
    }
    let items: any[] = this.itemsRef.nativeElement.getElementsByClassName('item-wrapper');
    for (let item of items) {
      if (item === exeption) continue;
      item.style.color = '#353840';
      item.firstChild.style.opacity = '0';
    }
  }

  moveCircle(item: any) {
    const itemX = item.offsetLeft + (item.offsetWidth / 2) - 150;
    const itemY = item.offsetTop + (item.offsetHeight / 2) - 200;
    this.movingCircle.nativeElement.style.transform = `translate(${itemX}px,${itemY}px)`;
    this.movingCircle.nativeElement.style.transition = 'transform .8s ease-in-out, opacity 1s .5s';
    this.movingCircle.nativeElement.style.opacity = `1`;
  }

  ngOnDestroy(): void {
    clearInterval(this.loop);
    this.subs.next(null);
    this.subs.complete();
  }

}
