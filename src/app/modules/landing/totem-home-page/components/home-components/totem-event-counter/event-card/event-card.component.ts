import { Component, Input } from "@angular/core";
import { HomepageBlock } from "@app/core/models/interfaces/homepage-blocks.interface";

@Component({
    selector: 'event-card',
    templateUrl: './event-card.component.html',
    styleUrls: ['./event-card.component.scss', '../totem-event-counter.component.scss']
})

export class EventCardComponent {

    @Input() eventBanner: HomepageBlock | undefined = undefined;
    @Input() fontSizeNumber: number = 0;
    @Input() heightForBanner!: number;
    @Input() label: 'live' | 'comming' = 'comming';
}