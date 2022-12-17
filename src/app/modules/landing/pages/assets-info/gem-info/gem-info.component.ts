import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { GamesService } from "@app/core/services/assets/games.service";
import { Gtag } from "angular-gtag";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: 'gem-info',
    templateUrl: './gem-info.component.html'
})

export class GemInfoComponent implements OnInit, OnDestroy {
    assetType: typeof ASSET_TYPE = ASSET_TYPE;

    constructor(private assetsService: AssetsService,
        private route: ActivatedRoute,
        private gamesService: GamesService,
        private gtag: Gtag
    ) {
        this.gtag.event('page_view');
    }

    gem: any;
    subs = new Subject<void>();

    ngOnInit() {
        this.route.paramMap
            .pipe(takeUntil(this.subs))
            .subscribe((params: ParamMap) => {
                const id = params.get('id');
                if (!id) return;

                this.gem = undefined;
                this.assetsService.fetchAsset(id, ASSET_TYPE.GEM).subscribe({
                    next: gem => {
                        this.gem = gem;
                    },
                    error: error => {
                        this.gem = null;
                    }
                });

            });
    }

    ngOnDestroy(): void {
        this.subs.next();
        this.subs.complete();
    }

    getSelectedGame() {
        return this.gamesService.selectedGame$;
    }
}
