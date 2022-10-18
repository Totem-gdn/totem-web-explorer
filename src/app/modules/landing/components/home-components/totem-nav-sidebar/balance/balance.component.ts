import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { AlchemyService } from "@app/core/services/crypto/alchemy-api.service";
import { PaymentService } from "@app/core/services/crypto/payment.service";
import { TransactionsService } from "@app/core/services/crypto/transactions.service";
import { UserStateService } from "@app/core/services/auth.service";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { SnackNotifierService } from "@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service";
import { TransactionDialogComponent } from "@app/modules/landing/modules/transaction-dialog/transaction-dialog.component";
import { response } from "express";
import { Observable, Subscription, take } from "rxjs";
import { Gtag } from "angular-gtag";


@Component({
  selector: 'balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
  host: {
    class: 'w-full'
  }
})

export class BalanceComponent implements OnDestroy, AfterViewInit {

  constructor(private web3Service: Web3AuthService,
    private userStateService: UserStateService,
    private snackService: SnackNotifierService,
    private transactionsService: TransactionsService,
    readonly matDialog: MatDialog,
    private gtag: Gtag
    ) { }

  sub: Subscription = new Subscription;
  maticBalance: string | undefined = '0';
  tokenBalance: string | undefined = '0';
  try: number = 0;
  disableButton: boolean = false;
  maticClaimTimeout: any;

  @ViewChild('dropdown') dropdown!: ElementRef;
  @Input() mode = 'normal';
  isDropdownOpened = false;

  ngAfterViewInit() {
    if (this.mode === 'small') this.isDropdownOpened = true;
    this.toggle();
    this.sub.add(
      this.userStateService.currentUser.subscribe(user => {
        if (user) {
          this.updateBalance();
        }
      })
    )

    /* this.sub.add(
      this.web3Service.maticTransactionListener().subscribe((data: any) => {
        if (data == 'error') {
          this.disableButton = false;
          this.snackService.open('Error occurred while getting tokens, please try again');
        }
        if (data && data != 'error') {
          if (!data.status) {
            this.disableButton = false;
            this.snackService.open('Error occurred while getting tokens, please try again');
            return;
          }
          this.updateBalance();
          this.disableButton = false;
        }
      })
    )
    this.sub.add(
      this.web3Service.usdcTransactionListener().subscribe((data: any) => {
        if (data == 'error') {
          this.disableButton = false;
          this.snackService.open('Error occurred while getting tokens, please try again');
        }
        if (data && data != 'error') {
          if (!data.status) {
            this.disableButton = false;
            this.snackService.open('Error occurred while getting tokens, please try again');
            return;
          }
          this.updateBalance();
          this.snackService.open('USDC balance updated');
          this.disableButton = false;
        }
      })
    ) */
  }

  openTxDialogModal(data: any): Observable<{ matic: boolean, usdc: boolean }> {
    /* const dialogType: string = type == 'cover' || 'gallery' ? 'large-dialog' : 'small-dialog';
    const aspectRation: number = type == 'cover' ? 3.5/1 : type == 'search' ? 1/1 : type == 'gallery' ? 1.78/1 : 1.33/1; */
    const options: MatDialogConfig = {
        disableClose: true,
        panelClass: 'tx-dialog',
        backdropClass: 'blurred-backdrop',
        data: null,
        autoFocus: false
    };
    return this.matDialog.open(TransactionDialogComponent, options).afterClosed();
  }

  openTxDialog(data: any) {
    this.sub.add(
      this.openTxDialogModal(data).subscribe((data: { matic: boolean, usdc: boolean }) => {
        console.log(data);
        if (data.matic || data.usdc) {
          this.updateBalance();
          this.snackService.open('USDC balance updated');
          this.disableButton = false;
        }

      })
    )
  }

  onToggleDropdown() {
    if (this.mode != 'small') this.isDropdownOpened = !this.isDropdownOpened;
    this.toggle();
  }

  toggle() {
    if (this.isDropdownOpened) {
      this.dropdown.nativeElement.style.maxHeight = '320px';
    }
    if (!this.isDropdownOpened) {
      this.dropdown.nativeElement.style.maxHeight = '0px';
    }
  }


  updateBalance() {
    this.web3Service.getBalance().then(balance => {
      this.maticBalance = balance;
      console.log(this.maticBalance);
    });
    this.web3Service.getTokenBalance().then(balance => {
      this.tokenBalance = balance;
    })
  }

  /* async updateBalanceAndGetMatic() {
    await this.web3Service.getBalance().then(balance => {
      if (parseFloat(balance!) > parseFloat(this.maticBalance!)) {
        this.maticBalance = balance;
        this.onClaim();
      } else {
        if (this.try != 10) {
          this.try += 1;
          this.updateBalanceAndGetMatic();
        }
      }
    })
  } */

  /* startTimeout() {
    this.maticClaimTimeout = setTimeout( async () => {
      const matic = await this.web3Service.getBalance();
      if(!matic || +matic <= 0) {
          this.snackService.open('Something went wrong... Try again');
          this.web3Service.transactionsLogs().unsubscribe();
          this.disableButton = false;
          return;
      }
      this.updateBalance();
      // this.getUsdc();
      this.web3Service.transactionsLogs().unsubscribe();
      this.disableButton = false;
    }, 120000);
  }

  closeTimeout() {
      clearTimeout(this.maticClaimTimeout);
  } */

  getMatics() {

    this.sub.add(
      this.transactionsService.getMaticViaFaucet().pipe(take(1)).subscribe({
        next: (response: any) => {
          this.getUsdc(response.usdc);
          if (response.status == 'Accepted') {
            this.snackService.open('Tokens has been sent, wait a few seconds');
            this.web3Service.isReceiptedMatic(response.matic);
            setTimeout(() => {
              this.web3Service.isReceiptedUsdc(response.usdc);
            }, 400);
          }
        },
        error: (error: any) => {
          console.log(error);
          this.disableButton = false;
          if (error.error.statusCode == 403) {
            this.snackService.open('Please Login');
          }
          if (error.error.statusCode == 500) {
            this.snackService.open('Your authentication token has expired');
          }
          if (error.error.statusCode == 400) {
            this.snackService.open('You have already received tokens, try again in 24 hours');
          }
        }
      }
      )
    )
  }


  getUsdc(hash: string) {
    console.log(hash)
    this.web3Service.listenToHash(hash);
    // this.snackService.open('Claiming USDC');
    // this.paymentService.getTokens().then(() => {
    //   this.updateBalance();
    //   this.snackService.open('USDC balance updated');
    //   this.disableButton = false;
    // }).catch(() => {
    //   this.snackService.open('Limit exceeded, try later');
    //   this.disableButton = false;
    // })
  }


  /* listenTransactions(walletAddress: string) {
    this.web3Service.transactionsLogs().on('data', event => {
      //console.log('EVENT EVENT EVENT: ', event);

      if (event.topics[3] == `0x000000000000000000000000${walletAddress}` && event.topics[2] == '0x0000000000000000000000003a3ad312450140cca7e24d36567a2931f717884b') {
        console.log(event);

        //this.closeTimeout();
        this.updateBalance();
        this.web3Service.transactionsLogs().unsubscribe();
        //this.getUsdc();
        //this.web3Service.transactionsLogs().unsubscribe();
      }
      if (event.topics[3] == `0x000000000000000000000000c275dc8be39f50d12f66b6a63629c39da5bae5bd` && event.topics[2] == '0x0000000000000000000000003a3ad312450140cca7e24d36567a2931f717884b') {
        console.log('TRANSACTION', event);

        //this.closeTimeout();
        this.updateBalance();
        this.disableButton = false;
      }
    });
  } */

  async onClaim() {
    if (!this.web3Service.isLoggedIn()) {
      this.snackService.open('Please Login');
      this.gtag.event('click', {
        'event_label': 'Claim when user is not login',
      });
      return;
    }
    this.gtag.event('click', {
      'event_label': 'Claim token',
    });
    this.openTxDialog({});
    //this.disableButton = true;
    //const matic = await this.web3Service.getBalance();
    //if(!matic || +matic <= 0) {
    //this.snackService.open('Please wait, claiming tokens...');
    //const wallet = await this.web3Service.getAccounts();
    //const walletAddress = wallet.toLowerCase().slice(2);
    //this.listenTransactions(walletAddress);
    //this.getMatics();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
