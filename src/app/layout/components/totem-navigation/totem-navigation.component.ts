import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { SidenavStateService } from '@app/shared/services/sidenav-state.service';
import { SideProfileStateService } from '@app/shared/services/sideprofile-state.service';

@Component({
  selector: 'totem-navigation',
  templateUrl: './totem-navigation.component.html',
  styleUrls: ['./totem-navigation.component.scss']
})
export class TotemNavigationComponent implements OnInit {

  constructor(private web3Auth: Web3AuthService,
    private router: Router,
    private sidenavStateService: SidenavStateService,
    private sideProfileStateService: SideProfileStateService,
    ) { }

  loading = false;
  avatar: undefined | string;
  userData: any;
  wallet: string = '';

  ngOnInit(): void {
    this.tryToInitWeb3();
  }

  async tryToInitWeb3() {
    try {
      this.loading = true;
      await this.web3Auth.init();
      this.wallet = await this.web3Auth.getAccounts();
      //console.log(this.wallet);
      this.loading = false;
      console.log('INIT');

    } catch (err: any) {
      console.log(err, 'INIT ERRROR');
      this.loading = false;
    };
  }

  async web3Login() {

    if(this.web3Auth.isLoggedIn()) {
      //this.router.navigate(['/profile']);
      this.openSideProfile();
    }

    if (!this.web3Auth.isLoggedIn()) {
      try {
        this.loading = true;

        await this.web3Auth.init();
        await this.web3Auth.login();

        const userInfo: any = await this.web3Auth.getUserInfo();
        //console.log(userInfo);
        const avatar = userInfo.profileImage;
        this.avatar = avatar;
        this.loading = false;
        //this.router.navigate(['/profile']);
      } catch (err: any) {
        console.log(err, 'LOGIN ERRROR');
        this.loading = false;
      };
    }

  }

  openSidenav() {
    this.sidenavStateService.updateLoadingStatus({isOpen: true, type: 'nav'});
  }

  openSidefilter() {
    this.sidenavStateService.updateLoadingStatus({isOpen: true, type: 'filter'});
  }

  openSideProfile() {
    this.sideProfileStateService.updateState(true);
  }

}
