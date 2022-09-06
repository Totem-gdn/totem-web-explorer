import { Component, OnInit } from '@angular/core';
import { AvatarsService } from '@app/core/services/items/avatars.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-avatars',
  templateUrl: './user-avatars.component.html',
  styleUrls: ['./user-avatars.component.scss']
})
export class UserAvatarsComponent implements OnInit {

  constructor(private avatarsService: AvatarsService,
              private web3Service: Web3AuthService) { }
  sub!: Subscription;

  avatars: any[] = []

  async ngOnInit() {
    const wallet = await this.web3Service.getAccounts();
    this.avatarsService.fetchAvatars(wallet).subscribe(avatars => {
      console.log(avatars);
      this.avatars = avatars;
    });
  }

  onLoadMore() {

  }

  ngOnDestroy () {
    this.sub?.unsubscribe();
  }

}
