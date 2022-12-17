import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { DropdownItem } from "@app/core/models/interfaces/dropdown-item.model";
import { GamesService } from "@app/core/services/assets/games.service";



@Component({
    selector: 'dropdown-skeleton',
    templateUrl: './dropdown-skeleton.component.html',
    styleUrls: ['./dropdown-skeleton.component.scss']
})

export class DropdownSkeletonComponent {
    get selectStyles() { return this.menuActive ? 'appear': this.widgetMode ? 'appear selected-script-item': ''}

    constructor(private router: Router,
        private gamesService: GamesService) { }

    @Input() items!: DropdownItem[];
    @Input() itemType!: ASSET_TYPE | 'game';
    @Input() selectedItem!: DropdownItem;
    @Input() searchActive: boolean = false;

    @Output() changeInput = new EventEmitter<any>();
    @Output() changeSearch = new EventEmitter<any>();

    @ViewChild('dropdown') dropdown!: ElementRef;
    @ViewChild('menu-items') menuItems!: ElementRef;

    menuActive: boolean = false;
    widgetMode: boolean = false;


    onChangeInput(item: DropdownItem) {
        this.selectedItem = item;
        this.changeInput.emit(item.data);
        this.menuActive = false;
    }

    searchEvent(e: any) {
        this.changeSearch.emit(e);
    }

    onClick(isClickedInside: any) {
        if (this.dropdown.nativeElement.__ngContext__ === isClickedInside.context && isClickedInside.isInside === false && this.menuActive === true) {
            this.menuActive = false;
        }
    }

    onClickViewAll() {
        if (this.itemType === 'item') {
            this.router.navigate(['/items']);
        } else if (this.itemType === 'game') {
            this.router.navigate(['/games']);
        } else if (this.itemType === 'avatar') {
            this.router.navigate(['/avatars']);
        }
    }
}