import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { GamesService } from "@app/core/services/assets/games.service";
import { Gtag } from "angular-gtag";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: 'item-info',
    templateUrl: './item-info.component.html'
})

export class ItemInfoComponent implements AfterViewInit, OnDestroy {
    assetType: typeof ASSET_TYPE = ASSET_TYPE;

    constructor(private assetsService: AssetsService,
        private route: ActivatedRoute,
        private gamesService: GamesService,
        private gtag: Gtag,
        private changeDetector: ChangeDetectorRef
    ) {
        this.gtag.event('page_view');
    }

    item: any;
    subs = new Subject<void>();

    ngAfterViewInit() {
        this.route.paramMap
            .pipe(takeUntil(this.subs))
            .subscribe((params: ParamMap) => {
                const id = params.get('id');
                if (!id) return;
                this.item = undefined;
                this.assetsService.fetchAsset(id, ASSET_TYPE.ITEM).subscribe({
                    next: item => {
                        this.item = item;
                    },
                    error: () => {
                        this.item = null;
                    }
                });
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
