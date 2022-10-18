import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: 'avatar-info',
    templateUrl: './avatar-info.component.html'
})

export class AvatarInfoComponent implements OnInit, OnDestroy {

    constructor(private assetsService: AssetsService,
                private route: ActivatedRoute) {}

    avatar: any;
    subs = new Subject<void>();

    ngOnInit() {
        this.route.paramMap
        .pipe(takeUntil(this.subs))
        .subscribe((params: ParamMap) => {
            const id = params.get('id');
            if(!id) return;
            
            this.avatar = undefined;
            this.assetsService.updateAsset(id, 'avatar').subscribe(avatar => {
                console.log('avatar',avatar)
                this.avatar = avatar;
            });
            // this.assetsService.avatar$
            // .pipe(takeUntil(this.subs))
            // .subscribe(avatar => {
            //     this.avatar = avatar;
            // })
          });
    }

    ngOnDestroy(): void {
        this.subs.next();
        this.subs.complete();
    }
}