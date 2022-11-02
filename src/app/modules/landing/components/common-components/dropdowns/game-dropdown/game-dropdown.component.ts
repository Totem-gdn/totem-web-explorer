import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GamesService } from "@app/core/services/assets/games.service";
import { BaseStorageService } from "@app/core/services/base-storage.service";
import { filter, Subject, takeUntil } from "rxjs";


@Component({
  selector: 'game-dropdown',
  templateUrl: './game-dropdown.component.html',
  styleUrls: ['./game-dropdown.component.scss']
})

export class GameDropdownComponent implements OnDestroy, AfterViewInit, OnInit {

  @Input() type: string = 'game';
  @Input() title: string = 'Menu';
  @Input() menuActive = false;
  resetSearch: boolean = false;
  games: any = [];
  selectedItem: any;
  subs = new Subject<void>();
  uniqKey = 'gamesDropdown';
  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('menuItems') menuItems!: ElementRef;


  set selectedGame(game: any) {
    if (!game) return;
    this._selectedGame = game;
  };
  _selectedGame: any;

  constructor(private router: Router,
    private gamesService: GamesService,
    private baseStorageService: BaseStorageService) { }
  ngOnInit(): void {
    this.games$();
  }

  ngAfterViewInit() {
    this.filterGames('');
    this.selectedGame$();
  }

  filterGames(filter?: any) {
    this.games = [];
    this.gamesService.filterDropdownGames(filter).subscribe();
  }
  games$() {
    this.gamesService.dropdownGames$
      .pipe(
        takeUntil(this.subs),
        filter(Boolean),
      ).subscribe(games => {
        this.games = games;
        if (games) {
          this.selectedGame = this.gamesService.selectedGame;
          let sessionValue = this.baseStorageService.getItem(this.uniqKey, 'sesion');
          this.title = sessionValue || this.games[0].general.name;
          if (!this.selectedGame) {
            const game = games.find((el: any) => el.general.name === this.title);
            if (game) {
              this.gamesService.selectedGame = this._selectedGame;
              this.title = game.general.name;
            }

          }
        }

      })
  }

  selectedGame$() {
    this.gamesService.selectedGame$
      .pipe(takeUntil(this.subs))
      .subscribe(game => {
        if (game) {
          this.selectedGame = game;
          this.title = game.general.name;
        }
      })
  }

  onChangeInput(game: any) {
    this.selectedGame = game;
    this.gamesService.selectedGame = this._selectedGame;
    this.title = game.general.name;
    this.baseStorageService.setItem(this.uniqKey, this.title, 'sesion');
    this.menuActive = false;
    this.resetSearch = !this.resetSearch;
  }

  onClick(isClickedInside: any) {
    if (this.dropdown.nativeElement.__ngContext__ === isClickedInside.context && isClickedInside.isInside === false && this.menuActive === true) {
      this.menuActive = false;
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
}
