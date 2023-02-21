import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { RendererAvailableTypes } from '@app/core/models/interfaces/asset-info.model';
import { ItemLegacy, LegacyData } from '@app/core/models/interfaces/legacy.model';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { GamesService } from '@app/core/services/assets/games.service';
import { StoreService } from '@app/core/store/store.service';
import { environment } from '@env/environment';
import { Subject, takeUntil } from 'rxjs';
import { TotemLegacyCardService } from './totem-legacy-card.service';

@Component({
  selector: 'totem-legacy-card',
  templateUrl: './totem-legacy-card.component.html',
  styleUrls: ['./totem-legacy-card.component.scss']
})
export class TotemLegacyCardComponent implements OnInit, OnDestroy {

  subject = new Subject();

  constructor(private storeService: StoreService,
              private totemLegacyCardService: TotemLegacyCardService) { }
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

    this.totemLegacyCardService.checkAssetRendererInfo(url).pipe(takeUntil(this.subject)).subscribe((res: RendererAvailableTypes) => {
      if (!res) {
        this.setDefaultRenderer(type, id);
      }
      if (res.supported_asset_types && res.supported_asset_types.length) {
        const availableTypes: string[] = res.supported_asset_types;
        if (!availableTypes.length) {
          this.setDefaultRenderer(type, id);
          return;
        }
        if (availableTypes.length == 1) {
          const availableType: string = availableTypes[0];
          if (type == availableType) {
            this.setCustomRenderer(url, type, id);
          } else {
            this.setDefaultRenderer(type, id);
          }
          return;
        }
        this.setCustomRenderer(url, type, id);
      } else {
        this.setDefaultRenderer(type, id);
      }
    });
    //this.renderer = `${url}/${type}/${id}?width=400&height=400`;
  }

  setDefaultRenderer(type: string, id: number) {
    this.renderer = `${environment.ASSET_RENDERER_URL}/${type}/${id}?width=400&height=400`;
  }

  setCustomRenderer(url:string, type: string, id: number) {
    this.renderer = `${url}/${type}/${id}?width=400&height=400`;
  }

  ngOnDestroy(): void {
    this.subject.next(null);
  }

}
