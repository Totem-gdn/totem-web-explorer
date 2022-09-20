import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { LinksTabComponent } from "./links-tab.component";

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    declarations: [
        LinksTabComponent,
    ],
    imports: [
        SharedModule,
        FlexLayoutModule,
        MatIconModule,
        MatRippleModule
    ],
    exports: [
        LinksTabComponent
    ]
})

export class LinksTabModule {

}
