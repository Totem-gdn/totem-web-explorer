import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { BasicInfoTabComponent } from "./basic-info-tab.component";

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    declarations: [
        BasicInfoTabComponent,
    ],
    imports: [
        SharedModule,
        FlexLayoutModule,
        MatIconModule,
        MatRippleModule
    ],
    exports: [
        BasicInfoTabComponent
    ]
})

export class BasicInfoTabModule {

}
