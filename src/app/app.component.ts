import { Component, OnInit } from '@angular/core';
import { Web3Service } from './core/services/crypto/web3auth/web3auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'totem-gdn';

  constructor(private web3Service: Web3Service){

  }

  async ngOnInit() {
    await this.web3Service.initAuth3();

    await this.web3Service.login();
  }
  
}
