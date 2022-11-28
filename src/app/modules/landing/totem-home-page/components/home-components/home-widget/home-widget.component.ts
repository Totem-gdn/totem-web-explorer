import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { WidgetService } from "@app/core/services/states/widget-state.service";
import { TotemItemsService } from "@app/core/services/totem-items.service";

import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { Subscription } from "rxjs";


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

export class HomeWidgetComponent implements OnInit, OnDestroy {

    // cardsToShow!: any[];
    card1!: AssetInfo;
    card2!: AssetInfo;
    selectedGame!: GameDetail | null;
    sub!: Subscription;

    constructor(private assetsService: AssetsService, private widgetService: WidgetService, private totemItemsService: TotemItemsService) {

      this.assetsService.updateAssets('avatar', 1, '').subscribe(avatars => {
        if(!avatars) return;
        this.card1 = avatars[0];
      });
      this.assetsService.updateAssets('item', 1, '').subscribe(items => {
        if(!items) return;
        this.card2 = items[0];
      });
    }

    ngOnInit(): void {
      this.selectedGame$();
    }

    onChangeGame(game: GameDetail) {
      this.selectedGame = game;
    }

    selectedGame$() {
      this.sub = this.widgetService.selectedGame$.subscribe(game => {
        this.selectedGame = game;
      })
    }

    selectGame(event: GameDetail) {
      this.widgetService.updateSelectedGame(event);
    }

    ngOnDestroy(): void {
      this.sub?.unsubscribe();
    }
}
