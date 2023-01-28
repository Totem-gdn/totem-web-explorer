import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CARD_TYPE } from '@app/core/models/enums/card-types.enum';
import { GamesService } from '@app/core/services/assets/games.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { FavouritesService } from '@app/modules/profile/dashboard/favourites/favourites.service';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';

@Component({
  selector: 'totem-game-card',
  templateUrl: './totem-game-card.component.html',
  styleUrls: ['./totem-game-card.component.scss'],
})
export class TotemGameCardComponent {

  constructor(private router: Router,
              private favouritesService: FavouritesService,
              private web3Service: Web3AuthService,
              private messageService: SnackNotifierService,
              private gameService: GamesService) {}

  @Input() width = 'full';
  @Input() game: GameDetail | null = null;

  ngOnInit() {
    console.log('game', this.game)
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
  } */

  onNavigate() {
    const id = this.game?.id;
    this.router.navigate(['/game', id]);
  } 

}
