import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserStateService } from "@app/core/services/auth.service";
import { PopupService } from "@app/core/services/states/popup-state.service";

@Component({
    selector: 'logout',
    templateUrl: './logout.component.html',
    styleUrls: ['../color-popup.component.scss']
})

export class LogoutComponent {

    constructor(private popupService: PopupService,
                private router: Router,
                private authService: UserStateService) {}

    closePopup() {
        this.popupService.closeColorPopup();
        this.router.navigate(['/']);
    }

    async login() {
        await this.authService.login();
        this.popupService.closeColorPopup();
    }
}