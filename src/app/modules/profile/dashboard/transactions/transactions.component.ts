import { Component, OnInit } from '@angular/core';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';

@Component({
  selector: 'transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  constructor(private web3Service: Web3AuthService) { }

  transactions: any[] | undefined;

  async ngOnInit() {
    const wallet = await this.web3Service.getAccounts();
  }

}
