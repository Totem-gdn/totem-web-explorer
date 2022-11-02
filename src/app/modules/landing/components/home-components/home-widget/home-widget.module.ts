import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { BackgroundCircleModule } from "../../common-components/bg-circle/bg-circle.module";
import { CardsModule } from "../../common-components/cards/cards.module";
import { GameDropdownModule } from "../../common-components/dropdowns/game-dropdown/game-dropdown.module";
import { SearchDropdownModule } from "../../common-components/dropdowns/search-dropdown/search-dropdown.module";
import { HomeWidgetComponent } from "./home-widget.component";


@NgModule({
    declarations: [
        HomeWidgetComponent
    ],
    imports: [
        SharedModule,
        FlexLayoutModule,

        SearchDropdownModule,
        BackgroundCircleModule,
        MatIconModule,
        GameDropdownModule,
        CardsModule
    ],
    exports: [
        HomeWidgetComponent
    ]
})

export class HomeWidgetModule {

}
