import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { GamesService } from '@app/core/services/assets/games.service';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrls: ['./user-games.component.scss'],
  // host: {
  //   class: 'min-h-[calc(100vh-70px)]'
  // }
})
export class UserGamesComponent {
  games!: any[] | undefined | null;
  subs = new Subject<void>();

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.updateGames();
    // this.filters$();
    this.games$();
  }

  games$() {
    this.gamesService.games$
      .pipe(takeUntil(this.subs))
      .subscribe(games => {
        this.games = games;
      })
  }

  updateGames(filters: 'latest' | 'popular' = 'latest') {
    this.gamesService.updateGames(1, filters)
      .pipe(takeUntil(this.subs))
      .subscribe(games => {
        this.games = games;
      })
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }

}
