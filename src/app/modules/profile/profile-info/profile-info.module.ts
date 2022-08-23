import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { ProfileInfoComponent } from "./profile-info.component";


@NgModule({
    declarations: [
        ProfileInfoComponent
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        ProfileInfoComponent
    ]
})

export class ProfileInfoModule {

}