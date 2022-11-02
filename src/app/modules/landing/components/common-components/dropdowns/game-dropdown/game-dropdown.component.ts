import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GamesService } from "@app/core/services/assets/games.service";
import { BaseStorageService } from "@app/core/services/base-storage.service";
import { Subject, takeUntil } from "rxjs";


import { Game } from "../../totem-search-filter/models/items-interface.model";


@Component({
  selector: 'game-dropdown',
  templateUrl: './game-dropdown.component.html',
  styleUrls: ['./game-dropdown.component.scss']
})

export class GameDropdownComponent implements OnDestroy, AfterViewInit {

  constructor(private router: Router,
    private gamesService: GamesService,
    private baseStorageService: BaseStorageService) { }

  @Input() type: string = 'game';
  @Input() title = 'Menu';
  games: Game[] = [];
  @Input() menuActive = false;
  @Input() alwaysOpen = false;
  @Input() borderStyle = false;
  @Input() bluffChanges = false;
  @Output() changeGame: EventEmitter<Game> = new EventEmitter<Game>();

  // @Input() onBluffChange = new EventEmitter();
  resetSearch: boolean = false;
  initGamesList!: Game[];
  selectedItem!: Game;
  subs = new Subject<void>();
  uniqKey = 'gamesDropdown';
  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('menuItems') menuItems!: ElementRef;


  set selectedGame(game: Game) {
    if (!game) return;
    this._selectedGame = game;
  };
  _selectedGame!: Game;

  ngAfterViewInit() {
    this.filterGames('');
    this.games$(true);
    this.selectedGame$();
  }

  initBluffChanges() {
    if (this.bluffChanges && this.initGamesList) {
      let idx = 1;
      const inter = setInterval(() => {
        if (!this.baseStorageService.getItem(this.uniqKey, 'sesion')) {
          if (this.initGamesList[idx]) {
            this.onChangeInput(this.initGamesList[idx], true);
            if (idx < this.initGamesList.length) {
              idx++;
            } else {
              idx = 0;
            }
          } else if (this.initGamesList?.length) {
            idx = 0;
            this.onChangeInput(this.initGamesList[idx], true);
          }

        } else {
          clearInterval(inter);
        }
      }, 6000)
    }
  }

  filterGames(filter: string) {
    this.games = [];
    this.gamesService.filterDropdownGames(filter).subscribe();
  }
  games$(initGames = false) {
    this.gamesService.dropdownGames$
      .pipe(takeUntil(this.subs))
      .subscribe(games => {
        this.games = games;
        if (initGames) {
          this.initGamesList = games;
        }
        if (games) {
          this.selectedGame = this.gamesService.selectedGame;
          let sessionValue = this.baseStorageService.getItem(this.uniqKey, 'sesion');
          this.title = sessionValue || this.games[0].general.name;
          if (!this.selectedGame) {
            const game = games.find((el: Game) => el.general.name === this.title);
            if (game) {
              this.gamesService.selectedGame = this._selectedGame;
              this.title = game.general.name;
            }

          }
        }

        this.initBluffChanges();

      })
  }

  selectedGame$() {
    this.gamesService.selectedGame$
      .pipe(takeUntil(this.subs))
      .subscribe(game => {
        if (game) {
          this.changeGame.emit(game);
          this.selectedGame = game;
          this.title = game.general.name;
        }
      })
  }

  onChangeInput(game: Game, fromInterval = false) {
    this.selectedGame = game;
    this.gamesService.selectedGame = this._selectedGame;
    this.title = game.general.name;
    if (!fromInterval) {
      this.baseStorageService.setItem(this.uniqKey, this.title, 'sesion');
    }
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

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.unsubscribe();
  }

  toggleList() {
    if(this.alwaysOpen) return;
    this.menuActive = !this.menuActive;
  }
}
