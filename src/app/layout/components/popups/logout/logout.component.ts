import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Animations } from "@app/core/animations/animations";
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
                private router: Router) {}

    showPopup = false;

    ngOnInit() {
        this.popupService.showLogoutPopup$.subscribe(showPopup => {
            this.showPopup = showPopup;
        })
    }

    closePopup() {
        this.showPopup = false;
        this.router.navigate(['/']);
    }
}