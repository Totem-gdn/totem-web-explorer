import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { DropdownItem } from "@app/core/models/interfaces/dropdown-item.model";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { GamesService } from "@app/core/services/assets/games.service";
import { WidgetService } from "@app/core/services/states/widget-state.service";
import { environment } from "@env/environment";
import { first, Subject, Subscription, take, takeUntil } from "rxjs";

@Component({
  selector: 'game-dropdown',
  templateUrl: './game-dropdown.component.html',
  styleUrls: ['./game-dropdown.component.scss'],
  host: {
    class: 'w-full'
  }
})

export class GameDropdownComponent implements OnDestroy, OnInit {


  constructor(
    public gamesService: GamesService,
    public widgetService: WidgetService,
    public changeDetector: ChangeDetectorRef
  ) {
  }

  @Output() onChange: EventEmitter<GameDetail> = new EventEmitter();

  subs = new Subject<void>();
  dropdownGames!: DropdownItem[];
  selectedGame!: DropdownItem;
  menuHeight = '100px';

  // Widget
  scriptSelectedGame?: DropdownItem;
  scriptSub?: Subscription;

  ngOnInit() {
    const sessionGame = this.gamesService.gameInSession;
    if(sessionGame) this.gamesService.selectedGame = sessionGame;
    this.updateGames();
    this.selectedGame$();

    const gameInSession = this.gamesService.gameInSession;
    if (gameInSession) this.selectedGame = this.formatGame(gameInSession);
  }

  selectedGame$() {
    // this.gamesService.selectedGame$
    //   .pipe(takeUntil(this.subs))
    //   .subscribe(game => {
    //     if (!game) return;
    //     this.selectedGame = this.formatGame(game);
    //   })
  }

  updateGames(filter: string = '') {
    this.gamesService.gamesByFilter(filter, 1)
      .pipe(first(games => games))
      .subscribe(games => {
        if (!games) return;
        if(!this.gamesService.gameInSession) this.gamesService.gameInSession = games[0];
        this.formatGames(games, filter);
      });
  }

  formatGames(games: GameDetail[], filter: string) {

    const gameInSession = this.gamesService.gameInSession;

    const dropdownGames: DropdownItem[] = [];

    if ('totem'.includes(filter.toLowerCase())) {
      dropdownGames.push(this.formatGame(
        {
          id: 'totem',
          general: {
            name: 'Totem',
            genre: ['Canonical', 'View']
          },
          connections: {
            assetRenderer: environment.ASSET_RENDERER_URL
          },
          images: {
            smallThumbnail: 'assets/icons/nav/logo-small.svg'
          }
        }
      ))
    }

    if (gameInSession?.general?.name?.includes(filter.toLowerCase()) && gameInSession?.general?.name.toLowerCase() != 'еotem') {
      dropdownGames.push(this.formatGame(gameInSession))
    }

    for (let game of games) {
      if(game?.general?.name?.toLowerCase() == gameInSession?.general?.name?.toLowerCase()) continue;
      const dropdownGame = this.formatGame(game);
      dropdownGames.push(dropdownGame);
    }
    this.dropdownGames = dropdownGames;
  }

  formatGame(game: GameDetail) {
    const title = game?.general?.name || 'Untilted';
    const subTitle = game?.general?.genre?.[0];
    const img = game?.images?.smallThumbnail;

    const dropdownGame: DropdownItem = {
      title,
      subTitle,
      data: game,
      img
    }
    return dropdownGame;
  }

  onChangeInput(game: GameDetail) {
    this.widgetService.scriptIndex = undefined;
    this.widgetService.selectedGame = game;
    this.gamesService.gameInSession = game;
    this.onChange.emit(game);
  }

  searchEvent(filter: string) {
    this.updateGames(filter);
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.unsubscribe();
    this.scriptSub?.unsubscribe();
  }
}
