import { Component, OnDestroy, OnInit } from "@angular/core";
import { ASSET_PARAM_LIST } from "@app/core/models/enums/params.enum";
import { UserStateService } from "@app/core/services/auth.service";
import { ProfileService } from "@app/core/services/profile.service";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { Subject, take, takeUntil } from "rxjs";

@Component({
    selector: 'my-assets',
    templateUrl: './my-assets.component.html',
    styleUrls: ['./my-assets.component.scss'],
    host: {
        class: 'w-full'
    }
})

export class MyAssetsComponent implements OnDestroy, OnInit {

    constructor(private web3Service: Web3AuthService,
                private authService: UserStateService,
                private profileService: ProfileService) {}

    subs = new Subject<void>();

    title?: string;
    avatarsTitle: string = '';
    itemsTitle: string = '';
    list = ASSET_PARAM_LIST.LATEST;

    ownerAddress?: string;

    async ngOnInit() {

        this.authService.currentUser
        .pipe(takeUntil(this.subs))
        .subscribe(user => {
            if(user) {
                this.title = `Assets for User ${user.wallet}`

                this.profileService.getUserAssetsCount()
                    .pipe(take(1))
                    .subscribe(total => {
                        this.avatarsTitle = `You have ${total.own?.avatars.all.toString()} Avatars showing in: `
                        this.itemsTitle = `You have ${total.own?.items.all.toString()} Items showing in: `
                        this.ownerAddress = user.wallet;
                    })
            }
    })
    }

    onSort(param: ASSET_PARAM_LIST) {
        this.list = param;
    }

    ngOnDestroy(): void {
        this.subs.next();
        this.subs.complete();
    }
}