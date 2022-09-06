import { AfterViewChecked, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AlchemyService } from "@app/core/services/crypto/alchemy-api.service";
import { PaymentService } from "@app/core/services/crypto/payment.service";
import { Subscription } from "rxjs";


@Component({
    selector: 'item-info',
    templateUrl: './item-info.component.html',
    styleUrls: ['./item-info.component.scss']
})

export class ItemInfoComponent {

    constructor(private alchService: AlchemyService,
                private route: ActivatedRoute,
                private paymentService: PaymentService) {}

    activeTab = 'legacy';
    sub!: Subscription;

    nftMeta: any;
    wallet!: string;
    transactionHistory!: string;

    nfts: any[] = [];
    items: any[] = [0,0,0,0,0]

    onChangeTab(tab: string) {
        this.activeTab = tab;
    }

    ngOnInit() {

        this.sub = this.route.queryParams.subscribe(params => {
            const address = params['address'];
            if(address) {
                this.alchService.getNftMetadata(address).then(meta => {
                    this.nftMeta = meta;
                    console.log(meta);
                    this.alchService.getTransactionHistory(meta.contract.address).then(transactions => {
                        console.log(meta.contract.address)
                        console.log(transactions);
                    })
                    this.wallet = '0x9a4A58D9C4bB6999C93fdb330bEAF32b1BfECbA3';
                })
            }
        })

        // this.paymentService.getPaymentHistory().subscribe(paymentHistory => {
        //     console.log(paymentHistory);
        // })

    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }
}