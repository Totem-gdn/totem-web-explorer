import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { SnackNotifierService } from "@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service";
import { FavouritesService } from "@app/modules/profile/dashboard/favourites/favourites.service";
import { environment } from "@env/environment";
import { Gtag } from "angular-gtag";
const { DNAParser } = require('totem-dna-parser');

@Component({
  selector: 'asset-card[type]',
  templateUrl: './asset-card.component.html',
  styleUrls: ['../cards.component.scss']
})

export class AssetCardComponent {

  constructor(private router: Router,
    private web3Service: Web3AuthService,
    private messageService: SnackNotifierService,
    private favService: FavouritesService,
    private gtag: Gtag) { }

  @Input() set asset(asset: any) {
    this._asset = asset;
    if(!asset) return;
    const parser = new DNAParser()
    asset.rarity = parser.getItemRarity(asset?.tokenId)
  };
  @Input() type: string = 'item';
  @Input() set selectedGame(game: any) {
    if(!game) return;
    if (game?.assetRenderer) {
      this.assetRendererUrl = game?.assetRenderer;
    }
  }
  _asset: any;
  assetRendererUrl = environment.ASSET_RENDERER_URL;
  onLike() {
    if (!this.web3Service.isLoggedIn()) {
      this.messageService.open('Unauthorized');
      return;
    }
    if (!this.type) return;
    this._asset.isLiked = !this._asset.isLiked;
    if (this._asset.isLiked) {
      this.favService.addLike(this.type, this._asset.id).subscribe(() => {
        this.gtag.event('add like', {
          'event_label': `add like for ${this.type} with id ${this._asset.id}`,
        });
      });
    } else {
      this.favService.removeLike(this.type, this._asset.id).subscribe(() => {
        this.gtag.event('remove like', {
          'event_label': `remove like for ${this.type} with id ${this._asset.id}`,
        });
      });
    }
  }

  onNavigate() {
    const id = this._asset?.tokenId;
    this.router.navigate([`/${this.type}`, id]);
  }
}
