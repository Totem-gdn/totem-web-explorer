import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { NotFoundComponent } from "./not-found.component";

@NgModule({
    declarations: [
        NotFoundComponent
    ],
    imports: [
        SharedModule,
        FlexLayoutModule,
        RouterModule,
        MatIconModule
    ],
    exports: [
        NotFoundComponent
    ]
})

export class NotFoundModule {

}