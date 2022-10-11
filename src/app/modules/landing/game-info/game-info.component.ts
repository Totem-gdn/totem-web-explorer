import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SubmitGame } from "@app/core/models/submit-game-interface.model";
import { TotemItemsService } from "@app/core/services/totem-items.service";
import { Subscription } from "rxjs";


@Component({
    selector: 'game-info',
    templateUrl: './game-info.component.html',
    styleUrls: ['./game-info.component.scss']
})

export class GameInfoComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute,
        private itemsService: TotemItemsService,) { }

    toggleDropdown = false;
    sub!: Subscription;
    game!: SubmitGame | any;

    ngOnInit() {
        this.sub = this.route.queryParams.subscribe(param => {
            const id = param['id'];

            if (id) {
                this.itemsService.getGameById(id).subscribe(game => {
                    this.game = game;

                    console.log('game', game);
                })
            }
        })
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}