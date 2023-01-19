import { Component, OnDestroy, OnInit } from "@angular/core";
import { WidgetService } from "@app/core/services/states/widget-state.service";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { GamesService } from "@app/core/services/assets/games.service";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { ApiResponse } from "@app/core/models/interfaces/api-response.interface";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";


@Component({
  selector: 'totem-widget',
  templateUrl: './totem-widget.component.html',
  styleUrls: ['./totem-widget.component.scss'],
})

export class TotemWidgetComponent implements OnInit, OnDestroy {

  assetTypeSelected: 'item' | 'avatar' = 'avatar';
  games: GameDetail[] = [];
  items: AssetInfo[] = [];
  avatars: AssetInfo[] = [];
  assetsSelected: AssetInfo[] = [];

  constructor
    (
      private assetsService: AssetsService,
      private widgetService: WidgetService,
      private gamesService: GamesService,
    ) {

  }

  ngOnInit(): void {
    this.assetsService.fetchAssets(ASSET_TYPE.AVATAR, 1).subscribe((data: ApiResponse<AssetInfo[]>) => {
      this.avatars = data?.data;
      this.getGames();
    });
    this.assetsService.fetchAssets(ASSET_TYPE.ITEM, 1).subscribe((data: ApiResponse<AssetInfo[]>) => {
      this.items = data?.data;
      this.getGames();
    });
  }

  getAssets() {

  }

  getGames() {
    this.gamesService.fetchGames(1).subscribe((data: any) => {
      this.games = data.data;
      this.setRendererImageUrl();
    })
  }

  // utils

  setRendererImageUrl() {
    if (this.assetTypeSelected === 'item') {
      this.assetsSelected = this.games.map((game: GameDetail) => {
        return {
          ...this.items[0],
          rendererUrl: `${game.connections?.assetRenderer}/${this.assetTypeSelected}/${this.items[0]?.tokenId}?width=400&height=400`,
          rarity: this.items[0].tokenId % 100
        }
      });
    };
    if (this.assetTypeSelected === 'avatar') {
      this.assetsSelected = this.games.map((game: GameDetail) => {
        return {
          ...this.avatars[0],
          rendererUrl: `${game.connections?.assetRenderer}/${this.assetTypeSelected}/${this.avatars[0]?.tokenId}?width=400&height=400`,
          rarity: this.avatars[0].tokenId % 100
        }
      });
    };
  }

  selectAsset(assetType: 'item' | 'avatar') {
    this.assetTypeSelected = assetType;
    this.setRendererImageUrl();
  }

  ngOnDestroy(): void {

  }

}
