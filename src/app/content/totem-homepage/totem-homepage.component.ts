import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
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

  constructor(
    private gamesStoreService: GamesStoreService
  ) {
    super();

  }

  ngOnInit(): void {
    /* this.gamesStoreService.games$.subscribe((data: GameDetail[]) => {
      this.games$.next(data);
    }); */
    //this.gamesStoreService.getGames();
  }

}
