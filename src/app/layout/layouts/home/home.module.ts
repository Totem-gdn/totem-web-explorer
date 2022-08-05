import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { HeaderModule } from "app/layout/components/header/header.module";
import { SharedModule } from "app/shared/shared.module";
import { HomeLayoutComponent } from "./home.component";


@NgModule({
    declarations: [
        HomeLayoutComponent,
    ],
    imports: [
        HttpClientModule,
        RouterModule,
        MatIconModule,
        SharedModule,
        HeaderModule,
    ],
    exports: [
        HomeLayoutComponent
    ]
})

export class HomeLayoutModule {

}