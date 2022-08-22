import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { ProfileNavComponent } from "./profile-nav.component";


@NgModule({
    declarations: [
        ProfileNavComponent
    ],
    imports: [
        SharedModule,
        RouterModule
    ],
    exports: [
        ProfileNavComponent
    ]
})

export class ProfileNavModule {

}