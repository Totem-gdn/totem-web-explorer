import { Component, Input, OnInit } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { ASSET_PARAM_LIST } from '@app/core/models/enums/params.enum';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
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
  @Input() type!: ASSET_TYPE | 'game';

  constructor(private gamesService: GamesService,
              private assetsService: AssetsService) { }

  assets: AssetInfo[] | null = null;

  list = ASSET_PARAM_LIST.LATEST;
  page = 1;

  ngOnInit(): void {
    if(this.type != 'game') {
      this.loadAssets(this.type, 1);
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

  loadMore() {
    this.page++;
    if(this.type == 'game') return;
    this.loadAssets(this.type, this.page, this.list);
  }

  onSort(list: ASSET_PARAM_LIST) {
    if(this.type == 'game')return;
    this.page = 1;
    this.loadAssets(this.type, this.page, list, 'set');
  }

}
