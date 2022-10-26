import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { BackgroundCircleModule } from "../../common-components/bg-circle/bg-circle.module";
import { AvatarCardModule } from "../../common-components/cards/avatar-card/avatar-card.module";
import { CardsModule } from "../../common-components/cards/cards.module";
import { ItemCardModule } from "../../common-components/cards/item-card/item-card.module";
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

        CardsModule
    ],
    exports: [
        HomeWidgetComponent
    ]
})

export class HomeWidgetModule {

}
