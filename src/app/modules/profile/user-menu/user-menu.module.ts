import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { UserMenuComponent } from "./user-menu.component";


@NgModule({
    declarations: [
        UserMenuComponent
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        UserMenuComponent
    ]
})

export class UserMenuModule {

}