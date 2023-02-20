import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { Animations } from '@app/core/animations/animations';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { BLOCK_TYPE } from '@app/core/models/enums/block-types.enum';
import { COLOR_POPUP_TYPE } from '@app/core/models/enums/popup.enum';
import { AssetTypeInfo, PaymentInfo } from '@app/core/models/interfaces/asset-info.model';
import { HomepageBlock } from '@app/core/models/interfaces/homepage-blocks.interface';
import { CardPaymentResponse } from '@app/core/models/interfaces/payment.interface';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { UserEntity } from '@app/core/models/interfaces/user-interface.model';
import { BuyAssetService } from '@app/core/services/assets/buy-asset.service';
import { UserStateService } from '@app/core/services/auth.service';
import { HomepageBlocksService } from '@app/core/services/blocks/homepage-blocks.service';
import { CryptoUtilsService } from '@app/core/services/crypto/crypto-utils.service';
import { TransactionsService } from '@app/core/services/crypto/transactions.service';
import { PopupService } from '@app/core/services/states/popup-state.service';
import { TotemEventListenerService } from '@app/core/services/utils/global-event-listeners.service';
import { GamesStoreService } from '@app/core/store/games-store.service';
import { AssetsListenerService } from '@app/core/web3auth/abi/assets-transaction.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { environment } from '@env/environment';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Gtag } from 'angular-gtag';
import { BehaviorSubject, catchError, combineLatest, map, of, Subscription, timer } from 'rxjs';


@Component({
  selector: 'buy-asset',
  templateUrl: './buy-asset.component.html',
  styleUrls: ['./buy-asset.component.scss'],
  animations: [
    Animations.animations
  ]
})
export class TotemBuyAssetComponent implements AfterViewInit, OnDestroy {

  constructor(
    private buyAssetService: BuyAssetService,
    private web3Service: Web3AuthService,
    private popupService: PopupService,
    private cryptoUtilsService: CryptoUtilsService,
    private totemEListenerService: TotemEventListenerService,
    private userStateService: UserStateService,
    private snackService: SnackNotifierService,
    private transactionsService: TransactionsService,
    private assetsListenerService: AssetsListenerService,
    private gtag: Gtag
  ) {
    this.gtag.event('page_view');
  }

  @ViewChild('item1') item1!: ElementRef;
  @ViewChild('item2') item2!: ElementRef;

  @ViewChild('movingCircle') movingCircle!: any;

  paymentPopup: Window | null = null;

  currentUser$: BehaviorSubject<UserEntity | null> = new BehaviorSubject<UserEntity | null>(null);
  games$: BehaviorSubject<GameDetail[]> = new BehaviorSubject<GameDetail[]>([]);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  assets: PaymentInfo[] = [{ type: ASSET_TYPE.ITEM }, { type: ASSET_TYPE.AVATAR }];
  subs: Subscription = new Subscription();


  disableLoop = { disable: false, immutable: false };
  loop: any;

  ngAfterViewInit(): void {
    this.userStateService.currentUser.subscribe((user: UserEntity | null) => {
      this.currentUser$.next(user);
    })
    this.updateAssets();
    this.playAnimation();
  }

  updateAssets() {
    this.loading$.next(true);
    /* this.buyAssetService.getAssets().pipe(
      catchError((err: HttpErrorResponse) => {
        this.snackService.open(err?.error?.message || err.message);
        this.loading$.next(false);
        return of();
      })
      ).subscribe(assets => {
        this.paymentInfo(assets);
    }) */
    combineLatest([
      this.assetsListenerService.getPriceAndContractAddress('item'),
      this.assetsListenerService.getPriceAndContractAddress('avatar')
    ]).pipe(
      catchError((err: HttpErrorResponse) => {
        this.snackService.open(err?.error?.message || err.message);
        this.loading$.next(false);
        return of();
      }),
      map(([item, avatar]) => {return {item, avatar}})
    ).subscribe((response: {item: AssetTypeInfo, avatar: AssetTypeInfo}) => {
      if (response?.item) this.assets[0].paymentInfo = response.item;
      if (response?.avatar) this.assets[1].paymentInfo = response.avatar;
      this.loading$.next(false);
      console.log('ITEM AND AVATAR DATA FETCHED');
    })
  }

  /* paymentInfo(assets: any[]) {
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
  } */

  buyWithCard(type: string) {
    this.loading$.next(true);
    if (!this.web3Service.isLoggedIn()) {
      // this.snackService.open('PLEASE Login');
      this.userStateService.login();
      this.loading$.next(false);
      return;
    }
    const user = this.currentUser$.getValue();
    if (!user) {
      this.userStateService.login();
      this.loading$.next(false);
      return;
    }
    this.transactionsService.buyAssetWithCard(type, user.wallet!).pipe(
      catchError((err: HttpErrorResponse) => {
        this.snackService.open(err.error.message || err.message);
        this.loading$.next(false);
        return of();
      }))
      .subscribe((data: CardPaymentResponse) => {
        if (data && data.url) {
          this.openInNewWindow(data.url);
        }
        this.loading$.next(false);
      });
  }

  openInNewWindow(url: string) {
    // Fixes dual-screen position                             Most browsers      Firefox
    const h: number = 700;
    const w: number = 900;
    const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;
    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    this.paymentPopup = window.open(url, 'paymentPopup', `toolbar=0, menubar=0, location=0, popup=1, top=${top}, left=${left}, width=${w / systemZoom}, height=${h / systemZoom}`);
    if (this.paymentPopup) {
      this.paymentPopup.focus();
      this.listenUnloadAndMessages();
      this.paymentPopup.onload = (event: any) => {
        this.listenUnloadAndMessages();
      }
    }
  }

  listenUnloadAndMessages() {
    if (this.paymentPopup) {
      this.subs.add(
        window.addEventListener("message", (event) => {
          if (event.data.target.includes(environment.TOTEM_WEB_EXPLORER_URL)) {
            this.totemEListenerService.processParams(event.data);
            this.paymentPopup?.close();
          }
        }, false)
      )
    }
  }

  playAnimation() {
    let currentItemIndex = 1;

    setTimeout(() => {
      this.animateItem(currentItemIndex == 0 ? 1 : 0, false);
      currentItemIndex = currentItemIndex == 0 ? 1 : 0;
    }, 100)

    this.loop = setInterval(() => {
      if (this.disableLoop.disable === true) {
        return;
      }
      this.animateItem(currentItemIndex == 0 ? 1 : 0, false);
      currentItemIndex = currentItemIndex == 0 ? 1 : 0;

    }, 2500);

  }

  animateItem(index: number, disableLoop: boolean) {


    let item = index == 0 ? this.item1.nativeElement : this.item2.nativeElement as HTMLElement;
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
    // item.style.color = '#353840';
    item.style.transform = 'translateY(0px)';
    circles.style.opacity = '0';
    icon.style.color = '#353840';
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
    this.subs.unsubscribe();
  }
}
