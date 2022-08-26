import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProfileService } from "@app/core/services/filters/dropup.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'filter-slider',
    templateUrl: './filter-slider.component.html',
    styleUrls: ['./filter-slider.component.scss']
})

export class FilterSliderComponent implements OnInit, OnDestroy {

    constructor(private profileService: ProfileService) {}

    sub!: Subscription;
    isMenuOpen!: boolean;

    ngOnInit() {
        this.profileService.dropupOpen$.subscribe(isOpen => {
            this.isMenuOpen = isOpen;
        })
    }

    onToggleMenu() {
        console.log(!this.profileService.dropupOpen);
        this.profileService.dropupOpen = !this.profileService.dropupOpen;
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}