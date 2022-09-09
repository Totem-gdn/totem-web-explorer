import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { ProfileNavComponent } from "./profile-navigation.component";


@NgModule({
    declarations: [
        ProfileNavComponent
    ],
    imports: [
        SharedModule,
        RouterModule,
        FlexLayoutModule,
        MatIconModule,
        MatRippleModule
    ],
    exports: [
        ProfileNavComponent
    ],
})

export class ProfileNavigationModule {

}
