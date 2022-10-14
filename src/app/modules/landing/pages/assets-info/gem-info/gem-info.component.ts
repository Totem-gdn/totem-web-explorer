import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: 'gem-info',
    templateUrl: './gem-info.component.html'
})

export class GemInfoComponent implements OnInit, OnDestroy {

    constructor(private assetsService: AssetsService,
        private route: ActivatedRoute) { }

    gem: any;
    subs = new Subject<void>();

    ngOnInit() {
        this.route.paramMap
            .pipe(takeUntil(this.subs))
            .subscribe((params: ParamMap) => {
                const id = params.get('id');
                if (!id) return;

                this.assetsService.updateAsset(id, 'gem').subscribe();
                this.assetsService.gem$
                    .pipe(takeUntil(this.subs))
                    .subscribe(gem => {
                        this.gem = gem;
                    })
            });
    }

    ngOnDestroy(): void {
        this.subs.next();
        this.subs.complete();
    }
}