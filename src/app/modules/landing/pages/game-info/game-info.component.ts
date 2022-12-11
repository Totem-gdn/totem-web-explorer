import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { SubmitGame } from "@app/core/models/interfaces/submit-game-interface.model";
import { UserEntity } from "@app/core/models/interfaces/user-interface.model";
import { GamesService } from "@app/core/services/assets/games.service";
import { UserStateService } from "@app/core/services/auth.service";
import { Gtag } from "angular-gtag";
import { Subject, takeUntil } from "rxjs";


@Component({
    selector: 'game-info',
    templateUrl: './game-info.component.html',
    styleUrls: ['./game-info.component.scss']
})

export class GameInfoComponent implements OnInit, OnDestroy {

    constructor(
        private route: ActivatedRoute,
        private gameService: GamesService,
        private userStateService: UserStateService,
        private gtag: Gtag
    ) {
        this.gtag.event('page_view');
    }

    toggleDropdown = false;
    pageNotFound = false;
    subs = new Subject<void>();
    game!: SubmitGame | any;
    games!: any[];
    editInfo: { edit: boolean; gameId: string } = { edit: false, gameId: '' };
    currentUser: UserEntity | null = null;

    ngOnInit() {
        this.game$();
        this.route.paramMap
            .pipe(takeUntil(this.subs))
            .subscribe((params: ParamMap) => {
                const id = params.get('id');
                if (!id) return;
                this.game = undefined;
                this.gameService.updateGame(id).subscribe();
            })

        this.gameService.updateGames(1).subscribe(games => {
            this.games = games;
        });
        this.userStateService.currentUser.pipe(takeUntil(this.subs)).subscribe((user: UserEntity | null) => {
            if (user) {
                this.currentUser = user;
                if (user.wallet == this.game?.owner) {
                    this.editInfo = { edit: true, gameId: this.game.id };
                }
            }
        })
    }

    game$() {
        this.gameService.game$
            .pipe(takeUntil(this.subs))
            .subscribe(game => {
                this.game = game;
                console.log(game)
                if (this.currentUser && this.currentUser?.wallet == this.game.owner) {
                    this.editInfo = { edit: true, gameId: this.game.id };
                }
            })
    }

    ngOnDestroy(): void {
        this.subs.next();
        this.subs.complete();
        this.gameService.setGame = null;
        this.gameService.clearGames();
    }
}
