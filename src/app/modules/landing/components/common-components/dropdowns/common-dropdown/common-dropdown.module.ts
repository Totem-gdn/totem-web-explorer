import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { CommonDropdownComponent } from "./common-dropdown.component";

@NgModule({
    declarations: [
        CommonDropdownComponent,
    ],
    imports: [
        SharedModule,
        MatIconModule
    ],
    exports: [
        CommonDropdownComponent
    ]
})

export class CommonDropdownModule {
    
}