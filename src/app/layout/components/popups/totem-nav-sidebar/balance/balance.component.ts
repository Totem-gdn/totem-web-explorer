import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { Animations } from "@app/core/animations/animations";
import { UserStateService } from "@app/core/services/auth.service";
import { TransactionsService } from "@app/core/services/crypto/transactions.service";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { PopupService } from "@app/core/services/states/popup-state.service";
import { TransactionDialogComponent } from "@app/layout/components/popups/dialogs/transaction-dialog/transaction-dialog.component";
import { Gtag } from "angular-gtag";
import { Observable, Subscription, take } from "rxjs";
import { CryptoUtilsService } from "@app/core/services/crypto/crypto-utils.service";


@Component({
  selector: 'balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
  host: {
    class: 'w-full'
  },
  animations: Animations.animations
})

export class BalanceComponent implements OnDestroy, AfterViewInit {

  sub: Subscription = new Subscription;
  maticBalance: string | undefined = '0';
  tokenBalance: string | undefined = '0';
  try: number = 0;
  disableButton: boolean = false;
  maticClaimTimeout: any;
  balanceFlag: boolean = false;
  balanceInterval: any;

  @ViewChild('dropdown') dropdown!: ElementRef;
  @Input() mode = 'normal';
  isDropdownOpened = false;

  constructor(private web3Service: Web3AuthService,
    private userStateService: UserStateService,
    private snackService: SnackNotifierService,
    private transactionsService: TransactionsService,
    private sendTokensPopup: PopupService,
    private cryptoUtilsService: CryptoUtilsService,
    readonly matDialog: MatDialog,
    private gtag: Gtag
    ) { }



  ngOnInit(): void {
    this.balance$();
  }

  ngAfterViewInit() {
    this.toggle();
    this.sub.add(
      this.userStateService.currentUser.subscribe(user => {
        if (user) {
          this.updateBalance();
        }
      })
    )

    this.balanceInterval = setInterval(()=>{
      this.balanceFlag = !this.balanceFlag;
    }, 3400)

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

  balance$() {
    this.cryptoUtilsService.tokenBalance$.subscribe(balance => {
      this.maticBalance = balance.matic;
      this.tokenBalance = balance.usdc;
    })
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
        if (data.matic || data.usdc) {
          this.updateBalance();
          this.snackService.open('USDC balance updated');
          this.disableButton = false;
        }

      })
    )
  }

  onToggleDropdown() {
    /* if (this.mode != 'small')  */
    this.isDropdownOpened = !this.isDropdownOpened;
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
    this.cryptoUtilsService.updateBalance();
  }

  getMatics() {
    this.sub.add(
      this.transactionsService.getMaticViaFaucet().pipe(take(1)).subscribe({
        next: (response: any) => {
          if (response.status == 'Accepted') {
            this.snackService.open('Tokens has been sent, wait a few seconds');
            this.web3Service.isReceiptedMatic(response.matic);
            setTimeout(() => {
              this.web3Service.isReceiptedUsdc(response.usdc);
            }, 400);
          }
        },
        error: (error: any) => {
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

  onSend() {
    this.sendTokensPopup.showTokenTransaction();
  }

  async onClaim() {
    if (!this.web3Service.isLoggedIn()) {
      this.snackService.open('Please Login');
      this.gtag.event('token_claim', {
        'event_label': 'Claim when user is not login',
      });
      return;
    }
    this.gtag.event('token_claim', {
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
    clearInterval(this.balanceInterval);
    this.sub?.unsubscribe();
  }

}
