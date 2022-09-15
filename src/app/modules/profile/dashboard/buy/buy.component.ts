import { Component, OnInit } from '@angular/core';
import { PaymentService } from '@app/core/services/crypto/payment.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  constructor(private paymentService: PaymentService,
    private web3Service: Web3AuthService) { }

  maticBalance: any = 0;
  tokenBalance: any = 0;
  assets: any[] = [];


  ngOnInit(): void {
    this.updateBalance();
    this.updateAssets();
    this.pendingTransaction();
  }

  pendingTransaction() {
    // this.web3Service.
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

  onBuyItem(address: string, amount: any) {
    this.paymentService.buyItem(address, amount).then(res => {
      this.updateBalance();
      this.updateAssets();
    })
  }

  async onGetTokens() {
    const transfer = await this.paymentService.getTokens();
      console.log('transfer', transfer);
    this.updateBalance();
    this.updateAssets();
  }

  
  updateBalance() {
    this.web3Service.getBalance().then(balance => {
      this.maticBalance = balance;
      
    });
    this.web3Service.getTokenBalance().then(balance => {
      this.tokenBalance = balance;
    })
  }

  updateAssets() {
    this.paymentService.getAssets().subscribe(assets => {
      console.log('assets: ', assets)
      this.paymentInfo(assets);
    })
  }

}
