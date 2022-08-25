import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { TotemButtonModule } from "@app/modules/landing/components/common-components/totem-button/totem-button.module";
import { TotemSearchFilterModule } from "@app/modules/landing/components/common-components/totem-search-filter/totem-search-filter.module";
import { TotemEmailSubModule } from "@app/modules/landing/components/home-components/totem-email-sub/totem-email-sub.module";
import { TotemNavSidebarModule } from "@app/modules/landing/components/home-components/totem-nav-sidebar/totem-nav-sidebar.module";
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
        TotemButtonModule,
        TotemNavSidebarModule
    ],
    exports: [
        TotemNavigationComponent,
        TotemFooterComponent
    ]
})

export class LayoutComponentsModule {

}
