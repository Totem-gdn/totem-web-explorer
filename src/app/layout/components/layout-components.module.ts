import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { TotemButtonModule } from "@app/components/utils/totem-button/totem-button.module";
import { TotemEmailSubModule } from "@app/modules/landing/totem-home-page/components/home-components/totem-email-sub/totem-email-sub.module";
import { SharedModule } from "@app/shared/shared.module";
import { TotemNavSidebarModule } from "./popups/totem-nav-sidebar/totem-nav-sidebar.module";
import { TotemProfSidebarModule } from "./popups/totem-profile-dropdown/totem-profile-dropdown.module";
import { TotemFooterComponent } from "./totem-footer/totem-footer.component";
import { TotemNavigationComponent } from "./totem-navigation/totem-navigation.component";
import { TotemSearchFilterModule } from "./totem-navigation/totem-search-filter/totem-search-filter.module";



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
        TotemNavSidebarModule,
        TotemProfSidebarModule
    ],
    exports: [
        TotemNavigationComponent,
        TotemFooterComponent
    ]
})

export class LayoutComponentsModule {

}
