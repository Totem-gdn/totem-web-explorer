import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { SortByComponent } from "./sort-by.component";



@NgModule({
    declarations: [
        SortByComponent
    ],
    imports: [
        SharedModule,
        MatIconModule
    ],
    exports: [
        SortByComponent
    ]
})

export class SortByModule {

}