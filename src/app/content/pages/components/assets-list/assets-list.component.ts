import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { ASSET_PARAM_LIST } from '@app/core/models/enums/params.enum';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { GamesService } from '@app/core/services/assets/games.service';
import { StoreService } from '@app/core/store/store.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.scss']
})

export class AssetsListComponent implements OnInit, OnDestroy {
  // get title() { 
  //   let str = this.type;
  //   return 'Showing' + this.type.toLowerCase().charAt(0).toUpperCase() + str.slice(1) + 's';
  // }

  @Input() type!: ASSET_TYPE | 'game' ;

  constructor(private gamesService: GamesService,
              private assetsService: AssetsService,
              private storeService: StoreService) { }

  setAssets(assets: AssetInfo[] | null, action: 'set' | 'push' = 'push') {
    if(this.type == 'game' || !assets) return;
    const _assets = this.storeService.setRenderer(this.type, assets);

    if(action == 'push') {
      if(!this._assets) this._assets = [];
      for(let asset of _assets) this._assets.push(asset);
    }
    if(action == 'set') {
      this._assets = _assets;
    }
  }

  games: GameDetail[] = [];
  _assets: AssetInfo[] = [];

  title: string = `Showing ...`
  selectedGame = new BehaviorSubject<GameDetail | null>(null);

  subs = new Subject<void>();
  list = ASSET_PARAM_LIST.LATEST;
  loadMoreActive = true;
  page = 1;

  ngOnInit(): void {
    this.loadGames(1, this.list);

    if(this.type != 'game') {
      this.loadAssets(this.type, 1);
    }
    if(this.type == 'game') {
      this.loadGames(1, this.list);
    }

    this.selectedGame$();
  }

  selectedGame$() {
    this.storeService.selectedGame$
      .pipe(takeUntil(this.subs))
      .subscribe(game => {
        this.selectedGame.next(game)
        if(this.type != 'game' && this._assets) this._assets = this.storeService.setRenderer(this.type, this._assets);

        console.log('selected game', game)
      })
  }

  loadAssets(type: ASSET_TYPE, page: number, list: ASSET_PARAM_LIST = ASSET_PARAM_LIST.LATEST, action: 'set' | 'push' = 'push') {
    this.assetsService.fetchAssets(type, page, list)
      .subscribe(assets => {
        this.title = `Showing ${assets.meta.total} Totem ${this.type.toLowerCase().charAt(0).toUpperCase() + this.type.slice(1) + 's'} in`
        this.setAssets(assets.data, action);
        if(assets.data.length < 10) this.loadMoreActive = false;

        
        console.log('assets', assets.data)
      })
  }

  setGame(game: GameDetail) {
    this.storeService.selectGame(game);
  }

  loadGames(page: number, list: ASSET_PARAM_LIST = ASSET_PARAM_LIST.LATEST, action: 'set' | 'push' = 'push') {
    this.gamesService.fetchGames(page, list)
      .subscribe(games => {
        if(this.type == 'game') this.title = `Showing ${games.meta.total} Totem ${this.type.toLowerCase().charAt(0).toUpperCase() + this.type.slice(1) + 's'}`
        if(action == 'push') {
          for(let game of games.data) {
            if(!this.games) this.games = [];
            this.games.push(game);
          }
        } else if(action == 'set') {
          this.games = games.data;
        }
        if(games.data.length < 10) this.loadMoreActive = false;
      })
  }

  loadMore() {
    this.page++;
    if(this.type == 'game') {
      this.loadGames(this.page, this.list);
      return;
    }
    this.loadAssets(this.type, this.page, this.list);
  }

  onSort(list: ASSET_PARAM_LIST) {
    this.loadMoreActive = true;
    this.list = list;
    this.page = 1;
    if(this.type == 'game') {
      this.loadGames(this.page, this.list, 'set');
      return;
    }

    this.loadAssets(this.type, this.page, this.list, 'set');
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }

}
