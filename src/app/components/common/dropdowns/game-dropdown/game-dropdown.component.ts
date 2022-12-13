import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { GamesService } from "@app/core/services/assets/games.service";
import { WidgetService } from "@app/core/services/states/widget-state.service";
import { OnDestroyMixin, untilComponentDestroyed } from "@w11k/ngx-componentdestroyed";

@Component({
  selector: 'game-dropdown',
  templateUrl: './game-dropdown.component.html',
  styleUrls: ['./game-dropdown.component.scss'],
  host: {
    class: 'w-full'
  }
})

export class GameDropdownComponent extends OnDestroyMixin implements AfterViewChecked, OnDestroy, AfterViewInit {

  constructor(private router: Router,
    public gamesService: GamesService,
    public widgetService: WidgetService,
    private changeDetector: ChangeDetectorRef,
  ) {
    super();
  }

  selectedScriptItem!: GameDetail | null;

  @Input() type: string = 'game';
  @Input() title: string | undefined = 'Menu';
  @Input() menuActive = false;
  @Input() alwaysOpen = false;
  @Input() width: string | null = null;
  @Output() onChange: EventEmitter<GameDetail> = new EventEmitter();
  games!: GameDetail[];

  resetSearch: boolean = false;
  selectedItem!: GameDetail;

  @ViewChild('dropdown') dropdown!: ElementRef;

  searchGames = false;

  set selectedGame(game: GameDetail) {
    if (!game) return;
    this._selectedGame = game;
  };
  _selectedGame!: GameDetail;

  ngAfterViewInit() {
    this.filterGames('');
    this.games$();
    this.selectedGame$();
    this.selectedScriptItem$();
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  filterGames(filter: string) {
    this.searchGames = true;
    this.games = [];
    this.gamesService.filterDropdownGames(filter).pipe(
      untilComponentDestroyed(this),
    ).subscribe();
  }

  games$() {
    this.gamesService.dropdownGames$
      .pipe(
        untilComponentDestroyed(this),
      ).subscribe(games => {
        if (games) {
          this.games = games;
          const sessionGame = this.gamesService.gameInSession;
          this.selectedGame = this.gamesService.selectedGame;
          this.title = sessionGame?.general?.name || this.games[0]?.general?.name || '';
          if (!this.selectedGame) {
            const game = games.find((el: GameDetail) => el?.general?.name === this.title);
            if (game) {
              this.gamesService.selectedGame = this._selectedGame;
              this.title = game?.general?.name || '';
            }

          }
        }
        this.searchGames = false;

      })
  }

  selectedScriptItem$() {
    this.widgetService.selectedGame$
      .pipe(
        untilComponentDestroyed(this)
      ).subscribe(game => {
        this.selectedScriptItem = game;
      })
  }

  selectedGame$() {
    this.gamesService.selectedGame$
      .pipe(
        untilComponentDestroyed(this),
      ).subscribe(game => {
        if (game) {
          this.selectedGame = game;
          this.title = game?.general?.name || '';
        }
      })
  }

  onChangeInput(game: GameDetail) {
    this.selectedGame = game;
    this.title = game?.general?.name || '';
    this.gamesService.gameInSession = game;
    this.onChange.emit(game);
    this.widgetService.scriptIndex = undefined;
    this.widgetService.updateSelectedGame(game);
    this.selectedScriptItem = game;
    if (!this.alwaysOpen) {
      this.menuActive = false;
    }
    this.resetSearch = !this.resetSearch;
  }

  onClick(isClickedInside: any) {
    if (this.dropdown.nativeElement.__ngContext__ === isClickedInside.context && isClickedInside.isInside === false && this.menuActive === true) {
      if (!this.alwaysOpen) {
        this.menuActive = false;
      }
      this.resetSearch = !this.resetSearch;
    }
  }

  onClickViewAll() {
    if (this.type === 'item') {
      this.router.navigate(['/items']);
    } else if (this.type === 'game') {
      this.router.navigate(['/games']);
    } else if (this.type === 'avatar') {
      this.router.navigate(['/avatars']);
    }
  }

  toggleList() {
    if (this.alwaysOpen) return;
    this.menuActive = !this.menuActive;
  }
}
