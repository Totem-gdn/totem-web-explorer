import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { TotemLegacyCardComponent } from "./totem-legacy-card.component";

@NgModule({
    declarations: [
        TotemLegacyCardComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        TotemLegacyCardComponent
    ]
})

export class TotemLegacyCardModule {

}