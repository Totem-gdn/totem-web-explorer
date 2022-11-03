import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { BackgroundCircleModule } from "../../../../../../components/utils/bg-circle/bg-circle.module";
import { CardsModule } from "../../../../../../components/common/cards/cards.module";
import { GameDropdownModule } from "../../../../../../components/common/dropdowns/game-dropdown/game-dropdown.module";
import { SearchDropdownModule } from "../../../../../../components/common/dropdowns/search-dropdown/search-dropdown.module";
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
