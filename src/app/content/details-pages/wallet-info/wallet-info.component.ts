import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { UserEntity } from "@app/core/models/interfaces/user-interface.model";
import { Subscription } from "rxjs";

@Component({
    selector: 'wallet-info',
    templateUrl: './wallet-info.component.html',
    styleUrls: ['./wallet-info.component.scss'],
})

export class WalletInfoComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute,
                private router: Router) {}
    sub?: Subscription;

    notFound: boolean = false;
    user: UserEntity | null = null;

    ngOnInit() {
        this.sub = this.route.paramMap
        .subscribe((params: ParamMap) => {
            const address = params.get('address');
            console.log('address', address)
            if (!address) return;
            this.user = {wallet: address};
            console.log(this.user)
            // this.notFound = true;
            // console.log('address', address)
            // this.router.navigate(['/not-found'])
        })
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}