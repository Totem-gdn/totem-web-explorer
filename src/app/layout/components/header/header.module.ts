import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { TotemEmailSubModule } from "@app/modules/landing/modules/totem-email-sub/totem-email-sub.module";
import { TotemSearchFilterModule } from "@app/modules/landing/modules/totem-search-filter/totem-search-filter.module";
import { SharedModule } from "app/shared/shared.module";
import { HeaderComponent } from "./header.component";
import { TotemFooterComponent } from "./totem-footer/totem-footer.component";
import { TotemNavigationComponent } from "./totem-navigation/totem-navigation.component";



@NgModule({
    declarations: [
        HeaderComponent,
        TotemNavigationComponent,
        TotemFooterComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        RouterModule,
        FlexLayoutModule,
        HttpClientModule,
        TotemSearchFilterModule,
        TotemEmailSubModule
    ],
    exports: [
        HeaderComponent,
        TotemNavigationComponent,
        TotemFooterComponent
    ]
})

export class HeaderModule {

}
