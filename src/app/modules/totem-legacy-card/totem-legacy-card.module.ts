import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { TotemLegacyCardComponent } from "./totem-legacy-card.component";

@NgModule({
    declarations: [
        TotemLegacyCardComponent
    ],
    imports: [
        SharedModule,
        MatIconModule
    ],
    exports: [
        TotemLegacyCardComponent
    ]
})

export class TotemLegacyCardModule {

}