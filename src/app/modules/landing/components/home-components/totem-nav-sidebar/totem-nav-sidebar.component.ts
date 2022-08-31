import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SidebarState } from '@app/core/models/sidebar-type-interface.model';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { SnackNotifierService } from '@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service';
import { SidenavStateService } from '@app/shared/services/sidenav-state.service';

@Component({
  selector: 'totem-nav-sidebar',
  templateUrl: './totem-nav-sidebar.component.html',
  styleUrls: ['./totem-nav-sidebar.component.scss']
})
export class TotemNavSidebarComponent implements OnInit {
  sidebarIsOpen: boolean = false;
  sidebarType: 'nav' | 'filter' = 'nav';
  userData: any;
  wallet: string = '';
  walletNumber: string = '';

  @Input() loggedIn: boolean = false;
  @Output() logInEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private sidenavStateService: SidenavStateService,
    private web3Auth: Web3AuthService,
    private snackNotifierService: SnackNotifierService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('openlogin_store')!);
    //console.log(this.userData);

    this.sidenavStateService.sidenavStatus.subscribe((data: SidebarState) => {
      this.sidebarIsOpen = data.isOpen;
      this.sidebarType = data.type!;
    });

    this.getAccountInfo();
  }

  async getAccountInfo() {
    //console.log('GET INFO ABOUT USER');
    if (this.loggedIn) {
      const wallet = await this.web3Auth.getAccounts();
      console.log('WALLET');
      this.userData = await this.web3Auth.getUserInfo();
      console.log('USER DATA');
      this.wallet = wallet;
      this.walletNumber = wallet.slice(0, 6) + '...' + wallet.slice(-4);
      console.log(this.walletNumber);
    }
  }

  async logIn() {
    await this.web3Auth.login();
    this.close();
    this.logInEvent.emit(true);
  }

  notify() {
    this.snackNotifierService.open('Copied to the clipboard');
  }

  close() {
    console.log('CALLED');
    this.sidenavStateService.updateLoadingStatus({isOpen: false, type: this.sidebarType});
  }

}
