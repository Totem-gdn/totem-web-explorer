import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { ProfileBackButtonComponent } from "./profile-back-button.component";


@NgModule({
    declarations: [
      ProfileBackButtonComponent
    ],
    imports: [
        SharedModule,
        MatButtonModule,
        FlexLayoutModule,
        MatIconModule,
    ],
    exports: [
      ProfileBackButtonComponent
    ]
})

export class ProfileBackButtonModule {

}
