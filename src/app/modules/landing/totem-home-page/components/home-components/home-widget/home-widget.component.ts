import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { WidgetService } from "@app/core/services/states/widget-state.service";

import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { Subject, Subscription, takeUntil } from "rxjs";
import { GamesService } from "@app/core/services/assets/games.service";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";


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
  subs = new Subject<void>();

  constructor(private assetsService: AssetsService, 
              private widgetService: WidgetService,
              private gamesService: GamesService) {

    this.assetsService.fetchAssets(ASSET_TYPE.AVATAR, 1).subscribe(avatars => {
      if(!avatars.data) return;
      this.card1 = avatars.data[0];
    });
    this.assetsService.fetchAssets(ASSET_TYPE.ITEM, 1).subscribe(items => {
      if(!items.data) return;
      this.card2 = items.data[0];
    });
  }

  ngOnInit(): void {
    this.selectedWidgetGame$();
  }

  onChangeGame(game: GameDetail) {
    this.selectedGame = game;
  }

  selectedWidgetGame$() {
    this.widgetService.selectedGame$
    .pipe(takeUntil(this.subs))
    .subscribe(game => {
      if(!game) return;
      this.selectedGame = game;
    })
  }

  selectGame(game: GameDetail) {
    this.widgetService.selectedGame = game;
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }
}
