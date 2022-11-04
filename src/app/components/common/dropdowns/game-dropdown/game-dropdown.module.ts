import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { SearchFieldModule } from "../../../utils/search-field/search-field.module";
import { TotemSpinnerModule } from "../../../../shared/totem-spinner/totem-spinner.module";
import { GameDropdownComponent } from "./game-dropdown.component";


@NgModule({
    declarations: [
        GameDropdownComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        SearchFieldModule,
        TotemSpinnerModule,
        FormsModule
    ],
    exports: [
        GameDropdownComponent
    ]
})

export class GameDropdownModule {

}
