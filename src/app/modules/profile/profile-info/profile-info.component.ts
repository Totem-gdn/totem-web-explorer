import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';

@Component({
  selector: 'profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
  host: {
    class: 'h-full flex'
  }
})
export class ProfileInfoComponent implements OnInit {

  wallet!: string;
  user: any;

  constructor(private web3Auth: Web3AuthService,
              private router: Router) { }

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
    this.router.navigate(['/home'])
  }

}
