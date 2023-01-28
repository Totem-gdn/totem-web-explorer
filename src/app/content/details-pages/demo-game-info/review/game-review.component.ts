import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { CARD_TYPE } from "@app/core/models/enums/card-types.enum";
import { StorageKey } from "@app/core/models/enums/storage-keys.enum";
import { SubmitGame } from "@app/core/models/interfaces/submit-game-interface.model";
import { GamesService } from "@app/core/services/assets/games.service";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { FavouritesService } from "@app/modules/profile/dashboard/favourites/favourites.service";
import { take } from "rxjs";

interface Rate {
    isHovered: boolean;
    selected: boolean;
}
@Component({
    selector: 'game-review',
    templateUrl: './game-review.component.html',
    styleUrls: ['./game-review.component.scss'],
    host: {
        class: 'w-full'
    }
})

export class GameReviewComponent {

    constructor(private favouritesService: FavouritesService,
        private messageService: SnackNotifierService,
        private web3Service: Web3AuthService,
        private gamesService: GamesService,
        private router: Router,) { }

    @ViewChild('dropdown') dropdown!: ElementRef;
    @Input() game!: SubmitGame | any;
    @Input() editInfo: { edit: boolean; gameId: string } = { edit: false, gameId: '' };


    rating: Rate[] = [{isHovered: false, selected: false},{isHovered: false, selected: false},{isHovered: false, selected: false},{isHovered: false, selected: false},{isHovered: false, selected: false}]

    onClickLike() {
        if (!this.web3Service.isLoggedIn()) {
            this.web3Service.login();
            return;
        }
        if (!this.game.isLiked) {
            this.favouritesService.addLike(CARD_TYPE.GAME, this.game.id).subscribe(() => {
                this.loadGame(this.game.id);
            });
        } else {
            this.favouritesService.removeLike(CARD_TYPE.GAME, this.game.id).subscribe(() => {
                this.loadGame(this.game.id);
            });
        }
    }

    loadGame(gameId: string) {
        this.gamesService.fetchGame(gameId)
        .pipe(take(1))
        .subscribe(game => {
            this.game = game;
        });
    }

    editGame() {
      localStorage.setItem(StorageKey.SELECTED_GAME, JSON.stringify(this.game));
      this.router.navigate(['/submit-game'], {queryParams: {edit: this.editInfo.gameId}})
    }

    starsAction(action: string, index: number) {
        if(action == 'hover') {
            for(let i = 0; i <= index; i++) {
                this.rating[i].isHovered = true;
            }
        }
        if(action == 'leave') {
            for(let i = 0; i <= index; i++) {
                this.rating[i].isHovered = false;
            }
        }
        if(action == 'save') {
            this.starsReset();
            for(let i = 0; i <= index; i++) {
                this.rating[i].selected = true;
            }
        }
    }
    starsReset() {
        for(let i = 0; i < this.rating.length; i++) {
            this.rating[i].selected = false;
        }
    }
}
