import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CARD_TYPE } from "@app/core/enums/card-types.enum";
import { SubmitGame } from "@app/core/models/submit-game-interface.model";
import { GamesService } from "@app/core/services/assets/games.service";
import { TotemItemsService } from "@app/core/services/totem-items.service";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { FavouritesService } from "@app/modules/profile/dashboard/favourites/favourites.service";
import { Subscription } from "rxjs";
import { SnackNotifierService } from "../../modules/snack-bar-notifier/snack-bar-notifier.service";

@Component({
    selector: 'game-review',
    templateUrl: './game-review.component.html',
    styleUrls: ['./game-review.component.scss'],
    host: {
        class: 'lg:min-w-[420px]'
    }
})

export class GameReviewComponent implements OnInit {

    constructor(private favouritesService: FavouritesService,
        private messageService: SnackNotifierService,
        private web3Service: Web3AuthService,
        private gamesService: GamesService) { }

    @Input() game!: SubmitGame | any;
    toggleDropdown = false;

    @ViewChild('stars') stars!: ElementRef;
    rating: boolean[] = [false, false, false, false, false];

    ngOnInit() {

    }

    onClickLike() {
        if (!this.web3Service.isLoggedIn()) {
            this.messageService.open('Unauthorized');
            return;
        }
        if (!this.game.isLiked) {
            this.favouritesService.addLike(CARD_TYPE.GAME, this.game.id);
        } else {
            this.favouritesService.removeLike(CARD_TYPE.GAME, this.game.id);
        }
        this.gamesService.updateGame(this.game.id).subscribe();
    }

    onMouseEnter(e: any) {
        const container = this.stars.nativeElement as any;
        const stars = container.getElementsByClassName('star');
        for (let star of stars) {
            star.style.color = '#ffd013';
            if (star == e.target) break;
        }

        console.log(e)
    }
    onMouseLeave(e: any) {
        const container = this.stars.nativeElement as any;
        const stars = container.getElementsByClassName('star');
        for (let star of stars) {

            star.style.color = 'unset';
        }
    }

    onSaveStars(e: any) {
        this.resetStars();
        const container = this.stars.nativeElement as any;
        const selectedStar = e._elementRef.nativeElement;
        const stars = container.getElementsByClassName('star');

        for (let i = 0; i < this.rating.length; i++) {
            this.rating[i] = true;
            if (stars[i] == selectedStar) break;
        }
    }

    resetStars() {
        for (let i = 0; i < this.rating.length; i++) {
            // if(this.rating[i] == false) break;
            this.rating[i] = false;
        }
    }

    onToggle() {
        this.toggleDropdown = !this.toggleDropdown;
    }
}