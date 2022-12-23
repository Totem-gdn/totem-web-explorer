import { DOCUMENT } from "@angular/common";
import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { DNAField } from "@app/core/models/interfaces/dna-field.model";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { DNAParserService } from "@app/core/services/utils/dna-parser.service";
import { Subject, takeUntil } from "rxjs";
import { FiltersService } from "../filters.service";

@Component({
    selector: 'filter-menus',
    templateUrl: './filter-menus.component.html',
    styleUrls: ['./filter-menus.component.scss'],
    host: {
        class: 'flex w-0 h-0 lg:w-[320px] lg:h-[auto] lg:mr-[15px]'
    }
})


export class FilterMenusComponent implements OnDestroy {

    constructor(private dnaService: DNAParserService,
        @Inject(DOCUMENT) private document: Document,
        private filtersService: FiltersService) { }

    @Input() type!: ASSET_TYPE | 'game';

    @ViewChild('dropupRef', {static: true}) dropupRef!: ElementRef;

    selectedGame!: GameDetail;
    dropupActive: boolean = false;
    subs = new Subject<void>();

    ngOnInit() {
        this.dropupActive$();
    }

    clearAll() {
       this.filtersService.reset();
    }

    dropupActive$() {
        this.filtersService.dropupActive$
            .pipe(takeUntil(this.subs))
            .subscribe(isActive => {
                this.dropupActive = isActive;
                this.updateMenu();
            })
    }


    toggleMenu(toggle: boolean | null = null) {
        if(toggle == null) this.filtersService.dropupActive = !this.filtersService.dropupActive;
        else this.filtersService.dropupActive = toggle;
    }


    updateMenu() {
        if (this.dropupActive) {
            this.document.body.style.position = 'fixed';
            this.dropupRef.nativeElement.style.maxHeight = '80vh';
            this.dropupRef.nativeElement.style.overflowY = 'auto';
        }
        if (!this.dropupActive) {
            this.document.body.style.position = 'inherit';
            this.dropupRef.nativeElement.style.maxHeight = '0';
            this.dropupRef.nativeElement.style.overflowY = 'hidden';
        }
    }

    ngOnDestroy(): void {
        this.subs.next();
        this.subs.complete();
    }

}