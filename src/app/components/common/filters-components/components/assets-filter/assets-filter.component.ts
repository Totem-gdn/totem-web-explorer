import { DOCUMENT } from "@angular/common";
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, Input, ViewChild } from "@angular/core";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { GamesService } from "@app/core/services/assets/games.service";
import { Subject, takeUntil } from "rxjs";
import { FiltersService } from "../../services/filters.service";

@Component({
    selector: 'assets-filter',
    templateUrl: './assets-filter.component.html',
    styleUrls: ['./assets-filter.component.scss'],
    host: {
        class: 'flex filters-wrapper w-0 h-0 lg:w-[320px] lg:h-[auto] lg:mr-[15px]'
    }
})

export class AssetsFilterComponent implements AfterViewInit {
    
    constructor(private filtersService: FiltersService,
                @Inject(DOCUMENT) private document: Document,
                private gamesService: GamesService,
                private changeDetector: ChangeDetectorRef) { }

    @ViewChild('dropupMenu') dropupMenu!: ElementRef;
    @Input() type = '';

    isDropupOpen!: boolean;
    selectedGame!: GameDetail;
    subs = new Subject<void>();

    ngAfterViewInit() {
        this.changeDetector.detectChanges();
        this.filtersService.dropupOpen$
        .pipe(takeUntil(this.subs))
        .subscribe(isOpen => {
            this.isDropupOpen = isOpen;
            this.updateMenu();
        })

        this.gamesService.selectedGame;
        this.selectedGame$();
    }

    selectedGame$() {
        this.gamesService.selectedGame$
            .pipe(takeUntil(this.subs))
            .subscribe(selectedGame => {
                if(!selectedGame) return;
                this.selectedGame = selectedGame;
            })
    }

    toggleMenu() {
        this.filtersService.dropupOpen = !this.filtersService.dropupOpen;
    }

    onCloseMenu() {
        this.filtersService.dropupOpen = false;
    }

    updateMenu() {
        if (this.isDropupOpen) {
            this.document.body.style.position = 'fixed';
            this.dropupMenu.nativeElement.style.maxHeight = '80vh';
            this.dropupMenu.nativeElement.style.overflowY = 'auto';
        }
        if (!this.isDropupOpen) {
            this.document.body.style.position = 'inherit';
            this.dropupMenu.nativeElement.style.maxHeight = '0';
            this.dropupMenu.nativeElement.style.overflowY = 'hidden';
        }
    }

    onClickApply() {
        this.filtersService.dropupOpen = false;
    }

    onClickClear() {
        this.filtersService.resetFilters();
    }

    ngOnDestroy(): void {
        this.subs.next();
        this.subs.complete();
    }
    sexes = [{ name: 'Male'},{ name: 'Female'}]
    skinColors = [{ name: '#f9d4ab'},{ name: '#efd2c4'},{ name: '#e2c6c2'},{ name: '#e0d0bb'},{ name: '#ebb77d'},{ name: '#dca788'},{ name: '#cda093'},{ name: '#ccab80'},{ name: '#c58351'},{ name: '#b37652'},{ name: '#81574b'},{ name: '#8a6743'},{ name: '#7a3e10'},{ name: '#5c2a19'},{ name: '#472422'},{ name: '#362714'},];
    hairColors = [{ name: '#b1b1b1'},{ name: '#070504'},{ name: '#341c0d'},{ name: '#62422e'},{ name: '#914329'},{ name: '#cd622b'},{ name: '#ad7b41'},{ name: '#e4b877'},];
    eyeColors = [{ name: '#b5d6e0'},{ name: '#90b4ca'},{ name: '#a7ad7f'},{ name: '#7c8b4f'},{ name: '#c4a05f'},{ name: '#a97e33'},{ name: '#7a3411'},{ name: '#3d0d04'},]
    hairStyles = [{name: 'afro'},{name: 'asymmetrical'},{name: 'braids'},{name: 'buzz cut'},{name: 'dreadlocks'},{name: 'long'},{name: 'ponytail'},{name: 'short'},];

    games = [{ name: 'Mr.Krabs kills', subName: 'horror' }, { name: 'GTA 6', subName: 'arcade' }, { name: 'Mr.Krabs kills', subName: 'horror' }, { name: 'GTA 6', subName: 'arcade' }, { name: 'Mr.Krabs kills', subName: 'horror' }, { name: 'GTA 6', subName: 'arcade' }, { name: 'Mr.Krabs kills', subName: 'horror' }, { name: 'GTA 6', subName: 'arcade' },]
    elements = [{ name: 'Fire' }, { name: 'Earth' }, { name: 'Air' }, { name: 'Water' }]
    colors = [{ name: 'Red' }, { name: 'Blue' }, { name: 'Yellow' }, { name: 'Green' }, { name: 'Orange' }]
    itemTypes = [{ name: 'Armour', subName: 'Slot' }, { name: 'Arms', subName: 'Slot' }, { name: 'Body', subName: 'Head' }, { name: 'Armour', subName: 'Slot' }]
    materials = [{ name: 'Wood' }, { name: 'Bone' }, { name: 'Iron' }, { name: 'Obsidian' }]
    weaponType = [{ name: 'Axe'},{ name: 'Dagger'}]
    weaponMaterial = [{name: 'Bone'},{name: 'Flint'},{name: 'Obsidian'},{name: 'Wood'}]
}