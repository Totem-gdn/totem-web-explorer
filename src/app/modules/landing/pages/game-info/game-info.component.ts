import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Params } from "@angular/router";
import { SubmitGame } from "@app/core/models/submit-game-interface.model";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { GamesService } from "@app/core/services/assets/games.service";
import { TotemItemsService } from "@app/core/services/totem-items.service";
import { Subject, takeUntil } from "rxjs";


@Component({
    selector: 'game-info',
    templateUrl: './game-info.component.html',
    styleUrls: ['./game-info.component.scss']
})

export class GameInfoComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute,
        private itemsService: TotemItemsService,
        private gameService: GamesService,
        private assetsService: AssetsService) { }

    toggleDropdown = false;
    subs = new Subject<void>();
    game!: SubmitGame | any;
    games!: any[];

    ngOnInit() {
        this.route.paramMap
            .pipe(takeUntil(this.subs))
            .subscribe((params: ParamMap) => {
                const id = params.get('id');
                if (!id) return;
                this.gameService.updateGame(id).subscribe();
                this.gameService.game$
                    .pipe(takeUntil(this.subs))
                    .subscribe(game => {
                        if(!game) return;
                        this.game = game;
                    })
            })

        this.gameService.fetchGames().subscribe(games => {
            this.games = games;
        })
    }

    ngOnDestroy(): void {
        console.log('destroy')
        this.subs.next();
        this.subs.complete();
        this.gameService.setGame = null;
    }
}