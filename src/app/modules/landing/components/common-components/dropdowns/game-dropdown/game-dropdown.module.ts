import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { SearchFieldModule } from "../../search-field/search-field.module";
import { TotemSpinnerModule } from "../../totem-spinner/totem-spinner.module";
import { GameDropdownComponent } from "./game-dropdown.component";


@NgModule({
    declarations: [
        GameDropdownComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        SearchFieldModule,
        TotemSpinnerModule
    ],
    exports: [
        GameDropdownComponent
    ]
})

export class GameDropdownModule {

}