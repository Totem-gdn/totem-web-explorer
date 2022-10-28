import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { TotemItemsService } from "@app/core/services/totem-items.service";
import { Subject } from "rxjs";


@Component({
    selector: 'game-dropdown',
    templateUrl: './game-dropdown.component.html',
    styleUrls: ['./game-dropdown.component.scss']
})

export class GameDropdownComponent implements OnDestroy, OnInit {

    constructor(private router: Router,
                private itemsService: TotemItemsService) {}

    @Input() type: string = 'game';
    @Input() title = 'Menu';
    @Input() items: any = [{ name: 'Mr.Krabs', genre: 'horror' }, { name: 'GTA 6', genre: 'Arcade' }, { name: 'SontaCity', genre: 'Shooter' }, { name: 'Mineground', genre: 'Sandbox' }, { name: 'Mr.Krabs', genre: 'horror' }, { name: 'GTA 6', genre: 'Arcade' }, { name: 'SontaCity', genre: 'Shooter' }, { name: 'Mineground', genre: 'Sandbox' },]
    @Output() changeInput = new EventEmitter<any>();

    subs = new Subject<void>();

    @ViewChild('dropdown') dropdown!: ElementRef;

    menuActive = false;

    ngOnInit() {
        this.filterGames('');
    }

    onFilterGames(e: any) {

    }

    filterGames(filter: any) {
        this.itemsService.getGameByName(filter).subscribe(games => {
            this.items = [];
            for(let game of games) {
                const name = game.general.name;
                const img = game.images.smallThumbnail;
                const genres = game.general.genre.join(', ')
                this.items.push({name, img, genres});
            }
        })
    }

    onChangeInput(event: any) {
        const value = event.target.value;
        this.title = value;
        this.changeInput.emit(value);

        this.menuActive = false;
    }

    onClick(isClickedInside: any) {
        // if(this.alwaysOpen) return;
        if (this.dropdown.nativeElement.__ngContext__ === isClickedInside.context && isClickedInside.isInside === false && this.menuActive === true) {
            this.menuActive = false;
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