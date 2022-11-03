import { Component, Input } from "@angular/core";
import { CARD_TYPE } from "@app/core/enums/card-types.enum";
import { SubmitGame } from "@app/core/models/submit-game-interface.model";
import { GamesService } from "@app/core/services/assets/games.service";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { FavouritesService } from "@app/modules/profile/dashboard/favourites/favourites.service";
import { SnackNotifierService } from "../../../modules/snack-bar-notifier/snack-bar-notifier.service";

interface Rate {
    isHovered: boolean;
    selected: boolean;
}
@Component({
    selector: 'game-review',
    templateUrl: './game-review.component.html',
    styleUrls: ['./game-review.component.scss'],
    host: {
        class: 'lg:min-w-[420px]'
    }
})

export class GameReviewComponent {

    constructor(private favouritesService: FavouritesService,
        private messageService: SnackNotifierService,
        private web3Service: Web3AuthService,
        private gamesService: GamesService) { }

    @Input() game!: SubmitGame | any;
    toggleDropdown = false;

    rating: Rate[] = [{isHovered: false, selected: false},{isHovered: false, selected: false},{isHovered: false, selected: false},{isHovered: false, selected: false},{isHovered: false, selected: false}]

    onClickLike() {
        if (!this.web3Service.isLoggedIn()) {
            this.messageService.open('Unauthorized');
            return;
        }
        if (!this.game.isLiked) {
            this.favouritesService.addLike(CARD_TYPE.GAME, this.game.id).subscribe(() => {
                console.log('Add Like')
                this.gamesService.updateGame(this.game.id).subscribe();
            });
        } else {
            this.favouritesService.removeLike(CARD_TYPE.GAME, this.game.id).subscribe(() => {
                this.gamesService.updateGame(this.game.id).subscribe();
            });
        }
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

    onToggle() {
        this.toggleDropdown = !this.toggleDropdown;
    }
}