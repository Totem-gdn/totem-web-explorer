import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CARD_TYPE } from '@app/core/models/enums/card-types.enum';
import { GamesService } from '@app/core/services/assets/games.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { FavouritesService } from '@app/modules/profile/dashboard/favourites/favourites.service';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { environment } from '@env/environment';

@Component({
  selector: 'totem-asset-card',
  templateUrl: './totem-asset-card.component.html',
  styleUrls: ['./totem-asset-card.component.scss'],
  host: {
    class: 'shrink-0'
  }
})
export class TotemAssetCardComponent {

  constructor(private router: Router,
              private favouritesService: FavouritesService,
              private web3Service: Web3AuthService,
              private messageService: SnackNotifierService,
              private gameService: GamesService) {}

  @Input() width = 'full';
  @Input() asset: AssetInfo | null = null;
  @Input() type!: ASSET_TYPE;
  showSpinner: boolean = false;

  ngOnInit() {
    if(!this.asset) return;
    this.asset.rarity = this.asset.tokenId % 100;
  }

  goToAsset(asset: AssetInfo) {
    console.log('asset', asset)
    this.router.navigate([`/${asset.assetType}`, asset.id]);
  }

  loadDefaultRenderer() {
    if(!this.asset) return;
    let type = this.asset.assetType;
    this.asset.rendererUrl = `${environment.ASSET_RENDERER_URL}/${type}/${this.asset?.tokenId}?width=400&height=400`;
  }

  /* onClickLike() {
    if(!this.web3Service.isLoggedIn()) {
      this.messageService.open('Unauthorized');
      return;
    }
    if (!this.game) return;
    this.game.isLiked = !this.game.isLiked;
    if (this.game.isLiked) {
      this.favouritesService.addLike(CARD_TYPE.GAME, this.game.id!).subscribe();
      this.gameService.fetchGame(this.game.id!).subscribe(game => {
        this.game = game;
      });
    } else {
      this.favouritesService.removeLike(CARD_TYPE.GAME, this.game.id).subscribe(game => {
        this.game = game;
      });
      this.gameService.fetchGame(this.game.id).subscribe();
    }
  }

  onNavigate() {
    const id = this.game?.id;
    this.router.navigate(['/game', id]);
  } */

}
