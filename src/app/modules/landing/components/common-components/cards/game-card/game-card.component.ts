import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CARD_TYPE } from '@app/core/enums/card-types.enum';
import { StorageKey } from '@app/core/enums/storage-keys.enum';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { SnackNotifierService } from '@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service';
import { FavouritesService } from '@app/modules/profile/dashboard/favourites/favourites.service';

@Component({
  selector: 'game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['../cards.component.scss'],
  // styles: ['img {object-fit: cover !important;}'],
})
export class GameCardComponent {

  constructor(private router: Router,
              private favouritesService: FavouritesService,
              private web3Service: Web3AuthService,
              private messageService: SnackNotifierService) {}

  @Input() width = 'full';
  @Input() game: any;

  onClickLike() {
    if(!this.web3Service.isLoggedIn()) {
      this.messageService.open('Unauthorized');
      return;
    }
    if (this.game.isLiked) {
      this.favouritesService.addLike(CARD_TYPE.GAME, this.game.id);
    } else {
      this.favouritesService.removeLike(CARD_TYPE.GAME, this.game.id);
    }
  }

  check() {
    console.log('IMAGE ERRRORRORORED', event);

  }

  onNavigate() {
    const id = this.game?.id;
    this.router.navigate(['/game-info'], {queryParams: { id: id, type: 'game' }});
  }

}
