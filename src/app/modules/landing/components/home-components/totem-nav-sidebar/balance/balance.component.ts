import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";
import { AlchemyService } from "@app/core/services/crypto/alchemy-api.service";
import { PaymentService } from "@app/core/services/crypto/payment.service";
import { TransactionsService } from "@app/core/services/crypto/transactions.service";
import { UserStateService } from "@app/core/services/user-state.service";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { SnackNotifierService } from "@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service";
import { response } from "express";
import { Subscription, take } from "rxjs";


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
    private paymentService: PaymentService,
    private transactionsService: TransactionsService,
    private alchService: AlchemyService) { }

  sub: Subscription = new Subscription;
  maticBalance: string | undefined = '0';
  tokenBalance: string | undefined = '0';
  try: number = 0;

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

  async updateBalanceAndGetMatic() {
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
  }

  getMatics() {
    this.sub.add(
      this.transactionsService.getMaticViaFaucet().pipe(take(1)).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status == 'Accepted') {
            this.snackService.open('Matic tokens has been sent, wait a few seconds');
            this.updateBalanceAndGetMatic();
          }
        },
        error: (error: any) => {
          console.log(error);
          if (error.statusCode == 403) {
            this.snackService.open('Please Login');
          }
          if (error.statusCode == 500) {
            this.snackService.open('Your authentication token has expired');
          }
          if (error.statusCode == 400) {
            this.snackService.open('You have already received Matic tokens, try again in 24 hours');
          }
        }
      }
      )
    )
  }



  async onClaim() {
    if (!this.web3Service.isLoggedIn()) {
      this.snackService.open('Please Login')
      return
    }

    const wallet = await this.web3Service.getAccounts();
    const walletAddress = wallet.toLowerCase().slice(2);

    this.web3Service.transactionsLogs().on('data', event => {

      if (event.topics[3] == `0x000000000000000000000000${walletAddress}` && event.topics[2] == '0x0000000000000000000000003a3ad312450140cca7e24d36567a2931f717884b') {
        this.updateBalance();

        this.paymentService.getTokens().then(() => {
          this.updateBalance();
          this.snackService.open('USDC balance updated');
        }).catch(() => {
          this.snackService.open('Limit exceeded, try later');
        })

        this.web3Service.transactionsLogs().unsubscribe();
      }
    });

    this.getMatics();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
