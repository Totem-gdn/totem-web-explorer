import { DOCUMENT } from "@angular/common";
import { Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GamesService } from "@app/core/services/assets/games.service";
import { WidgetService } from "@app/core/services/widget-state.service";
import { Subscription, timer } from "rxjs";
import { Game } from "../../totem-search-filter/models/items-interface.model";


@Component({
    selector: 'search-dropdown',
    templateUrl: './search-dropdown.component.html',
    styleUrls: ['./search-dropdown.component.scss']
})

export class SearchDropdownComponent implements OnInit, OnDestroy {

    scriptSubscribe: Subscription = new Subscription();
    previusSelected: number = 0;

    constructor(private router: Router,
        @Inject(DOCUMENT) private document: Document,
        private gamesService: GamesService,
        private widgetService: WidgetService) { }

    allRadioButtons!: any;
    @Input() title: string = '';
    @Input() itemType: string = '';
    @Input() alwaysOpen: boolean = false;
    @Output() onChange: EventEmitter<Game> = new EventEmitter();
    @Output() onFakeChange: EventEmitter<Game> = new EventEmitter();
    @ViewChild('menu') menu!: ElementRef;
    @ViewChild('dropdown') dropdown!: ElementRef;
    @ViewChild('menuItems') menuItems!: ElementRef<any>;

    items: Game[] = [];
    menuActive: boolean = false;

    subs: Subscription = new Subscription();

    ngOnInit() {
        if(this.alwaysOpen === true) {
          this.menuActive = true;
          this.subs.add(
            this.widgetService.selectedGame.subscribe((game) => {
              if (game) {
                this.title = game.general.name;
              }
            })
          )
        }
      this.loadGames('');
    }

    loadGames(filter: string) {
      this.gamesService.filterDropdownGames(filter, false).subscribe(games => {
        this.items = games;
      })
    }

    ngOnDestroy(): void {
      this.subs.unsubscribe();
      this.scriptSubscribe.unsubscribe();
    }

    onChangeInput(game: Game) {
        this.title = game.general.name;
        this.onChange.emit(game);

        if (this.alwaysOpen === true) {
          this.removeScriptSelected();
          this.restartScript(20000, 5000);
          return;
        }
        this.menuActive = false;
    }

    onClickMenu(event: any) {
        if(this.alwaysOpen) return;
        this.menuActive = !this.menuActive;
    }

    onClick(isClickedInside: any) {
        if(this.alwaysOpen) return;
        if (this.dropdown.nativeElement.__ngContext__ === isClickedInside.context && isClickedInside.isInside === false && this.menuActive === true) {
            this.menuActive = false;
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
      this.items.forEach((item: any, i: number) => {
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
      const itemToSelect = this.items[selectItem];
      for (var i = 0; i <= selectItem; i++) {
        if (i == selectItem) {
          this.selectThisGame(i, itemToSelect)
        } else {
          this.selectThisGame(i);
        }
      };
    }

    selectThisGame(i: number, itemToSelect?: Game) {
      setTimeout(() => {
        if (!itemToSelect) {
          document?.getElementById('item' + (i-1).toString())?.classList.remove('script-hovered');
          document?.getElementById('item' + i.toString())?.classList.add('script-hovered');
        } else {
          document?.getElementById('item' + (i-1).toString())?.classList.remove('script-hovered');
          document?.getElementById('item' + i.toString())?.classList.add('script-selected');
          this.title = itemToSelect.general.name;
          this.onFakeChange.emit(itemToSelect);
          this.scriptSubscribe.unsubscribe();
          this.startScriptTimer(5000, 5000);
          for (let i = 0; i < this.allRadioButtons.length; i++) {
            this.allRadioButtons[i].children[0].checked = false;
          }
        }
      }, 600 * i);
    }

}
