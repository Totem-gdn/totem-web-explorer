import { Component, OnInit } from '@angular/core';
import { AlchemyApiService } from '@app/core/services/crypto/alchemy-api.service';
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
                private web3Service: Web3Service) {}

    wallet!: string;
    transactions!: any[];

    async ngOnInit() {
        const accounts = await this.web3Service.getAccounts();

        if(!accounts) return;
        this.wallet = accounts[0];

        this.alchemyService.getTransactionHistory(this.wallet).then(transactions => {
          this.transactions = transactions.transfers;
          console.log(transactions.transfers);
        }).catch(err => {
          console.log(err);
        });
    }

}
