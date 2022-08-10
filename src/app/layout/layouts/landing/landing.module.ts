
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { HeaderModule } from "app/layout/components/header/header.module";
import { SharedModule } from "app/shared/shared.module";
import { LandingLayoutComponent } from "./landing.component";


@NgModule({
    declarations: [
        LandingLayoutComponent,
    ],
    imports: [
        RouterModule,
        SharedModule,
        HeaderModule,
        FlexLayoutModule
    ],
    exports: [
        LandingLayoutComponent
    ]
})

export class LandingLayoutModule {

}
