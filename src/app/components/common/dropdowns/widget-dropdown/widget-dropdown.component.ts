import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { GamesService } from "@app/core/services/assets/games.service";
import { WidgetService } from "@app/core/services/states/widget-state.service";
import { Subscription, timer } from "rxjs";


@Component({
    selector: 'widget-dropdown',
    templateUrl: '../game-dropdown/game-dropdown.component.html',
    styleUrls: ['../game-dropdown/game-dropdown.component.scss']
})

export class WidgetDropdownComponent implements OnInit, OnDestroy {

    scriptSubscribe: Subscription = new Subscription();
    previusSelected: number = 0;

    constructor(private router: Router,
        private gamesService: GamesService,
        private widgetService: WidgetService) { }

    allRadioButtons!: any;
    title: string = 'Totem';
    @Input() alwaysOpen: boolean = false;
    @Output() onChange: EventEmitter<GameDetail> = new EventEmitter();
    @Output() onFakeChange: EventEmitter<GameDetail> = new EventEmitter();
    @ViewChild('dropdown') dropdown!: ElementRef;
    @ViewChild('menuItems') menuItems!: ElementRef;

    games: GameDetail[] = [];
    menuActive: boolean = false;

    subs: Subscription = new Subscription();
    searchGames = false;
    resetSearch: boolean = false;

    ngOnInit() {
        if(this.alwaysOpen === true) {
          this.menuActive = true;
          this.subs.add(
            this.widgetService.selectedGame.subscribe((game) => {
              if (game) {
                this.title = game?.general?.name || '';
              }
            })
          )
        }
      this.filterGames('');
    }

    filterGames(filter: string) {
      this.searchGames = true;
      this.gamesService.loadGames(filter, false).subscribe(games => {
        this.games = games;
        this.searchGames = false;

      })
    }

    ngOnDestroy(): void {
      this.subs.unsubscribe();
      this.scriptSubscribe.unsubscribe();
    }

    onChangeInput(game: GameDetail) {
        this.title = game?.general?.name || '';
        this.gamesService.gameInSession = game;
        this.widgetService.updateSelectedGame(game);
        if (this.alwaysOpen === true) {
          this.removeScriptSelected();
          this.restartScript(60000, 5000);
          return;
        }
        this.menuActive = false;
        this.resetSearch = !this.resetSearch;
    }

    onClickMenu() {
        if(this.alwaysOpen) return;
        this.menuActive = !this.menuActive;
    }

    onClick(isClickedInside: any) {
        if(this.alwaysOpen) return;
        if (this.dropdown.nativeElement.__ngContext__ === isClickedInside.context && isClickedInside.isInside === false && this.menuActive === true) {
            this.menuActive = false;
            this.resetSearch = !this.resetSearch;
        }
    }

    onClickViewAll() {
      this.router.navigate(['/games']);
    }

    ngAfterViewInit() {
      if (this.alwaysOpen === true) {
        this.startScriptTimer(2000, 5000);
        // this.dropdown.nativeElement.style.width = '270px'
      }
      this.allRadioButtons = this.menuItems.nativeElement.children;
    }

    removeScriptSelected() {
      this.games.forEach((item: any, i: number) => {
        document?.getElementById('item' + i.toString())?.classList.remove('script-selected');
      });
    }

    restartScript(start: number, nextTime: number) {
      this.scriptSubscribe.unsubscribe();

      this.startScriptTimer(start, nextTime);
    }

    startScriptTimer(start: number, nextTime: number) {
      this.scriptSubscribe = timer(start, nextTime).subscribe((val: number) => {
        this.removeScriptSelected();
        this.autoScript();
        /* for (let i = 0; i < this.allRadioButtons.length; i++) {
          this.allRadioButtons[i].children[0].checked = false;
        } */
      });
    }

    autoScript() {
      const selectThisGame = Math.floor(Math.random() * 4);
      if (this.previusSelected == selectThisGame) {
        this.autoScript();
        return;
      }
      this.previusSelected = selectThisGame;
      this.selectGame(selectThisGame);
    }

    selectGame(selectItem: number) {
      const itemToSelect = this.games[selectItem];
      for (var i = 0; i <= selectItem; i++) {
        if (i == selectItem) {
          this.selectThisGame(i, itemToSelect)
        } else {
          this.selectThisGame(i);
        }
      };
    }

    selectThisGame(i: number, itemToSelect?: GameDetail) {
      setTimeout(() => {
        if (!itemToSelect) {
          document?.getElementById('item' + (i-1).toString())?.classList.remove('script-hovered');
          document?.getElementById('item' + i.toString())?.classList.add('script-hovered');
        } else {
          document?.getElementById('item' + (i-1).toString())?.classList.remove('script-hovered');
          document?.getElementById('item' + i.toString())?.classList.add('script-selected');
          this.title = itemToSelect?.general?.name || '';
          this.onFakeChange.emit(itemToSelect);
          this.scriptSubscribe.unsubscribe();
          this.startScriptTimer(5000, 5000);
          for (let i = 0; i < this.allRadioButtons.length; i++) {
            this.allRadioButtons[i].children[0].checked = false;
          }
        }
      }, 600 * i);
    }

    toggleList() {}
}