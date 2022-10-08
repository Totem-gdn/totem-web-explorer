import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SubmitGame } from "@app/core/models/submit-game-interface.model";
import { TotemItemsService } from "@app/core/services/totem-items.service";
import { Subscription } from "rxjs";


@Component({
    selector: 'game-description',
    templateUrl: './game-description.component.html',
    styleUrls: ['./game-description.component.scss']
})

export class GameDescriptionComponent {

    @Input() game!: SubmitGame | any;

}