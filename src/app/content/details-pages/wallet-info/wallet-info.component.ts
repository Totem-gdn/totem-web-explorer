import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { UserAssetCountEntity, UserEntity } from "@app/core/models/interfaces/user-interface.model";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { CryptoUtilsService } from "@app/core/services/crypto/crypto-utils.service";
import { forkJoin, Subscription, take } from "rxjs";
import Web3 from "web3";


@Component({
    selector: 'wallet-info',
    templateUrl: './wallet-info.component.html',
    styleUrls: ['./wallet-info.component.scss'],
})

export class WalletInfoComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute,
        private router: Router,
        private web3Utils: CryptoUtilsService,
        private assetsService: AssetsService) { }
    sub?: Subscription;

    notFound: boolean = false;
    user: UserEntity | null = null;

    total?: UserAssetCountEntity;

    ngOnInit() {
        this.sub = this.route.paramMap
            .subscribe((params: ParamMap) => {
                const address = params.get('address');
                //console.log('address', address)
                if (!address) {
                    this.notFound = true;
                    return;
                } else if (!this.isEthAddress(address)) {
                    this.notFound = true;
                    return;
                }
                const slicedWallet: string = address?.slice(0, 9) + '...' + address?.slice(-4);
                this.user = { wallet: address, slicedWallet: slicedWallet };

                const obs = [];
                obs.push(this.assetsService.totalAssetsByWallet(address, 'item')
                    .pipe(take(1)))
                obs.push(this.assetsService.totalAssetsByWallet(address, 'avatar')
                    .pipe(take(1)))
                obs.push(this.assetsService.totalAssetsByWallet(address, 'gem')
                    .pipe(take(1)))

                forkJoin(obs).subscribe(res => {
                    //console.log('res', res)
                    this.total = {
                        items: {all: res[0].meta.total, rare: 0, unique: 0},
                        avatars: {all: res[1].meta.total, rare: 0, unique: 0},
                        gems: {all: res[2].meta.total, rare: 0, unique: 0},
                    }
                })
            })
    }

    isEthAddress(address: string) {
        return Web3.utils.isAddress(address);
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}
