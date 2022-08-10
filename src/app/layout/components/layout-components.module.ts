import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { TotemEmailSubModule } from "@app/modules/landing/modules/totem-email-sub/totem-email-sub.module";
import { TotemSearchFilterModule } from "@app/modules/landing/modules/totem-search-filter/totem-search-filter.module";
import { SharedModule } from "@app/shared/shared.module";
import { TotemFooterComponent } from "./totem-footer/totem-footer.component";
import { TotemNavigationComponent } from "./totem-navigation/totem-navigation.component";



@NgModule({
    declarations: [
        TotemNavigationComponent,
        TotemFooterComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        RouterModule,
        FlexLayoutModule,
        TotemSearchFilterModule,
        TotemEmailSubModule,
    ],
    exports: [
        TotemNavigationComponent,
        TotemFooterComponent
    ]
})

export class LayoutComponentsModule {

}