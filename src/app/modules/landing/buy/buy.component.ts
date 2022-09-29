import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '@app/core/services/crypto/payment.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { forkJoin } from 'rxjs';
import { SnackNotifierService } from '../modules/snack-bar-notifier/snack-bar-notifier.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit, OnDestroy {

  constructor(private paymentService: PaymentService,
    private web3Service: Web3AuthService,
    private snackService: SnackNotifierService,
    private breakpointObserver: BreakpointObserver) { }

  maticBalance: any = 0;
  tokenBalance: any = 0;
  assets: any[] = [];

  disableButton: boolean | null = null;
  disableLoop!: boolean;
  loop: any;

  @ViewChild('itemsRef') itemsRef!: ElementRef;
  @ViewChild('movingCircle') movingCircle!: any;

  ngOnInit(): void {
    this.updateAssets();
    this.observer();
  }

  observer() {
    this.breakpointObserver
      .observe(['(min-width: 400px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
        } else {
        }
      });
  }

  async onBuyItem(address: string, amount: any) {

    if (!this.web3Service.isLoggedIn()) {
      this.snackService.open('PLEASE Login');
      return;
    }

    const matic = await this.web3Service.getBalance();
    const usdc = await this.web3Service.getTokenBalance();

    if (!matic || +matic <= 0) {
      this.snackService.open('Insufficient MATIC balance');
      return;
    }
    if (!usdc || +usdc <= 0) {
      this.snackService.open('Insufficient USDC balance');
      return;
    }
    this.snackService.open('Your payment has been sent');
    this.paymentService.buyItem(address, amount).then(res => {
      this.snackService.open('Your Totem Asset has been created successfully');
    })
  }

  updateAssets() {
    this.paymentService.getAssets().subscribe(assets => {
      console.log('assets: ', assets)
      this.paymentInfo(assets);
    })
  }

  paymentInfo(assets: any[]) {
    assets.forEach(asset => {
      this.paymentService.getPaymentInfo(asset).subscribe(info => {
        const newAsset = {
          type: asset,
          paymentInfo: info
        };
        this.assets.push(newAsset);
        if(this.assets.length == 3) {
          this.playAnimation();
        }
      })
    })
  }

  playAnimation() {
    let currentItemIndex = 0;
    let reverse = false;

    this.loop = setInterval(() => {
      if (this.disableLoop === true) {
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
    if (disableLoop) {
      this.disableLoop = true;
    }

    item.style.color = 'white';
    item.firstChild.style.opacity = '0.5';
    this.resetWithExeption(item, false);
    this.moveCircle(item);

  }
  resetWithExeption(exeption: any, userLeave: boolean) {
    if (userLeave) {
      this.disableLoop = false;
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
  }

}
