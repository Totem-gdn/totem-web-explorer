import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SubmitGame } from "@app/core/models/submit-game-interface.model";
import { GamesService } from "@app/core/services/assets/games.service";
import { TotemItemsService } from "@app/core/services/totem-items.service";
import { Subject, Subscription, takeUntil } from "rxjs";


@Component({
    selector: 'game-info',
    templateUrl: './game-info.component.html',
    styleUrls: ['./game-info.component.scss']
})

export class GameInfoComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute,
                private itemsService: TotemItemsService,
                private gameService: GamesService) { }

    toggleDropdown = false;
    subs = new Subject<void>();
    game!: SubmitGame | any;

    ngOnInit() {
        this.route.queryParams
        .pipe(takeUntil(this.subs))
        .subscribe(param => {
            const id = param['id'];

            if (id) {
                this.gameService.updateGame(id).subscribe();
                this.gameService.game$
                .pipe(takeUntil(this.subs))
                .subscribe(game => {
                    this.game = game;
                })
            }
        })
    }

    ngOnDestroy(): void {
        this.subs.next();
        this.subs.complete();
    }
}