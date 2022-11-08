import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { GamesService } from "@app/core/services/assets/games.service";
import { TotemItemsService } from "@app/core/services/totem-items.service";
import { WidgetService } from "@app/core/services/states/widget-state.service";

import { Observable } from "rxjs";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";


@Component({
    selector: 'home-widget',
    templateUrl: './home-widget.component.html',
    styleUrls: ['./home-widget.component.scss'],
    animations: [
      trigger('hideFirstState', [
        state('changed', style({
          opacity: 0
        })),
        state('default', style({
          opacity: 1
        })),
        state('selected', style({
          opacity: 0
        })),
        transition('* => *', animate('1200ms linear')),
      ]),
      trigger('hideSecondState', [
        state('changed', style({
          opacity: 1
        })),
        state('default', style({
          opacity: 0
        })),
        state('selected', style({
          opacity: 0
        })),
        transition('* => *', animate('1200ms linear')),
      ]),
      trigger('hideThirdState', [
        state('selected', style({
          opacity: 1
        })),
        state('default', style({
          opacity: 0
        })),
        state('changed', style({
          opacity: 0
        })),
        transition('* => *', animate('1200ms linear')),
      ])
    ]
})

export class HomeWidgetComponent implements OnInit {

    cardsToShow: any[] = [];
    selectedGame!: GameDetail;
    constructor(private gamesService: GamesService, private widgetService: WidgetService, private totemItemsService: TotemItemsService) {
      this.totemItemsService.avatars.subscribe((data: any[] | null) => {
        if (data && data.length) {
          this.cardsToShow[0] = data![0];
        }
      })
      this.totemItemsService.newestItems.subscribe((data: any[] | null) => {
        if (data && data.length) {
          this.cardsToShow[1] = data![1];
        }
      })
    }

    ngOnInit(): void {

    }

    onChangeGame(game: GameDetail) {
      this.selectedGame = game;
    }

    getSelectedGames(): Observable<any> {
      return this.widgetService.selectedGame;
    }



    selectGame(event: GameDetail) {
      this.widgetService.updateSelectedGame(event);
    }
}
