import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from "@angular/core";
import { DropdownItem } from "@app/core/models/interfaces/dropdown-item.model";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { GamesService } from "@app/core/services/assets/games.service";
import { WidgetService } from "@app/core/services/states/widget-state.service";
import { Subject, Subscription, take, takeUntil } from "rxjs";

@Component({
  selector: 'game-dropdown',
  templateUrl: './game-dropdown.component.html',
  styleUrls: ['./game-dropdown.component.scss'],
  host: {
    class: 'w-full'
  }
})

export class GameDropdownComponent implements OnDestroy {


  constructor(
    public gamesService: GamesService,
    public widgetService: WidgetService,
  ) {
  }

  @Output() onChange: EventEmitter<GameDetail> = new EventEmitter();

  subs = new Subject<void>();
  dropdownGames!: DropdownItem[];
  selectedGame!: DropdownItem;

  // Widget
  scriptSelectedGame?: DropdownItem;
  scriptSub?: Subscription;

  ngOnInit() {
    this.selectedGame$();
    this.updateGames();

    const gameInSession = this.gamesService.gameInSession;
    if (gameInSession) this.selectedGame = this.formatGame(gameInSession);
  }

  selectedGame$() {
    this.gamesService.selectedGame$
      .pipe(takeUntil(this.subs))
      .subscribe(game => {
        if (!game) return;
        this.selectedGame = this.formatGame(game);
      })
  }

  updateGames(filter: string = '') {
    this.gamesService.loadGames(filter, true)
      .subscribe(games => {
        console.log(games)
        if (!games) return;
        if(!this.gamesService.gameInSession) this.gamesService.gameInSession = games[0];
        this.formatGames(games);
      })
  }

  formatGames(games: GameDetail[]) {
    const dropdownGames: DropdownItem[] = [];

    for (let game of games) {
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
