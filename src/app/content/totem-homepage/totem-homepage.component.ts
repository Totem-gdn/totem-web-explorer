import { Component, OnDestroy, OnInit } from '@angular/core';
import { BLOCK_TYPE } from '@app/core/models/enums/block-types.enum';
import { HomepageBlock } from '@app/core/models/interfaces/homepage-blocks.interface';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { HomepageBlocksService } from '@app/core/services/blocks/homepage-blocks.service';
import { GamesStoreService } from '@app/core/store/games-store.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'totem-homepage',
  templateUrl: './totem-homepage.component.html',
  styleUrls: ['./totem-homepage.component.scss'],
})
export class TotemHomepageComponent extends OnDestroyMixin implements OnInit, OnDestroy {

  games$: BehaviorSubject<GameDetail[]> = new BehaviorSubject<GameDetail[]>([]);
  promoGame: HomepageBlock | undefined = undefined;
  promoVideo: HomepageBlock | undefined = undefined;
  eventBanner: HomepageBlock | undefined = undefined;

  constructor(
    private gamesStoreService: GamesStoreService,
    private homepageBlocksService: HomepageBlocksService,
  ) {
    super();

  }

  ngOnInit(): void {
    /* this.gamesStoreService.games$.subscribe((data: GameDetail[]) => {
      this.games$.next(data);
    }); */
    //this.gamesStoreService.getGames();
    this.getHomepageBlocks();
  }

  getHomepageBlocks() {
    this.homepageBlocksService
      .getBlocks()
      .pipe(untilComponentDestroyed(this))
      .subscribe((data: HomepageBlock[]) => {

        if (!data) return;

        data.forEach((block: HomepageBlock) => {
          if (block.type === BLOCK_TYPE.PROMO_GAME) {
            this.promoGame = block;
          };
          if (block.type === BLOCK_TYPE.PROMO_VIDEO) {
            this.promoVideo = block;
          };
          if (block.type === BLOCK_TYPE.EVENT_BANNER) {
            this.eventBanner = block;
          };
        });

      });
  }

}
