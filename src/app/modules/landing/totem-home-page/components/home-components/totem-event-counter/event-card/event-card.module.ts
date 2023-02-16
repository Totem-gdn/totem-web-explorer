import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { EventCardComponent } from "./event-card.component";

@NgModule({
    declarations: [
        EventCardComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        EventCardComponent
    ]
})

export class EventCardModule {
    
}