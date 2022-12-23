import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { SubmitGame } from "@app/core/models/interfaces/submit-game-interface.model";
import { UserEntity } from "@app/core/models/interfaces/user-interface.model";
import { GamesService } from "@app/core/services/assets/games.service";
import { UserStateService } from "@app/core/services/auth.service";
import { OnDestroyMixin, untilComponentDestroyed } from "@w11k/ngx-componentdestroyed";
import { Gtag } from "angular-gtag";
import e from "express";


@Component({
    selector: 'game-info',
    templateUrl: './game-info.component.html',
    styleUrls: ['./game-info.component.scss']
})

export class GameInfoComponent extends OnDestroyMixin implements OnInit, OnDestroy {

    constructor(
        private route: ActivatedRoute,
        private gameService: GamesService,
        private userStateService: UserStateService,
        private gtag: Gtag
    ) {
        super();
        this.gtag.event('page_view');
    }

    toggleDropdown = false;
    pageNotFound = false;
    game!: SubmitGame | any;
    games!: any[];

    editInfo: { edit: boolean; gameId: string } = { edit: false, gameId: '' };
    currentUser: UserEntity | null = null;

    ngOnInit() {
        this.routeParams$();
        this.sliderGames();
        this.userInfo();
    }

    routeParams$() {
        this.route.paramMap
            .pipe(untilComponentDestroyed(this))
            .subscribe((params: ParamMap) => {
                const id = params.get('id');
                if (!id) return;
                this.game = undefined;
                this.gameService.fetchGame(id).subscribe({
                    next: game => {
                        this.game = game;
                    },
                    error: () => {
                        this.pageNotFound = true;
                    }
                });
            })
    }

    sliderGames() {
        this.gameService.fetchGames(1)
            .subscribe(games => {
                this.games = games;
            })
    }

    userInfo() {
        this.userStateService.currentUser
        .pipe(untilComponentDestroyed(this))
        .subscribe((user: UserEntity | null) => {
            if (user) {
                this.currentUser = user;
                if (user.wallet == this.game?.owner) {
                    this.editInfo = { edit: true, gameId: this.game.id };
                }
            }
        })
    }

    // game$() {
    //     this.gameService.game$
    //         .pipe(untilComponentDestroyed(this))
    //         .subscribe(game => {
    //             this.game = game;
    //             if (this.currentUser && this.currentUser?.wallet == this.game.owner) {
    //                 this.editInfo = { edit: true, gameId: this.game.id };
    //             }
    //         })
    // }
}
