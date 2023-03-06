import { Component, OnDestroy, OnInit } from '@angular/core';
import { BLOCK_TYPE } from '@app/core/models/enums/block-types.enum';
import { HomepageBlock } from '@app/core/models/interfaces/homepage-blocks.interface';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { GamesService } from '@app/core/services/assets/games.service';
import { HomepageBlocksService } from '@app/core/services/blocks/homepage-blocks.service';
import { GamesStoreService } from '@app/core/store/games-store.service';
import { StoreService } from '@app/core/store/store.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { BehaviorSubject, take } from 'rxjs';


@Component({
  selector: 'totem-homepage',
  templateUrl: './totem-homepage.component.html',
  styleUrls: ['./totem-homepage.component.scss'],
})
export class TotemHomepageComponent extends OnDestroyMixin implements OnInit, OnDestroy {

  games$: BehaviorSubject<GameDetail[]> = new BehaviorSubject<GameDetail[]>([]);
  promoGame: HomepageBlock | undefined = undefined;
  promoVideo: HomepageBlock | undefined = undefined;
  eventBanners: HomepageBlock[] | null = null;

  loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private gamesStoreService: GamesStoreService,
    private storeService: StoreService,
    private homepageBlocksService: HomepageBlocksService,
  ) {
    super();

  }

  ngOnInit(): void {

    this.storeService.appLoading$.subscribe((state: boolean) => {
      this.loading$.next(state);
    })
    //this.fetchGames();
    /* this.gamesStoreService.games$.subscribe((data: GameDetail[]) => {
      this.games$.next(data);
    }); */
    //this.gamesStoreService.getGames();
    this.getHomepageBlocks();
  }

  /* fetchGames() {
    this.gamesService.fetchGames(1)
      .pipe(take(1))
      .subscribe(games => {
        this.games$.next(games.data);
      })
  } */

  getHomepageBlocks() {
    this.homepageBlocksService
      .getBlocks()
      .pipe(untilComponentDestroyed(this))
      .subscribe((data: HomepageBlock[]) => {

        if (!data) return;
        let blocks: HomepageBlock[] = [];
        data.forEach((block: HomepageBlock) => {
          if (block.type === BLOCK_TYPE.PROMO_GAME) {
            this.promoGame = block;
          };
          if (block.type === BLOCK_TYPE.PROMO_VIDEO) {
            this.promoVideo = block;
          };
          if (block.type === BLOCK_TYPE.EVENT_BANNER) {
            blocks.push(block);
          };
        });
        this.sortEventBanners(blocks);

      });
  }

  sortEventBanners(blocks: HomepageBlock[]) {
    if (!blocks.length) return;
    const sortedBanners: HomepageBlock[] = blocks.sort((a: HomepageBlock, b: HomepageBlock) => {
      if (!a.data?.eventDate?.date) return 0;
      if (!b.data?.eventDate?.date) return 0;
      let aDate: Date = new Date(a.data.eventDate.date);
      let bDate: Date = new Date(b.data.eventDate.date);
      if (aDate.getTime() > bDate.getTime()) {
        return 1;
      }
      if (aDate.getTime() < bDate.getTime()) {
        return -1;
      }
      return 0;
    })
    this.filterPassedEvents(sortedBanners);
  }

  filterPassedEvents(blocks: HomepageBlock[]) {
    let yesterdayDate: number = new Date().getTime();
    const yesterdayTimeStamp = yesterdayDate - 24*60*60*1000;

    const filteredBlocks: HomepageBlock[] = blocks.filter((block: HomepageBlock) => {
      if (!block.data?.eventDate?.date) return false;
      let eventDate: Date = new Date(block.data?.eventDate?.date);
      const timestamp: number = eventDate.getTime();
      return timestamp > yesterdayTimeStamp;
    })
    this.eventBanners = filteredBlocks;
  }

}
