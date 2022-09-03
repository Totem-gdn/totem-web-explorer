import { Component } from "@angular/core";
import { AlchemyService } from "@app/core/services/crypto/alchemy-api.service";


@Component({
    selector: 'item-info',
    templateUrl: './item-info.component.html',
    styleUrls: ['./item-info.component.scss']
})

export class ItemInfoComponent {

    constructor(private alchService: AlchemyService) {}

    activeTab = 'properties';
    nfts: any[] = [];

    onChangeTab(tab: string) {
        this.activeTab = tab;
    }

    ngOnInit() {
        this.alchService.getNft('0x9a4A58D9C4bB6999C93fdb330bEAF32b1BfECbA3').then(nfts => {
            console.log(nfts);
            this.nfts = nfts.ownedNfts;
        })
    }
}