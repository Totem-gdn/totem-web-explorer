import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { NavigationComponent } from "./navigation.component";



@NgModule({
    declarations: [
        NavigationComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        RouterModule
    ],
    exports: [
        NavigationComponent
    ]
})


export class NavigationModule {

}