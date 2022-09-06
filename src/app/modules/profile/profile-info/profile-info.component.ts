import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { SnackNotifierService } from '@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service';

@Component({
  selector: 'profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
  host: {
    class: 'flex'
  }
})
export class ProfileInfoComponent implements OnInit {

  wallet!: string;
  user: any;

  constructor(private web3Auth: Web3AuthService,
              private router: Router,
              private snackNotifierService: SnackNotifierService) { }

  ngOnInit(): void {
    this.handleAuth();
  }


  async handleAuth() {
    const wallet = await this.web3Auth.getAccounts();

    const userData = await this.web3Auth.getUserInfo();
    const email = userData?.email;
    const image = userData?.profileImage;
    const name = userData?.name;

    const user: any = {
      name: name,
      email: email,
      avatar: image,
      wallet: wallet.slice(0, 6) + '...' + wallet.slice(-4)
    }
    this.user = user;
    console.log('user',user);
  }

  async onLogout() {
    await this.web3Auth.logout();
    this.router.navigate(['/home'])
  }

  notify() {
    this.snackNotifierService.open('Copied to the clipboard');
  }

}
