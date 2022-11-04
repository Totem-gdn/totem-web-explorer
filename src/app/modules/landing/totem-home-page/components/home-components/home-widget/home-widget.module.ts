import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { BackgroundCircleModule } from "../../../../../../components/utils/bg-circle/bg-circle.module";
import { CardsModule } from "../../../../../../components/common/cards/cards.module";
import { GameDropdownModule } from "../../../../../../components/common/dropdowns/game-dropdown/game-dropdown.module";
import { HomeWidgetComponent } from "./home-widget.component";
import { WidgetDropdownModule } from "@app/components/common/dropdowns/widget-dropdown/widget-dropdown.module";


@NgModule({
    declarations: [
        HomeWidgetComponent
    ],
    imports: [
        SharedModule,
        FlexLayoutModule,
        WidgetDropdownModule,
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
