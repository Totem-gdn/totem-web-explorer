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
  selector: 'assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.scss'],
  animations: [
    Animations.animations
  ]
})

export class AssetsListComponent implements OnInit, AfterViewInit, OnDestroy {
  // get title() {
  //   let str = this.type;
  //   return 'Showing' + this.type.toLowerCase().charAt(0).toUpperCase() + str.slice(1) + 's';
  // }
  //@ViewChild('grid') grid!: ElementRef;
  @Input() type!: ASSET_TYPE | 'game' ;

  constructor(private gamesService: GamesService,
              private assetsService: AssetsService,
              private storeService: StoreService) { }

  setAssets(assets: AssetInfo[] | null, action: 'set' | 'push' = 'push') {
    if(this.type == 'game' || !assets) return;
    const _assets = this.storeService.setRenderers(this.type, assets);

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
    // this.loadGames(1, this.list);
    this.loadMoreActive = false;
    if(this.type != 'game') {
      // this.page = 3;
      // this.loadMoreActive = false;
      this.loadAssets(this.type, this.page, this.list)
    }
    if(this.type == 'game') {
      this.loadGames(1, this.list);
    }

    this.selectedGame$();
  }

  ngAfterViewInit() {
    //this.grid.nativeElement.style.gridTemplateColumns = this.type == 'game' ? 'repeat(4, 370px)': 'repeat(5, 240px)';
  }

  selectedGame$() {
    this.storeService.selectedGame$
      .pipe(takeUntil(this.subs))
      .subscribe(game => {
        this.selectedGame.next(game)
        if(this.type != 'game' && this._assets) this._assets = this.storeService.setRenderers(this.type, this._assets);

      })
  }

  loadAssets(type: ASSET_TYPE, page: number, list: 'latest' | 'popular' = 'latest', action: 'set' | 'push' = 'push') {
    this.assetsService.fetchAssets(type, page, list)
      .subscribe(assets => {
        this.title = `Showing ${assets.meta.total} Totem ${this.type.toLowerCase().charAt(0).toUpperCase() + this.type.slice(1) + 's'} in`
        this.setAssets(assets.data, action)
        if (assets.meta.perPage * page >= assets.meta.total) {
          this.loadMoreActive = false;
        } else {
          this.loadMoreActive = true;
        }
      })
  }

  loadMultipleAssets(type: ASSET_TYPE, fromPage: number, toPage: number, list: 'latest' | 'popular' = 'latest', action: 'set' | 'push' = 'push') {
    this.assetsService.fetchMultiplePages(type, fromPage, toPage, list)
      .subscribe(assetsArr => {
        for(let assets of assetsArr) {
          this.title = `Showing ${assets.meta.total} Totem ${this.type.toLowerCase().charAt(0).toUpperCase() + this.type.slice(1) + 's'} in`
          this.setAssets(assets.data)
          this.loadMoreActive = true;
        }
      })
    this.page = toPage;
  }

  setGame(game: GameDetail) {
    this.storeService.selectGame(game);
  }

  loadGames(page: number, list: 'latest' | 'popular' = 'latest', action: 'set' | 'push' = 'push') {
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
        if (games.meta.perPage * page >= games.meta.total) {
          this.loadMoreActive = false;
        } else {
          this.loadMoreActive = true;
        }
      })
  }

  loadMore() {
    this.page++;
    if(this.type == 'game') {
      this.loadGames(this.page, this.list);
      return;
    }
    this.loadAssets(this.type, this.page, this.list)

  }

  // onSort(list: ASSET_PARAM_LIST) {
  //   this.loadMoreActive = true;
  //   this.list = list;
  //   this.page = 1;
  //   if(this.type == 'game') {
  //     this.loadGames(this.page, this.list, 'set');
  //     return;
  //   }

  //   this.loadAssets(this.type, this.page, this.list, 'set');
  // }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }

}
