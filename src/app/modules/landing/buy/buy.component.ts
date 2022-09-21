import { Component, ElementRef, OnInit } from '@angular/core';
import { PaymentService } from '@app/core/services/crypto/payment.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { forkJoin } from 'rxjs';
import { SnackNotifierService } from '../modules/snack-bar-notifier/snack-bar-notifier.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  constructor(private paymentService: PaymentService,
              private web3Service: Web3AuthService,
              private snackService: SnackNotifierService) { }

  maticBalance: any = 0;
  tokenBalance: any = 0;
  assets: any[] = [];

  disableButton: boolean | null = null;

  ngOnInit(): void {
    this.updateAssets();
  }

  async onBuyItem(address: string, amount: any) {

    if(!this.web3Service.isLoggedIn()) {
      this.snackService.open('PLEASE Login');
      return;
    }

    const matic = await this.web3Service.getBalance();
    const usdc = await this.web3Service.getTokenBalance();

    if(!matic || +matic <= 0) {
      this.snackService.open('Insufficient MATIC balance');
      return;
    }
    if(!usdc || +usdc <= 0) {
      this.snackService.open('Insufficient USDC balance');
      return;
    }
    this.snackService.open('Your payment has been send');
    this.paymentService.buyItem(address, amount).then(res => {
      this.snackService.open('Your Totem Asset has been created successfully');
    })
  }

  mouseEnter(el: any) {
    el.style.color = '#FFD011';
  }
  mouseLeave(el: any) {
    el.style.color = '#2A2D33';
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
