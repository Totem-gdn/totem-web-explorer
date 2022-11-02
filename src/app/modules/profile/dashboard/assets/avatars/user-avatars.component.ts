import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { AssetsService } from '@app/core/services/assets/assets.service';

@Component({
  selector: 'app-user-avatars',
  templateUrl: './user-avatars.component.html',
  styleUrls: ['./user-avatars.component.scss'],
  // host: {
  //   class: 'pb-[60px]'
  // }
})
export class UserAvatarsComponent implements OnInit, OnDestroy {

  constructor(private web3Service: Web3AuthService,
    private assetsService: AssetsService) { }

  subs = new Subject<void>();
  avatars!: any[] | null;

  async ngOnInit() {
    this.updateAssets();
  }

  updateAssets() {
    this.assetsService.updateAssets('avatar', 1, 'my').subscribe();
    this.assetsService.avatars$
      .pipe(takeUntil(this.subs))
      .subscribe(avatars => {
        this.avatars = avatars;
      })
  }

  onLoadMore(page: number) {
    this.assetsService.updateAssets('avatar', page, 'my').subscribe();
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
    this.assetsService.reset();
  }
}
