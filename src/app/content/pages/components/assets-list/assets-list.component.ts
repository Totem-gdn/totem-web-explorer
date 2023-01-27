import { Component, Input, OnInit } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { ASSET_PARAM_LIST } from '@app/core/models/enums/params.enum';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { GamesService } from '@app/core/services/assets/games.service';

@Component({
  selector: 'assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.scss']
})

export class AssetsListComponent implements OnInit {
  get title() { 
    let str = this.type;
    return this.type.toLowerCase().charAt(0).toUpperCase() + str.slice(1) + 's';
  }
  @Input() type!: ASSET_TYPE | 'game' ;

  constructor(private gamesService: GamesService,
              private assetsService: AssetsService) { }

  assets: AssetInfo[] | null = null;
  games: GameDetail[] | null = null

  list = ASSET_PARAM_LIST.LATEST;
  page = 1;

  ngOnInit(): void {
    if(this.type != 'game') {
      this.loadAssets(this.type, 1);
    }
    if(this.type == 'game') {
      this.loadGames(1, this.list);
    }
  }

  loadAssets(type: ASSET_TYPE, page: number, list: ASSET_PARAM_LIST = ASSET_PARAM_LIST.LATEST, action: 'set' | 'push' = 'push') {
    this.assetsService.fetchAssets(type, page, list)
      .subscribe(assets => {
        if(action == 'push') {
          for(let asset of assets.data) {
            if(!this.assets) this.assets = [];
            this.assets.push(asset);
          }
        } else if(action == 'set') {
          this.assets = assets.data;
        }
        
        console.log('assets', assets.data)
      })
  }

  loadGames(page: number, list: ASSET_PARAM_LIST = ASSET_PARAM_LIST.LATEST, action: 'set' | 'push' = 'push') {
    this.gamesService.fetchGames(page, list)
      .subscribe(games => {
        if(action == 'push') {
          for(let asset of games.data) {
            if(!this.games) this.games = [];
            this.games.push(asset);
          }
        } else if(action == 'set') {
          this.games = games.data;
        }
        
        console.log('games', games.data)
      })
  }

  loadMore() {
    this.page++;
    if(this.type == 'game') {
      this.loadGames(this.page, this.list, 'set');
      return;
    }
    this.loadAssets(this.type, this.page, this.list);
  }

  onSort(list: ASSET_PARAM_LIST) {
    this.list = list;
    this.page = 1;
    if(this.type == 'game') {
      this.loadGames(this.page, this.list, 'set');
      return;
    }

    this.loadAssets(this.type, this.page, this.list, 'set');
  }

}
