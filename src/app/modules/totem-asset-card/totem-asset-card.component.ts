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
import { StoreService } from '@app/core/store/store.service';
import { RandomIconGeneratorService } from '@app/core/services/utils/icon-generator.service';
import { UserStateService } from '@app/core/services/auth.service';
import { Observable } from 'rxjs';
import { UserEntity } from '@app/core/models/interfaces/user-interface.model';

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
              private userService: UserStateService,
              private randomIconGeneratorService: RandomIconGeneratorService,
              private storeService: StoreService) {}

  @Input() width = 'full';
  @Input() asset: AssetInfo | null = null;
  @Input() type!: ASSET_TYPE;
  showSpinner: boolean = false;
  user$: Observable<UserEntity | null> = this.userService.currentUser;

  ngOnInit() {
    if(!this.asset) return;
    this.asset.rarity = this.asset.tokenId % 100;
    this.asset.games = this.storeService.gamesAmount;
  }

  goToAsset(asset: AssetInfo) {
    this.router.navigate([`/${asset.assetType}`, asset.tokenId]);
  }

  loadDefaultRenderer() {
    if(!this.asset) return;
    let type = this.asset.assetType;
    this.asset.rendererUrl = `${environment.ASSET_RENDERER_URL}/${type}/${this.asset?.tokenId}?width=400&height=400`;
  }

  getUserIcon(wallet: string): string {
    return this.randomIconGeneratorService.getUserIcon(wallet);
  }

  navigateToProfile(address: string) {
    this.router.navigate(['/profile', address]);
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
