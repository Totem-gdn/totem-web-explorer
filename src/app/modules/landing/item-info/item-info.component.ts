import { AfterViewChecked, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlchemyService } from "@app/core/services/crypto/alchemy-api.service";
import { PaymentService } from "@app/core/services/crypto/payment.service";
import { ItemsService } from "@app/core/services/assets/items.service";
import { TotemItemsService } from "@app/core/services/totem-items.service";
import { BehaviorSubject, Subject, Subscription, takeUntil } from "rxjs";
import { GamesService } from "@app/core/services/assets/games.service";
import { AssetsService } from "@app/core/services/assets/assets.service";


@Component({
    selector: 'item-info',
    templateUrl: './item-info.component.html',
    styleUrls: ['./item-info.component.scss']
})

export class ItemInfoComponent {

    constructor(private route: ActivatedRoute,
                private itemsService: TotemItemsService,
                private gamesService: GamesService,
                private assetsService: AssetsService) { }

    activeTab = 'properties';
    subs = new Subject<void>();

    item!: any;
    type!: string;
    items = new Subject<any[]>();
    transactionHistory!: string;


    onChangeTab(tab: string) {
        this.activeTab = tab;
    }

    ngOnInit() {
        this.queryParams();
        this.sliderItems();
        // this.sub = this.route.queryParams.subscribe(params => {
        //     const address = params['address'];
        //     if(address) {
        //         this.alchService.getNftMetadata(address).then(meta => {
        //             this.nftMeta = meta;
        //             console.log(meta);
        //             this.alchService.getTransactionHistory(meta.contract.address).then(transactions => {
        //                 console.log(meta.contract.address)
        //                 console.log(transactions);
        //             })
        //             this.wallet = '0x9a4A58D9C4bB6999C93fdb330bEAF32b1BfECbA3';
        //         })
        //     }
        // })

        // this.paymentService.getPaymentHistory().subscribe(paymentHistory => {
        //     console.log(paymentHistory);
        // })

    }

    queryParams() {
        this.route.queryParams
        .pipe(takeUntil(this.subs))
        .subscribe(param => {
            const id = param['id'];
            const type = param['type'];

            this.type = type;

            if (id) {
                this.assetsService.updateAsset(id, type).subscribe();
                this.assetsService.asset$
                .pipe(takeUntil(this.subs))
                .subscribe(item => {
                    console.log('item', item)
                    this.item = item;
                })
            }

        })
    }
    sliderItems() {
        this.itemsService.getItems$().pipe(takeUntil(this.subs))
        .subscribe(items => {
            this.items.next(items);
        })
    }

    ngOnDestroy() {
        this.subs.next();
        this.subs.complete();
    }
}
