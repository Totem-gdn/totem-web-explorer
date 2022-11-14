import { AfterViewInit, ChangeDetectorRef, Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { FavouritesService } from "@app/modules/profile/dashboard/favourites/favourites.service";
import { environment } from "@env/environment";
import { Gtag } from "angular-gtag";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";

@Component({
  selector: 'asset-card[type]',
  templateUrl: './asset-card.component.html',
  styleUrls: ['../cards.component.scss']
})

export class AssetCardComponent implements AfterViewInit {

  constructor(private router: Router,
    private web3Service: Web3AuthService,
    private messageService: SnackNotifierService,
    private favService: FavouritesService,
    private gtag: Gtag,
    private changeDetector: ChangeDetectorRef) { }

  @Input() type: string = 'item';
  @Input() set asset(asset: AssetInfo) {
    if(!asset) return;
    this._asset = asset;
    if(!asset.rendererUrl) this.updateUrl();
  };

  @Input() customBackground: string | null = null;
  @Input() set selectedGame(game: GameDetail | null) {
    if(!game) return;
    if (game?.connections?.assetRenderer && this.type == 'avatar' && this._asset) {
      this.setRendererUrl(game?.connections.assetRenderer);
    } else if(this._asset) {
      this.setRendererUrl(environment.ASSET_RENDERER_URL);
    }
  }
  _asset: any;

  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }

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

  setRendererUrl(rendererUrl: string) {
    if(!rendererUrl && !this._asset) return;
    this._asset.rendererUrl = `${rendererUrl}/${this.type}/${this._asset?.tokenId}?width=400&height=400`;
  }

  onNavigate() {
    const id = this._asset?.tokenId;
    this.router.navigate([`/${this.type}`, id]);
  }

  updateUrl() {
    this.setRendererUrl(environment.ASSET_RENDERER_URL);
  }
}
