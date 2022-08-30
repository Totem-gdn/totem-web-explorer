import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SidebarState } from '@app/core/models/sidebar-type-interface.model';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { SnackNotifierService } from '@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service';
import { SidenavStateService } from '@app/shared/services/sidenav-state.service';
import { SideProfileStateService } from '@app/shared/services/sideprofile-state.service';

@Component({
  selector: 'totem-profile-dropdown',
  templateUrl: './totem-profile-dropdown.component.html',
  styleUrls: ['./totem-profile-dropdown.component.scss']
})
export class TotemNavSidebarComponent implements OnInit {
  sidebarIsOpen: boolean = false;
  userData: any;
  wallet!: string;
  walletNumber!: string;

  @Output() logOutEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private sideProfileStateService: SideProfileStateService,
    private web3Auth: Web3AuthService, private router: Router, private snackNotifierService: SnackNotifierService) { }

  ngOnInit(): void {
    console.log('Sidedrop inited');

    this.sideProfileStateService.sideprofStatus.subscribe((data: boolean) => {
      this.sidebarIsOpen = data;
      console.log('OPENED');
    });

    this.getAccountInfo();
    //console.log('INIT AGAIN');

  }

  async getAccountInfo() {
    console.log('GET INFO ABOUT USER');
    const wallet = await this.web3Auth.getAccounts();
    this.userData = await this.web3Auth.getUserInfo();
    //console.log(wallet);
    this.wallet = wallet;
    this.walletNumber = wallet.slice(0, 6) + '...' + wallet.slice(-4);
    console.log(this.walletNumber);
  }

  close() {
    //console.log('CALLED');
    this.sideProfileStateService.updateState(false);
  }

  onLogout() {
    this.logOutEvent.emit(true);
  }

  notify() {
    this.snackNotifierService.open('Copied to the clipboard');
  }

}
