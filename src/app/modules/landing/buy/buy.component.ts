import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '@app/core/services/crypto/payment.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { forkJoin } from 'rxjs';
import { SnackNotifierService } from '../modules/snack-bar-notifier/snack-bar-notifier.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit, AfterViewInit {

  constructor(private paymentService: PaymentService,
    private web3Service: Web3AuthService,
    private snackService: SnackNotifierService) { }

  maticBalance: any = 0;
  tokenBalance: any = 0;
  assets: any[] = [];

  disableButton: boolean | null = null;

  @ViewChild('itemsRef') itemsRef!: ElementRef;
  @ViewChild('circlesRef') circlesRef!: ElementRef;
  @ViewChild('movingCircle') movingCircle!: any;

  ngOnInit(): void {
    this.updateAssets();
  }

  ngAfterViewInit(): void {
    this.playAnimation();
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

  playAnimation() {
    let currentItemIndex = 0;
    let reverse = false;
    setInterval(() => {
      let items = this.itemsRef.nativeElement.getElementsByClassName('item-wrapper');
      const itemsCount = items.length - 1;
      if(currentItemIndex == 0 && itemsCount > 0) {
        this.mouseLeave(items[items.length - 1]);
      } else if(itemsCount > 0) {
        this.mouseLeave(items[currentItemIndex - 1]);
      }
      this.mouseEnter(items[currentItemIndex]);

      this.moveCircle(items[currentItemIndex]);
      if(currentItemIndex >= itemsCount && reverse === false) {
          currentItemIndex = 0;
          return;
      }
      if(currentItemIndex == items.length - 1 && reverse === true) {
        currentItemIndex = items.length - 1;
        return;
      }

      if(reverse == false) {
        currentItemIndex++;
      } else {
        currentItemIndex--;
      }
    }, 2000);
    
  }
  moveCircle(item: any) {
    const itemX = item.offsetLeft + (item.offsetWidth / 2) - 150;
    const itemY = item.offsetTop + (item.offsetHeight / 2) - 150;
    this.movingCircle.nativeElement.style.transform = `translate(${itemX}px,${itemY}px)`;
  }


  mouseEnter(el: any) {
    el.style.color = 'white';
    el.firstChild.style.opacity = '0.5';
  }
  mouseLeave(el: any) {
    el.style.color = '#353840';
    el.firstChild.style.opacity = '0';
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
      })
    })
  }

}
