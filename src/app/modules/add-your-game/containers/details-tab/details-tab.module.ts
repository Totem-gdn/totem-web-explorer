import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { DetailsTabComponent } from "./details-tab.component";

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    declarations: [
        DetailsTabComponent,
    ],
    imports: [
        SharedModule,
        FlexLayoutModule,
        MatIconModule,
        MatRippleModule
    ],
    exports: [
        DetailsTabComponent
    ]
})

export class DetailsTabModule {

}
