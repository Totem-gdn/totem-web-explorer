import { ClipboardModule } from "@angular/cdk/clipboard";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { TotemButtonModule } from "@app/components/utils/totem-button/totem-button.module";
import { TotemEmailSubModule } from "@app/modules/landing/totem-home-page/components/home-components/totem-email-sub/totem-email-sub.module";
import { SharedModule } from "@app/shared/shared.module";
import { TotemSearchBarModule } from "../common/totem-search-bar/totem-search-bar.module";
import { TotemNavSidebarModule } from "./popups/totem-nav-sidebar/totem-nav-sidebar.module";
import { TotemProfSidebarModule } from "./popups/totem-profile-dropdown/totem-profile-dropdown.module";
import { TotemFooterComponent } from "./totem-footer/totem-footer.component";
import { ExploreDropdownComponent } from "./totem-header/explore-dropdown/explore-dropdown.component";
import { TotemHeaderComponent } from "./totem-header/totem-header.component";
import { TotemNavigationComponent } from "./totem-navigation/totem-navigation.component";
import { TotemSearchFilterModule } from "./totem-navigation/totem-search-filter/totem-search-filter.module";
import { TotemSidenavModule } from "./totem-sidenav/totem-sidenav.module";



@NgModule({
    declarations: [
        TotemNavigationComponent,
        ExploreDropdownComponent,
        TotemFooterComponent,
        TotemHeaderComponent
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
        TotemProfSidebarModule,
        TotemSearchBarModule,
        ClipboardModule,
        MatRippleModule,
        MatButtonModule,


    ],
    exports: [
        TotemNavigationComponent,
        TotemFooterComponent,
        TotemHeaderComponent
    ]
})

export class LayoutComponentsModule {

}
