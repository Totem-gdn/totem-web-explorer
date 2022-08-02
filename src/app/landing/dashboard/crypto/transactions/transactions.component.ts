import { Component, OnInit } from '@angular/core';
import { AlchemyApiService } from '@app/core/services/crypto/alchemy-api.service';
import { PaymentService } from '@app/core/services/crypto/payment.service';
import { Web3Service } from '@app/core/services/crypto/web3auth/web3auth.service';
import { Web3Auth } from '@web3auth/web3auth';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  host: {
    class: 'h-full'
  }
})
export class TransactionsComponent implements OnInit {


  constructor(private alchemyService: AlchemyApiService,
                private web3Service: Web3Service,
                private paymentService: PaymentService) {}

    wallet!: string;
    message = false;
    transactions!: any[];
    maticBalance!: string | undefined;
    tokenBalance!: number;
    paymentInfo!: any;
    assets!: any[];

    async ngOnInit() {
        const accounts = await this.web3Service.getAccounts();

        if(!accounts) return;
        this.wallet = accounts[0];

        this.updateBalance();
        this.updateTransactionHistory();
        this.updateAssets();
        
    }

    updateAssets() {
      this.paymentService.getAssets().subscribe(assets => {
        console.log('assets: ', assets)
        this.assets = assets;
      })
    }

    async onGetTokens() {
      this.message = true;
      setTimeout(() => {
        this.message = false;
      }, 1500)

      const transfer = await this.web3Service.getTokens();
      console.log('transfer', transfer);
      this.updateTransactionHistory();
      this.updateBalance();
    }

    updateBalance() {
      this.web3Service.checkBalance().then(balance => {
        this.tokenBalance = balance;
      });
      
      this.web3Service.getBalance().then(balance => {
        this.maticBalance = balance;
      })
      
      this.updateTransactionHistory();
    }

    getPaymentInfo(asset: any) {
      this.paymentService.getPaimentInfo(asset).subscribe(payment => {
        this.paymentInfo = payment;
      })
    }

    async onSendTransaction(address: string, amount: any) {
      this.message = true;
      setTimeout(() => {
        this.message = false;
      }, 1500)

      const transaction = await this.web3Service.sendTransaction(address, amount);
      console.log('transaction', transaction);
      this.updateTransactionHistory();
      this.updateBalance();
    }


    formatTransactions(rawTransfers: any) {
      const transfers: any[] = [];
      console.log(rawTransfers);
      for(let transfer of rawTransfers) {

        // Convert hex value to decimal
        const value = transfer.rawContract.value;
        transfer.rawContract.value = parseInt(value, 16);

        transfers.push(transfer);
      }

      transfers.reverse();

      this.transactions = transfers;
    }

    updateTransactionHistory() {
      this.alchemyService.getTransactionHistory(this.wallet).then(transactions => {
        this.formatTransactions(transactions);
        console.log('transactions',transactions);
      }).catch(err => {
        console.log(err);
      });
    }

    onClickBack() {
      this.message = false;
    }

}
