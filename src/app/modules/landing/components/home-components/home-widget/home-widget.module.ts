import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { BackgroundCircleModule } from "../../common-components/bg-circle/bg-circle.module";
import { SearchDropdownModule } from "../../common-components/dropdowns/search-dropdown/search-dropdown.module";
import { HomeWidgetComponent } from "./home-widget.component";


@NgModule({
    declarations: [
        HomeWidgetComponent
    ],
    imports: [
        SharedModule,

        SearchDropdownModule,
        BackgroundCircleModule
    ],
    exports: [
        HomeWidgetComponent
    ]
})

export class HomeWidgetModule {

}