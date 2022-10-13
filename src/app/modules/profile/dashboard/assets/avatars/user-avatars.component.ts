import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CacheService } from '@app/core/services/cache.service';
import { AlchemyService } from '@app/core/services/crypto/alchemy-api.service';
import { ItemsService } from '@app/core/services/assets/items.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { CARD_TYPE } from '@app/core/enums/card-types.enum';
import { UserAssetsService } from '@app/core/services/assets/user-assets.service';

@Component({
  selector: 'app-user-avatars',
  templateUrl: './user-avatars.component.html',
  styleUrls: ['./user-avatars.component.scss']
})
export class UserAvatarsComponent implements OnInit {

  constructor(private web3Service: Web3AuthService,
    private alchService: AlchemyService,
    private assetsService: UserAssetsService) { }

  subs = new Subject<void>();
  avatars!: any[] | null;

  async ngOnInit() {
    // this.filters$();
    // this.fetchAvatars();
    this.getNfts();
  }


  async getNfts() {
    const wallet = await this.web3Service.getAccounts();

    this.alchService.getAssetsIds(CARD_TYPE.AVATAR, wallet).then(avatars => {
      this.avatars = avatars;
    });
  }
  // getNfts() {
  //   this.assetsService.updateAssets('avatar').subscribe();
  //   this.assetsService.avatars$
  //     .pipe(takeUntil(this.subs))
  //     .subscribe(avatars => {
  //       this.avatars = avatars;
  //     })
  // }
  // filters$() {
  //   this.itemsService.filters$.pipe(takeUntil(this.subs)).subscribe(filters => {
  //     this.fetchAvatars(filters);
  //   })
  // }

  // fetchAvatars(filters?: ItemParam[]) {
  //   this.itemsService.getAvatars$(filters).pipe(takeUntil(this.subs)).subscribe(avatars => {
  //     this.avatars = avatars;
  //   })
  // }




  // ngOnDestroy () {
  //   this.subs.next();
  //   this.subs.complete();
  // }

}
