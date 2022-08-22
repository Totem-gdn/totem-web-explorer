import { Component, OnInit } from '@angular/core';
import { Web3AuthService } from '@app/core/crypto/web3auth/web3auth.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  }
})
export class ProfileComponent implements OnInit {

  loading = false;

  constructor(private web3: Web3AuthService) { }

  async ngOnInit() {
    if(!this.web3.isLoggedIn()) {
      this.loading = true;
      await this.web3.init();
      await this.web3.login();
      this.loading = false;
    }
  }

}
