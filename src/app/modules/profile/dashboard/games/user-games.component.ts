import { Component, OnInit } from '@angular/core';
import { GamesService } from '@app/core/services/items/games.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrls: ['./user-games.component.scss']
})
export class UserGamesComponent implements OnInit {

  constructor(private gamesService: GamesService,
              private web3Service: Web3AuthService) { }
  sub!: Subscription;

  games: any[] = []

  async ngOnInit() {
    const wallet = await this.web3Service.getAccounts();
    this.gamesService.fetchGames(wallet).subscribe(games => {
      console.log(games);
      this.games = games;
    });
  }

  onLoadMore() {

  }

  ngOnDestroy () {
    this.sub?.unsubscribe();
  }

}
