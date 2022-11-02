import { Component } from "@angular/core";
import { Animations } from "@app/core/animations/animations";

@Component({
    selector: 'logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class LogoutComponent {
    showPopup = true;


}