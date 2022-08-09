import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
// import { MatMe } from "@angular/material";
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from "@app/shared/shared.module";
import { FilterGameComponent } from "./filter-game.component";



@NgModule({
    declarations: [
        FilterGameComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
    ],
    exports: [
        FilterGameComponent
    ]
})

export class FilterGameModule {

}