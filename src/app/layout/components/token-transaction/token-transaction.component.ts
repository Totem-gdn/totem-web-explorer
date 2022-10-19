import { Component } from "@angular/core";
import { TokenTransactionService } from "./token-transaction.service";

@Component({
    selector: 'token-transaction',
    templateUrl: './token-transaction.component.html',
    styleUrls: ['./token-transaction.component.scss'],
})

export class TokenTransactionComponent {

    constructor(private txService: TokenTransactionService) {}
    
    showPopup = true;

    menuItems = [{value: 'USDC'}, {value: 'MATIC'}]
    // updateBalance() {
    //     this.web3Service.getBalance().then(balance => {
    //       this.maticBalance = balance;
    //       console.log(this.maticBalance);
    //     });
    //     this.web3Service.getTokenBalance().then(balance => {
    //       this.tokenBalance = balance;
    //     })
    //   }
}