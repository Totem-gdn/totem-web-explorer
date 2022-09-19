import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "app/shared/shared.module";
import { GemCardComponent } from "./gem-card.component";


@NgModule({
    declarations: [
        GemCardComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
    ],
    exports: [
        GemCardComponent
    ]
})

export class GemCardModule {

}