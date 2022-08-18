import { Component, OnInit } from '@angular/core';
import { Web3AuthService } from '@app/core/crypto/web3auth/web3auth.service';

@Component({
  selector: 'totem-navigation',
  templateUrl: './totem-navigation.component.html',
  styleUrls: ['./totem-navigation.component.scss']
})
export class TotemNavigationComponent implements OnInit {

  constructor(private web3Auth: Web3AuthService) { }

  loading = false;
  avatar: undefined | string;

  ngOnInit(): void {
  }

  async web3Login() {
    this.loading = true;

    await this.web3Auth.init();
    await this.web3Auth.login();

    const userInfo: any = await this.web3Auth.getUserInfo();
    console.log(userInfo);
    const avatar = userInfo.profileImage;
    this.avatar = avatar;

    this.loading = false;
  }

}
