import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { ItemCardModule } from "../../item-card/item-card.module";
import { FilterMenuModule } from "../components/filter-menu/filter-menu.module";
import { FilterSliderModule } from "../components/filter-slider/filter-slider.module";
import { FilterUpdateModule } from "../components/filter-update/filter-update.module";
import { AvatarsFilterComponent } from "./avatars-filter.component";



@NgModule({
    declarations: [
        AvatarsFilterComponent
    ],
    imports: [
        SharedModule,
        FilterSliderModule,
        FilterUpdateModule,
        FilterMenuModule,
        ItemCardModule
    ],
    exports: [
        AvatarsFilterComponent
    ]
})

export class AvatarFilterModule {

}