import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: 'item-info',
    templateUrl: './item-info.component.html'
})

export class ItemInfoComponent implements OnInit, OnDestroy {

    constructor(private assetsService: AssetsService,
        private route: ActivatedRoute) { }

    item: any;
    subs = new Subject<void>();

    ngOnInit() {
        this.route.paramMap
            .pipe(takeUntil(this.subs))
            .subscribe((params: ParamMap) => {
                const id = params.get('id');
                if (!id) return;

                this.assetsService.updateAsset(id, 'item').subscribe();
                this.assetsService.item$
                    .pipe(takeUntil(this.subs))
                    .subscribe(item => {
                        this.item = item;
                    })
            });
    }

    ngOnDestroy(): void {
        this.subs.next();
        this.subs.complete();
    }
}