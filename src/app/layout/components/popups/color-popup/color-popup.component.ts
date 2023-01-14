import { Component, OnDestroy } from "@angular/core";
import { Animations } from "@app/core/animations/animations";
import { COLOR_POPUP_TYPE } from "@app/core/models/enums/popup.enum";
import { PopupService } from "@app/core/services/states/popup-state.service";
import { Subscription } from "rxjs";


@Component({
    selector: 'color-popup',
    templateUrl: './color-popup.component.html',
    styleUrls: ['./color-popup.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class ColorPopupComponent implements OnDestroy {
    get popupType() { return COLOR_POPUP_TYPE }

    constructor(private popupService: PopupService) {}

    sub?: Subscription;

    type?: COLOR_POPUP_TYPE;

    ngOnInit() {
        this.sub = this.popupService.colorPopup$.subscribe(type => {
            this.type = type;
        })
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}