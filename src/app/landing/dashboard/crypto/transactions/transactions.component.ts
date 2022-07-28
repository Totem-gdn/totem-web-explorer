import { Component, OnInit } from '@angular/core';
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

  constructor(private web3Auth: Web3Auth) { }

  ngOnInit(): void {
  }

}
