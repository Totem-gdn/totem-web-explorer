import { Component, Input, OnInit } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { ItemLegacy, LegacyData } from '@app/core/models/interfaces/legacy.model';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { GamesService } from '@app/core/services/assets/games.service';
import { StoreService } from '@app/core/store/store.service';
import { environment } from '@env/environment';

@Component({
  selector: 'totem-legacy-card',
  templateUrl: './totem-legacy-card.component.html',
  styleUrls: ['./totem-legacy-card.component.scss']
})
export class TotemLegacyCardComponent implements OnInit {

  constructor(private storeService: StoreService,
              private gamesService: GamesService) { }
  // @Input() legacy!: LegacyData;
  @Input() game?: GameDetail;
  renderer?: string;

  ngOnInit(): void {
    this.setRenderer();
  }

  setRenderer() {
    const type = 'item';
    const id = 100;
    const rendererUrl = this.game?.connections?.assetRenderer;

    let url = rendererUrl ? rendererUrl : environment.ASSET_RENDERER_URL;
    url = url.slice(-1) === '/' ? url.slice(0, -1) : url;
    this.renderer = `${url}/${type}/${id}?width=400&height=400`;

    // if(!this.legacy?.gameAddress) return;
    // const type = 'item';
    // const id = 100;
    // console.log(this.legacy?.gameAddress)
  }

}
