import { AfterViewChecked, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlchemyService } from "@app/core/services/crypto/alchemy-api.service";
import { PaymentService } from "@app/core/services/crypto/payment.service";
import { ItemsService } from "@app/core/services/assets/items.service";
import { TotemItemsService } from "@app/core/services/totem-items.service";
import { BehaviorSubject, Subject, Subscription, takeUntil } from "rxjs";
import { GamesService } from "@app/core/services/assets/games.service";
import { UserAssetsService } from "@app/core/services/assets/user-assets.service";
import { TransactionsService } from "@app/core/services/crypto/transactions.service";


@Component({
    selector: 'item-info',
    templateUrl: './item-info.component.html',
    styleUrls: ['./item-info.component.scss']
})

export class ItemInfoComponent {

    constructor(private route: ActivatedRoute,
        private itemsService: TotemItemsService,
        private alchService: AlchemyService,
        private assetsService: UserAssetsService,
        private transService: TransactionsService) { }

    activeTab = 'properties';
    subs = new Subject<void>();

    item!: any;
    type!: string;
    assets = new Subject<any[]>();

    properties!: any[];
    transactionHistory!: string;


    onChangeTab(tab: string) {
        this.activeTab = tab;
    }

    ngOnInit() {
        this.queryParams();
    }

    getProperties() {
        if(this.type == 'item') this.properties = [{title: 'Type', value: '--'},{title: 'Damage', value: '--'},{title: 'Range', value: '--'},{title: 'Power', value: '--'},{title: 'Magical Power', value: '--'},{title: 'Weapon Material', value: '--'},{title: 'Primary Color', value: '--'},]
        if(this.type == 'avatar') this.properties = [{title: 'Sex', value: '--'},{title: 'Body Strength', value: '--'},{title: 'Body Type', value: '--'},{title: 'Skin Color', value: '--'},{title: 'Hair Color', value: '--'},{title: 'Eye Color', value: '--'},{title: 'Hair Style', value: '--'},{title: 'Weapon Type', value: '--'},{title: 'Weapon Material', value: '--'},{title: 'Primary Color', value: '--'},]

    }

    queryParams() {
        this.route.queryParams
            .pipe(takeUntil(this.subs))
            .subscribe(param => {
                const id = param['id'];
                const type = param['type'];
                this.type = type;

                this.assetsService.updateAsset(id, type).subscribe();
                this.getProperties();
                this.sliderItems();

                this.assetsService.currentAsset$
                    .pipe(takeUntil(this.subs))
                    .subscribe(item => {
                        console.log('item', item)
                        this.item = item;
                    })
            })
    }

    sliderItems() {
       if(this.type == 'avatar') {
        this.itemsService.getAvatars$().pipe(takeUntil(this.subs))
        .subscribe(assets => {
            this.assets.next(assets);
        })
       }
       if(this.type == 'gem') {
        this.itemsService.getGems$().pipe(takeUntil(this.subs))
        .subscribe(assets => {
            this.assets.next(assets);
        })
       }
       if(this.type == 'item') {
        this.itemsService.getItems$().pipe(takeUntil(this.subs))
        .subscribe(assets => {
            this.assets.next(assets);
        })
       }
    }

    ngOnDestroy() {
        this.subs.next();
        this.subs.complete();
    }
}
