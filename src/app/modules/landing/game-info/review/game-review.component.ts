import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SubmitGame } from "@app/core/models/submit-game-interface.model";
import { TotemItemsService } from "@app/core/services/totem-items.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'game-review',
    templateUrl: './game-review.component.html',
    styleUrls: ['./game-review.component.scss'],
    host: {
        // class: 'review'
    }
})

export class GameReviewComponent implements OnInit {

    @Input() game!: SubmitGame | any;
    toggleDropdown = false;

    ngOnInit() {
    }

    onToggle() {
        this.toggleDropdown = !this.toggleDropdown;
    }
}