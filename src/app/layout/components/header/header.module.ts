import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "app/shared/shared.module";
import { HeaderComponent } from "./header.component";



@NgModule({
    declarations: [
        HeaderComponent,
    ],
    imports: [
        SharedModule,
        MatIconModule,
        HttpClientModule
    ],
    exports: [
        HeaderComponent
    ]
})

export class HeaderModule {

}