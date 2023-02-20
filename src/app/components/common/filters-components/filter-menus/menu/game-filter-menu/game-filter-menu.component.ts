import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { INPUT_TYPE } from "@app/core/models/enums/input-type.enum";
import { InputTag } from "@app/core/models/interfaces/input-tag.model";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { GamesService } from "@app/core/services/assets/games.service";
import { debounceTime, takeUntil } from "rxjs";
import { FiltersService } from "../../../filters.service";


@Component({
    selector: 'game-filter-menu',
    templateUrl: './game-filter-menu.component.html',
    styleUrls: ['./game-filter-menu.component.scss']
})

export class GameFilterMenuComponent implements OnInit {

    constructor(private filtersService: FiltersService,
                private gamesService: GamesService) {

    }

    @Input() title = 'Title'
    // @Input() games!: GameDetail[];

    @ViewChild('menuRef') menuRef!: ElementRef;
    @ViewChild('wrapper') wrapper!: ElementRef;

    inputType: INPUT_TYPE  = INPUT_TYPE.RADIO;

    resetFilters: boolean = false;
    menuActive: boolean = false;
    gamesNoFound: boolean = false;

    games!: GameDetail[];

    ngOnInit() {
        this.gamesService.gamesByFilter('')
            .subscribe(games => {
                this.games = games;
        })
        this.reset$();
    }

    toggleMenu() {
        this.menuActive = !this.menuActive;
        this.handleMenuHeight();
    }

    filterMenuContent(filter: string) {
        this.gamesService.gamesByFilter(filter)
            .subscribe(games => {
                this.games = games;
                if(games?.length == 0) {
                    this.gamesNoFound = true;
                    this.handleMenuHeight(1);
                }  else {
                    this.gamesNoFound = false;
                    this.handleMenuHeight();
                }
            })
    }

    reset$() {
        this.filtersService.reset$.subscribe(() => {
            this.menuActive = false;
            this.handleMenuHeight();
        })
    }

    handleMenuHeight(customLength: number | null = null) {

        if(!this.menuActive) this.resetFilters = !this.resetFilters;
        const wrapper = this.wrapper.nativeElement.style;

        let staticHeight = 50;

        if (!this.menuActive) {
            wrapper.height = `${staticHeight}px`;
        } else if (this.inputType == INPUT_TYPE.RANGE) {
            wrapper.height = '130px';
        } else if (this.inputType == INPUT_TYPE.GRAPH) {
            wrapper.height = '250px';
        } else {
            const menu = this.menuRef.nativeElement.style;
            const length = customLength != null ? customLength : this.games?.length;

            if (length) staticHeight += 12;
            staticHeight += 59;

            if (!length) {
                wrapper.height = `${staticHeight}px`;
            } else if (length > 4) {
                wrapper.height = `${staticHeight + 200}px`;
                menu.height = '200px';
            } else {
                wrapper.height = `${staticHeight + length * 50}px`;
                menu.height = `${length * 50}px`;
            }
        }
    }

    onChangeInput(e: any, gameName: string | undefined) {
        if(!gameName) return;
        this.title = gameName;
        const tag: InputTag = {
            value: gameName,
            ref: e.target
        }

        if(e.target.checked == false) {
            this.filtersService.removeTag(tag);
            return;
        }
        this.filtersService.addTag(tag, this.inputType);
    }

    // filterMenuContent(filter: string) {
    //     if(!this.items) return;
    //     const items = this.menuRef.nativeElement.getElementsByClassName('menu-item');
    //     const matchedItems = this.items.filter(item => item.value.includes(filter));

    //     for(let i = 0; i < items.length; i++) {
    //         if(this.items[i].value.includes(filter)) {
    //             items[i].style.display = 'flex';
    //         } else {
    //             items[i].style.display = 'none';
    //         }
    //     }
    //     if(matchedItems.length == 0) {
    //         this.itemsNoFound = true;
    //         this.handleMenuHeight(1)
    //     } else {
    //         this.itemsNoFound = false;
    //         this.handleMenuHeight(matchedItems.length)
    //     }
    // }
}