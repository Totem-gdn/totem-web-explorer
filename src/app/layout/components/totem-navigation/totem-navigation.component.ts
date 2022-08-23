import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';

@Component({
  selector: 'totem-navigation',
  templateUrl: './totem-navigation.component.html',
  styleUrls: ['./totem-navigation.component.scss']
})
export class TotemNavigationComponent implements OnInit {

  constructor(private web3Auth: Web3AuthService,
    private router: Router) { }

  loading = false;
  avatar: undefined | string;

  ngOnInit(): void {
  }

  async web3Login() {
    if (!this.web3Auth.isLoggedIn()) {
      this.loading = true;

      await this.web3Auth.init();
      await this.web3Auth.login();

      const userInfo: any = await this.web3Auth.getUserInfo();
      console.log(userInfo);
      const avatar = userInfo.profileImage;
      this.avatar = avatar;
      this.loading = false;
      this.router.navigate(['/profile']);
    }

    if(this.web3Auth.isLoggedIn()) {
      this.router.navigate(['/profile']);
    }

  }

}
