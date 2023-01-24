import { AfterViewInit, ChangeDetectorRef, Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { FavouritesService } from "@app/modules/profile/dashboard/favourites/favourites.service";
import { environment } from "@env/environment";
import { Gtag } from "angular-gtag";

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
    if (!asset) return;
    this._asset = asset;
    this._asset.rarity = asset.tokenId % 100;
    if (!asset.rendererUrl) this.updateUrl();
  };

  @Input() customBackground: string | null = null;
  @Input() set selectedGame(game: GameDetail | null) {
    if (!game) return;
    if (game?.connections?.assetRenderer && this._asset && (this.type == 'avatar' || this.type == 'item')) {
      this.setRendererUrl(game?.connections.assetRenderer);
    } else if (this._asset) {
      this.setRendererUrl(environment.ASSET_RENDERER_URL);
    }
  }

  _asset!: AssetInfo;
  showSpinner: boolean = false;

  ngAfterViewInit() {
    this.changeDetector.detectChanges();
  }

  onLike() {
    if (!this.web3Service.isLoggedIn()) {
      this.web3Service.login();
      return;
    }
    if (!this.type) return;

    if (!this._asset.isLiked) {
      this.favService.addLike(this.type, this._asset.id).subscribe({
        next: () => {
          this.gtag.event('add_like', {
            'event_label': `add like for ${this.type} with id ${this._asset.id}`,
          });
          this._asset.isLiked = true;
        },
        error: error => {
          console.log(error)
          this.messageService.open('Error');
        }
      });
    } else {
      this.favService.removeLike(this.type, this._asset.id).subscribe({
        next: () => {
          this.gtag.event('remove_like', {
            'event_label': `remove like for ${this.type} with id ${this._asset.id}`,
          });
          this._asset.isLiked = false;
        },
        error: error => {
          console.log(error)
          this.messageService.open('Error')
        }
      });
    }
  }

  setRendererUrl(rendererUrl: string) {
    if (!rendererUrl && !this._asset) return;
    const rendererUrlChecked = rendererUrl.slice(-1) === '/' ? rendererUrl.slice(0, -1) : rendererUrl;
    this._asset.rendererUrl = `${rendererUrlChecked}/${this.type}/${this._asset?.tokenId}?width=400&height=400`;
  }

  onNavigate() {
    const id = this._asset?.tokenId;
    this.router.navigate([`/${this.type}`, id]);
  }

  updateUrl() {
    this.setRendererUrl(environment.ASSET_RENDERER_URL);
  }
}
