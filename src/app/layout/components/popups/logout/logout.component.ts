import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Animations } from "@app/core/animations/animations";
import { UserStateService } from "@app/core/services/auth.service";
import { PopupService } from "../../popup.service";

@Component({
    selector: 'logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class LogoutComponent implements OnInit {

    constructor(private popupService: PopupService,
                private router: Router,
                private authService: UserStateService) {}

    showPopup = false;

    ngOnInit() {
        this.logout$();
    }

    logout$() {
        this.popupService.logout$.subscribe(showPopup => {
            this.showPopup = showPopup;
        })
    }

    closePopup() {
        this.popupService.closeLogout();
        this.router.navigate(['/']);
    }

    async login() {
        await this.authService.login();
        this.popupService.closeLogout();
    }
}