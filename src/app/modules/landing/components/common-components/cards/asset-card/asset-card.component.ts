import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { SnackNotifierService } from "@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service";
import { FavouritesService } from "@app/modules/profile/dashboard/favourites/favourites.service";


@Component({
    selector: 'asset-card[type]',
    templateUrl: './asset-card.component.html',
    styleUrls: ['../cards.component.scss']
})

export class AssetCardComponent {

    constructor(private router: Router,
                private web3Service: Web3AuthService,
                private messageService: SnackNotifierService,
                private favService: FavouritesService) {}

    @Input() asset: any;
    @Input() type: 'avatar' | 'gem' | 'item' = 'item';

    onLike() {
        if(!this.web3Service.isLoggedIn()) {
            this.messageService.open('Unauthorized');
            return;
          }
        if(!this.type) return;

          this.asset.isLiked = !this.asset.isLiked;
          if (this.asset.isLiked) {
            this.favService.addLike(this.type, this.asset.id);
          } else {
            this.favService.removeLike(this.type, this.asset.id);
          }
    }

    onNavigate() {
        const id = this.asset?.id || this.asset?.id?.tokenId;
        this.router.navigate(['/item-info'], {queryParams: { id: id, type: this.type }});
    }
}