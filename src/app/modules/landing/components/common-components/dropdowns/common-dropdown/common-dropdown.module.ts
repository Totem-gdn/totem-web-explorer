import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { CommonDropdownComponent } from "./common-dropdown.component";

@NgModule({
    declarations: [
        CommonDropdownComponent,
    ],
    imports: [
        SharedModule,
        MatIconModule,
        FormsModule
    ],
    exports: [
        CommonDropdownComponent
    ]
})

export class CommonDropdownModule {
    
}