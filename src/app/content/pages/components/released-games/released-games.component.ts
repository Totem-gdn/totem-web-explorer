import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Animations } from '@app/core/animations/animations';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { ASSET_PARAM_LIST } from '@app/core/models/enums/params.enum';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { GamesService } from '@app/core/services/assets/games.service';
import { StoreService } from '@app/core/store/store.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'released-games',
  templateUrl: './released-games.component.html',
  styleUrls: ['./released-games.component.scss'],
  animations: [
    Animations.animations
  ]
})

export class ReleasedGamesComponent implements OnInit, OnDestroy {
  type: 'game' = 'game';

  constructor(private gamesService: GamesService,
              private storeService: StoreService) { }

  games: GameDetail[] = [];
  _assets: AssetInfo[] = [];

  title: string = `Showing ...`
  selectedGame = new BehaviorSubject<GameDetail | null>(null);

  subs = new Subject<void>();
  list = ASSET_PARAM_LIST.LATEST;
  loadMoreActive = true;
  page = 1;

  ngOnInit(): void {
    this.loadMoreActive = false;
    this.loadGames(1, this.list);
  }

  setGame(game: GameDetail) {
    this.storeService.selectGame(game);
  }

  loadGames(page: number, list: 'latest' | 'popular' = 'latest', action: 'set' | 'push' = 'push') {
    this.gamesService.fetchGames(page, list, undefined, 1)
      .subscribe(games => {
        this.title = `Play ${games.meta.total} RELEASED Totem games`;
        if(action == 'push') {
          for(let game of games.data) {
            if(!this.games) this.games = [];
            this.games.push(game);
          }
        } else if(action == 'set') {
          this.games = games.data;
        }
        if (games.meta.perPage * page >= games.meta.total) {
          this.loadMoreActive = false;
        } else {
          this.loadMoreActive = true;
        }
      })
  }

  loadMore() {
    this.page++;
    this.loadGames(this.page, this.list);
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }

}
