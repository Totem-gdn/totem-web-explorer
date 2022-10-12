import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ItemParam } from '@app/core/models/item-param.model';
import { GamesService } from '@app/core/services/assets/games.service';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrls: ['./user-games.component.scss']
})
export class UserGamesComponent {
  games!: any[];
  subs = new Subject<void>();

  constructor(private itemsService: TotemItemsService) {}

  ngOnInit(): void {
    this.fetchGames();
    this.filters$();
  }

  filters$() {
    this.itemsService.filters$.pipe(takeUntil(this.subs)).subscribe(filters => {
      this.fetchGames(filters);
    })
  }

  fetchGames(filters?: ItemParam[]) {
    this.itemsService.getGames$(filters).pipe(takeUntil(this.subs)).subscribe(games => {
      this.games = games;
    })
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }

}
