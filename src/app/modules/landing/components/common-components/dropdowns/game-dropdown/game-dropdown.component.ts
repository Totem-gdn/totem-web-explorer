import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GamesService } from "@app/core/services/assets/games.service";
import { ComboBoxService } from "@app/core/services/combobox-state.service";
import { TotemItemsService } from "@app/core/services/totem-items.service";
import { Subject, takeUntil } from "rxjs";


@Component({
    selector: 'game-dropdown',
    templateUrl: './game-dropdown.component.html',
    styleUrls: ['./game-dropdown.component.scss']
})

export class GameDropdownComponent implements OnDestroy, OnInit {
    @Input() type: string = 'game';
    @Input() title = 'Menu';
    @Input() games!: any;
    @Output() changeInput = new EventEmitter<any>();
    resetSearch: boolean = false;

    subs = new Subject<void>();

    @ViewChild('dropdown') dropdown!: ElementRef;
    @ViewChild('menuItems') menuItems!: ElementRef;

    menuActive = false;

    set selectedGame(game: any) {
        if (!game) return;
        this._selectedGame = game;
    };
    _selectedGame: any;

    constructor(
        private router: Router,
        private gamesService: GamesService,
        private comboService: ComboBoxService
    ) { }

    ngOnInit(): void {
        this.filterGames('');
        this.games$();
        this.selectedGame$();
    }

    filterGames(filter: any) {
        this.games = undefined;
        this.gamesService.filterDropdownGames(filter).subscribe();
    }
    games$() {
        this.gamesService.dropdownGames$
            .pipe(takeUntil(this.subs))
            .subscribe(games => {
                this.games = games;
                if (games) this.selectedGame = this.gamesService.selectedGame;
            })
    }
    selectedGame$() {
        this.gamesService.selectedGame$
            .pipe(takeUntil(this.subs))
            .subscribe(game => {
                if (game) this.selectedGame = game;
            })
    }



    onChangeInput(game: any) {
        this.selectedGame = game;
        this.gamesService.selectedGame = this._selectedGame;
        this.changeInput.emit(game);
        this.menuActive = false;
        this.resetSearch = !this.resetSearch;
        // console.log(this.resetSearch)
    }

    onClick(isClickedInside: any) {
        // if(this.alwaysOpen) return;
        if (this.dropdown.nativeElement.__ngContext__ === isClickedInside.context && isClickedInside.isInside === false && this.menuActive === true) {
            this.menuActive = false;
            this.resetSearch = !this.resetSearch;
        }
    }

    onClickViewAll() {
        console.log(this.type)
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