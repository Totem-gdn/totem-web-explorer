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
  templateUrl: './avatar-info.component.html'
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
    this.route.paramMap
      .pipe(takeUntil(this.subs))
      .subscribe((params: ParamMap) => {
        const id = params.get('id');
        if (!id) return;
        this.avatar = undefined;
        this.assetsService.updateAsset(id, 'avatar').subscribe({
          next: avatar => {
            this.avatar = avatar;
          },
          error: error => {
            this.avatar = null;
          }
        });
        // this.assetsService.avatar$
        // .pipe(takeUntil(this.subs))
        // .subscribe(avatar => {
        //     this.avatar = avatar;
        // })
      });
      this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }

  getSelectedGame() {
    return this.gamesService.selectedGame$;
  }
}
