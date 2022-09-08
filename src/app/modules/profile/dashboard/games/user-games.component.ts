import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('gamesWrapper') gamesWrapper!: ElementRef;

  async ngOnInit() {
    const wallet = await this.web3Service.getAccounts();
    this.gamesService.fetchGames(wallet).subscribe(games => {
      console.log(games);
      this.games = games;
    });
  }

  ngAfterViewChecked(): void {
    const width = this.gamesWrapper.nativeElement.offsetWidth;
    console.log(width);

    if(width > 880) {
        this.gamesWrapper.nativeElement.style.gridTemplateColumns = '1fr 1fr 1fr';
    }
    if(width <= 880) {
        this.gamesWrapper.nativeElement.style.gridTemplateColumns = '1fr 1fr';
    }
    if(width <= 560) {
        this.gamesWrapper.nativeElement.style.gridTemplateColumns = '1fr';
    }
}

  onLoadMore() {

  }

  ngOnDestroy () {
    this.sub?.unsubscribe();
  }

}
