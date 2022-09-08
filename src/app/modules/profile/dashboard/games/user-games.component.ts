import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { GamesService } from '@app/core/services/items/games.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrls: ['./user-games.component.scss']
})
export class UserGamesComponent {

  constructor(private gamesService: GamesService,
              private web3Service: Web3AuthService) { }
  sub!: Subscription;

  games: any[] = [];

  ngOnDestroy () {
    this.sub?.unsubscribe();
  }

}
