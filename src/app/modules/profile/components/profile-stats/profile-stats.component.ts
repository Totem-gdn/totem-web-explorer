import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlchemyService } from '@app/core/services/crypto/alchemy-api.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';

@Component({
  selector: 'totem-profile-stats',
  templateUrl: './profile-stats.component.html',
  styleUrls: ['./profile-stats.component.scss'],
  host: {
    class: 'flex'
  }
})
export class ProfileStatsComponent implements OnInit {

  constructor(private router: Router,
              private alchService: AlchemyService,
              private web3: Web3AuthService) { }

  totalItems = 0;

  async ngOnInit() {
    const wallet = await this.web3.getAccounts();
    this.alchService.totalUserItems(wallet).subscribe(totalItems => {
      this.totalItems = totalItems;
    })
  }

}
