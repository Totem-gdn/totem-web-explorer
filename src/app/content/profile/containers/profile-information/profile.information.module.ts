import { ClipboardModule } from "@angular/cdk/clipboard";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { ProfileInformationComponent } from "./profile-information.component";

@NgModule({
    declarations: [
        ProfileInformationComponent,

    ],
    imports: [
        SharedModule,

        MatIconModule,
        ClipboardModule,
    ],
    exports: [
        ProfileInformationComponent
    ]
})

export class ProfileInformationModule { 

}