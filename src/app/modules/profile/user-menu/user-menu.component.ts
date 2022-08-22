import { Component, OnInit } from '@angular/core';
import { Web3AuthService } from '@app/core/crypto/web3auth/web3auth.service';

@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  host: {
    class: 'h-full flex'
  }
})
export class UserMenuComponent implements OnInit {

  wallet!: string;
  user: any;

  constructor(private web3Auth: Web3AuthService) { }

  ngOnInit(): void {
    this.handleAuth();
  }

  async handleAuth() {
    const wallet = await this.web3Auth.getAccounts();
    
    const userData = await this.web3Auth.getUserInfo();
    const email = userData?.email;
    const image = userData?.profileImage;

    const user: any = {
      email: email,
      avatar: image,
      wallet: wallet
    }
    this.user = user;
    console.log('user',user);
  }

  async onLogout() {
    await this.web3Auth.logout();
  }

}
