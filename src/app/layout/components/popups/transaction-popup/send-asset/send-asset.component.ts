import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { Subject } from "rxjs";

@Component({
    selector: 'send-asset',
    templateUrl: './send-asset.component.html',
    styleUrls: ['./send-asset.component.scss', '../transaction-popup.component.scss']
})

export class SendAssetComponent implements OnInit, OnDestroy {

    constructor(private assetsService: AssetsService) {}
    
    @Input() asset!: AssetInfo;
    subs = new Subject<void>();

    ngOnInit() {
        this.assetsService.updateAssets('avatar', 1, '');
        this.assetsService.avatars$.subscribe(avatars => {
            if(!avatars) return;
            this.asset = avatars[0];
        })
    }

    ngOnDestroy() {
        this.subs.next();
        this.subs.complete();
    }
}