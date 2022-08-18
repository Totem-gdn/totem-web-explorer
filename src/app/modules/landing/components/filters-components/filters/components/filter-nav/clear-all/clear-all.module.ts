import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { ClearAllComponent } from "./clear-all.component";


@NgModule({
    declarations: [
        ClearAllComponent
    ],
    imports: [
        SharedModule,
        MatIconModule
    ],
    exports: [
        ClearAllComponent
    ]
})

export class ClearAllModule {
    
}