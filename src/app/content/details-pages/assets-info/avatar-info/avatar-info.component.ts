import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { GamesService } from "@app/core/services/assets/games.service";
import { Gtag } from "angular-gtag";
import { Subject, takeUntil } from "rxjs";
import { ChangeDetectorRef } from "@angular/core";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";

@Component({
  selector: 'avatar-info',
  templateUrl: './avatar-info.component.html',
  host: {
    class: 'ml-auto mr-auto w-full'
  }
})

export class AvatarInfoComponent implements AfterViewInit, OnDestroy {
  assetType: typeof ASSET_TYPE = ASSET_TYPE;

  constructor(
    private assetsService: AssetsService,
    private route: ActivatedRoute,
    private gamesService: GamesService,
    private gtag: Gtag,
    private changeDetector: ChangeDetectorRef
  ) {
    this.gtag.event('page_view');
  }

  avatar: any;
  subs = new Subject<void>();

  ngAfterViewInit() {
    this.routerParams$();
  }

  routerParams$() {
    this.route.paramMap
      .pipe(takeUntil(this.subs))
      .subscribe((params: ParamMap) => {
        const id = params.get('id');
        if (!id) return;
        this.avatar = undefined;
        this.assetsService.fetchAsset(id, ASSET_TYPE.AVATAR).subscribe({
          next: avatar => {
            this.avatar = avatar;
          },
          error: error => {
            this.avatar = null;
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }

  getSelectedGame() {
    return this.gamesService.gameInSession;
  }
}
