import { AfterViewChecked, Component, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlchemyService } from "@app/core/services/crypto/alchemy-api.service";
import { PaymentService } from "@app/core/services/crypto/payment.service";
import { TotemItemsService } from "@app/core/services/totem-items.service";
import { BehaviorSubject, Subject, Subscription, takeUntil } from "rxjs";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
const DNA = require('dna-parser');
// import * as DNA from 'dna-parser'


@Component({
    selector: 'asset-info',
    templateUrl: './asset-info.component.html',
    styleUrls: ['./asset-info.component.scss']
})

export class AssetInfoComponent {

    constructor(private route: ActivatedRoute,
        private itemsService: TotemItemsService,
        private alchService: AlchemyService,
        private web3: Web3AuthService) { }

    activeTab = 'properties';
    subs = new Subject<void>();

    @Input() item!: any;
    @Input() type!: string;
    assets!: any[];

    properties!: any[];
    transactionHistory!: string;


    onChangeTab(tab: string) {
        this.activeTab = tab;
    }

    ngOnInit() {

        // const item = new DNA().getDefaultFilter('item')
        // console.log('item: ', item)
        // const avatar = new DNA().getDefaultFilter('avatar')
        // console.log('avatar: ', avatar)
        // const gem = new DNA().getDefaultFilter('gem')
        // console.log('gem: ', gem)


        this.sliderItems();
        this.alchService.tokenTransactionsById(this.item?.tokenId);

        if (this.type == 'item') this.properties = [{ title: 'Type', value: '--', tooltip: false }, { title: 'Damage', value: '--', tooltip: false }, { title: 'Range', value: '--', tooltip: false }, { title: 'Power', value: '--', tooltip: false }, { title: 'Magical Power', value: '--', tooltip: false }, { title: 'Weapon Material', value: '--', tooltip: false }, { title: 'Primary Color', value: '--', tooltip: false },]
        if (this.type == 'gem') this.properties = [{ title: 'Type', value: '--', tooltip: false }, { title: 'Damage', value: '--', tooltip: false }, { title: 'Range', value: '--', tooltip: false }, { title: 'Power', value: '--', tooltip: false }, { title: 'Magical Power', value: '--', tooltip: false }, { title: 'Weapon Material', value: '--', tooltip: false }, { title: 'Primary Color', value: '--', tooltip: false },]
        if (this.type == 'avatar') this.properties = [{ title: 'Sex', value: '--', tooltip: false }, { title: 'Body Strength', value: '--', tooltip: false }, { title: 'Body Type', value: '--', tooltip: false }, { title: 'Skin Color', value: '--', tooltip: false }, { title: 'Hair Color', value: '--', tooltip: false }, { title: 'Eye Color', value: '--', tooltip: false }, { title: 'Hair Style', value: '--', tooltip: false }, { title: 'Weapon Type', value: '--', tooltip: false }, { title: 'Weapon Material', value: '--', tooltip: false }, { title: 'Primary Color', value: '--', tooltip: false },]
    }


    sliderItems() {
        if (this.type == 'avatar') {
            this.itemsService.getAvatars$().pipe(takeUntil(this.subs))
                .subscribe(assets => {
                    this.assets = assets;
                })
        }
        if (this.type == 'gem') {
            this.itemsService.getGems$().pipe(takeUntil(this.subs))
                .subscribe(assets => {
                    this.assets = assets;
                })
        }
        if (this.type == 'item') {
            this.itemsService.getItems$().pipe(takeUntil(this.subs))
                .subscribe(assets => {
                    this.assets = assets;
                })
        }
    }

    ngOnDestroy() {
        this.subs.next();
        this.subs.complete();
    }
}
