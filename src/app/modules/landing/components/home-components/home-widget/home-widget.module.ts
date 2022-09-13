import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { SearchDropdownModule } from "../../common-components/search-dropdown/search-dropdown.module";
import { HomeWidgetComponent } from "./home-widget.component";


@NgModule({
    declarations: [
        HomeWidgetComponent
    ],
    imports: [
        SharedModule,

        SearchDropdownModule
    ],
    exports: [
        HomeWidgetComponent
    ]
})

export class HomeWidgetModule {

}